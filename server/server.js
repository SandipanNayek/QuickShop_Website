import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose";
import Razorpay from "razorpay";

import { google } from "@ai-sdk/google";
import { generateText } from "ai";

import { products } from "../src/components/Products/products.js";
import Contact from "./models/contact.js";
import Order from "./models/order.js";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("✅ MongoDB Connected"))
  .catch((err) => console.log(err));

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});

app.get("/", (req, res) => {
  res.send("🚀 QuickShop Backend Running");
});


// ================= AI CHAT =================

app.post("/api/chat", async (req, res) => {
  try {
    const { message } = req.body;

    const { text } = await generateText({
      model: google("gemini-3-flash-preview"),

      prompt: `
You are QuickShop AI.

You are an AI shopping assistant.

You MUST answer using ONLY these products.

Products:

${JSON.stringify(products, null, 2)}

Customer Question:
${message}
`,
    });

    res.json({
      reply: text,
    });

  } catch (error) {
    console.error(error);

    res.status(500).json({
      reply: "AI is busy. Please try again.",
    });
  }
});


// ================= CONTACT =================

app.post("/api/contact", async (req, res) => {
  try {
    const contact = new Contact(req.body);

    await contact.save();

    res.json({
      success: true,
      message: "Message sent successfully!",
    });

  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Something went wrong.",
    });
  }
});

app.get("/api/contact", async (req, res) => {
  try {
    const contacts = await Contact.find().sort({
      createdAt: -1,
    });

    res.json(contacts);

  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Unable to fetch contacts.",
    });
  }
});

app.delete("/api/contact/:id", async (req, res) => {
  try {
    await Contact.findByIdAndDelete(req.params.id);

    res.json({
      success: true,
      message: "Contact deleted.",
    });

  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Delete failed.",
    });
  }
});


// ================= RAZORPAY =================

app.post("/api/payment/create-order", async (req, res) => {
  try {
    const { amount } = req.body;

    const options = {
      amount: amount * 100,
      currency: "INR",
      receipt: `receipt_${Date.now()}`,
    };

    const order = await razorpay.orders.create(options);

    res.json({
      success: true,
      key: process.env.RAZORPAY_KEY_ID,
      order,
    });

  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Unable to create payment.",
    });
  }
});


// ================= ORDERS =================

app.post("/api/orders", async (req, res) => {
  try {
    const order = new Order(req.body);

    await order.save();

    res.json({
      success: true,
      message: "Order saved successfully.",
    });

  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Unable to save order.",
    });
  }
});

app.get("/api/orders", async (req, res) => {
  try {
    const orders = await Order.find().sort({
      createdAt: -1,
    });

    res.json(orders);

  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Unable to fetch orders.",
    });
  }
});

app.get("/api/orders/:id", async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);

    if (!order) {
      return res.status(404).json({
        success: false,
        message: "Order not found.",
      });
    }

    res.json(order);

  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Unable to fetch order.",
    });
  }
});

app.delete("/api/orders/:id", async (req, res) => {
  try {
    await Order.findByIdAndDelete(req.params.id);

    res.json({
      success: true,
      message: "Order deleted successfully.",
    });

  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Delete failed.",
    });
  }
});


// ================= START SERVER =================

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});