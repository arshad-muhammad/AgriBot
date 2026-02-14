
import { GoogleGenAI, Type } from "@google/genai";
import { Severity } from "../types";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

const responseSchema = {
  type: Type.OBJECT,
  properties: {
    diagnosis: {
      type: Type.OBJECT,
      properties: {
        diseaseName: { type: Type.STRING },
        confidence: { type: Type.NUMBER },
        description: { type: Type.STRING },
        severity: { type: Type.STRING, description: "One of: Low, Moderate, Severe" }
      },
      required: ["diseaseName", "confidence", "description", "severity"]
    },
    symptoms: {
      type: Type.ARRAY,
      items: { type: Type.STRING }
    },
    causes: {
      type: Type.ARRAY,
      items: { type: Type.STRING }
    },
    treatment: {
      type: Type.OBJECT,
      properties: {
        chemical: { type: Type.STRING },
        organic: { type: Type.STRING },
        dosage: { type: Type.STRING },
        frequency: { type: Type.STRING }
      },
      required: ["chemical", "organic", "dosage", "frequency"]
    },
    preventiveMeasures: {
      type: Type.ARRAY,
      items: { type: Type.STRING }
    }
  },
  required: ["diagnosis", "symptoms", "causes", "treatment", "preventiveMeasures"]
};

export async function analyzeCropImage(
  base64Image: string,
  cropType: string,
  soilType: string,
  userSymptoms: string
) {
  const model = "gemini-3-flash-preview";
  
  const prompt = `
    Act as a professional senior agricultural pathologist. 
    Analyze the following image of a ${cropType} crop planted in ${soilType} soil.
    User observed symptoms: ${userSymptoms || "None provided"}.
    Provide a structured Pattern Analysis and Condition Detection report.
    Use research-grade terminology.
  `;

  const response = await ai.models.generateContent({
    model,
    contents: {
      parts: [
        { text: prompt },
        { inlineData: { mimeType: "image/jpeg", data: base64Image } }
      ]
    },
    config: {
      responseMimeType: "application/json",
      responseSchema
    }
  });

  try {
    return JSON.parse(response.text);
  } catch (error) {
    console.error("Failed to parse analysis result:", error);
    throw new Error("Analysis parsing error");
  }
}
