"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowLeft } from "lucide-react";

import { createSupabaseBrowserClient } from "@/lib/supabase/client";
import { Logo } from "@/components/ui/Logo";
import { Button } from "@/components/ui/Button";

/**
 * Purely white, minimalist signup page aligned with brand colors.
 * Features:
 * - Pure white background (#ffffff)
 * - Light-theme focused design
 * - Brand Drafting Blue (#0055ff) accents
 * - Clean, professional typography
 */
export default function LoginPage() {
  const [error, setError] = useState<string | null>(null);
  const [isLoggingIn, setIsLoggingIn] = useState(false);

  const startGoogleLogin = async () => {
    setIsLoggingIn(true);
    setError(null);
    try {
      const supabase = createSupabaseBrowserClient();
      const redirectTo = `${window.location.origin}/auth/callback`;

      const { error: signInError } = await supabase.auth.signInWithOAuth({
        provider: "google",
        options: {
          redirectTo,
          queryParams: {
            prompt: 'select_account',
            access_type: 'offline',
          }
        },
      });

      if (signInError) {
        setError(signInError.message);
        setIsLoggingIn(false);
      }
    } catch (err) {
      console.error("Error during login", err);
      setError("Something went wrong while starting the login flow.");
      setIsLoggingIn(false);
    }
  };

  return (
    <main className="relative flex min-h-screen flex-col items-center justify-center bg-white py-12 px-6">
      <div className="w-full max-w-[400px] space-y-12 relative animate-in fade-in slide-in-from-bottom-4 duration-1000">
        {/* Decorative Butterfly */}
        <div className="absolute -top-20 -right-20 w-48 h-48 rotate-[15deg] pointer-events-none opacity-90 z-20 select-none">
          <Image 
            src="/butterfly.png" 
            alt="Decorative Butterfly" 
            fill 
            className="object-contain"
            priority
          />
        </div>

        {/* Navigation */}
        <div className="flex justify-start">
          <Link href="/">
            <button className="group flex items-center text-sm font-medium text-gray-400 hover:text-[#0055ff] transition-colors">
              <ArrowLeft className="mr-2 h-4 w-4 transition-transform group-hover:-translate-x-1" />
              Back
            </button>
          </Link>
        </div>

        {/* Header Section */}
        <div className="flex flex-col items-center text-center space-y-4">
          <div className="mb-4">
            <Logo />
          </div>
          <div className="space-y-3">
            <h1 className="text-4xl font-bold tracking-tight text-black">Get started</h1>
            <p className="text-gray-500 text-sm font-medium max-w-[280px]">
              Capture your digital universe with Smart Bookmarks.
            </p>
          </div>
        </div>

        {/* Content Section */}
        <div className="space-y-8">
          {error && (
            <div className="p-4 rounded-xl bg-red-50 border border-red-100/50 animate-in fade-in zoom-in-95">
              <p className="text-xs text-red-600 font-medium text-center" role="alert">{error}</p>
            </div>
          )}

          <div className="space-y-4">
            <Button 
              variant="primary" 
              className="w-full h-12 flex items-center justify-center gap-3 bg-[#0055ff] hover:bg-[#0044cc] text-white transition-all font-semibold rounded-xl active:scale-[0.98] border-none shadow-lg shadow-blue-500/20"
              onClick={startGoogleLogin}
              loading={isLoggingIn}
            >
              {!isLoggingIn && (
                <div className="bg-white p-1 rounded-md">
                  <img 
                    src="/google-logo.png" 
                    alt="Google" 
                    className="h-4 w-4 object-contain"
                  />
                </div>
              )}
              <span>Continue with Google</span>
            </Button>
          </div>

          <div className="pt-4 border-t border-gray-100/50">
            <p className="text-[12px] text-center text-gray-400 leading-relaxed max-w-[280px] mx-auto font-medium">
              By signing in, you agree to our <span className="text-gray-500 cursor-pointer hover:text-[#0055ff]">Terms of Service</span> and <span className="text-gray-500 cursor-pointer hover:text-[#0055ff]">Privacy Policy</span>. 
              <br />
              Securely hosted on Supabase Cloud.
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}
