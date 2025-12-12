'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
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

    const nextSlide = () => {
        setActiveIndex((prev) => (prev + 1) % packages.length);
    };

    const prevSlide = () => {
        setActiveIndex((prev) => (prev - 1 + packages.length) % packages.length);
    };

    const getCardStyles = (index: number) => {
        const total = packages.length;
        // Calculate circular offset
        let offset = (index - activeIndex + total) % total;
        // Adjust for shortest path (e.g. 4 -> -1 in array of 5)
        if (offset > total / 2) {
            offset -= total;
        }

        // States
        if (offset === 0) {
            return {
                opacity: 1,
                x: '0%',
                scale: 1,
                z: 0,
                zIndex: 50,
                rotateY: 0,
                pointerEvents: 'auto'
            };
        } else if (offset === 1) { // Right
            return {
                opacity: 0.7, // Boosted from 0.6
                x: '50%',
                scale: 0.85,
                z: -100,
                zIndex: 10,
                rotateY: -25, // Reduced rotation for better visibility
                pointerEvents: 'none'
            };
        } else if (offset === -1) { // Left
            return {
                opacity: 0.7, // Boosted from 0.6
                x: '-50%',
                scale: 0.85,
                z: -100,
                zIndex: 10,
                rotateY: 25,
                pointerEvents: 'none'
            };
        } else if (offset === 2) { // Far Right
            return {
                opacity: 0.4, // Boosted from 0.3
                x: '85%',
                scale: 0.7,
                z: -200,
                zIndex: 5,
                rotateY: -35,
                pointerEvents: 'none'
            };
        } else if (offset === -2) { // Far Left
            return {
                opacity: 0.4, // Boosted from 0.3
                x: '-85%',
                scale: 0.7,
                z: -200,
                zIndex: 5,
                rotateY: 35,
                pointerEvents: 'none'
            };
        } else { // Hidden (Unified Center Deep)
            return {
                opacity: 0,
                x: '0%', // Center to prevent flyover
                scale: 0.4,
                z: -400, // Deep in back
                zIndex: 0,
                rotateY: 0, // Reset rotation
                pointerEvents: 'none'
            };
        }
    };

    return (
        <div className="relative w-full py-12">
            {/* Header - Centered & Styled like What We Offer */}
            <div className="text-center mb-16 relative z-10">
                <h2 className="mb-1 text-4xl lg:text-5xl font-bold">
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent">
                        Latest Packages
                    </span>
                </h2>
                <p className="text-xl text-neutral-600 dark:text-neutral-400 max-w-2xl mx-auto font-light">
                    Curated experiences just for you
                </p>
            </div>

            {/* Navigation Arrows - Moved to sides with Tailed Arrows & High Z-Index */}
            <button
                onClick={prevSlide}
                className="absolute left-4 lg:left-12 top-[60%] -translate-y-1/2 z-50 w-14 h-14 rounded-full bg-white/90 backdrop-blur-md border border-neutral-200 text-neutral-900 flex items-center justify-center shadow-xl hover:scale-110 hover:bg-white transition-all cursor-pointer pointer-events-auto"
                aria-label="Previous slide"
            >
                <ArrowLeft className="w-6 h-6" />
            </button>

            <button
                onClick={nextSlide}
                className="absolute right-4 lg:right-12 top-[60%] -translate-y-1/2 z-50 w-14 h-14 rounded-full bg-white/90 backdrop-blur-md border border-neutral-200 text-neutral-900 flex items-center justify-center shadow-xl hover:scale-110 hover:bg-white transition-all cursor-pointer pointer-events-auto"
                aria-label="Next slide"
            >
                <ArrowRight className="w-6 h-6" />
            </button>

            <div className="relative h-[550px] w-full flex items-center justify-center overflow-visible perspective-[1200px]">
                {/* Render ALL packages - No AnimatePresence needed as we don't unmount */}
                {packages.map((pkg, index) => {
                    const styles = getCardStyles(index);
                    const isCenter = index === activeIndex;

                    return (
                        <motion.div
                            key={pkg.id}
                            layoutId={pkg.id}
                            animate={styles as any} // Cast because Framer types sometimes strict on custom objects
                            transition={{
                                duration: 0.8,
                                type: "spring",
                                stiffness: 120,
                                damping: 20
                            }}
                            className={`absolute w-[85%] md:w-[60%] lg:w-[45%] h-full rounded-[2rem] overflow-hidden shadow-2xl transition-shadow duration-300 ${isCenter ? 'shadow-black/50 cursor-pointer' : 'shadow-black/20 pointer-events-none grayscale-[0.3]'}`}
                            onClick={() => isCenter && (window.location.href = `#/packages/${pkg.id}`)}
                        >
                            <ImageWithFallback
                                src={pkg.image}
                                alt={pkg.title}
                                className={`w-full h-full object-cover transition-transform duration-700 ${isCenter ? 'scale-100' : 'scale-110'}`}
                            />
                            {/* Gradient Overlay for Text Visibility */}
                            <div className={`absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent transition-opacity ${isCenter ? 'opacity-100' : 'opacity-60'}`} />

                            <motion.div
                                animate={{ opacity: isCenter ? 1 : 0, y: isCenter ? 0 : 30 }}
                                transition={{ duration: 0.4, delay: isCenter ? 0.2 : 0 }}
                                className="absolute bottom-0 left-0 right-0 p-8 text-white"
                            >
                                <div className="flex items-center gap-2 mb-3">
                                    <span className="bg-primary px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider">{pkg.category}</span>
                                    <span className="flex items-center text-xs font-medium bg-white/20 backdrop-blur-md px-3 py-1 rounded-full"><MapPin className="w-3 h-3 mr-1" /> {pkg.location}</span>
                                </div>

                                <h3 className="text-3xl md:text-5xl font-bold mb-4 leading-none tracking-tight shadow-black drop-shadow-md">{pkg.title}</h3>

                                {isCenter && (
                                    <div className="flex items-end justify-between border-t border-white/20 pt-4 mt-4">
                                        <div>
                                            <p className="text-sm text-white/70 mb-1">Starting Price</p>
                                            <div className="text-2xl font-bold text-primary">AED {pkg.price.toLocaleString()}</div>
                                        </div>
                                        <Button size="lg" className="rounded-full bg-white text-black hover:bg-primary hover:text-white border-0 font-bold px-6">
                                            View Details <ArrowRight className="w-4 h-4 ml-2" />
                                        </Button>
                                    </div>
                                )}
                            </motion.div>
                        </motion.div>
                    );
                })}
            </div>
        </div>
    );
}
