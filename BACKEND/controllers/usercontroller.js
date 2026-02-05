const user=require("../models/User.js")
const bcrypt=require("bcrypt")

// Create a new user

const createUser=async(req,res)=>{
    try{
        const {name,email,password}=req.body
        const newuser=await user.findOne({email})
        if(newuser){
            return res.status(409).json({error:"User already exists!"})
        }
        const hashedPassword=await bcrypt.hash(password,10)
        const newUser=new user({name,email,password:hashedPassword})
        const savedUser=await newUser.save()
        req.session.User_Id = newUser._id.toString();
        res.status(201).json({message:"Registered successfully!",user:savedUser})
       
    }catch(err){
        console.log("createUser failed:",err)
        res.status(500).json({message:"Registeration failed!", error:err.message})
        
    }
}


const checkUser=async(req,res)=>{
    try{
        const {email,password}=req.body
        const existingUser=await user.findOne({email})
        if(!existingUser){
            return res.status(404).json({error:"User not found!",person:false})
        }
        const isPasswordValid=await bcrypt.compare(password,existingUser.password)
        if(!isPasswordValid){
            return res.status(401).json({error:"Invalid password!",person:true})
        }
        req.session.User_Id = existingUser._id.toString();
        req.session.isAuth=true
        
        res.status(200).json({message:"Loged in successfully!",user:existingUser})
    }catch(err){
        console.log("checkUser failed:",err)
        res.status(500).json({message:"Login failed!", error:err.message})
    }
}   



const logoutUser = async (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      console.log("logoutUser failed in destroying session:", err);
      return res.status(500).json({
        error: "Logout failed",
      });
    }
    res.clearCookie("sid", {
      httpOnly: true,
      secure: false,
      sameSite: "lax",
    });
    return res.status(200).json({
      message: "Logout successful!",
    });
  });
};


const getUserById = async (req, res) => {
  try {
    const is_user = await user.findById(req.params.userId).select("-password");
    if (!is_user) {
      return res.status(404).json({ error: "User not found" });
    }
    res.json(is_user);
  } catch (error) {
    console.log("getUserById failed:",error)
    res.status(500).json({ error: error.message });
  }
};



module.exports={createUser,checkUser,getUserById,logoutUser} 

