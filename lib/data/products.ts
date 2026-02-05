export interface Product {
  id: string;
  name: string;
  slug: string;
  category: string;
  description?: string;
}

export const products: Product[] = [
  // Add product listings per category as needed
];

export function getProductsByCategory(category: string): Product[] {
  return products.filter((p) => p.category === category);
}

export function getProductBySlug(category: string, slug: string): Product | undefined {
  return products.find((p) => p.category === category && p.slug === slug);
}
