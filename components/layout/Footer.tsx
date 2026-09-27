import React from "react";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

export function Footer() {
  const shopLinks = [
    { label: "New Arrivals", href: "/shop?badge=new" },
    { label: "Men's Sneakers", href: "/category/men" },
    { label: "Women's Sneakers", href: "/category/women" },
    { label: "Running Collection", href: "/category/running" },
    { label: "Lifestyle Sneakers", href: "/category/lifestyle" },
    { label: "All Sneakers", href: "/shop" },
  ];

  const helpLinks = [
    { label: "Contact Us", href: "/contact" },
    { label: "Customer FAQ", href: "/faq" },
    { label: "Shipping & Returns", href: "/shipping-returns" },
    { label: "Size Guide", href: "/size-guide" },
  ];

  const companyLinks = [
    { label: "About SoleX", href: "/about" },
    { label: "Sustainability", href: "/about#sustainability" },
    { label: "Privacy Policy", href: "/privacy-policy" },
    { label: "Terms of Service", href: "/terms" },
  ];

  const orderLinks = [
    { label: "My Orders", href: "/account" },
    { label: "Saved Wishlist", href: "/wishlist" },
  ];

  return (
    <footer className="bg-zinc-950 text-zinc-300 border-t border-zinc-900 pt-16 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8 lg:gap-12 pb-12 border-b border-zinc-800/80">
          {/* Brand Column */}
          <div className="col-span-2 space-y-4">
            <Link href="/" className="inline-block">
              <span className="text-2xl font-black tracking-tighter text-white">
                SOLE<span className="text-orange-500">X</span>
              </span>
            </Link>
            <p className="text-xs text-zinc-400 max-w-sm leading-relaxed">
              Performance-driven footwear engineered for human movement, anatomical comfort, and modern minimalist style.
            </p>
            <div className="pt-2 flex items-center gap-3">
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noreferrer"
                className="text-xs font-semibold uppercase tracking-wider text-zinc-400 hover:text-white transition-colors flex items-center gap-0.5"
              >
                Instagram <ArrowUpRight className="w-3 h-3" />
              </a>
              <span className="text-zinc-700">·</span>
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noreferrer"
                className="text-xs font-semibold uppercase tracking-wider text-zinc-400 hover:text-white transition-colors flex items-center gap-0.5"
              >
                Facebook <ArrowUpRight className="w-3 h-3" />
              </a>
              <span className="text-zinc-700">·</span>
              <a
                href="https://tiktok.com"
                target="_blank"
                rel="noreferrer"
                className="text-xs font-semibold uppercase tracking-wider text-zinc-400 hover:text-white transition-colors flex items-center gap-0.5"
              >
                TikTok <ArrowUpRight className="w-3 h-3" />
              </a>
            </div>
          </div>

          {/* Shop */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-widest text-white">Shop</h4>
            <ul className="space-y-2 text-xs">
              {shopLinks.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-zinc-400 hover:text-white transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Help */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-widest text-white">Help</h4>
            <ul className="space-y-2 text-xs">
              {helpLinks.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-zinc-400 hover:text-white transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company & Account */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-widest text-white">Company</h4>
            <ul className="space-y-2 text-xs">
              {companyLinks.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-zinc-400 hover:text-white transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
            <h4 className="text-xs font-bold uppercase tracking-widest text-white pt-3">Orders</h4>
            <ul className="space-y-2 text-xs">
              {orderLinks.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-zinc-400 hover:text-white transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-zinc-500 gap-4">
          <p>© 2026 SoleX Inc. All rights reserved. High-Performance Footwear.</p>
          <div className="flex items-center gap-6 text-[11px]">
            <Link href="/privacy-policy" className="hover:text-zinc-300">
              Privacy Policy
            </Link>
            <Link href="/terms" className="hover:text-zinc-300">
              Terms of Use
            </Link>
            <Link href="/shipping-returns" className="hover:text-zinc-300">
              Delivery Terms
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
