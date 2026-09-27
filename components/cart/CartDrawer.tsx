"use client";

import React from "react";
import Link from "next/link";
import { ShoppingBag, ArrowRight, ShieldCheck } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { Drawer } from "@/components/ui/Drawer";
import { CartItemRow } from "@/components/cart/CartItem";
import { Button } from "@/components/ui/Button";
import { formatPrice } from "@/lib/utils";

export function CartDrawer() {
  const { items, itemCount, subtotal, shipping, total, isDrawerOpen, closeDrawer } = useCart();

  const freeShippingThreshold = 100;
  const progressToFreeShipping = Math.min((subtotal / freeShippingThreshold) * 100, 100);
  const remainingForFreeShipping = Math.max(freeShippingThreshold - subtotal, 0);

  return (
    <Drawer
      isOpen={isDrawerOpen}
      onClose={closeDrawer}
      title={`Your Bag (${itemCount})`}
      position="right"
    >
      <div className="flex flex-col h-full justify-between">
        {/* Free Shipping Progress Meter */}
        <div className="bg-zinc-50 border border-zinc-200/60 rounded-xl p-3 mb-4">
          <div className="flex items-center justify-between text-xs font-medium text-zinc-700 mb-1.5">
            {subtotal >= freeShippingThreshold ? (
              <span className="text-emerald-700 font-semibold flex items-center gap-1">
                <ShieldCheck className="w-3.5 h-3.5" /> You unlocked Free Express Shipping!
              </span>
            ) : (
              <span>
                Add <strong className="text-zinc-900">{formatPrice(remainingForFreeShipping)}</strong> more for <strong>Free Shipping</strong>
              </span>
            )}
            <span className="text-[11px] text-zinc-500 font-semibold">
              {Math.round(progressToFreeShipping)}%
            </span>
          </div>
          <div className="w-full bg-zinc-200 h-1.5 rounded-full overflow-hidden">
            <div
              className="bg-orange-600 h-full rounded-full transition-all duration-300"
              style={{ width: `${progressToFreeShipping}%` }}
            />
          </div>
        </div>

        {/* Items List */}
        <div className="flex-1 overflow-y-auto divide-y divide-zinc-100 pr-1 -mr-1">
          {items.length === 0 ? (
            <div className="py-16 text-center space-y-4">
              <div className="w-16 h-16 rounded-full bg-zinc-100 flex items-center justify-center mx-auto text-zinc-400">
                <ShoppingBag className="w-7 h-7" />
              </div>
              <div>
                <h4 className="text-base font-bold text-zinc-900">Your bag is empty</h4>
                <p className="text-xs text-zinc-500 mt-1 max-w-xs mx-auto">
                  Looks like you haven&apos;t added any sneakers yet. Discover the new collection.
                </p>
              </div>
              <div className="pt-2">
                <Button
                  onClick={closeDrawer}
                  variant="primary"
                  size="sm"
                  className="rounded-full"
                >
                  <Link href="/shop">Start Shopping</Link>
                </Button>
              </div>
            </div>
          ) : (
            items.map((item) => (
              <CartItemRow key={item.id} item={item} onItemClick={closeDrawer} />
            ))
          )}
        </div>

        {/* Drawer Footer & Checkout */}
        {items.length > 0 && (
          <div className="border-t border-zinc-100 pt-4 mt-4 space-y-3 shrink-0">
            <div className="space-y-1.5 text-xs text-zinc-600">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span className="font-semibold text-zinc-900">{formatPrice(subtotal)}</span>
              </div>
              <div className="flex justify-between">
                <span>Estimated Shipping</span>
                <span className="font-semibold text-zinc-900">
                  {shipping === 0 ? (
                    <span className="text-emerald-600 uppercase font-bold text-[11px]">Free</span>
                  ) : (
                    formatPrice(shipping)
                  )}
                </span>
              </div>
              <div className="flex justify-between text-sm font-bold text-zinc-900 pt-2 border-t border-zinc-100">
                <span>Total</span>
                <span>{formatPrice(total)}</span>
              </div>
            </div>

            <div className="grid grid-cols-1 gap-2 pt-1">
              <Link href="/checkout" onClick={closeDrawer} className="w-full block">
                <Button variant="primary" size="lg" className="w-full flex items-center justify-center gap-2">
                  <span>Checkout</span>
                  <ArrowRight className="w-4 h-4" />
                </Button>
              </Link>
              <Link href="/cart" onClick={closeDrawer} className="w-full block">
                <Button variant="outline" size="md" className="w-full">
                  View Full Bag
                </Button>
              </Link>
            </div>

            <p className="text-[11px] text-center text-zinc-400">
              Cash on Delivery available on all orders · 30-day returns
            </p>
          </div>
        )}
      </div>
    </Drawer>
  );
}
