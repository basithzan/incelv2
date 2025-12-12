'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';

interface PageHeroProps {
    image: string;
    title: React.ReactNode;
    subtitle?: string;
    children?: React.ReactNode;
    height?: string;
    overlayOpacity?: number;
}

export function PageHero({
    image,
    title,
    subtitle,
    children,
    height = "60vh",
    overlayOpacity = 0.5
}: PageHeroProps) {
    const ref = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ["start start", "end start"]
    });

    const y = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
    const opacity = useTransform(scrollYProgress, [0, 1], [1, 0.5]);
    const scale = useTransform(scrollYProgress, [0, 1], [1, 1.1]);

    return (
        <div
            ref={ref}
            className="relative flex items-center justify-center overflow-hidden w-full"
            style={{ height, minHeight: '500px' }}
        >
            {/* Parallax Background */}
            <motion.div
                className="absolute inset-0 z-0"
                style={{ y, scale, opacity }}
            >
                <div
                    className="absolute inset-0 bg-cover bg-center"
                    style={{ backgroundImage: `url(${image})` }}
                />
                <div
                    className="absolute inset-0 bg-neutral-900"
                    style={{ opacity: overlayOpacity }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-neutral-900 via-neutral-900/50 to-transparent" />
            </motion.div>

            {/* Content */}
            <div className="relative z-10 w-full max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-12 text-center">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                >
                    <div className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 text-white tracking-tighter leading-tight">
                        {title}
                    </div>

                    {subtitle && (
                        <p className="text-xl md:text-2xl text-white/90 font-light max-w-3xl mx-auto leading-relaxed drop-shadow-md">
                            {subtitle}
                        </p>
                    )}

                    {children && (
                        <div className="mt-8">
                            {children}
                        </div>
                    )}
                </motion.div>
            </div>
        </div>
    );
}
