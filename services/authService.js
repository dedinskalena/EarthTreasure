const bcrypt=require('bcrypt')
const User=require('../models/User')
const jwt=require('../lib/jsonwebtoken')
 
const {SECRET}=require('../config')

exports.register=async (userData)=>{
    if(userData.rePassword!==userData.password){
        throw new Error('Password missmatch')
    }
    const user=await User.findOne({email:userData.email})
    if(user){
        throw new Error('User already exists')
    }
    const createdUser=await User.create(userData)
    const token =await generateToken(createdUser)
     
    return token
}

exports.login=async ({email,password})=>{
    //get user from db
    const user=await User.findOne({email})
     if(!user){
        throw new Error('Email or Password is invalid')
     }
    //check password
     const isValid= bcrypt.compare(password,user.password)
     if(!isValid){
        throw new Error('Email or Password is invalid')
     }
    //ganerate token
   const token= await generateToken(user)
   return token
}

function generateToken(user){
    const payload={
        username:user.username,
        email:user.email,
        _id:user._id
    }
    return jwt.sign(payload,SECRET,{expiresIn:'2h'})
    
}