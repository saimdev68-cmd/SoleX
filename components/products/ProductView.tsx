"use client";

import React, { useState } from "react";
import { Product, ProductColor } from "@/data/products";
import { ProductGallery } from "@/components/products/ProductGallery";
import { ProductInfo } from "@/components/products/ProductInfo";

interface ProductViewProps {
  product: Product;
}

export function ProductView({ product }: ProductViewProps) {
  const [selectedColor, setSelectedColor] = useState<ProductColor>(product.colors[0]);

  // Dynamically reflect the 4 images of the chosen color variant
  const activeImages =
    selectedColor?.images && selectedColor.images.length > 0
      ? selectedColor.images
      : product.images;

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 items-start pb-16">
      {/* Left Column: Variant-aware gallery showing the 4 images of that color */}
      <div className="lg:col-span-7 lg:sticky lg:top-24">
        <ProductGallery
          images={activeImages}
          productName={product.name}
          activeColorName={selectedColor.name}
        />
      </div>

      {/* Right Column: Information, Color Switcher & Actions */}
      <div className="lg:col-span-5 bg-white p-6 sm:p-8 rounded-2xl border border-zinc-200/80 shadow-subtle">
        <ProductInfo
          product={product}
          selectedColor={selectedColor}
          onSelectColor={setSelectedColor}
        />
      </div>
    </div>
  );
}
