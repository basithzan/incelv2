import React from 'react';
import { Shield, Map, CreditCard, FileCheck, Headphones, TrendingDown } from 'lucide-react';
import { motion } from 'framer-motion';

const features = [
  {
    icon: Shield,
    title: 'UAE-licensed DMC',
    description: 'Fully licensed and regulated destination management company',
    gradient: 'from-blue-500 to-cyan-500'
  },
  {
    icon: Map,
    title: 'Curated itineraries',
    description: 'Expertly designed travel experiences tailored to you',
    gradient: 'from-purple-500 to-pink-500'
  },
  {
    icon: CreditCard,
    title: 'Secure online payments',
    description: 'Safe and encrypted payment processing',
    gradient: 'from-green-500 to-emerald-500'
  },
  {
    icon: FileCheck,
    title: 'Visa support',
    description: 'Expert assistance with all visa requirements',
    gradient: 'from-orange-500 to-red-500'
  },
  {
    icon: Headphones,
    title: '24/7 assistance',
    description: 'Round-the-clock support for your peace of mind',
    gradient: 'from-indigo-500 to-blue-500'
  },
  {
    icon: TrendingDown,
    title: 'Best-value deals',
    description: 'Competitive pricing without compromising quality',
    gradient: 'from-teal-500 to-cyan-500'
  }
];

export function WhyChooseUs() {
  return (
    <section className="py-24 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-gradient-to-b from-neutral-50 via-white to-neutral-50" />
      <div className="absolute inset-0 opacity-5" style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%230A5DB1' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
      }} />

      <div className="max-w-[1400px] mx-auto px-6 lg:px-12 relative">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="inline-block mb-6"
          >
            <div className="relative">
              <span 
                className="text-white font-semibold px-8 py-3 rounded-full inline-flex items-center justify-center shadow-lg"
                style={{
                  background: 'linear-gradient(to right, #0076ad, #00A884)'
                }}
              >
                Why Choose Us
              </span>
            </div>
          </motion.div>
          <motion.h2 
            className="mb-1 text-4xl lg:text-6xl relative z-10"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            style={{ lineHeight: '1.3', overflow: 'visible' }}
          >
            <span 
              className="inline-block text-3xl lg:text-5xl font-normal relative z-10"
              style={{
                background: 'linear-gradient(to right, #0076ad, #00A884, #0076ad)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
                color: 'transparent',
                lineHeight: '1.4',
                paddingBottom: '0.2em',
                display: 'inline-block',
              }}
            >
              Your Trusted Travel Partner
            </span>
          </motion.h2>
          <p className="text-neutral-600 text-lg max-w-2xl mx-auto">
            Experience the difference with Incel Tourism - where expertise meets exceptional service
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ y: -8, scale: 1.02 }}
              className="relative group"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-accent/5 rounded-3xl blur-xl group-hover:blur-2xl transition-all opacity-0 group-hover:opacity-100" />
              
              <div className="relative bg-white rounded-3xl p-8 shadow-lg hover:shadow-2xl transition-all duration-500 border border-neutral-100 h-full">
                <div className="relative inline-block mb-6">
                  <div className="w-16 h-16 bg-[#0076ad] rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    {React.createElement(feature.icon, { 
                      className: "w-8 h-8 text-white", 
                      strokeWidth: 2.5,
                      fill: "none"
                    })}
                  </div>
                </div>
                
                <h3 className="mb-3 text-xl text-neutral-900 group-hover:text-neutral-900 transition-colors">
                  {feature.title}
                </h3>
                <p className="text-neutral-600 leading-relaxed">
                  {feature.description}
                </p>
                
                {/* Decorative element */}
                <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-primary/0 via-primary to-primary/0 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 rounded-full" />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
