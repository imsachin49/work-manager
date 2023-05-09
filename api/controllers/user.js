const express=require('express');
const router=express.Router();
const User=require('../models/User');
const bcrypt=require('bcryptjs');
const jwt=require('jsonwebtoken');

// Register
const register=async(req,res)=>{
    const {name,email,password}=req.body;
    console.log(req.body)
    if(!name || !email || !password){
        return res.status(400).json({message:"Please enter all fields"});
    }
    const user=await User.findOne({email});
    if(user){
        return res.status(400).json({message:"User already exists"});
    }
    const salt=await bcrypt.genSalt(10);
    const hash=await bcrypt.hash(password,salt);
    const newUser=new User({
        name,
        email,
        password:hash
    });
    await newUser.save();
    res.status(200).json({message:"User registered successfully"});
}

// Login
const login=async(req,res)=>{
    const {email,password}=req.body;
    if(!email || !password){
        return res.status(400).json({message:"Please enter all fields"});
    }
    const user=await User.findOne({email});
    if(!user){
        return res.status(400).json({message:"User does not exists"});
    }
    const isMatch=await bcrypt.compare(password,user.password);
    if(!isMatch){
        return res.status(400).json({message:"Invalid credentials"});
    }
    const token=jwt.sign({_id:user._id},process.env.JWT_SECRET,{expiresIn:"30d"});
    res.status(200).json({token,user:{id:user._id,name:user.name,email:user.email}});
}

module.exports={register,login};
