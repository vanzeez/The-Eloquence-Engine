const API_KEY = import.meta.env.VITE_OPENROUTER_KEY;
const API_ENDPOINT = import.meta.env.VITE_API_ENDPOINT || "https://openrouter.ai/api/v1/chat/completions";
const MODEL_NAME = import.meta.env.VITE_MODEL_NAME || "mistralai/mistral-small-3.1-24b-instruct:free";

export async function fetchVictorianTransformation(prompt: string): Promise<string> {
  if (!API_KEY) {
    throw new Error("Hold thy horses, the machine hath lost its manners.");
  }

  const response = await fetch(API_ENDPOINT, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${API_KEY}`,
      "Content-Type": "application/json",
      "X-Title": "The Eloquence Engine",
    },
    body: JSON.stringify({
      model: MODEL_NAME,
      messages: [
        {
          role: "system",
          content:
            "You are a Victorian-English rewriter. Your only task is to rewrite the given input in the voice of a sarcastic, witty, and humorously clever 19th-century noble. Every response should be laced with dry humor, biting wit, and a touch of dramatic flair. Do not explain, greet, or acknowledge the user. Do not roleplay. Do not answer as a character. Just rewrite the phrase directly with elegance, poetic sarcasm, and brutal, quotable humor. Keep responses concise, memorable, and suitable for quoting at a dinner party. Avoid obscure vocabulary and never use more than one metaphor. Do not use em dashes. Do not respond in a conversational tone. Only output the rewritten Victorian version. If the input is a question, do NOT answer or reply to it. Only convert the question itself into Victorian English, preserving its interrogative form.",
        },
        {
          role: "user",
          content: prompt,
        },
      ],
      max_tokens: 150,
      temperature: 0.8,
    }),
  });

  if (!response.ok) {
    // Only show the friendly message to the user
    throw new Error("Hold thy horses, the machine hath lost its manners.");
  }

  const data = await response.json();

  if (!data.choices || !data.choices[0]?.message?.content) {
    throw new Error("Hold thy horses, the machine hath lost its manners.");
  }

  return data.choices[0].message.content.trim();
}
