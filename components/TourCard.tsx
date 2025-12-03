import React from 'react';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Clock, Star, ArrowRight } from 'lucide-react';
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
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      className="h-full"
    >
      <Card className="overflow-hidden group border border-neutral-200 shadow-md hover:shadow-xl transition-all duration-300 bg-white rounded-2xl relative h-full flex flex-col">
        {/* Image Section */}
        <div className="relative h-48 overflow-hidden">
          <div className="absolute inset-0">
            <ImageWithFallback
              src={image}
              alt={title}
              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
            />
          </div>
          
          {/* Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
          
          {/* Top Badges */}
          <div className="absolute top-3 left-3 right-3 flex items-start justify-between z-10">
            <Badge className="bg-white text-neutral-900 font-medium px-3 py-1 rounded-full border-0 shadow-sm">
              Best Seller
            </Badge>
            
            <div className="flex items-center gap-1 bg-white/95 backdrop-blur-sm rounded-full px-2.5 py-1 shadow-sm">
              <Star className="w-3.5 h-3.5 text-yellow-500 fill-yellow-500" />
              <span className="text-sm font-semibold text-neutral-900">{rating}</span>
              <span className="text-xs text-neutral-600">({reviewCount})</span>
            </div>
          </div>
          
          {/* Duration - Bottom Left */}
          <div className="absolute bottom-3 left-3 z-10">
            <div className="bg-white rounded-lg px-3 py-1.5 shadow-md flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5 text-neutral-600" />
              <span className="text-xs font-medium text-neutral-900">{duration}</span>
            </div>
          </div>
        </div>
        
        {/* Content Section */}
        <div className="p-5 flex-1 flex flex-col">
          {/* Title */}
          <h3 className="text-lg font-bold text-neutral-900 mb-3 line-clamp-2 leading-tight group-hover:text-primary transition-colors">
            {title}
          </h3>
          
          {/* Highlights */}
          {highlights.length > 0 && (
            <div className="mb-4 flex-1">
              <ul className="space-y-2">
                {highlights.slice(0, 3).map((highlight, index) => (
                  <li key={index} className="flex items-start gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-neutral-400 mt-2 flex-shrink-0" />
                    <span className="text-sm text-neutral-700 leading-relaxed">{highlight}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
          
          {/* Price and CTA */}
          <div className="mt-auto pt-4 border-t border-neutral-100">
            <div className="flex items-center justify-between mb-3">
              <div>
                <p className="text-[10px] text-neutral-600 uppercase tracking-wide mb-0.5">From</p>
                <p className="flex items-baseline gap-1">
                  <span className="text-xs text-neutral-600 font-medium">{currency}</span>
                  <span className="text-xl font-bold text-neutral-900">{price.toLocaleString()}</span>
                </p>
              </div>
            </div>
            
            <Button 
              onClick={handleBookNow}
              className="w-full bg-yellow-400 hover:bg-yellow-500 text-neutral-900 rounded-lg h-10 font-semibold shadow-md hover:shadow-lg transition-all border-0"
            >
              <span className="flex items-center justify-center gap-2">
                Book Now
                <ArrowRight className="w-4 h-4" />
              </span>
            </Button>
          </div>
        </div>
      </Card>
    </motion.div>
  );
}
