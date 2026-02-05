const UserCustomer = require("../models/UserCustomer");

// Assign customer to user
const assignCustomerToUser = async (req, res) => {
  try {
    const { customerId, role } = req.body;

    if (!req.session.User_Id) {
      return res.status(401).json({ error: "Unauthorized" });
    }

    const userId = req.session.User_Id;

    const link = await UserCustomer.create({
      userId,
      customerId,
      role,
    });

    res.status(201).json({
      message: "Customer assigned to user",
      link,
    });

  } catch (error) {
    if (error.code === 11000) {
      return res.status(409).json({
        error: "Customer already assigned to this user",
      });
    }

    res.status(500).json({ error: error.message });
  }
};

// Get all customers for a user
const getCustomersByUser = async (req, res) => {
  try {
    const { userId } = req.params;

    const customers = await UserCustomer.find({ userId })
      .populate("customerId");

    res.json(customers);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get all users for a customer
const getUsersByCustomer = async (req, res) => {
  try {
    const { customerId } = req.params;

    const users = await UserCustomer.find({ customerId })
      .populate("userId", "-password");

    res.json(users);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Remove customer from user
const removeCustomerFromUser = async (req, res) => {
  try {
    const { userId, customerId } = req.params;

    await UserCustomer.findOneAndDelete({ userId, customerId });

    res.json({ message: "Customer removed from user" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports={assignCustomerToUser,getCustomersByUser,getUsersByCustomer,removeCustomerFromUser}
