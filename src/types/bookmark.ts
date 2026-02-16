/**
 * Domain model for a bookmark.
 * Mirrors the `public.bookmarks` table in Supabase.
 */
export interface Bookmark {
  id: string;
  user_id: string;
  title: string;
  url: string;
  created_at: string;
}

