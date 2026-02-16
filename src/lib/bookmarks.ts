import { createSupabaseServerClient } from "@/lib/supabase/server-client";
import type { Bookmark } from "@/types/bookmark";

/**
 * Fetch bookmarks for a given user, ordered by most recent first.
 */
export async function getBookmarksForUser(userId: string): Promise<Bookmark[]> {
  const supabase = await createSupabaseServerClient();

  const { data, error } = await supabase
    .from("bookmarks")
    .select("*")
    .eq("user_id", userId)
    .order("created_at", { ascending: false });

  if (error) {
    // In a real system, you'd log this error.
    throw error;
  }

  return (data ?? []) as Bookmark[];
}

