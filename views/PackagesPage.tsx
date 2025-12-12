'use client';

import { useState } from 'react';
import { PackageCard } from '../components/PackageCard';
import { Button } from '../components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select';
import { packages } from '../data/mockData';
import { motion, AnimatePresence } from 'framer-motion';
import { Filter, X } from 'lucide-react';

import { PageHero } from '../components/PageHero';

export function PackagesPage() {
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [priceFilter, setPriceFilter] = useState('all');

  const filteredPackages = packages.filter((pkg) => {
    if (categoryFilter !== 'all' && pkg.category !== categoryFilter) return false;

    if (priceFilter === 'budget' && pkg.price > 4000) return false;
    if (priceFilter === 'mid' && (pkg.price < 4000 || pkg.price > 7000)) return false;
    if (priceFilter === 'luxury' && pkg.price < 7000) return false;

    return true;
  });

  return (
    <div className="bg-white min-h-screen">
      {/* Hero */}
      <PageHero
        image="https://images.unsplash.com/photo-1761069449669-1b17dc39831b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsdXh1cnklMjB0cmF2ZWwlMjBwYWNrYWdlcyUyMHZhY2F0aW9ufGVufDF8fHx8MTc2MjYzNzg0N3ww&ixlib=rb-4.1.0&q=80&w=1080"
        title={<>Curated <span className="inline-block text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent">Journeys</span></>}
        subtitle="Explore our collection of premium travel packages, designed to create unforgettable memories."
      />

      {/* Filters & Content */}
      <section className="pb-24 relative z-10">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-12">
          {/* Floating Filter Bar */}
          <div className="-mt-8 -mb-4 bg-white rounded-2xl p-4 md:p-6 flex flex-row gap-0 items-center justify-end" style={{ boxShadow: 'none', boxSizing: 'content-box' }}>
            <div className="flex flex-nowrap gap-4 items-center">
              <div className="flex items-center gap-2 text-neutral-500 font-medium">
                <Filter className="w-5 h-5" />
                <span>Filter by:</span>
              </div>

              <Select value={categoryFilter} onValueChange={setCategoryFilter}>
                <SelectTrigger className="w-[200px] h-11 rounded-xl bg-neutral-50 border-neutral-200">
                  <SelectValue placeholder="Package Type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Categories</SelectItem>
                  <SelectItem value="Inbound">Inbound</SelectItem>
                  <SelectItem value="Outbound">Outbound</SelectItem>
                  <SelectItem value="Umrah">Hajj & Umrah</SelectItem>
                </SelectContent>
              </Select>

              <Select value={priceFilter} onValueChange={setPriceFilter}>
                <SelectTrigger className="w-[200px] h-11 rounded-xl bg-neutral-50 border-neutral-200">
                  <SelectValue placeholder="Budget" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Budgets</SelectItem>
                  <SelectItem value="budget">Under AED 4,000</SelectItem>
                  <SelectItem value="mid">AED 4,000 - 7,000</SelectItem>
                  <SelectItem value="luxury">Above AED 7,000</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {(categoryFilter !== 'all' || priceFilter !== 'all') && (
              <Button
                variant="ghost"
                onClick={() => {
                  setCategoryFilter('all');
                  setPriceFilter('all');
                }}
                className="text-red-500 hover:text-red-600 hover:bg-red-50"
              >
                <X className="w-4 h-4 mr-2" /> Reset Filters
              </Button>
            )}
          </div>

          {/* Results Grid */}
          <AnimatePresence mode="wait">
            {filteredPackages.length === 0 ? (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="text-center py-20 bg-neutral-50 rounded-3xl"
              >
                <p className="text-neutral-500 text-lg mb-6">No unique journeys found matching your criteria.</p>
                <Button
                  onClick={() => {
                    setCategoryFilter('all');
                    setPriceFilter('all');
                  }}
                  variant="outline"
                  className="rounded-full px-8"
                >
                  Clear Filters
                </Button>
              </motion.div>
            ) : (
              <motion.div
                layout
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 lg:gap-8"
                style={{ paddingTop: '20px', paddingBottom: '50px' }}
              >
                {filteredPackages.map((pkg, index) => (
                  <motion.div
                    layout
                    key={pkg.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.05 }}
                  >
                    <PackageCard {...pkg} />
                  </motion.div>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </section>

      {/* Modern CTA */}
      <section className="py-24 bg-gradient-to-br from-neutral-900 to-neutral-800 text-white relative overflow-hidden">
        {/* Background Image */}
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1761069449669-1b17dc39831b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsdXh1cnklMjB0cmF2ZWwlMjBwYWNrYWdlcyUyMHZhY2F0aW9ufGVufDF8fHx8MTc2MjYzNzg0N3ww&ixlib=rb-4.1.0&q=80&w=1080)' }}
        >
          <div className="absolute inset-0 bg-gradient-to-br from-neutral-900/90 via-neutral-800/85 to-neutral-900/90" />
        </div>
        <div className="absolute top-0 right-0 w-1/2 h-full bg-blue-600/10 blur-[100px] rounded-full" />
        <div className="absolute bottom-0 left-0 w-1/2 h-full bg-purple-600/10 blur-[100px] rounded-full" />

        <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-20 text-center relative z-10">
          <h2 className="text-3xl md:text-5xl font-bold mb-6">Looking for something <span className="text-blue-400">custom?</span></h2>
          <p className="text-xl text-white/80 mb-10 max-w-2xl mx-auto font-light">
            Our travel designers can craft a personalized itinerary just for you, tailored to your unique preferences and style.
          </p>
          <div className="flex flex-wrap gap-6 justify-center">
            <Button asChild size="lg" className="rounded-full h-14 px-8 text-lg bg-white text-neutral-900 hover:bg-neutral-100 hover:text-black">
              <a href="#/contact">Plan My Trip</a>
            </Button>
            <Button asChild size="lg" variant="outline" className="rounded-full h-14 px-8 text-lg border-white/20 text-white hover:bg-white/10 hover:text-white" style={{ color: 'var(--tw-gradient-from)' }}>
              <a href="https://wa.me/971543977242" target="_blank" rel="noopener noreferrer">
                Chat with an Expert
              </a>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
