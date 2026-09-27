import React from "react";
import { notFound } from "next/navigation";
import Link from "next/link";
import { Metadata } from "next";
import { ArrowLeft } from "lucide-react";
import { getAllProducts, getProductBySlug, getRelatedProducts } from "@/lib/products";
import { ProductView } from "@/components/products/ProductView";
import { RelatedProducts } from "@/components/products/RelatedProducts";

interface ProductPageProps {
  params: {
    slug: string;
  };
}

export function generateStaticParams() {
  const products = getAllProducts();
  return products.map((p) => ({
    slug: p.slug,
  }));
}

export function generateMetadata({ params }: ProductPageProps): Metadata {
  const product = getProductBySlug(params.slug);
  if (!product) return { title: "Product Not Found — SoleX" };

  return {
    title: `${product.name} — SoleX Official Footwear`,
    description: product.description,
    openGraph: {
      title: `${product.name} — SoleX Footwear`,
      description: product.description,
      images: [
        {
          url: product.images[0] || "/products/solex-air-one-1.jpg",
          alt: product.name,
        },
      ],
    },
  };
}

export default function ProductDetailPage({ params }: ProductPageProps) {
  const product = getProductBySlug(params.slug);

  if (!product) {
    notFound();
  }

  const relatedProducts = getRelatedProducts(product.id, product.category, 4);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full">
      {/* Breadcrumb Navigation */}
      <nav aria-label="Breadcrumb" className="mb-6 flex items-center gap-2 text-xs text-zinc-500 font-medium">
        <Link href="/" className="hover:text-zinc-950 transition-colors">
          Home
        </Link>
        <span>/</span>
        <Link href="/shop" className="hover:text-zinc-950 transition-colors">
          Shop
        </Link>
        <span>/</span>
        <Link
          href={`/category/${product.category.toLowerCase()}`}
          className="hover:text-zinc-950 transition-colors capitalize"
        >
          {product.category}
        </Link>
        <span>/</span>
        <span className="text-zinc-900 font-semibold truncate max-w-[200px]">
          {product.name}
        </span>
      </nav>

      {/* Main Interactive Product Layout */}
      <ProductView product={product} />

      {/* Related Products Section */}
      <RelatedProducts products={relatedProducts} category={product.category} />
    </div>
  );
}
