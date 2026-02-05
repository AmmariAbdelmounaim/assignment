import { UIMessage } from "ai";
import { eq } from "drizzle-orm";
import { db } from ".";
import { chats } from "./schema";
import { DbError } from "@/lib/utils";

export async function createChat(
  id: string,
  chatTitle: string,
  messages: UIMessage[]
) {
  try {
    const [chat] = await db
      .insert(chats)
      .values({
        id, // explicit id from useChat
        conversationTitle: chatTitle,
        messages,
      })
      .returning();
    return chat;
  } catch (error) {
    throw new DbError("Failed to retrieve chat by id", error);
  }
}

// updateChatMessages stays the same

// update a chat messages
export async function updateChatMessages(id: string, messages: UIMessage[]) {
  try {
    const [chat] = await db
      .update(chats)
      .set({ messages })
      .where(eq(chats.id, id))
      .returning();

    return chat;
  } catch (error) {
    throw new DbError("Failed to update chat messages", error);
  }
}
