"use client";

import { useRef, useState } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { Trash2, ExternalLink } from "lucide-react";

import type { Bookmark } from "@/types/bookmark";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { createSupabaseBrowserClient } from "@/lib/supabase/client";

interface BookmarkListProps {
  bookmarks: Bookmark[];
  onOptimisticRemove: (id: string) => void;
}

export function BookmarkList({ bookmarks, onOptimisticRemove }: BookmarkListProps) {
  const listRef = useRef<HTMLUListElement>(null);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  useGSAP(
    () => {
      const items = listRef.current?.children;
      if (items) {
        gsap.fromTo(
          items,
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, duration: 0.4, stagger: 0.1, ease: "power2.out" }
        );
      }
    },
    { dependencies: [bookmarks?.length], scope: listRef }
  );

  const handleDelete = async (id: string) => {
    const item = document.getElementById(`bookmark-${id}`);

    const doDelete = async () => {
      setDeletingId(id);
      onOptimisticRemove(id);

      try {
        const supabase = createSupabaseBrowserClient();
        const { error } = await supabase.from("bookmarks").delete().eq("id", id);
        if (error) console.error("Delete failed:", error.message);
      } catch (err) {
        console.error("Delete error:", err);
      } finally {
        setDeletingId(null);
      }
    };

    if (item) {
      gsap.to(item, {
        opacity: 0,
        x: -20,
        duration: 0.3,
        onComplete: () => void doDelete(),
      });
    } else {
      await doDelete();
    }
  };

  if (!bookmarks.length) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-center animate-in fade-in slide-in-from-bottom-4 duration-700">
        <h3 className="text-xl font-bold font-patrick-hand">Your board is empty!</h3>
        <p className="mt-2 text-sm text-muted-foreground max-w-xs">
          Let&apos;s get things moving. Add your first bookmark above to see the magic.
        </p>
      </div>
    );
  }

  return (
    <ul ref={listRef} className="space-y-3">
      {bookmarks.map((bookmark) => (
        <li key={bookmark.id} id={`bookmark-${bookmark.id}`} className="opacity-0">
          <Card className="bookmark-card group relative overflow-hidden border-border/50 bg-card/50 backdrop-blur-sm transition-colors hover:border-primary/20 hover:bg-card">
            <div className="flex items-center justify-between p-4">
              <div className="min-w-0 flex-1">
                <a
                  href={bookmark.url}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-2 font-medium text-foreground transition-colors hover:text-primary"
                >
                  <span className="truncate">{bookmark.title}</span>
                  <ExternalLink className="h-3 w-3 opacity-0 transition-opacity group-hover:opacity-100" />
                </a>
                <p className="mt-1 truncate text-xs text-muted-foreground">
                  {bookmark.url}
                </p>
              </div>
              <Button
                variant="ghost"
                size="icon"
                className="ml-4 h-8 w-8 text-muted-foreground opacity-0 hover:text-destructive group-hover:opacity-100"
                onClick={() => handleDelete(bookmark.id)}
                loading={deletingId === bookmark.id}
              >
                <Trash2 className="h-4 w-4" />
                <span className="sr-only">Delete</span>
              </Button>
            </div>
          </Card>
        </li>
      ))}
    </ul>
  );
}
