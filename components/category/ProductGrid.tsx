'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import { ShoppingCart, Eye } from 'lucide-react';
import { Product } from '@/lib/data/products';

/** Group products for large-format: gazebos first, then banners/signage/displays */
function groupProductsForDisplay(products: Product[], categorySlug: string): { groupLabel: string; products: Product[] }[] {
  if (categorySlug !== 'large-format') {
    return [{ groupLabel: '', products }];
  }
  const gazebos = products.filter((p) => p.productGroup === 'gazebos');
  const others = products.filter((p) => p.productGroup !== 'gazebos');
  const result: { groupLabel: string; products: Product[] }[] = [];
  if (gazebos.length > 0) result.push({ groupLabel: 'Gazebos', products: gazebos });
  if (others.length > 0) result.push({ groupLabel: 'Banners, Signage & Displays', products: others });
  return result;
}

interface ProductGridProps {
  products: Product[];
  categorySlug: string;
}

// Helper function to get default price
const getDefaultPrice = (product: Product) => {
  if (product.price) return product.price;
  
  const priceMap: Record<string, string> = {
    'workwear-polo': 'From £24.99',
    'branded-t-shirts': 'From £12.99',
    'hoodies': 'From £29.99',
    'jackets': 'From £49.99',
    'gazebos': 'From £199.99',
    'pop-up-gazebos': 'From £249.99',
    'banners': 'From £39.99',
    'signage': 'From £79.99',
    'display-stands': 'From £59.99',
    'flyers': 'From £0.15',
    'posters': 'From £2.99',
    'business-cards': 'From £19.99',
    'poster-boards': 'From £12.99',
  };
  
  return priceMap[product.id] || 'Get Quote';
};

export default function ProductGrid({ products, categorySlug }: ProductGridProps) {
  if (!products || products.length === 0) {
    return (
      <section className="py-16 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center py-12">
            <p className="text-muted-foreground text-lg">Products will be listed here.</p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="relative py-20 lg:py-28 overflow-hidden">
      {/* Prominent Background with Gradient - Matching ProcessSteps */}
      <div className="absolute inset-0 " />
      
      {/* Decorative Pattern Overlay */}
      {/* <div className="absolute inset-0 opacity-[0.03]" style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%230c1929' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
      }} /> */}
      
      {/* Decorative Circles */}
      {/* <div className="absolute top-0 right-0 w-96 h-96 bg-accent/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-primary/10 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2" /> */}

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="inline-block mb-6"
          >
            <span className="inline-flex items-center px-5 py-2.5 rounded-full bg-primary/10 text-primary font-semibold text-sm border border-primary/20">
              Premium Products
            </span>
          </motion.div>
          
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-4">
            Our Products
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Explore our range of {products.length} professional {products.length === 1 ? 'product' : 'products'} in this category.
          </p>
        </motion.div>

        {/* Product Grid (grouped for large-format: Gazebos, then Banners/Signage/Displays) */}
        {groupProductsForDisplay(products, categorySlug).map(({ groupLabel, products: groupProducts }) => (
          <div key={groupLabel || 'all'} className="mb-14 last:mb-0">
            {groupLabel && (
              <motion.h3
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="text-xl font-bold text-foreground mb-6 pb-2 border-b border-border"
              >
                {groupLabel}
              </motion.h3>
            )}
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
              {groupProducts.map((product, index) => {
                const productPrice = getDefaultPrice(product);

                return (
                  <motion.div
                    key={product.id}
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-50px" }}
                    transition={{
                      duration: 0.6,
                      delay: index * 0.1,
                      ease: [0.25, 0.46, 0.45, 0.94]
                    }}
                    className="group h-full"
                  >
                    <div className="relative h-full bg-white rounded-2xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-300 border-2 border-border/50 hover:border-accent/50 hover:-translate-y-2 bg-gradient-to-b from-white to-muted/20">
                      {/* Top Accent Line */}
                      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-accent via-accent-hover to-accent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                      {/* Image Section */}
                      <div className="relative h-64 bg-white overflow-hidden flex items-center justify-center p-4">
                        <Image
                          src="/images/jacket.webp"
                          alt={product.name}
                          fill
                          className="object-contain group-hover:scale-105 transition-transform duration-500"
                          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                          priority={index < 3}
                        />
                        <motion.div
                          initial={{ opacity: 0 }}
                          whileHover={{ opacity: 1 }}
                          className="absolute inset-0 bg-primary/20 backdrop-blur-sm flex flex-col items-center justify-center gap-4 z-10 transition-opacity duration-300"
                        >
                          <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="w-48 px-6 py-3 bg-accent text-accent-foreground font-bold rounded-lg shadow-lg hover:bg-accent-hover transition-colors duration-200 flex items-center justify-center gap-2"
                            onClick={(e) => {
                              e.preventDefault();
                              window.location.href = `/quote?product=${product.slug}`;
                            }}
                          >
                            <ShoppingCart className="w-5 h-5" />
                            GET QUOTE
                          </motion.button>
                          <Link
                            href={`/${categorySlug}/${product.slug}`}
                            className="w-48 px-6 py-3 bg-white text-foreground font-bold rounded-lg shadow-lg hover:bg-muted transition-colors duration-200 flex items-center justify-center gap-2 border-2 border-primary/20 hover:border-primary/40"
                          >
                            <Eye className="w-5 h-5" />
                            VIEW DETAILS
                          </Link>
                        </motion.div>
                      </div>
                      <div className="p-6 bg-primary">
                        <h3 className="text-xl font-bold text-accent mb-3 uppercase tracking-wide group-hover:text-accent transition-colors duration-300">
                          {product.name}
                        </h3>
                        <div className="mb-4">
                          <span className="text-2xl font-bold text-accent">
                            {productPrice}
                          </span>
                        </div>
                        {product.description && (
                          <p className="text-sm text-muted-foreground leading-relaxed line-clamp-2">
                            {product.description}
                          </p>
                        )}
                        <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-accent/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-b-2xl" />
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
