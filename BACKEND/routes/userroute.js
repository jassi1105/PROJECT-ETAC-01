const express=require("express")
const userController=require("../controllers/usercontroller.js")

const router=express.Router()

// Route to create a new user
router.post("/register",userController.createUser)

module.exports=router