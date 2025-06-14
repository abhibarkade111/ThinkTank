const express = require("express");
const router = express.Router()
const requireLogin = require("../middleware/requireLogin");
const axios = require("axios");

// const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
// console.log(process.env.OPENAI_API_KEY)

const API_KEY = process.env.MISTRAL_API_KEY;
const MISTRAL_API_URL = "https://api.mistral.ai/v1/chat/completions"; // Mistral API endpoint

router.post("/chat", async (req, res) => {
  try {
    const { message } = req.body;

    const response = await axios.post(
      MISTRAL_API_URL,
      {
        model: "mistral-small", // You can also use mistral-medium, mistral-large
        messages: [{ role: "user", content: message }],
        max_tokens: 200,
        temperature: 0.7
      },
      {
        headers: {
          "Authorization": `Bearer ${API_KEY}`,
          "Content-Type": "application/json"
        }
      }
    );

    res.json(response.data);
  } catch (error) {
    console.error("Error:", error.response ? error.response.data : error.message);
    res.status(500).json({ error: "Error fetching response from Mistral AI" });
  }
});


module.exports= router