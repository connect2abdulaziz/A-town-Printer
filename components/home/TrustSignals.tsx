'use client';

import { motion } from 'framer-motion';
import { Award, Clock, MapPin, Shield, Users, Zap } from 'lucide-react';

const trustPoints = [
  {
    icon: MapPin,
    title: 'UK-Based Excellence',
    description: 'Proudly serving businesses across the United Kingdom with local expertise and support',
    color: 'text-accent'
  },
  {
    icon: Clock,
    title: 'Fast Turnaround',
    description: 'Quick production times without compromising on quality – perfect for urgent projects',
    color: 'text-success'
  },
  {
    icon: Award,
    title: 'Years of Experience',
    description: 'Trusted by businesses nationwide for professional printing solutions',
    color: 'text-primary'
  },
  {
    icon: Shield,
    title: 'Quality Guaranteed',
    description: 'Premium materials and printing techniques ensure exceptional results every time',
    color: 'text-accent'
  },
  {
    icon: Users,
    title: 'Expert Team',
    description: 'Dedicated specialists ready to help bring your vision to life',
    color: 'text-success'
  },
  {
    icon: Zap,
    title: 'Easy Process',
    description: 'Upload artwork, request quotes, and track orders – all in one streamlined platform',
    color: 'text-primary'
  },
];

export default function TrustSignals() {
  return (
    <section className="py-20 lg:py-32 bg-muted/30">
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
            Why Choose A-Town Printers?
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            We combine experience, quality, and speed to deliver printing services 
            that help your business stand out.
          </p>
        </motion.div>

        {/* Trust points grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {trustPoints.map((point, index) => {
            const Icon = point.icon;
            
            return (
              <motion.div
                key={point.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="group"
              >
                <div className="bg-primary border border-border rounded-xl p-6 h-full hover:border-accent/50 hover:shadow-xl transition-all duration-300">
                  <div className="flex items-start space-x-4">
                    {/* Icon */}
                    <div className={`flex-shrink-0 w-12 h-12 rounded-lg bg-accent flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}>
                      <Icon className="w-6 h-6" />
                    </div>
                    
                    {/* Content */}
                    <div className="flex-1">
                      <h3 className="text-lg font-bold text-accent mb-2">
                        {point.title}
                      </h3>
                      <p className="text-muted text-sm leading-relaxed">
                        {point.description}
                      </p>
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Stats section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className="mt-20 bg-primary text-primary-foreground rounded-2xl p-8 lg:p-12"
        >
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8 text-center">
            {[
              { value: '10+', label: 'Years Experience' },
              { value: '5000+', label: 'Projects Completed' },
              { value: '24h', label: 'Rush Available' },
              { value: '100%', label: 'UK Coverage' },
            ].map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.4 + index * 0.1 }}
              >
                <div className="text-4xl lg:text-5xl font-bold text-accent mb-2">
                  {stat.value}
                </div>
                <div className="text-primary-foreground/80 font-medium">
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Additional trust badges */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
          className="mt-12 flex flex-wrap justify-center items-center gap-6"
        >
          {[
            '🇬🇧 UK Based',
            '✓ Quality Assured',
            '⚡ Fast Delivery',
            '💬 Expert Support',
          ].map((badge, index) => (
            <motion.div
              key={badge}
              initial={{ opacity: 0, x: -10 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.6 + index * 0.05 }}
              className="px-4 py-2 bg-card border border-border rounded-full text-sm font-medium text-card-foreground"
            >
              {badge}
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}