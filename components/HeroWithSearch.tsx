'use client';

import { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { Sparkles, Plane, Hotel, FileText, Car, Ship, Map, X } from 'lucide-react';
import { Button } from './ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from './ui/dialog';
import { motion } from 'framer-motion';
import { toast } from 'sonner';
import GradientText from './GradientText';

interface HeroWithSearchProps {
  heading: string;
  subheading: string;
  backgroundImage: string;
}

export function HeroWithSearch({ heading, subheading, backgroundImage }: HeroWithSearchProps) {
  const [isSearching, setIsSearching] = useState(false);
  const [isBookNowOpen, setIsBookNowOpen] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    // Ensure video plays
    if (videoRef.current) {
      videoRef.current.play().catch((error) => {
        console.log('Video autoplay failed:', error);
      });
    }
  }, []);

  const handleFlightInquiry = () => {
    setIsSearching(true);
    setTimeout(() => {
      setIsSearching(false);
      toast.success('Flight inquiry submitted! We\'ll get back to you shortly.');
    }, 1500);
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Video Background */}
      <motion.div 
        initial={{ scale: 1.2, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 1.5, ease: "easeOut" }}
        className="absolute inset-0"
      >
        <video 
          ref={videoRef}
          autoPlay 
          loop 
          muted 
          playsInline
          className="absolute inset-0 w-full h-full object-cover"
        >
          <source src="/dubai.mp4" type="video/mp4" />
        </video>
        {/* Multi-layer gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-neutral-900/70 via-neutral-900/50 to-neutral-900/80" />
        <div className="absolute inset-0 bg-gradient-to-r from-primary/20 via-transparent to-accent/20" />
        
        {/* Animated mesh gradient */}
        <motion.div 
          className="absolute inset-0"
          animate={{
            background: [
              "radial-gradient(circle at 20% 50%, rgba(10,93,177,0.15) 0%, transparent 50%)",
              "radial-gradient(circle at 80% 50%, rgba(0,168,132,0.15) 0%, transparent 50%)",
              "radial-gradient(circle at 50% 80%, rgba(10,93,177,0.15) 0%, transparent 50%)",
              "radial-gradient(circle at 20% 50%, rgba(10,93,177,0.15) 0%, transparent 50%)",
            ],
          }}
          transition={{ duration: 15, repeat: Infinity }}
        />
        
        {/* Floating particles */}
        <div className="absolute inset-0">
          {[...Array(20)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 bg-white rounded-full"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
              animate={{
                y: [0, -50, 0],
                opacity: [0, 1, 0],
                scale: [0, 1.5, 0],
              }}
              transition={{
                duration: 3 + Math.random() * 4,
                repeat: Infinity,
                delay: Math.random() * 5,
              }}
            />
          ))}
        </div>
      </motion.div>

      {/* Content */}
      <div className="relative z-10 max-w-[1400px] mx-auto px-6 lg:px-12 w-full pt-32 pb-16">
        {/* Header Content */}
        <motion.div 
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="text-center mb-6 md:mb-16 -mt-8 md:-mt-24"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ delay: 0.4, type: "spring", stiffness: 200 }}
            className="inline-flex items-center gap-2 bg-white/15 backdrop-blur-xl border border-white/30 rounded-full px-4 py-2 md:px-6 md:py-3 mb-4 md:mb-8 shadow-2xl"
          >
            <span className="text-white font-medium text-xs md:text-base">UAE Licensed Travel Experts</span>
          </motion.div>
          
          <motion.h1 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.8 }}
            className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold mb-2 drop-shadow-2xl"
            style={{ lineHeight: '1.2' }}
          >
            <GradientText
              colors={["#40ffaa", "#F5A623", "#40ffaa", "#F5A623", "#40ffaa"]}
              animationSpeed={3}
              showBorder={false}
            >
              Explore the world with Incel Tourism
            </GradientText>
          </motion.h1>
          
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.8 }}
            className="text-sm sm:text-base md:text-xl lg:text-2xl text-white/95 drop-shadow-lg max-w-3xl mx-auto leading-relaxed mb-4 md:mb-8 px-2"
          >
            {subheading}
          </motion.p>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7, duration: 0.8 }}
            className="flex justify-center"
          >
            <Button
              onClick={() => setIsBookNowOpen(true)}
              className="bg-yellow-400 hover:bg-yellow-500 text-neutral-900 border-0 shadow-lg hover:shadow-xl transition-all px-6 py-4 md:px-8 md:py-6 text-base md:text-lg font-semibold rounded-full"
            >
              Book Now
            </Button>
          </motion.div>
        </motion.div>

        {/* Book Now Modal */}
        <Dialog open={isBookNowOpen} onOpenChange={setIsBookNowOpen}>
          <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto bg-white text-neutral-900">
            <DialogHeader>
              <DialogTitle className="text-2xl font-bold text-center text-neutral-900">Book Your Travel Package</DialogTitle>
              <DialogDescription className="text-center text-neutral-700">
                Fill in your details and we'll get back to you shortly
              </DialogDescription>
            </DialogHeader>
            
            <form className="space-y-6 mt-4" onSubmit={(e) => {
              e.preventDefault();
              toast.success('Booking inquiry submitted! We\'ll contact you soon.');
              setIsBookNowOpen(false);
            }}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-2 text-neutral-900">Full Name *</label>
                  <Input type="text" placeholder="John Doe" required className="text-neutral-900 bg-neutral-100 border-[0.5px]" />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2 text-neutral-900">Email *</label>
                  <Input type="email" placeholder="john@example.com" required className="text-neutral-900 bg-neutral-100 border-[0.5px]" />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2 text-neutral-900">Phone Number *</label>
                  <Input type="tel" placeholder="+971 50 123 4567" required className="text-neutral-900 bg-neutral-100 border-[0.5px]" />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2 text-neutral-900">Travel Date</label>
                  <Input type="date" className="text-neutral-900 bg-neutral-100 border-[0.5px]" />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2 text-neutral-900">Destination</label>
                  <Select>
                    <SelectTrigger className="text-neutral-900 bg-neutral-100 border-[0.5px]">
                      <SelectValue placeholder="Select destination" />
                    </SelectTrigger>
                    <SelectContent className="text-neutral-900">
                      <SelectItem value="dubai">Dubai, UAE</SelectItem>
                      <SelectItem value="maldives">Maldives</SelectItem>
                      <SelectItem value="turkey">Turkey</SelectItem>
                      <SelectItem value="egypt">Egypt</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2 text-neutral-900">Number of Travelers</label>
                  <Input type="number" placeholder="2" min="1" className="text-neutral-900 bg-neutral-100 border-[0.5px]" />
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-2 text-neutral-900">Message</label>
                <Textarea
                  className="min-h-[100px] text-neutral-900 bg-neutral-100 border-[0.5px]"
                  placeholder="Tell us about your travel preferences..."
                />
              </div>
              
              <div className="flex gap-4 pt-4">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setIsBookNowOpen(false)}
                  className="flex-1 text-neutral-900"
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  className="flex-1 bg-yellow-400 hover:bg-yellow-500 text-neutral-900"
                >
                  Submit Booking
                </Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>

        {/* Flight Inquiry Form */}
        <motion.div
          initial={{ opacity: 0, y: 60, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ delay: 0.7, duration: 0.8, type: "spring", stiffness: 100 }}
          className="max-w-6xl mx-auto space-y-6 hidden"
        >
          {/* Main Flight Search */}
          <div className="bg-white/15 backdrop-blur-xl rounded-2xl p-4 sm:p-6 shadow-2xl border border-white/20">
            <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
              {/* From Where */}
              <div>
                <label className="block text-white text-sm mb-2">From where?</label>
                <Select>
                  <SelectTrigger className="!h-12 bg-white border-neutral-300 hover:border-neutral-400 focus:border-primary">
                    <SelectValue placeholder="CHOOSE COUNTRY" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="nigeria">Nigeria</SelectItem>
                    <SelectItem value="ghana">Ghana</SelectItem>
                    <SelectItem value="kenya">Kenya</SelectItem>
                    <SelectItem value="southafrica">South Africa</SelectItem>
                    <SelectItem value="ethiopia">Ethiopia</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* To Where */}
              <div>
                <label className="block text-white text-sm mb-2">To where?</label>
                <Select>
                  <SelectTrigger className="!h-12 bg-white border-neutral-300 hover:border-neutral-400 focus:border-primary">
                    <SelectValue placeholder="CHOOSE COUNTRY" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="uae">United Arab Emirates</SelectItem>
                    <SelectItem value="turkey">Turkey</SelectItem>
                    <SelectItem value="maldives">Maldives</SelectItem>
                    <SelectItem value="egypt">Egypt</SelectItem>
                    <SelectItem value="saudi">Saudi Arabia</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Leaving On */}
              <div>
                <label className="block text-white text-sm mb-2">Leaving on</label>
                <Input
                  type="date"
                  className="w-full !h-12 bg-white border-neutral-300 hover:border-neutral-400 focus:border-primary !px-2.5 sm:!px-3 !text-sm !rounded-md [&::-webkit-calendar-picker-indicator]:mr-0 [&::-webkit-date-and-time-value]:text-left"
                  style={{ 
                    borderRadius: '0.375rem',
                    WebkitAppearance: 'none',
                    MozAppearance: 'none',
                    appearance: 'none'
                  }}
                />
              </div>

              {/* Returning On */}
              <div>
                <label className="block text-white text-sm mb-2">Returning on</label>
                <Input
                  type="date"
                  className="w-full !h-12 bg-white border-neutral-300 hover:border-neutral-400 focus:border-primary !px-2.5 sm:!px-3 !text-sm !rounded-md [&::-webkit-calendar-picker-indicator]:mr-0 [&::-webkit-date-and-time-value]:text-left"
                  style={{ 
                    borderRadius: '0.375rem',
                    WebkitAppearance: 'none',
                    MozAppearance: 'none',
                    appearance: 'none'
                  }}
                />
              </div>

              {/* Inquiry Button */}
              <div className="flex items-end">
                <motion.div 
                  className="w-full"
                  whileHover={{ scale: 1.02 }} 
                  whileTap={{ scale: 0.98 }}
                >
                  <Button
                    onClick={handleFlightInquiry}
                    disabled={isSearching}
                    className="w-full h-12 bg-[#F5A623] hover:bg-[#E09612] text-white border-0 shadow-lg hover:shadow-xl transition-all uppercase tracking-wide font-semibold"
                  >
                    {isSearching ? (
                      <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                      >
                        <Plane className="w-5 h-5" />
                      </motion.div>
                    ) : (
                      'INQUIRY FLIGHT'
                    )}
                  </Button>
                </motion.div>
              </div>
            </div>
          </div>

          {/* Service Buttons */}
          <div className="flex flex-wrap justify-center gap-4 pb-8 md:pb-0">
            {[
              { label: 'Find Hotels', icon: Hotel, href: '#/hotels' },
              { label: 'Visa', icon: FileText, href: '#/global-visa' },
              { label: 'Car Hire', icon: Car, href: '#/car-hire' },
              { label: 'Tour', icon: Map, href: '#/local-tours' },
              { label: 'Cruise', icon: Ship, href: '#/cruise' }
            ].map((service, index) => (
              <motion.a
                key={service.label}
                href={service.href}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.9 + index * 0.1 }}
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-3 border-2 border-white/60 hover:border-white text-white hover:bg-white/10 rounded-lg backdrop-blur-sm transition-all flex items-center gap-2"
              >
                <service.icon className="w-5 h-5" />
                {service.label}
              </motion.a>
            ))}
          </div>
        </motion.div>


      </div>
    </div>
  );
}
