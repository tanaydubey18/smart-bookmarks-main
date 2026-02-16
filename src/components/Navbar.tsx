import Link from "next/link";
import React from "react";

import { AuthButton } from "./AuthButton";

/**
 * Top navigation bar shown on authenticated pages.
 */
export function Navbar() {
  return (
    <header className="border-b border-zinc-200 bg-white">
      <div className="mx-auto flex h-14 max-w-4xl items-center justify-between px-4">
        <Link href="/dashboard" className="text-sm font-semibold tracking-tight">
          Smart Bookmarks
        </Link>
        <AuthButton />
      </div>
    </header>
  );
}

