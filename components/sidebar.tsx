"use client";

import type { ChatTitle } from "@/db/schema";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import Link from "next/link";

interface SidebarProps {
  chatTitles: ChatTitle[];
}

export default function Sidebar({ chatTitles }: SidebarProps) {
  return (
    <aside className="flex h-screen w-64 flex-col border-r border-sidebar-border bg-sidebar text-sidebar-foreground">
      <div className="px-4 py-4">
        <div className="text-sm font-semibold tracking-tight">
          Conversations
        </div>
        <p className="mt-1 text-xs text-muted-foreground">
          Select a chat to continue the conversation.
        </p>
      </div>

      <Separator className="bg-sidebar-border" />

      <div className="flex-1 overflow-y-auto px-2 py-3 space-y-1">
        {chatTitles.length === 0 ? (
          <p className="px-2 text-sm text-muted-foreground">No chats yet.</p>
        ) : (
          chatTitles.map((chat) => (
            <Button
              key={chat.id}
              asChild
              variant="ghost"
              className="w-full justify-start rounded-lg px-2 py-1.5 text-sm font-normal hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
            >
              <Link className="truncate" href={`/${chat.id}`}>
                {chat.conversationTitle}
              </Link>
            </Button>
          ))
        )}
      </div>

      <Separator className="bg-sidebar-border" />

      <div className="px-4 py-3">
        <Button className="w-full" size="sm" asChild>
          <Link href={"/"}>New chat</Link>
        </Button>
      </div>
    </aside>
  );
}
