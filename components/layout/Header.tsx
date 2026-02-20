'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Phone, Upload, MessageSquare } from 'lucide-react';
import { serviceCategories } from '@/lib/data/services';
import { CONTACT_PHONE } from '@/lib/constants';

const TEL_HREF = `tel:+44${CONTACT_PHONE.trim().replace(/^0/, '').replace(/\s/g, '')}`;

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header
      className={`sticky top-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-card/95 backdrop-blur-lg shadow-lg border-b border-border'
          : 'bg-transparent'
      }`}
    >
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-3 group">
            <div className="w-10 h-10 bg-accent rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform">
              <span className="text-2xl font-bold text-accent-foreground">A</span>
            </div>
            <div className="flex flex-col">
              <span className="text-xl font-bold text-foreground">A-Town Printers</span>
              <span className="text-xs text-muted-foreground">Professional Printing Services</span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-8">
            {/* Services Dropdown */}
            <div className="relative group">
              <button className="text-foreground hover:text-accent font-medium transition-colors py-2">
                Services
              </button>
              
              {/* Dropdown Menu */}
              <div className="absolute top-full left-0 pt-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                <div className="bg-card border border-border rounded-xl shadow-2xl p-6 w-80">
                  <div className="space-y-2">
                    {serviceCategories.map((category) => (
                      <Link
                        key={category.id}
                        href={`/${category.slug}`}
                        className="block p-3 rounded-lg hover:bg-muted transition-colors group/item"
                      >
                        <div className="font-semibold text-foreground group-hover/item:text-accent mb-1">
                          {category.title.split(' ')[0]}
                        </div>
                        <div className="text-sm text-muted-foreground line-clamp-2">
                          {category.description}
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <Link
              href="/upload"
              className="text-foreground hover:text-accent font-medium transition-colors"
            >
              Upload Artwork
            </Link>
            
            <Link
              href="/quote"
              className="px-6 py-2.5 bg-accent text-accent-foreground rounded-lg font-semibold hover:bg-accent-hover transition-all duration-200 shadow-md hover:shadow-lg"
            >
              Get a Quote
            </Link>

            <a
              href={TEL_HREF}
              className="flex items-center space-x-2 text-foreground hover:text-accent transition-colors"
            >
              <Phone className="w-4 h-4" />
              <span className="font-medium">Call Us</span>
            </a>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="lg:hidden p-2 text-foreground hover:text-accent transition-colors"
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </button>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="lg:hidden overflow-hidden"
            >
              <div className="py-4 space-y-4 border-t border-border">
                {/* Services Section */}
                <div>
                  <div className="text-sm font-semibold text-muted-foreground px-4 mb-2">
                    Services
                  </div>
                  {serviceCategories.map((category) => (
                    <Link
                      key={category.id}
                      href={`/${category.slug}`}
                      onClick={() => setIsMobileMenuOpen(false)}
                      className="block px-4 py-3 hover:bg-muted transition-colors"
                    >
                      <div className="font-semibold text-foreground">
                        {category.title}
                      </div>
                      <div className="text-sm text-muted-foreground">
                        {category.description}
                      </div>
                    </Link>
                  ))}
                </div>

                {/* Quick Actions */}
                <div className="space-y-2 px-4 pt-4 border-t border-border">
                  <Link
                    href="/upload"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="flex items-center space-x-3 p-3 bg-muted rounded-lg hover:bg-muted/70 transition-colors"
                  >
                    <Upload className="w-5 h-5 text-accent" />
                    <span className="font-medium">Upload Artwork</span>
                  </Link>

                  <Link
                    href="/quote"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="flex items-center space-x-3 p-3 bg-accent text-accent-foreground rounded-lg hover:bg-accent-hover transition-colors"
                  >
                    <MessageSquare className="w-5 h-5" />
                    <span className="font-medium">Get a Quote</span>
                  </Link>

                  <a
                    href={TEL_HREF}
                    className="flex items-center space-x-3 p-3 bg-muted rounded-lg hover:bg-muted/70 transition-colors"
                  >
                    <Phone className="w-5 h-5 text-accent" />
                    <span className="font-medium">Call Us</span>
                  </a>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </header>
  );
}