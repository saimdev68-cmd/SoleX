"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { X, ArrowRight } from "lucide-react";
import { getFromStorage, saveToStorage, STORAGE_KEYS } from "@/lib/storage";

export function AnnouncementBar() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const dismissed = getFromStorage<boolean>(STORAGE_KEYS.ANNOUNCEMENT_DISMISSED, false);
    if (!dismissed) {
      setIsVisible(true);
    }
  }, []);

  const handleDismiss = () => {
    setIsVisible(false);
    saveToStorage(STORAGE_KEYS.ANNOUNCEMENT_DISMISSED, true);
  };

  if (!isVisible) return null;

  return (
    <aside aria-label="Announcement" className="relative bg-zinc-950 text-white text-xs font-medium py-2.5 px-4 transition-all">
      <div className="max-w-7xl mx-auto flex items-center justify-center text-center">
        <p className="flex items-center gap-2 tracking-wide uppercase">
          <span className="inline-block w-1.5 h-1.5 rounded-full bg-orange-500 animate-pulse" />
          <span>Complimentary express delivery on orders over $100</span>
          <span className="hidden sm:inline text-zinc-500">|</span>
          <Link
            href="/shop"
            className="hidden sm:inline-flex items-center gap-1 text-zinc-300 hover:text-white underline underline-offset-4 font-normal"
          >
            <span>Shop New Drop</span>
            <ArrowRight className="w-3 h-3" />
          </Link>
        </p>
      </div>
      <button
        onClick={handleDismiss}
        className="absolute right-3 top-1/2 -translate-y-1/2 p-1 text-zinc-400 hover:text-white rounded transition-colors"
        aria-label="Dismiss announcement"
      >
        <X className="w-3.5 h-3.5" />
      </button>
    </aside>
  );
}
