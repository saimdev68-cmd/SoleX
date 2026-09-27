import { PRODUCTS, Product } from "@/data/products";

export interface FilterOptions {
  category?: string;
  gender?: string;
  minPrice?: number;
  maxPrice?: number;
  color?: string;
  size?: number;
  rating?: number;
  sortBy?: "featured" | "newest" | "price-low" | "price-high" | "rating";
  query?: string;
}

export function getAllProducts(): Product[] {
  return PRODUCTS;
}

export function getProductBySlug(slug: string): Product | undefined {
  return PRODUCTS.find((p) => p.slug === slug);
}

export function getFeaturedProducts(limit = 4): Product[] {
  return PRODUCTS.filter((p) => p.badge === "BESTSELLER" || p.rating >= 4.8).slice(0, limit);
}

export function getNewArrivals(limit = 4): Product[] {
  return PRODUCTS.filter((p) => p.badge === "NEW" || p.badge === "LIMITED").slice(0, limit);
}

export function getProductsByCategory(category: string): Product[] {
  const norm = category.toLowerCase();
  return PRODUCTS.filter((p) => p.category.toLowerCase() === norm);
}

export function getProductsByGender(gender: string): Product[] {
  const norm = gender.toLowerCase();
  return PRODUCTS.filter(
    (p) => p.gender === norm || (p.gender === "unisex" && (norm === "men" || norm === "women"))
  );
}

export function getRelatedProducts(currentId: string, category: string, limit = 4): Product[] {
  return PRODUCTS.filter((p) => p.id !== currentId && p.category.toLowerCase() === category.toLowerCase()).slice(0, limit);
}

export function searchProducts(query: string): Product[] {
  const q = query.trim().toLowerCase();
  if (!q) return [];
  return PRODUCTS.filter((p) => {
    return (
      p.name.toLowerCase().includes(q) ||
      p.category.toLowerCase().includes(q) ||
      p.gender.toLowerCase().includes(q) ||
      p.description.toLowerCase().includes(q) ||
      p.colors.some((c) => c.name.toLowerCase().includes(q)) ||
      p.features.some((f) => f.toLowerCase().includes(q))
    );
  });
}

export function filterAndSortProducts(options: FilterOptions): Product[] {
  let list = [...PRODUCTS];

  // Search query
  if (options.query && options.query.trim()) {
    const q = options.query.trim().toLowerCase();
    list = list.filter(
      (p) =>
        p.name.toLowerCase().includes(q) ||
        p.category.toLowerCase().includes(q) ||
        p.gender.toLowerCase().includes(q) ||
        p.description.toLowerCase().includes(q)
    );
  }

  // Category
  if (options.category && options.category !== "all") {
    const cat = options.category.toLowerCase();
    list = list.filter((p) => p.category.toLowerCase() === cat);
  }

  // Gender
  if (options.gender && options.gender !== "all") {
    const gen = options.gender.toLowerCase();
    list = list.filter(
      (p) => p.gender === gen || (p.gender === "unisex" && (gen === "men" || gen === "women"))
    );
  }

  // Price range
  if (typeof options.minPrice === "number") {
    list = list.filter((p) => p.price >= (options.minPrice as number));
  }
  if (typeof options.maxPrice === "number") {
    list = list.filter((p) => p.price <= (options.maxPrice as number));
  }

  // Color
  if (options.color && options.color !== "all") {
    const col = options.color.toLowerCase();
    list = list.filter((p) =>
      p.colors.some((c) => c.name.toLowerCase().includes(col))
    );
  }

  // Size
  if (typeof options.size === "number") {
    list = list.filter((p) => p.sizes.includes(options.size as number));
  }

  // Rating
  if (typeof options.rating === "number" && options.rating > 0) {
    list = list.filter((p) => p.rating >= (options.rating as number));
  }

  // Sort
  if (options.sortBy) {
    switch (options.sortBy) {
      case "price-low":
        list.sort((a, b) => a.price - b.price);
        break;
      case "price-high":
        list.sort((a, b) => b.price - a.price);
        break;
      case "rating":
        list.sort((a, b) => b.rating - a.rating);
        break;
      case "newest":
        list.sort((a, b) => (b.badge === "NEW" ? 1 : 0) - (a.badge === "NEW" ? 1 : 0));
        break;
      case "featured":
      default:
        list.sort((a, b) => (b.badge ? 1 : 0) - (a.badge ? 1 : 0));
        break;
    }
  }

  return list;
}
