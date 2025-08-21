// GeminiAPI.js

import { GoogleGenerativeAI } from "@google/generative-ai";

const ai = new GoogleGenerativeAI("AIzaSyB7kIkVqYlTR3lWe90FhKPDfximpv0SKnE"); // replace with your valid key

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
    console.error("Gembot Error:", err);
    return "❌ Gembot failed to respond.";
  }
}
