import React from 'react';
import { Shield, Map, CreditCard, FileCheck, Headphones, Star, Globe, HeartHandshake } from 'lucide-react';
import { motion } from 'framer-motion';
import { cn } from '../lib/utils'; // Assuming cn is available, or I will use clsx/tailwind-merge

// Fallback for cn if not available
function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(' ');
}

const features = [
  {
    icon: Shield,
    title: 'UAE-licensed DMC',
    description: 'Fully licensed and regulated destination management company.',
    className: "md:col-span-2 md:row-span-1",
    gradient: "from-primary to-primary/80",
    shadow: "shadow-primary/20",
  },
  {
    icon: Map,
    title: 'Curated itineraries',
    description: 'Expertly designed travel experiences tailored to you.',
    className: "md:col-span-1 md:row-span-2",
    gradient: "from-primary to-accent",
    shadow: "shadow-primary/20",
  },
  {
    icon: CreditCard,
    title: 'Secure payments',
    description: 'Safe and encrypted processing.',
    className: "md:col-span-1 md:row-span-1",
    gradient: "from-accent to-accent/80",
    shadow: "shadow-accent/20",
  },
  {
    icon: FileCheck,
    title: 'Visa support',
    description: 'Expert assistance with all visa requirements.',
    className: "md:col-span-2 md:row-span-1",
    gradient: "from-accent to-primary",
    shadow: "shadow-accent/20",
  },
  {
    icon: Headphones,
    title: '24/7 assistance',
    description: 'Round-the-clock support for your peace of mind.',
    className: "md:col-span-1 md:row-span-1",
    gradient: "from-primary/90 to-accent/90",
    shadow: "shadow-primary/20",
  },
];

export function WhyChooseUs() {
  return (
    <section className="pt-12 pb-4 relative overflow-hidden bg-white">
      {/* Subtle Background */}
      <div className="absolute inset-0 bg-[radial-gradient(#000000_1px,transparent_1px)] [background-size:24px_24px] opacity-[0.03]" />

      <div className="max-w-7xl mx-auto px-6 relative z-10" style={{ height: '662px' }}>
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="text-center mb-8"
        >
          <h2 className="text-4xl md:text-6xl font-bold mb-6 tracking-tight text-neutral-900">
            Why Travel With <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent">Incel?</span>
          </h2>
          <p className="text-lg text-neutral-600 max-w-2xl mx-auto mb-0">
            We don't just plan trips; we craft unforgettable experiences.
          </p>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, amount: 0.5, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="grid grid-cols-1 md:grid-cols-4 grid-rows-none md:grid-rows-3 gap-6 h-auto md:h-[600px]"
        >
          {features.map((feature, index) => (
            <div
              key={index}
              className={classNames(
                feature.className,
                "relative group overflow-hidden rounded-3xl p-8 flex flex-col justify-between transition-all duration-500 hover:-translate-y-1 hover:scale-[1.02]",
                `bg-gradient-to-br ${feature.gradient}`
              )}
              style={{
                boxShadow: "0 10px 40px -10px rgba(0,0,0,0.5)" // Base shadow
              }}
            >
              {/* Overlay for depth */}
              <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors duration-500" />

              {/* Dynamic Glow on Hover */}
              <div className={`absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-br ${feature.gradient} blur-xl -z-10`} />

              {/* Large Background Icon */}
              <div className="absolute -right-4 -top-4 opacity-10 group-hover:opacity-20 transition-all duration-500 transform rotate-12 group-hover:rotate-0 group-hover:scale-125">
                <feature.icon className="w-48 h-48 text-white" />
              </div>

              {/* Icon */}
              <div className="relative z-10 w-14 h-14 rounded-2xl bg-white/20 backdrop-blur-md border border-white/20 flex items-center justify-center mb-6 shadow-inner">
                <feature.icon className="w-7 h-7 text-white" />
              </div>

              {/* Content */}
              <div className="relative z-10">
                <h3 className="text-2xl font-bold text-white mb-3 tracking-wide drop-shadow-md">
                  {feature.title}
                </h3>
                <p className="text-white/90 text-sm leading-relaxed font-medium">
                  {feature.description}
                </p>
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
