"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ArrowLeft, Loader2 } from "lucide-react";

import { createSupabaseBrowserClient } from "@/lib/supabase/client";
import { Logo } from "@/components/ui/Logo";
import { Button } from "@/components/ui/Button";

export default function LoginPage() {
  const container = useRef<HTMLDivElement>(null);
  const [error, setError] = useState<string | null>(null);
  const triggered = useRef(false);

  useGSAP(
    () => {
        gsap.from(".login-card", {
            y: 30,
            opacity: 0,
            duration: 0.8,
            ease: "power3.out",
            delay: 0.1
        });
    },
    { scope: container }
  );

  // State for login trigger
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
    <main ref={container} className="relative flex min-h-screen items-center justify-center bg-background p-4 overflow-hidden">
       {/* Isometric Grid Background */}
       <div 
        className="absolute inset-0 z-0 pointer-events-none opacity-[0.2] dark:opacity-[0.1]"
        style={{
          perspective: "1000px",
          transformStyle: "preserve-3d",
        }}
      >
        <div 
          className="bg-grid absolute inset-[-100%] w-[200%] h-[200%]"
          style={{
            transform: "rotateX(45deg) rotateZ(-15deg) skewX(5deg)",
            backgroundSize: "60px 60px"
          }}
        />
      </div>

      {/* Decorative Elements */}
      <div className="absolute inset-0 z-10 pointer-events-none opacity-[0.1] grayscale dark:invert">
        <div className="absolute top-[10%] left-[5%] w-64 h-64 transform -rotate-12 animate-pulse transition-all duration-1000">
          <Image src="/reading-group.jpg" alt="Decoration" fill className="object-contain" priority />
        </div>
        <div className="absolute bottom-[5%] right-[5%] w-72 h-72 transform rotate-12 transition-all duration-1000">
          <Image src="/search-illustration.jpg" alt="Decoration" fill className="object-contain" priority />
        </div>
      </div>

       <div className="login-card w-full max-w-md space-y-8 rounded-3xl bg-card/80 border border-border/50 p-10 shadow-2xl relative z-20 glass backdrop-blur-xl transition-all duration-500 hover:shadow-primary/5">
        <div className="mb-2">
             <Link href="/">
                <Button variant="ghost" size="sm" className="-ml-2 text-muted-foreground hover:bg-primary/5 hover:text-primary transition-colors">
                    <ArrowLeft className="mr-2 h-4 w-4" />
                    Back to Landing
                </Button>
            </Link>
        </div>
        
        <div className="text-center space-y-6">
          <div className="flex justify-center flex-col items-center gap-6">
              <div className="transform scale-125">
                <Logo />
              </div>
              <div className="space-y-2">
                <h1 className="text-3xl font-bold tracking-tighter">Welcome Back</h1>
                <p className="text-sm text-muted-foreground font-medium">Capture your digital universe with Smart Bookmarks.</p>
              </div>
          </div>

          <div className="space-y-4 pt-4">
            {error && (
              <div className="p-3 rounded-xl bg-red-50 dark:bg-red-900/10 border border-red-200 dark:border-red-800 animate-in fade-in zoom-in-95 duration-300">
                <p className="text-xs text-red-600 dark:text-red-400 font-semibold" role="alert">{error}</p>
              </div>
            )}

            <Button 
                variant="outline" 
                className="w-full h-14 flex items-center justify-center gap-4 bg-white text-black hover:bg-slate-50 border-border/40 transition-all duration-300 shadow-lg hover:shadow-xl active:scale-[0.97] overflow-hidden group"
                onClick={startGoogleLogin}
                loading={isLoggingIn}
            >
              {!isLoggingIn && (
                 <img 
                    src="/google-logo.png" 
                    alt="Google Logo" 
                    className="h-6 w-6 object-contain group-hover:scale-110 transition-transform duration-300"
                />
              )}
              <span className="text-base font-bold">Continue with Google</span>
            </Button>

            <div className="pt-4 flex flex-col gap-3">
              <p className="text-[11px] text-center text-muted-foreground/50 px-8 leading-relaxed">
                By signing in, you agree to our Terms of Service and Privacy Policy. Securely hosted on Supabase Cloud.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Signature branding in corner */}
      <div className="absolute bottom-8 right-8 z-20 font-handwriting text-primary/30 text-3xl select-none">
        smart-bookmarks
      </div>
    </main>
  );
}
