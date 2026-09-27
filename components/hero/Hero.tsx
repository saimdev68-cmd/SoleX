"use client";

import React, { useRef, useState, useEffect } from "react";
import { HeroFrameSequence } from "@/components/hero/HeroFrameSequence";
import { HeroContent } from "@/components/hero/HeroContent";

export function Hero() {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    // Check for prefers-reduced-motion
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (mediaQuery.matches) {
      setScrollProgress(0);
      return;
    }

    const handleScroll = () => {
      const container = containerRef.current;
      if (!container) return;

      const rect = container.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      const totalScrollable = rect.height - windowHeight;

      if (totalScrollable <= 0) return;

      // When rect.top is 0, user is at top of hero (progress = 0)
      // When rect.top is -totalScrollable, user reached end of hero (progress = 1)
      const scrolled = -rect.top;
      const progress = Math.max(0, Math.min(scrolled / totalScrollable, 1));

      setScrollProgress(progress);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleExploreClick = () => {
    const categoriesSection = document.getElementById("categories-section");
    if (categoriesSection) {
      categoriesSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section
      id="hero-section"
      ref={containerRef}
      className="relative w-full h-[260vh] sm:h-[280vh] -mt-[72px] sm:-mt-[80px] bg-[#0A0A0A]"
      aria-label="Hero Showcase"
    >
      {/* Sticky Screen-High Frame */}
      <div className="sticky top-0 h-screen w-full overflow-hidden flex items-center justify-center">
        {/* Hardware-accelerated 240-frame sequence */}
        <HeroFrameSequence progress={scrollProgress} />

        {/* Editorial Text & CTA overlay */}
        <HeroContent progress={scrollProgress} onExploreClick={handleExploreClick} />
      </div>
    </section>
  );
}
