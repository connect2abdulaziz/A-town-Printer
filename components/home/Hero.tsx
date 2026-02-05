'use client';

import { motion } from 'framer-motion';
import { ArrowRight, Upload, MessageSquare } from 'lucide-react';
import Link from 'next/link';

export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-primary to-primary-hover text-primary-foreground">
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }} />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-32">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left column - Content */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center lg:text-left"
          >
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="inline-block mb-4"
            >
              <span className="inline-flex items-center px-4 py-2 rounded-full bg-success/20 text-success-foreground text-sm font-medium">
                🇬🇧 UK-Based Professional Printing
              </span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight mb-6"
            >
              Quality Printing,{' '}
              <span className="text-accent bg-clip-text">
                Fast Turnaround
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="text-lg sm:text-xl text-primary-foreground/80 mb-8 max-w-2xl mx-auto lg:mx-0"
            >
              From branded workwear to event displays and marketing materials – 
              we deliver professional printing services across the UK with expertise you can trust.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start"
            >
              <Link
                href="/quote"
                className="group inline-flex items-center justify-center px-8 py-4 bg-accent text-accent-foreground rounded-lg font-semibold text-lg hover:bg-accent-hover transition-all duration-200 shadow-lg hover:shadow-xl hover:scale-105"
              >
                Get a Quote
                <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </Link>

              <Link
                href="/upload"
                className="group inline-flex items-center justify-center px-8 py-4 bg-card text-card-foreground border-2 border-border rounded-lg font-semibold text-lg hover:bg-muted transition-all duration-200"
              >
                <Upload className="mr-2 h-5 w-5" />
                Upload Artwork
              </Link>
            </motion.div>
          </motion.div>

          {/* Right column - Visual element */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3, duration: 0.7 }}
            className="relative hidden lg:block"
          >
            <div className="relative aspect-square max-w-lg mx-auto">
              {/* Decorative circles */}
              <motion.div
                animate={{
                  scale: [1, 1.1, 1],
                  rotate: [0, 180, 360],
                }}
                transition={{
                  duration: 20,
                  repeat: Infinity,
                  ease: "linear"
                }}
                className="absolute inset-0 rounded-full border-2 border-accent/20"
              />
              <motion.div
                animate={{
                  scale: [1, 1.05, 1],
                  rotate: [360, 180, 0],
                }}
                transition={{
                  duration: 15,
                  repeat: Infinity,
                  ease: "linear"
                }}
                className="absolute inset-8 rounded-full border-2 border-success/20"
              />
              
              {/* Service icons floating */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="grid grid-cols-2 gap-8">
                  {[
                    { icon: '👕', label: 'Apparel' },
                    { icon: '🏪', label: 'Displays' },
                    { icon: '📇', label: 'Marketing' },
                    { icon: '⚡', label: 'Fast' },
                  ].map((item, index) => (
                    <motion.div
                      key={item.label}
                      initial={{ opacity: 0, scale: 0 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 0.6 + index * 0.1 }}
                      whileHover={{ scale: 1.1 }}
                      className="bg-card/90 backdrop-blur-sm rounded-2xl p-6 shadow-xl border border-border"
                    >
                      <div className="text-4xl mb-2 text-center">{item.icon}</div>
                      <div className="text-sm font-medium text-card-foreground text-center">
                        {item.label}
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Bottom wave separator */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg
          viewBox="0 0 1440 120"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-auto"
        >
          <path
            d="M0 120L60 105C120 90 240 60 360 45C480 30 600 30 720 37.5C840 45 960 60 1080 67.5C1200 75 1320 75 1380 75L1440 75V120H1380C1320 120 1200 120 1080 120C960 120 840 120 720 120C600 120 480 120 360 120C240 120 120 120 60 120H0Z"
            fill="var(--background)"
          />
        </svg>
      </div>
    </section>
  );
}