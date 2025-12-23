'use client';

import { useState, useCallback, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { ArrowLeft, ArrowRight, MapPin } from 'lucide-react';
import { Button } from './ui/button';

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
    const [activeIndex, setActiveIndex] = useState(0);
    const [direction, setDirection] = useState(0); // -1 for left, 1 for right

    const nextSlide = useCallback(() => {
        setDirection(1);
        setActiveIndex((prev) => (prev + 1) % packages.length);
    }, [packages.length]);

    const prevSlide = useCallback(() => {
        setDirection(-1);
        setActiveIndex((prev) => (prev - 1 + packages.length) % packages.length);
    }, [packages.length]);

    // Calculate offset with proper circular handling
    const getOffset = useCallback((index: number) => {
        const total = packages.length;
        let offset = index - activeIndex;
        
        // Normalize to shortest path around the circle
        if (offset > total / 2) {
            offset -= total;
        } else if (offset < -total / 2) {
            offset += total;
        }
        
        return offset;
    }, [activeIndex, packages.length]);

    // Symmetric card positioning
    const getCardTransform = useCallback((offset: number) => {
        // Center card
        if (offset === 0) {
            return {
                x: 0,
                scale: 1,
                rotateY: 0,
                zIndex: 50,
                opacity: 1,
            };
        }
        
        // Adjacent cards (offset = ±1)
        if (Math.abs(offset) === 1) {
            const xOffset = offset * 380; // Symmetric offset (increased for wider cards)
            return {
                x: xOffset,
                scale: 0.8,
                rotateY: offset * -15, // Slight rotation toward center
                zIndex: 30,
                opacity: 0.7,
            };
        }
        
        // Far cards (offset = ±2)
        if (Math.abs(offset) === 2) {
            const xOffset = offset * 560; // Further out (increased for wider cards)
            return {
                x: xOffset,
                scale: 0.6,
                rotateY: offset * -25,
                zIndex: 10,
                opacity: 0.4,
            };
        }
        
        // Hidden cards
        return {
            x: offset > 0 ? 700 : -700,
            scale: 0.5,
            rotateY: 0,
            zIndex: 0,
            opacity: 0,
        };
    }, []);

    // Sort cards by z-index for proper stacking
    const sortedPackages = useMemo(() => {
        return [...packages].map((pkg, index) => ({
            ...pkg,
            originalIndex: index,
            offset: getOffset(index),
        })).sort((a, b) => {
            const transformA = getCardTransform(a.offset);
            const transformB = getCardTransform(b.offset);
            return transformA.zIndex - transformB.zIndex;
        });
    }, [packages, getOffset, getCardTransform]);

    return (
        <div className="relative w-full py-12">
            {/* Header */}
            <div className="text-center mb-16 relative z-10">
                <h2 className="mb-1 text-4xl lg:text-5xl font-bold text-neutral-900">
                    Latest <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent">Packages</span>
                </h2>
                <p className="text-xl text-neutral-600 dark:text-neutral-400 max-w-2xl mx-auto font-light">
                    Curated experiences just for you
                </p>
            </div>

            {/* Navigation Arrows */}
            <button
                onClick={prevSlide}
                className="absolute left-4 lg:left-12 top-1/2 -translate-y-1/2 z-[60] w-14 h-14 rounded-full bg-white/90 backdrop-blur-md border border-neutral-200 text-neutral-900 flex items-center justify-center shadow-xl hover:scale-110 hover:bg-white transition-all cursor-pointer pointer-events-auto"
                aria-label="Previous slide"
            >
                <ArrowLeft className="w-6 h-6" />
            </button>

            <button
                onClick={nextSlide}
                className="absolute right-4 lg:right-12 top-1/2 -translate-y-1/2 z-[60] w-14 h-14 rounded-full bg-white/90 backdrop-blur-md border border-neutral-200 text-neutral-900 flex items-center justify-center shadow-xl hover:scale-110 hover:bg-white transition-all cursor-pointer pointer-events-auto"
                aria-label="Next slide"
            >
                <ArrowRight className="w-6 h-6" />
            </button>

            {/* Carousel Container */}
            <div 
                className="relative h-[550px] w-full flex items-center justify-center overflow-visible"
                style={{ perspective: '1200px' }}
            >
                {sortedPackages.map((pkg) => {
                    const offset = pkg.offset;
                    const transform = getCardTransform(offset);
                    const isCenter = offset === 0;
                    const isVisible = Math.abs(offset) <= 2;

                    if (!isVisible) return null;

                    return (
                        <motion.div
                            key={pkg.id}
                            initial={false}
                            animate={{
                                x: transform.x,
                                scale: transform.scale,
                                rotateY: transform.rotateY,
                                opacity: transform.opacity,
                                zIndex: transform.zIndex,
                            }}
                            transition={{
                                duration: 0.5,
                                ease: [0.32, 0.72, 0, 1], // Custom easing for smooth motion
                            }}
                            style={{
                                position: 'absolute',
                                transformStyle: 'preserve-3d',
                            }}
                            className={`w-[90%] md:w-[60%] lg:w-[520px] h-full rounded-[2rem] overflow-hidden shadow-2xl ${
                                isCenter 
                                    ? 'shadow-black/50 cursor-pointer' 
                                    : 'shadow-black/20 pointer-events-none grayscale-[0.2]'
                            }`}
                            onClick={() => isCenter && (window.location.href = `#/packages/${pkg.id}`)}
                        >
                            <ImageWithFallback
                                src={pkg.image}
                                alt={pkg.title}
                                className={`w-full h-full object-cover transition-transform duration-700 ${
                                    isCenter ? 'scale-100' : 'scale-105'
                                }`}
                            />
                            
                            {/* Gradient Overlay */}
                            <div className={`absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent transition-opacity duration-300 ${
                                isCenter ? 'opacity-100' : 'opacity-70'
                            }`} />

                            {/* Content */}
                            <motion.div
                                initial={false}
                                animate={{ 
                                    opacity: isCenter ? 1 : 0, 
                                    y: isCenter ? 0 : 20 
                                }}
                                transition={{ duration: 0.3, delay: isCenter ? 0.15 : 0 }}
                                className="absolute bottom-0 left-0 right-0 p-5 md:p-6 text-white"
                            >
                                <div className="flex flex-wrap items-center gap-2 mb-2">
                                    <span className="bg-primary px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider">
                                        {pkg.category}
                                    </span>
                                    <span className="flex items-center text-[10px] font-medium bg-white/20 backdrop-blur-md px-2.5 py-0.5 rounded-full">
                                        <MapPin className="w-2.5 h-2.5 mr-1" /> {pkg.location}
                                    </span>
                                </div>

                                <h3 className="text-xl md:text-2xl lg:text-3xl font-bold mb-3 leading-tight tracking-tight drop-shadow-lg">
                                    {pkg.title}
                                </h3>

                                {isCenter && (
                                    <motion.div 
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ duration: 0.3, delay: 0.2 }}
                                        className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-4 border-t border-white/20 pt-4 mt-4"
                                    >
                                        <div>
                                            <p className="text-xs text-white/70 mb-1">Starting Price</p>
                                            <div className="text-lg md:text-xl font-bold text-primary">
                                                AED {pkg.price.toLocaleString()}
                                            </div>
                                        </div>
                                        <Button 
                                            size="sm" 
                                            className="rounded-full bg-white text-black hover:bg-primary hover:text-white border-0 font-semibold px-4 text-sm"
                                        >
                                            View Details <ArrowRight className="w-3.5 h-3.5 ml-1.5" />
                                        </Button>
                                    </motion.div>
                                )}
                            </motion.div>
                        </motion.div>
                    );
                })}
            </div>

            {/* Dot Indicators */}
            <div className="flex justify-center gap-2 mt-8">
                {packages.map((_, index) => (
                    <button
                        key={index}
                        onClick={() => {
                            setDirection(index > activeIndex ? 1 : -1);
                            setActiveIndex(index);
                        }}
                        className={`w-2 h-2 rounded-full transition-all duration-300 ${
                            index === activeIndex 
                                ? 'bg-primary w-8' 
                                : 'bg-neutral-300 hover:bg-neutral-400'
                        }`}
                        aria-label={`Go to slide ${index + 1}`}
                    />
                ))}
            </div>
        </div>
    );
}
