import { victorianPrompt } from "../prompts/victorian_prompt";

/**
 * Transforms modern text into dramatic Victorian prose using an LLM.
 * @param input - The user's modern sentence
 * @returns A Victorian-style rewritten string
 */
export function victorianifyTransform(input: string): string {
  return victorianPrompt(input);
}
