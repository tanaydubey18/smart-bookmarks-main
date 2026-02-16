"use client";

import * as React from "react";
import { Link2, Type, Star } from "lucide-react";
import { cn } from "@/lib/utils";
import gsap from "gsap";

interface DynamicInputProps {
  title: string;
  setTitle: (val: string) => void;
  url: string;
  setUrl: (val: string) => void;
  onSubmit: () => void;
  loading?: boolean;
}

export function DynamicInput({ 
  title, 
  setTitle, 
  url, 
  setUrl, 
  onSubmit, 
  loading 
}: DynamicInputProps) {
  const [isFocused, setIsFocused] = React.useState(false);
  const starRef = React.useRef<SVGSVGElement>(null);

  const handleAction = () => {
    if (loading || !url || !title) return;
    
    // Shine animation for 1 sec (0.5s out, 0.5s in)
    if (starRef.current) {
        gsap.to(starRef.current, {
            scale: 1.6,
            filter: "brightness(2) drop-shadow(0 0 12px #FFD700)",
            duration: 0.5,
            yoyo: true,
            repeat: 1,
            ease: "power2.inOut"
        });
    }

    onSubmit();
  };

  return (
    <div 
      className={cn(
        "group relative w-full rounded-2xl border transition-all duration-500 glass premium-shadow",
        isFocused 
          ? "border-primary/50 ring-4 ring-primary/5 scale-[1.01]" 
          : "border-border/50 hover:border-primary/20"
      )}
    >
      <div className="flex flex-col md:flex-row items-stretch overflow-hidden divide-y md:divide-y-0 md:divide-x divide-border/30">
        {/* Title Input Section */}
        <div className="flex-1 flex items-center px-4 py-3 relative">
          <Type className={cn(
            "h-5 w-5 mr-3 transition-colors duration-300",
            title ? "text-primary" : "text-muted-foreground/50"
          )} />
          <input
            type="text"
            placeholder="Bookmark Title..."
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            className="flex-1 bg-transparent border-none outline-none text-sm font-medium placeholder:text-muted-foreground/40 text-foreground"
          />
        </div>

        {/* URL Input Section */}
        <div className="flex-[1.5] flex items-center px-4 py-3 relative">
          <Link2 className={cn(
            "h-5 w-5 mr-3 transition-colors duration-300",
            url ? "text-primary" : "text-muted-foreground/50"
          )} />
          <input
            type="url"
            placeholder="https://example.com/useful-link"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            className="flex-1 bg-transparent border-none outline-none text-sm font-medium placeholder:text-muted-foreground/40 text-foreground"
          />
        </div>

        {/* Action Button */}
        <button
          onClick={handleAction}
          disabled={loading || !url || !title}
          className={cn(
            "px-8 py-3 flex items-center justify-center gap-3 font-bold transition-all duration-300 btn-shine",
            "bg-primary text-primary-foreground disabled:opacity-50 disabled:grayscale disabled:cursor-not-allowed",
            "hover:bg-primary/90 active:scale-95 shadow-lg premium-shadow hover:premium-shadow-hover"
          )}
        >
          {loading ? (
             <div className="h-5 w-5 border-2 border-white/30 border-t-white animate-spin rounded-full" />
          ) : (
            <>
              <Star 
                ref={starRef}
                className="h-4 w-4 fill-[#FFD700] text-[#FFD700]" 
              />
              <span>Getting Started</span>
            </>
          )}
        </button>
      </div>

      {/* Dynamic Background Gradient */}
      <div className={cn(
        "absolute -inset-px -z-10 rounded-2xl opacity-0 transition-opacity duration-500 bg-gradient-to-r from-primary/10 via-accent/10 to-primary/10 blur-xl",
        isFocused && "opacity-100"
      )} />
    </div>
  );
}
