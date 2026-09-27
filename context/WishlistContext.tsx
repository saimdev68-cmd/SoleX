"use client";

import React, { createContext, useContext, useState, useEffect, ReactNode, useCallback } from "react";
import { Product } from "@/data/products";
import { getFromStorage, saveToStorage, STORAGE_KEYS } from "@/lib/storage";

interface WishlistContextType {
  wishlistIds: string[];
  wishlistCount: number;
  isInWishlist: (productId: string) => boolean;
  toggleWishlist: (product: Product) => boolean; // returns true if added, false if removed
  removeFromWishlist: (productId: string) => void;
}

const WishlistContext = createContext<WishlistContextType | undefined>(undefined);

export function WishlistProvider({ children }: { children: ReactNode }) {
  const [wishlistIds, setWishlistIds] = useState<string[]>([]);
  const [isInitialized, setIsInitialized] = useState(false);

  useEffect(() => {
    const saved = getFromStorage<string[]>(STORAGE_KEYS.WISHLIST, []);
    setWishlistIds(saved);
    setIsInitialized(true);
  }, []);

  useEffect(() => {
    if (isInitialized) {
      saveToStorage(STORAGE_KEYS.WISHLIST, wishlistIds);
    }
  }, [wishlistIds, isInitialized]);

  const isInWishlist = useCallback(
    (productId: string) => wishlistIds.includes(productId),
    [wishlistIds]
  );

  const toggleWishlist = useCallback((product: Product): boolean => {
    let added = false;
    setWishlistIds((prev) => {
      if (prev.includes(product.id)) {
        added = false;
        return prev.filter((id) => id !== product.id);
      } else {
        added = true;
        return [...prev, product.id];
      }
    });
    return added;
  }, []);

  const removeFromWishlist = useCallback((productId: string) => {
    setWishlistIds((prev) => prev.filter((id) => id !== productId));
  }, []);

  return (
    <WishlistContext.Provider
      value={{
        wishlistIds,
        wishlistCount: wishlistIds.length,
        isInWishlist,
        toggleWishlist,
        removeFromWishlist,
      }}
    >
      {children}
    </WishlistContext.Provider>
  );
}

export function useWishlist(): WishlistContextType {
  const context = useContext(WishlistContext);
  if (!context) {
    throw new Error("useWishlist must be used within a WishlistProvider");
  }
  return context;
}
