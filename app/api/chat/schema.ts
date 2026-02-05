import { z } from "zod";

// Schema for a text UI message part.
const textUIPartSchema = z
  .object({
    type: z.literal("text"),
    text: z
      .string()
      .min(1, "Message must be at least 1 character long.")
      .max(200, "Message must be at most 200 characters long."),
    // optional fields from the AI SDK `TextUIPart` type
    state: z.enum(["streaming", "done"]).optional(),
    // use loose validation for providerMetadata to avoid tight coupling
    providerMetadata: z.unknown().optional(),
  })
  .loose();

// Schema for the UI message used by the chat route.
// We constrain `parts` to text parts only and validate their length.
export const uiMessageSchema = z
  .object({
    id: z.string(),
    role: z.enum(["system", "user", "assistant"]),
    parts: z.array(textUIPartSchema),
    metadata: z.unknown().optional(),
  })
  .loose();

// Schema for the chat route request body
export const chatRequestSchema = z.object({
  messages: z.array(uiMessageSchema),
});

export type ChatRequest = z.infer<typeof chatRequestSchema>;
