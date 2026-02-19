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

const addNewItemToCustomer = async (req, res) => {
  try {
    const { itemdata,customerId } = req.body;

    const customer = await Customer.findById(customerId);

    if (!customer) {
      return res.status(404).json({ error:"Customer does not exist or incorrect customer ID "+customerId });
    }
    

    customer.items.push({ itemName: itemdata.itemName, price: Number(itemdata.price), quantity: Number(itemdata.quantity) });
    customer.totalAmount += Number(itemdata.price) * Number(itemdata.quantity);
    customer.remainingAmount += Number(itemdata.price) * Number(itemdata.quantity);

    await customer.save();

    res.status(200).json({
      message: "Item added to customer successfully",
      customer
    });

  } catch (error) {
    res.status(500).json({ error: error.message });
    console.error("Error adding item to customer:", error);
  }
};  


const deleteRecentItemFromCustomer = async (req, res) => {
  try {
    const { customerId } = req.body;

    const customer = await Customer.findById(customerId);

    if (!customer) {
      return res.status(404).json({ error:"Customer does not exist or incorrect customer ID "+customerId });
    }

    const recentItem = customer.items.pop();

    if (recentItem) {
      const amountToDeduct = recentItem.price * recentItem.quantity;
      customer.totalAmount -= amountToDeduct;
      customer.remainingAmount -= amountToDeduct;
      await customer.save();
    }

    res.status(200).json({
      message: "Most recent item deleted from customer successfully",
      customer
    });

  } catch (error) {
    res.status(500).json({ error: error.message });
    console.error("Error deleting item from customer:", error);
  }
};  

const deleteRecentPaymentFromCustomer = async (req, res) => {
  try{
    const {customerId}=req.body
    const customer=await Customer.findById(customerId)
    if(!customer){
      return res.status(404).json({error:"Customer does not exist or incorrect customer ID "+customerId})
    }
    const recentPayment=customer.amount.pop()
    if(recentPayment){
      customer.remainingAmount += recentPayment.paidAmount
      customer.paidAmount -= recentPayment.paidAmount
      await customer.save()
    }
    res.status(200).json({
      message:"Most recent payment deleted from customer successfully",
      customer
    })

  }catch(error){
    res.status(500).json({error:error.message})
    console.error("Error deleting payment from customer:",error)
  }
} 




const receivePaymentFromCustomer = async (req, res) => {
  try{
    const {customerId,paymentData}=req.body

    const customer =await Customer.findById(customerId)
    if(!customer){
      return res.status(404).json({error:"Customer does not exist or incorrect customer ID "+customerId})
    }
    customer.amount.push({paidAmount: Number(paymentData.paidAmount), via: paymentData.via})
    customer.remainingAmount -= Number(paymentData.paidAmount)
    customer.paidAmount += Number(paymentData.paidAmount)
    await customer.save()
    res.status(200).json({
      message:"Payment received from customer successfully",
      customer
    })  
  }
  catch(error){
    res.status(500).json({error:error.message})
    console.error("Error receiving payment from customer:",error)
  }
}








module.exports={createCustomer,getAllCustomers,getCustomerById,addNewItemToCustomer,deleteRecentItemFromCustomer,
  receivePaymentFromCustomer,deleteRecentPaymentFromCustomer}