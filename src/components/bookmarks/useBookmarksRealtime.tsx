"use client";

import { useCallback, useEffect, useRef, useState } from "react";

import type { Bookmark } from "@/types/bookmark";
import { createSupabaseBrowserClient } from "@/lib/supabase/client";

/**
 * Hook to keep bookmarks in sync with Supabase Realtime.
 *
 * - Starts with server-rendered `initialBookmarks`
 * - Subscribes to INSERT / UPDATE / DELETE on the `bookmarks` table
 * - Exposes `optimisticAdd` and `optimisticRemove` for instant UI feedback
 */
export function useBookmarksRealtime(initialBookmarks: Bookmark[]) {
  const [bookmarks, setBookmarks] = useState<Bookmark[]>(initialBookmarks);
  const supabaseRef = useRef(createSupabaseBrowserClient());

  // Keep state in sync when the server re-renders with new initial data
  useEffect(() => {
    setBookmarks(initialBookmarks);
  }, [initialBookmarks]);

  // Subscribe to Realtime changes
  useEffect(() => {
    const supabase = supabaseRef.current;

    const channel = supabase
      .channel("bookmarks-realtime")
      .on(
        "postgres_changes",
        { event: "INSERT", schema: "public", table: "bookmarks" },
        (payload) => {
          const newBookmark = payload.new as Bookmark;
          setBookmarks((prev) => {
            // Avoid duplicates (e.g. from optimistic add)
            if (prev.some((b) => b.id === newBookmark.id)) return prev;
            return [newBookmark, ...prev];
          });
        }
      )
      .on(
        "postgres_changes",
        { event: "UPDATE", schema: "public", table: "bookmarks" },
        (payload) => {
          const updated = payload.new as Bookmark;
          setBookmarks((prev) =>
            prev.map((b) => (b.id === updated.id ? updated : b))
          );
        }
      )
      .on(
        "postgres_changes",
        { event: "DELETE", schema: "public", table: "bookmarks" },
        (payload) => {
          const deletedId = (payload.old as { id: string }).id;
          setBookmarks((prev) => prev.filter((b) => b.id !== deletedId));
        }
      )
      .subscribe();

    return () => {
      void supabase.removeChannel(channel);
    };
  }, []);

  /** Optimistically add a bookmark to the list (before DB confirms). */
  const optimisticAdd = useCallback((bookmark: Bookmark) => {
    setBookmarks((prev) => [bookmark, ...prev]);
  }, []);

  /** Optimistically remove a bookmark from the list (before DB confirms). */
  const optimisticRemove = useCallback((id: string) => {
    setBookmarks((prev) => prev.filter((b) => b.id !== id));
  }, []);

  return { bookmarks, optimisticAdd, optimisticRemove };
}
