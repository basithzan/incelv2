'use client';

import React from 'react';
import { motion } from 'framer-motion';
import {
  Plane,
  MapPin,
  FileCheck,
  Globe,
  Palmtree,
  Compass,
  Users,
  Headphones
} from 'lucide-react';

const services = [
  {
    icon: Plane,
    title: 'Inbound Packages',
    description: 'Experience Dubai and the UAE with our curated inbound tour packages designed for international travelers.'
  },
  {
    icon: Globe,
    title: 'Outbound Packages',
    description: 'Explore destinations worldwide with our comprehensive outbound tour packages from Dubai.'
  },
  {
    icon: MapPin,
    title: 'Local Dubai Tours',
    description: 'Discover the wonders of Dubai with our premium local tours featuring iconic landmarks and hidden gems.'
  },
  {
    icon: FileCheck,
    title: 'UAE Visa Services',
    description: 'Fast and reliable UAE visa processing services for tourists, business travelers, and residents.'
  },
  {
    icon: Compass,
    title: 'Global Visa Assistance',
    description: 'Expert visa assistance for destinations worldwide, making your international travel seamless.'
  },
  {
    icon: Palmtree,
    title: 'Hajj & Umrah Packages',
    description: 'Spiritual journeys made comfortable with our respectful and comprehensive Hajj and Umrah packages.'
  },
  {
    icon: Users,
    title: 'Custom Group Tours',
    description: 'Tailored travel experiences for groups, families, and corporate teams with dedicated support.'
  },
  {
    icon: Headphones,
    title: '24/7 Travel Support',
    description: 'Round-the-clock assistance and support ensuring your journey is smooth from start to finish.'
  }
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

const cardVariants = {
  hidden: {
    opacity: 0,
    y: 30
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5
    }
  }
};

export function WhatWeOffer() {
  return (
    <section className="py-20 bg-gradient-to-b from-white to-neutral-50">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <motion.h2
            className="mb-1 text-4xl lg:text-5xl font-bold relative z-10"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            <span className="text-neutral-900">What we </span>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent">offer</span>
          </motion.h2>
          <p className="text-xl text-neutral-600 max-w-2xl mx-auto">
            Explore the world and become your own tour guide.
          </p>
        </motion.div>

        {/* Services Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
        >
          {services.map((service, index) => {
            const IconComponent = service.icon;
            return (
              <motion.div
                key={service.title}
                variants={cardVariants}
                whileHover={{
                  y: -8,
                  transition: { duration: 0.3 }
                }}
                className={`
                  bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300
                  border border-neutral-100 group relative overflow-hidden
                  ${index === services.length - 1 && services.length % 4 !== 0 ? 'md:col-span-2 lg:col-span-1' : ''}
                `}
              >
                {/* Gradient overlay on hover */}
                <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-accent/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-0" />

                <div className="relative z-10">
                  {/* Icon */}
                  <div className="w-16 h-16 rounded-xl bg-[#0076ad] flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300 relative z-10">
                    {React.createElement(IconComponent, {
                      className: "w-8 h-8 text-white",
                      strokeWidth: 2.5,
                      fill: "none"
                    })}
                  </div>

                  {/* Title */}
                  <h3 className="text-xl mb-3 text-neutral-900 group-hover:text-neutral-900 transition-colors duration-300">
                    {service.title}
                  </h3>

                  {/* Description */}
                  <p className="text-neutral-600 group-hover:text-neutral-900 leading-relaxed transition-colors duration-300">
                    {service.description}
                  </p>
                </div>

                {/* Bottom accent line */}
                <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-primary to-accent transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
