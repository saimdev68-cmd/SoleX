import React from "react";
import { Product } from "@/data/products";
import { ProductCard } from "@/components/products/ProductCard";
import { cn } from "@/lib/utils";

interface ProductGridProps {
  products: Product[];
  className?: string;
  columns?: 2 | 3 | 4;
}

export function ProductGrid({ products, className, columns = 4 }: ProductGridProps) {
  const columnClasses = {
    2: "grid-cols-1 sm:grid-cols-2",
    3: "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3",
    4: "grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4",
  };

  if (products.length === 0) {
    return (
      <div className="py-16 text-center">
        <h3 className="text-base font-bold text-zinc-900">No sneakers found</h3>
        <p className="text-xs text-zinc-500 mt-1">Try resetting your active filters or search terms.</p>
      </div>
    );
  }

  return (
    <div className={cn("grid gap-4 sm:gap-6", columnClasses[columns], className)}>
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
}
