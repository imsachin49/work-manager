const express=require('express');
const router=express.Router();
const User=require('../models/User');
const bcrypt=require('bcryptjs');
const jwt=require('jsonwebtoken');

// Register
const register=async(req,res)=>{
    const {name,email,password}=req.body;
    console.log(req.body)
    try{
        if(!name || !email || !password){
            res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000/'); // add this line
            return res.status(400).json({message:"Please enter all fields"});
        }
        const user=await User.findOne({email});
        if(user){
            res.setHeader('Access-Control-Allow-Origin', '*'); // add this line
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
        res.setHeader('Access-Control-Allow-Origin', '*'); // add this line
        res.status(200).json({message:"User registered successfully"});
    }catch(err){
        res.status(500).json({message:"Something went wrong"});
    }
}

// Login
const login=async(req,res)=>{
    const {email,password}=req.body;
    try{
        if(!email || !password){
            res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000'); // add this line
            return res.status(400).json({message:"Please enter all fields"});
        }
        const user=await User.findOne({email});
        if(!user){
            res.setHeader('Access-Control-Allow-Origin', '*'); // add this line
            return res.status(400).json({message:"User does not exists"});
        }
        const isMatch=await bcrypt.compare(password,user.password);
        if(!isMatch){
            res.setHeader('Access-Control-Allow-Origin', '*'); // add this line
            return res.status(400).json({message:"Invalid credentials"});
        }
        const token=jwt.sign({_id:user._id},process.env.JWT_SECRET,{expiresIn:"30d"});
        res.setHeader('Access-Control-Allow-Origin', '*'); // add this line
        res.status(200).json({token,user:{id:user._id,name:user.name,email:user.email}});
    }catch(err){
        res.status(500).json({message:"Something went wrong"});
    }
}

module.exports={register,login};
