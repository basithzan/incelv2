'use client';

import { useState } from 'react';
import { TourCard } from '../components/TourCard';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select';
import { tours } from '../data/mockData';
import { motion, AnimatePresence } from 'framer-motion';
import { Filter, X, MapPin } from 'lucide-react';
import { Button } from '../components/ui/button';

import { PageHero } from '../components/PageHero';

export function LocalToursPage() {
  const [cityFilter, setCityFilter] = useState('all');

  const filteredTours = tours.filter((tour) => {
    // In a real app, you would filter by city property if available in mockData
    if (cityFilter === 'all') return true;
    // Mock filter behavior since mock data might not have city field explicit
    return true;
  });

  return (
    <div className="bg-white min-h-screen">
      {/* Hero */}
      <PageHero
        image="https://images.unsplash.com/photo-1677935688755-7418d1819591?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxEdWJhaSUyMGRlc2VydCUyMHNhZmFyaSUyMHRvdXJ8ZW58MXx8fHwxNzYyNjM3ODQ3fDA&ixlib=rb-4.1.0&q=80&w=1080"
        title={<>Local <span className="inline-block text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent pb-2">Experiences</span></>}
        subtitle="Discover the best of Dubai and the UAE with our expertly curated tours and activities."
      />

      {/* Filters & Content */}
      <section className="pb-24 relative z-10">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-12">
          {/* Floating Filter Bar */}
          <div className="-mt-8 mb-2 bg-white rounded-2xl border border-neutral-100 p-4 md:p-6 flex flex-row gap-0 items-center justify-end">
            <div className="flex flex-nowrap gap-4 items-center">
              <div className="flex items-center gap-2 text-neutral-500 font-medium">
                <Filter className="w-5 h-5" />
                <span>Filter by:</span>
              </div>

              <Select value={cityFilter} onValueChange={setCityFilter}>
                <SelectTrigger className="w-[200px] h-11 rounded-xl bg-neutral-50 border-neutral-200">
                  <SelectValue placeholder="City" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Cities</SelectItem>
                  <SelectItem value="dubai">Dubai</SelectItem>
                  <SelectItem value="abudhabi">Abu Dhabi</SelectItem>
                  <SelectItem value="sharjah">Sharjah</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {cityFilter !== 'all' && (
              <Button
                variant="ghost"
                onClick={() => setCityFilter('all')}
                className="text-red-500 hover:text-red-600 hover:bg-red-50"
              >
                <X className="w-4 h-4 mr-2" /> Reset Filters
              </Button>
            )}
          </div>

          {/* Tours Grid */}
          <AnimatePresence mode="wait">
            <motion.div
              layout
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 lg:gap-8"
            >
              {filteredTours.map((tour, index) => (
                <motion.div
                  layout
                  key={tour.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                >
                  <TourCard {...tour} />
                </motion.div>
              ))}
            </motion.div>
          </AnimatePresence>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-gradient-to-br from-neutral-50 to-white relative overflow-hidden">
        <div className="max-w-[1200px] mx-auto px-4 text-center relative z-10">
          <h2 className="text-3xl font-bold mb-6 text-neutral-900">Custom Group Tours</h2>
          <p className="text-lg text-neutral-600 mb-8 max-w-2xl mx-auto">
            Planning a corporate outing or family reunion? We can arrange exclusive private tours tailored to your group size and interests.
          </p>
          <Button asChild size="lg" className="rounded-full h-12 px-8 bg-neutral-900 text-white hover:bg-neutral-800">
            <a href="#/contact">Request Group Quote</a>
          </Button>
        </div>
      </section>
    </div>
  );
}
