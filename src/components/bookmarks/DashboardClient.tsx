"use client";

import type { Bookmark } from "@/types/bookmark";
import { BookmarkForm } from "@/components/bookmarks/BookmarkForm";
import { BookmarkList } from "@/components/bookmarks/BookmarkList";
import { useBookmarksRealtime } from "@/components/bookmarks/useBookmarksRealtime";

interface DashboardClientProps {
  initialBookmarks: Bookmark[];
  userId: string;
}

/**
 * Client-side dashboard wrapper that owns the real-time bookmark state.
 * Connects BookmarkForm → optimisticAdd and BookmarkList → optimisticRemove.
 */
export function DashboardClient({ initialBookmarks, userId }: DashboardClientProps) {
  const { bookmarks, optimisticAdd, optimisticRemove } = useBookmarksRealtime(initialBookmarks, userId);

  return (
    <>
      <BookmarkForm userId={userId} onOptimisticAdd={optimisticAdd} />

      <div className="pt-2">
        <BookmarkList bookmarks={bookmarks} onOptimisticRemove={optimisticRemove} />
      </div>
    </>
  );
}
