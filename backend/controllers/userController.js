const asyncHandler = require("express-async-handler");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/userModel");

const generateToken = (id) => {
    return jwt.sign(
        { id }, process.env.JWT_SECRET, { expiresIn: "1d" }
    );
}

const registerUser = asyncHandler(async (req, res) => {
    const { name, email, password, birthdate, phone } = req.body;
    // Checking for empty fields
    if (!name || !email || !password || !birthdate || !phone ) {
        res.status(400);
        throw new Error("Please fill in all the fields.");
    }
    // Checking for password length
    if (password.length < 6) {
        res.status(400);
        throw new Error("Password should be at least 6 characters.");
    }
    // Checking if email already exists in Database
    const exists = await User.findOne({ email: email });
    if (exists) {
        res.status(400);
        throw new Error("Email already exists, please try another one.");
    }
    // Creating the User in the Database
    const user = await User.create({
        name,
        email,
        password,
        birthdate,
        phone,
    });
    // Generating the Token
    const token = generateToken(user._id);
    // Sending the HTTP-Only cookie to the frontend
    res.cookie("token", token, {
        path: "/",
        httpOnly: true,
        expires: new Date(Date.now() + 24 * 60 * 60 * 1000),
        sameSite: "none",
        secure: true
    });
    if(user){
        res.status(201).json({
            _id: user._id,
            name: user.name,
            email: user.email,
            birthdate: user.birthdate,
            phone: user.phone,
            token
        });
    }else{
        res.status(400);
        throw new Error("Invalid user data.");
    } 
});
const loginUser = asyncHandler(async (req, res) => {
    const { email, password } = req.body;
    // Checking for empty fields
    if (!email || !password) {
        res.status(400);
        throw new Error("Please fill in all the fields.");
    }
    // Checking if email exists in Database
    const user = await User.findOne({ email: email });
    if (!user) {
        res.status(400);
        throw new Error("User does not exist. \nPlease try a different email.");
    }
    // Checking if password is correct
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
        res.status(400);
        throw new Error("Invalid Credentials. \nPlease try again");
    }
    // Generating the Token
    const token = generateToken(user._id);
    // Sending the HTTP-Only cookie to the frontend
    res.cookie("token", token, {
        path: "/",
        httpOnly: true,
        expires: new Date(Date.now() + 24 * 60 * 60 * 1000),
        sameSite: "none",
        secure: true
    });
    if(user && isMatch){
        res.status(201).json({
            _id: user._id,
            name: user.name,
            email: user.email,
            birthdate: user.birthdate,
            phone: user.phone,
            token
        });
    }else{
        res.status(400);
        throw new Error("Invalid  Credentials.");
    } 
});
const logout = asyncHandler(async (req, res) => {
    if(req.cookies.token){
        res.cookie("token", "", { 
            path: "/",
            httpOnly: true,
            expires: new Date(0),
            sameSite: "none",
            secure: true
        });
        res.status(200).send("Logged out successfully.");
    }
    else{
        res.status(400).send("You are not logged in.");
    }
});
const getUser = asyncHandler(async (req, res) => {
    const user = await User.findById(req.user._id);
    if(user){
        const { _id, name, email } = user;
        res.status(201).json({
            _id,
            name,
            email
        });
    }
    else{
        res.status(400).send("User not found.");
    }

});
const loginStatus = asyncHandler(async (req, res) => {
    const token = req.cookies.token;
    if (!token) {
        return res.status(200).json({ isLoggedIn: false });
    }
    const verified = jwt.verify(token, process.env.JWT_SECRET);
    if(verified){
        return res.status(200).json({ isLoggedIn: true });
    }
    else{   
        return res.status(200).json({ isLoggedIn: false });
    }
});

// User Data Manipulation
const updateUser = asyncHandler(async (req, res) => {
    const user = await User.findById(req.user._id);
    if(user){
        const { name, email, birthdate} = user;
        user.email = email;
        user.name = req.body.name || name;
        user.birthdate = req.body.birthdate || birthdate;

        const updatedUser = await user.save();
        return res.status(200).json({
            _id: updatedUser._id,
            name: updatedUser.name,
            email: updatedUser.email,
            birthdate: updatedUser.birthdate
        });
    }
    else{
        res.status(400).send("User not found.");
    }
});
const changePassword = asyncHandler(async (req, res) => {
    const user = await User.findById(req.user._id);
    if (user) {
        const { oldPassword, newPassword } = req.body;
        if (!oldPassword || !newPassword) {
            return res.status(400).json({ error: "Please fill in all fields." });
        }
        if (newPassword.length < 6) {
            return res.status(400).json({ error: "Password must be at least 6 characters long." });
        }
        // Check if password is correct, we need to decrypt the password first.
        const isPasswordCorrect = await bcrypt.compare(oldPassword, user.password);
        if (!isPasswordCorrect) {
            return res.status(401).json({ error: "Invalid credentials." });
        }
        user.password = newPassword;
        await user.save();
        return res.status(200).json({
            _id: user._id,
            name: user.name,
            email: user.email,
        });
    } else {
        return res.status(404).json({ error: "User not found." });
    }
});
const forgotPassword = asyncHandler(async (req, res) => {
    const { email } = req.body;
    if (!email) {
        return res.status(400).json({ error: "Please fill in all fields." });
    }
    const user = await User.findOne({ email: email });
    if (!user) {
        return res.status(404).json({ error: "User not found." });
    }
    // Deleting the token if it exists
    let token = await Token.findOne({ userId: user._id });
    if (token) {
        await token.deleteOne();
        console.log("Deleted token successfully.");
    }
    else{
        console.log("Token not found. A new token will be created and saved.");
    }
    // Creating the reset token
    let resetToken = crypto.randomBytes(32).toString("hex") + user._id;
    // Hashing the reset token
    const hashedResetToken = crypto.createHash("sha256").update(resetToken).digest("hex");
    // Setting the reset token
    user.resetPasswordToken = hashedResetToken;
    // Saving the token to the database
    await new Token({
        userId: user._id,
        token: hashedResetToken,
        createdAt: Date.now(),
        expiresAt: Date.now() + 10 * 60 * 1000 // 10 minutes
    }).save();

    // Creating a reset URL.
    const resetURL = `${process.env.FRONTEND_URL}/resetpassword/${resetToken}`;
    // Sending the email
    const subject = "Password Reset Request";
    const message = `
    <!DOCTYPE html>
    <html>
    <head>
        <meta charset="UTF-8">
        <title>Password Reset</title>
    </head>
    <body>
        <h1>Hello, ${user.name}.</h1>
        <h2>You have requested a password reset.</h2>
        <p>Please click on the link below to reset your password.</p>
        <p>The following link is only valid for 10 minutes.</p>
        <a href="${resetURL}" clicktracking="off">${resetURL}</a>
        <p>Aaqlak Team</p>
    </body>
    </html>
`;
    const send_to = user.email;
    const sent_from = process.env.EMAIL_FROM;

    try {
        await sendEmail(subject, message, send_to, sent_from);
        res.status(200).json({ success: true, message: "Email sent successfully." });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, error: "Email could not be sent." });
    }
});
const resetPassword = asyncHandler(async (req, res) => {
    const { password } = req.body;
    const resetToken = req.params.resetToken; // Assuming the token is passed in the URL as 'resetToken'
    console.log(typeof resetToken); // This should log 'string'
    // We need to compare this token to the hashed version found in the database.
    // Hashing it then comparing it.
    const hashedResetToken = crypto.createHash("sha256").update(resetToken).digest("hex");
    // Checking if the token exists in the database.
    const userToken = await Token.findOne({ token: hashedResetToken, expiresAt: { $gt: Date.now() } });
    if(!userToken){
        return res.status(400).json({ error: "Invalid or expired token." });
    }
    // Checking if user exists.
    const user = await User.findOne({ _id: userToken.userId });
    if(!user){
        return res.status(404).json({ error: "User not found." });
    }
    user.password = password;
    await user.save();
    res.status(200).json({ success: true, message: "Password reset successfully, please login." });
});


module.exports = {
    registerUser,
    loginUser,
    logout,
    getUser,
    loginStatus,
    updateUser,
    changePassword,
    forgotPassword,
    resetPassword
};
