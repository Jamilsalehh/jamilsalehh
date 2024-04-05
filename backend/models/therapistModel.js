const mongoose = require('mongoose');
const bcrypt = require("bcryptjs");

const therapistSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Please add your name."]
    },
    email: {
        type: String,
        required: [true, "Please add your email."],
        unique: true,
        trim: true,
        match: [
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
            "Please enter a valid email."
        ]
    },
    password: {
        type: String,
        required: [true, "Please add your password."],
        minlength: [6, "Password should be at least 6 characters."]
    },
    qualifications: [String], // List of degrees, certifications, etc.
    bio: {
        type: String,
        required: [true, "Please add a bio."]
    },
    availability: {
        type: [String], // This could be specific times or just days they are available
        required: [false, "Please add your availability."]
    },
    // Optional: Link to sessions if therapists have direct control over session management
    sessions: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Session'
    }],
    picture: {
        type: String,
        required: false, 
    }
}, { timestamps: true });

therapistSchema.pre("save", async function(next) {
    if (!this.isModified("password")) {
        return next();
    }
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
});

module.exports = mongoose.model('Therapist', therapistSchema);
