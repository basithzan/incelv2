'use client';

import { motion } from 'framer-motion';
import { Button } from './ui/button';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { MapPin } from 'lucide-react';

const destinations = [
  {
    id: 1,
    name: 'Dubai & UAE',
    packageCount: 15,
    image: 'https://images.unsplash.com/photo-1718789967298-09132d1404bc?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxEdWJhaSUyMHNreWxpbmUlMjBjaXR5fGVufDF8fHx8MTc2MjYyOTgzMHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral'
  },
  {
    id: 2,
    name: 'Maldives',
    packageCount: 8,
    image: 'https://images.unsplash.com/photo-1698726654862-377c0218dfdc?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxNYWxkaXZlcyUyMGJlYWNoJTIwcmVzb3J0fGVufDF8fHx8MTc2MjYyOTgzMHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral'
  },
  {
    id: 3,
    name: 'Paris, France',
    packageCount: 12,
    image: 'https://images.unsplash.com/photo-1431274172761-fca41d930114?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxQYXJpcyUyMEVpZmZlbCUyMFRvd2VyfGVufDF8fHx8MTc2MjU4NDc4M3ww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral'
  },
  {
    id: 4,
    name: 'Santorini, Greece',
    packageCount: 6,
    image: 'https://images.unsplash.com/photo-1673485220135-3554ae67cafd?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxTYW50b3JpbmklMjBHcmVlY2UlMjBibHVlfGVufDF8fHx8MTc2MjYyOTgzMnww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral'
  }
];

export function PlanningTripSection() {
  return (
    <section className="pt-12 pb-20 bg-gradient-to-b from-primary/5 to-accent/5 overflow-hidden" style={{ minHeight: '780px' }}>
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.5, margin: "-100px" }}
            transition={{ duration: 0.6 }}
            className="relative"
          >
            {/* Background Decorative Elements */}
            <div className="absolute -left-20 -top-20 w-64 h-64 bg-primary/5 rounded-full blur-3xl"></div>
            <div className="absolute -right-10 -bottom-10 w-48 h-48 bg-accent/5 rounded-full blur-3xl"></div>

            <div className="relative">
              <h2
                className="mb-1 text-4xl lg:text-5xl font-bold relative z-10"
              >
                <span className="text-neutral-900">Planning a </span>
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent">Trip?</span>
              </h2>

              <p
                className="text-neutral-600 text-xl leading-normal mb-10 max-w-lg"
              >
                Luckily no destination is too far away. You can travel from country-to-country within hours to experience a wide variety of cultures and landscapes.
              </p>

              <div
                className="flex flex-wrap gap-4"
              >
                <Button
                  size="lg"
                  className="text-white font-semibold px-8 py-3 rounded-full inline-flex items-center justify-center shadow-lg hover:shadow-xl transition-all duration-300 border-0"
                  style={{
                    background: 'linear-gradient(to right, #0076ad, #00A884)'
                  }}
                >
                  See Trip Ideas
                </Button>
                <Button
                  variant="ghost"
                  size="lg"
                  className="text-primary hover:text-primary hover:bg-primary/5 px-8 py-6 rounded-lg transition-all"
                >
                  Popular Destinations
                </Button>
              </div>
            </div>
          </motion.div>

          {/* Right Grid - Destination Cards */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.5, margin: "-100px" }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="grid grid-cols-2 gap-4 lg:gap-6"
            style={{ paddingTop: '50px', paddingBottom: '20px' }}
          >
            {destinations.map((destination, index) => (
              <div
                key={destination.id}
                className={`group relative bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 min-h-[280px] hover:-translate-y-2 ${index === 0 || index === 3 ? 'mt-0' : 'mt-8'
                  }`}
              >
                {/* Image - Full Coverage */}
                <div className="absolute inset-0 overflow-hidden">
                  <ImageWithFallback
                    src={destination.image}
                    alt={destination.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  {/* Gradient overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent"></div>
                </div>

                {/* Content */}
                <div className="absolute bottom-0 left-0 right-0 p-5 z-10">
                  <h3 className="text-white mb-2 text-xl">
                    {destination.name}
                  </h3>
                  <div className="inline-block bg-yellow-400 backdrop-blur-sm px-3 py-1 rounded-full">
                    <span className="text-neutral-900 text-sm">
                      {destination.packageCount} Packages
                    </span>
                  </div>
                </div>

                {/* Hover border effect */}
                <div className="absolute inset-0 border-2 border-transparent group-hover:border-primary/20 rounded-2xl transition-all duration-300 z-20"></div>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
