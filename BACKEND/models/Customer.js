const mongoose=require("mongoose")

const customerSchema =new mongoose.Schema({
    name:{
        type: String,
        required: true,
        trim: true
    },
    phone:{
        type: Number,
        index: true,
        unique:true,

    },
    address:{
         type: String,
         index: true

    },
    items: {
      type: [{
        itemName: String, // e.g. "Rice"
        price: Number,    // e.g. 200
        quantity: Number, // e.g. 1
      }], // e.g. ["Rice", "Oil", "Soap"]
      default: [],
    },

    amount: {
      type: [{
        paidAmount: Number,      // e.g. 200
        via: String,             // e.g. "Cash", "Card", "Online"
      }], // e.g. [200, 150, 80]
      default: [],
    },

    // ✅ 3 data variables
    totalAmount: {
      type: Number,
      default: 0,
    },

    paidAmount: {
      type: Number,
      default: 0,
    },

    remainingAmount: {
      type: Number,
      default: 0,
    }
},{ timestamps: true })

module.exports=mongoose.model("Customer",customerSchema)