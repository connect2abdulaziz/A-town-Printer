export interface ServiceCategory {
  id: string;
  title: string;
  slug: string;
  shortDescription: string;
  description: string;
  examples: string[];
}

/**
 * Three main service categories per scope:
 * 1. Clothing & Apparel Printing
 * 2. Large Format Printing & Displays
 * 3. Print Marketing Products
 */
export const serviceCategories: ServiceCategory[] = [
  {
    id: "clothing",
    title: "Clothing & Apparel Printing",
    slug: "clothing",
    shortDescription: "Workwear, branded clothing, and apparel personalisation.",
    description:
      "Professional workwear, branded clothing, and apparel personalisation. From team uniforms to promotional wear.",
    examples: ["Workwear", "Branded clothing", "Apparel personalisation"],
  },
  {
    id: "large-format",
    title: "Large Format Printing & Displays",
    slug: "large-format",
    shortDescription: "Gazebos, banners, signage, and display products.",
    description:
      "Gazebos, banners, signage, and display products for events, retail, and outdoor promotion.",
    examples: ["Gazebos", "Banners", "Signage", "Display products"],
  },
  {
    id: "print-marketing",
    title: "Print Marketing Products",
    slug: "print-marketing",
    shortDescription: "Flyers, posters, business cards, and poster boards.",
    description:
      "Flyers, posters, business cards, poster boards, and other print marketing materials.",
    examples: ["Flyers", "Posters", "Business cards", "Poster boards"],
  },
];

export function getCategoryBySlug(slug: string): ServiceCategory | undefined {
  return serviceCategories.find((c) => c.slug === slug);
}
