"use client";

import React, { useState } from "react";
import { Ruler } from "lucide-react";
import { Modal } from "@/components/ui/Modal";
import { cn } from "@/lib/utils";

interface SizeSelectorProps {
  sizes: number[];
  selectedSize: number | null;
  onSelectSize: (size: number) => void;
  gender?: string;
}

export function SizeSelector({
  sizes,
  selectedSize,
  onSelectSize,
  gender = "men",
}: SizeSelectorProps) {
  const [isSizeGuideOpen, setIsSizeGuideOpen] = useState(false);

  // Common shoe sizes table
  const allAvailableSizes = [6, 6.5, 7, 7.5, 8, 8.5, 9, 9.5, 10, 10.5, 11, 11.5, 12];

  return (
    <div className="space-y-2.5">
      <div className="flex items-center justify-between text-xs">
        <span className="font-bold uppercase tracking-wider text-zinc-900">
          Select Size: <span className="text-zinc-600 font-medium">{selectedSize ? `${selectedSize} US` : "Choose"}</span>
        </span>
        <button
          type="button"
          onClick={() => setIsSizeGuideOpen(true)}
          className="text-xs font-semibold text-zinc-600 hover:text-orange-600 flex items-center gap-1 underline underline-offset-4 transition-colors"
        >
          <Ruler className="w-3.5 h-3.5" />
          <span>Size Guide</span>
        </button>
      </div>

      {/* Grid of Sizes */}
      <div className="grid grid-cols-4 sm:grid-cols-5 gap-2" role="radiogroup" aria-label="Shoe sizes in US">
        {allAvailableSizes.map((size) => {
          const isAvailable = sizes.includes(size);
          const isSelected = selectedSize === size;

          return (
            <button
              key={size}
              type="button"
              role="radio"
              aria-checked={isSelected}
              disabled={!isAvailable}
              onClick={() => onSelectSize(size)}
              className={cn(
                "h-11 py-2 px-1 rounded-xl text-xs font-bold border flex items-center justify-center transition-all active:scale-95",
                isSelected
                  ? "bg-zinc-950 text-white border-zinc-950 shadow-sm"
                  : isAvailable
                  ? "bg-white text-zinc-800 border-zinc-200 hover:border-zinc-400 hover:bg-zinc-50"
                  : "bg-zinc-100/70 text-zinc-400 border-dashed border-zinc-200 cursor-not-allowed opacity-60"
              )}
            >
              US {size}
            </button>
          );
        })}
      </div>

      {/* Size Guide Modal */}
      <Modal
        isOpen={isSizeGuideOpen}
        onClose={() => setIsSizeGuideOpen(false)}
        title="SoleX Official Footwear Sizing Guide"
        maxWidth="lg"
      >
        <div className="space-y-5 text-zinc-700 text-xs sm:text-sm">
          <p className="text-zinc-500">
            SoleX footwear runs true to standard athletic sizing. If you have wider feet or prefer extra room in the toe box for marathon running, we recommend sizing up a half size.
          </p>

          <div className="overflow-x-auto rounded-xl border border-zinc-200">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-zinc-50 border-b border-zinc-200 text-[11px] font-bold uppercase tracking-wider text-zinc-600">
                  <th className="py-2.5 px-3">US {gender === "women" ? "Women" : "Men"}</th>
                  <th className="py-2.5 px-3">UK</th>
                  <th className="py-2.5 px-3">EU</th>
                  <th className="py-2.5 px-3">CM</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-100 text-xs">
                <tr><td className="py-2 px-3 font-semibold">7.0</td><td className="py-2 px-3">6.0</td><td className="py-2 px-3">40.0</td><td className="py-2 px-3">25.0 cm</td></tr>
                <tr><td className="py-2 px-3 font-semibold">8.0</td><td className="py-2 px-3">7.0</td><td className="py-2 px-3">41.0</td><td className="py-2 px-3">26.0 cm</td></tr>
                <tr><td className="py-2 px-3 font-semibold">8.5</td><td className="py-2 px-3">7.5</td><td className="py-2 px-3">42.0</td><td className="py-2 px-3">26.5 cm</td></tr>
                <tr><td className="py-2 px-3 font-semibold">9.0</td><td className="py-2 px-3">8.0</td><td className="py-2 px-3">42.5</td><td className="py-2 px-3">27.0 cm</td></tr>
                <tr><td className="py-2 px-3 font-semibold">9.5</td><td className="py-2 px-3">8.5</td><td className="py-2 px-3">43.0</td><td className="py-2 px-3">27.5 cm</td></tr>
                <tr><td className="py-2 px-3 font-semibold">10.0</td><td className="py-2 px-3">9.0</td><td className="py-2 px-3">44.0</td><td className="py-2 px-3">28.0 cm</td></tr>
                <tr><td className="py-2 px-3 font-semibold">10.5</td><td className="py-2 px-3">9.5</td><td className="py-2 px-3">44.5</td><td className="py-2 px-3">28.5 cm</td></tr>
                <tr><td className="py-2 px-3 font-semibold">11.0</td><td className="py-2 px-3">10.0</td><td className="py-2 px-3">45.0</td><td className="py-2 px-3">29.0 cm</td></tr>
                <tr><td className="py-2 px-3 font-semibold">12.0</td><td className="py-2 px-3">11.0</td><td className="py-2 px-3">46.5</td><td className="py-2 px-3">30.0 cm</td></tr>
              </tbody>
            </table>
          </div>

          <div className="bg-orange-50/70 border border-orange-100 rounded-xl p-3.5 text-xs text-orange-900">
            <strong className="block font-semibold mb-0.5">How to measure your foot:</strong>
            Place your heel against a flat wall on a sheet of paper. Mark the tip of your longest toe and measure the distance in centimeters.
          </div>
        </div>
      </Modal>
    </div>
  );
}
