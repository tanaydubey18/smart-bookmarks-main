import Link from "next/link";
import Image from "next/image";
import { MoveLeft } from "lucide-react";

export default function NotFound() {
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
            backgroundSize: "60px 60px"
          }}
        />
      </div>

      {/* Decorative Illustrations Scattering */}
      <div className="absolute inset-0 z-10 pointer-events-none opacity-[0.15] dark:opacity-[0.2] grayscale dark:invert">
        <div className="absolute top-[20%] left-[15%] w-48 h-48 rotate-[-12deg]">
             <Image src="/reading-group.jpg" alt="Decoration" fill className="object-contain" />
        </div>
        <div className="absolute top-[60%] right-[10%] w-56 h-56 rotate-[8deg]">
             <Image src="/search-illustration.jpg" alt="Decoration" fill className="object-contain" />
        </div>
        <div className="absolute bottom-[10%] left-[20%] w-40 h-40 rotate-[5deg]">
             <Image src="/stack-of-books.jpg" alt="Decoration" fill className="object-contain" />
        </div>
        <div className="absolute top-[10%] right-[20%] w-32 h-32 rotate-[-5deg]">
             <Image src="/high-five.jpg" alt="Decoration" fill className="object-contain" />
        </div>
      </div>

      {/* Content Card */}
      <div className="relative z-20 text-center space-y-8 px-6 max-w-2xl animate-in fade-in slide-in-from-bottom-8 duration-1000">
        <div className="space-y-4">
          <h1 className="text-6xl md:text-8xl font-serif tracking-tight text-foreground/90">
             Page Not Found
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground/80 max-w-md mx-auto leading-relaxed">
            The page you are looking for has been moved or doesn't exist. Let's get you back on track.
          </p>
        </div>

        <div className="pt-8">
          <Link 
            href="/"
            className="group inline-flex items-center gap-2 text-sm font-semibold text-primary hover:text-primary/80 transition-all"
          >
            <MoveLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
            <span className="border-b-2 border-primary/20 group-hover:border-primary transition-all pb-0.5">
               Back to homepage
            </span>
          </Link>
        </div>
      </div>

      {/* Signature Branding (bottom) */}
      <div className="absolute bottom-12 left-1/2 -translate-x-1/2 z-20 opacity-40 pointer-events-none font-handwriting text-2xl">
         Smart Bookmarks
      </div>
    </main>
  );
}
