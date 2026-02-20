'use client';

import { motion } from 'framer-motion';
import { ArrowRight, Shirt, Maximize2, FileText } from 'lucide-react';
import Link from 'next/link';
import { ServiceCategory } from '@/types';
import { getProductsByCategory } from '@/lib/data/products';

const iconMap = {
  shirt: Shirt,
  maximize: Maximize2,
  'file-text': FileText,
};

interface ServiceCategoriesProps {
  categories: ServiceCategory[];
}

export default function ServiceCategories({ categories }: ServiceCategoriesProps) {
  return (
    <section className="py-20 lg:py-32 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-4">
            Our Printing Services
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Fast turnaround, reliable delivery, and professional print services tailored to your business. 
            Choose from our three core service categories.
          </p>
        </motion.div>

        {/* Category cards */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {categories.map((category, index) => {
            const Icon = iconMap[category.icon as keyof typeof iconMap] || FileText;
            
            return (
              <motion.div
                key={category.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Link
                  href={`/${category.slug}`}
                  className="group block h-full rounded-2xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2"
                >
                  <div className="relative h-full bg-primary/95 border-2 border-border rounded-2xl p-8 hover:border-accent transition-all duration-300 hover:shadow-2xl hover:-translate-y-1">
                    {/* Icon container */}
                    <div className="mb-6">
                      <div className="inline-flex items-center justify-center w-16 h-16 rounded-xl bg-accent/10 text-accent group-hover:bg-accent group-hover:text-accent-foreground transition-all duration-300">
                        <Icon className="w-8 h-8" />
                      </div>
                    </div>

                    {/* Content */}
                    <h3 className="text-2xl font-bold text-accent mb-3 group-hover:text-accent transition-colors">
                      {category.title}
                    </h3>
                    
                    <p className="text-muted mb-6 leading-relaxed">
                      {category.description}
                    </p>

                    {/* Products preview */}
                    {(() => {
                      const products = getProductsByCategory(category.id);
                      return products.length > 0 && (
                        <div className="mb-6">
                          <ul className="space-y-2">
                            {products.slice(0, 3).map((product) => (
                              <li key={product.id} className="flex items-start text-sm text-muted">
                                <span className="text-accent mr-2">•</span>
                                <span>{product.name}</span>
                              </li>
                            ))}
                            {products.length > 3 && (
                              <li className="text-sm text-accent font-medium">
                                + {products.length - 3} more
                              </li>
                            )}
                          </ul>
                        </div>
                      );
                    })()}

                    {/* CTA */}
                    <div className="flex items-center text-accent font-semibold group-hover:translate-x-2 transition-transform">
                      View {category.navLabel}
                      <ArrowRight className="ml-2 h-5 w-5" />
                    </div>

                    {/* Decorative corner */}
                    <div className="absolute top-4 right-4 w-20 h-20 bg-accent/5 rounded-full blur-2xl group-hover:bg-accent/10 transition-colors" />
                  </div>
                </Link>
              </motion.div>
            );
          })}
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
          className="text-center mt-16"
        >
          <p className="text-muted-foreground mb-6">
            Not sure which service you need?
          </p>
          <Link
            href="/quote"
            className="inline-flex items-center px-8 py-4 bg-primary text-primary-foreground rounded-lg font-semibold hover:bg-primary-hover transition-all duration-200 shadow-lg hover:shadow-xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2"
          >
            Get Expert Advice
            <ArrowRight className="ml-2 h-5 w-5" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}