const express = require('express');
const router = express.Router();
const protect = require('../middleware/authMiddleware');
const { 
        registerUser,
        loginUser,
        logout,
        getUser,
        loginStatus,
        updateUser,
        changePassword,
        forgotPassword,
        resetPassword,
        bookSession,
        deleteSession,
        viewSessions
    } = require('../controllers/userController');

router.post('/register', registerUser);
router.post('/login', loginUser);
router.get("/logout", logout);
router.get("/getuser", protect, getUser);
router.get("/loggedin", loginStatus);
router.patch("/updateuser", protect, updateUser);
router.patch("/changepassword", protect, changePassword);
router.post("/forgotpassword", forgotPassword);
router.put("/resetpassword/:resetToken", resetPassword);
router.post('/sessions', protect, bookSession);
router.delete('/sessions/:sessionId', protect, deleteSession); 
router.get('/sessions', protect, viewSessions);

module.exports = router;