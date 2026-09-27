"use client";

import React from "react";
import Link from "next/link";
import { ArrowRight, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/Button";

interface HeroContentProps {
  progress?: number;
  onExploreClick?: () => void;
}

export function HeroContent({ progress = 0, onExploreClick }: HeroContentProps) {
  // Fade content slightly when reaching deep into the 3D shoe spin, but keep it readable
  const opacity = Math.max(1 - progress * 1.5, 0.15);
  const translateY = progress * -40;

  return (
    <div
      className="absolute inset-0 pointer-events-none flex flex-col justify-between pt-28 sm:pt-32 lg:pt-36 px-6 sm:px-12 lg:px-16 pb-8 sm:pb-12 z-20 transition-transform duration-100 ease-out"
      style={{
        transform: `translateY(${translateY}px)`,
      }}
    >
      {/* Top Editorial Tag */}
      <div
        className="pointer-events-auto transition-opacity duration-300"
        style={{ opacity: Math.max(1 - progress * 2.2, 0) }}
      >
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-zinc-900/5 backdrop-blur-md border border-zinc-900/10 text-zinc-900">
          <span className="w-1.5 h-1.5 rounded-full bg-orange-600 animate-ping" />
          <span className="text-[11px] font-bold tracking-widest uppercase">
            NEW SEASON / SOLEX 2026
          </span>
        </div>
      </div>

      {/* Main Copy & Action Buttons */}
      <div
        className="max-w-xl pointer-events-auto space-y-5 transition-opacity duration-300"
        style={{ opacity }}
      >
        <div className="space-y-2">
          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-black tracking-tight text-zinc-950 leading-[0.95]">
            MOVE <br />
            <span className="text-orange-600">DIFFERENT.</span>
          </h1>
          <p className="text-sm sm:text-base text-zinc-600 max-w-md font-normal leading-relaxed pt-2">
            Performance-driven sneakers designed for movement, comfort, and everyday style. Precision-engineered dynamic air cushioning for maximum energy return.
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-wrap items-center gap-3 pt-2">
          <Link href="/shop">
            <Button
              variant="primary"
              size="lg"
              className="rounded-full shadow-lg hover:shadow-xl group"
            >
              <span>Shop Now</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Button>
          </Link>
          <Button
            onClick={onExploreClick}
            variant="outline"
            size="lg"
            className="rounded-full bg-white/80 backdrop-blur-sm border-zinc-300 hover:bg-white text-zinc-900"
          >
            Explore Collection
          </Button>
        </div>
      </div>

      {/* Bottom Scroll Indicator */}
      <div
        className="pointer-events-auto flex items-center justify-between text-xs text-zinc-500 font-medium tracking-wide uppercase transition-opacity duration-300"
        style={{ opacity: Math.max(1 - progress * 2.5, 0) }}
      >
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-zinc-400" />
          <span>360° Kinematic Sequence</span>
        </div>

        <button
          onClick={onExploreClick}
          className="flex items-center gap-1.5 text-zinc-600 hover:text-zinc-950 transition-colors animate-bounce"
          aria-label="Scroll down to explore"
        >
          <span>Scroll to rotate</span>
          <ChevronDown className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
