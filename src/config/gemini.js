// GeminiAPI.js

import { GoogleGenerativeAI } from "@google/generative-ai";

const ai = new GoogleGenerativeAI("AIzaSyBKPZSIkouGc5LiVcb4OI7ipk9jAe6FjXs"); // replace with your valid key

export async function getGeminiResponse(prompt) {
  try {
const model = ai.getGenerativeModel({
  model: "gemini-1.5-flash",
  systemInstruction: `
    Respond to any query or question using full sentences.
    Do not use * or ** for emphasis.
    If emphasizing something, use line breaks and clear text formatting like:
    - Start headings on a new line in uppercase (e.g., "CLAUSE MATCHED:")
    - Use colons and spacing for structure (e.g., "Reasoning: The policy...")
    Avoid markdown-style formatting. Keep everything in plain text.
  `,
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
