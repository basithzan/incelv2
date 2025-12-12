import React from 'react';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Clock, Star, ArrowRight, ArrowUpRight, MapPin } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { motion } from 'framer-motion';
import { toast } from 'sonner';

interface TourCardProps {
  id: string;
  title: string;
  image: string;
  duration: string;
  price: number;
  currency?: string;
  rating?: number;
  reviewCount?: number;
  highlights: string[];
}

export function TourCard({
  id,
  title,
  image,
  duration,
  price,
  currency = 'AED',
  rating = 4.8,
  reviewCount = 120,
  highlights
}: TourCardProps) {
  const handleBookNow = () => {
    toast.success('Great choice! Redirecting to booking page...', {
      description: `${title} - ${currency} ${price}`
    });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className="h-full"
    >
      <div className="group relative h-[380px] w-full overflow-hidden rounded-[1.5rem] bg-white dark:bg-neutral-900 shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-1">
        {/* Image & Overlay */}
        <div className="absolute inset-0 h-full w-full">
          <ImageWithFallback
            src={image}
            alt={title}
            className="h-full w-full object-cover transition-transform duration-700 ease-in-out group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent opacity-80 group-hover:opacity-90 transition-opacity" />
        </div>

        {/* Top Badges */}
        <div className="absolute top-4 left-4 right-4 flex items-start justify-between z-10">
          <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-full px-3 py-1 flex items-center gap-1.5">
            <Clock className="w-3.5 h-3.5 text-white/90" />
            <span className="text-xs font-medium text-white">{duration}</span>
          </div>
          <div className="flex items-center gap-1 bg-amber-400/90 backdrop-blur-md text-neutral-900 rounded-full px-2.5 py-1 shadow-sm">
            <Star className="w-3.5 h-3.5 fill-current" />
            <span className="text-xs font-bold">{rating}</span>
          </div>
        </div>

        {/* Content */}
        <div className="absolute bottom-0 left-0 right-0 p-6 z-20">
          <h3 className="text-xl font-bold text-white mb-2 line-clamp-2 leading-tight group-hover:text-primary-foreground transition-colors">
            {title}
          </h3>

          {highlights.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-4">
              {highlights.slice(0, 2).map((highlight, index) => (
                <span key={index} className="text-[10px] bg-white/10 backdrop-blur text-white/90 px-2 py-1 rounded-md border border-white/10">
                  {highlight}
                </span>
              ))}
            </div>
          )}

          <div className="flex items-end justify-between pt-4 border-t border-white/15">
            <div>
              <p className="text-[10px] text-white/60 uppercase tracking-wider mb-1">Price per person</p>
              <div className="flex items-baseline gap-1">
                <span className="text-xs font-medium text-primary">{currency}</span>
                <span className="text-xl font-bold text-white">{price.toLocaleString()}</span>
              </div>
            </div>

            <Button
              onClick={handleBookNow}
              size="sm"
              className="rounded-full bg-white text-neutral-900 hover:bg-primary hover:text-white transition-colors h-10 px-5 font-medium"
            >
              Book Now
            </Button>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
