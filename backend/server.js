require('dotenv').config(); 
const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const axios = require('axios');

const app = express();
const PORT = 5003;

app.use(cors());
app.use(express.json());

app.post('/analyze', async (req, res) => {
  const { code } = req.body;
  // Use backticks for template literal
  const prompt = `You are an expert in Data Structures and Algorithms. Analyze the following code: ${code}.
  Provide: 
  1. Time and Space Complexity 
  2. Possible Edge Cases 
  3. Suggestions for improvement 
  4. Potential Optimizations 
  5. A one-line motivational message to the student`;

  try {
    
    const response = await axios.post(
      'https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-pro:generateContent',
      {
        contents: [{ parts: [{ text: prompt }] }]
      },
      {
        headers: {
          'Content-Type': 'application/json',
          'x-goog-api-key': process.env.GEMINI_API_KEY
        }
      }
    );
    
  

    const reply = response.data.candidates[0].content.parts[0].text;
    res.json({ answer: reply });
  } catch (error) {
    console.error('Gemini error:', error.response?.data || error.message);
    res.status(500).json({ error: 'Something went wrong with Gemini API' });
  }
});
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
