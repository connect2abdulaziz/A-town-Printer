'use client';

import { motion } from 'framer-motion';
import { MapPin, Truck, CheckCircle2 } from 'lucide-react';

const SERVICE_AREAS = ['Shoreditch', 'Camden', 'Soho', 'Brixton', 'Hackney'] as const;

const REASSURANCE_POINTS = [
  'Same-day production on select services',
  'Clear timelines – no surprises',
  'Reliable turnaround for urgent and regular orders',
];

export default function LondonLocalization() {
  return (
    <section
      className="relative py-20 lg:py-28 overflow-hidden"
      aria-labelledby="london-localization-heading"
    >
      {/* Subtle background */}
      <div className="absolute inset-0 bg-muted/30" />
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-accent/5 to-transparent" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <motion.header
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-14"
        >
          <h2
            id="london-localization-heading"
            className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-3"
          >
            Serving London
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Professional print services across the capital, with fast turnaround and reliable delivery.
          </p>
        </motion.header>

        <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-stretch">
          {/* Service areas card */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="bg-card border border-border rounded-2xl p-8 lg:p-10 shadow-sm hover:shadow-md transition-shadow duration-300"
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="shrink-0 w-11 h-11 rounded-xl bg-accent/10 flex items-center justify-center">
                <MapPin className="w-5 h-5 text-accent" aria-hidden />
              </div>
              <div>
                <h3 className="text-xl font-bold text-foreground">
                  Areas we serve
                </h3>
                <p className="text-sm text-muted-foreground">
                  London & surrounding
                </p>
              </div>
            </div>
            <p className="text-muted-foreground mb-6 leading-relaxed">
              We work with businesses across the capital. Key areas include:
            </p>
            <ul className="flex flex-wrap gap-3" aria-label="London areas we serve">
              {SERVICE_AREAS.map((area, index) => (
                <motion.li
                  key={area}
                  initial={{ opacity: 0, y: 8 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.06 }}
                >
                  <span className="inline-flex items-center px-4 py-2.5 bg-primary text-primary-foreground rounded-lg font-medium text-sm shadow-sm border border-primary-foreground/10 hover:border-accent/50 transition-colors duration-200">
                    {area}
                  </span>
                </motion.li>
              ))}
            </ul>
          </motion.div>

          {/* Delivery reassurance card */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="bg-primary text-primary-foreground rounded-2xl p-8 lg:p-10 shadow-lg border border-primary-foreground/10 flex flex-col"
          >
            <div className="flex items-start gap-4 mb-6">
              <div className="shrink-0 w-12 h-12 rounded-xl bg-accent flex items-center justify-center">
                <Truck className="w-6 h-6 text-accent-foreground" aria-hidden />
              </div>
              <div>
                <h3 className="text-xl font-bold text-accent">
                  Fast, reliable turnaround
                </h3>
              </div>
            </div>
            <p className="text-primary-foreground/90 leading-relaxed mb-6 flex-1">
              Same-day production available on select services. We work to your deadlines
              so you can rely on us for urgent projects and regular orders across London.
            </p>
            <ul className="space-y-3" aria-label="Delivery reassurance">
              {REASSURANCE_POINTS.map((point, index) => (
                <motion.li
                  key={point}
                  initial={{ opacity: 0, x: 8 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.2 + index * 0.08 }}
                  className="flex items-center gap-3 text-primary-foreground/90 text-sm"
                >
                  <CheckCircle2 className="w-5 h-5 shrink-0 text-success" aria-hidden />
                  <span>{point}</span>
                </motion.li>
              ))}
            </ul>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
