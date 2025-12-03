'use client';

import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Button } from './ui/button';
import { ArrowRight } from 'lucide-react';

export function ExploreWorldBanner() {
  const sectionRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
    layoutEffect: false
  });

  const y = useTransform(
    scrollYProgress,
    [0, 1],
    ['-10%', '10%']
  );

  return (
    <section ref={sectionRef} className="relative overflow-hidden min-h-[500px] md:min-h-[600px] flex items-center" style={{ willChange: 'scroll-position' }}>
      {/* Parallax Background Image */}
      <motion.div
        style={{ 
          y,
          backgroundImage: 'url(https://images.unsplash.com/photo-1664263722962-4590c42ab5a7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhZHZlbnR1cmUlMjBuYXR1cmUlMjB0cmF2ZWwlMjBtb3VudGFpbnN8ZW58MXx8fHwxNzYyNjI5NjA5fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral)',
          willChange: 'transform',
          transform: 'translateZ(0)'
        }}
        className="absolute inset-0 w-full h-[150%] top-[-25%] bg-cover bg-center"
      >
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-primary/98 via-primary/95 to-accent/96"></div>
        {/* Transparent Color Overlay */}
        <div className="absolute inset-0 bg-black/50"></div>
      </motion.div>

      {/* Animated Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-white rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-white rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
      </div>

      {/* Content */}
      <div className="relative max-w-[1400px] mx-auto px-6 lg:px-12 py-24">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="max-w-4xl mx-auto text-center"
        >
          {/* Premium Badge */}
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ type: "spring", stiffness: 200, delay: 0.1 }}
            className="inline-block mb-6"
          >
            <span className="bg-white/20 backdrop-blur-sm text-white px-6 py-2 rounded-full border border-white/30">
              Start Your Journey
            </span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-white mb-6 text-4xl lg:text-6xl"
          >
            Explore the World With Us
          </motion.h2>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="text-white/95 text-lg md:text-xl mb-8 max-w-2xl mx-auto"
          >
            Exciting flight deals and tour packages!
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <Button 
              size="lg" 
              className="bg-yellow-500 text-black hover:bg-yellow-400 shadow-xl hover:shadow-2xl transition-all duration-300 group px-8 py-6 text-lg"
            >
              Discover Packages
              <motion.div
                className="ml-2"
                animate={{ x: [0, 5, 0] }}
                transition={{ 
                  repeat: Infinity, 
                  duration: 1.5,
                  ease: "easeInOut"
                }}
              >
                <ArrowRight className="h-5 w-5" />
              </motion.div>
            </Button>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
