const express=require('express');
const router=express.Router();
const {
    register,
    login,
}=require('../controllers/user');
const {corsMiddleware}=require('../middleware/verify');

// Register
router.post('/register',corsMiddleware,register);

// Login
router.post('/login',corsMiddleware,login);

module.exports=router;
