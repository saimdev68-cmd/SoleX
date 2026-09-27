import React from "react";
import { ProductColor } from "@/data/products";
import { cn } from "@/lib/utils";

interface ColorSelectorProps {
  colors: ProductColor[];
  selectedColor: ProductColor;
  onSelectColor: (color: ProductColor) => void;
}

export function ColorSelector({ colors, selectedColor, onSelectColor }: ColorSelectorProps) {
  return (
    <div className="space-y-2.5">
      <div className="flex items-center justify-between text-xs">
        <span className="font-bold uppercase tracking-wider text-zinc-900">
          Color: <span className="text-zinc-600 font-medium">{selectedColor.name}</span>
        </span>
      </div>
      <div className="flex flex-wrap gap-2.5" role="radiogroup" aria-label="Select sneaker colorway">
        {colors.map((color) => {
          const isSelected = selectedColor.name === color.name;
          return (
            <button
              key={color.name}
              type="button"
              role="radio"
              aria-checked={isSelected}
              onClick={() => onSelectColor(color)}
              className={cn(
                "relative w-9 h-9 rounded-full border flex items-center justify-center transition-all p-0.5",
                isSelected
                  ? "ring-2 ring-zinc-950 ring-offset-2 scale-105 border-transparent shadow-sm"
                  : "border-zinc-300 hover:scale-105 hover:border-zinc-400"
              )}
              title={color.name}
            >
              <span
                className="w-full h-full rounded-full"
                style={{ backgroundColor: color.hex }}
              />
            </button>
          );
        })}
      </div>
    </div>
  );
}
