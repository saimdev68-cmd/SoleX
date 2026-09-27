"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { Star, ShieldCheck, Truck, RotateCcw, Check } from "lucide-react";
import { Product, ProductColor } from "@/data/products";
import { ColorSelector } from "@/components/products/ColorSelector";
import { SizeSelector } from "@/components/products/SizeSelector";
import { QuantitySelector } from "@/components/products/QuantitySelector";
import { WishlistButton } from "@/components/wishlist/WishlistButton";
import { Button } from "@/components/ui/Button";
import { useCart } from "@/context/CartContext";
import { useToast } from "@/context/ToastContext";
import { formatPrice } from "@/lib/utils";

interface ProductInfoProps {
  product: Product;
  selectedColor?: ProductColor;
  onSelectColor?: (color: ProductColor) => void;
}

export function ProductInfo({ product, selectedColor: propSelectedColor, onSelectColor }: ProductInfoProps) {
  const router = useRouter();
  const { addItem, openDrawer } = useCart();
  const { showToast } = useToast();

  const [internalColor, setInternalColor] = useState<ProductColor>(product.colors[0]);
  const activeColor = propSelectedColor || internalColor;

  const handleColorChange = (color: ProductColor) => {
    if (onSelectColor) {
      onSelectColor(color);
    } else {
      setInternalColor(color);
    }
  };

  const [selectedSize, setSelectedSize] = useState<number | null>(null);
  const [quantity, setQuantity] = useState(1);
  const [sizeError, setSizeError] = useState(false);

  const handleSelectSize = (size: number) => {
    setSelectedSize(size);
    setSizeError(false);
  };

  const handleAddToCart = () => {
    if (!selectedSize) {
      setSizeError(true);
      showToast("Please choose a shoe size before adding to bag", "error");
      return;
    }

    addItem(product, activeColor.name, selectedSize, quantity);
    showToast(`Added ${product.name} — ${activeColor.name} (US ${selectedSize}) to bag`, "success");
    openDrawer();
  };

  const handleBuyNow = () => {
    if (!selectedSize) {
      setSizeError(true);
      showToast("Please select a shoe size to proceed", "error");
      return;
    }

    addItem(product, activeColor.name, selectedSize, quantity);
    router.push("/checkout");
  };

  const discountPercent = product.oldPrice
    ? Math.round(((product.oldPrice - product.price) / product.oldPrice) * 100)
    : null;

  return (
    <div className="space-y-6">
      {/* Category & Badge */}
      <div>
        <div className="flex items-center gap-2 mb-2">
          <span className="text-xs font-bold uppercase tracking-widest text-orange-600">
            {product.category} Footwear
          </span>
          {product.badge && (
            <span
              className={`text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider text-white ${
                product.badge === "NEW"
                  ? "bg-zinc-950"
                  : product.badge === "SALE"
                  ? "bg-red-600"
                  : product.badge === "LIMITED"
                  ? "bg-amber-600"
                  : "bg-orange-600"
              }`}
            >
              {product.badge}
            </span>
          )}
        </div>

        {/* Product Title */}
        <h1 className="text-2xl sm:text-3xl font-extrabold text-zinc-950 tracking-tight">
          {product.name}
        </h1>

        {/* Rating and Reviews */}
        <div className="flex items-center gap-2 mt-2 text-xs">
          <div className="flex items-center text-amber-500">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className={`w-4 h-4 ${
                  i < Math.floor(product.rating)
                    ? "fill-amber-400 text-amber-400"
                    : "text-zinc-200"
                }`}
              />
            ))}
          </div>
          <span className="font-bold text-zinc-900">{product.rating}</span>
          <span className="text-zinc-400">·</span>
          <span className="text-zinc-500 underline underline-offset-2">
            {product.reviews} verified reviews
          </span>
        </div>
      </div>

      {/* Price Block */}
      <div className="flex items-baseline gap-3 pb-2 border-b border-zinc-100">
        <span className="text-3xl font-extrabold text-zinc-950">
          {formatPrice(product.price)}
        </span>
        {product.oldPrice && (
          <>
            <span className="text-lg text-zinc-400 line-through">
              {formatPrice(product.oldPrice)}
            </span>
            <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
              Save {discountPercent}%
            </span>
          </>
        )}
      </div>

      {/* Description */}
      <p className="text-sm text-zinc-600 leading-relaxed font-normal">
        {product.description}
      </p>

      {/* Color Selector */}
      <ColorSelector
        colors={product.colors}
        selectedColor={activeColor}
        onSelectColor={handleColorChange}
      />

      {/* Size Selector */}
      <div className="space-y-1">
        <SizeSelector
          sizes={product.sizes}
          selectedSize={selectedSize}
          onSelectSize={handleSelectSize}
          gender={product.gender}
        />
        {sizeError && (
          <p className="text-xs font-semibold text-red-600 mt-1 animate-in fade-in">
            * Please choose an available US size to continue.
          </p>
        )}
      </div>

      {/* Quantity Selector */}
      <QuantitySelector
        quantity={quantity}
        max={product.stock}
        onChange={setQuantity}
      />

      {/* CTA Buttons */}
      <div className="space-y-3 pt-2">
        <div className="flex items-center gap-3">
          <Button
            type="button"
            onClick={handleAddToCart}
            variant="primary"
            size="lg"
            className="flex-1 rounded-xl text-sm uppercase tracking-wider font-bold shadow-md hover:shadow-lg"
          >
            Add to Bag
          </Button>

          <WishlistButton product={product} size="lg" className="rounded-xl border-zinc-300 shadow-sm" />
        </div>

        <Button
          type="button"
          onClick={handleBuyNow}
          variant="secondary"
          size="lg"
          className="w-full rounded-xl text-sm uppercase tracking-wider font-bold bg-zinc-100 hover:bg-zinc-200 text-zinc-950 border border-zinc-200/80"
        >
          Buy Now (Instant Checkout)
        </Button>
      </div>

      {/* E-Commerce Guarantee Badges */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-4 border-t border-zinc-100 text-xs text-zinc-600">
        <div className="flex items-center gap-2">
          <Truck className="w-4 h-4 text-orange-600 shrink-0" />
          <span>Free Express Delivery over $100</span>
        </div>
        <div className="flex items-center gap-2">
          <RotateCcw className="w-4 h-4 text-orange-600 shrink-0" />
          <span>30-Day Hassle-Free Returns</span>
        </div>
        <div className="flex items-center gap-2">
          <ShieldCheck className="w-4 h-4 text-orange-600 shrink-0" />
          <span>Cash on Delivery Available</span>
        </div>
      </div>

      {/* Key Engineered Features */}
      <div className="pt-4 border-t border-zinc-100 space-y-3">
        <h4 className="text-xs font-bold uppercase tracking-wider text-zinc-900">
          Engineered Architecture
        </h4>
        <ul className="space-y-2 text-xs text-zinc-600">
          {product.features.map((feature) => (
            <li key={feature} className="flex items-start gap-2">
              <Check className="w-4 h-4 text-orange-600 shrink-0 mt-0.5" />
              <span>{feature}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Technical Specs */}
      {product.details && (
        <div className="pt-4 border-t border-zinc-100 space-y-3">
          <h4 className="text-xs font-bold uppercase tracking-wider text-zinc-900">
            Technical Specifications
          </h4>
          <div className="grid grid-cols-2 gap-2 text-xs">
            {product.details.weight && (
              <div className="p-2.5 rounded-lg bg-zinc-50 border border-zinc-100">
                <span className="text-zinc-400 block text-[10px] uppercase font-bold">Weight</span>
                <span className="font-semibold text-zinc-800">{product.details.weight}</span>
              </div>
            )}
            {product.details.drop && (
              <div className="p-2.5 rounded-lg bg-zinc-50 border border-zinc-100">
                <span className="text-zinc-400 block text-[10px] uppercase font-bold">Heel Drop</span>
                <span className="font-semibold text-zinc-800">{product.details.drop}</span>
              </div>
            )}
            {product.details.cushioning && (
              <div className="p-2.5 rounded-lg bg-zinc-50 border border-zinc-100">
                <span className="text-zinc-400 block text-[10px] uppercase font-bold">Cushioning</span>
                <span className="font-semibold text-zinc-800">{product.details.cushioning}</span>
              </div>
            )}
            {product.details.closure && (
              <div className="p-2.5 rounded-lg bg-zinc-50 border border-zinc-100">
                <span className="text-zinc-400 block text-[10px] uppercase font-bold">Lacing</span>
                <span className="font-semibold text-zinc-800">{product.details.closure}</span>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
