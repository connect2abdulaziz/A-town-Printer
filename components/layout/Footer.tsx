import Link from 'next/link';
import { Facebook, Instagram, Linkedin, Mail, MapPin, Phone } from 'lucide-react';
import { serviceCategories } from '@/lib/data/services';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-primary text-primary-foreground">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          {/* Company Info */}
          <div>
            <div className="flex items-center space-x-3 mb-6">
              <div className="w-10 h-10 bg-accent rounded-lg flex items-center justify-center">
                <span className="text-2xl font-bold text-accent-foreground">A</span>
              </div>
              <div>
                <div className="text-lg font-bold">A-Town Printers</div>
                <div className="text-xs text-primary-foreground/70">Since 2015</div>
              </div>
            </div>
            <p className="text-primary-foreground/80 text-sm mb-6 leading-relaxed">
              Professional printing services across the UK. Quality prints, fast turnaround, 
              and exceptional customer service.
            </p>
            <div className="flex space-x-4">
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 bg-primary-foreground/10 rounded-lg flex items-center justify-center hover:bg-accent transition-colors"
                aria-label="Facebook"
              >
                <Facebook className="w-5 h-5" />
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 bg-primary-foreground/10 rounded-lg flex items-center justify-center hover:bg-accent transition-colors"
                aria-label="Instagram"
              >
                <Instagram className="w-5 h-5" />
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 bg-primary-foreground/10 rounded-lg flex items-center justify-center hover:bg-accent transition-colors"
                aria-label="LinkedIn"
              >
                <Linkedin className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Services */}
          <div>
            <h3 className="font-bold text-lg mb-4">Our Services</h3>
            <ul className="space-y-3">
              {serviceCategories.map((category) => (
                <li key={category.id}>
                  <Link
                    href={`/${category.slug}`}
                    className="text-primary-foreground/80 hover:text-accent transition-colors text-sm"
                  >
                    {category.title.split(' & ')[0]}
                  </Link>
                </li>
              ))}
              <li>
                <Link
                  href="/quote"
                  className="text-accent hover:text-accent-hover font-medium transition-colors text-sm"
                >
                  Request a Quote →
                </Link>
              </li>
            </ul>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-bold text-lg mb-4">Quick Links</h3>
            <ul className="space-y-3">
              <li>
                <Link
                  href="/upload"
                  className="text-primary-foreground/80 hover:text-accent transition-colors text-sm"
                >
                  Upload Artwork
                </Link>
              </li>
              <li>
                <Link
                  href="/about"
                  className="text-primary-foreground/80 hover:text-accent transition-colors text-sm"
                >
                  About Us
                </Link>
              </li>
              <li>
                <Link
                  href="/faq"
                  className="text-primary-foreground/80 hover:text-accent transition-colors text-sm"
                >
                  FAQs
                </Link>
              </li>
              <li>
                <Link
                  href="/contact"
                  className="text-primary-foreground/80 hover:text-accent transition-colors text-sm"
                >
                  Contact Us
                </Link>
              </li>
              <li>
                <Link
                  href="/privacy"
                  className="text-primary-foreground/80 hover:text-accent transition-colors text-sm"
                >
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link
                  href="/terms"
                  className="text-primary-foreground/80 hover:text-accent transition-colors text-sm"
                >
                  Terms & Conditions
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-bold text-lg mb-4">Get in Touch</h3>
            <ul className="space-y-4">
              <li>
                <a
                  href="tel:+44XXXXXXXXX"
                  className="flex items-start space-x-3 text-primary-foreground/80 hover:text-accent transition-colors group"
                >
                  <Phone className="w-5 h-5 mt-0.5 group-hover:scale-110 transition-transform" />
                  <div>
                    <div className="text-sm font-medium">Call Us</div>
                    <div className="text-sm">+44 XXX XXX XXXX</div>
                  </div>
                </a>
              </li>
              <li>
                <a
                  href="mailto:info@atownprinters.co.uk"
                  className="flex items-start space-x-3 text-primary-foreground/80 hover:text-accent transition-colors group"
                >
                  <Mail className="w-5 h-5 mt-0.5 group-hover:scale-110 transition-transform" />
                  <div>
                    <div className="text-sm font-medium">Email Us</div>
                    <div className="text-sm">info@atownprinters.co.uk</div>
                  </div>
                </a>
              </li>
              <li>
                <div className="flex items-start space-x-3 text-primary-foreground/80">
                  <MapPin className="w-5 h-5 mt-0.5" />
                  <div>
                    <div className="text-sm font-medium">Location</div>
                    <div className="text-sm">
                      United Kingdom<br />
                      Nationwide Service
                    </div>
                  </div>
                </div>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-primary-foreground/10">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="text-sm text-primary-foreground/60">
              © {currentYear} A-Town Printers. All rights reserved.
            </div>
            <div className="flex items-center space-x-6 text-sm text-primary-foreground/60">
              <span>🇬🇧 Proudly UK-Based</span>
              <span>•</span>
              <span>✓ Quality Guaranteed</span>
              <span>•</span>
              <span>⚡ Fast Turnaround</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}