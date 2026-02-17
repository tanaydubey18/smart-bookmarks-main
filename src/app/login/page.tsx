"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowLeft, ShieldCheck, Zap } from "lucide-react";

import { createSupabaseBrowserClient } from "@/lib/supabase/client";
import { Logo } from "@/components/ui/Logo";
import { Button } from "@/components/ui/Button";

/**
 * Vibrant, Glassmorphic LoginPage with a professional "Organic Modern" color palette.
 * Combines the previous isometric grid aesthetic with a clean white/blue theme.
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
    <main className="relative flex min-h-screen flex-col items-center justify-center bg-[#F4F3F1] overflow-hidden px-6">
      {/* 1. Isometric Grid Background (Restored for vibrancy) */}
      <div 
        className="absolute inset-0 z-0 pointer-events-none opacity-[0.07] overflow-hidden"
        style={{
          perspective: "1000px",
          transformStyle: "preserve-3d",
        }}
      >
        <div 
          className="bg-grid absolute inset-[-100%] w-[200%] h-[200%]"
          style={{
            transform: "rotateX(35deg) rotateZ(-10deg) skewX(5deg)",
            backgroundSize: "64px 64px"
          }}
        />
      </div>

      {/* 2. Floating Butterfly Decoration (Approved organic touch) */}
      <div className="absolute top-10 right-10 md:top-20 md:right-20 w-40 h-40 md:w-56 md:h-56 rotate-[12deg] pointer-events-none opacity-90 z-20 select-none animate-in fade-in zoom-in-50 duration-1000">
        <Image 
          src="/butterfly.png" 
          alt="Decorative Butterfly" 
          fill 
          className="object-contain"
          priority
        />
      </div>

      <div className="w-full max-w-[440px] relative z-10 animate-in fade-in slide-in-from-bottom-8 duration-1000">
        {/* Navigation */}
        <div className="flex justify-start mb-8">
          <Link href="/">
            <button className="group flex items-center text-sm font-semibold text-gray-400 hover:text-[#3171C6] transition-all">
              <ArrowLeft className="mr-2 h-4 w-4 transition-transform group-hover:-translate-x-1" />
              Return home
            </button>
          </Link>
        </div>

        {/* Glassmorphism Card (Restored) */}
        <div className="relative p-8 md:p-10 rounded-[32px] border border-white/40 bg-white/70 backdrop-blur-2xl shadow-2xl shadow-blue-500/5">
          {/* Header Section */}
          <div className="flex flex-col items-center text-center space-y-6">
            <div className="p-3 bg-white rounded-2xl shadow-sm border border-gray-100">
              <Logo />
            </div>
            <div className="space-y-3">
              <h1 className="text-3xl font-bold tracking-tight text-gray-900">Get started</h1>
              <p className="text-gray-500 text-sm font-medium leading-relaxed">
                Join a community of digital architects. Organize your web with style.
              </p>
            </div>
          </div>

          {/* Action Section */}
          <div className="mt-10 space-y-8">
            {error && (
              <div className="p-4 rounded-2xl bg-red-50/50 border border-red-100 animate-shake">
                <p className="text-xs text-red-600 font-semibold text-center" role="alert">{error}</p>
              </div>
            )}

            <Button 
              variant="primary" 
              className="w-full h-14 flex items-center justify-center gap-4 bg-[#3171C6] hover:bg-[#2a61aa] text-white transition-all font-bold text-base rounded-[20px] active:scale-[0.97] border-none shadow-xl shadow-blue-500/25 group"
              onClick={startGoogleLogin}
              loading={isLoggingIn}
            >
              {!isLoggingIn && (
                <div className="bg-white p-1.5 rounded-lg shadow-sm group-hover:scale-110 transition-transform">
                  <img 
                    src="/google-logo.png" 
                    alt="Google" 
                    className="h-5 w-5 object-contain"
                  />
                </div>
              )}
              <span>Continue with Google</span>
            </Button>

            {/* Feature Pills */}
            <div className="flex items-center justify-center gap-4">
              <div className="flex items-center gap-1.5 px-3 py-1.5 bg-blue-50/50 rounded-full border border-blue-100/50">
                <ShieldCheck className="h-3.5 w-3.5 text-[#3171C6]" />
                <span className="text-[10px] uppercase tracking-wider font-bold text-[#3171C6]/70">Secure</span>
              </div>
              <div className="flex items-center gap-1.5 px-3 py-1.5 bg-amber-50/50 rounded-full border border-amber-100/50">
                <Zap className="h-3.5 w-3.5 text-amber-500" />
                <span className="text-[10px] uppercase tracking-wider font-bold text-amber-600/70">Real-time</span>
              </div>
            </div>

            {/* Footer Text */}
            <div className="pt-4 text-center border-t border-gray-100">
              <p className="text-[11px] text-gray-400 font-medium leading-relaxed">
                By signing in, you agree to our <span className="text-gray-900 border-b border-gray-200 hover:border-[#3171C6] cursor-pointer">Terms</span> and <span className="text-gray-900 border-b border-gray-200 hover:border-[#3171C6] cursor-pointer">Privacy</span>.
                <br />
                Your data is protected and kept private.
              </p>
            </div>
          </div>
        </div>

        {/* Subtle Background Accent */}
        <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-blue-500/5 rounded-full blur-3xl pointer-events-none" />
      </div>
    </main>
  );
}
