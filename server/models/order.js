import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
  userEmail: {
    type: String,
    required: true,
  },

  customerName: {
    type: String,
    required: true,
  },

  phone: {
    type: String,
    required: true,
  },

  address: {
    type: String,
    required: true,
  },

  city: {
    type: String,
    required: true,
  },

  items: [
    {
      id: Number,
      title: String,
      price: Number,
      quantity: Number,
      image: String,
    },
  ],

  total: Number,

  paymentMethod: String,

  paymentStatus: {
    type: String,
    default: "Pending",
  },

  orderStatus: {
    type: String,
    default: "Ordered",
  },

  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.model("Order", orderSchema);