"use client";

import { useRef, useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ArrowRight, Bookmark, Layers, Zap, LayoutDashboard } from "lucide-react";

import { Button } from "@/components/ui/Button";
import { Logo } from "@/components/ui/Logo";
import { Footer } from "@/components/Footer";
import { createSupabaseBrowserClient } from "@/lib/supabase/client";

export default function HomePage() {
  const container = useRef<HTMLDivElement>(null);
  const router = useRouter();
  const [session, setSession] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [signOutLoading, setSignOutLoading] = useState(false);

  useEffect(() => {
    const supabase = createSupabaseBrowserClient();
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setLoading(false);
    });
  }, []);

  const handleSignOut = async () => {
    setSignOutLoading(true);
    const supabase = createSupabaseBrowserClient();
    await supabase.auth.signOut();
    setSession(null);
    setSignOutLoading(false);
  };

  useGSAP(
    () => {
      const tl = gsap.timeline();

      tl.from(".hero-element", {
        y: 40,
        opacity: 0,
        duration: 0.8,
        stagger: 0.12,
        ease: "power3.out",
      })
      .from(".feature-card", {
        y: 30,
        opacity: 0,
        duration: 0.6,
        stagger: 0.1,
        ease: "power2.out",
      }, "-=0.3");
    },
    { scope: container }
  );

  return (
    <main ref={container} className="min-h-screen flex flex-col bg-background text-foreground">
      {/* Header */}
      <header className="sticky top-0 left-0 right-0 z-50 flex items-center justify-between px-6 py-4 backdrop-blur-md bg-white/40 border-b border-border/30">
        <div className="flex items-center gap-4">
          <Logo />
        </div>
        <div className="flex items-center gap-3">
          {session ? (
            <>
              <Link href="/dashboard">
                <Button variant="ghost" className="hidden sm:inline-flex gap-2 font-medium">
                  <LayoutDashboard className="h-4 w-4" />
                  Dashboard
                </Button>
              </Link>
              <Button onClick={handleSignOut} loading={signOutLoading} className="px-6">
                Sign Out
              </Button>
            </>
          ) : (
            <div className="flex items-center gap-2">
              <Link href="/login">
                <Button variant="ghost" className="font-medium">Login</Button>
              </Link>
              <Link href="/login">
                <Button className="px-6">Sign Up</Button>
              </Link>
            </div>
          )}
        </div>
      </header>
      
      {/* Hero Section */}
      <section className="relative flex flex-col items-center justify-center min-h-[75vh] pt-10 md:pt-14 pb-20 px-6 text-center">
        {/* Isometric Grid Background */}
        <div 
          className="absolute inset-0 z-0 pointer-events-none opacity-[0.1] overflow-hidden"
          style={{
            perspective: "1000px",
            transformStyle: "preserve-3d",
          }}
        >
          <div 
            className="bg-grid absolute inset-[-100%] w-[200%] h-[200%]"
            style={{
              transform: "rotateX(35deg) rotateZ(-10deg) skewX(5deg)",
              backgroundSize: "60px 60px"
            }}
          />
        </div>

        <div className="max-w-3xl space-y-6 relative z-10">
            <div className="hero-element inline-flex items-center gap-2 rounded-full border border-border bg-secondary/50 px-4 py-1.5 text-[11px] sm:text-xs font-bold uppercase tracking-widest text-muted-foreground shadow-sm">
              <Bookmark className="h-3.5 w-3.5 text-primary" />
              Your premium digital architect
            </div>
            
            <h1 className="hero-element text-4xl sm:text-6xl md:text-7xl font-bold tracking-tight leading-[1.1] text-balance">
                Save what matters.
                <br />
                <span className="text-primary font-serif italic">Find it instantly.</span>
            </h1>
            
            <p className="hero-element mx-auto max-w-xl text-base sm:text-lg text-muted-foreground leading-relaxed px-4">
             A clean, private space for your bookmarks. Save articles, 
             inspiration, and resources — organized with the soul of a blueprint.
            </p>
          
            <div className="hero-element flex flex-col items-center gap-8 pt-4">
                <div className="relative w-full max-w-[200px] sm:max-w-[280px] aspect-square transition-transform duration-500 hover:scale-105">
                  <Image 
                    src="/hero-illustration.png" 
                    alt="Hero illustration" 
                    fill 
                    className="object-contain"
                  />
                </div>
                <div className="flex flex-col sm:flex-row items-center gap-4">
                  <Link href={session ? "/dashboard" : "/login"} className="w-full sm:w-auto">
                    <Button size="lg" className="h-14 w-full sm:w-auto px-10 text-lg shadow-xl hover:shadow-primary/20 transition-all group">
                        {session ? "Getting Started" : "Start Exploring"}
                        <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
                    </Button>
                  </Link>
                </div>
            </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="mx-auto max-w-5xl px-6 pb-24">
        <div className="grid gap-6 md:grid-cols-3">
            <FeatureCard 
              icon={<Bookmark className="h-5 w-5" />}
              title="One-Click Save"
              description="Save any page with a single click. Titles and URLs are captured instantly."
            />
            <FeatureCard 
               icon={<Layers className="h-5 w-5" />}
               title="Stay Organized"
               description="Your bookmarks, neatly organized in one clean dashboard. No clutter."
            />
             <FeatureCard 
               icon={<Zap className="h-5 w-5" />}
               title="Real-Time Sync"
               description="Changes sync instantly across all your devices. Always up to date."
            />
        </div>
      </section>


      {/* Footer */}
      <Footer />
    </main>
  );
}

function FeatureCard({ icon, title, description }: { icon: React.ReactNode, title: string, description: string }) {
  return (
    <div className="feature-card group flex flex-col p-6 rounded-xl border border-border bg-card hover:bg-secondary/50 transition-colors duration-300">
      <div className="mb-4 h-10 w-10 flex items-center justify-center rounded-lg bg-secondary text-foreground">
        {icon}
      </div>
      <h3 className="mb-2 text-lg font-semibold tracking-tight">{title}</h3>
      <p className="text-sm text-muted-foreground leading-relaxed">{description}</p>
    </div>
  )
}
