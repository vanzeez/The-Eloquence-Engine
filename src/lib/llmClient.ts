import { victorianifyTransform } from "../tools/victorianify";

const API_KEY = import.meta.env.VITE_OPENROUTER_KEY;
const API_ENDPOINT = import.meta.env.VITE_API_ENDPOINT || "https://openrouter.ai/api/v1/chat/completions";
const MODEL_NAME = import.meta.env.VITE_MODEL_NAME || "meta-llama/llama-4-maverick:free";

// MCP-style tool schema for Victorianify
const victorianifyTool = [
  {
    type: "function",
    function: {
      name: "victorianify",
      description: "Transforms modern text into Victorian prose.",
      parameters: {
        type: "object",
        properties: {
          input: { type: "string", description: "Modern text to transform" },
        },
        required: ["input"],
      },
    },
  },
] as const;

// The actual transformation logic (can be imported or defined here)
function victorianify(input: string): string {
  return victorianifyTransform(input);
}

interface Message {
  role: string;
  content?: string;
  tool_calls?: any;
  tool_call_id?: string;
  name?: string;
}

// MCP-style function: handles tool calling
export async function fetchVictorianTransformationMCP(userInput: string): Promise<string> {
  if (!API_KEY) {
    throw new Error("Hold thy horses, the machine hath lost its manners.");
  }

  // Step 1: Send initial request with tool schema
  const messages: Message[] = [
    {
      role: "system",
      content:
        "You are a Victorian-English rewriter. Use the 'victorianify' tool to transform modern text into Victorian prose. Do not answer directly; always use the tool.",
    },
    {
      role: "user",
      content: userInput,
    },
  ];

  const initialResponse = await fetch(API_ENDPOINT, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${API_KEY}`,
      "Content-Type": "application/json",
      "X-Title": "The Eloquence Engine",
    },
    body: JSON.stringify({
      model: MODEL_NAME,
      messages,
      tools: victorianifyTool,
      tool_choice: "auto",
      max_tokens: 150,
      temperature: 0.8,
    }),
  });

  if (!initialResponse.ok) {
    throw new Error("Hold thy horses, the machine hath lost its manners.");
  }

  const data = await initialResponse.json();
  const message = data.choices?.[0]?.message;

  // Step 2: If the model requests a tool call, handle it
  if (message?.tool_calls && message.tool_calls.length > 0) {
    const toolCall = message.tool_calls[0];
    if (toolCall.function?.name === "victorianify") {
      const args = JSON.parse(toolCall.function.arguments);
      const toolResult = victorianify(args.input);
      // Step 3: Send tool result back to the model for final answer
      messages.push({
        role: "assistant",
        tool_calls: message.tool_calls,
      });
      messages.push({
        role: "tool",
        tool_call_id: toolCall.id,
        name: "victorianify",
        content: toolResult,
      });
      const finalResponse = await fetch(API_ENDPOINT, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${API_KEY}`,
          "Content-Type": "application/json",
          "X-Title": "The Eloquence Engine",
        },
        body: JSON.stringify({
          model: MODEL_NAME,
          messages,
          tools: victorianifyTool,
          max_tokens: 150,
          temperature: 0.8,
        }),
      });
      if (!finalResponse.ok) {
        throw new Error("Hold thy horses, the machine hath lost its manners.");
      }
      const finalData = await finalResponse.json();
      return finalData.choices?.[0]?.message?.content?.trim() || "";
    }
  }

  // If no tool call, fallback to plain response
  return message?.content?.trim() || "";
}
