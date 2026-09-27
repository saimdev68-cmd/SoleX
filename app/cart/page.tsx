"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, ShoppingBag, Trash2, ShieldCheck, ArrowLeft, Plus, Minus } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { Button } from "@/components/ui/Button";
import { formatPrice } from "@/lib/utils";

export default function CartPage() {
  const { items, itemCount, subtotal, shipping, total, updateQuantity, removeItem, clearCart } =
    useCart();

  if (items.length === 0) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-24 text-center space-y-5">
        <div className="w-16 h-16 rounded-full bg-zinc-100 flex items-center justify-center mx-auto text-zinc-400">
          <ShoppingBag className="w-8 h-8" />
        </div>
        <h1 className="text-2xl font-black text-zinc-950">Your Shopping Bag is Empty</h1>
        <p className="text-xs sm:text-sm text-zinc-500 max-w-sm mx-auto">
          Explore our latest drops and performance engineering. Free shipping on all orders over $100.
        </p>
        <div className="pt-2">
          <Link href="/shop">
            <Button variant="primary" size="lg" className="rounded-full">
              <span>Start Shopping</span>
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 w-full">
      <div className="flex items-center justify-between pb-6 border-b border-zinc-200">
        <div>
          <span className="text-xs font-bold uppercase tracking-widest text-orange-600">
            Shopping Bag
          </span>
          <h1 className="text-3xl font-black text-zinc-950 tracking-tight mt-1">
            Review Bag ({itemCount})
          </h1>
        </div>
        <button
          onClick={clearCart}
          className="text-xs font-semibold text-zinc-400 hover:text-red-600 transition-colors"
        >
          Clear Entire Bag
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 pt-8 items-start">
        {/* Items Table List */}
        <div className="lg:col-span-8 divide-y divide-zinc-200">
          {items.map((item) => (
            <div key={item.id} className="py-6 first:pt-0 flex flex-col sm:flex-row gap-5 items-start">
              {/* Product Image */}
              <Link
                href={`/products/${item.slug}`}
                className="relative w-28 h-28 bg-zinc-50 rounded-xl overflow-hidden shrink-0 border border-zinc-200/80 block"
              >
                <Image
                  src={item.image}
                  alt={item.name}
                  fill
                  className="object-cover w-full h-full"
                  sizes="112px"
                />
              </Link>

              {/* Details & Controls */}
              <div className="flex-1 min-w-0 flex flex-col justify-between w-full h-full space-y-4">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <Link
                      href={`/products/${item.slug}`}
                      className="text-base font-bold text-zinc-950 hover:text-orange-600 transition-colors"
                    >
                      {item.name}
                    </Link>
                    <div className="flex flex-wrap gap-x-4 gap-y-1 text-xs text-zinc-500 mt-1">
                      <span>Color: <strong className="text-zinc-800">{item.color}</strong></span>
                      <span>Size: <strong className="text-zinc-800">US {item.size}</strong></span>
                    </div>
                  </div>
                  <div className="text-right">
                    <span className="text-base font-extrabold text-zinc-950">
                      {formatPrice(item.price * item.quantity)}
                    </span>
                    <span className="block text-xs text-zinc-400">
                      {formatPrice(item.price)} each
                    </span>
                  </div>
                </div>

                <div className="flex items-center justify-between pt-2">
                  {/* Quantity selector */}
                  <div className="flex items-center border border-zinc-200 rounded-lg bg-zinc-50/50">
                    <button
                      onClick={() => updateQuantity(item.id, -1)}
                      disabled={item.quantity <= 1}
                      className="p-1.5 text-zinc-600 hover:text-zinc-900 disabled:opacity-40 transition-colors"
                      aria-label="Decrease quantity"
                    >
                      <Minus className="w-3.5 h-3.5" />
                    </button>
                    <span className="w-8 text-center text-xs font-semibold text-zinc-900">
                      {item.quantity}
                    </span>
                    <button
                      onClick={() => updateQuantity(item.id, 1)}
                      disabled={item.quantity >= item.maxStock}
                      className="p-1.5 text-zinc-600 hover:text-zinc-900 disabled:opacity-40 transition-colors"
                      aria-label="Increase quantity"
                    >
                      <Plus className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  <button
                    onClick={() => removeItem(item.id)}
                    className="text-xs font-medium text-zinc-400 hover:text-red-600 flex items-center gap-1 transition-colors"
                  >
                    <Trash2 className="w-4 h-4" />
                    <span>Remove</span>
                  </button>
                </div>
              </div>
            </div>
          ))}

          <div className="pt-6">
            <Link
              href="/shop"
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-zinc-600 hover:text-zinc-950"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Continue Shopping</span>
            </Link>
          </div>
        </div>

        {/* Order Summary Sidebar */}
        <div className="lg:col-span-4 bg-white p-6 rounded-2xl border border-zinc-200/80 space-y-6 shadow-card lg:sticky lg:top-24">
          <h2 className="text-sm font-bold uppercase tracking-wider text-zinc-950 pb-3 border-b border-zinc-100">
            Order Summary
          </h2>

          <div className="space-y-3 text-xs text-zinc-600">
            <div className="flex justify-between">
              <span>Items Subtotal</span>
              <span className="font-semibold text-zinc-900">{formatPrice(subtotal)}</span>
            </div>
            <div className="flex justify-between">
              <span>Estimated Shipping</span>
              <span className="font-semibold text-zinc-900">
                {shipping === 0 ? (
                  <span className="text-emerald-700 font-bold uppercase text-[11px]">Free</span>
                ) : (
                  formatPrice(shipping)
                )}
              </span>
            </div>
            <div className="flex justify-between text-base font-extrabold text-zinc-950 pt-3 border-t border-zinc-100">
              <span>Estimated Total</span>
              <span>{formatPrice(total)}</span>
            </div>
          </div>

          <Link href="/checkout" className="block w-full">
            <Button
              variant="primary"
              size="lg"
              className="w-full rounded-xl text-sm uppercase tracking-wider font-bold shadow-md hover:shadow-lg"
            >
              <span>Proceed to Checkout</span>
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </Link>

          <div className="space-y-2 text-[11px] text-zinc-500 pt-2 border-t border-zinc-100">
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>Cash on Delivery accepted on all orders</span>
            </div>
            <p>Free 30-day returns on unworn merchandise.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
