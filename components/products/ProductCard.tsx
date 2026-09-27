"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Star, ShoppingBag, Plus } from "lucide-react";
import { Product } from "@/data/products";
import { WishlistButton } from "@/components/wishlist/WishlistButton";
import { useCart } from "@/context/CartContext";
import { useToast } from "@/context/ToastContext";
import { formatPrice } from "@/lib/utils";

interface ProductCardProps {
  product: Product;
  priority?: boolean;
  showQuickAdd?: boolean;
  actionSlot?: React.ReactNode;
}

export function ProductCard({
  product,
  priority = false,
  showQuickAdd = true,
  actionSlot,
}: ProductCardProps) {
  const { addItem, openDrawer } = useCart();
  const { showToast } = useToast();
  const [selectedColorIndex, setSelectedColorIndex] = useState(0);
  const [imgSrc, setImgSrc] = useState<string | null>(null);

  const activeColor = product.colors[selectedColorIndex] || product.colors[0];
  const activeImage =
    activeColor?.images?.[0] ||
    product.images[selectedColorIndex] ||
    product.images[0] ||
    "/products/solex-air-one-1.jpg";

  const handleQuickAddSize = (e: React.MouseEvent, size: number) => {
    e.preventDefault();
    e.stopPropagation();

    addItem(product, activeColor.name, size, 1);
    showToast(`Added ${product.name} (US ${size}) to bag`, "success");
    openDrawer();
  };

  return (
    <div className="group relative flex flex-col bg-white rounded-2xl border border-zinc-200/70 p-3 sm:p-3.5 hover:shadow-card hover:border-zinc-300 transition-all duration-300">
      {/* Full-Bleed Visual Box */}
      <div className="relative aspect-square w-full rounded-xl bg-zinc-100 overflow-hidden mb-3 border border-zinc-200/60">
        {/* Badge */}
        {product.badge && (
          <div className="absolute top-2.5 left-2.5 z-10">
            <span
              className={`text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider text-white shadow-sm ${
                product.badge === "NEW"
                  ? "bg-zinc-950"
                  : product.badge === "SALE"
                  ? "bg-red-600"
                  : product.badge === "LIMITED"
                  ? "bg-amber-600"
                  : "bg-orange-600"
              }`}
            >
              {product.badge}
            </span>
          </div>
        )}

        {/* Wishlist Button */}
        <div className="absolute top-2.5 right-2.5 z-10">
          <WishlistButton product={product} size="sm" />
        </div>

        {/* Product Full Image Link */}
        <Link
          href={`/products/${product.slug}`}
          className="relative block w-full h-full overflow-hidden"
        >
          <Image
            src={imgSrc || activeImage}
            alt={product.name}
            fill
            priority={priority}
            onError={() => setImgSrc("/products/solex-air-one-1.jpg")}
            className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-500 ease-out"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
          />
        </Link>

        {/* Desktop Quick Add Size Selector on Hover */}
        {showQuickAdd && (
          <div className="absolute inset-x-2.5 bottom-2.5 z-20 opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-2 group-hover:translate-y-0 hidden sm:block pointer-events-none group-hover:pointer-events-auto">
            <div className="bg-white/95 backdrop-blur-md rounded-xl p-2.5 shadow-elevated border border-zinc-200/90 space-y-2">
              <div className="flex items-center justify-between text-[10px] font-bold uppercase tracking-wider text-zinc-500 px-0.5">
                <span>Quick Add Size</span>
                <span className="text-zinc-400">US</span>
              </div>
              <div className="grid grid-cols-6 gap-1.5">
                {product.sizes.slice(0, 6).map((sz) => (
                  <button
                    key={sz}
                    type="button"
                    onClick={(e) => handleQuickAddSize(e, sz)}
                    className="h-8 py-1 px-1 bg-zinc-100 hover:bg-zinc-950 hover:text-white text-zinc-900 rounded-lg text-xs font-bold transition-all flex items-center justify-center shadow-xs active:scale-95"
                  >
                    {sz}
                  </button>
                ))}
              </div>
              {product.sizes.length > 6 && (
                <div className="text-center pt-0.5">
                  <Link
                    href={`/products/${product.slug}`}
                    onClick={(e) => e.stopPropagation()}
                    className="text-[10px] font-semibold text-zinc-500 hover:text-orange-600 transition-colors inline-block"
                  >
                    +{product.sizes.length - 6} more sizes available
                  </Link>
                </div>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Product Information */}
      <div className="flex-1 flex flex-col justify-between space-y-2">
        <div>
          {/* Category & Rating */}
          <div className="flex items-center justify-between text-xs text-zinc-500 mb-1">
            <span className="capitalize font-medium">
              {product.category} Footwear
            </span>
            <div className="flex items-center gap-1 text-zinc-700 font-semibold">
              <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
              <span>{product.rating}</span>
            </div>
          </div>

          {/* Product Name */}
          <Link href={`/products/${product.slug}`}>
            <h3 className="text-sm sm:text-base font-bold text-zinc-900 group-hover:text-orange-600 transition-colors line-clamp-1">
              {product.name}
            </h3>
          </Link>
        </div>

        {/* Color Switcher Dots & Price */}
        <div className="flex items-center justify-between pt-1">
          {/* Colors */}
          <div className="flex items-center gap-1.5" aria-label="Available colorways">
            {product.colors.map((color, idx) => (
              <button
                key={color.name}
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  setSelectedColorIndex(idx);
                  setImgSrc(null);
                }}
                title={color.name}
                className={`w-3.5 h-3.5 rounded-full border transition-all ${
                  selectedColorIndex === idx
                    ? "ring-2 ring-zinc-950 ring-offset-1 scale-110 border-transparent"
                    : "border-zinc-300 hover:scale-105"
                }`}
                style={{ backgroundColor: color.hex }}
              />
            ))}
            {product.colors.length > 3 && (
              <span className="text-[10px] text-zinc-400 font-medium ml-0.5">
                +{product.colors.length - 3}
              </span>
            )}
          </div>

          {/* Price */}
          <div className="text-right min-h-[38px] flex flex-col justify-center items-end">
            <span className="text-sm sm:text-base font-extrabold text-zinc-950 leading-tight">
              {formatPrice(product.price)}
            </span>
            {product.oldPrice ? (
              <span className="block text-xs text-zinc-400 line-through leading-tight mt-0.5">
                {formatPrice(product.oldPrice)}
              </span>
            ) : (
              <span className="block text-xs text-transparent select-none leading-tight mt-0.5" aria-hidden="true">
                &nbsp;
              </span>
            )}
          </div>
        </div>

        {/* Action Slot or Mobile Quick Add */}
        {actionSlot ? (
          <div className="w-full pt-1">{actionSlot}</div>
        ) : (
          /* Mobile Quick Add Button */
          <div className="sm:hidden pt-2">
            <Link
              href={`/products/${product.slug}`}
              className="w-full py-2.5 px-4 bg-zinc-100 hover:bg-zinc-200 text-zinc-900 rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 transition-colors border border-zinc-200/70 shadow-xs"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Select Size</span>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
