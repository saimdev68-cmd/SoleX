import React from "react";
import Image from "next/image";
import { CartItem } from "@/context/CartContext";
import { formatPrice } from "@/lib/utils";

interface OrderSummaryProps {
  items: CartItem[];
  subtotal: number;
  shipping: number;
  total: number;
}

export function OrderSummary({ items, subtotal, shipping, total }: OrderSummaryProps) {
  return (
    <div className="bg-zinc-50 rounded-2xl border border-zinc-200/80 p-6 space-y-6">
      <div className="flex items-center justify-between pb-3 border-b border-zinc-200">
        <h3 className="text-sm font-bold uppercase tracking-wider text-zinc-950">
          Order Summary ({items.reduce((acc, i) => acc + i.quantity, 0)})
        </h3>
      </div>

      {/* Items List */}
      <div className="max-h-72 overflow-y-auto divide-y divide-zinc-200/60 pr-1 space-y-3">
        {items.map((item) => (
          <div key={item.id} className="flex gap-3 pt-3 first:pt-0 items-center">
            <div className="relative w-14 h-14 rounded-lg bg-white border border-zinc-200 shrink-0 overflow-hidden">
              <Image
                src={item.image}
                alt={item.name}
                fill
                className="object-cover w-full h-full"
                sizes="56px"
              />
              <span className="absolute -top-1 -right-1 w-5 h-5 bg-zinc-900 text-white rounded-full text-[10px] font-bold flex items-center justify-center">
                {item.quantity}
              </span>
            </div>
            <div className="flex-1 min-w-0">
              <h4 className="text-xs font-semibold text-zinc-900 truncate">{item.name}</h4>
              <p className="text-[11px] text-zinc-500">
                US {item.size} · {item.color}
              </p>
            </div>
            <span className="text-xs font-bold text-zinc-900 shrink-0">
              {formatPrice(item.price * item.quantity)}
            </span>
          </div>
        ))}
      </div>

      {/* Pricing Breakdown */}
      <div className="space-y-2 pt-4 border-t border-zinc-200 text-xs text-zinc-600">
        <div className="flex justify-between">
          <span>Subtotal</span>
          <span className="font-semibold text-zinc-900">{formatPrice(subtotal)}</span>
        </div>
        <div className="flex justify-between">
          <span>Standard Express Shipping</span>
          <span className="font-semibold text-zinc-900">
            {shipping === 0 ? (
              <span className="text-emerald-700 font-bold uppercase text-[11px]">Free</span>
            ) : (
              formatPrice(shipping)
            )}
          </span>
        </div>
        <div className="flex justify-between text-base font-extrabold text-zinc-950 pt-3 border-t border-zinc-200">
          <span>Total (Due on Delivery)</span>
          <span>{formatPrice(total)}</span>
        </div>
      </div>
    </div>
  );
}
