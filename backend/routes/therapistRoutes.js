const express = require('express');
const router = express.Router();
const protect = require('../middleware/authMiddleware');
const {
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
    getSessions,
    getClients,
    getClient
} = require('../controllers/therapistController');

// Authentication and Profile Management
router.post('/register', register);
router.post('/login', login);
router.get("/logout", logout);
router.get("/getuser", protect, getUser);
router.get("/loggedin", loginStatus);
router.patch("/updateprofile", protect, updateProfile);
router.patch("/changepassword", protect, changePassword);
router.post("/forgotpassword", forgotPassword);
router.put("/resetpassword/:resetToken", resetPassword);
router.patch('/updateavailability', protect, updateAvailability);
router.post('/createsession', protect, createSession); 
router.get('/sessions', protect, getSessions); 
router.get('/sessions/:sessionId', protect, getSession); 
router.patch('/updateSession/:sessionId', protect, updateSession); 
router.delete('/sessions/:sessionId', protect, deleteSession); 
router.get('/clients', protect, getClients);
router.get('/clients/:clientId', protect, getClient);

module.exports = router;
