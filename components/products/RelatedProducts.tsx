import React from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Product } from "@/data/products";
import { ProductCard } from "@/components/products/ProductCard";

interface RelatedProductsProps {
  products: Product[];
  category: string;
}

export function RelatedProducts({ products, category }: RelatedProductsProps) {
  if (products.length === 0) return null;

  return (
    <section className="py-12 border-t border-zinc-200/80">
      <div className="flex items-center justify-between mb-8">
        <div>
          <span className="text-xs font-bold uppercase tracking-widest text-orange-600">
            Similar Silhouettes
          </span>
          <h2 className="text-2xl font-black text-zinc-950 tracking-tight mt-1">
            You Might Also Like
          </h2>
        </div>
        <Link
          href={`/category/${category.toLowerCase()}`}
          className="text-xs font-semibold text-zinc-700 hover:text-orange-600 flex items-center gap-1 transition-colors"
        >
          <span>View All {category}</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </Link>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        {products.map((p) => (
          <ProductCard key={p.id} product={p} />
        ))}
      </div>
    </section>
  );
}
