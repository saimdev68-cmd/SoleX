export interface ProductColor {
  name: string;
  hex: string;
  bgClass: string;
  images: string[];
}

export interface Product {
  id: string;
  slug: string;
  name: string;
  category: "Men" | "Women" | "Running" | "Lifestyle" | "Kids";
  gender: "men" | "women" | "unisex" | "kids";
  price: number;
  oldPrice?: number;
  description: string;
  images: string[];
  colors: ProductColor[];
  sizes: number[];
  stock: number;
  rating: number;
  reviews: number;
  badge?: "NEW" | "BESTSELLER" | "LIMITED" | "SALE";
  features: string[];
  details?: {
    weight?: string;
    drop?: string;
    cushioning?: string;
    closure?: string;
  };
}

export const PRODUCTS: Product[] = [
  {
    id: "sp-001",
    slug: "solex-air-one",
    name: "SoleX Air One",
    category: "Men",
    gender: "men",
    price: 165,
    oldPrice: 195,
    description: "The flagship everyday runner engineered with pressurized dynamic air cells and adaptive mesh. Sculpted for city streets and effortless daily miles.",
    images: ["/products/variants/black-1.jpg", "/products/variants/black-2.jpg", "/products/variants/black-3.jpg", "/products/variants/black-4.jpg"],
    colors: [
      {
        name: "Triple Black",
        hex: "#18181B",
        bgClass: "bg-zinc-900",
        images: [
          "/products/variants/black-1.jpg",
          "/products/variants/black-2.jpg",
          "/products/variants/black-3.jpg",
          "/products/variants/black-4.jpg"
        ]
      },
      {
        name: "Solar Orange",
        hex: "#EA580C",
        bgClass: "bg-orange-600",
        images: [
          "/products/variants/orange-1.jpg",
          "/products/variants/orange-2.jpg",
          "/products/variants/orange-3.jpg",
          "/products/variants/orange-4.jpg"
        ]
      },
      {
        name: "Pure White",
        hex: "#FFFFFF",
        bgClass: "bg-white",
        images: [
          "/products/variants/white-1.jpg",
          "/products/variants/white-2.jpg",
          "/products/variants/white-3.jpg",
          "/products/variants/white-4.jpg"
        ]
      }
    ],
    sizes: [7, 8, 8.5, 9, 9.5, 10, 10.5, 11, 12],
    stock: 24,
    rating: 4.9,
    reviews: 142,
    badge: "BESTSELLER",
    features: [
      "SoleX AirCell dynamic heel chamber",
      "Breathable engineered jacquard knit",
      "Ortholite hybrid ergonomic sockliner",
      "High-abrasion rubber lug outsole",
    ],
    details: {
      weight: "278g (Size 9)",
      drop: "8mm",
      cushioning: "Plush Responsive",
      closure: "Integrated Lace Webbing",
    },
  },
  {
    id: "sp-002",
    slug: "solex-runner-x",
    name: "SoleX Runner X",
    category: "Running",
    gender: "unisex",
    price: 180,
    description: "Uncompromising speed architecture featuring full-length carbon composite rocker plate and high-rebound supercritical foam.",
    images: ["/products/variants/blue-1.jpg", "/products/variants/blue-2.jpg", "/products/variants/blue-3.jpg", "/products/variants/blue-4.jpg"],
    colors: [
      {
        name: "Royal Blue",
        hex: "#2563EB",
        bgClass: "bg-blue-600",
        images: [
          "/products/variants/blue-1.jpg",
          "/products/variants/blue-2.jpg",
          "/products/variants/blue-3.jpg",
          "/products/variants/blue-4.jpg"
        ]
      },
      {
        name: "Volt Cyan Blue",
        hex: "#06B6D4",
        bgClass: "bg-cyan-500",
        images: [
          "/products/variants/cyan-1.jpg",
          "/products/variants/cyan-2.jpg",
          "/products/variants/cyan-3.jpg",
          "/products/variants/cyan-4.jpg"
        ]
      },
      {
        name: "Triple Black",
        hex: "#18181B",
        bgClass: "bg-zinc-900",
        images: [
          "/products/variants/black-1.jpg",
          "/products/variants/black-2.jpg",
          "/products/variants/black-3.jpg",
          "/products/variants/black-4.jpg"
        ]
      }
    ],
    sizes: [7.5, 8, 8.5, 9, 9.5, 10, 11, 12],
    stock: 18,
    rating: 4.8,
    reviews: 98,
    badge: "NEW",
    features: [
      "Continuous Carbon-Rocker Propulsion Plate",
      "Supercritical Aerofoam Midsole",
      "Featherlight mono-mesh upper",
      "Micro-traction wet-weather grip",
    ],
    details: {
      weight: "215g (Size 9)",
      drop: "6mm",
      cushioning: "High Energy Return",
      closure: "Ultra-thin Racing Laces",
    },
  },
  {
    id: "sp-003",
    slug: "solex-street-pro",
    name: "SoleX Street Pro",
    category: "Lifestyle",
    gender: "men",
    price: 140,
    oldPrice: 160,
    description: "Architectural minimalism meets premium full-grain nubuck and dual-density memory foam footbed for timeless street luxury.",
    images: ["/products/variants/gray-1.jpg", "/products/variants/gray-2.jpg", "/products/variants/gray-3.jpg", "/products/variants/gray-4.jpg"],
    colors: [
      {
        name: "Wolf Gray",
        hex: "#6B7280",
        bgClass: "bg-zinc-500",
        images: [
          "/products/variants/gray-1.jpg",
          "/products/variants/gray-2.jpg",
          "/products/variants/gray-3.jpg",
          "/products/variants/gray-4.jpg"
        ]
      },
      {
        name: "Triple Black",
        hex: "#18181B",
        bgClass: "bg-zinc-900",
        images: [
          "/products/variants/black-1.jpg",
          "/products/variants/black-2.jpg",
          "/products/variants/black-3.jpg",
          "/products/variants/black-4.jpg"
        ]
      },
      {
        name: "Pure White",
        hex: "#FFFFFF",
        bgClass: "bg-white",
        images: [
          "/products/variants/white-1.jpg",
          "/products/variants/white-2.jpg",
          "/products/variants/white-3.jpg",
          "/products/variants/white-4.jpg"
        ]
      }
    ],
    sizes: [7, 8, 9, 10, 11, 12],
    stock: 31,
    rating: 4.7,
    reviews: 84,
    badge: "SALE",
    features: [
      "Supple full-grain Italian nubuck panels",
      "Reinforced padded collar",
      "Removable slow-recovery memory foam bed",
      "Cupsole stitched construction",
    ],
    details: {
      weight: "340g (Size 9)",
      drop: "4mm",
      cushioning: "Supportive Firm",
      closure: "Waxed Cotton Laces",
    },
  },
  {
    id: "sp-004",
    slug: "solex-motion",
    name: "SoleX Motion",
    category: "Men",
    gender: "men",
    price: 155,
    description: "Designed for seamless multi-directional transitions. Ideal for HIIT, cross-training, and high-intensity agility workouts.",
    images: ["/products/variants/purple-1.jpg", "/products/variants/purple-2.jpg", "/products/variants/purple-3.jpg", "/products/variants/purple-4.jpg"],
    colors: [
      {
        name: "Royal Purple",
        hex: "#7C3AED",
        bgClass: "bg-purple-600",
        images: [
          "/products/variants/purple-1.jpg",
          "/products/variants/purple-2.jpg",
          "/products/variants/purple-3.jpg",
          "/products/variants/purple-4.jpg"
        ]
      },
      {
        name: "Electric Lime Green",
        hex: "#84CC16",
        bgClass: "bg-lime-500",
        images: [
          "/products/variants/lime-1.jpg",
          "/products/variants/lime-2.jpg",
          "/products/variants/lime-3.jpg",
          "/products/variants/lime-4.jpg"
        ]
      },
      {
        name: "Pure White",
        hex: "#FFFFFF",
        bgClass: "bg-white",
        images: [
          "/products/variants/white-1.jpg",
          "/products/variants/white-2.jpg",
          "/products/variants/white-3.jpg",
          "/products/variants/white-4.jpg"
        ]
      }
    ],
    sizes: [8, 8.5, 9, 9.5, 10, 10.5, 11],
    stock: 15,
    rating: 4.6,
    reviews: 67,
    features: [
      "Lateral TPU stabilizer wings",
      "Low-profile responsive forefoot foam",
      "Flex-groove articulated outsole",
      "Anti-odor bamboo charcoal lining",
    ],
    details: {
      weight: "260g (Size 9)",
      drop: "4mm",
      cushioning: "Balanced Low-Profile",
      closure: "Midfoot Lockdown Strap",
    },
  },
  {
    id: "sp-005",
    slug: "solex-court",
    name: "SoleX Court",
    category: "Men",
    gender: "men",
    price: 135,
    description: "Clean heritage court aesthetic updated with contemporary cushioning and abrasion-resistant toe guard.",
    images: ["/products/variants/green-1.jpg", "/products/variants/green-2.jpg", "/products/variants/green-3.jpg", "/products/variants/green-4.jpg"],
    colors: [
      {
        name: "Pine Green",
        hex: "#059669",
        bgClass: "bg-emerald-600",
        images: [
          "/products/variants/green-1.jpg",
          "/products/variants/green-2.jpg",
          "/products/variants/green-3.jpg",
          "/products/variants/green-4.jpg"
        ]
      },
      {
        name: "Wolf Gray",
        hex: "#6B7280",
        bgClass: "bg-zinc-500",
        images: [
          "/products/variants/gray-1.jpg",
          "/products/variants/gray-2.jpg",
          "/products/variants/gray-3.jpg",
          "/products/variants/gray-4.jpg"
        ]
      },
      {
        name: "Pure White",
        hex: "#FFFFFF",
        bgClass: "bg-white",
        images: [
          "/products/variants/white-1.jpg",
          "/products/variants/white-2.jpg",
          "/products/variants/white-3.jpg",
          "/products/variants/white-4.jpg"
        ]
      }
    ],
    sizes: [7, 8, 9, 10, 11, 12],
    stock: 22,
    rating: 4.8,
    reviews: 110,
    badge: "BESTSELLER",
    features: [
      "Classic low-profile tennis silhouette",
      "Padded collar and tongue for ankle comfort",
      "Herringbone pattern high-grip rubber sole",
      "Tonal embossed SoleX wordmark",
    ],
  },
  {
    id: "sp-006",
    slug: "solex-nova",
    name: "SoleX Nova",
    category: "Women",
    gender: "women",
    price: 160,
    oldPrice: 180,
    description: "Tailored specifically for the female foot biomechanics, offering a narrower heel cup, sculpted arch support, and cloud-like foam.",
    images: ["/products/variants/pink-1.jpg", "/products/variants/pink-2.jpg", "/products/variants/pink-3.jpg", "/products/variants/pink-4.jpg"],
    colors: [
      {
        name: "Blush Pink",
        hex: "#EC4899",
        bgClass: "bg-pink-500",
        images: [
          "/products/variants/pink-1.jpg",
          "/products/variants/pink-2.jpg",
          "/products/variants/pink-3.jpg",
          "/products/variants/pink-4.jpg"
        ]
      },
      {
        name: "Pure White",
        hex: "#FFFFFF",
        bgClass: "bg-white",
        images: [
          "/products/variants/white-1.jpg",
          "/products/variants/white-2.jpg",
          "/products/variants/white-3.jpg",
          "/products/variants/white-4.jpg"
        ]
      },
      {
        name: "Wolf Gray",
        hex: "#6B7280",
        bgClass: "bg-zinc-500",
        images: [
          "/products/variants/gray-1.jpg",
          "/products/variants/gray-2.jpg",
          "/products/variants/gray-3.jpg",
          "/products/variants/gray-4.jpg"
        ]
      }
    ],
    sizes: [6, 6.5, 7, 7.5, 8, 8.5, 9, 10],
    stock: 19,
    rating: 4.9,
    reviews: 153,
    badge: "BESTSELLER",
    features: [
      "Gender-specific anatomical arch contouring",
      "Ultra-soft pillow collar",
      "Energy-return micro-cell foam",
      "Reflective accents for low-light runs",
    ],
  },
  {
    id: "sp-007",
    slug: "solex-flow",
    name: "SoleX Flow",
    category: "Women",
    gender: "women",
    price: 150,
    description: "Minimalist slip-on luxury with adaptive 4-way stretch knit and subtle arch cradle. Built for studio sessions and casual strolls.",
    images: ["/products/variants/purple-1.jpg", "/products/variants/purple-2.jpg", "/products/variants/purple-3.jpg", "/products/variants/purple-4.jpg"],
    colors: [
      {
        name: "Royal Purple",
        hex: "#7C3AED",
        bgClass: "bg-purple-600",
        images: [
          "/products/variants/purple-1.jpg",
          "/products/variants/purple-2.jpg",
          "/products/variants/purple-3.jpg",
          "/products/variants/purple-4.jpg"
        ]
      },
      {
        name: "Blush Pink",
        hex: "#EC4899",
        bgClass: "bg-pink-500",
        images: [
          "/products/variants/pink-1.jpg",
          "/products/variants/pink-2.jpg",
          "/products/variants/pink-3.jpg",
          "/products/variants/pink-4.jpg"
        ]
      },
      {
        name: "Pure White",
        hex: "#FFFFFF",
        bgClass: "bg-white",
        images: [
          "/products/variants/white-1.jpg",
          "/products/variants/white-2.jpg",
          "/products/variants/white-3.jpg",
          "/products/variants/white-4.jpg"
        ]
      }
    ],
    sizes: [6, 7, 7.5, 8, 8.5, 9],
    stock: 27,
    rating: 4.7,
    reviews: 79,
    badge: "NEW",
    features: [
      "Hands-free step-in heel construction",
      "Seamless anti-friction knit sock",
      "Featherlight EVA sole unit",
      "Breathable moisture-wicking weave",
    ],
  },
  {
    id: "sp-008",
    slug: "solex-aura",
    name: "SoleX Aura",
    category: "Women",
    gender: "women",
    price: 170,
    description: "High-fashion aesthetic infused with technical cushioning. Features bold proportions and elevated platform midsole.",
    images: ["/products/variants/wheat-1.jpg", "/products/variants/wheat-2.jpg", "/products/variants/wheat-3.jpg", "/products/variants/wheat-4.jpg"],
    colors: [
      {
        name: "Caramel Wheat Gold",
        hex: "#D97706",
        bgClass: "bg-amber-600",
        images: [
          "/products/variants/wheat-1.jpg",
          "/products/variants/wheat-2.jpg",
          "/products/variants/wheat-3.jpg",
          "/products/variants/wheat-4.jpg"
        ]
      },
      {
        name: "Solar Orange",
        hex: "#EA580C",
        bgClass: "bg-orange-600",
        images: [
          "/products/variants/orange-1.jpg",
          "/products/variants/orange-2.jpg",
          "/products/variants/orange-3.jpg",
          "/products/variants/orange-4.jpg"
        ]
      },
      {
        name: "Pure White",
        hex: "#FFFFFF",
        bgClass: "bg-white",
        images: [
          "/products/variants/white-1.jpg",
          "/products/variants/white-2.jpg",
          "/products/variants/white-3.jpg",
          "/products/variants/white-4.jpg"
        ]
      }
    ],
    sizes: [6.5, 7, 7.5, 8, 8.5, 9, 9.5],
    stock: 12,
    rating: 4.8,
    reviews: 62,
    badge: "LIMITED",
    features: [
      "40mm elevated ergonomic platform",
      "Suede and ripstop mixed upper",
      "Chunky geometric sculpted outsole",
      "Signature metallic eyelet hardware",
    ],
  },
  {
    id: "sp-009",
    slug: "solex-move",
    name: "SoleX Move",
    category: "Women",
    gender: "women",
    price: 130,
    description: "Versatile daily trainer crafted for urban commuters. Lightweight, water-resistant treated coating with ultra-cushioned insole.",
    images: ["/products/variants/gray-1.jpg", "/products/variants/gray-2.jpg", "/products/variants/gray-3.jpg", "/products/variants/gray-4.jpg"],
    colors: [
      {
        name: "Wolf Gray",
        hex: "#6B7280",
        bgClass: "bg-zinc-500",
        images: [
          "/products/variants/gray-1.jpg",
          "/products/variants/gray-2.jpg",
          "/products/variants/gray-3.jpg",
          "/products/variants/gray-4.jpg"
        ]
      },
      {
        name: "Royal Blue",
        hex: "#2563EB",
        bgClass: "bg-blue-600",
        images: [
          "/products/variants/blue-1.jpg",
          "/products/variants/blue-2.jpg",
          "/products/variants/blue-3.jpg",
          "/products/variants/blue-4.jpg"
        ]
      },
      {
        name: "Triple Black",
        hex: "#18181B",
        bgClass: "bg-zinc-900",
        images: [
          "/products/variants/black-1.jpg",
          "/products/variants/black-2.jpg",
          "/products/variants/black-3.jpg",
          "/products/variants/black-4.jpg"
        ]
      }
    ],
    sizes: [6, 6.5, 7, 7.5, 8, 9],
    stock: 25,
    rating: 4.6,
    reviews: 51,
    features: [
      "DWR water-resistant upper coating",
      "Shock-absorbing heel bumper",
      "Easy-clean synthetic materials",
      "Anti-slip ribbed outsole pattern",
    ],
  },
  {
    id: "sp-010",
    slug: "solex-speed",
    name: "SoleX Speed",
    category: "Running",
    gender: "unisex",
    price: 190,
    oldPrice: 220,
    description: "Elite competition shoe built for PRs and half-marathon dominance. Infused with nitrogen-infused foam and responsive carbon wishbone shank.",
    images: ["/products/variants/red-1.jpg", "/products/variants/red-2.jpg", "/products/variants/red-3.jpg", "/products/variants/red-4.jpg"],
    colors: [
      {
        name: "Crimson Red",
        hex: "#DC2626",
        bgClass: "bg-red-600",
        images: [
          "/products/variants/red-1.jpg",
          "/products/variants/red-2.jpg",
          "/products/variants/red-3.jpg",
          "/products/variants/red-4.jpg"
        ]
      },
      {
        name: "Triple Black",
        hex: "#18181B",
        bgClass: "bg-zinc-900",
        images: [
          "/products/variants/black-1.jpg",
          "/products/variants/black-2.jpg",
          "/products/variants/black-3.jpg",
          "/products/variants/black-4.jpg"
        ]
      },
      {
        name: "Pure White",
        hex: "#FFFFFF",
        bgClass: "bg-white",
        images: [
          "/products/variants/white-1.jpg",
          "/products/variants/white-2.jpg",
          "/products/variants/white-3.jpg",
          "/products/variants/white-4.jpg"
        ]
      }
    ],
    sizes: [7, 8, 8.5, 9, 9.5, 10, 10.5, 11, 12],
    stock: 14,
    rating: 4.9,
    reviews: 135,
    badge: "BESTSELLER",
    features: [
      "Nitrogen-injected supercritical midsole",
      "Asymmetric carbon wishbone plate",
      "Micro-perforated competition upper",
      "Continental grade rubber compound",
    ],
  },
  {
    id: "sp-011",
    slug: "solex-velocity",
    name: "SoleX Velocity",
    category: "Running",
    gender: "men",
    price: 175,
    description: "High-mileage endurance trainer engineered to withstand 600+ miles without foam breakdown. Dual-density cushioning protects joints.",
    images: ["/products/variants/cyan-1.jpg", "/products/variants/cyan-2.jpg", "/products/variants/cyan-3.jpg", "/products/variants/cyan-4.jpg"],
    colors: [
      {
        name: "Volt Cyan Blue",
        hex: "#06B6D4",
        bgClass: "bg-cyan-500",
        images: [
          "/products/variants/cyan-1.jpg",
          "/products/variants/cyan-2.jpg",
          "/products/variants/cyan-3.jpg",
          "/products/variants/cyan-4.jpg"
        ]
      },
      {
        name: "Electric Lime Green",
        hex: "#84CC16",
        bgClass: "bg-lime-500",
        images: [
          "/products/variants/lime-1.jpg",
          "/products/variants/lime-2.jpg",
          "/products/variants/lime-3.jpg",
          "/products/variants/lime-4.jpg"
        ]
      },
      {
        name: "Triple Black",
        hex: "#18181B",
        bgClass: "bg-zinc-900",
        images: [
          "/products/variants/black-1.jpg",
          "/products/variants/black-2.jpg",
          "/products/variants/black-3.jpg",
          "/products/variants/black-4.jpg"
        ]
      }
    ],
    sizes: [8, 8.5, 9, 9.5, 10, 10.5, 11, 12],
    stock: 20,
    rating: 4.8,
    reviews: 92,
    badge: "NEW",
    features: [
      "Dual-density progressive stability post",
      "Heel bevel that smooths ground strike",
      "Plush tongue with gusseted wings",
      "Reflective 360-degree night visibility",
    ],
  },
  {
    id: "sp-012",
    slug: "solex-sprint",
    name: "SoleX Sprint",
    category: "Running",
    gender: "unisex",
    price: 145,
    description: "Lightweight tempo shoe designed for 5K to 10K races and fast track sessions. Unrestricted forefoot flexibility.",
    images: ["/products/variants/blue-1.jpg", "/products/variants/blue-2.jpg", "/products/variants/blue-3.jpg", "/products/variants/blue-4.jpg"],
    colors: [
      {
        name: "Royal Blue",
        hex: "#2563EB",
        bgClass: "bg-blue-600",
        images: [
          "/products/variants/blue-1.jpg",
          "/products/variants/blue-2.jpg",
          "/products/variants/blue-3.jpg",
          "/products/variants/blue-4.jpg"
        ]
      },
      {
        name: "Wolf Gray",
        hex: "#6B7280",
        bgClass: "bg-zinc-500",
        images: [
          "/products/variants/gray-1.jpg",
          "/products/variants/gray-2.jpg",
          "/products/variants/gray-3.jpg",
          "/products/variants/gray-4.jpg"
        ]
      },
      {
        name: "Pure White",
        hex: "#FFFFFF",
        bgClass: "bg-white",
        images: [
          "/products/variants/white-1.jpg",
          "/products/variants/white-2.jpg",
          "/products/variants/white-3.jpg",
          "/products/variants/white-4.jpg"
        ]
      }
    ],
    sizes: [7, 7.5, 8, 8.5, 9, 9.5, 10, 11],
    stock: 29,
    rating: 4.7,
    reviews: 58,
    features: [
      "Sub-200g racing profile",
      "High-rebound forefoot propellant pad",
      "Single-layer engineered mesh",
      "Segmented crash pad",
    ],
  },
  {
    id: "sp-013",
    slug: "solex-classic",
    name: "SoleX Classic",
    category: "Lifestyle",
    gender: "unisex",
    price: 125,
    description: "Pure retro heritage. A timeless silhouette built with supple leathers and classic rubber cupsole that gets better with every step.",
    images: ["/products/variants/gray-1.jpg", "/products/variants/gray-2.jpg", "/products/variants/gray-3.jpg", "/products/variants/gray-4.jpg"],
    colors: [
      {
        name: "Wolf Gray",
        hex: "#6B7280",
        bgClass: "bg-zinc-500",
        images: [
          "/products/variants/gray-1.jpg",
          "/products/variants/gray-2.jpg",
          "/products/variants/gray-3.jpg",
          "/products/variants/gray-4.jpg"
        ]
      },
      {
        name: "Triple Black",
        hex: "#18181B",
        bgClass: "bg-zinc-900",
        images: [
          "/products/variants/black-1.jpg",
          "/products/variants/black-2.jpg",
          "/products/variants/black-3.jpg",
          "/products/variants/black-4.jpg"
        ]
      },
      {
        name: "Pure White",
        hex: "#FFFFFF",
        bgClass: "bg-white",
        images: [
          "/products/variants/white-1.jpg",
          "/products/variants/white-2.jpg",
          "/products/variants/white-3.jpg",
          "/products/variants/white-4.jpg"
        ]
      }
    ],
    sizes: [7, 8, 8.5, 9, 9.5, 10, 10.5, 11, 12],
    stock: 35,
    rating: 4.8,
    reviews: 180,
    badge: "BESTSELLER",
    features: [
      "Supple grain leather that ages beautifully",
      "Vintage cream gum outsole",
      "Perforated quarter panel for airflow",
      "Padded terrycloth interior lining",
    ],
  },
  {
    id: "sp-014",
    slug: "solex-urban",
    name: "SoleX Urban",
    category: "Lifestyle",
    gender: "men",
    price: 165,
    oldPrice: 190,
    description: "Tactical techwear inspired silhouette featuring rugged cordura ripstop, magnetic speed-buckle, and aggressive lug traction.",
    images: ["/products/variants/black-1.jpg", "/products/variants/black-2.jpg", "/products/variants/black-3.jpg", "/products/variants/black-4.jpg"],
    colors: [
      {
        name: "Triple Black",
        hex: "#18181B",
        bgClass: "bg-zinc-900",
        images: [
          "/products/variants/black-1.jpg",
          "/products/variants/black-2.jpg",
          "/products/variants/black-3.jpg",
          "/products/variants/black-4.jpg"
        ]
      },
      {
        name: "Solar Orange",
        hex: "#EA580C",
        bgClass: "bg-orange-600",
        images: [
          "/products/variants/orange-1.jpg",
          "/products/variants/orange-2.jpg",
          "/products/variants/orange-3.jpg",
          "/products/variants/orange-4.jpg"
        ]
      },
      {
        name: "Wolf Gray",
        hex: "#6B7280",
        bgClass: "bg-zinc-500",
        images: [
          "/products/variants/gray-1.jpg",
          "/products/variants/gray-2.jpg",
          "/products/variants/gray-3.jpg",
          "/products/variants/gray-4.jpg"
        ]
      }
    ],
    sizes: [8, 9, 9.5, 10, 10.5, 11, 12],
    stock: 16,
    rating: 4.9,
    reviews: 77,
    badge: "LIMITED",
    features: [
      "Cordura 500D weatherproof ballistic upper",
      "Quick-release magnetic buckle harness",
      "Vibram high-traction all-terrain sole",
      "Internal thermal regulation membrane",
    ],
  },
  {
    id: "sp-015",
    slug: "solex-daily",
    name: "SoleX Daily",
    category: "Lifestyle",
    gender: "unisex",
    price: 115,
    description: "The democratic sneaker for everywhere you go. Eco-friendly organic canvas combined with recycled EVA midsole.",
    images: ["/products/variants/wheat-1.jpg", "/products/variants/wheat-2.jpg", "/products/variants/wheat-3.jpg", "/products/variants/wheat-4.jpg"],
    colors: [
      {
        name: "Caramel Wheat Gold",
        hex: "#D97706",
        bgClass: "bg-amber-600",
        images: [
          "/products/variants/wheat-1.jpg",
          "/products/variants/wheat-2.jpg",
          "/products/variants/wheat-3.jpg",
          "/products/variants/wheat-4.jpg"
        ]
      },
      {
        name: "Wolf Gray",
        hex: "#6B7280",
        bgClass: "bg-zinc-500",
        images: [
          "/products/variants/gray-1.jpg",
          "/products/variants/gray-2.jpg",
          "/products/variants/gray-3.jpg",
          "/products/variants/gray-4.jpg"
        ]
      },
      {
        name: "Pure White",
        hex: "#FFFFFF",
        bgClass: "bg-white",
        images: [
          "/products/variants/white-1.jpg",
          "/products/variants/white-2.jpg",
          "/products/variants/white-3.jpg",
          "/products/variants/white-4.jpg"
        ]
      }
    ],
    sizes: [7, 7.5, 8, 8.5, 9, 9.5, 10, 11, 12],
    stock: 40,
    rating: 4.7,
    reviews: 89,
    features: [
      "100% GOTS certified organic cotton canvas",
      "30% recycled rubber cupsole",
      "Natural cork footbed with antimicrobial properties",
      "Machine washable removable insole",
    ],
  },
  {
    id: "sp-016",
    slug: "solex-kids-blaze",
    name: "SoleX Kids Blaze",
    category: "Kids",
    gender: "kids",
    price: 75,
    oldPrice: 85,
    description: "Vibrant high-energy sneaker designed for school yards, playgrounds, and weekend adventures. Reinforced bumper resists scuffs.",
    images: ["/products/variants/red-1.jpg", "/products/variants/red-2.jpg", "/products/variants/red-3.jpg", "/products/variants/red-4.jpg"],
    colors: [
      {
        name: "Crimson Red",
        hex: "#DC2626",
        bgClass: "bg-red-600",
        images: [
          "/products/variants/red-1.jpg",
          "/products/variants/red-2.jpg",
          "/products/variants/red-3.jpg",
          "/products/variants/red-4.jpg"
        ]
      },
      {
        name: "Solar Orange",
        hex: "#EA580C",
        bgClass: "bg-orange-600",
        images: [
          "/products/variants/orange-1.jpg",
          "/products/variants/orange-2.jpg",
          "/products/variants/orange-3.jpg",
          "/products/variants/orange-4.jpg"
        ]
      },
      {
        name: "Pure White",
        hex: "#FFFFFF",
        bgClass: "bg-white",
        images: [
          "/products/variants/white-1.jpg",
          "/products/variants/white-2.jpg",
          "/products/variants/white-3.jpg",
          "/products/variants/white-4.jpg"
        ]
      }
    ],
    sizes: [3, 3.5, 4, 4.5, 5, 5.5, 6],
    stock: 25,
    rating: 4.9,
    reviews: 64,
    badge: "SALE",
    features: [
      "Easy hook-and-loop closure strap",
      "Durable rubberized protective toe guard",
      "Non-marking multi-surface grip",
      "Cushioned breathable ankle padding",
    ],
  },
  {
    id: "sp-017",
    slug: "solex-kids-bounce",
    name: "SoleX Kids Bounce",
    category: "Kids",
    gender: "kids",
    price: 70,
    description: "Extra bouncy playground champion with flexible sole grooves that move with growing feet and elastic slip-on laces.",
    images: ["/products/variants/blue-1.jpg", "/products/variants/blue-2.jpg", "/products/variants/blue-3.jpg", "/products/variants/blue-4.jpg"],
    colors: [
      {
        name: "Royal Blue",
        hex: "#2563EB",
        bgClass: "bg-blue-600",
        images: [
          "/products/variants/blue-1.jpg",
          "/products/variants/blue-2.jpg",
          "/products/variants/blue-3.jpg",
          "/products/variants/blue-4.jpg"
        ]
      },
      {
        name: "Volt Cyan Blue",
        hex: "#06B6D4",
        bgClass: "bg-cyan-500",
        images: [
          "/products/variants/cyan-1.jpg",
          "/products/variants/cyan-2.jpg",
          "/products/variants/cyan-3.jpg",
          "/products/variants/cyan-4.jpg"
        ]
      },
      {
        name: "Electric Lime Green",
        hex: "#84CC16",
        bgClass: "bg-lime-500",
        images: [
          "/products/variants/lime-1.jpg",
          "/products/variants/lime-2.jpg",
          "/products/variants/lime-3.jpg",
          "/products/variants/lime-4.jpg"
        ]
      }
    ],
    sizes: [3, 4, 5, 5.5, 6],
    stock: 20,
    rating: 4.8,
    reviews: 43,
    badge: "NEW",
    features: [
      "Stretch laces + top secure velcro tab",
      "High-rebound soft EVA cushion",
      "Anti-microbial washable footbed",
      "Reflective heel pull loops",
    ],
  },
  {
    id: "sp-018",
    slug: "solex-kids-flex",
    name: "SoleX Kids Flex",
    category: "Kids",
    gender: "kids",
    price: 68,
    description: "Barefoot-inspired natural motion sneaker for maximum freedom. Extremely lightweight and machine washable.",
    images: ["/products/variants/green-1.jpg", "/products/variants/green-2.jpg", "/products/variants/green-3.jpg", "/products/variants/green-4.jpg"],
    colors: [
      {
        name: "Pine Green",
        hex: "#059669",
        bgClass: "bg-emerald-600",
        images: [
          "/products/variants/green-1.jpg",
          "/products/variants/green-2.jpg",
          "/products/variants/green-3.jpg",
          "/products/variants/green-4.jpg"
        ]
      },
      {
        name: "Electric Lime Green",
        hex: "#84CC16",
        bgClass: "bg-lime-500",
        images: [
          "/products/variants/lime-1.jpg",
          "/products/variants/lime-2.jpg",
          "/products/variants/lime-3.jpg",
          "/products/variants/lime-4.jpg"
        ]
      },
      {
        name: "Pure White",
        hex: "#FFFFFF",
        bgClass: "bg-white",
        images: [
          "/products/variants/white-1.jpg",
          "/products/variants/white-2.jpg",
          "/products/variants/white-3.jpg",
          "/products/variants/white-4.jpg"
        ]
      }
    ],
    sizes: [3, 3.5, 4, 5, 6],
    stock: 18,
    rating: 4.7,
    reviews: 38,
    features: [
      "Wide toe box for natural toe splay",
      "Zero-drop flat flexible sole",
      "Ultra-breathable honeycomb mesh",
      "Reinforced seamless synthetic overlays",
    ],
  },
];
