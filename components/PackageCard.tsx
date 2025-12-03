import { Card } from './ui/card';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { Calendar, MapPin, Star, ArrowRight, Heart, Clock, Users } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { motion } from 'framer-motion';
import { useState } from 'react';

interface PackageCardProps {
  id: string;
  title: string;
  image: string;
  location: string;
  duration: string;
  price: number;
  currency?: string;
  category: string;
  highlights?: string[];
}

export function PackageCard({
  id,
  title,
  image,
  location,
  duration,
  price,
  currency = 'AED',
  category,
  highlights = []
}: PackageCardProps) {
  const [isLiked, setIsLiked] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      className="h-full"
    >
      <Card className="overflow-hidden group border border-neutral-200 shadow-md hover:shadow-xl transition-all duration-300 bg-white rounded-xl relative h-full flex flex-col">
        {/* Image Section */}
        <div className="relative h-64 overflow-hidden">
          <div className="absolute inset-0">
            <ImageWithFallback
              src={image}
              alt={title}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            />
          </div>
          
          {/* Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
          
          {/* Category Badge - Top Left (White pill) */}
          <div className="absolute top-3 left-3 z-10">
            <Badge className="bg-white text-neutral-900 font-medium px-3 py-1 rounded-full border-0 shadow-sm">
              {category}
            </Badge>
          </div>
          
          {/* Rating Badge - Top Right (White pill) */}
          <div className="absolute top-3 right-3 z-10">
            <Badge className="bg-white text-neutral-900 font-medium px-3 py-1 rounded-full border-0 shadow-sm flex items-center gap-1.5">
              <Star className="w-3.5 h-3.5 text-yellow-500 fill-yellow-500" />
              <span className="text-sm font-semibold">4.9</span>
            </Badge>
          </div>
          
          {/* Price - Bottom Left (White box) */}
          <div className="absolute bottom-3 left-3 z-10">
            <div className="bg-white rounded-lg px-3 py-2 shadow-lg">
              <p className="text-[10px] text-neutral-600 uppercase tracking-wide mb-0.5 font-medium">From</p>
              <p className="flex items-baseline gap-1">
                <span className="text-xs text-neutral-600 font-medium">{currency}</span>
                <span className="text-xl font-bold text-neutral-900">{price.toLocaleString()}</span>
              </p>
            </div>
          </div>
          
          {/* Location - Bottom Right (Black pill) */}
          <div className="absolute bottom-3 right-3 z-10">
            <Badge className="bg-neutral-900 text-white font-medium px-3 py-1.5 rounded-full border-0 shadow-lg flex items-center gap-1.5">
              <MapPin className="w-3.5 h-3.5 text-white" />
              <span className="text-xs font-medium">{location}</span>
            </Badge>
          </div>
        </div>
        
        {/* Content Section */}
        <div className="p-5 flex-1 flex flex-col">
          {/* Title */}
          <h3 className="text-lg font-bold text-neutral-900 mb-4 line-clamp-2 leading-tight">
            {title}
          </h3>
          
          {/* Duration & Group Info */}
          <div className="flex items-center gap-4 mb-4">
            <div className="flex items-center gap-2 text-neutral-700">
              <Calendar className="w-4 h-4 text-neutral-600" />
              <span className="text-sm">{duration}</span>
            </div>
            <div className="flex items-center gap-2 text-neutral-700">
              <Users className="w-4 h-4 text-neutral-600" />
              <span className="text-sm">Group</span>
            </div>
          </div>
          
          {/* Highlights */}
          {highlights.length > 0 && (
            <div className="mb-5 flex-1">
              <ul className="space-y-2.5">
                {highlights.slice(0, 2).map((highlight, index) => (
                  <li key={index} className="flex items-start gap-2.5">
                    <div className="w-1.5 h-1.5 rounded-full bg-neutral-400 mt-2 flex-shrink-0" />
                    <span className="text-sm text-neutral-700 leading-relaxed">{highlight}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
          
          {/* CTA Button */}
          <div className="mt-auto pt-4 border-t border-neutral-200">
            <Button 
              asChild 
              className="w-full bg-yellow-400 hover:bg-yellow-500 text-neutral-900 rounded-lg h-11 font-semibold shadow-lg hover:shadow-xl transition-all border-0"
            >
              <a href={`#/packages/${id}`} className="flex items-center justify-center gap-2">
                <span>Explore Package</span>
                <ArrowRight className="w-4 h-4" />
              </a>
            </Button>
            
            {/* Footer Info */}
            <div className="flex items-center justify-between mt-3 text-xs text-neutral-600">
              <div className="flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5" />
                <span>Book now, pay later</span>
              </div>
              <div className="flex items-center gap-1.5">
                <div className="w-2 h-2 rounded-full bg-green-500" />
                <span>Available</span>
              </div>
            </div>
          </div>
        </div>
      </Card>
    </motion.div>
  );
}
