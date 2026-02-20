export interface ServiceCategory {
  id: string;
  title: string;
  slug: string;
  /** Short label for nav (keep simple and consistent) */
  navLabel: string;
  shortDescription: string;
  description: string;
  examples: string[];
  icon?: 'shirt' | 'maximize' | 'file-text';
}

/**
 * Three main service categories per scope:
 * 1. Clothing & Apparel Printing
 * 2. Large Format Printing & Displays
 * 3. Print Marketing Products
 * 
 * Note: Products are managed separately in lib/data/products.ts
 */
export const serviceCategories: ServiceCategory[] = [
  {
    id: "clothing",
    title: "Clothing & Apparel Printing",
    slug: "clothing",
    navLabel: "Clothing & Apparel",
    shortDescription: "Workwear, branded clothing, and apparel personalisation.",
    description:
      "Professional workwear, branded clothing, and apparel personalisation with fast turnaround and reliable quality. From team uniforms to promotional wear.",
    examples: ["Workwear", "Branded clothing", "Apparel personalisation"],
    icon: "shirt",
  },
  {
    id: "large-format",
    title: "Large Format Printing & Displays",
    slug: "large-format",
    navLabel: "Large Format & Displays",
    shortDescription: "Gazebos, banners, signage, and display products.",
    description:
      "Gazebos, banners, signage, and display products for events, retail, and outdoor promotion. Reliable production and fast turnaround.",
    examples: ["Gazebos", "Banners", "Signage", "Display products"],
    icon: "maximize",
  },
  {
    id: "print-marketing",
    title: "Print Marketing (Flyers, Posters, Business Cards)",
    slug: "print-marketing",
    navLabel: "Print Marketing",
    shortDescription: "Flyers, posters, business cards, and poster boards.",
    description:
      "Flyers, posters, business cards, poster boards, and other print marketing materials. Professional quality with fast turnaround.",
    examples: ["Flyers", "Posters", "Business cards", "Poster boards"],
    icon: "file-text",
  },
];

export function getCategoryBySlug(slug: string): ServiceCategory | undefined {
  return serviceCategories.find((c) => c.slug === slug);
}

export function getAllCategories(): ServiceCategory[] {
  return serviceCategories;
}
