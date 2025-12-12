'use client';

import { useParams } from 'next/navigation';
import { Navigation } from '../../../components/Navigation';
import { Footer } from '../../../components/Footer';
import { WhatsAppButton } from '../../../components/WhatsAppButton';
import { ScrollProgress } from '../../../components/ScrollProgress';
import { Toaster } from '../../../components/ui/sonner';
import { motion } from 'framer-motion';
import { MapPin, Clock, Calendar, CheckCircle2, XCircle, ArrowRight, MessageCircle, Star } from 'lucide-react';
import { Button } from '../../../components/ui/button';

import { PageHero } from '../../../components/PageHero';

export default function TourDetail() {
  const params = useParams();
  const tourId = (params?.id as string) || '';

  // Enriched local data for detail view
  const tours = [
    {
      id: 'desert-safari',
      title: 'Dubai Desert Safari with BBQ Dinner',
      image: 'https://images.unsplash.com/photo-1624062999726-083e5268525d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkZXNlcnQlMjBzYWZhcmklMjBEdWJhaXxlbnwxfHx8fDE3NjIyMTUzNDZ8MA&ixlib=rb-4.1.0&q=80&w=1080',
      duration: '6 hours',
      price: 299,
      location: 'Dubai Desert Conservation Reserve',
      rating: 4.9,
      reviews: 1580,
      description: 'Experience the thrill of the Arabian desert with our premium Desert Safari. From heart-pounding dune bashing to a serene sunset/dinner under the stars, this is the quintessential Dubai experience.',
      inclusions: [
        'Pick up and drop off from your hotel',
        'Dune bashing in 4x4 Land Cruiser',
        'Camel riding and sandboarding',
        'Henna painting and traditional costumes',
        'BBQ Buffet Dinner with Veg/Non-Veg options',
        'Live Entertainment (Belly Dance, Tanoura Show, Fire Show)'
      ],
      exclusions: [
        'Quad bikes (optional add-on)',
        'Alcoholic beverages',
        'Professional photography',
        'Souvenirs'
      ],
      itinerary: [
        {
          time: '02:30 PM',
          title: 'Pickup & Departure',
          description: 'Comfortable pickup from your Dubai hotel in a 4x4 Land Cruiser.'
        },
        {
          time: '03:30 PM',
          title: 'Dune Bashing',
          description: 'Arrival at the desert. Let air out of tires and begin the thrilling dune bashing session.'
        },
        {
          time: '04:30 PM',
          title: 'Camp Activities',
          description: 'Arrive at the Bedouin camp. Enjoy camel rides, sandboarding, and henna painting.'
        },
        {
          time: '06:00 PM',
          title: 'Dinner & Shows',
          description: 'Sunset photography followed by a delicious BBQ buffet dinner and 3 live entertainment shows.'
        },
        {
          time: '08:30 PM',
          title: 'Drop off',
          description: 'Relaxing drive back to your hotel after an unforgettable evening.'
        }
      ]
    },
    {
      id: 'burj-khalifa',
      title: 'Burj Khalifa At The Top + Dubai Aquarium',
      image: 'https://images.unsplash.com/photo-1643904736472-8b77e93ca3d7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxEdWJhaSUyMHNreWxpbmUlMjBCdXJqJTIwS2hhbGlmYXxlbnwxfHx8fDE3NjIyODc0OTN8MA&ixlib=rb-4.1.0&q=80&w=1080',
      duration: '4 hours',
      price: 449,
      location: 'Downtown Dubai',
      rating: 4.8,
      reviews: 2140,
      description: 'Visit the world\'s tallest building and explore the fascinating underwater world at Dubai Aquarium. A perfect combination for a day of wonder in Downtown Dubai.',
      inclusions: [
        'Entry ticket to Burj Khalifa Levels 124 & 125',
        'Entry ticket to Dubai Aquarium & Underwater Zoo',
        'Access to telescopes on observation deck',
        'Wi-Fi throughout the attraction'
      ],
      exclusions: [
        'Transfers (unless selected)',
        'Food and beverages',
        'Guided tour',
        'Retail purchases'
      ],
      itinerary: [
        {
          time: 'Flexible',
          title: 'Burj Khalifa Entry',
          description: 'Enter the Burj Khalifa and ascend to the 124th floor in the world\'s fastest elevator.'
        },
        {
          time: '+1.5 Hours',
          title: 'Observation Deck',
          description: 'Enjoy 360-degree views of Dubai\'s skyline, ocean, and desert from levels 124 and 125.'
        },
        {
          time: '+2.5 Hours',
          title: 'Dubai Aquarium',
          description: 'Head down to Dubai Mall to explore the Aquarium tunnel and Underwater Zoo.'
        }
      ]
    }
  ];

  const tour = tours.find(t => t.id === tourId) || tours[0];

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <ScrollProgress />
      <Navigation />
      <main className="flex-1">

        {/* Hero */}
        <PageHero
          image={tour.image}
          height="60vh"
          title={
            <>
              <div className="flex flex-wrap gap-4 mb-6 justify-center">
                <span className="bg-amber-500/90 backdrop-blur-md text-white px-4 py-1.5 rounded-full text-sm font-bold uppercase tracking-wider shadow-lg border border-amber-400/50">
                  Most Popular
                </span>
                <span className="bg-white/20 backdrop-blur-md text-white px-4 py-1.5 rounded-full text-sm font-medium flex items-center gap-2 border border-white/20">
                  <Star className="w-4 h-4 fill-amber-400 text-amber-400" /> {tour.rating} ({tour.reviews} reviews)
                </span>
              </div>
              {tour.title}
            </>
          }
        >
          <div className="flex flex-wrap justify-center items-center gap-6 text-white/90 text-lg font-light">
            <span className="flex items-center gap-2">
              <Clock className="w-5 h-5 text-amber-400" /> {tour.duration}
            </span>
            <span className="flex items-center gap-2">
              <MapPin className="w-5 h-5 text-amber-400" /> {tour.location}
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
                    <span className="w-2 h-8 bg-amber-500 rounded-full" /> Experience
                  </h2>
                  <p className="text-lg text-neutral-600 leading-relaxed">
                    {tour.description}
                  </p>
                </motion.div>

                {/* Itinerary - Timeline Style */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                >
                  <h2 className="text-3xl font-bold mb-10 text-neutral-900 flex items-center gap-3">
                    <span className="w-2 h-8 bg-neutral-800 rounded-full" /> Schedule
                  </h2>
                  <div className="space-y-0 relative border-l-2 border-neutral-200 ml-4 lg:ml-6 pb-4">
                    {tour.itinerary.map((item, index) => (
                      <div key={index} className="relative pl-10 lg:pl-16 pb-12 last:pb-0">
                        <div className="absolute -left-[9px] top-0 w-4 h-4 rounded-full bg-white border-4 border-amber-500 shadow-md" />
                        <span className="absolute -left-14 lg:-left-24 top-[-6px] text-sm font-bold text-neutral-400 w-16 text-right">
                          {item.time}
                        </span>

                        <div className="bg-neutral-50 rounded-2xl p-6 hover:shadow-md transition-shadow">
                          <h4 className="text-lg font-bold mb-2 text-neutral-900">{item.title}</h4>
                          <p className="text-neutral-600 leading-relaxed">{item.description}</p>
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
                      <CheckCircle2 className="w-6 h-6" /> Highlights
                    </h3>
                    <ul className="space-y-4">
                      {tour.inclusions.map((item, index) => (
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
                      <XCircle className="w-6 h-6" /> Not Included
                    </h3>
                    <ul className="space-y-4">
                      {tour.exclusions.map((item, index) => (
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

                    <div className="mb-8">
                      <p className="text-neutral-500 text-sm font-medium uppercase tracking-wide mb-2">Price Per Person</p>
                      <div className="flex items-baseline gap-2">
                        <p className="text-4xl font-bold text-neutral-900">AED {tour.price}</p>
                        <p className="text-neutral-400 text-sm line-through">AED {Math.round(tour.price * 1.2)}</p>
                      </div>
                      <div className="mt-4 flex gap-2 text-xs font-medium text-amber-600 bg-amber-50 inline-flex px-3 py-1 rounded-full">
                        Offer ending soon
                      </div>
                    </div>

                    <div className="space-y-4">
                      <Button className="w-full h-14 text-lg bg-black hover:bg-neutral-800 text-white rounded-xl shadow-lg hover:shadow-xl transition-all">
                        Book Now <ArrowRight className="w-5 h-5 ml-2" />
                      </Button>
                      <a
                        href={`https://wa.me/971543977242?text=I'm interested in the ${tour.title}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center justify-center gap-3 w-full h-14 text-lg bg-[#25D366] hover:bg-[#20bd5a] text-white rounded-xl shadow-lg hover:shadow-xl transition-all font-medium"
                      >
                        <MessageCircle className="w-6 h-6" /> Chat on WhatsApp
                      </a>
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


