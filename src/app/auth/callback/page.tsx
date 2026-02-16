"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import { createSupabaseBrowserClient } from "@/lib/supabase/client";

/**
 * OAuth callback handler.
 *
 * Supabase redirects back here after Google OAuth.
 * We exchange the auth code for a session, then send the user to /dashboard.
 */
export default function AuthCallbackPage() {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const run = async () => {
      try {
        const supabase = createSupabaseBrowserClient();
        const { error: exchangeError } =
          await supabase.auth.exchangeCodeForSession(window.location.href);

        if (exchangeError) {
          setError(exchangeError.message);
          return;
        }

        router.replace("/dashboard");
      } catch (err) {
        console.error("Error in auth callback", err);
        setError("Something went wrong while finishing the login process.");
      }
    };

    void run();
  }, [router]);

  return (
    <main className="flex min-h-screen items-center justify-center bg-zinc-50">
      <div className="w-full max-w-md rounded-xl border border-zinc-200 bg-white p-6 shadow-sm text-center">
        <h1 className="text-lg font-semibold tracking-tight text-zinc-900">
          Signing you in…
        </h1>
        <p className="mt-2 text-sm text-zinc-500">
          Please wait while we complete the login securely.
        </p>
        {error ? (
          <p className="mt-4 text-xs text-red-600" role="alert">
            {error}
          </p>
        ) : null}
      </div>
    </main>
  );
}

