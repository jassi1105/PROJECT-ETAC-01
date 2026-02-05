const express = require("express");
const customercontroller= require("../controllers/customercontroller.js");
const router = express.Router();

// Create customer
router.post("/", customercontroller.createCustomer);

// Get all customers (supports query params)
router.get("/", customercontroller.getAllCustomers);

// Get customer by ID
router.get("/:customerId", customercontroller.getCustomerById);

module.exports = router;