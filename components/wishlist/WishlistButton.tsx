"use client";

import React from "react";
import { Heart } from "lucide-react";
import { Product } from "@/data/products";
import { useWishlist } from "@/context/WishlistContext";
import { useToast } from "@/context/ToastContext";
import { cn } from "@/lib/utils";

interface WishlistButtonProps {
  product: Product;
  className?: string;
  size?: "sm" | "md" | "lg";
}

export function WishlistButton({ product, className, size = "md" }: WishlistButtonProps) {
  const { isInWishlist, toggleWishlist } = useWishlist();
  const { showToast } = useToast();

  const isSaved = isInWishlist(product.id);

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    const added = toggleWishlist(product);
    if (added) {
      showToast(`Added ${product.name} to wishlist`, "success");
    } else {
      showToast(`Removed ${product.name} from wishlist`, "info");
    }
  };

  const sizeStyles = {
    sm: "w-8 h-8 p-1.5",
    md: "w-10 h-10 p-2.5",
    lg: "w-[52px] h-[52px] p-3.5",
  };

  const iconSizes = {
    sm: "w-3.5 h-3.5",
    md: "w-4 h-4",
    lg: "w-5 h-5",
  };

  return (
    <button
      type="button"
      onClick={handleClick}
      aria-label={isSaved ? `Remove ${product.name} from wishlist` : `Add ${product.name} to wishlist`}
      className={cn(
        "inline-flex items-center justify-center rounded-full bg-white/95 hover:bg-white text-zinc-700 hover:text-zinc-950 shadow-sm border border-zinc-200/80 transition-all duration-200 active:scale-90 shrink-0",
        sizeStyles[size],
        isSaved && "text-orange-600 hover:text-orange-700 bg-orange-50 border-orange-200",
        className
      )}
    >
      <Heart
        className={cn(
          iconSizes[size],
          "transition-transform",
          isSaved && "fill-orange-600 text-orange-600 scale-110"
        )}
      />
    </button>
  );
}
