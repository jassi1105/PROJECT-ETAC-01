const Customer = require("../models/Customer");

// Create customer (global)
const createCustomer = async (req, res) => {
  try {
    const { name, phone, address } = req.body;

    const customer = await Customer.create({
      name,
      phone,
      address
    });

    res.status(201).json({
      message: "Added New Customer successfully",
      customer
    });
  } catch (error) {
    res.status(500).json({ error: error.message,message:"Customer Creation error"});
  }
};

// Get all customers (global search)
const getAllCustomers = async (req, res) => {
  try {
    const customers = await Customer.find(req.query);
    res.json(customers);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get customer by ID
const getCustomerById = async (req, res) => {
  try {
    const customer = await Customer.findById(req.params.customerId);
    if (!customer) {
      return res.status(404).json({ message: "Customer not found" });
    }
    res.json(customer);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports={createCustomer,getAllCustomers,getCustomerById}