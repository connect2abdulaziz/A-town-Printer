'use client';

import { motion } from 'framer-motion';
import { FileText, Upload, MessageSquare, CheckCircle } from 'lucide-react';

interface ProcessStepsProps {
  categoryId: string;
}

const steps = [
  {
    icon: FileText,
    title: 'Choose Your Product',
    description: 'Browse our range and select the perfect product for your needs.',
  },
  {
    icon: Upload,
    title: 'Upload Your Artwork',
    description: 'Send us your design files or artwork via our upload page – our team will review and respond.',
  },
  {
    icon: MessageSquare,
    title: 'Get a Quote',
    description: 'Receive a detailed quote with pricing and turnaround times from our team.',
  },
  {
    icon: CheckCircle,
    title: 'We Deliver',
    description: 'Sit back while we handle production and deliver your finished products.',
  },
];

export default function ProcessSteps({ categoryId }: ProcessStepsProps) {
  return (
    <section className="relative py-20 lg:py-28 overflow-hidden">
      {/* Prominent Background with Gradient */}
      <div className="absolute inset-0 bg-primary " />
      
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
            <span className="inline-flex items-center px-5 py-2.5 rounded-full bg-accent text-primary font-semibold text-sm border border-primary/20">
              Simple Process
            </span>
          </motion.div>
          
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-accent mb-4">
            How It Works
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Our simple process makes it easy to get the printing services you need.
          </p>
        </motion.div>

        {/* Progress Bar Container */}
        <div className="relative mb-12">
          {/* Progress Bar Track */}
          <div className="hidden lg:block absolute top-8 left-0 right-0 h-2 bg-border/50 rounded-full overflow-hidden">
            {/* Progress Bar Fill - Animated */}
            <motion.div
              className="h-full bg-gradient-to-r from-accent via-accent-hover to-accent rounded-full shadow-lg shadow-accent/30"
              initial={{ width: 0 }}
              whileInView={{ width: '100%' }}
              viewport={{ once: true }}
              transition={{ duration: 1.5, ease: "easeOut" }}
            />
          </div>

          {/* Steps Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-4 relative">
            {steps.map((step, index) => {
              const Icon = step.icon;
              const progress = ((index + 1) / steps.length) * 100;
              
              return (
                <motion.div
                  key={step.title}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.15 }}
                  className="relative group"
                >
                  {/* Step Card */}
                  <div className="relative h-full flex flex-col items-center text-center p-8 rounded-2xl bg-white border-2 border-border/50 hover:border-accent/50 hover:shadow-xl hover:shadow-accent/10 transition-all duration-300 bg-gradient-to-b from-white to-muted/30">
                    {/* Progress Indicator on Card */}
                    <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-accent/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-t-2xl" />

                    {/* Icon Container with Progress Circle */}
                    <motion.div
                      className="relative mb-6"
                      whileHover={{ scale: 1.1, y: -4 }}
                      transition={{ type: "spring", stiffness: 300 }}
                    >
                      {/* Progress Circle Ring */}
                      <div className="absolute inset-0 w-20 h-20">
                        <svg className="w-20 h-20 transform -rotate-90" viewBox="0 0 80 80">
                          <circle
                            cx="40"
                            cy="40"
                            r="36"
                            stroke="currentColor"
                            strokeWidth="3"
                            fill="none"
                            className="text-border/30"
                          />
                          <motion.circle
                            cx="40"
                            cy="40"
                            r="36"
                            stroke="currentColor"
                            strokeWidth="3"
                            fill="none"
                            strokeLinecap="round"
                            className="text-accent"
                            initial={{ pathLength: 0 }}
                            whileInView={{ pathLength: progress / 100 }}
                            viewport={{ once: true }}
                            transition={{ duration: 1, delay: index * 0.2 }}
                          />
                        </svg>
                      </div>

                      {/* Icon Circle */}
                      <div className="relative w-20 h-20 rounded-full bg-gradient-to-br from-accent/20 via-accent/10 to-accent/5 flex items-center justify-center border-3 border-accent/30 group-hover:border-accent/60 group-hover:bg-gradient-to-br group-hover:from-accent/30 group-hover:via-accent/20 group-hover:to-accent/10 transition-all duration-300 shadow-lg shadow-accent/20 group-hover:shadow-xl group-hover:shadow-accent/30">
                        <Icon className="w-10 h-10 text-accent group-hover:scale-110 transition-transform duration-300" />
                      </div>

                      {/* Step Number Badge */}
                      <div className="absolute -top-2 -right-2 w-8 h-8 rounded-full bg-accent text-accent-foreground text-xs font-bold flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300 border-2 border-white">
                        {index + 1}
                      </div>
                    </motion.div>

                    {/* Title */}
                    <h3 className="text-xl font-bold text-accent mb-3 group-hover:text-accent transition-colors duration-300">
                      {step.title}
                    </h3>
                    
                    {/* Description */}
                    <p className="text-sm text-muted-foreground leading-relaxed max-w-xs mx-auto">
                      {step.description}
                    </p>

                    {/* Bottom Accent Line */}
                    <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-accent/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-b-2xl" />
                  </div>

                  {/* Connecting Arrow - Desktop */}
                  {index < steps.length - 1 && (
                    <div className="hidden lg:block absolute top-8 left-full w-full -translate-x-1/2 translate-y-1/2 z-10">
                      <motion.div
                        initial={{ opacity: 0, x: -10 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: index * 0.2 + 0.5 }}
                        className="flex items-center justify-center"
                      >
                        <div className="w-12 h-0.5 bg-accent/30" />
                        <div className="w-0 h-0 border-l-8 border-l-accent/30 border-t-4 border-t-transparent border-b-4 border-b-transparent" />
                      </motion.div>
                    </div>
                  )}
                </motion.div>
              );
            })}
          </div>
        </div>

    
      </div>
    </section>
  );
}
