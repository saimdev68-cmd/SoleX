"use client";

import React from "react";
import Link from "next/link";
import { Heart, ArrowRight, ShoppingBag, Trash2 } from "lucide-react";
import { useWishlist } from "@/context/WishlistContext";
import { useCart } from "@/context/CartContext";
import { useToast } from "@/context/ToastContext";
import { getAllProducts } from "@/lib/products";
import { ProductCard } from "@/components/products/ProductCard";
import { Button } from "@/components/ui/Button";

export default function WishlistPage() {
  const { wishlistIds, removeFromWishlist } = useWishlist();
  const { addItem, openDrawer } = useCart();
  const { showToast } = useToast();

  const allProducts = getAllProducts();
  const savedProducts = allProducts.filter((p) => wishlistIds.includes(p.id));

  if (savedProducts.length === 0) {
    return (
      <div className="max-w-md mx-auto px-4 py-24 text-center space-y-4">
        <div className="w-16 h-16 rounded-full bg-zinc-100 text-zinc-400 flex items-center justify-center mx-auto">
          <Heart className="w-8 h-8" />
        </div>
        <h1 className="text-2xl font-black text-zinc-950">Your Wishlist is Empty</h1>
        <p className="text-xs sm:text-sm text-zinc-500">
          Tap the heart icon on any sneaker to save it to your wishlist. Your saved styles stay in your browser.
        </p>
        <div className="pt-2">
          <Link href="/shop">
            <Button variant="primary" size="md" className="rounded-full">
              <span>Explore Collection</span>
              <ArrowRight className="w-4 h-4 ml-1.5" />
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
            Saved Styles
          </span>
          <h1 className="text-3xl font-black text-zinc-950 tracking-tight mt-1">
            My Wishlist ({savedProducts.length})
          </h1>
        </div>
        <Link
          href="/shop"
          className="text-xs font-semibold text-zinc-600 hover:text-zinc-950 flex items-center gap-1"
        >
          <span>Continue Shopping</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </Link>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 pt-8">
        {savedProducts.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
            showQuickAdd={false}
            actionSlot={
              <div className="pt-2.5 mt-2.5 border-t border-zinc-100 flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => {
                    const defaultSize = product.sizes[0] || 9;
                    addItem(product, product.colors[0].name, defaultSize, 1);
                    showToast(`Moved ${product.name} to bag`, "success");
                    openDrawer();
                  }}
                  className="flex-1 min-h-[38px] py-2 px-3 rounded-xl bg-zinc-950 hover:bg-zinc-800 text-white text-xs font-bold flex items-center justify-center gap-1.5 transition-colors shadow-xs active:scale-95"
                >
                  <ShoppingBag className="w-3.5 h-3.5" />
                  <span>Move to Bag</span>
                </button>
                <button
                  type="button"
                  onClick={() => {
                    removeFromWishlist(product.id);
                    showToast(`Removed ${product.name} from wishlist`, "info");
                  }}
                  className="w-9 h-9 flex items-center justify-center rounded-xl border border-zinc-200 hover:border-red-200 hover:bg-red-50 text-zinc-400 hover:text-red-600 transition-colors shrink-0"
                  title="Remove from wishlist"
                  aria-label="Remove item"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            }
          />
        ))}
      </div>
    </div>
  );
}
