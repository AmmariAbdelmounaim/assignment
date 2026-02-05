"use server";

import { openai } from "@ai-sdk/openai";
import { generateText } from "ai";

export async function generateChatTitle(initalMessage: string) {
  const { text } = await generateText({
    // use a smaller, faster model since we only need a short title
    model: openai("gpt-4o-mini"),
    prompt: `You are naming a chat conversation based on the user's first message.

Initial user message:
"${initalMessage}"

Respond with a short, clear, and descriptive title (max 8 words), without quotes or punctuation at the end.`,
  });
  return text;
}
