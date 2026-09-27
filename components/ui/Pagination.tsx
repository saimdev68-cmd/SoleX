"use client";

import React from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  className?: string;
}

export function Pagination({
  currentPage,
  totalPages,
  onPageChange,
  className,
}: PaginationProps) {
  if (totalPages <= 1) return null;

  // Build the page array with smart ellipses
  const getPageNumbers = (): (number | "...")[] => {
    if (totalPages <= 7) {
      return Array.from({ length: totalPages }, (_, i) => i + 1);
    }

    const pages: (number | "...")[] = [];
    const showLeftEllipsis = currentPage > 4;
    const showRightEllipsis = currentPage < totalPages - 3;

    if (!showLeftEllipsis && showRightEllipsis) {
      // Near start: 1, 2, 3, 4, 5, ..., totalPages
      for (let i = 1; i <= 5; i++) pages.push(i);
      pages.push("...");
      pages.push(totalPages);
    } else if (showLeftEllipsis && !showRightEllipsis) {
      // Near end: 1, ..., totalPages - 4, totalPages - 3, totalPages - 2, totalPages - 1, totalPages
      pages.push(1);
      pages.push("...");
      for (let i = totalPages - 4; i <= totalPages; i++) pages.push(i);
    } else {
      // Middle: 1, ..., currentPage - 1, currentPage, currentPage + 1, ..., totalPages
      pages.push(1);
      pages.push("...");
      pages.push(currentPage - 1);
      pages.push(currentPage);
      pages.push(currentPage + 1);
      pages.push("...");
      pages.push(totalPages);
    }

    return pages;
  };

  const pages = getPageNumbers();

  return (
    <nav
      className={cn("flex items-center justify-center gap-1.5 sm:gap-2", className)}
      aria-label="Product pagination"
    >
      {/* Previous Button */}
      <button
        type="button"
        onClick={() => onPageChange(Math.max(1, currentPage - 1))}
        disabled={currentPage === 1}
        className={cn(
          "h-10 px-3 rounded-xl border flex items-center gap-1 text-xs font-semibold transition-all",
          currentPage === 1
            ? "border-zinc-200 text-zinc-300 cursor-not-allowed bg-zinc-50"
            : "border-zinc-300 text-zinc-700 bg-white hover:bg-zinc-950 hover:text-white hover:border-zinc-950 shadow-xs active:scale-95"
        )}
        aria-label="Go to previous page"
      >
        <ChevronLeft className="w-4 h-4" />
        <span className="hidden sm:inline">Prev</span>
      </button>

      {/* Page Numbers & Ellipses */}
      <div className="flex items-center gap-1 sm:gap-1.5">
        {pages.map((item, index) => {
          if (item === "...") {
            return (
              <span
                key={`ellipsis-${index}`}
                className="w-8 h-10 flex items-center justify-center text-xs font-bold text-zinc-400 select-none tracking-widest"
              >
                •••
              </span>
            );
          }

          const isCurrent = item === currentPage;

          return (
            <button
              key={`page-${item}`}
              type="button"
              onClick={() => onPageChange(item)}
              aria-current={isCurrent ? "page" : undefined}
              className={cn(
                "w-10 h-10 rounded-xl text-xs font-bold transition-all flex items-center justify-center",
                isCurrent
                  ? "bg-zinc-950 text-white shadow-sm scale-105"
                  : "bg-white border border-zinc-200/90 text-zinc-700 hover:border-zinc-400 hover:bg-zinc-100 hover:text-zinc-950"
              )}
            >
              {item}
            </button>
          );
        })}
      </div>

      {/* Next Button */}
      <button
        type="button"
        onClick={() => onPageChange(Math.min(totalPages, currentPage + 1))}
        disabled={currentPage === totalPages}
        className={cn(
          "h-10 px-3 rounded-xl border flex items-center gap-1 text-xs font-semibold transition-all",
          currentPage === totalPages
            ? "border-zinc-200 text-zinc-300 cursor-not-allowed bg-zinc-50"
            : "border-zinc-300 text-zinc-700 bg-white hover:bg-zinc-950 hover:text-white hover:border-zinc-950 shadow-xs active:scale-95"
        )}
        aria-label="Go to next page"
      >
        <span className="hidden sm:inline">Next</span>
        <ChevronRight className="w-4 h-4" />
      </button>
    </nav>
  );
}
