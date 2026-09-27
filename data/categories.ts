export interface Category {
  id: string;
  slug: string;
  name: string;
  tagline: string;
  description: string;
  image: string;
  itemCount: number;
}

export const CATEGORIES: Category[] = [
  {
    id: "cat-men",
    slug: "men",
    name: "Men",
    tagline: "Performance & Street",
    description: "Engineered for explosive energy return, sleek street aesthetics, and all-day stability.",
    image: "/categories/men.jpg",
    itemCount: 3,
  },
  {
    id: "cat-women",
    slug: "women",
    name: "Women",
    tagline: "Refined Movement",
    description: "Featherweight silhouettes crafted for modern training, sculpted form, and dynamic comfort.",
    image: "/categories/women.jpg",
    itemCount: 4,
  },
  {
    id: "cat-running",
    slug: "running",
    name: "Running",
    tagline: "Engineered Speed",
    description: "Next-generation carbon-infusion and dual-density foam tuned for marathon endurance.",
    image: "/categories/running.jpg",
    itemCount: 4,
  },
  {
    id: "cat-lifestyle",
    slug: "lifestyle",
    name: "Lifestyle",
    tagline: "Everyday Motion",
    description: "Minimalist premium leather, breathable knit, and ergonomic footbeds designed for daily wear.",
    image: "/categories/lifestyle.jpg",
    itemCount: 4,
  },
  {
    id: "cat-kids",
    slug: "kids",
    name: "Kids",
    tagline: "Play Without Limits",
    description: "Durable reinforced toe caps, non-marking high-traction soles, and effortless slip-on fit.",
    image: "/categories/kids.jpg",
    itemCount: 3,
  },
];
