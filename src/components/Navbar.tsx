import Link from "next/link";
import React from "react";
import { Home } from "lucide-react";

import { AuthButton } from "./AuthButton";
import { Logo } from "./ui/Logo";
import { Button } from "./ui/Button";

/**
 * Top navigation bar shown on authenticated pages.
 */
export function Navbar() {
  return (
    <header className="border-b border-border/40 bg-white/40 backdrop-blur-md sticky top-0 z-50 transition-all duration-300">
      <div className="mx-auto flex h-14 max-w-4xl items-center justify-between px-4">
        <div className="flex items-center gap-4">
          <div className="scale-75 origin-left">
            <Logo />
          </div>
          <Link href="/">
            <Button variant="ghost" size="sm" className="gap-2 text-muted-foreground hover:text-primary">
              <Home className="h-4 w-4" />
              Home
            </Button>
          </Link>
        </div>
        <AuthButton />
      </div>
    </header>
  );
}
