const mongoose = require("mongoose");

const userCustomerSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true
    },
    customerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Customer",
      required: true,
      index: true
    },
    role: {
      type: String,
      enum: ["owner", "viewer", "editor"],
      default: "viewer"
    }
  },
  { timestamps: true }
);


userCustomerSchema.index({ userId: 1, customerId: 1 }, { unique: true });

module.exports = mongoose.model("UserCustomer", userCustomerSchema);