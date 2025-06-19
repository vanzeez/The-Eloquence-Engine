import { victorianPrompt } from "../prompts/victorian_prompt";
import { fetchVictorianTransformation } from "../lib/llmClient";

/**
 * Transforms modern text into dramatic Victorian prose using an LLM.
 * @param input - The user's modern sentence
 * @returns A Victorian-style rewritten string
 */
export async function victorianify(input: string): Promise<string> {
  const prompt = victorianPrompt(input);
  const response = await fetchVictorianTransformation(prompt);
  return response;
}
