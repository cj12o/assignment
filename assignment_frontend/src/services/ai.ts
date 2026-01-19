import { products } from "../data/products";

export interface RecommendationResponse {
  recommendedIds: number[];
  reasoning: string;
}

export const getRecommendations = async (
  apiKey: string,
  userPreference: string = "general",
): Promise<RecommendationResponse> => {
  if (!apiKey) {
    throw new Error("API Key is required");
  }

  const productList = products.map((p) => ({
    id: p.id,
    name: p.name,
    category: p.category,
    description: p.description,
    price: p.price,
  }));

  const prompt = `
    You are a helpful shopping assistant.
    Available products: ${JSON.stringify(productList)}
    
    User preference: "${userPreference}"
    
    Based on the user preference, recommend up to 4 distinct products from the available list.
    Return ONLY a valid JSON object with the following structure, no other text:
    {
      "recommendedIds": [id1, id2, ...],
      "reasoning": "A short sentence explaining why these were chosen."
    }
  `;

  try {
    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: "gpt-3.5-turbo",
        messages: [{ role: "user", content: prompt }],
        temperature: 0.7,
      }),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(
        errorData.error?.message || `API Error: ${response.statusText}`,
      );
    }

    const data = await response.json();
    const content = data.choices[0]?.message?.content;

    try {
      return JSON.parse(content);
    } catch (e) {
      console.error("Failed to parse AI response:", content);
      throw new Error("Failed to parse recommendations from AI");
    }
  } catch (error: any) {
    console.error("Error getting recommendations:", error);
    throw new Error(error.message || "Failed to fetch recommendations");
  }
};
