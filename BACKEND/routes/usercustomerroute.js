const express = require("express");
const router = express.Router();

const usercustomercontroller= require("../controllers/usercustomercontroller.js");

// Assign customer to user
router.post("/", usercustomercontroller.assignCustomerToUser);

// Get all customers for a user
router.get("/user/:userId", usercustomercontroller.getCustomersByUser);

// Get all users for a customer
router.get("/customer/:customerId", usercustomercontroller.getUsersByCustomer);

// Remove customer from user
router.delete("/user/:userId/customer/:customerId", usercustomercontroller.removeCustomerFromUser);

module.exports = router;