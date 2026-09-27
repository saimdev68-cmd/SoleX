"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Search, ShoppingBag, Heart, Package, Menu } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { useWishlist } from "@/context/WishlistContext";
import { SearchOverlay } from "@/components/search/SearchOverlay";
import { MobileMenu } from "@/components/layout/MobileMenu";
import { cn } from "@/lib/utils";

export function Navbar() {
  const pathname = usePathname();
  const { itemCount, openDrawer } = useCart();
  const { wishlistCount } = useWishlist();

  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolledPastHero, setIsScrolledPastHero] = useState(false);

  const isHomePage = pathname === "/";
  const isTransparent = isHomePage && !isScrolledPastHero;

  // Detect when user is in the hero section vs scrolled past it into catalog
  useEffect(() => {
    if (!isHomePage) {
      setIsScrolledPastHero(true);
      return;
    }

    const checkScroll = () => {
      const heroSection = document.getElementById("hero-section");
      if (heroSection) {
        const rect = heroSection.getBoundingClientRect();
        // The hero is active while its bottom is below navbar height
        setIsScrolledPastHero(rect.bottom <= 80);
      } else {
        setIsScrolledPastHero(window.scrollY > window.innerHeight);
      }
    };

    checkScroll();
    window.addEventListener("scroll", checkScroll, { passive: true });
    window.addEventListener("resize", checkScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", checkScroll);
      window.removeEventListener("resize", checkScroll);
    };
  }, [isHomePage]);

  // Global ⌘K / Ctrl+K keyboard shortcut to open search
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setIsSearchOpen(true);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  const navLinks = [
    { label: "Home", href: "/" },
    { label: "New Arrivals", href: "/shop?badge=new" },
    { label: "Men", href: "/category/men" },
    { label: "Women", href: "/category/women" },
    { label: "Running", href: "/category/running" },
    { label: "Lifestyle", href: "/category/lifestyle" },
    { label: "Shop", href: "/shop" },
  ];

  return (
    <>
      <header
        className={cn(
          "sticky top-0 z-40 transition-all duration-300",
          isTransparent
            ? "bg-transparent border-b border-transparent shadow-none"
            : "bg-white/90 backdrop-blur-md border-b border-zinc-200/80 shadow-subtle"
        )}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-18 sm:h-20 flex items-center justify-between">
          {/* Left: Brand Logo & Navigation */}
          <div className="flex items-center gap-8">
            <Link
              href="/"
              className="flex items-center gap-2 group select-none py-2"
              aria-label="SoleX Home"
            >
              <span className="text-2xl sm:text-[26px] font-black tracking-tighter text-zinc-950 transition-colors group-hover:text-zinc-800">
                SOLE<span className="text-orange-600 transition-colors group-hover:text-orange-500">X</span>
              </span>
              <span className="w-1.5 h-1.5 rounded-full bg-orange-600 group-hover:scale-125 transition-transform" />
            </Link>

            {/* Desktop Navigation Links */}
            <nav className="hidden lg:flex items-center gap-6 xl:gap-8">
              {navLinks.map((link) => {
                const isActive = pathname === link.href;
                return (
                  <Link
                    key={link.label}
                    href={link.href}
                    className={cn(
                      "text-xs font-bold tracking-wider uppercase transition-colors relative py-1.5",
                      isActive
                        ? "text-orange-600"
                        : "text-zinc-800 hover:text-orange-600"
                    )}
                  >
                    {link.label}
                    {isActive && (
                      <span className="absolute bottom-0 left-0 w-full h-0.5 bg-orange-600 rounded-full" />
                    )}
                  </Link>
                );
              })}
            </nav>
          </div>

          {/* Right Action Icons & Buttons */}
          <div className="flex items-center gap-2 sm:gap-2.5">
            {/* Search Trigger Capsule */}
            <button
              onClick={() => setIsSearchOpen(true)}
              className={cn(
                "flex items-center gap-2 sm:gap-2.5 px-3 sm:px-3.5 py-1.5 sm:py-2 rounded-full text-xs font-medium transition-all shadow-xs group",
                isTransparent
                  ? "bg-white/80 hover:bg-white text-zinc-600 hover:text-zinc-950 border border-zinc-900/10 backdrop-blur-sm"
                  : "bg-zinc-100/90 hover:bg-zinc-200/80 text-zinc-600 hover:text-zinc-950 border border-zinc-200/80"
              )}
              aria-label="Search sneakers"
            >
              <Search className="w-3.5 h-3.5 text-zinc-500 group-hover:text-zinc-900 transition-colors" />
              <span className="hidden md:inline text-zinc-500 group-hover:text-zinc-800 font-medium">
                Search sneakers...
              </span>
              <kbd className="hidden lg:inline-flex items-center text-[10px] bg-white border border-zinc-200 rounded px-1.5 py-0.5 text-zinc-400 font-mono font-semibold shadow-2xs">
                ⌘K
              </kbd>
            </button>

            {/* Wishlist Link */}
            <Link
              href="/wishlist"
              className={cn(
                "relative p-2 sm:p-2.5 rounded-full transition-all active:scale-95",
                isTransparent
                  ? "text-zinc-800 hover:text-zinc-950 hover:bg-white/80 backdrop-blur-sm"
                  : "text-zinc-700 hover:text-zinc-950 hover:bg-zinc-100"
              )}
              aria-label={`Wishlist with ${wishlistCount} items`}
              title="Saved Wishlist"
            >
              <Heart className="w-4 h-4 sm:w-4.5 sm:h-4.5" />
              {wishlistCount > 0 && (
                <span className="absolute top-1 right-1 w-4 h-4 bg-orange-600 text-white text-[10px] font-extrabold rounded-full flex items-center justify-center ring-2 ring-white animate-in zoom-in">
                  {wishlistCount}
                </span>
              )}
            </Link>

            {/* Orders Link */}
            <Link
              href="/account"
              className={cn(
                "hidden sm:inline-flex items-center gap-1.5 px-3.5 py-1.5 sm:py-2 rounded-full text-xs font-bold tracking-wide uppercase transition-all shadow-xs border",
                isTransparent
                  ? "bg-white/80 hover:bg-zinc-950 hover:text-white text-zinc-800 border-zinc-900/10 backdrop-blur-sm"
                  : "bg-zinc-100/90 hover:bg-zinc-950 hover:text-white text-zinc-800 border-zinc-200/80"
              )}
              aria-label="View Orders & Tracking"
              title="My Orders & Tracking"
            >
              <Package className="w-3.5 h-3.5" />
              <span className="hidden lg:inline">Orders</span>
            </Link>

            {/* Bag Button */}
            <button
              onClick={openDrawer}
              className="relative inline-flex items-center gap-2 px-3.5 py-1.5 sm:py-2 rounded-full bg-zinc-950 text-white hover:bg-zinc-800 text-xs font-bold transition-all shadow-sm active:scale-95 border border-zinc-900"
              aria-label={`Shopping bag with ${itemCount} items`}
            >
              <ShoppingBag className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Bag</span>
              {itemCount > 0 && (
                <span className="w-4 h-4 bg-orange-600 text-white text-[10px] font-extrabold rounded-full flex items-center justify-center animate-in zoom-in">
                  {itemCount}
                </span>
              )}
            </button>

            {/* Mobile Hamburger Menu */}
            <button
              onClick={() => setIsMobileMenuOpen(true)}
              className={cn(
                "lg:hidden p-2 rounded-xl transition-colors ml-0.5",
                isTransparent
                  ? "text-zinc-800 hover:text-zinc-950 hover:bg-white/80 backdrop-blur-sm"
                  : "text-zinc-700 hover:text-zinc-950 hover:bg-zinc-100"
              )}
              aria-label="Open mobile navigation menu"
            >
              <Menu className="w-5 h-5" />
            </button>
          </div>
        </div>
      </header>

      {/* Global Search Overlay */}
      <SearchOverlay isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />

      {/* Mobile Drawer Menu */}
      <MobileMenu
        isOpen={isMobileMenuOpen}
        onClose={() => setIsMobileMenuOpen(false)}
      />
    </>
  );
}
