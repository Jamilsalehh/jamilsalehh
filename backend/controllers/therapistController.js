const asyncHandler = require("express-async-handler");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const Therapist = require("../models/therapistModel");
const Session = require("../models/sessionModel");
const Token = require("../models/tokenModel");
const crypto = require("crypto");
const sendEmail = require('../utils/sendEmail'); 

// Helper to generate JWT
const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "1d" });
};

// Register Therapist
// TESTED
const register = asyncHandler(async (req, res) => {
    const { name, email, password, qualifications, bio, availability, picture } = req.body;

    if (!name || !email || !password || !qualifications || !bio || !availability) {
        res.status(400);
        throw new Error("Please fill in all required fields.");
    }

    if (password.length < 6) {
        res.status(400);
        throw new Error("Password should be at least 6 characters.");
    }

    const exists = await Therapist.findOne({ email });
    if (exists) {
        res.status(400);
        throw new Error("Email already exists, please try another one.");
    }

    const therapist = await Therapist.create({
        name,
        email,
        password, // This will be hashed in the model's pre-save middleware
        qualifications,
        bio,
        availability,
        picture
    });

    const token = generateToken(therapist._id);

    res.status(201).json({
        _id: therapist._id,
        name: therapist.name,
        email: therapist.email,
        token
    });
});
// TESTED
const login = asyncHandler(async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        res.status(400);
        throw new Error("Please fill in all fields.");
    }

    const therapist = await Therapist.findOne({ email });

    if (therapist && (await bcrypt.compare(password, therapist.password))) {
        res.cookie("token", generateToken(therapist._id), {
            path: "/",
            httpOnly: true,
            expires: new Date(Date.now() + 24 * 60 * 60 * 1000), // Example: 1 day
            sameSite: "none", // Adjust based on your cross-site request needs
            secure: true // Set to true if you're serving your site over HTTPS
        }).status(201).json({
            _id: therapist._id,
            name: therapist.name,
            email: therapist.email
        });
        
    } else {
        res.status(401);
        throw new Error("Invalid email or password");
    }
});
// TESTED
const logout = asyncHandler(async (req, res) => {
    if(req.cookies.token){
        res.cookie("token", "", { 
            expires: new Date(0), 
            path: '/', 
            httpOnly: true, 
            sameSite: 'None', 
            secure: true 
        });
        res.status(200).send("Logged out successfully.");
    }
    else{
        res.status(400).send("You are not logged in.");
    }
});
// TESTED
const getUser = asyncHandler(async (req, res) => {
    const user = await Therapist.findById(req.entity._id);
    if(user){
        const { _id, name, email, token } = user;
        res.status(201).json({
            _id,
            name,
            email,
            token
        });
    }
    else{
        res.status(400).send("User not found.");
    }
});
// TESTED
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

// Profile Manipulation Methods.
// TESTED
const updateProfile = asyncHandler(async (req, res) => {
    const therapist = await Therapist.findById(req.entity._id);

    if (!therapist) {
        res.status(404);
        throw new Error("Therapist not found");
    }

    const { name, qualifications, bio, availability } = req.body;
    therapist.name = name || therapist.name;
    therapist.qualifications = qualifications || therapist.qualifications;
    therapist.bio = bio || therapist.bio;
    therapist.availability = availability || therapist.availability;

    const updatedTherapist = await therapist.save();
    res.status(200).json(updatedTherapist);
});
// TESTED
const changePassword = asyncHandler(async (req, res) => {
    const user = await Therapist.findById(req.entity._id);
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
// TESTED
const updateAvailability = asyncHandler(async (req, res) => {
    const { availability } = req.body;
    const therapistId = req.entity._id;
    const therapist = await Therapist.findByIdAndUpdate(therapistId, { availability }, { new: true });
    if (!therapist) {
        return res.status(404).json({ message: "Therapist not found" });
    }
    res.status(200).json({ message: "Availability updated successfully", availability: therapist.availability });
});
const forgotPassword = asyncHandler(async (req, res) => {
    const { email } = req.body;
    if (!email) {
        return res.status(400).json({ error: "Please fill in all fields." });
    }
    const user = await Therapist.findOne({ email: email });
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
    const user = await Therapist.findOne({ _id: userToken.userId });
    if(!user){
        return res.status(404).json({ error: "User not found." });
    }
    user.password = password;
    await user.save();
    res.status(200).json({ success: true, message: "Password reset successfully, please login." });
});

// Session Management.
// TESTED
const createSession = asyncHandler(async (req, res) => {
    const { user, sessionTime, notes } = req.body;
    const therapistId = req.entity._id;

    if (!user || !sessionTime) {
        return res.status(400).json({ message: "Missing required session details" });
    }

    const session = await Session.create({
        therapist: therapistId,
        user,
        sessionTime,
        notes,
    });

    res.status(201).json(session);
});
// TESTED
const getSessions = asyncHandler(async (req, res) => {
    const therapistId = req.entity._id; // Ensure authentication middleware populates this

    const sessions = await Session.find({ therapist: therapistId })
                                   .populate('user', 'name email') // Adjust according to what you need
                                   .sort({ sessionTime: 1 }); // Sorting by session time

    res.status(200).json(sessions);
});
// TESTED
const getSession = asyncHandler(async (req, res) => {
    const therapistId = req.entity._id;
    const sessionId = req.params.id;
    const session = await Session.findOne({ _id: sessionId, therapist: therapistId });

    if (!session) {
        return res.status(404).json({ message: "Session not found" });
    }

    res.status(200).json(session);
});
const updateSession = asyncHandler(async (req, res) => {
    const { sessionTime, notes } = req.body;
    const therapistId = req.entity._id; // Ensure this is populated from the token in middleware
    const sessionId = req.params.id;

    if (!sessionTime) {
        return res.status(400).json({ message: "Missing required session details" });
    }

    const session = await Session.findOneAndUpdate(
        { _id: sessionId, therapist: therapistId },
        { sessionTime, notes },
        { new: true }
    );

    if (!session) {
        return res.status(404).json({ message: "Session not found" });
    }

    res.status(200).json(session);
});
const deleteSession = asyncHandler(async (req, res) => {
    const therapistId = req.entity._id;
    const sessionId = req.params.id;

    const session = await Session.findOneAndDelete({ _id: sessionId, therapist: therapistId });

    if (!session) {
        return res.status(404).json({ message: "Session not found" });
    }

    res.status(200).json({ message: "Session deleted successfully" });
});



module.exports = {
    register,
    login,
    logout,
    getUser,
    loginStatus,
    updateProfile,
    changePassword,
    forgotPassword,
    resetPassword,
    updateAvailability,
    createSession,
    updateSession,
    deleteSession,
    getSession,
    getSessions
};
