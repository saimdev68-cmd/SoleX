"use client";

import React, { createContext, useContext, useState, useEffect, ReactNode, useCallback, useMemo } from "react";
import { Product } from "@/data/products";
import { getFromStorage, saveToStorage, STORAGE_KEYS } from "@/lib/storage";

export interface CartItem {
  id: string; // e.g. "solex-air-one-Onyx Black-9"
  productId: string;
  slug: string;
  name: string;
  price: number;
  image: string;
  color: string;
  size: number;
  quantity: number;
  maxStock: number;
}

interface CartContextType {
  items: CartItem[];
  itemCount: number;
  subtotal: number;
  shipping: number;
  total: number;
  isDrawerOpen: boolean;
  openDrawer: () => void;
  closeDrawer: () => void;
  addItem: (product: Product, color: string, size: number, quantity?: number) => void;
  removeItem: (id: string) => void;
  updateQuantity: (id: string, deltaOrQuantity: number, isAbsolute?: boolean) => void;
  clearCart: () => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [isInitialized, setIsInitialized] = useState(false);

  // Initialize cart from localStorage on mount
  useEffect(() => {
    const saved = getFromStorage<CartItem[]>(STORAGE_KEYS.CART, []);
    setItems(saved);
    setIsInitialized(true);
  }, []);

  // Sync to localStorage
  useEffect(() => {
    if (isInitialized) {
      saveToStorage(STORAGE_KEYS.CART, items);
    }
  }, [items, isInitialized]);

  const openDrawer = useCallback(() => setIsDrawerOpen(true), []);
  const closeDrawer = useCallback(() => setIsDrawerOpen(false), []);

  const addItem = useCallback(
    (product: Product, color: string, size: number, quantity = 1) => {
      setItems((prev) => {
        const itemId = `${product.id}-${color.replace(/\s+/g, "_")}-${size}`;
        const existingIndex = prev.findIndex((item) => item.id === itemId);

        if (existingIndex > -1) {
          const next = [...prev];
          const newQty = Math.min(next[existingIndex].quantity + quantity, product.stock);
          next[existingIndex] = {
            ...next[existingIndex],
            quantity: newQty,
          };
          return next;
        } else {
          const matchedColor = product.colors?.find(
            (c) => c.name.toLowerCase() === color.toLowerCase()
          );
          const variantImage =
            matchedColor?.images?.[0] || product.images[0] || "/products/solex-air-one-1.jpg";

          const newItem: CartItem = {
            id: itemId,
            productId: product.id,
            slug: product.slug,
            name: product.name,
            price: product.price,
            image: variantImage,
            color,
            size,
            quantity: Math.min(quantity, product.stock),
            maxStock: product.stock,
          };
          return [...prev, newItem];
        }
      });
    },
    []
  );

  const removeItem = useCallback((id: string) => {
    setItems((prev) => prev.filter((item) => item.id !== id));
  }, []);

  const updateQuantity = useCallback((id: string, value: number, isAbsolute = false) => {
    setItems((prev) =>
      prev
        .map((item) => {
          if (item.id !== id) return item;
          const nextQty = isAbsolute ? value : item.quantity + value;
          if (nextQty <= 0) return null;
          return {
            ...item,
            quantity: Math.min(nextQty, item.maxStock),
          };
        })
        .filter((item): item is CartItem => item !== null)
    );
  }, []);

  const clearCart = useCallback(() => {
    setItems([]);
  }, []);

  const itemCount = useMemo(() => items.reduce((sum, item) => sum + item.quantity, 0), [items]);

  const subtotal = useMemo(
    () => items.reduce((sum, item) => sum + item.price * item.quantity, 0),
    [items]
  );

  // Free shipping over $100, otherwise $10 flat rate (if items exist)
  const shipping = useMemo(() => {
    if (items.length === 0) return 0;
    return subtotal >= 100 ? 0 : 10;
  }, [items, subtotal]);

  const total = useMemo(() => subtotal + shipping, [subtotal, shipping]);

  return (
    <CartContext.Provider
      value={{
        items,
        itemCount,
        subtotal,
        shipping,
        total,
        isDrawerOpen,
        openDrawer,
        closeDrawer,
        addItem,
        removeItem,
        updateQuantity,
        clearCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart(): CartContextType {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
}
