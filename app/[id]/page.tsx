import { notFound } from "next/navigation";
import { getChatById } from "@/db/queries";
import { Chat } from "@/components/chat";

interface ChatPageProps {
  params: Promise<{ id: string }>;
}

export default async function ChatPage({ params }: ChatPageProps) {
  const id = (await params).id;
  const chat = await getChatById(id);

  if (!chat) {
    notFound();
  }

  return <Chat chatId={chat.id} initialMessages={chat.messages} />;
}
