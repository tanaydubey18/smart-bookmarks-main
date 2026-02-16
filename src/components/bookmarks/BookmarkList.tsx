"use client";

import type { Bookmark } from "@/types/bookmark";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { useBookmarksRealtime } from "./useBookmarksRealtime";

interface BookmarkListProps {
  initialBookmarks: Bookmark[];
  onDelete: (id: string) => Promise<void>;
}

/**
 * Renders a realtime list of bookmarks.
 * Deletions are delegated to a server action via `onDelete`.
 */
export function BookmarkList({ initialBookmarks, onDelete }: BookmarkListProps) {
  const { bookmarks } = useBookmarksRealtime(initialBookmarks);

  const handleDelete = async (id: string) => {
    await onDelete(id);
  };

  if (!bookmarks.length) {
    return (
      <p className="text-sm text-zinc-500">
        You don&apos;t have any bookmarks yet. Add your first one above.
      </p>
    );
  }

  return (
    <ul className="space-y-2">
      {bookmarks.map((bookmark) => (
        <li key={bookmark.id}>
          <Card className="flex items-center justify-between px-4 py-3">
            <div className="min-w-0">
              <a
                href={bookmark.url}
                target="_blank"
                rel="noreferrer"
                className="truncate text-sm font-medium text-zinc-900 hover:underline"
              >
                {bookmark.title}
              </a>
              <p className="truncate text-xs text-zinc-500">{bookmark.url}</p>
            </div>
            <Button
              variant="ghost"
              className="ml-3 text-xs text-red-600 hover:bg-red-50"
              onClick={() => handleDelete(bookmark.id)}
            >
              Delete
            </Button>
          </Card>
        </li>
      ))}
    </ul>
  );
}

