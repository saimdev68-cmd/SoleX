"use client";

import React from "react";
import Link from "next/link";
import { Drawer } from "@/components/ui/Drawer";
import { useWishlist } from "@/context/WishlistContext";
import {
  Home,
  ShoppingBag,
  Sparkles,
  Heart,
  Package,
  Info,
  Mail,
  ChevronRight,
  HelpCircle,
} from "lucide-react";

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

export function MobileMenu({ isOpen, onClose }: MobileMenuProps) {
  const { wishlistCount } = useWishlist();

  const navLinks = [
    { label: "Home", href: "/", icon: Home },
    { label: "Shop All", href: "/shop", icon: ShoppingBag },
    { label: "New Arrivals", href: "/shop?badge=new", icon: Sparkles },
    { label: "Men's Collection", href: "/category/men" },
    { label: "Women's Collection", href: "/category/women" },
    { label: "Running", href: "/category/running" },
    { label: "Lifestyle", href: "/category/lifestyle" },
    { label: "Kids", href: "/category/kids" },
  ];

  const secondaryLinks = [
    {
      label: "Wishlist",
      href: "/wishlist",
      icon: Heart,
      badge: wishlistCount > 0 ? wishlistCount : undefined,
    },
    {
      label: "My Orders",
      href: "/account",
      icon: Package,
    },
    { label: "About SoleX", href: "/about", icon: Info },
    { label: "Contact Us", href: "/contact", icon: Mail },
    { label: "Help & FAQ", href: "/faq", icon: HelpCircle },
  ];

  return (
    <Drawer isOpen={isOpen} onClose={onClose} title="Navigation" position="left">
      <div className="flex flex-col h-full justify-between py-2">
        <div className="space-y-6">
          {/* Main Navigation */}
          <div className="space-y-1">
            <p className="px-3 text-[11px] font-bold tracking-widest uppercase text-zinc-400 mb-2">
              Collections
            </p>
            {navLinks.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={onClose}
                className="flex items-center justify-between px-3 py-2.5 rounded-lg text-sm font-semibold text-zinc-800 hover:text-orange-600 hover:bg-zinc-50 transition-colors"
              >
                <span>{item.label}</span>
                <ChevronRight className="w-4 h-4 text-zinc-300" />
              </Link>
            ))}
          </div>

          <div className="h-px bg-zinc-100" />

          {/* User & Info Links */}
          <div className="space-y-1">
            <p className="px-3 text-[11px] font-bold tracking-widest uppercase text-zinc-400 mb-2">
              Account & Info
            </p>
            {secondaryLinks.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={onClose}
                className="flex items-center justify-between px-3 py-2.5 rounded-lg text-sm font-medium text-zinc-700 hover:text-zinc-950 hover:bg-zinc-50 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <item.icon className="w-4 h-4 text-zinc-400" />
                  <span>{item.label}</span>
                </div>
                {item.badge !== undefined && (
                  <span className="bg-orange-600 text-white text-[11px] font-bold px-2 py-0.5 rounded-full">
                    {item.badge}
                  </span>
                )}
              </Link>
            ))}
          </div>
        </div>

        {/* Bottom banner in mobile drawer */}
        <div className="pt-6 border-t border-zinc-100 text-xs text-zinc-400">
          <p className="font-semibold text-zinc-800">SoleX Global Store</p>
          <p className="text-[11px] mt-0.5">Engineered for human movement.</p>
        </div>
      </div>
    </Drawer>
  );
}
