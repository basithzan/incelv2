'use client';

import { useParams } from 'next/navigation';
import { Navigation } from '../../../components/Navigation';
import { Footer } from '../../../components/Footer';
import { WhatsAppButton } from '../../../components/WhatsAppButton';
import { ScrollProgress } from '../../../components/ScrollProgress';
import { Toaster } from '../../../components/ui/sonner';

export default function PackageDetail() {
  const params = useParams();
  const packageId = params.id as string;
  
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
    <div className="min-h-screen flex flex-col">
      <ScrollProgress />
      <Navigation />
      <main className="flex-1">
        <div>
          {/* Hero */}
          <section className="relative h-[500px] flex items-end overflow-hidden">
            <div 
              className="absolute inset-0 bg-cover bg-center"
              style={{ backgroundImage: `url(${pkg.image})` }}
            >
              <div className="absolute inset-0 bg-gradient-to-t from-neutral-900 via-neutral-900/50 to-transparent" />
            </div>
            <div className="relative z-10 w-full">
              <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-20 pb-12">
                <h1 className="text-white mb-4">{pkg.title}</h1>
                <div className="flex flex-wrap gap-4 text-white">
                  <span>📍 {pkg.location}</span>
                  <span>📅 {pkg.duration}</span>
                  <span className="font-semibold">From AED {pkg.price.toLocaleString()}</span>
                </div>
              </div>
            </div>
          </section>

          <section className="py-12">
            <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-20">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Main Content */}
                <div className="lg:col-span-2 space-y-8">
                  {/* Overview */}
                  <div>
                    <h2 className="mb-4">Overview</h2>
                    <p className="text-neutral-700">{pkg.description}</p>
                  </div>

                  {/* Itinerary */}
                  <div>
                    <h2 className="mb-6">Day-by-Day Itinerary</h2>
                    <div className="space-y-4">
                      {pkg.itinerary.map((day) => (
                        <div key={day.day} className="border-l-4 border-primary pl-6 py-2">
                          <h4 className="mb-2">Day {day.day}: {day.title}</h4>
                          <p className="text-neutral-700">{day.description}</p>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Inclusions */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div>
                      <h3 className="mb-4">Included</h3>
                      <ul className="space-y-2">
                        {pkg.inclusions.map((item, index) => (
                          <li key={index} className="flex items-start gap-2 text-neutral-700">
                            <span className="text-accent mt-1">✓</span>
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <h3 className="mb-4">Not Included</h3>
                      <ul className="space-y-2">
                        {pkg.exclusions.map((item, index) => (
                          <li key={index} className="flex items-start gap-2 text-neutral-700">
                            <span className="text-danger mt-1">✗</span>
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>

                {/* Sidebar */}
                <div className="space-y-6">
                  <div className="bg-neutral-100 rounded-xl p-6 sticky top-24">
                    <div className="mb-6">
                      <p className="text-neutral-700 mb-2">Starting from</p>
                      <p className="text-primary mb-4">AED {pkg.price.toLocaleString()}</p>
                      <p className="text-neutral-500">per person (twin sharing)</p>
                    </div>
                    <div className="space-y-4">
                      <button className="w-full bg-primary text-white py-3 px-6 rounded-lg hover:bg-primary/90 transition-colors">
                        Enquire Now
                      </button>
                      <button className="w-full border border-primary text-primary py-3 px-6 rounded-lg hover:bg-primary/5 transition-colors">
                        Customize Package
                      </button>
                      <a
                        href="https://wa.me/971543977242?text=I'm interested in the Dubai Explorer package"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-full bg-accent text-white py-3 rounded-lg hover:bg-accent/90 transition-colors flex items-center justify-center gap-2"
                      >
                        Chat on WhatsApp
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>
      </main>
      <Footer />
      <WhatsAppButton />
      <Toaster position="top-right" richColors />
    </div>
  );
}


