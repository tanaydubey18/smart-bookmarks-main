
"use client";

import Link from "next/link";
import Image from "next/image";

export function Logo() {
  return (
    <Link
      href="/dashboard" // Redirects to dashboard as requested
      className="group relative flex items-center gap-3 text-2xl font-bold tracking-tighter"
    >
      <div className="relative h-10 w-10 overflow-hidden rounded-lg transition-transform duration-300 group-hover:scale-105">
        <Image 
          src="/logo-v2.png" 
          alt="Smart Bookmarks Logo" 
          fill 
          className="object-contain"
          priority
        />
      </div>
      <span
        className="text-xl font-semibold text-foreground tracking-tight"
      >
        Smart Bookmarks
      </span>
    </Link>
  );
}
