const asyncHandler = require("express-async-handler");
const User = require("../models/userModel");

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

    if(user){
        res.status(201).json({
            _id: user._id,
            name: user.name,
            email: user.email,
            birthdate: user.birthdate,
            phone: user.phone
        });
    }else{
        res.status(400);
        throw new Error("Invalid user data.");
    }
    
});

module.exports = {
    registerUser,
};
