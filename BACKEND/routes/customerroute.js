const express = require("express");
const customercontroller= require("../controllers/customercontroller.js");
const router = express.Router();

// Create customer
router.post("/", customercontroller.createCustomer);

// Get all customers (supports query params)
router.get("/", customercontroller.getAllCustomers);

// Get customer by ID
router.get("/:customerId", customercontroller.getCustomerById);

router.post("/add-item", customercontroller.addNewItemToCustomer);

router.delete("/delete-item", customercontroller.deleteRecentItemFromCustomer);

router.post("/receive-payment", customercontroller.receivePaymentFromCustomer);

router.delete("/delete-payment", customercontroller.deleteRecentPaymentFromCustomer);

module.exports = router;