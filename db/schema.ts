import { UIMessage } from "ai";
import { jsonb, pgTable, text, timestamp, uuid } from "drizzle-orm/pg-core";

export const chats = pgTable("chats", {
  id: uuid("id").defaultRandom().primaryKey(),
  conversationTitle: text("conversation_title").notNull(),
  messages: jsonb("messages").notNull().$type<UIMessage[]>(), // this can be a table on it's own but leave it like this for now
  createdAt: timestamp("created_at", { withTimezone: true })
    .defaultNow()
    .notNull(),
  updatedAt: timestamp("updated_at", { withTimezone: true })
    .defaultNow()
    .notNull(),
});

export type Chat = typeof chats.$inferSelect;
export type ChatTitle = Pick<Chat, "id" | "conversationTitle">;
