import Link from "next/link";
import Image from "next/image";
import { MoveLeft, ShieldAlert } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Sign-In Error | Smart Bookmarks",
};

export default function AuthCodeErrorPage() {
  return (
    <main className="relative min-h-screen w-full overflow-hidden bg-background flex flex-col items-center justify-center">
      {/* Isometric Grid Background */}
      <div
        className="absolute inset-0 z-0 pointer-events-none opacity-[0.4] dark:opacity-[0.1]"
        style={{
          perspective: "1000px",
          transformStyle: "preserve-3d",
        }}
      >
        <div
          className="bg-grid absolute inset-[-100%] w-[200%] h-[200%]"
          style={{
            transform: "rotateX(45deg) rotateZ(-15deg) skewX(5deg)",
            backgroundSize: "60px 60px",
          }}
        />
      </div>

      {/* Decorative Illustrations */}
      <div className="absolute inset-0 z-10 pointer-events-none opacity-[0.1] grayscale dark:invert">
        <div className="absolute top-[15%] left-[10%] w-48 h-48 rotate-[-12deg]">
          <Image src="/reading-group.jpg" alt="Decoration" fill className="object-contain" />
        </div>
        <div className="absolute bottom-[15%] right-[10%] w-56 h-56 rotate-[8deg]">
          <Image src="/search-illustration.jpg" alt="Decoration" fill className="object-contain" />
        </div>
      </div>

      {/* Content Card */}
      <div className="relative z-20 text-center space-y-8 px-6 max-w-lg animate-in fade-in slide-in-from-bottom-8 duration-1000">
        <div className="flex justify-center">
          <div className="h-16 w-16 rounded-2xl bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 flex items-center justify-center">
            <ShieldAlert className="h-8 w-8 text-red-500" />
          </div>
        </div>

        <div className="space-y-4">
          <h1 className="text-4xl md:text-5xl font-serif tracking-tight text-foreground/90">
            Sign-In Failed
          </h1>
          <p className="text-base md:text-lg text-muted-foreground/80 max-w-md mx-auto leading-relaxed">
            We couldn&apos;t complete the Google sign-in.
            This can happen if the request was cancelled or expired.
            Please try again.
          </p>
        </div>

        <div className="pt-4 flex flex-col items-center gap-4">
          <Link
            href="/login"
            className="inline-flex items-center justify-center h-12 px-8 rounded-xl bg-primary text-primary-foreground font-semibold text-sm shadow-lg hover:shadow-primary/20 hover:opacity-90 transition-all"
          >
            Try Again
          </Link>

          <Link
            href="/"
            className="group inline-flex items-center gap-2 text-sm font-semibold text-muted-foreground hover:text-primary transition-all"
          >
            <MoveLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
            <span className="border-b-2 border-transparent group-hover:border-primary transition-all pb-0.5">
              Back to homepage
            </span>
          </Link>
        </div>
      </div>

      {/* Signature Branding */}
      <div className="absolute bottom-12 left-1/2 -translate-x-1/2 z-20 opacity-40 pointer-events-none font-handwriting text-2xl">
        Smart Bookmarks
      </div>
    </main>
  );
}
