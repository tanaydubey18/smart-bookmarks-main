"use client";

import { useState } from "react";

import type { Bookmark } from "@/types/bookmark";
import { createSupabaseBrowserClient } from "@/lib/supabase/client";
import { validateBookmarkInput } from "@/lib/validators";
import { DynamicInput } from "@/components/ui/DynamicInput";

interface BookmarkFormProps {
  userId: string;
  onOptimisticAdd: (bookmark: Bookmark) => void;
}

/**
 * Client-side form for creating bookmarks.
 * Inserts directly via Supabase client + optimistic UI for instant feedback.
 */
export function BookmarkForm({ userId, onOptimisticAdd }: BookmarkFormProps) {
  const [title, setTitle] = useState("");
  const [url, setUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async () => {
    setError(null);

    // Client-side validation
    let payload: { title: string; url: string };
    try {
      payload = validateBookmarkInput({ title, url });
    } catch (err: any) {
      setError(err.message);
      return;
    }

    setLoading(true);

    // Create an optimistic bookmark with a temp ID
    const optimisticBookmark: Bookmark = {
      id: crypto.randomUUID(),
      user_id: userId,
      title: payload.title,
      url: payload.url,
      created_at: new Date().toISOString(),
    };

    // Show it immediately
    onOptimisticAdd(optimisticBookmark);
    setTitle("");
    setUrl("");

    try {
      const supabase = createSupabaseBrowserClient();

      const { error: insertError } = await supabase.from("bookmarks").insert({
        title: payload.title,
        url: payload.url,
        user_id: userId,
      });

      if (insertError) {
        setError("Failed to save bookmark. Please try again.");
        console.error("Insert error:", insertError.message);
      }
    } catch (err) {
      setError("Something went wrong.");
      console.error("Insert error:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-4">
      <DynamicInput 
        title={title}
        setTitle={setTitle}
        url={url}
        setUrl={setUrl}
        onSubmit={handleSubmit}
        loading={loading}
      />
      {error ? (
        <p className="text-xs text-red-600 px-4 animate-in fade-in slide-in-from-top-1" role="alert">
          {error}
        </p>
      ) : null}
    </div>
  );
}
