"use client";

import Image from "next/image";
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

      {/* Decorative Illustration Section */}
      <div className="flex justify-center py-6 animate-in fade-in slide-in-from-bottom-4 duration-1000">
        <div className="relative w-full max-w-[320px] aspect-square opacity-90 transition-all hover:scale-[1.02] duration-500">
          <Image 
            src="/dashboard-illustration.jpg" 
            alt="Productive thinking illustration" 
            fill 
            className="object-contain mix-blend-multiply dark:mix-blend-screen"
            priority
          />
        </div>
      </div>

      <div className="pt-2">
        <BookmarkList bookmarks={bookmarks} onOptimisticRemove={optimisticRemove} />
      </div>
    </>
  );
}
