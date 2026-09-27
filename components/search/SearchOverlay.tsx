"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { Search as SearchIcon, X, ArrowRight, Sparkles } from "lucide-react";
import { searchProducts } from "@/lib/products";
import { Product } from "@/data/products";
import { formatPrice } from "@/lib/utils";

interface SearchOverlayProps {
  isOpen: boolean;
  onClose: () => void;
}

export function SearchOverlay({ isOpen, onClose }: SearchOverlayProps) {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<Product[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
      setTimeout(() => inputRef.current?.focus(), 80);
    } else {
      document.body.style.overflow = "";
      setQuery("");
      setResults([]);
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        onClose();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setQuery(val);
    if (val.trim().length > 1) {
      setResults(searchProducts(val));
    } else {
      setResults([]);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div
        className="fixed inset-0 bg-black/60 backdrop-blur-sm transition-opacity animate-in fade-in duration-200"
        onClick={onClose}
        aria-hidden="true"
      />

      <div className="relative min-h-screen flex flex-col items-center pt-20 px-4 sm:px-6">
        <div className="w-full max-w-3xl bg-white rounded-2xl shadow-2xl border border-zinc-200 overflow-hidden transform animate-in zoom-in-95 duration-200">
          {/* Search input header */}
          <div className="relative flex items-center px-6 py-5 border-b border-zinc-100">
            <SearchIcon className="w-5 h-5 text-zinc-400 shrink-0" />
            <input
              ref={inputRef}
              type="text"
              value={query}
              onChange={handleSearch}
              placeholder="Search sneakers by name, category, color..."
              className="w-full pl-3 pr-10 text-base sm:text-lg text-zinc-900 placeholder:text-zinc-400 bg-transparent focus:outline-none"
            />
            {query && (
              <button
                onClick={() => {
                  setQuery("");
                  setResults([]);
                  inputRef.current?.focus();
                }}
                className="p-1 mr-2 text-zinc-400 hover:text-zinc-700 rounded-full"
                aria-label="Clear search input"
              >
                <X className="w-4 h-4" />
              </button>
            )}
            <button
              onClick={onClose}
              className="px-2.5 py-1 text-xs font-semibold text-zinc-500 hover:text-zinc-900 border border-zinc-200 rounded-md transition-colors"
            >
              ESC
            </button>
          </div>

          {/* Quick Suggestions when empty */}
          {!query.trim() && (
            <div className="p-6">
              <p className="text-xs font-semibold tracking-wider uppercase text-zinc-400 mb-3 flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-orange-500" />
                Popular Searches
              </p>
              <div className="flex flex-wrap gap-2">
                {["Air One", "Runner X", "Carbon plate", "Lifestyle", "Kids", "Onyx Black", "Sale"].map(
                  (term) => (
                    <button
                      key={term}
                      onClick={() => {
                        setQuery(term);
                        setResults(searchProducts(term));
                      }}
                      className="text-xs font-medium bg-zinc-100 hover:bg-zinc-200 text-zinc-700 px-3 py-1.5 rounded-full transition-colors"
                    >
                      {term}
                    </button>
                  )
                )}
              </div>
            </div>
          )}

          {/* Search results */}
          {query.trim().length > 0 && (
            <div className="max-h-[60vh] overflow-y-auto p-6 divide-y divide-zinc-100">
              {results.length > 0 ? (
                <>
                  <div className="flex items-center justify-between pb-3 text-xs text-zinc-500">
                    <span>
                      Found {results.length} result{results.length === 1 ? "" : "s"} for &ldquo;{query}&rdquo;
                    </span>
                    <Link
                      href={`/shop?q=${encodeURIComponent(query)}`}
                      onClick={onClose}
                      className="font-medium text-orange-600 hover:text-orange-700 flex items-center gap-1"
                    >
                      View all in Shop <ArrowRight className="w-3 h-3" />
                    </Link>
                  </div>
                  <div className="space-y-3 pt-3">
                    {results.map((product) => (
                      <Link
                        key={product.id}
                        href={`/products/${product.slug}`}
                        onClick={onClose}
                        className="flex items-center gap-4 p-2.5 rounded-xl hover:bg-zinc-50 transition-colors group"
                      >
                        <div className="relative w-16 h-14 bg-zinc-100 rounded-lg overflow-hidden shrink-0 border border-zinc-200/60">
                          <Image
                            src={product.images[0] || "/products/solex-air-one-1.jpg"}
                            alt={product.name}
                            fill
                            className="object-contain p-1 group-hover:scale-105 transition-transform"
                            sizes="64px"
                          />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2">
                            <h4 className="text-sm font-semibold text-zinc-900 group-hover:text-orange-600 transition-colors truncate">
                              {product.name}
                            </h4>
                            {product.badge && (
                              <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-zinc-900 text-white uppercase tracking-wider">
                                {product.badge}
                              </span>
                            )}
                          </div>
                          <p className="text-xs text-zinc-500 capitalize">
                            {product.category} · {product.gender} · {product.colors.length} colorways
                          </p>
                        </div>
                        <div className="text-right shrink-0">
                          <span className="text-sm font-bold text-zinc-900">
                            {formatPrice(product.price)}
                          </span>
                          {product.oldPrice && (
                            <span className="block text-xs text-zinc-400 line-through">
                              {formatPrice(product.oldPrice)}
                            </span>
                          )}
                        </div>
                      </Link>
                    ))}
                  </div>
                </>
              ) : (
                <div className="py-12 text-center space-y-3">
                  <div className="w-12 h-12 rounded-full bg-zinc-100 flex items-center justify-center mx-auto text-zinc-400">
                    <SearchIcon className="w-6 h-6" />
                  </div>
                  <h4 className="text-base font-semibold text-zinc-900">No matching sneakers found</h4>
                  <p className="text-sm text-zinc-500 max-w-sm mx-auto">
                    We couldn&apos;t find any sneakers matching &ldquo;{query}&rdquo;. Try checking spelling or using a broader term like &ldquo;Running&rdquo; or &ldquo;Men&rdquo;.
                  </p>
                  <div className="pt-2">
                    <Link
                      href="/shop"
                      onClick={onClose}
                      className="inline-flex items-center gap-1.5 text-xs font-semibold text-zinc-900 hover:underline"
                    >
                      Browse full catalog <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
