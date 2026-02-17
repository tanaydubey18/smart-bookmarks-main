import Link from "next/link";
import { Github, Twitter, Linkedin, Heart } from "lucide-react";
import { Logo } from "./ui/Logo";

export function Footer() {
  return (
    <footer className="border-t border-border/40 bg-slate-50/50 backdrop-blur-sm py-8">
      <div className="mx-auto max-w-6xl px-6 flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <Logo />
          <span className="text-muted-foreground hidden md:inline">•</span>
          <p className="text-sm text-muted-foreground">
            © 2026 Smart Bookmarks. Built with <Heart className="inline h-3 w-3 text-red-500 fill-red-500" /> by <span className="text-foreground font-medium">Tanishq Dubey</span>
          </p>
        </div>

        <div className="flex items-center gap-4">
          <SocialLink href="https://github.com/tanaydubey18" icon={<Github className="h-4 w-4" />} label="GitHub" />
          <SocialLink href="#" icon={<Twitter className="h-4 w-4" />} label="Twitter" />
          <SocialLink href="#" icon={<Linkedin className="h-4 w-4" />} label="LinkedIn" />
        </div>
      </div>
    </footer>
  );
}

function SocialLink({ href, icon, label }: { href: string; icon: React.ReactNode; label: string }) {
  return (
    <a 
      href={href} 
      target="_blank" 
      rel="noopener noreferrer"
      className="h-8 w-8 flex items-center justify-center rounded-full bg-secondary text-muted-foreground hover:bg-primary hover:text-primary-foreground transition-all duration-300"
      aria-label={label}
    >
      {icon}
    </a>
  );
}
