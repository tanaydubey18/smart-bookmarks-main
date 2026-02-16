import type { ReactNode } from "react";

import { Navbar } from "@/components/Navbar";
import { DashboardBackground } from "@/components/dashboard/DashboardBackground";
import { requireUser } from "@/lib/auth";

/**
 * Protected layout for the dashboard area.
 * Ensures only authenticated users can access dashboard pages.
 */
export default async function DashboardLayout({
  children,
}: {
  children: ReactNode;
}) {
  await requireUser();

  return (
    <main className="min-h-screen relative">
      <DashboardBackground />
      <Navbar />
      <div className="mx-auto max-w-4xl px-4 py-6 relative z-10">
        {children}
      </div>
    </main>
  );
}
