const asyncHandler = require('express-async-handler');
const Session = require('../models/sessionModel');
const Therapist = require('../models/therapistModel');
const User = require('../models/userModel');


const createSession = asyncHandler(async (req, res) => {
    const { therapist, user, sessionTime, notes } = req.body;

    if (!therapist || !user || !sessionTime) {
        res.status(400);
        throw new Error('Missing required fields');
    }

    const session = new Session({
        therapist,
        user,
        sessionTime,
        notes,
    });

    await session.save();
    res.status(201).json(session);
});

const getSession = asyncHandler(async (req, res) => {
    const { id } = req.params;

    const session = await Session.findById(id).populate('therapist user', 'name email');

    if (!session) {
        res.status(404);
        throw new Error('Session not found');
    }

    res.status(200).json(session);
});

const updateSession = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const { sessionTime, notes, status } = req.body;

    const session = await Session.findByIdAndUpdate(id, { sessionTime, notes, status }, { new: true });

    if (!session) {
        res.status(404);
        throw new Error('Session not found');
    }

    res.status(200).json(session);
});

const deleteSession = asyncHandler(async (req, res) => {
    const { id } = req.params;

    const session = await Session.findByIdAndDelete(id);

    if (!session) {
        res.status(404);
        throw new Error('Session not found');
    }

    res.status(200).json({ message: 'Session successfully deleted' });
});

const listSessions = asyncHandler(async (req, res) => {
    const sessions = await Session.find({})
                                  .populate('therapist user', 'name email')
                                  .sort({ sessionTime: -1 });

    res.status(200).json(sessions);
});

module.exports = { createSession, getSession, updateSession, deleteSession, listSessions };
