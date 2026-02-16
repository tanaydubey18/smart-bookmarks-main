"use client";

import { useEffect, useState } from "react";

import type { Bookmark } from "@/types/bookmark";
import { createSupabaseBrowserClient } from "@/lib/supabase/client";

/**
 * Hook to keep a list of bookmarks in sync with Supabase Realtime.
 * Starts with server-rendered data and then applies inserts/deletes from the DB.
 */
export function useBookmarksRealtime(initial: Bookmark[]) {
  const [bookmarks, setBookmarks] = useState<Bookmark[]>(initial);

  useEffect(() => {
    const supabase = createSupabaseBrowserClient();

    const channel = supabase
      .channel("bookmarks-realtime")
      .on(
        "postgres_changes",
        {
          event: "INSERT",
          schema: "public",
          table: "bookmarks",
        },
        (payload) => {
          const newBookmark = payload.new as Bookmark;
          setBookmarks((current) => {
            if (current.find((b) => b.id === newBookmark.id)) {
              return current;
            }
            return [newBookmark, ...current];
          });
        }
      )
      .on(
        "postgres_changes",
        {
          event: "DELETE",
          schema: "public",
          table: "bookmarks",
        },
        (payload) => {
          const deleted = payload.old as Bookmark;
          setBookmarks((current) =>
            current.filter((b) => b.id !== deleted.id)
          );
        }
      )
      .subscribe((status) => {
        if (status === "SUBSCRIBED") {
          // Subscription established.
        }
      });

    return () => {
      void supabase.removeChannel(channel);
    };
  }, []);

  return { bookmarks, setBookmarks };
}

