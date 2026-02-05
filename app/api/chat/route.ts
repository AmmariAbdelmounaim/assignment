import { streamText, convertToModelMessages, UIMessage } from "ai";
import { openai } from "@ai-sdk/openai";
import { generateChatTitle } from "@/app/actions";
import { createChat, updateChatMessages } from "@/db/mutations";
import { revalidatePath } from "next/cache";

export async function POST(req: Request) {
  try {
    const { messages, id }: { messages: UIMessage[]; id: string } =
      await req.json();

    const result = streamText({
      model: openai("gpt-5.2-codex"),
      messages: await convertToModelMessages(messages),
    });

    return result.toUIMessageStreamResponse({
      originalMessages: messages,
      onFinish: async ({ messages: updatedMessages }) => {
        if (messages.length > 1) {
          // Existing chat: update messages
          await updateChatMessages(id, updatedMessages);
        } else {
          // Safety fallback; realistically, `id` will always be set by useChat.
          const title = await generateChatTitle(
            messages[0]?.parts[0]?.type === "text"
              ? messages[0].parts[0].text
              : "New Chat"
          );
          await createChat(id, title, updatedMessages);
        }

        // Revalidate the root layout so `getChatTitles` in `app/layout.tsx`
        // is re-run and the sidebar chat list stays in sync.
        revalidatePath("/", "layout");
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
