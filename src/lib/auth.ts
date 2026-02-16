import { redirect } from "next/navigation";

import { createSupabaseServerClient } from "@/lib/supabase/server-client";

/**
 * Fetch the current authenticated user from Supabase on the server.
 *
 * Throws on unexpected errors so that the route error boundary can handle it.
 */
export async function getCurrentUser() {
  const supabase = await createSupabaseServerClient();
  const {
    data: { user },
    error,
  } = await supabase.auth.getUser();

  if (error) {
    // For production apps you might want to log this to an observability tool.
    throw error;
  }

  return user;
}

/**
 * Enforce that a user is authenticated for a given route.
 * If no user is found, redirects to /login.
 */
export async function requireUser() {
  const user = await getCurrentUser();

  if (!user) {
    redirect("/login");
  }

  return user;
}

