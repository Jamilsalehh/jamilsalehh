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
    getSessions
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
router.post('/sessions', protect, createSession); 
router.get('/sessions', protect, getSessions); 
router.get('/sessions/:sessionId', protect, getSession); 
router.patch('/sessions/:sessionId', protect, updateSession); 
router.delete('/sessions/:sessionId', protect, deleteSession); 

module.exports = router;
