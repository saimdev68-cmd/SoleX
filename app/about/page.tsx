import React from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Compass, ShieldCheck, Sparkles, Leaf } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "About Us — The SoleX Philosophy",
  description: "Learn about SoleX origin, engineering philosophy, and human movement innovations.",
};

export default function AboutPage() {
  return (
    <div className="w-full">
      {/* Editorial Hero */}
      <section className="bg-zinc-950 text-white py-24 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
        <div className="max-w-4xl mx-auto text-center space-y-6 relative z-10">
          <span className="text-xs font-bold uppercase tracking-widest text-orange-500">
            About SoleX
          </span>
          <h1 className="text-4xl sm:text-6xl font-black tracking-tight leading-[1.05]">
            Engineering Footwear for the Fluidity of Human Movement.
          </h1>
          <p className="text-sm sm:text-base text-zinc-400 max-w-2xl mx-auto leading-relaxed">
            Born at the intersection of biomechanical ergonomics and modern minimalist design, SoleX crafts footwear that adapts to every stride, leap, and street.
          </p>
        </div>
      </section>

      {/* Origin Story & Vision */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div className="space-y-5">
            <span className="text-xs font-bold uppercase tracking-widest text-orange-600">
              The Origin
            </span>
            <h2 className="text-3xl font-black text-zinc-950 tracking-tight">
              Reinventing the Daily Stride
            </h2>
            <p className="text-sm text-zinc-600 leading-relaxed">
              Traditional footwear often forces a compromise: rigid technical performance designed only for the track, or stylish casual silhouettes devoid of supportive cushioning.
            </p>
            <p className="text-sm text-zinc-600 leading-relaxed">
              SoleX was founded with a singular directive: create footwear where structural beauty and hyper-responsive kinetics exist in perfect equilibrium.
            </p>
          </div>

          <div className="relative aspect-square rounded-2xl bg-zinc-100 overflow-hidden border border-zinc-200 p-6 flex items-center justify-center">
            <Image
              src="/products/solex-air-one-1.jpg"
              alt="SoleX Prototype Architecture"
              fill
              className="object-contain p-6"
            />
          </div>
        </div>
      </section>

      {/* Pillars of Engineering */}
      <section className="bg-white py-20 border-y border-zinc-200/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-xl mx-auto mb-16 space-y-2">
            <span className="text-xs font-bold uppercase tracking-widest text-orange-600">
              Core Principles
            </span>
            <h2 className="text-3xl font-black text-zinc-950 tracking-tight">
              Precision Architecture
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="p-8 rounded-2xl bg-zinc-50 border border-zinc-200/80 space-y-4">
              <div className="w-12 h-12 rounded-xl bg-orange-50 text-orange-600 flex items-center justify-center">
                <Sparkles className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-zinc-950">Micro-Pressurized Cushioning</h3>
              <p className="text-xs sm:text-sm text-zinc-600 leading-relaxed">
                Our proprietary dynamic air chambers absorb vertical ground reaction forces and immediately return forward propulsion with every foot strike.
              </p>
            </div>

            <div className="p-8 rounded-2xl bg-zinc-50 border border-zinc-200/80 space-y-4">
              <div className="w-12 h-12 rounded-xl bg-orange-50 text-orange-600 flex items-center justify-center">
                <Compass className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-zinc-950">Natural Foot Morphology</h3>
              <p className="text-xs sm:text-sm text-zinc-600 leading-relaxed">
                Sculpted wide toe boxes allow toes to splay organically, eliminating pinching and blister-causing friction points over high-mileage days.
              </p>
            </div>

            <div className="p-8 rounded-2xl bg-zinc-50 border border-zinc-200/80 space-y-4">
              <div className="w-12 h-12 rounded-xl bg-orange-50 text-orange-600 flex items-center justify-center">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-zinc-950">Laboratory Tested Longevity</h3>
              <p className="text-xs sm:text-sm text-zinc-600 leading-relaxed">
                Each sole compound and upper knit undergoes 500,000 cyclic compression tests to ensure enduring resiliency under real-world conditions.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Sustainability Section */}
      <section id="sustainability" className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="bg-zinc-950 text-white rounded-3xl p-8 sm:p-14 border border-zinc-800 space-y-6">
          <div className="inline-flex items-center gap-2 text-emerald-400 text-xs font-bold uppercase tracking-widest">
            <Leaf className="w-4 h-4" />
            <span>Sustainable Footprint</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-black tracking-tight">
            Designed for Tomorrow. Built with Respect.
          </h2>
          <p className="text-sm text-zinc-300 leading-relaxed max-w-2xl">
            We are committed to reducing our carbon load across every phase of production. By 2026, 85% of all SoleX knit uppers are spun from post-consumer recycled ocean plastics, and our midsole foams integrate renewable bio-based polymers.
          </p>
          <div className="pt-2">
            <Link href="/shop">
              <Button variant="primary" size="lg" className="rounded-full bg-white text-zinc-950 hover:bg-zinc-100">
                <span>Explore the Collection</span>
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
