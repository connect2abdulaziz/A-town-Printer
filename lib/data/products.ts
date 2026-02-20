export interface Product {
  id: string;
  name: string;
  slug: string;
  category: string;
  /** Optional group for display (e.g. 'gazebos' – all gazebo products shown together under Large Format) */
  productGroup?: string;
  description?: string;
  image?: string;
  price?: string;
}

export const products: Product[] = [
  // Clothing products
  {
    id: "workwear-polo",
    name: "Workwear Polo Shirts",
    slug: "workwear-polo",
    category: "clothing",
    description: "Durable polo shirts perfect for team uniforms and corporate wear.",
  },
  {
    id: "branded-t-shirts",
    name: "Branded T-Shirts",
    slug: "branded-t-shirts",
    category: "clothing",
    description: "Custom printed t-shirts for events, promotions, and team building.",
  },
  {
    id: "hoodies",
    name: "Custom Hoodies",
    slug: "hoodies",
    category: "clothing",
    description: "Premium hoodies with your branding for comfort and style.",
  },
  {
    id: "jackets",
    name: "Work Jackets",
    slug: "jackets",
    category: "clothing",
    description: "Professional work jackets with custom embroidery or printing.",
  },
  // Large format products – gazebo-related grouped together
  {
    id: "gazebos",
    name: "Custom Gazebos",
    slug: "gazebos",
    category: "large-format",
    productGroup: "gazebos",
    description: "Weather-resistant gazebos with custom branding for outdoor events.",
  },
  {
    id: "pop-up-gazebos",
    name: "Pop-up Gazebos",
    slug: "pop-up-gazebos",
    category: "large-format",
    productGroup: "gazebos",
    description: "Portable pop-up gazebos with printed graphics for events and promotions.",
  },
  {
    id: "banners",
    name: "Vinyl Banners",
    slug: "banners",
    category: "large-format",
    description: "High-quality vinyl banners for indoor and outdoor use.",
  },
  {
    id: "signage",
    name: "Custom Signage",
    slug: "signage",
    category: "large-format",
    description: "Professional signage solutions for retail and business premises.",
  },
  {
    id: "display-stands",
    name: "Display Stands",
    slug: "display-stands",
    category: "large-format",
    description: "Portable display stands for exhibitions and trade shows.",
  },
  // Print marketing products
  {
    id: "flyers",
    name: "Flyers & Leaflets",
    slug: "flyers",
    category: "print-marketing",
    description: "High-quality flyers and leaflets for promotions and events.",
  },
  {
    id: "posters",
    name: "Posters",
    slug: "posters",
    category: "print-marketing",
    description: "Eye-catching posters in various sizes for advertising.",
  },
  {
    id: "business-cards",
    name: "Business Cards",
    slug: "business-cards",
    category: "print-marketing",
    description: "Professional business cards with premium finishes.",
  },
  {
    id: "poster-boards",
    name: "Poster Boards",
    slug: "poster-boards",
    category: "print-marketing",
    description: "Rigid poster boards for displays and presentations.",
  },
];

export function getProductsByCategory(category: string): Product[] {
  return products.filter((p) => p.category === category);
}

export function getProductBySlug(category: string, slug: string): Product | undefined {
  return products.find((p) => p.category === category && p.slug === slug);
}
