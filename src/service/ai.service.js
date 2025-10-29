  const { GoogleGenAI } = require("@google/genai");

const ai = new GoogleGenAI({ apiKey: "AIzaSyBKsOm_5Yw30D1OSVyI1_t55emeDCt-ny0" });

async function generateResponse(prompt) {
  const response = await ai.models.generateContent({
    model: "gemini-2.0-flash",
    contents: prompt,
  });
  return response.text;
}

 module.exports = {
  generateResponse,
 };