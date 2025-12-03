import { HeroWithSearch } from '../components/HeroWithSearch';
import { PackageCard } from '../components/PackageCard';
import { TourCard } from '../components/TourCard';
import { WhyChooseUs } from '../components/WhyChooseUs';
import { WhatsAppStrip } from '../components/WhatsAppStrip';
import { HotDealsCarousel } from '../components/HotDealsCarousel';
import { LatestPackagesCarousel } from '../components/LatestPackagesCarousel';
import { WhatWeOffer } from '../components/WhatWeOffer';
import { ExploreWorldBanner } from '../components/ExploreWorldBanner';
import { PlanningTripSection } from '../components/PlanningTripSection';
import { Button } from '../components/ui/button';
import { packages, tours } from '../data/mockData';
import { motion } from 'framer-motion';
import { ArrowRight, TrendingUp, Award, Users, Quote, ChevronLeft, ChevronRight } from 'lucide-react';
import { CountUp } from '../components/CountUpStats';
import { FloatingElements, GlowingOrbs } from '../components/FloatingElements';
import { StaggerContainer, StaggerItem } from '../components/AnimatedSection';
import { ParallaxSection } from '../components/ParallaxSection';
import { useState, useEffect } from 'react';

const stats = [
  { icon: Users, value: 10000, label: 'Happy Travelers', suffix: '+' },
  { icon: Award, value: 6, label: 'Years Experience', suffix: '+' },
  { icon: TrendingUp, value: 95, label: 'Satisfaction Rate', suffix: '%' }
];

export function HomePage() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [slidesPerView, setSlidesPerView] = useState(3);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setSlidesPerView(1);
      } else if (window.innerWidth < 1024) {
        setSlidesPerView(2);
      } else {
        setSlidesPerView(3);
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const featuredPackages = packages.slice(0, 9);

  const handlePrev = () => {
    setCurrentIndex(prev => (prev === 0 ? featuredPackages.length - slidesPerView : prev - 1));
  };

  const handleNext = () => {
    setCurrentIndex(prev => (prev >= featuredPackages.length - slidesPerView ? 0 : prev + 1));
  };

  return (
    <div className="overflow-x-hidden">
      <HeroWithSearch
        heading="Explore the world with Incel Tourism"
        subheading="Visas, tours & curated packages at the best value"
        backgroundImage="https://images.unsplash.com/photo-1643904736472-8b77e93ca3d7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxEdWJhaSUyMHNreWxpbmUlMjBCdXJqJTIwS2hhbGlmYXxlbnwxfHx8fDE3NjIyODc0OTN8MA&ixlib=rb-4.1.0&q=80&w=1080"
      />

      {/* Latest Packages Section */}
      <section className="relative" style={{ marginTop: '-35vh', paddingTop: '4rem', paddingBottom: '4rem', zIndex: 10 }}>
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
          <motion.div
            initial={{ opacity: 0, y: 60, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="bg-white rounded-3xl shadow-md p-8 lg:p-12 border border-neutral-100 relative overflow-visible"
          >

            <div className="relative z-10">
              <LatestPackagesCarousel packages={packages} />
            </div>
          </motion.div>
        </div>
      </section>

      {/* Featured Packages */}
      <section className="pt-6 pb-24 relative overflow-hidden bg-white">
        <FloatingElements />
        
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-5" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%2300A884' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
        }} />

        <div className="max-w-[1400px] mx-auto px-4 md:px-6 lg:px-12 relative">
          {/* Decorative Travel Elements */}
          <motion.div
            className="absolute top-0 left-0 w-32 h-32 opacity-5 hidden lg:block"
            animate={{ 
              rotate: 360,
              scale: [1, 1.1, 1]
            }}
            transition={{ 
              rotate: { duration: 20, repeat: Infinity, ease: "linear" },
              scale: { duration: 3, repeat: Infinity }
            }}
          >
            <svg viewBox="0 0 100 100" fill="currentColor" className="text-primary">
              <circle cx="50" cy="50" r="45" fill="none" stroke="currentColor" strokeWidth="2" strokeDasharray="5,5"/>
              <circle cx="50" cy="50" r="3" />
              <circle cx="50" cy="20" r="2" />
              <circle cx="80" cy="50" r="2" />
              <circle cx="50" cy="80" r="2" />
              <circle cx="20" cy="50" r="2" />
            </svg>
          </motion.div>

          <motion.div
            className="absolute top-20 right-10 w-24 h-24 opacity-5 hidden lg:block"
            animate={{ 
              x: [0, 20, 0],
              y: [0, -10, 0]
            }}
            transition={{ duration: 5, repeat: Infinity }}
          >
            <svg viewBox="0 0 100 100" fill="currentColor" className="text-accent">
              <path d="M50 10 L90 40 L90 50 L50 30 L10 50 L10 40 Z" />
              <path d="M30 60 L50 50 L70 60 L70 70 L50 80 L30 70 Z" opacity="0.6" />
            </svg>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12 relative"
          >
            {/* Premium Badge */}
            <div className="inline-block mb-8">
              <span 
                className="text-white font-semibold px-8 py-3 rounded-full inline-flex items-center justify-center shadow-lg"
                style={{
                  background: 'linear-gradient(to right, #0076ad, #00A884)',
                }}
              >
                Featured Packages
              </span>
            </div>
            
            <motion.h2 
              className="mb-1 text-4xl lg:text-6xl relative z-10"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              style={{ lineHeight: '1.3', overflow: 'visible' }}
            >
              <span 
                className="inline-block text-3xl lg:text-5xl font-normal relative z-10"
                style={{
                  background: 'linear-gradient(to right, #0076ad, #00A884, #0076ad)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                  color: 'transparent',
                  lineHeight: '1.4',
                  paddingBottom: '0.2em',
                  display: 'inline-block',
                }}
              >
                Handpicked Travel Experiences
              </span>
            </motion.h2>
            
            <motion.p 
              className="text-neutral-600 text-lg max-w-3xl mx-auto leading-relaxed"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 }}
            >
              Discover our curated collection of premium packages designed for unforgettable journeys. 
              From exotic destinations to cultural experiences, every detail is crafted for your perfect getaway.
            </motion.p>
          </motion.div>

          {/* Carousel */}
          <div className="relative mb-12">
            {/* Navigation Arrows - Left */}
            <button
              onClick={handlePrev}
              className="absolute left-2 lg:left-0 top-1/2 -translate-y-1/2 lg:-translate-x-6 z-50 w-10 h-10 lg:w-12 lg:h-12 bg-white rounded-full flex items-center justify-center shadow-xl hover:shadow-2xl hover:bg-neutral-50 transition-all border border-neutral-200 pointer-events-auto cursor-pointer hover:scale-110 active:scale-95"
            >
              <ChevronLeft className="w-5 h-5 lg:w-6 lg:h-6 text-neutral-900" />
            </button>

            {/* Navigation Arrows - Right */}
            <button
              onClick={handleNext}
              className="absolute right-2 lg:right-0 top-1/2 -translate-y-1/2 lg:translate-x-6 z-50 w-10 h-10 lg:w-12 lg:h-12 bg-white rounded-full flex items-center justify-center shadow-xl hover:shadow-2xl hover:bg-neutral-50 transition-all border border-neutral-200 pointer-events-auto cursor-pointer hover:scale-110 active:scale-95"
            >
              <ChevronRight className="w-5 h-5 lg:w-6 lg:h-6 text-neutral-900" />
            </button>

            <div className="overflow-hidden relative">
              <motion.div
                className="flex"
                animate={{
                  x: `-${currentIndex * (100 / slidesPerView)}%`,
                }}
                transition={{ 
                  type: 'tween', 
                  ease: 'easeInOut', 
                  duration: 0.6 
                }}
              >
                {featuredPackages.map((pkg, index) => (
                  <div
                    key={pkg.id}
                    className="flex-shrink-0 px-1.5 md:px-3"
                    style={{ width: `${100 / slidesPerView}%` }}
                  >
                    <PackageCard {...pkg} />
                  </div>
                ))}
              </motion.div>
            </div>
          </div>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center"
          >
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Button asChild size="lg" className="bg-yellow-400 hover:bg-yellow-500 text-neutral-900 px-6 rounded-full shadow-lg hover:shadow-xl transition-all">
                <a href="#/packages" className="flex items-center gap-2">
                  <span>Explore All Destinations</span>
                  <ArrowRight className="w-4 h-4" />
                </a>
              </Button>
            </motion.div>
            
            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="text-neutral-500 mt-4 pb-6 md:pb-8"
            >
              Over 500+ destinations worldwide • Trusted by 10,000+ travelers
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* Explore World Banner */}
      <ExploreWorldBanner />

      {/* Hot Deals Carousel */}
      <HotDealsCarousel />

      {/* What We Offer */}
      <WhatWeOffer />

      {/* Planning Trip Section */}
      <PlanningTripSection />

      {/* Why Choose Us */}
      <WhyChooseUs />

      {/* Popular Local Tours with parallax */}
      <ParallaxSection speed={-0.3} className="py-24 bg-gradient-to-b from-white to-neutral-50 relative">
        <GlowingOrbs />
        
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12 relative z-10">
          <motion.div 
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <div className="inline-block mb-6">
              <span 
                className="text-white font-semibold px-8 py-3 rounded-full inline-flex items-center justify-center shadow-lg"
                style={{
                  background: 'linear-gradient(to right, #0076ad, #00A884)'
                }}
              >
                Local Tours
              </span>
            </div>
            
            <motion.h2 
              className="mb-1 text-4xl lg:text-6xl relative z-10"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              style={{ lineHeight: '1.3', overflow: 'visible' }}
            >
              <span 
                className="inline-block text-3xl lg:text-5xl font-normal relative z-10"
                style={{
                  background: 'linear-gradient(to right, #0076ad, #00A884, #0076ad)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                  color: 'transparent',
                  lineHeight: '1.4',
                  paddingBottom: '0.2em',
                  display: 'inline-block',
                }}
              >
                Experience Dubai & UAE
              </span>
            </motion.h2>
            
            <motion.p 
              className="text-neutral-600 text-lg max-w-2xl mx-auto"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
            >
              Immerse yourself in the wonders of the Emirates with our expertly curated local experiences
            </motion.p>
          </motion.div>

          <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            {tours.map((tour) => (
              <StaggerItem key={tour.id}>
                <TourCard {...tour} />
              </StaggerItem>
            ))}
          </StaggerContainer>

          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="text-center"
          >
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Button asChild size="lg" variant="outline" className="rounded-2xl border-2 hover:border-accent hover:bg-accent/5 group">
                <a href="#/local-tours" className="flex items-center gap-2">
                  View All Tours
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </a>
              </Button>
            </motion.div>
          </motion.div>
        </div>
      </ParallaxSection>

      {/* WhatsApp Strip */}
      <WhatsAppStrip />

      {/* Testimonials Section */}
      <section className="py-24 relative overflow-hidden">
        <FloatingElements />
        
        <div className="relative z-10">
          <motion.div 
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-4 md:mb-6 max-w-[1400px] mx-auto px-6 lg:px-12"
          >
            <motion.div
              initial={{ scale: 0 }}
              whileInView={{ scale: 1 }}
              viewport={{ once: true }}
              transition={{ type: "spring", stiffness: 200 }}
              className="inline-block mb-3"
            >
              <span 
                className="text-white font-semibold px-8 py-3 rounded-full inline-flex items-center justify-center shadow-lg"
                style={{
                  background: 'linear-gradient(to right, #0076ad, #00A884)'
                }}
              >
                Testimonials
              </span>
            </motion.div>
            
            <motion.h2 
              className="mb-2 md:mb-3 text-4xl lg:text-6xl relative z-10"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              style={{ lineHeight: '1.3', overflow: 'visible' }}
            >
              <span 
                className="inline-block text-3xl lg:text-5xl font-normal relative z-10"
                style={{
                  background: 'linear-gradient(to right, #0076ad, #00A884, #0076ad)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                  color: 'transparent',
                  lineHeight: '1.4',
                  paddingBottom: '0.2em',
                  display: 'inline-block',
                }}
              >
                What Our Travelers Say
              </span>
            </motion.h2>
          </motion.div>

          {/* Testimonials Marquee */}
          <div className="w-full overflow-x-hidden pt-2 pb-4 md:pt-3 md:pb-6">
            <motion.div 
              className="inline-flex gap-4 md:gap-6"
              animate={{ 
                x: [0, -1100]
              }}
              transition={{
                x: {
                  repeat: Infinity,
                  repeatType: "loop",
                  duration: 30,
                  ease: "linear"
                }
              }}
            >
              {/* Render testimonials multiple times for seamless loop */}
              {[...Array(3)].map((_, setIndex) => (
                [
                  {
                    name: 'Sarah Johnson',
                    location: 'Lagos, Nigeria',
                    text: 'Incel Tourism made our Dubai trip absolutely magical! From visa processing to the amazing tours, everything was perfectly organized.',
                    rating: 5
                  },
                  {
                    name: 'Ahmed Hassan',
                    location: 'Accra, Ghana',
                    text: 'Professional service and great attention to detail. The Umrah package was beautifully arranged. Highly recommended!',
                    rating: 5
                  },
                  {
                    name: 'Linda Okafor',
                    location: 'Abuja, Nigeria',
                    text: 'Best travel agency! They handled everything from flights to accommodations. Our Maldives holiday was a dream come true.',
                    rating: 5
                  },
                  {
                    name: 'Michael Chen',
                    location: 'Nairobi, Kenya',
                    text: 'Excellent customer service and seamless travel arrangements. Our family trip to Turkey was unforgettable. Thank you Incel Tourism!',
                    rating: 5
                  }
                ].map((testimonial, index) => (
                  <motion.div
                    key={`${setIndex}-${index}`}
                    whileHover={{ y: -8, scale: 1.02 }}
                    transition={{ duration: 0.3 }}
                    className="bg-white rounded-3xl p-4 md:p-6 shadow-lg border border-neutral-100 hover:shadow-2xl transition-shadow relative overflow-hidden group flex-shrink-0 w-[200px] sm:w-[220px] md:w-[280px] h-[200px] sm:h-[220px] md:h-[280px] flex flex-col"
                  >
                    <div className="flex gap-1 mb-2 relative z-10">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <span
                          key={i}
                          className="text-neutral-900 text-sm md:text-base"
                        >
                          ★
                        </span>
                      ))}
                    </div>
                    
                    <p className="text-neutral-700 mb-3 leading-relaxed relative z-10 text-xs md:text-sm line-clamp-3 flex-1">
                      "{testimonial.text}"
                    </p>
                    
                    <div className="relative z-10 mt-auto">
                      <p className="font-semibold text-neutral-900 text-xs md:text-sm">{testimonial.name}</p>
                      <p className="text-neutral-500 text-[10px] md:text-xs">{testimonial.location}</p>
                    </div>
                    
                    {/* Hover gradient effect */}
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-br from-primary/5 to-accent/5 opacity-0 group-hover:opacity-100 transition-opacity"
                      initial={false}
                    />
                  </motion.div>
                ))
              ))}
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
}
