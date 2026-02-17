"use client";

import React, { useEffect, useRef } from "react";
import gsap from "gsap";

export const CustomCursor: React.FC = () => {
  const cursorDotRef = useRef<HTMLDivElement>(null);
  const cursorRingRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const cursorDot = cursorDotRef.current;
    const cursorRing = cursorRingRef.current;

    // OPTIMIZATION: Don't run this heavy logic on devices without a mouse (e.g. mobile)
    const isTouchDevice = window.matchMedia("(pointer: coarse)").matches;
    if (isTouchDevice || !cursorDot || !cursorRing) return;

    const onMouseMove = (e: MouseEvent) => {
      const { clientX, clientY } = e;

      // Move dot instantly
      gsap.to(cursorDot, {
        x: clientX,
        y: clientY,
        duration: 0.1,
      });

      // Move ring with lag (inertia)
      gsap.to(cursorRing, {
        x: clientX,
        y: clientY,
        duration: 0.4,
        ease: "power2.out",
      });
    };

    const onMouseDown = () => {
      gsap.to([cursorDot, cursorRing], {
        scale: 0.7,
        duration: 0.1,
      });
    };

    const onMouseUp = () => {
      gsap.to([cursorDot, cursorRing], {
        scale: 1,
        duration: 0.1,
      });
    };

    const onMouseEnterLink = () => {
      gsap.to(cursorRing, {
        scale: 2.5,
        backgroundColor: "rgba(0, 85, 255, 0.05)",
        borderColor: "rgba(0, 85, 255, 0.3)",
        duration: 0.3,
      });
      gsap.to(cursorDot, {
        scale: 0,
        duration: 0.2,
      });
    };

    const onMouseLeaveLink = () => {
      gsap.to(cursorRing, {
        scale: 1,
        backgroundColor: "transparent",
        borderColor: "rgba(0, 85, 255, 0.5)",
        duration: 0.3,
      });
      gsap.to(cursorDot, {
        scale: 1,
        duration: 0.2,
      });
    };

    const addEventListeners = () => {
      window.addEventListener("mousemove", onMouseMove);
      window.addEventListener("mousedown", onMouseDown);
      window.addEventListener("mouseup", onMouseUp);

      const links = document.querySelectorAll("a, button, input, [role='button']");
      links.forEach((link) => {
        link.addEventListener("mouseenter", onMouseEnterLink);
        link.addEventListener("mouseleave", onMouseLeaveLink);
      });
    };

    const removeEventListeners = () => {
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mousedown", onMouseDown);
      window.removeEventListener("mouseup", onMouseUp);

      const links = document.querySelectorAll("a, button, input, [role='button']");
      links.forEach((link) => {
        link.removeEventListener("mouseenter", onMouseEnterLink);
        link.removeEventListener("mouseleave", onMouseLeaveLink);
      });
    };

    addEventListeners();

    // Re-bind listeners on navigation or DOM changes if needed
    // For Next.js, we might need a MutationObserver if content changes dynamically
    const observer = new MutationObserver(() => {
        const links = document.querySelectorAll("a, button, input, [role='button']");
        links.forEach((link) => {
          link.addEventListener("mouseenter", onMouseEnterLink);
          link.addEventListener("mouseleave", onMouseLeaveLink);
        });
    });

    observer.observe(document.body, { childList: true, subtree: true });

    return () => {
      removeEventListeners();
      observer.disconnect();
    };
  }, []);

  // Hide entirely on touch devices via CSS media query helper class or just return null if server-side detection was possible (but this is client component)
  // We already handle the logic disable above. The CSS 'hidden md:block' already does a good job of hiding it visually.
  // But let's add an explicit early return for logic if we wanted.
  // For now, the existing CSS `hidden md:block` is sufficient to hide it, and the JS check above prevents the heavy event listeners.

  return (
    <>
      <div
        ref={cursorDotRef}
        className="fixed top-0 left-0 w-1.5 h-1.5 bg-primary rounded-full pointer-events-none z-[9999] -translate-x-1/2 -translate-y-1/2 hidden md:block"
      />
      <div
        ref={cursorRingRef}
        className="fixed top-0 left-0 w-8 h-8 border border-primary/50 rounded-full pointer-events-none z-[9998] -translate-x-1/2 -translate-y-1/2 hidden md:block transition-[border-color,background-color] duration-300"
      />
    </>
  );
};
