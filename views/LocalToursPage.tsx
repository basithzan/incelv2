'use client';

import { useState } from 'react';
import { TourCard } from '../components/TourCard';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select';
import { tours } from '../data/mockData';

export function LocalToursPage() {
  const [cityFilter, setCityFilter] = useState('all');

  return (
    <div>
      {/* Hero */}
      <section className="relative h-96 flex items-center justify-center overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: `url(https://images.unsplash.com/photo-1677935688755-7418d1819591?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxEdWJhaSUyMGRlc2VydCUyMHNhZmFyaSUyMHRvdXJ8ZW58MXx8fHwxNzYyNjM3ODQ3fDA&ixlib=rb-4.1.0&q=80&w=1080)`
          }}
        >
          <div className="absolute inset-0 bg-neutral-900/50" />
        </div>
        <div className="relative z-10 text-center text-white max-w-3xl mx-auto px-4">
          <h1 className="mb-4">Local Tours (Dubai & UAE)</h1>
          <p>Discover the best of Dubai and the UAE with our expertly curated tours and experiences</p>
        </div>
      </section>

      {/* Filters */}
      <section className="py-8 border-b border-neutral-300">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-20">
          <div className="flex flex-wrap gap-4 items-center">
            <div className="flex items-center gap-2">
              <span className="text-neutral-700">Filter by:</span>
            </div>
            <Select value={cityFilter} onValueChange={setCityFilter}>
              <SelectTrigger className="w-full sm:w-[180px]">
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
        </div>
      </section>

      {/* Tours Grid */}
      <section className="py-12">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-20">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {tours.map((tour) => (
              <TourCard key={tour.id} {...tour} />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
