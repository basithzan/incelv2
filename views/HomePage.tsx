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
import { ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react';
import { FloatingElements, GlowingOrbs } from '../components/FloatingElements';
import { StaggerContainer, StaggerItem } from '../components/AnimatedSection';
import { ParallaxSection } from '../components/ParallaxSection';
import { useState, useEffect } from 'react';

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
    <div className="overflow-x-hidden bg-background">
      <HeroWithSearch
        heading="Explore the world with Incel Tourism"
        subheading="Visas, tours & curated packages at the best value"
        backgroundImage="https://images.unsplash.com/photo-1643904736472-8b77e93ca3d7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxEdWJhaSUyMHNreWxpbmUlMjBCdXJqJTIwS2hhbGlmYXxlbnwxfHx8fDE3NjIyODc0OTN8MA&ixlib=rb-4.1.0&q=80&w=1080"
      />

      {/* Latest Packages Section - Floating Overlap */}
      <section className="relative z-20 -mt-32 pb-12 px-4 pointer-events-none">
        <div className="max-w-[1400px] mx-auto pointer-events-auto">
          <div className="relative z-10">
            <LatestPackagesCarousel packages={packages.slice(0, 3)} />
          </div>
        </div>
      </section>

      {/* Featured Packages Carousel */}
      <section className="py-24 relative overflow-hidden bg-white dark:bg-neutral-900">
        <div className="max-w-[1400px] mx-auto px-4 md:px-6 lg:px-12 relative">

          <div className="text-center mb-4 space-y-4">
            <div className="inline-block px-4 py-1.5 rounded-full bg-blue-50 text-primary font-medium text-sm tracking-wide uppercase">
              Featured Packages
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-neutral-900 dark:text-white">
              Handpicked Travel <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent">Experiences</span>
            </h2>
            <p className="text-lg text-neutral-600 dark:text-neutral-400 max-w-2xl mx-auto">
              Discover our curated collection of premium packages designed for unforgettable journeys.
            </p>
          </div>

          <div className="relative mb-12">
            {/* Custom Navigation - Positioned outside cards */}
            <button
              onClick={handlePrev}
              className="absolute left-0 lg:-left-6 top-1/2 -translate-y-1/2 z-[60] w-12 h-12 bg-white dark:bg-neutral-800 rounded-full flex items-center justify-center shadow-xl hover:scale-110 transition-all border border-neutral-100 dark:border-neutral-700"
            >
              <ChevronLeft className="w-5 h-5 text-neutral-900 dark:text-white" />
            </button>
            <button
              onClick={handleNext}
              className="absolute right-0 lg:-right-6 top-1/2 -translate-y-1/2 z-[60] w-12 h-12 bg-white dark:bg-neutral-800 rounded-full flex items-center justify-center shadow-xl hover:scale-110 transition-all border border-neutral-100 dark:border-neutral-700"
            >
              <ChevronRight className="w-5 h-5 text-neutral-900 dark:text-white" />
            </button>

            <div className="overflow-hidden relative mx-8 lg:mx-0 px-4 py-8">
              <motion.div
                className="flex"
                animate={{ x: `-${currentIndex * (100 / slidesPerView)}%` }}
                transition={{ type: 'spring', stiffness: 300, damping: 30 }}
              >
                {featuredPackages.map((pkg) => (
                  <div
                    key={pkg.id}
                    className="flex-shrink-0 px-3 transition-all duration-300"
                    style={{ width: `${100 / slidesPerView}%` }}
                  >
                    <PackageCard {...pkg} />
                  </div>
                ))}
              </motion.div>
            </div>
          </div>

          <div className="text-center">
            <Button asChild size="lg" className="rounded-full h-14 px-8 text-lg shadow-lg hover:shadow-primary/20">
              <a href="#/packages" className="flex items-center gap-2">
                Explore All Destinations <ArrowRight className="w-5 h-5" />
              </a>
            </Button>
          </div>
        </div>
      </section>

      <ExploreWorldBanner />
      <HotDealsCarousel />
      <WhatWeOffer />
      <PlanningTripSection />

      {/* Why Choose Us - Bento Grid */}
      <div className="mt-12 md:mt-16">
        <WhyChooseUs />
      </div>

      {/* Local Tours Section */}
      <ParallaxSection className="py-32 relative bg-neutral-900 text-white overflow-hidden">
        <div className="absolute inset-0 bg-[url('/pattern.svg')] opacity-5" />

        <div className="max-w-[1400px] mx-auto px-6 lg:px-12 py-8 relative z-10" style={{ minHeight: '852px' }}>
          <div className="text-center mb-10">
            <span className="text-accent font-medium tracking-wider uppercase text-sm mb-4 block">Discover Local Gems</span>
            <h2 className="text-4xl md:text-6xl font-bold mb-6">Experience Dubai & UAE</h2>
            <p className="text-lg text-white/70 max-w-2xl mx-auto">
              Immerse yourself in the wonders of the Emirates with our expertly curated local experiences.
            </p>
          </div>

          <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16" style={{ paddingTop: '50px', paddingBottom: '50px' }}>
            {tours.map((tour) => (
              <StaggerItem key={tour.id}>
                <TourCard {...tour} />
              </StaggerItem>
            ))}
          </StaggerContainer>

          <div className="text-center mb-8">
            <Button asChild size="lg" className="rounded-full bg-white text-black hover:bg-neutral-200 border-none h-12 px-8">
              <a href="#/local-tours" className="flex items-center gap-2 text-black">
                View All Tours <ArrowRight className="w-4 h-4" />
              </a>
            </Button>
          </div>
        </div>
      </ParallaxSection>

      <WhatsAppStrip />
    </div>
  );
}
