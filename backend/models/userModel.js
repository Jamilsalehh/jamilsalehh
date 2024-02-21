const mongoose = require('mongoose');
const bcrypt = require("bcryptjs");
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
            "Please enter a valid email."
        ]
    },
    password: {
        type: String,
        required: [true, "Please add your password."],
        minlength: [6, "Password should be at least 6 characters."]
    },
    birthdate: {
        type: Date,
        required: [true, "Please add your birthdate."]
    },
    phone: {
        type: String,
        default: "+961-"
    },
    paymentInfo: {
        cardNumber: {
            type: String,
            required: [false, "Please add your card number."],
            validate: {
                validator: function (v) {
                    return /^\d{16}$/.test(v); 
                },
                message: props => `${props.value} is not a valid 16-digit card number!`
            }
        },
        cvv: {
            type: String,
            required: [false, "Please add your CVV."],
            validate: {
                validator: function (v) {
                    return /^\d{3}$/.test(v); 
                },
                message: props => `${props.value} is not a valid CVV!`
            }
        },
        expirationDate: {
            type: Date,
            required: [false, "Please add your card's expiration date."],
            validate: {
                validator: function (v) {
                    return v > Date.now();
                },
                message: props => `${props.value} is not a valid expiration date!`
            }
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

userSchema.pre("save", async function (next) {
    if(!this.isModified("password")) {
        return next();
    }
    // Hashing the password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(this.password, salt);
    this.password = hashedPassword;
    next();
});

module.exports = mongoose.model('User', userSchema);
