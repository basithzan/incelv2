'use client';

import { useState, useEffect, useRef } from 'react';
import { ChevronLeft, ChevronRight, Flame } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { ImageWithFallback } from './figma/ImageWithFallback';

interface Deal {
  id: string;
  title: string;
  location: string;
  duration: string;
  image: string;
  price: number;
  originalPrice: number;
  discount: number;
}

const deals: Deal[] = [
  {
    id: '1',
    title: 'Essence of the Emerald Isle',
    location: 'Ireland',
    duration: '9 Days',
    image: 'https://images.unsplash.com/photo-1693342563508-75ff43f43198?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxpcmVsYW5kJTIwbGFuZHNjYXBlfGVufDF8fHx8MTc2MjU0MzA2OXww&ixlib=rb-4.1.0&q=80&w=1080',
    price: 1299,
    originalPrice: 4330,
    discount: 70,
  },
  {
    id: '2',
    title: 'Tropical Breeze & All Inclusive in Jaco',
    location: 'Costa Rica',
    duration: '8 Days',
    image: 'https://images.unsplash.com/photo-1626060451577-8b90a394e355?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb3N0YSUyMHJpY2ElMjBiZWFjaHxlbnwxfHx8fDE3NjI0MzIzMDB8MA&ixlib=rb-4.1.0&q=80&w=1080',
    price: 1349,
    originalPrice: 4497,
    discount: 70,
  },
  {
    id: '3',
    title: 'Coastal Cities & Cultural Treasures',
    location: 'Portugal',
    duration: '9 Days',
    image: 'https://images.unsplash.com/photo-1667326098780-0b64236a7017?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwb3J0dWdhbCUyMGNvYXN0YWwlMjBjaXR5fGVufDF8fHx8MTc2MjU0MzA3MHww&ixlib=rb-4.1.0&q=80&w=1080',
    price: 1349,
    originalPrice: 4497,
    discount: 70,
  },
  {
    id: '4',
    title: 'Southeast Asian Odyssey',
    location: 'Vietnam, Cambodia & Thailand',
    duration: '19 Days',
    image: 'https://images.unsplash.com/photo-1693276206317-a78574082bfc?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhbmdrb3IlMjB3YXQlMjB0ZW1wbGV8ZW58MXx8fHwxNzYyNTQzMDc0fDA&ixlib=rb-4.1.0&q=80&w=1080',
    price: 2599,
    originalPrice: 8663,
    discount: 70,
  },
  {
    id: '5',
    title: "From Medellin Streets to Cartagena's Shore",
    location: 'Colombia',
    duration: '7 Days',
    image: 'https://images.unsplash.com/photo-1656130727374-e99edc2b8ba4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb2xvbWJpYSUyMGNhcnRhZ2VuYXxlbnwxfHx8fDE3NjI1NDMwNzR8MA&ixlib=rb-4.1.0&q=80&w=1080',
    price: 899,
    originalPrice: 2997,
    discount: 70,
  },
  {
    id: '6',
    title: 'Island Paradise Discovery',
    location: 'Bali',
    duration: '12 Days',
    image: 'https://images.unsplash.com/photo-1669545192473-f4d88714fe2f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxiYWxpJTIwdGVtcGxlJTIwc3Vuc2V0fGVufDF8fHx8MTc2MjQ2OTM4NHww&ixlib=rb-4.1.0&q=80&w=1080',
    price: 1799,
    originalPrice: 5997,
    discount: 70,
  },
];

export function HotDealsCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [timeLeft, setTimeLeft] = useState({ days: 5, hours: 0, minutes: 0 });
  const [slidesPerView, setSlidesPerView] = useState(4);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev.minutes > 0) {
          return { ...prev, minutes: prev.minutes - 1 };
        } else if (prev.hours > 0) {
          return { ...prev, hours: prev.hours - 1, minutes: 59 };
        } else if (prev.days > 0) {
          return { days: prev.days - 1, hours: 23, minutes: 59 };
        }
        return prev;
      });
    }, 60000);

    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 640) {
        setSlidesPerView(1);
      } else if (window.innerWidth < 1024) {
        setSlidesPerView(2);
      } else if (window.innerWidth < 1280) {
        setSlidesPerView(3);
      } else {
        setSlidesPerView(4);
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    const autoplay = setInterval(() => {
      handleNext();
    }, 4000);

    return () => clearInterval(autoplay);
  }, [currentIndex, slidesPerView]);

  const handlePrev = () => {
    setCurrentIndex(prev => (prev === 0 ? deals.length - slidesPerView : prev - 1));
  };

  const handleNext = () => {
    setCurrentIndex(prev => (prev >= deals.length - slidesPerView ? 0 : prev + 1));
  };

  return (
    <section className="bg-blue-50 pt-12 pb-6 pl-6 lg:pl-12 relative overflow-x-hidden">
      <div className="max-w-full">
        {/* Header */}
        <div className="flex items-center justify-between mb-6 pr-6 lg:pr-12">
          <div>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-neutral-900 mb-2"
            >
              <span className="inline-flex items-center gap-1">
                Black Friday Hot Deals.
                <Flame className="w-8 h-8 text-orange-500" />
                <span className="text-neutral-700 ml-1">This week's biggest discounts.</span>
              </span>
            </motion.h2>
          </div>
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="hidden md:flex items-center gap-2 bg-primary/10 backdrop-blur-sm border border-primary/20 rounded-full px-6 py-3"
          >
            <span className="text-neutral-900">{timeLeft.days} days left</span>
          </motion.div>
        </div>

        {/* Carousel */}
        <div className="relative mb-4 pt-4 pb-2">
          <div className="overflow-hidden">
            <motion.div
              className="flex"
              animate={{
                x: `-${currentIndex * (100 / slidesPerView)}%`,
              }}
              transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            >
              {deals.map((deal, index) => (
                <div
                  key={deal.id}
                  className="flex-shrink-0 px-2"
                  style={{ width: `${100 / slidesPerView}%` }}
                >
                  <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    className="relative rounded-3xl overflow-hidden group cursor-pointer h-[450px]"
                    style={{ overflow: 'hidden' }}
                  >
                    {/* Background Image */}
                    <div className="absolute inset-0">
                      <ImageWithFallback
                        src={deal.image}
                        alt={deal.title}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
                    </div>

                    {/* Badge */}
                    <div className="absolute top-4 left-4 flex items-center gap-2 bg-gradient-to-r from-orange-500 to-red-500 text-white px-4 py-2 rounded-full">
                      <Flame className="w-4 h-4" />
                      <span className="text-sm">Black Friday Hot Deal</span>
                    </div>

                    {/* Content */}
                    <div className="absolute bottom-0 left-0 right-0 p-6">
                      <h3 className="text-white mb-2">{deal.title}</h3>
                      <p className="text-neutral-300 text-sm mb-4">
                        {deal.location} in {deal.duration}
                      </p>

                      {/* Price Section */}
                      <div className="flex items-center justify-between">
                        <div className="flex items-baseline gap-2">
                          <span className="text-white">From AED {deal.price.toLocaleString()}</span>
                          <span className="text-neutral-400 text-sm line-through">
                            AED {deal.originalPrice.toLocaleString()}
                          </span>
                        </div>
                        <motion.div
                          whileHover={{ scale: 1.1 }}
                          className="bg-white text-neutral-900 px-4 py-1.5 rounded-full"
                        >
                          -{deal.discount}%
                        </motion.div>
                      </div>
                    </div>
                  </motion.div>
                </div>
              ))}
            </motion.div>
          </div>

        </div>

        {/* Bottom Row: See All Deals Button + Navigation Arrows */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="flex items-center justify-between pr-6 lg:pr-12"
        >
          {/* See All Deals Button */}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-white text-neutral-900 px-6 py-3 rounded-full hover:bg-neutral-100 transition-colors"
          >
            See all deals
          </motion.button>

          {/* Navigation Arrows */}
          <div className="flex items-center gap-2">
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={handlePrev}
              className="w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-lg hover:shadow-xl transition-shadow"
            >
              <ChevronLeft className="w-5 h-5 text-neutral-900" />
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={handleNext}
              className="w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-lg hover:shadow-xl transition-shadow"
            >
              <ChevronRight className="w-5 h-5 text-neutral-900" />
            </motion.button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
