'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { Button } from '@/components/ui/Button';
import { Upload, MessageSquare } from 'lucide-react';
import { ServiceCategory } from '@/types';

interface CategoryCTAProps {
  category: ServiceCategory;
}

export default function CategoryCTA({ category }: CategoryCTAProps) {
  return (
    <section className="py-16 lg:py-24 bg-gradient-to-br from-muted to-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="max-w-3xl mx-auto text-center"
        >
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
            Ready to get started?
          </h2>
          <p className="text-lg text-muted-foreground mb-8">
            Request a quote for {category.title.toLowerCase()} or upload your artwork to begin your project.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/quote">
              <Button variant="primary" className="w-full sm:w-auto px-8 py-4 text-lg">
                <MessageSquare className="mr-2 h-5 w-5" />
                Get a Quote
              </Button>
            </Link>
            <Link href="/upload">
              <Button variant="outline" className="w-full sm:w-auto px-8 py-4 text-lg">
                <Upload className="mr-2 h-5 w-5" />
                Upload Artwork
              </Button>
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
