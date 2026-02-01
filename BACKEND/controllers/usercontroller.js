const user=require("../models/User.js")

// Create a new user

const createUser=async(req,res)=>{
    try{
        const {name,email,password}=req.body
        const newUser=new user({name,email,password})
        const savedUser=await newUser.save()
        res.status(201).json({message:"User created successfully",user:savedUser})
    }catch(err){
        res.status(500).json({message:"Error creating user", error:err.message})
        
    }
}

module.exports={createUser} 