'use client';

import { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { Sparkles, Plane, Hotel, FileText, Car, Ship, Map, ArrowRight, Search, Play } from 'lucide-react';
import { Button } from './ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from './ui/dialog';
import { motion, AnimatePresence } from 'framer-motion'; // Removed useScroll, useTransform
import { toast } from 'sonner';
import { ImageWithFallback } from './figma/ImageWithFallback';

interface HeroWithSearchProps {
  heading: string;
  subheading: string;
  backgroundImage: string;
}

export function HeroWithSearch({ heading, subheading, backgroundImage }: HeroWithSearchProps) {
  const [isBookNowOpen, setIsBookNowOpen] = useState(false);
  const [isVideoLoaded, setIsVideoLoaded] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  // NOTE: Removed scroll parallax (useScroll/useTransform) for max performance

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.play().catch((error) => {
        console.log('Video autoplay failed:', error);
      });
    }
  }, []);

  return (
    <div className="relative h-screen w-full overflow-hidden bg-black">
      {/* Intro Curtain Animation - Kept as it is one-time */}
      <motion.div
        initial={{ scaleY: 1 }}
        animate={{ scaleY: 0 }}
        transition={{ duration: 1.5, ease: [0.76, 0, 0.24, 1], delay: 0.5 }}
        className="absolute inset-0 bg-neutral-900 z-50 origin-top pointer-events-none"
      >
        <div className="flex items-center justify-center h-full">
          <motion.div
            initial={{ opacity: 1 }}
            animate={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="flex items-center justify-center"
          >
            <ImageWithFallback 
              src="https://inceltourism.com/wp-content/uploads/elementor/thumbs/logowhite-qhzbd7e4e3m50i16db2lblzaxkieai6seqqrl7p81s.png"
              alt="Incel Tourism"
              className="h-24 w-auto"
            />
          </motion.div>
        </div>
      </motion.div>

      {/* Cinematic Video Background - Static now */}
      <div
        className="absolute inset-0 z-0"
      >
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-black/20 z-10" />
        <video
          ref={videoRef}
          // onLoadedData={() => setIsVideoLoaded(true)} // Not needed if we don't hide it
          autoPlay
          loop
          muted={true}
          playsInline
          className="w-full h-full object-cover"
        >
          <source src="/dubai.mp4" type="video/mp4" />
        </video>
      </div>

      {/* Main Content */}
      <div
        className="relative z-20 h-full flex flex-col items-center justify-center text-center px-4 max-w-7xl mx-auto"
      >
        <motion.div
          initial={{ opacity: 0, y: 100 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 1.8, ease: "easeOut" }}
          className="space-y-6"
        >
          {/* Badge */}
          <div className="flex justify-center mb-8">
            <div className="px-6 py-2 rounded-full border border-white/10 bg-white/5 backdrop-blur-md text-white/90 text-sm tracking-[0.2em] uppercase font-light">
              Redefining Luxury Travel
            </div>
          </div>

          {/* Huge Cinematic Title */}
          <h1 className="text-6xl md:text-8xl lg:text-[10rem] font-bold text-white tracking-tighter leading-[0.9] mix-blend-overlay opacity-90">
            DISCOVER
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-neutral-200 to-neutral-500">THE WORLD</span>
          </h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 2.2 }}
            className="text-lg md:text-xl text-white/70 max-w-xl mx-auto font-light leading-relaxed mt-8 mb-16 md:mb-20"
          >
            {subheading}
          </motion.p>

          {/* Floating Actions */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 2.4 }}
            className="flex items-center justify-center gap-6 mt-8"
          >
            <Button
              size="lg"
              onClick={() => setIsBookNowOpen(true)}
              className="h-16 px-10 rounded-full bg-white text-black hover:bg-neutral-200 font-bold text-lg tracking-wide transition-all shadow-xl hover:scale-105"
            >
              Book Now
            </Button>
          </motion.div>
        </motion.div>
      </div>

      {/* Book Now Modal */}
      <Dialog open={isBookNowOpen} onOpenChange={setIsBookNowOpen}>
        <DialogContent className="max-w-2xl bg-neutral-900/95 backdrop-blur-3xl border-white/10 shadow-2xl text-white p-0 overflow-hidden rounded-3xl">
          <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-primary to-accent" />

          <div className="p-8">
            <DialogHeader className="mb-6">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-10 h-10 rounded-full bg-blue-500/20 flex items-center justify-center">
                  <Plane className="w-5 h-5 text-blue-400" />
                </div>
                <span className="text-blue-400 font-medium tracking-wide text-sm">BOOKING REQUEST</span>
              </div>
              <DialogTitle className="text-4xl font-bold">Where to next?</DialogTitle>
              <DialogDescription className="text-neutral-400 text-lg">
                Your luxury escape begins with this form.
              </DialogDescription>
            </DialogHeader>

            <form className="space-y-6" onSubmit={(e) => {
              e.preventDefault();
              toast.success('Request received. Our concierge will contact you shortly.');
              setIsBookNowOpen(false);
            }}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-xs font-bold text-neutral-500 uppercase tracking-wider">Full Name</label>
                  <Input placeholder="John Doe" required className="bg-white/5 border-white/10 focus:border-blue-500/50 text-white h-12 rounded-xl" />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold text-neutral-500 uppercase tracking-wider">Contact</label>
                  <Input placeholder="Email or Phone" required className="bg-white/5 border-white/10 focus:border-blue-500/50 text-white h-12 rounded-xl" />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold text-neutral-500 uppercase tracking-wider">Destination</label>
                  <Select>
                    <SelectTrigger className="bg-white/5 border-white/10 text-white h-12 rounded-xl">
                      <SelectValue placeholder="Select Destination" />
                    </SelectTrigger>
                    <SelectContent className="bg-neutral-800 border-white/10 text-white">
                      <SelectItem value="dubai">Dubai</SelectItem>
                      <SelectItem value="maldives">Maldives</SelectItem>
                      <SelectItem value="europe">Europe</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold text-neutral-500 uppercase tracking-wider">Dates</label>
                  <Input type="date" className="bg-white/5 border-white/10 focus:border-blue-500/50 text-white h-12 rounded-xl" />
                </div>
              </div>

              <div className="flex justify-end gap-3 pt-4 border-t border-white/10">
                <Button type="button" variant="ghost" onClick={() => setIsBookNowOpen(false)} className="text-neutral-400 hover:text-white rounded-xl">Cancel</Button>
                <Button type="submit" className="bg-white text-black hover:bg-neutral-200 px-8 rounded-xl font-bold h-12">Submit Request</Button>
              </div>
            </form>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
