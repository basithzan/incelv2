'use client';

import { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Sparkles } from 'lucide-react';
import { motion } from 'framer-motion';
import { ImageWithFallback } from './figma/ImageWithFallback';

interface Package {
  id: string;
  title: string;
  location: string;
  duration: string;
  image: string;
  price: number;
  category: string;
  highlights: string[];
}

interface LatestPackagesCarouselProps {
  packages: Package[];
}

export function LatestPackagesCarousel({ packages }: LatestPackagesCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [slidesPerView, setSlidesPerView] = useState(3);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setSlidesPerView(1);
      } else if (window.innerWidth < 1024) {
        setSlidesPerView(2);
      } else {
        setSlidesPerView(3);
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    const autoplay = setInterval(() => {
      handleNext();
    }, 5000);

    return () => clearInterval(autoplay);
  }, [currentIndex, slidesPerView]);

  const handlePrev = () => {
    setCurrentIndex(prev => (prev === 0 ? packages.length - slidesPerView : prev - 1));
  };

  const handleNext = () => {
    setCurrentIndex(prev => (prev >= packages.length - slidesPerView ? 0 : prev + 1));
  };

  return (
    <div className="relative">
      {/* Header */}
      <div className="mb-6 text-center relative overflow-visible -mt-4">
        <motion.h2 
          className="text-4xl lg:text-6xl mb-4 relative z-10"
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
            Latest Packages
          </span>
        </motion.h2>
      </div>

      {/* Carousel with Side Arrows */}
      <div className="relative">
        {/* Left Arrow */}
        <button
          onClick={handlePrev}
          className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-3 md:-translate-x-5 z-10 w-10 h-10 md:w-12 md:h-12 bg-white text-primary rounded-full flex items-center justify-center shadow-xl hover:shadow-2xl hover:bg-neutral-50 transition-all border border-neutral-200 hover:scale-110 active:scale-95"
        >
          <ChevronLeft className="w-5 h-5 md:w-6 md:h-6 text-neutral-900" />
        </button>

        {/* Right Arrow */}
        <button
          onClick={handleNext}
          className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-3 md:translate-x-5 z-10 w-10 h-10 md:w-12 md:h-12 bg-white text-primary rounded-full flex items-center justify-center shadow-xl hover:shadow-2xl hover:bg-neutral-50 transition-all border border-neutral-200 hover:scale-110 active:scale-95"
        >
          <ChevronRight className="w-5 h-5 md:w-6 md:h-6 text-neutral-900" />
        </button>

        {/* Carousel */}
        <div className="overflow-hidden rounded-2xl">
          <motion.div
            className="flex gap-0 md:gap-4 lg:gap-6"
            animate={{
              x: `-${currentIndex * (100 / slidesPerView)}%`,
            }}
            transition={{ 
              type: 'tween', 
              ease: 'easeInOut', 
              duration: 0.6 
            }}
          >
            {packages.map((pkg, index) => (
              <div
                key={pkg.id}
                style={{ 
                  minWidth: slidesPerView === 1 
                    ? '100%' 
                    : slidesPerView === 2 
                    ? 'calc(50% - 6px)' 
                    : 'calc(33.333% - 16px)' 
                }}
              >
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="relative h-64 md:h-72 lg:h-80 overflow-hidden rounded-xl md:rounded-2xl cursor-pointer group"
                >
                  <ImageWithFallback
                    src={pkg.image}
                    alt={pkg.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 scale-110 md:scale-100"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent pointer-events-none" />
                  
                  {/* Title Overlay */}
                  <div className="absolute bottom-0 left-0 right-0 p-4 md:p-6 pointer-events-none">
                    <h3 className="text-white mb-1">{pkg.title}</h3>
                    <p className="text-white/80 text-sm">{pkg.location}</p>
                  </div>
                </motion.div>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </div>
  );
}
