import type { Metadata } from "next";

import { LoginForm } from "@/components/auth/LoginForm";

export const metadata: Metadata = {
  title: "Login | Smart Bookmarks",
};

/**
 * Public login page.
 * Renders a client-side LoginForm that starts the Google OAuth flow.
 */
export default function LoginPage() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-zinc-50">
      <div className="w-full max-w-md rounded-xl border border-zinc-200 bg-white p-6 shadow-sm">
        <h1 className="text-xl font-semibold tracking-tight text-zinc-900">
          Sign in to Smart Bookmarks
        </h1>
        <p className="mt-2 text-sm text-zinc-500">
          You’ll use your Google account. We only store your bookmarks, not your emails.
        </p>
        <LoginForm />
      </div>
    </main>
  );
}


