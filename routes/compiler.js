// server.js
const express = require('express');
const router = express.Router()
const axios = require('axios');
const requireLogin = require("../middleware/requireLogin");
const cors = require('cors');

const RAPID_API_KEY = process.env.RAPID_API_KEY; 
const JUDGE0_URL = 'https://judge0-ce.p.rapidapi.com/submissions?base64_encoded=false&wait=true';

router.post('/compile', async (req, res) => {
  const { source_code, language_id, stdin } = req.body;

  try {
    const response = await axios.post(
      JUDGE0_URL,
      { source_code, language_id, stdin },
      {
        headers: {
          'Content-Type': 'application/json',
          'X-RapidAPI-Key': RAPID_API_KEY,
          'X-RapidAPI-Host': 'judge0-ce.p.rapidapi.com',
        }
      }
    );

    res.json(response.data);
  } catch (error) {
    console.error('Compilation Error:', error.response?.data || error.message);
    res.status(500).json({ error: 'Error compiling code.' });
  }
});

module.exports= router
