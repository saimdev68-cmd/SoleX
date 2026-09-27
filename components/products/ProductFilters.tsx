"use client";

import React from "react";
import { X, RotateCcw } from "lucide-react";
import { FilterOptions } from "@/lib/products";
import { cn } from "@/lib/utils";

interface ProductFiltersProps {
  filters: FilterOptions;
  onChange: (updated: Partial<FilterOptions>) => void;
  onReset: () => void;
  isMobile?: boolean;
  onCloseMobile?: () => void;
}

export function ProductFilters({
  filters,
  onChange,
  onReset,
  isMobile = false,
  onCloseMobile,
}: ProductFiltersProps) {
  const categories = ["all", "Men", "Women", "Running", "Lifestyle", "Kids"];

  const priceRanges = [
    { label: "All Prices", min: undefined, max: undefined },
    { label: "Under $100", min: 0, max: 100 },
    { label: "$100 – $150", min: 100, max: 150 },
    { label: "$150 – $180", min: 150, max: 180 },
    { label: "Over $180", min: 180, max: 1000 },
  ];

  const colors = [
    { name: "all", label: "All", hex: "#FFFFFF" },
    { name: "black", label: "Black", hex: "#18181B" },
    { name: "white", label: "White", hex: "#FAFAFA" },
    { name: "blue", label: "Blue", hex: "#2563EB" },
    { name: "orange", label: "Orange", hex: "#EA580C" },
    { name: "red", label: "Red", hex: "#DC2626" },
    { name: "gray", label: "Gray", hex: "#71717A" },
    { name: "green", label: "Green", hex: "#16A34A" },
    { name: "pink", label: "Pink", hex: "#EC4899" },
    { name: "purple", label: "Purple", hex: "#7C3AED" },
    { name: "wheat", label: "Wheat", hex: "#D97706" },
  ];

  const sizes = [7, 7.5, 8, 8.5, 9, 9.5, 10, 10.5, 11, 12];

  const hasActiveFilters =
    (filters.category && filters.category !== "all") ||
    filters.minPrice !== undefined ||
    (filters.color && filters.color !== "all") ||
    filters.size !== undefined ||
    filters.rating !== undefined;

  return (
    <div className={cn("space-y-6 text-xs", isMobile && "p-1")}>
      {/* Filter Header with Reset */}
      <div className="flex items-center justify-between pb-3 border-b border-zinc-100">
        <h3 className="font-bold uppercase tracking-wider text-zinc-900 text-sm">
          Filters
        </h3>
        {hasActiveFilters && (
          <button
            onClick={onReset}
            className="flex items-center gap-1 text-xs text-orange-600 hover:text-orange-700 font-semibold"
          >
            <RotateCcw className="w-3 h-3" />
            <span>Reset All</span>
          </button>
        )}
      </div>

      {/* Category Filter */}
      <div className="space-y-2">
        <span className="font-bold uppercase tracking-wider text-zinc-800 block">
          Category
        </span>
        <div className="space-y-1">
          {categories.map((cat) => {
            const isSelected =
              (!filters.category && cat === "all") ||
              filters.category?.toLowerCase() === cat.toLowerCase();
            return (
              <button
                key={cat}
                type="button"
                onClick={() => onChange({ category: cat === "all" ? undefined : cat })}
                className={cn(
                  "w-full text-left px-2.5 py-1.5 rounded-md transition-colors flex items-center justify-between",
                  isSelected
                    ? "bg-zinc-950 text-white font-semibold"
                    : "text-zinc-600 hover:bg-zinc-100 hover:text-zinc-900"
                )}
              >
                <span>{cat === "all" ? "All Categories" : cat}</span>
                {isSelected && <span className="w-1.5 h-1.5 rounded-full bg-orange-500" />}
              </button>
            );
          })}
        </div>
      </div>

      {/* Price Range Filter */}
      <div className="space-y-2 pt-2 border-t border-zinc-100">
        <span className="font-bold uppercase tracking-wider text-zinc-800 block">
          Price Range
        </span>
        <div className="space-y-1">
          {priceRanges.map((range) => {
            const isSelected =
              filters.minPrice === range.min && filters.maxPrice === range.max;
            return (
              <button
                key={range.label}
                type="button"
                onClick={() =>
                  onChange({
                    minPrice: range.min,
                    maxPrice: range.max,
                  })
                }
                className={cn(
                  "w-full text-left px-2.5 py-1.5 rounded-md transition-colors flex items-center justify-between",
                  isSelected
                    ? "bg-zinc-950 text-white font-semibold"
                    : "text-zinc-600 hover:bg-zinc-100 hover:text-zinc-900"
                )}
              >
                <span>{range.label}</span>
                {isSelected && <span className="w-1.5 h-1.5 rounded-full bg-orange-500" />}
              </button>
            );
          })}
        </div>
      </div>

      {/* Color Filter */}
      <div className="space-y-2 pt-2 border-t border-zinc-100">
        <span className="font-bold uppercase tracking-wider text-zinc-800 block">
          Color
        </span>
        <div className="flex flex-wrap gap-2">
          {colors.map((c) => {
            const isSelected =
              (!filters.color && c.name === "all") ||
              filters.color?.toLowerCase() === c.name;
            return (
              <button
                key={c.name}
                type="button"
                onClick={() => onChange({ color: c.name === "all" ? undefined : c.name })}
                title={c.label}
                className={cn(
                  "w-7 h-7 rounded-full border flex items-center justify-center transition-all p-0.5",
                  isSelected
                    ? "ring-2 ring-zinc-950 ring-offset-1 border-transparent scale-110"
                    : "border-zinc-300 hover:border-zinc-400"
                )}
              >
                <span
                  className="w-full h-full rounded-full"
                  style={{ backgroundColor: c.hex }}
                />
              </button>
            );
          })}
        </div>
      </div>

      {/* Size Filter */}
      <div className="space-y-2 pt-2 border-t border-zinc-100">
        <span className="font-bold uppercase tracking-wider text-zinc-800 block">
          Size (US)
        </span>
        <div className="grid grid-cols-4 gap-1.5">
          {sizes.map((sz) => {
            const isSelected = filters.size === sz;
            return (
              <button
                key={sz}
                type="button"
                onClick={() => onChange({ size: isSelected ? undefined : sz })}
                className={cn(
                  "h-8 rounded-md border text-xs font-semibold transition-colors flex items-center justify-center",
                  isSelected
                    ? "bg-zinc-950 text-white border-zinc-950"
                    : "bg-white text-zinc-700 border-zinc-200 hover:border-zinc-300"
                )}
              >
                {sz}
              </button>
            );
          })}
        </div>
      </div>

      {/* Minimum Rating */}
      <div className="space-y-2 pt-2 border-t border-zinc-100">
        <span className="font-bold uppercase tracking-wider text-zinc-800 block">
          Rating
        </span>
        <div className="space-y-1">
          {[
            { label: "All Ratings", val: undefined },
            { label: "4.8★ & Above", val: 4.8 },
            { label: "4.5★ & Above", val: 4.5 },
          ].map((r) => {
            const isSelected = filters.rating === r.val;
            return (
              <button
                key={r.label}
                type="button"
                onClick={() => onChange({ rating: r.val })}
                className={cn(
                  "w-full text-left px-2.5 py-1.5 rounded-md transition-colors flex items-center justify-between",
                  isSelected
                    ? "bg-zinc-950 text-white font-semibold"
                    : "text-zinc-600 hover:bg-zinc-100 hover:text-zinc-900"
                )}
              >
                <span>{r.label}</span>
                {isSelected && <span className="w-1.5 h-1.5 rounded-full bg-orange-500" />}
              </button>
            );
          })}
        </div>
      </div>

      {isMobile && onCloseMobile && (
        <div className="pt-4">
          <button
            onClick={onCloseMobile}
            className="w-full py-3 bg-zinc-950 text-white font-bold rounded-xl text-center text-xs uppercase tracking-wider"
          >
            Apply Filters
          </button>
        </div>
      )}
    </div>
  );
}
