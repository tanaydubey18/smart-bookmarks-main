import type { ReactNode } from "react";

import { Navbar } from "@/components/Navbar";
import { requireUser } from "@/lib/auth";

/**
 * Protected layout for the dashboard area.
 * This is a server component that enforces authentication before rendering children.
 */
export default async function DashboardLayout({
  children,
}: {
  children: ReactNode;
}) {
  await requireUser();

  return (
    <div className="min-h-screen bg-zinc-50">
      <Navbar />
      <main className="mx-auto max-w-4xl px-4 py-6">{children}</main>
    </div>
  );
}


