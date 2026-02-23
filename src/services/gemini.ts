import { GoogleGenerativeAI } from "@google/generative-ai";

const apiKey = import.meta.env.VITE_GEMINI_API_KEY;
const genAI = new GoogleGenerativeAI(apiKey || "");

export const getGeminiSuggestion = async (destination: string, days: number) => {
    try {
        const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

        const prompt = `Create a detailed ${days}-day travel itinerary for ${destination}. 
    Return the response in a structured JSON format like this:
    {
      "itinerary": [
        {
          "day": 1,
          "activities": [
            { "time": "09:00 AM", "title": "Example Activity", "location": "Example Place", "type": "activity", "notes": "..." }
          ]
        }
      ]
    }
    Include types: flight, hotel, activity, dining, transport.`;

        const result = await model.generateContent(prompt);
        const response = await result.response;
        const text = response.text();

        // Attempt to parse JSON from text (sometimes Gemini wraps JSON in markdown blocks)
        const jsonMatch = text.match(/\{[\s\S]*\}/);
        return jsonMatch ? JSON.parse(jsonMatch[0]) : { error: "Failed to parse suggestions" };
    } catch (error) {
        console.error("Gemini API Error:", error);
        return { error: "Failed to fetch AI suggestions" };
    }
};
