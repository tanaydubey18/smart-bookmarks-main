"use client";

import Image from "next/image";

export function DashboardBackground() {
  return (
    <div className="fixed inset-0 -z-10 bg-background overflow-hidden pointer-events-none">
      {/* Blueprint Grid */}
      <div className="absolute inset-0 bg-grid opacity-[0.4] dark:opacity-[0.1]" />

      {/* Decorative Sketch Elements on the left */}
      <div className="fixed top-2/3 left-0 -translate-y-1/2 w-72 h-72 opacity-20 pointer-events-none select-none grayscale dark:invert lg:opacity-40 -translate-x-8 hover:translate-x-0 transition-transform duration-700">
        <div className="relative w-full h-full">
          <Image
            src="/search-illustration.jpg"
            alt="Search Illustration"
            fill
            className="object-contain"
            priority
          />
        </div>
      </div>


      <div className="fixed bottom-0 right-0 w-72 h-72 opacity-20 pointer-events-none select-none grayscale dark:invert lg:opacity-40 translate-x-4 hover:translate-x-0 transition-transform duration-700">
        <div className="relative w-full h-full">
          <Image
            src="/stack-of-books.jpg"
            alt="Stack of Books"
            fill
            className="object-contain object-bottom"
            priority
          />
        </div>
      </div>

      {/* Radial Gradient for depth */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(var(--background),0.5)_100%)] pointer-events-none" />
    </div>
  );
}
