import type { Metadata } from "next";

import { DashboardClient } from "@/components/bookmarks/DashboardClient";
import { requireUser } from "@/lib/auth";
import { getBookmarksForUser } from "@/lib/bookmarks";

export const metadata: Metadata = {
  title: "Dashboard | Smart Bookmarks",
};

/**
 * Server component: fetches initial bookmarks and auth,
 * then hands everything to the client-side DashboardClient for real-time sync.
 */
export default async function DashboardPage() {
  const user = await requireUser();
  const bookmarks = await getBookmarksForUser(user.id);

  return (
    <section className="space-y-6">
      <header>
        <h1 className="text-2xl font-semibold tracking-tight text-foreground">
          Your bookmarks
        </h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Add, view, and manage your private bookmarks. Changes sync in real time across your devices.
        </p>
      </header>

      <DashboardClient initialBookmarks={bookmarks} userId={user.id} />
    </section>
  );
}
