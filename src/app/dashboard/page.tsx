import type { Metadata } from "next";
import { revalidatePath } from "next/cache";

import { BookmarkForm } from "@/components/bookmarks/BookmarkForm";
import { BookmarkList } from "@/components/bookmarks/BookmarkList";
import { requireUser } from "@/lib/auth";
import { getBookmarksForUser } from "@/lib/bookmarks";
import { validateBookmarkInput } from "@/lib/validators";

export const metadata: Metadata = {
  title: "Dashboard | Smart Bookmarks",
};

/**
 * Server actions for creating and deleting bookmarks.
 * These run on the server and are protected by both auth and RLS.
 */
async function createBookmark(formData: {
  title: string;
  url: string;
}): Promise<void> {
  "use server";

  const user = await requireUser();
  const payload = validateBookmarkInput(formData);

  const supabase = await (await import("@/lib/supabase/server-client")).createSupabaseServerClient();

  const { error } = await supabase.from("bookmarks").insert({
    title: payload.title,
    url: payload.url,
    user_id: user.id,
  });

  if (error) {
    throw new Error("Failed to create bookmark.");
  }

  revalidatePath("/dashboard");
}

async function deleteBookmark(id: string): Promise<void> {
  "use server";

  const user = await requireUser();
  const supabase = await (await import("@/lib/supabase/server-client")).createSupabaseServerClient();

  const { error } = await supabase
    .from("bookmarks")
    .delete()
    .eq("id", id)
    .eq("user_id", user.id);

  if (error) {
    throw new Error("Failed to delete bookmark.");
  }

  revalidatePath("/dashboard");
}

/**
 * Main dashboard page.
 * Renders server-fetched bookmarks and mounts client components for CRUD + realtime.
 */
export default async function DashboardPage() {
  const user = await requireUser();
  const bookmarks = await getBookmarksForUser(user.id);

  return (
    <section className="space-y-6">
      <header>
        <h1 className="text-2xl font-semibold tracking-tight text-zinc-900">
          Your bookmarks
        </h1>
        <p className="mt-1 text-sm text-zinc-500">
          Add, view, and manage your private bookmarks. Changes sync in real time across your devices.
        </p>
      </header>

      <BookmarkForm onCreate={createBookmark} />

      <div className="pt-2">
        <BookmarkList initialBookmarks={bookmarks} onDelete={deleteBookmark} />
      </div>
    </section>
  );
}


