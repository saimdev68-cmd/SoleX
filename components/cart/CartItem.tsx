"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Minus, Plus, Trash2 } from "lucide-react";
import { CartItem as CartItemType, useCart } from "@/context/CartContext";
import { formatPrice } from "@/lib/utils";

interface CartItemRowProps {
  item: CartItemType;
  onItemClick?: () => void;
}

export function CartItemRow({ item, onItemClick }: CartItemRowProps) {
  const { updateQuantity, removeItem } = useCart();

  return (
    <div className="flex gap-4 py-4 border-b border-zinc-100 last:border-b-0 items-start">
      {/* Product Image */}
      <Link
        href={`/products/${item.slug}`}
        onClick={onItemClick}
        className="relative w-20 h-20 bg-zinc-100 rounded-lg overflow-hidden shrink-0 border border-zinc-200/60 block"
      >
        <Image
          src={item.image}
          alt={item.name}
          fill
          className="object-cover w-full h-full"
          sizes="80px"
        />
      </Link>

      {/* Item Details */}
      <div className="flex-1 min-w-0 flex flex-col justify-between h-full">
        <div>
          <div className="flex items-start justify-between gap-2">
            <Link
              href={`/products/${item.slug}`}
              onClick={onItemClick}
              className="text-sm font-semibold text-zinc-900 hover:text-orange-600 transition-colors truncate"
            >
              {item.name}
            </Link>
            <span className="text-sm font-bold text-zinc-900 shrink-0">
              {formatPrice(item.price * item.quantity)}
            </span>
          </div>
          <div className="text-xs text-zinc-500 mt-1 flex flex-wrap gap-x-3 gap-y-0.5">
            <span>Color: <strong className="text-zinc-700">{item.color}</strong></span>
            <span>Size: <strong className="text-zinc-700">{item.size} US</strong></span>
          </div>
          <p className="text-[11px] text-zinc-400 mt-0.5">
            {formatPrice(item.price)} each
          </p>
        </div>

        {/* Quantity Controls & Remove */}
        <div className="flex items-center justify-between mt-3 pt-1">
          <div className="flex items-center border border-zinc-200 rounded-lg bg-zinc-50/50">
            <button
              onClick={() => updateQuantity(item.id, -1)}
              disabled={item.quantity <= 1}
              className="p-1.5 text-zinc-600 hover:text-zinc-900 disabled:opacity-40 disabled:hover:text-zinc-600 transition-colors"
              aria-label="Decrease quantity"
            >
              <Minus className="w-3.5 h-3.5" />
            </button>
            <span className="w-7 text-center text-xs font-semibold text-zinc-900">
              {item.quantity}
            </span>
            <button
              onClick={() => updateQuantity(item.id, 1)}
              disabled={item.quantity >= item.maxStock}
              className="p-1.5 text-zinc-600 hover:text-zinc-900 disabled:opacity-40 disabled:hover:text-zinc-600 transition-colors"
              aria-label="Increase quantity"
            >
              <Plus className="w-3.5 h-3.5" />
            </button>
          </div>

          <button
            onClick={() => removeItem(item.id)}
            className="text-xs text-zinc-400 hover:text-red-600 flex items-center gap-1 transition-colors p-1"
            aria-label={`Remove ${item.name} from cart`}
          >
            <Trash2 className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Remove</span>
          </button>
        </div>
      </div>
    </div>
  );
}
