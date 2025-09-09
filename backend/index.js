import express from "express";
import cors from "cors";
import fs from "fs";
import { getAIResponse } from "./llm.js";

const app = express();
const port = 3000;

// Middleware to parse JSON bodies
app.use(express.json());
app.use(cors());

// API endpoint to handle new messages
app.post('/api/messages', (req, res) => {
    const { message } = req.body;
    const filePath = './messages.json';

    if (!message) {
        return res.status(400).json({ error: 'Message and owner are required.' });
    }

    fs.readFile(filePath, 'utf8', (err, data) => {
        if (err) {
            console.error('Error reading file:', err);
            return res.status(500).json({ error: 'Failed to read messages file.' });
        }

        try {
            const messages = JSON.parse(data);
            const newMessage = message;
            messages.push(newMessage);

            fs.writeFile(filePath, JSON.stringify(messages, null, 2), 'utf8', (err) => {
                if (err) {
                    console.error('Error writing file:', err);
                    return res.status(500).json({ error: 'Failed to write messages file.' });
                }
                res.status(200).json({ success: true, message: 'Message saved successfully.' });
            });
        } catch (parseErr) {
            console.error('Error parsing JSON:', parseErr);
            res.status(500).json({ error: 'Failed to parse JSON data.' });
        }
    });
});

app.post('/api/ai/messages', async (req, res) => {
  const { message } = req.body;

  if (!message) {
    return res.status(400).json({ error: 'Missing message in request body' });
  }

  try {
    const aiMessage = await getAIResponse(message);
    res.json(aiMessage);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to get AI response" });
  }
});

app.listen(port, () => {
    console.log(`Server listening on http://localhost:${port}`);
});