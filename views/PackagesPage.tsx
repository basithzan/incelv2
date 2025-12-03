'use client';

import { useState } from 'react';
import { PackageCard } from '../components/PackageCard';
import { Button } from '../components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select';
import { packages } from '../data/mockData';

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
    <div>
      {/* Hero */}
      <section className="relative h-96 flex items-center justify-center overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: `url(https://images.unsplash.com/photo-1761069449669-1b17dc39831b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsdXh1cnklMjB0cmF2ZWwlMjBwYWNrYWdlcyUyMHZhY2F0aW9ufGVufDF8fHx8MTc2MjYzNzg0N3ww&ixlib=rb-4.1.0&q=80&w=1080)`
          }}
        >
          <div className="absolute inset-0 bg-neutral-900/50" />
        </div>
        <div className="relative z-10 text-center text-white max-w-3xl mx-auto px-4">
          <h1 className="mb-4">Travel Packages</h1>
          <p>Browse our collection of expertly curated travel packages, from inbound UAE experiences to outbound adventures and spiritual journeys</p>
        </div>
      </section>

      {/* Filters */}
      <section className="py-8 border-b border-neutral-300">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-20">
          <div className="flex flex-wrap gap-4 items-center">
            <div className="flex items-center gap-2">
              <span className="text-neutral-700">Filter by:</span>
            </div>
            <Select value={categoryFilter} onValueChange={setCategoryFilter}>
              <SelectTrigger className="w-full sm:w-[180px]">
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
              <SelectTrigger className="w-full sm:w-[180px]">
                <SelectValue placeholder="Budget" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Budgets</SelectItem>
                <SelectItem value="budget">Under AED 4,000</SelectItem>
                <SelectItem value="mid">AED 4,000 - 7,000</SelectItem>
                <SelectItem value="luxury">Above AED 7,000</SelectItem>
              </SelectContent>
            </Select>
            <Button 
              variant="outline" 
              onClick={() => {
                setCategoryFilter('all');
                setPriceFilter('all');
              }}
            >
              Reset Filters
            </Button>
          </div>
        </div>
      </section>

      {/* Packages Grid */}
      <section className="py-12">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-20">
          {filteredPackages.length === 0 ? (
            <div className="text-center py-20">
              <p className="text-neutral-700 mb-4">No packages found matching your criteria.</p>
              <Button 
                onClick={() => {
                  setCategoryFilter('all');
                  setPriceFilter('all');
                }}
              >
                Clear Filters
              </Button>
            </div>
          ) : (
            <>
              <p className="text-neutral-700 mb-6">
                Showing {filteredPackages.length} {filteredPackages.length === 1 ? 'package' : 'packages'}
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {filteredPackages.map((pkg) => (
                  <PackageCard key={pkg.id} {...pkg} />
                ))}
              </div>
            </>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-neutral-100">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-20 text-center">
          <h2 className="mb-4">Can't find what you're looking for?</h2>
          <p className="text-neutral-700 mb-8 max-w-2xl mx-auto">
            Our travel experts can create a custom package tailored to your preferences and budget.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Button asChild size="lg">
              <a href="#/contact">Contact Us</a>
            </Button>
            <Button asChild size="lg" variant="outline">
              <a href="https://wa.me/971543977242" target="_blank" rel="noopener noreferrer">
                Chat on WhatsApp
              </a>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
