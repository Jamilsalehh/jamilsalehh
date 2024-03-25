const mongoose = require('mongoose');

const sessionSchema = new mongoose.Schema({
    therapist: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Therapist',
        required: true,
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    sessionTime: {
        type: Date,
        required: true,
    },
    status: {
        type: String,
        enum: ['scheduled', 'completed', 'cancelled'],
        default: 'scheduled',
    },
    notes: {
        type: String,
        default: '',
    },
}, { timestamps: true });

module.exports = mongoose.model('Session', sessionSchema);
