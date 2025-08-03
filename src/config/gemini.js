// GeminiAPI.js

import { GoogleGenerativeAI } from "@google/generative-ai";

const ai = new GoogleGenerativeAI("AIzaSyBKPZSIkouGc5LiVcb4OI7ipk9jAe6FjXs"); // replace with your valid key

export async function getGeminiResponse(prompt) {
  try {
     
      const model = ai.getGenerativeModel({ model: "gemini-1.5-flash"
    });

    const result = await model.generateContentStream({
      contents: [{ role: "user", parts: [{ text: prompt }] }],
    });

    // ✅ Use `.stream` on the result
    const stream = result.stream;
    let responseText = "";

    for await (const chunk of stream) {
      const chunkText = chunk.text();
      if (chunkText) {
        responseText += chunkText;
      }
    }

    return responseText;
  } catch (err) {
    console.error("Gemini Error:", err);
    return "❌ Gemini failed to respond.";
  }
}
