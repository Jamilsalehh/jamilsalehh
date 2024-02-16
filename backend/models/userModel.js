const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
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
            "Please enter a valid email."]
    },
    password: {
        type: String,
        required: [true, "Please add your password."],
        minlength: [6, "Password should be at least 6 characters."]
    },
    birthdate: {
        type: Date,
        required: [true, "Please add your birthdate."],
    },
    phone: {
        type: String,
        default: "+961-"
    },
    paymentInfo: {
        cardNumber: {
            type: String,
            required: [true, "Please add your card number."]
        },
        cvv: {
            type: String,
            required: [true, "Please add your cvv."],
        },
        expirationDate: {
            type: Date,
            required: [true, "Please add your card's expiration date."],
        }
    },
    subscribedToChatbot: {
        type: Boolean,
        default: false
    },
    sessions: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Session'
    }]
}, { timestamps: true });

module.exports = mongoose.model('User', userSchema);
