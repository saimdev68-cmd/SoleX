import React from "react";
import { Minus, Plus } from "lucide-react";

interface QuantitySelectorProps {
  quantity: number;
  max: number;
  onChange: (quantity: number) => void;
}

export function QuantitySelector({ quantity, max, onChange }: QuantitySelectorProps) {
  const handleDecrement = () => {
    if (quantity > 1) {
      onChange(quantity - 1);
    }
  };

  const handleIncrement = () => {
    if (quantity < max) {
      onChange(quantity + 1);
    }
  };

  return (
    <div className="space-y-2">
      <span className="block text-xs font-bold uppercase tracking-wider text-zinc-900">
        Quantity
      </span>
      <div className="inline-flex items-center border border-zinc-200 rounded-xl bg-white p-1">
        <button
          type="button"
          onClick={handleDecrement}
          disabled={quantity <= 1}
          className="w-9 h-9 flex items-center justify-center text-zinc-600 hover:text-zinc-950 hover:bg-zinc-100 rounded-lg disabled:opacity-30 disabled:hover:bg-transparent transition-colors"
          aria-label="Decrease quantity"
        >
          <Minus className="w-4 h-4" />
        </button>

        <span className="w-12 text-center text-sm font-bold text-zinc-900 select-none">
          {quantity}
        </span>

        <button
          type="button"
          onClick={handleIncrement}
          disabled={quantity >= max}
          className="w-9 h-9 flex items-center justify-center text-zinc-600 hover:text-zinc-950 hover:bg-zinc-100 rounded-lg disabled:opacity-30 disabled:hover:bg-transparent transition-colors"
          aria-label="Increase quantity"
        >
          <Plus className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
