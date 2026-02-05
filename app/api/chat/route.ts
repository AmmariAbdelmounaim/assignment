import { streamText, convertToModelMessages, UIMessage } from "ai";
import { openai } from "@ai-sdk/openai";
import { generateChatTitle } from "@/app/actions";
import { createChat, updateChatMessages } from "@/db/mutations";
import { redirect } from "next/navigation";

export async function POST(req: Request) {
  try {
    const { messages, id }: { messages: UIMessage[]; id?: string } =
      await req.json();

    const result = streamText({
      model: openai("gpt-5.2-codex"),
      messages: await convertToModelMessages(messages),
    });

    return result.toUIMessageStreamResponse({
      originalMessages: messages,
      onFinish: async ({ messages: updatedMessages }) => {
        if (id) {
          // Existing chat: update messages
          await updateChatMessages(id, updatedMessages);
        } else {
          // Safety fallback; realistically, `id` will always be set by useChat.
          const title = await generateChatTitle(
            messages[0]?.parts[0]?.type === "text"
              ? messages[0].parts[0].text
              : "New Chat"
          );
          const generatedId = crypto.randomUUID();
          await createChat(generatedId, title, updatedMessages);
          redirect(`/${generatedId}`); // Navigate to the new post page
        }
      },
    });
  } catch (error) {
    console.error(error);
    return new Response(
      JSON.stringify({
        error: "Internal server error",
      }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      }
    );
  }
}
