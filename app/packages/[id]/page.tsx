'use client';

import { useParams } from 'next/navigation';
import { Navigation } from '../../../components/Navigation';
import { Footer } from '../../../components/Footer';
import { WhatsAppButton } from '../../../components/WhatsAppButton';
import { ScrollProgress } from '../../../components/ScrollProgress';
import { Toaster } from '../../../components/ui/sonner';
import { motion } from 'framer-motion';
import { MapPin, Calendar, Clock, CheckCircle2, XCircle, ArrowRight, MessageCircle } from 'lucide-react';
import { Button } from '../../../components/ui/button';

import { PageHero } from '../../../components/PageHero';

export default function PackageDetail() {
  const params = useParams();
  const packageId = (params?.id as string) || '';

  const packages = [
    {
      id: 'dubai-explorer',
      title: 'Dubai Explorer - 5 Days Ultimate Experience',
      image: 'https://images.unsplash.com/photo-1643904736472-8b77e93ca3d7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxEdWJhaSUyMHNreWxpbmUlMjBCdXJqJTIwS2hhbGlmYXxlbnwxfHx8fDE3NjIyODc0OTN8MA&ixlib=rb-4.1.0&q=80&w=1080',
      location: 'Dubai, UAE',
      duration: '5 Days / 4 Nights',
      price: 3999,
      description: 'Experience the best of Dubai with this comprehensive package featuring iconic attractions, luxury accommodations, and unforgettable experiences.',
      inclusions: [
        'Return airport transfers',
        '4 nights in 4-star hotel (breakfast included)',
        'Burj Khalifa At The Top ticket (124th & 125th floor)',
        'Desert Safari with BBQ dinner',
        'Dubai Marina Dhow Cruise with dinner',
        'Half-day Dubai City Tour',
        'Dubai Mall visit',
        'All tours with shared transfers'
      ],
      exclusions: [
        'International flights',
        'UAE visa fees',
        'Personal expenses',
        'Lunch and dinner (except mentioned)',
        'Travel insurance',
        'Optional activities'
      ],
      itinerary: [
        {
          day: 1,
          title: 'Arrival & Dubai Mall',
          description: 'Welcome to Dubai! Upon arrival, our representative will meet you at the airport and transfer you to your hotel. After check-in, visit the world-famous Dubai Mall and enjoy the Dubai Fountain show.'
        },
        {
          day: 2,
          title: 'Dubai City Tour & Burj Khalifa',
          description: 'Morning city tour covering Old Dubai, Gold & Spice Souks, and Dubai Museum. Evening visit to Burj Khalifa At The Top with stunning sunset views from the 124th and 125th floors.'
        },
        {
          day: 3,
          title: 'Desert Safari Adventure',
          description: 'Afternoon pickup for thrilling desert safari including dune bashing, camel riding, sandboarding, and traditional BBQ dinner with live entertainment under the stars.'
        },
        {
          day: 4,
          title: 'Marina Cruise & Leisure',
          description: 'Enjoy leisure time for shopping or optional activities. Evening luxury dhow cruise through Dubai Marina with international buffet dinner and live entertainment.'
        },
        {
          day: 5,
          title: 'Departure',
          description: 'After breakfast and hotel checkout, transfer to Dubai International Airport for your departure flight with wonderful memories of Dubai.'
        }
      ]
    }
  ];

  const pkg = packages.find(p => p.id === packageId) || packages[0];

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <ScrollProgress />
      <Navigation />
      <main className="flex-1">

        {/* Hero */}
        <PageHero
          image={pkg.image}
          height="70vh"
          title={
            <>
              <div className="flex flex-wrap gap-4 mb-6 justify-center">
                <span className="bg-blue-600/90 backdrop-blur-md text-white px-4 py-1.5 rounded-full text-sm font-bold uppercase tracking-wider shadow-lg border border-blue-500/50">
                  Best Seller
                </span>
                <span className="bg-white/20 backdrop-blur-md text-white px-4 py-1.5 rounded-full text-sm font-medium flex items-center gap-2 border border-white/20">
                  <MapPin className="w-4 h-4" /> {pkg.location}
                </span>
              </div>
              {pkg.title}
            </>
          }
        >
          <div className="flex flex-wrap justify-center items-center gap-6 text-white/90 text-lg font-light">
            <span className="flex items-center gap-2">
              <Clock className="w-5 h-5 text-blue-400" /> {pkg.duration}
            </span>
            <span className="flex items-center gap-2">
              <Calendar className="w-5 h-5 text-purple-400" /> Daily Departures
            </span>
          </div>
        </PageHero>

        <section className="py-16 relative">
          <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-20">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 lg:gap-20">

              {/* Main Content */}
              <div className="lg:col-span-2 space-y-16">

                {/* Overview */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                >
                  <h2 className="text-3xl font-bold mb-6 text-neutral-900 flex items-center gap-3">
                    <span className="w-2 h-8 bg-blue-600 rounded-full" /> Overview
                  </h2>
                  <p className="text-lg text-neutral-600 leading-relaxed">
                    {pkg.description}
                  </p>
                </motion.div>

                {/* Itinerary - Timeline Style */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                >
                  <h2 className="text-3xl font-bold mb-10 text-neutral-900 flex items-center gap-3">
                    <span className="w-2 h-8 bg-purple-600 rounded-full" /> Itinerary
                  </h2>
                  <div className="space-y-0 relative border-l-2 border-neutral-200 ml-4 lg:ml-6 pb-4">
                    {pkg.itinerary.map((day, index) => (
                      <div key={day.day} className="relative pl-10 lg:pl-16 pb-12 last:pb-0">
                        <div className="absolute -left-[9px] top-0 w-4 h-4 rounded-full bg-white border-4 border-purple-600 shadow-md" />
                        <span className="absolute -left-14 lg:-left-20 top-[-6px] text-sm font-bold text-neutral-400 w-12 text-right">
                          Day {day.day}
                        </span>

                        <div className="bg-neutral-50 rounded-2xl p-6 lg:p-8 hover:shadow-md transition-shadow">
                          <h4 className="text-xl font-bold mb-3 text-neutral-900">{day.title}</h4>
                          <p className="text-neutral-600 leading-relaxed">{day.description}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </motion.div>

                {/* Inclusions & Exclusions */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    className="bg-green-50/50 rounded-3xl p-8 border border-green-100"
                  >
                    <h3 className="text-xl font-bold mb-6 text-green-800 flex items-center gap-2">
                      <CheckCircle2 className="w-6 h-6" /> What's Included
                    </h3>
                    <ul className="space-y-4">
                      {pkg.inclusions.map((item, index) => (
                        <li key={index} className="flex items-start gap-3 text-neutral-700">
                          <span className="w-1.5 h-1.5 rounded-full bg-green-500 mt-2.5 shrink-0" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    className="bg-red-50/50 rounded-3xl p-8 border border-red-100"
                  >
                    <h3 className="text-xl font-bold mb-6 text-red-800 flex items-center gap-2">
                      <XCircle className="w-6 h-6" /> What's Excluded
                    </h3>
                    <ul className="space-y-4">
                      {pkg.exclusions.map((item, index) => (
                        <li key={index} className="flex items-start gap-3 text-neutral-700">
                          <span className="w-1.5 h-1.5 rounded-full bg-red-400 mt-2.5 shrink-0" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </motion.div>
                </div>
              </div>

              {/* Sticky Sidebar */}
              <div className="relative lg:col-span-1">
                <div className="sticky top-24 space-y-6">
                  <div className="bg-white rounded-[2rem] p-8 shadow-2xl border border-neutral-100 relative overflow-hidden">
                    <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-primary to-accent" />

                    <div className="mb-8">
                      <p className="text-neutral-500 text-sm font-medium uppercase tracking-wide mb-2">Starting Price</p>
                      <div className="flex items-baseline gap-2">
                        <p className="text-4xl font-bold text-neutral-900">AED {pkg.price.toLocaleString()}</p>
                        <p className="text-neutral-400 text-sm">/ person</p>
                      </div>
                      <div className="mt-4 flex gap-2 text-xs font-medium text-green-600 bg-green-50 inline-flex px-3 py-1 rounded-full">
                        <CheckCircle2 className="w-3 h-3" /> Best Price Guarantee
                      </div>
                    </div>

                    <div className="space-y-4">
                      <Button className="w-full h-14 text-lg bg-neutral-900 hover:bg-neutral-800 text-white rounded-xl shadow-lg hover:shadow-xl transition-all">
                        Book Now <ArrowRight className="w-5 h-5 ml-2" />
                      </Button>
                      <Button variant="outline" className="w-full h-14 text-lg border-neutral-200 hover:bg-neutral-50 text-neutral-900 rounded-xl">
                        Customize Trip
                      </Button>
                      <a
                        href={`https://wa.me/971543977242?text=I'm interested in the ${pkg.title} package`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center justify-center gap-3 w-full h-14 text-lg bg-[#25D366] hover:bg-[#20bd5a] text-white rounded-xl shadow-lg hover:shadow-xl transition-all font-medium"
                      >
                        <MessageCircle className="w-6 h-6" /> Chat on WhatsApp
                      </a>
                    </div>

                    <div className="mt-8 pt-8 border-t border-neutral-100 text-center">
                      <p className="text-sm text-neutral-500 mb-2">Need help? Call us 24/7</p>
                      <p className="text-xl font-bold text-blue-600">+971 54 397 7242</p>
                    </div>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </section>
      </main>
      <Footer />
      <WhatsAppButton />
      <Toaster position="top-right" richColors />
    </div>
  );
}


