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
      type: [String], // e.g. ["Rice", "Oil", "Soap"]
      default: [],
    },

    amount: {
      type: [Number], // e.g. [200, 150, 80]
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