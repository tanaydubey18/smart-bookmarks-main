import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /**
   * Explicitly set the Turbopack root so Next.js treats
   * this folder (`smart-bookmarks`) as the workspace root.
   * This prevents it from trying to resolve dependencies
   * like `tailwindcss` from the parent `Astrabit` folder.
   */

};

export default nextConfig;
