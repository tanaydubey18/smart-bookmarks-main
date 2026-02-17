"use client";

import { useCallback, useEffect, useRef, useState } from "react";

import type { Bookmark } from "@/types/bookmark";
import { createSupabaseBrowserClient } from "@/lib/supabase/client";

/** Messages sent via BroadcastChannel for cross-tab sync */
type BroadcastMessage =
  | { type: "INSERT"; bookmark: Bookmark }
  | { type: "DELETE"; bookmarkId: string };

const CHANNEL_NAME = "bookmarks-cross-tab";

/**
 * Hook to keep bookmarks in sync across browser tabs.
 *
 * Uses two mechanisms:
 * 1. **BroadcastChannel** — instant same-browser cross-tab sync (no server needed)
 * 2. **Supabase Realtime** — cross-device sync via postgres_changes
 */
export function useBookmarksRealtime(initialBookmarks: Bookmark[], userId: string) {
  const [bookmarks, setBookmarks] = useState<Bookmark[]>(initialBookmarks);
  const supabaseRef = useRef(createSupabaseBrowserClient());
  const broadcastRef = useRef<BroadcastChannel | null>(null);

  // Keep state in sync when the server re-renders with new initial data
  useEffect(() => {
    setBookmarks(initialBookmarks);
  }, [initialBookmarks]);

  // ── BroadcastChannel for instant cross-tab sync ──────────────────────
  useEffect(() => {
    if (typeof BroadcastChannel === "undefined") return; // SSR guard

    const bc = new BroadcastChannel(CHANNEL_NAME);
    broadcastRef.current = bc;

    bc.onmessage = (event: MessageEvent<BroadcastMessage>) => {
      const msg = event.data;

      if (msg.type === "INSERT") {
        setBookmarks((prev) => {
          if (prev.some((b) => b.id === msg.bookmark.id)) return prev;
          return [msg.bookmark, ...prev];
        });
      } else if (msg.type === "DELETE") {
        setBookmarks((prev) => prev.filter((b) => b.id !== msg.bookmarkId));
      }
    };

    return () => {
      bc.close();
      broadcastRef.current = null;
    };
  }, []);

  // ── Supabase Realtime for cross-device sync ──────────────────────────
  useEffect(() => {
    const supabase = supabaseRef.current;

    const channel = supabase
      .channel(`bookmarks-realtime-${userId}`)
      .on(
        "postgres_changes",
        { event: "INSERT", schema: "public", table: "bookmarks", filter: `user_id=eq.${userId}` },
        (payload) => {
          const newBookmark = payload.new as Bookmark;
          setBookmarks((prev) => {
            if (prev.some((b) => b.id === newBookmark.id)) return prev;
            return [newBookmark, ...prev];
          });
        }
      )
      .on(
        "postgres_changes",
        { event: "UPDATE", schema: "public", table: "bookmarks", filter: `user_id=eq.${userId}` },
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
  }, [userId]);

  // ── Helpers ──────────────────────────────────────────────────────────

  /** Broadcast a message to other open tabs. */
  const broadcast = useCallback((msg: BroadcastMessage) => {
    try {
      broadcastRef.current?.postMessage(msg);
    } catch {
      // BroadcastChannel may be closed; safe to ignore
    }
  }, []);

  /** Optimistically add a bookmark and notify other tabs. */
  const optimisticAdd = useCallback(
    (bookmark: Bookmark) => {
      setBookmarks((prev) => [bookmark, ...prev]);
      broadcast({ type: "INSERT", bookmark });
    },
    [broadcast]
  );

  /** Optimistically remove a bookmark and notify other tabs. */
  const optimisticRemove = useCallback(
    (id: string) => {
      setBookmarks((prev) => prev.filter((b) => b.id !== id));
      broadcast({ type: "DELETE", bookmarkId: id });
    },
    [broadcast]
  );

  return { bookmarks, optimisticAdd, optimisticRemove };
}
