const express=require("express")
const userController=require("../controllers/usercontroller.js")
const router=express.Router()

// Route to create a new user
router.post("/register",userController.createUser)
router.post("/login",userController.checkUser)
// Get user by ID
router.get("/:userId", userController.getUserById);
router.post("/logout",userController.logoutUser)

module.exports=router