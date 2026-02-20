'use client';

import { motion } from 'framer-motion';
import { ArrowRight, Upload, MessageSquare, Phone } from 'lucide-react';
import Link from 'next/link';

export default function CTASection() {
  return (
    <section className="py-20 lg:py-32 bg-background relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-accent/5 to-transparent" />
      
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main CTA Card */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="bg-gradient-to-br from-primary via-primary-hover to-primary text-primary-foreground rounded-3xl p-8 lg:p-16 shadow-2xl relative overflow-hidden"
        >
          {/* Decorative elements */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-accent/10 rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-success/10 rounded-full blur-3xl" />
          
          <div className="relative">
            <div className="text-center max-w-3xl mx-auto mb-12">
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
                className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4"
              >
                Ready to Start Your Project?
              </motion.h2>
              
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3 }}
                className="text-lg text-primary-foreground/90"
              >
                Request a quote, upload your artwork, or speak with our expert team 
                for reliable, professional print services.
              </motion.p>
            </div>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 }}
              className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6"
            >
              {/* Quote CTA */}
              <Link
                href="/quote"
                className="group bg-accent hover:bg-accent-hover text-accent-foreground rounded-xl p-6 transition-all duration-300 hover:scale-105 hover:shadow-2xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-primary"
              >
                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0 w-12 h-12 bg-accent-foreground/10 rounded-lg flex items-center justify-center group-hover:bg-accent-foreground/20 transition-colors">
                    <MessageSquare className="w-6 h-6" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-bold text-lg mb-1">Get a Quote</h3>
                    <p className="text-sm text-accent-foreground/90 mb-3">
                      Tell us about your project and receive a detailed quote with fast turnaround
                    </p>
                    <div className="flex items-center text-sm font-semibold">
                      Start now
                      <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>
                </div>
              </Link>

              {/* Upload CTA */}
              <Link
                href="/upload"
                className="group bg-card hover:bg-muted text-card-foreground rounded-xl p-6 transition-all duration-300 hover:scale-105 hover:shadow-2xl border-2 border-border focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-primary"
              >
                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0 w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center group-hover:bg-accent/20 transition-colors">
                    <Upload className="w-6 h-6 text-accent" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-bold text-lg mb-1">Upload Artwork</h3>
                    <p className="text-sm text-muted-foreground mb-3">
                      Have files ready? Upload them directly to get started
                    </p>
                    <div className="flex items-center text-sm font-semibold text-accent">
                      Upload files
                      <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>
                </div>
              </Link>

              {/* Contact CTA */}
              <Link
                href="tel:+44XXXXXXXXX"
                className="group bg-card hover:bg-muted text-card-foreground rounded-xl p-6 transition-all duration-300 hover:scale-105 hover:shadow-2xl border-2 border-border sm:col-span-2 lg:col-span-1 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-primary"
              >
                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0 w-12 h-12 bg-success/10 rounded-lg flex items-center justify-center group-hover:bg-success/20 transition-colors">
                    <Phone className="w-6 h-6 text-success" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-bold text-lg mb-1">Call Us</h3>
                    <p className="text-sm text-muted-foreground mb-3">
                      Speak with our team for expert advice and support
                    </p>
                    <div className="flex items-center text-sm font-semibold text-success">
                         07508 729 279
                      <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>
                </div>
              </Link>
            </motion.div>
          </div>
        </motion.div>

        {/* Additional info section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
          className="mt-12 text-center"
        >
          <p className="text-muted-foreground text-sm">
            Files too large to email? You can send files up to 1GB via our upload page.
          </p>
        </motion.div>
      </div>
    </section>
  );
}