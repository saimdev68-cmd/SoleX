"use client";

import React, { useState, useMemo, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { SlidersHorizontal, Search as SearchIcon, X } from "lucide-react";
import { filterAndSortProducts, FilterOptions } from "@/lib/products";
import { ProductGrid } from "@/components/products/ProductGrid";
import { ProductFilters } from "@/components/products/ProductFilters";
import { Drawer } from "@/components/ui/Drawer";
import { Pagination } from "@/components/ui/Pagination";

const ITEMS_PER_PAGE = 9;

function ShopContent() {
  const searchParams = useSearchParams();

  const initialBadge = searchParams.get("badge");
  const initialCategory = searchParams.get("category");
  const initialGender = searchParams.get("gender");
  const initialQuery = searchParams.get("q");
  const initialPage = parseInt(searchParams.get("page") || "1", 10);

  const [filters, setFilters] = useState<FilterOptions>({
    category: initialCategory || undefined,
    gender: initialGender || undefined,
    query: initialQuery || undefined,
    sortBy: initialBadge === "new" ? "newest" : "featured",
  });

  const [currentPage, setCurrentPage] = useState<number>(
    isNaN(initialPage) || initialPage < 1 ? 1 : initialPage
  );
  const [searchInputValue, setSearchInputValue] = useState(initialQuery || "");
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);

  const handleFilterChange = (updated: Partial<FilterOptions>) => {
    setFilters((prev) => ({ ...prev, ...updated }));
    setCurrentPage(1);
  };

  const handleResetFilters = () => {
    setFilters({
      sortBy: "featured",
    });
    setSearchInputValue("");
    setCurrentPage(1);
  };

  const filteredProducts = useMemo(() => {
    return filterAndSortProducts(filters);
  }, [filters]);

  const totalProducts = filteredProducts.length;
  const totalPages = Math.max(1, Math.ceil(totalProducts / ITEMS_PER_PAGE));

  // Ensure currentPage doesn't exceed totalPages if filter shrinks count
  const validCurrentPage = Math.min(currentPage, totalPages);

  const paginatedProducts = useMemo(() => {
    const startIndex = (validCurrentPage - 1) * ITEMS_PER_PAGE;
    return filteredProducts.slice(startIndex, startIndex + ITEMS_PER_PAGE);
  }, [filteredProducts, validCurrentPage]);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    const catalogHeader = document.getElementById("catalog-header");
    if (catalogHeader) {
      catalogHeader.scrollIntoView({ behavior: "smooth" });
    } else {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleFilterChange({ query: searchInputValue.trim() || undefined });
  };

  const startIndex = totalProducts === 0 ? 0 : (validCurrentPage - 1) * ITEMS_PER_PAGE + 1;
  const endIndex = Math.min(validCurrentPage * ITEMS_PER_PAGE, totalProducts);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 w-full">
      {/* Top Header & Search Bar */}
      <div
        id="catalog-header"
        className="flex flex-col md:flex-row md:items-end justify-between pb-8 border-b border-zinc-200/80 gap-6 scroll-mt-24"
      >
        <div>
          <span className="text-xs font-bold uppercase tracking-widest text-orange-600">
            Official Catalog
          </span>
          <h1 className="text-3xl sm:text-4xl font-black text-zinc-950 tracking-tight mt-1">
            All Footwear
          </h1>
          <p className="text-xs sm:text-sm text-zinc-500 mt-1">
            {totalProducts === 0
              ? "No footwear matching your filters"
              : `Showing ${startIndex}–${endIndex} of ${totalProducts} models (Page ${validCurrentPage} of ${totalPages})`}
          </p>
        </div>

        {/* Search & Sort Controls */}
        <div className="flex flex-wrap items-center gap-3">
          {/* Inline Search Bar */}
          <form onSubmit={handleSearchSubmit} className="relative min-w-[220px] sm:min-w-[280px]">
            <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-400" />
            <input
              type="text"
              value={searchInputValue}
              onChange={(e) => setSearchInputValue(e.target.value)}
              placeholder="Search in catalog..."
              className="w-full h-10 pl-9 pr-8 rounded-xl border border-zinc-300 text-xs bg-white focus:outline-none focus:ring-2 focus:ring-zinc-950 focus:border-transparent"
            />
            {searchInputValue && (
              <button
                type="button"
                onClick={() => {
                  setSearchInputValue("");
                  handleFilterChange({ query: undefined });
                }}
                className="absolute right-2.5 top-1/2 -translate-y-1/2 text-zinc-400 hover:text-zinc-700"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </form>

          {/* Sort By Select */}
          <select
            value={filters.sortBy || "featured"}
            onChange={(e) =>
              handleFilterChange({
                sortBy: e.target.value as FilterOptions["sortBy"],
              })
            }
            className="h-10 px-3 pr-8 rounded-xl border border-zinc-300 text-xs font-semibold text-zinc-800 bg-white focus:outline-none focus:ring-2 focus:ring-zinc-950"
            aria-label="Sort sneakers by"
          >
            <option value="featured">Featured First</option>
            <option value="newest">New Arrivals</option>
            <option value="price-low">Price: Low to High</option>
            <option value="price-high">Price: High to Low</option>
            <option value="rating">Top Rated</option>
          </select>

          {/* Mobile Filter Button */}
          <button
            type="button"
            onClick={() => setIsMobileFilterOpen(true)}
            className="lg:hidden h-10 px-4 rounded-xl border border-zinc-300 bg-white text-xs font-semibold text-zinc-900 flex items-center gap-2 hover:bg-zinc-50"
          >
            <SlidersHorizontal className="w-3.5 h-3.5" />
            <span>Filters</span>
          </button>
        </div>
      </div>

      {/* Main Grid + Filter Sidebar */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 pt-8 items-start">
        {/* Desktop Filter Sidebar */}
        <aside className="hidden lg:block lg:col-span-1 bg-white p-6 rounded-2xl border border-zinc-200/80 sticky top-24 shadow-subtle">
          <ProductFilters
            filters={filters}
            onChange={handleFilterChange}
            onReset={handleResetFilters}
          />
        </aside>

        {/* Product Grid Area */}
        <div className="lg:col-span-3 space-y-10">
          <ProductGrid products={paginatedProducts} columns={3} />

          {/* Pagination Controls */}
          {totalPages > 1 && (
            <div className="pt-8 border-t border-zinc-200/80 flex flex-col sm:flex-row items-center justify-between gap-4">
              <p className="text-xs text-zinc-500 font-medium">
                Showing <span className="font-bold text-zinc-900">{startIndex}–{endIndex}</span> of{" "}
                <span className="font-bold text-zinc-900">{totalProducts}</span> sneakers
              </p>

              <Pagination
                currentPage={validCurrentPage}
                totalPages={totalPages}
                onPageChange={handlePageChange}
              />
            </div>
          )}
        </div>
      </div>

      {/* Mobile Filters Drawer */}
      <Drawer
        isOpen={isMobileFilterOpen}
        onClose={() => setIsMobileFilterOpen(false)}
        title="Refine Footwear"
        position="left"
      >
        <ProductFilters
          filters={filters}
          onChange={handleFilterChange}
          onReset={handleResetFilters}
          isMobile={true}
          onCloseMobile={() => setIsMobileFilterOpen(false)}
        />
      </Drawer>
    </div>
  );
}

export default function ShopPage() {
  return (
    <Suspense
      fallback={
        <div className="max-w-7xl mx-auto px-4 py-20 text-center">
          <p className="text-xs uppercase tracking-widest text-zinc-400">Loading catalog...</p>
        </div>
      }
    >
      <ShopContent />
    </Suspense>
  );
}
