"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

import { Button } from "./ui/Button";
import { createSupabaseBrowserClient } from "@/lib/supabase/client";

export function AuthButton() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const handleSignOut = async () => {
    setLoading(true);
    try {
      const supabase = createSupabaseBrowserClient();
      await supabase.auth.signOut();
      router.push("/login");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Button variant="ghost" onClick={handleSignOut} loading={loading}>
      Sign out
    </Button>
  );
}

