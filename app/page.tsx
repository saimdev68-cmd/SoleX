"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import {
  ArrowRight,
  Sparkles,
  ShieldCheck,
  Feather,
  RotateCcw,
  Lock,
} from "lucide-react";
import { Hero } from "@/components/hero/Hero";
import { ProductGrid } from "@/components/products/ProductGrid";
import { Button } from "@/components/ui/Button";
import { CATEGORIES } from "@/data/categories";
import {
  getFeaturedProducts,
  getNewArrivals,
  getProductsByCategory,
} from "@/lib/products";

export default function HomePage() {
  const featuredSneakers = getFeaturedProducts(4);
  const newArrivals = getNewArrivals(4);
  const allMenSneakers = getProductsByCategory("Men");
  const allWomenSneakers = getProductsByCategory("Women");
  const allRunningSneakers = getProductsByCategory("Running");

  const menSneakers = allMenSneakers.slice(0, 3);
  const womenSneakers = allWomenSneakers.slice(0, 3);
  const runningSneakers = allRunningSneakers.slice(0, 3);

  return (
    <div className="flex flex-col w-full">
      {/* 1. SIGNATURE 240-FRAME SCROLL HERO */}
      <Hero />

      {/* Brand High-Performance Ticker */}
      <div className="bg-zinc-950 text-white py-3 overflow-hidden border-y border-zinc-800 select-none">
        <div className="flex whitespace-nowrap gap-10 text-[11px] font-bold uppercase tracking-[0.25em] text-zinc-400">
          <span>KINETIC AIR CUSHIONING</span>
          <span className="text-orange-500">✦</span>
          <span>COMPLIMENTARY SHIPPING OVER $100</span>
          <span className="text-orange-500">✦</span>
          <span>CASH ON DELIVERY ACCEPTED</span>
          <span className="text-orange-500">✦</span>
          <span>30-DAY WEAR TRIAL</span>
          <span className="text-orange-500">✦</span>
          <span>LABORATORY TESTED COMPOUNDS</span>
          <span className="text-orange-500">✦</span>
          <span>RECYCLED SUPERCRITICAL FOAM</span>
          <span className="text-orange-500">✦</span>
          <span>KINETIC AIR CUSHIONING</span>
          <span className="text-orange-500">✦</span>
          <span>COMPLIMENTARY SHIPPING OVER $100</span>
        </div>
      </div>

      {/* 2. SHOP BY CATEGORY SECTION */}
      <section
        id="categories-section"
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 w-full"
      >
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-10 gap-4">
          <div>
            <span className="text-xs font-bold uppercase tracking-widest text-orange-600">
              Curated Divisions
            </span>
            <h2 className="text-3xl sm:text-4xl font-black text-zinc-950 tracking-tight mt-1">
              Shop by Category
            </h2>
          </div>
          <Link
            href="/shop"
            className="text-xs font-bold uppercase tracking-wider text-zinc-900 hover:text-orange-600 flex items-center gap-1.5 transition-colors group"
          >
            <span>Explore All Footwear</span>
            <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-5 gap-3 sm:gap-5">
          {CATEGORIES.map((cat) => (
            <Link
              key={cat.id}
              href={`/category/${cat.slug}`}
              className="group relative aspect-[3/4] rounded-2xl overflow-hidden bg-zinc-900 border border-zinc-200/80 shadow-sm flex flex-col justify-end p-4 sm:p-5 transition-transform duration-300 hover:-translate-y-1 hover:shadow-card"
            >
              <Image
                src={cat.image}
                alt={cat.name}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
                sizes="(max-width: 640px) 50vw, 20vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent group-hover:via-black/40 transition-colors" />

              <div className="relative z-10 space-y-1 text-white">
                <span className="text-[10px] font-bold uppercase tracking-wider text-orange-400">
                  {cat.itemCount} Models
                </span>
                <h3 className="text-lg sm:text-xl font-black tracking-tight flex items-center justify-between">
                  <span>{cat.name}</span>
                  <ArrowRight className="w-4 h-4 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
                </h3>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* 3. FEATURED SNEAKERS */}
      <section className="bg-white py-20 border-y border-zinc-200/80 w-full">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-10 gap-4">
            <div>
              <span className="text-xs font-bold uppercase tracking-widest text-orange-600">
                Pinnacle Performance
              </span>
              <h2 className="text-3xl sm:text-4xl font-black text-zinc-950 tracking-tight mt-1">
                Featured Sneakers
              </h2>
            </div>
            <Link
              href="/shop?badge=bestseller"
              className="text-xs font-bold uppercase tracking-wider text-zinc-900 hover:text-orange-600 flex items-center gap-1.5 transition-colors group"
            >
              <span>View Bestsellers</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

          <ProductGrid products={featuredSneakers} columns={4} />
        </div>
      </section>

      {/* 4. NEW ARRIVALS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 w-full">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-10 gap-4">
          <div className="flex items-center gap-3">
            <div>
              <span className="text-xs font-bold uppercase tracking-widest text-zinc-400 flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-orange-500" />
                Just Dropped
              </span>
              <h2 className="text-3xl sm:text-4xl font-black text-zinc-950 tracking-tight mt-1">
                New Arrivals
              </h2>
            </div>
          </div>
          <Link
            href="/shop?badge=new"
            className="text-xs font-bold uppercase tracking-wider text-zinc-900 hover:text-orange-600 flex items-center gap-1.5 transition-colors group"
          >
            <span>See All New Releases</span>
            <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        <ProductGrid products={newArrivals} columns={4} />
      </section>

      {/* 5. PROMOTIONAL EDITORIAL BANNER */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20 w-full">
        <div className="relative rounded-3xl overflow-hidden bg-zinc-950 text-white min-h-[460px] sm:min-h-[520px] flex items-center p-8 sm:p-14 lg:p-16 shadow-elevated border border-zinc-800">
          <Image
            src="/brand/promo-editorial.jpg"
            alt="SoleX Built To Move"
            fill
            className="object-cover opacity-50"
            sizes="(max-width: 1280px) 100vw, 1280px"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/60 to-transparent" />
          <div className="relative z-10 max-w-xl space-y-6">
            <span className="inline-block text-xs font-bold uppercase tracking-widest text-orange-400 bg-orange-950/70 px-3.5 py-1.5 rounded-full border border-orange-700/50">
              INNOVATION LAB // 2026
            </span>
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight leading-[0.95]">
              BUILT TO MOVE.
            </h2>
            <p className="text-sm sm:text-base text-zinc-300 leading-relaxed font-normal">
              Performance technology meets everyday design. Micro-pressurized air pods and dual-density supercritical foam keep you in effortless momentum across any terrain.
            </p>
            <div className="pt-2">
              <Link href="/shop">
                <Button
                  variant="primary"
                  size="lg"
                  className="rounded-full bg-white text-zinc-950 hover:bg-zinc-100 font-bold group shadow-lg"
                >
                  <span>Explore Collection</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 6. MEN'S COLLECTION SPOTLIGHT */}
      <section className="bg-white py-20 border-t border-zinc-200/80 w-full">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
            <div>
              <span className="text-xs font-bold uppercase tracking-widest text-orange-600">
                Architectural Utility
              </span>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-zinc-950 tracking-tight mt-1">
                Men&apos;s Collection
              </h2>
            </div>
            <Link href="/category/men">
              <Button variant="outline" size="sm" className="rounded-full">
                <span>Shop Men</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Button>
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 items-stretch">
            {/* Category Lead Banner */}
            <div className="relative rounded-2xl overflow-hidden bg-zinc-900 text-white p-6 sm:p-7 flex flex-col justify-between min-h-[320px] sm:min-h-[380px]">
              <Image
                src="/categories/men.jpg"
                alt="Men Collection"
                fill
                className="object-cover opacity-60"
                sizes="(max-width: 768px) 100vw, 25vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent" />
              <div className="relative z-10 space-y-1">
                <span className="text-[10px] font-bold uppercase tracking-widest text-orange-400">
                  Featured Series
                </span>
                <h3 className="text-xl sm:text-2xl font-black leading-tight mt-1.5">
                  Precision Street & Training
                </h3>
              </div>
              <div className="relative z-10 pt-4">
                <Link href="/category/men">
                  <span className="text-xs font-bold underline underline-offset-4 flex items-center gap-1.5 hover:text-orange-400 transition-colors">
                    Explore {allMenSneakers.length} Models <ArrowRight className="w-3.5 h-3.5" />
                  </span>
                </Link>
              </div>
            </div>

            {/* 3 Products */}
            <div className="md:col-span-3">
              <ProductGrid products={menSneakers} columns={3} />
            </div>
          </div>
        </div>
      </section>

      {/* 7. WOMEN'S COLLECTION SPOTLIGHT */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 w-full">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
          <div>
            <span className="text-xs font-bold uppercase tracking-widest text-orange-600">
              Sculpted Elegance
            </span>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-zinc-950 tracking-tight mt-1">
              Women&apos;s Collection
            </h2>
          </div>
          <Link href="/category/women">
            <Button variant="outline" size="sm" className="rounded-full">
              <span>Shop Women</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Button>
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 items-stretch">
          <div className="relative rounded-2xl overflow-hidden bg-zinc-800 text-white p-6 sm:p-7 flex flex-col justify-between min-h-[320px] sm:min-h-[380px]">
            <Image
              src="/categories/women.jpg"
              alt="Women Collection"
              fill
              className="object-cover opacity-60"
              sizes="(max-width: 768px) 100vw, 25vw"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent" />
            <div className="relative z-10 space-y-1">
              <span className="text-[10px] font-bold uppercase tracking-widest text-orange-400">
                Studio & Road
              </span>
              <h3 className="text-xl sm:text-2xl font-black leading-tight mt-1.5">
                Adaptive Arch Architecture
              </h3>
            </div>
            <div className="relative z-10 pt-4">
              <Link href="/category/women">
                <span className="text-xs font-bold underline underline-offset-4 flex items-center gap-1.5 hover:text-orange-400 transition-colors">
                  Explore {allWomenSneakers.length} Models <ArrowRight className="w-3.5 h-3.5" />
                </span>
              </Link>
            </div>
          </div>

          <div className="md:col-span-3">
            <ProductGrid products={womenSneakers} columns={3} />
          </div>
        </div>
      </section>

      {/* 8. RUNNING COLLECTION SPOTLIGHT */}
      <section className="bg-white py-20 border-t border-zinc-200/80 w-full">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
            <div>
              <span className="text-xs font-bold uppercase tracking-widest text-orange-600">
                Speed Lab Division
              </span>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-zinc-950 tracking-tight mt-1">
                Running Collection
              </h2>
            </div>
            <Link href="/category/running">
              <Button variant="outline" size="sm" className="rounded-full">
                <span>Shop Running</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Button>
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 items-stretch">
            <div className="relative rounded-2xl overflow-hidden bg-zinc-950 text-white p-6 sm:p-7 flex flex-col justify-between min-h-[320px] sm:min-h-[380px]">
              <Image
                src="/categories/running.jpg"
                alt="Running Collection"
                fill
                className="object-cover opacity-60"
                sizes="(max-width: 768px) 100vw, 25vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent" />
              <div className="relative z-10 space-y-1">
                <span className="text-[10px] font-bold uppercase tracking-widest text-orange-400">
                  Marathon Proven
                </span>
                <h3 className="text-xl sm:text-2xl font-black leading-tight mt-1.5">
                  Supercritical Carbon Wings
                </h3>
              </div>
              <div className="relative z-10 pt-4">
                <Link href="/category/running">
                  <span className="text-xs font-bold underline underline-offset-4 flex items-center gap-1.5 hover:text-orange-400 transition-colors">
                    Explore {allRunningSneakers.length} Models <ArrowRight className="w-3.5 h-3.5" />
                  </span>
                </Link>
              </div>
            </div>

            <div className="md:col-span-3">
              <ProductGrid products={runningSneakers} columns={3} />
            </div>
          </div>
        </div>
      </section>

      {/* 9. WHY SOLEX VALUE PILLARS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 w-full">
        <div className="text-center max-w-xl mx-auto mb-16 space-y-2">
          <span className="text-xs font-bold uppercase tracking-widest text-orange-600">
            The Standard
          </span>
          <h2 className="text-3xl sm:text-4xl font-black text-zinc-950 tracking-tight">
            Why Choose SoleX
          </h2>
          <p className="text-xs sm:text-sm text-zinc-500">
            Engineered footwear without compromise. Every pair reflects our relentless pursuit of movement perfection.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-white p-6 rounded-2xl border border-zinc-200/80 shadow-subtle space-y-3">
            <div className="w-10 h-10 rounded-xl bg-orange-50 text-orange-600 flex items-center justify-center">
              <Feather className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-zinc-950">Premium Materials</h3>
            <p className="text-xs text-zinc-500 leading-relaxed">
              Ethically sourced nubuck, recycled supercritical foam, and breathable jacquard engineered for endurance.
            </p>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-zinc-200/80 shadow-subtle space-y-3">
            <div className="w-10 h-10 rounded-xl bg-orange-50 text-orange-600 flex items-center justify-center">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-zinc-950">Built For Movement</h3>
            <p className="text-xs text-zinc-500 leading-relaxed">
              Biomechanically tuned shock absorption and natural foot splay geometries reduce fatigue across daily miles.
            </p>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-zinc-200/80 shadow-subtle space-y-3">
            <div className="w-10 h-10 rounded-xl bg-orange-50 text-orange-600 flex items-center justify-center">
              <RotateCcw className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-zinc-950">Easy 30-Day Returns</h3>
            <p className="text-xs text-zinc-500 leading-relaxed">
              Try them on at home. If the fit isn&apos;t flawless, return or exchange hassle-free with complimentary return shipping.
            </p>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-zinc-200/80 shadow-subtle space-y-3">
            <div className="w-10 h-10 rounded-xl bg-orange-50 text-orange-600 flex items-center justify-center">
              <Lock className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-zinc-950">Secure Cash on Delivery</h3>
            <p className="text-xs text-zinc-500 leading-relaxed">
              Pay upon arrival at your doorstep. Zero digital card risks, transparent express delivery.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
