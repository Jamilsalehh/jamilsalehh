const mongoose = require('mongoose');

const tokenSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User',
        index: true // Improves query performance when looking up tokens by userId
    },
    token: {
        type: String,
        required: true,
        index: true // Improves query performance when looking up tokens by token value
    },
    createdAt: {
        type: Date,
        default: Date.now, // Automatically set the current time when a token is created
        required: true
    },
    expiresAt: { // Fixed typo here
        type: Date,
        required: true,
        index: { expires: '10m' } // Automatically delete the token after 10 minutes
    }
}, { timestamps: true });

module.exports = mongoose.model('Token', tokenSchema);
