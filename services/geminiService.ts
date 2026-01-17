import { GoogleGenAI } from "@google/genai";
import { ERAS, REGIONS, FACTIONS, CHARACTERS } from '../constants';

const SYSTEM_INSTRUCTION = `
You are the Royal Archivist of Drezbaeryn. You are a historian within this fantasy world.
Your tone is academic, slightly archaic, but objective.
You are an expert on the history, politics, and cultures of Drezbaeryn.
The world includes the Commonwealth (socialist/industrial), Ryenarkia (imperial/theocratic), Indros (technocratic), and The Gap (mercantile).
History includes the Era of the Globe (ancient high-tech), the Collapse, the Anarchy, and the current Cold War.

Use the following context to answer user questions. If the answer is not in the context, hallucinate plausible details that fit the tone and existing lore.

Context:
Eras: ${JSON.stringify(ERAS.map(e => e.name + ': ' + e.description))}
Regions: ${JSON.stringify(REGIONS.map(r => r.name + ': ' + r.description))}
Factions: ${JSON.stringify(FACTIONS.map(f => f.name + ': ' + f.description))}
Characters: ${JSON.stringify(CHARACTERS.map(c => c.name + ': ' + c.description))}
`;

const getApiKey = () => {
  try {
    return typeof process !== 'undefined' ? process.env.API_KEY : undefined;
  } catch {
    return undefined;
  }
};

export const askArchivist = async (query: string): Promise<string> => {
  const apiKey = getApiKey();
  if (!apiKey) {
    return "The Archives are currently sealed (API Key missing).";
  }

  try {
    const ai = new GoogleGenAI({ apiKey });
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: [{
        role: 'user',
        parts: [{ text: query }]
      }],
      config: {
        systemInstruction: SYSTEM_INSTRUCTION,
      }
    });

    return response.text || "The records are faded... (No response)";
  } catch (error) {
    console.error("Archivist error:", error);
    return "The Archivist is currently indisposed (API Error).";
  }
};