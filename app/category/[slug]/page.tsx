import React from "react";
import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { ArrowLeft } from "lucide-react";
import { CATEGORIES } from "@/data/categories";
import { getProductsByCategory } from "@/lib/products";
import { ProductGrid } from "@/components/products/ProductGrid";
import { Metadata } from "next";

interface CategoryPageProps {
  params: {
    slug: string;
  };
}

export function generateStaticParams() {
  return CATEGORIES.map((c) => ({
    slug: c.slug,
  }));
}

export function generateMetadata({ params }: CategoryPageProps): Metadata {
  const category = CATEGORIES.find((c) => c.slug === params.slug.toLowerCase());
  if (!category) return { title: "Category Not Found — SoleX" };

  return {
    title: `${category.name} Sneakers Collection — SoleX`,
    description: category.description,
  };
}

export default function CategoryPage({ params }: CategoryPageProps) {
  const category = CATEGORIES.find((c) => c.slug === params.slug.toLowerCase());

  if (!category) {
    notFound();
  }

  // Find products matching category name (e.g. "Men", "Women", "Running", "Lifestyle", "Kids")
  const products = getProductsByCategory(category.name);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 w-full">
      {/* Breadcrumb Navigation */}
      <div className="mb-6">
        <Link
          href="/shop"
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-zinc-500 hover:text-zinc-950 transition-colors"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back to All Categories</span>
        </Link>
      </div>

      {/* Category Hero Editorial Banner */}
      <div className="relative rounded-3xl overflow-hidden bg-zinc-950 text-white min-h-[260px] sm:min-h-[320px] flex items-center p-8 sm:p-12 mb-12 shadow-elevated border border-zinc-800">
        <Image
          src={category.image}
          alt={category.name}
          fill
          priority
          className="object-cover opacity-60"
        />
        <div className="relative z-10 max-w-xl space-y-3">
          <span className="text-xs font-bold uppercase tracking-widest text-orange-400">
            {category.tagline}
          </span>
          <h1 className="text-4xl sm:text-5xl font-black tracking-tight">
            {category.name}&apos;s Footwear
          </h1>
          <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed max-w-lg">
            {category.description}
          </p>
          <div className="pt-1">
            <span className="inline-block text-xs font-semibold bg-white/10 backdrop-blur-md px-3 py-1 rounded-full border border-white/10">
              {products.length} models engineered for this division
            </span>
          </div>
        </div>
      </div>

      {/* Product Grid */}
      <div className="space-y-6">
        <div className="flex items-center justify-between pb-4 border-b border-zinc-200">
          <h2 className="text-lg font-bold text-zinc-950">
            All {category.name} Models
          </h2>
          <span className="text-xs text-zinc-500 font-medium">
            Showing {products.length} results
          </span>
        </div>

        <ProductGrid products={products} columns={4} />
      </div>
    </div>
  );
}
