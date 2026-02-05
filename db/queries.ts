"server only";

import { DbError } from "@/lib/utils";
import { db } from "./index";
import { Chat, ChatTitle } from "./schema";
import { cacheTag } from "next/cache";

// a query that retrives chats by Id
export async function getChatById(id: string): Promise<Chat | undefined> {
  try {
    const chat = await db.query.chats.findFirst({
      where: (chats, { eq }) => eq(chats.id, id),
    });

    return chat;
  } catch (error) {
    throw new DbError("Failed to retrieve chat by id", error);
  }
}

// a query that retrieves chats titles
export async function getChatTitles(): Promise<ChatTitle[]> {
  try {
    const titles = await db.query.chats.findMany({
      columns: {
        id: true,
        conversationTitle: true,
      },
      orderBy: (chats, { desc }) => desc(chats.createdAt),
    });

    return titles;
  } catch (error) {
    throw new DbError("Failed to retrieve chat titles", error);
  }
}
