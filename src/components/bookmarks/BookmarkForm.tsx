"use client";

import { useState } from "react";

import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";

interface BookmarkFormProps {
  onCreate: (payload: { title: string; url: string }) => Promise<void>;
}

/**
 * Client-side form for creating bookmarks.
 * Delegates the actual creation to a server action passed via `onCreate`.
 */
export function BookmarkForm({ onCreate }: BookmarkFormProps) {
  const [title, setTitle] = useState("");
  const [url, setUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setError(null);
    setLoading(true);

    try {
      await onCreate({ title, url });
      setTitle("");
      setUrl("");
    } catch (err: any) {
      const message =
        typeof err?.message === "string"
          ? err.message
          : "Something went wrong while creating the bookmark.";
      setError(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-3">
      <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
        <div className="flex-1 space-y-2">
          <Input
            placeholder="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <Input
            placeholder="https://example.com/article"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
          />
        </div>
        <Button
          type="submit"
          className="mt-2 w-full sm:mt-0 sm:w-auto"
          loading={loading}
        >
          Add
        </Button>
      </div>
      {error ? (
        <p className="text-xs text-red-600" role="alert">
          {error}
        </p>
      ) : null}
    </form>
  );
}

