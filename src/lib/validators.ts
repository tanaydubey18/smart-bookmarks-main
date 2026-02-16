/**
 * Validate and normalize a bookmark title + URL payload.
 * Throws an Error with a user-safe message if validation fails.
 */
export function validateBookmarkInput(input: {
  title: string;
  url: string;
}) {
  const title = input.title.trim();
  const url = input.url.trim();

  if (!title) {
    throw new Error("Title is required.");
  }

  if (title.length > 255) {
    throw new Error("Title must be at most 255 characters.");
  }

  if (!url) {
    throw new Error("URL is required.");
  }

  let parsed: URL;
  try {
    parsed = new URL(url);
  } catch {
    throw new Error("URL is not valid.");
  }

  if (parsed.protocol !== "http:" && parsed.protocol !== "https:") {
    throw new Error("URL must start with http:// or https://.");
  }

  return {
    title,
    url: parsed.toString(),
  };
}

