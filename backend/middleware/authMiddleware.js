const asyncHandler = require("express-async-handler");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const User = require("../models/userModel");

const protect = asyncHandler(async (req, res, next) => {
    try{
        const token = req.cookies.token;
        if(!token){
            res.status(401);
            res.send("Not authorized, please login to continue.");
        }const verified = jwt.verify(token, process.env.JWT_SECRET);
        const user = await User.findById(verified.id).select("-password");
        if (!user) {
          return res.status(401).send("Not authorized, no user found.");
        }
        req.user = user;
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