import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Smart Bookmarks",
  description: "A secure, real-time, Google-authenticated bookmark manager.",
};

/**
 * Landing page.
 * Later we may auto-redirect based on session; for now this is a simple marketing page.
 */
export default function HomePage() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-zinc-50">
      <div className="w-full max-w-2xl px-4 text-center">
        <h1 className="text-3xl font-semibold tracking-tight text-zinc-900 sm:text-4xl">
          Smart, private bookmarks that follow you everywhere.
        </h1>
        <p className="mt-3 text-sm text-zinc-600 sm:text-base">
          Sign in with Google, save links with clean titles, and keep everything synced in real time across your devices.
        </p>
        <div className="mt-6 flex items-center justify-center gap-3">
          <Link
            href="/login"
            className="inline-flex h-10 items-center justify-center rounded-md bg-zinc-900 px-4 text-sm font-medium text-zinc-50 hover:bg-zinc-800"
          >
            Get started
          </Link>
          <Link
            href="/dashboard"
            className="inline-flex h-10 items-center justify-center rounded-md border border-zinc-200 bg-white px-4 text-sm font-medium text-zinc-900 hover:bg-zinc-100"
          >
            Go to dashboard
          </Link>
        </div>
      </div>
    </main>
  );
}

