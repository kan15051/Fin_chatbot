import { ChatGoogleGenerativeAI } from "@langchain/google-genai";
import 'dotenv/config';

const apiKey = process.env.GEMINI_API_KEY;

if (!apiKey) {
  throw new Error("GEMINI_API_KEY is missing");
}

const llm = new ChatGoogleGenerativeAI({
    apiKey,
    model: "gemini-2.0-flash",
    temperature: 0
});

async function getAIResponse(userMessage) {
  try {
    const response = await llm.invoke([
      { role: "user", content: userMessage }
    ]);

    return {
      role: "ai",
      content: response.content  // response from the model
    };
  } catch (error) {
    console.error("Error calling AI:", error);
    return {
      role: "ai",
      content: "Sorry, I couldn't process your message."
    };
  }
}

export {getAIResponse};
