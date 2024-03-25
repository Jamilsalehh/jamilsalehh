const asyncHandler = require("express-async-handler");
const jwt = require("jsonwebtoken");
const User = require("../models/userModel");
const Therapist = require("../models/therapistModel"); // Make sure to import the Therapist model

const protect = asyncHandler(async (req, res, next) => {
    try {
        // Check if the token exists.
        const token = req.cookies.token;
        if (!token) {
            return res.status(401).send("Not authorized, please login to continue.");
        }
        const verified = jwt.verify(token, process.env.JWT_SECRET);

        // Check if the User/Therapist Exists
        let entity = await User.findById(verified.id).select("-password");
        if (!entity) {
            entity = await Therapist.findById(verified.id).select("-password");
        }
        if (!entity) {
            return res.status(401).send("Not authorized, no account found.");
        }
        req.entity = entity; 
        next();
    } catch (error) {
        if (error.name === "TokenExpiredError") {
            return res.status(401).send("Token has expired.");
        } else if (error.name === "JsonWebTokenError") {
            return res.status(401).send("Invalid token.");
        } else {
            console.error(error);
            return res.status(500).send("Unexpected error, please try again later.");
        }
    }
});

module.exports = protect;
