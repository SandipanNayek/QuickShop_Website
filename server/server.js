import express from "express";
import cors from "cors";
import dotenv from "dotenv";

import { google } from "@ai-sdk/google";
import { generateText } from "ai";
import { products } from "../src/components/Products/products.js";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());


app.get("/", (req, res) => {
  res.send("🚀 QuickShop AI Backend Running");
});


app.post("/api/chat", async (req, res) => {
  try {
    const { message } = req.body;

    const { text } = await generateText({
      model: google("gemini-3-flash-preview"),

      prompt: `
You are QuickShop AI.

You are an AI shopping assistant for an e-commerce website.

You MUST answer using ONLY the products listed below.

If a product is not available, politely say:
"Sorry, we don't currently have that product."

Always recommend products from the list.

Mention:
- Product name
- Price
- Category
- Rating (if useful)

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

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});