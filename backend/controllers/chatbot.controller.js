import OpenAI from "openai";
import dotenv from "dotenv";

dotenv.config();

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY, // Ensure this is correctly set
});

export const chatbotResponse = async (req, res) => {
  try {
    const { message } = req.body;

    if (!message) {
      return res.status(400).json({ error: "Message is required" });
    }

    const response = await openai.chat.completions.create({
      model: "gpt-4",
      messages: [{ role: "user", content: message }],
    });

    if (response.choices && response.choices.length > 0) {
      res.json({ reply: response.choices[0].message.content });
    } else {
      res.status(500).json({ error: "No response from OpenAI" });
    }
  } catch (error) {
    console.error("Chatbot Error:", error);
    res.status(500).json({ error: "Failed to fetch chatbot response" });
  }
};
