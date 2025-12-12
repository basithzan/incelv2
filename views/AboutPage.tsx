import { Award, Globe, Users, TrendingUp, CheckCircle2 } from 'lucide-react';
import { ImageWithFallback } from '../components/figma/ImageWithFallback';
import { motion } from 'framer-motion';
import { PageHero } from '../components/PageHero';

const stats = [
  { icon: Award, label: '6+ Years', description: 'Industry Experience' },
  { icon: Globe, label: 'UAE Licensed', description: 'Fully Regulated DMC' },
  { icon: Users, label: '10,000+', description: 'Happy Travelers' },
  { icon: TrendingUp, label: '95%', description: 'Customer Satisfaction' }
];

const values = [
  {
    title: 'Trust',
    description: 'We build lasting relationships through transparency and reliability',
    color: 'from-blue-500 to-cyan-500'
  },
  {
    title: 'Value',
    description: 'Competitive pricing without compromising on quality or experience',
    color: 'from-primary to-accent'
  },
  {
    title: 'Service',
    description: 'Dedicated support team available 24/7 for your peace of mind',
    color: 'from-amber-500 to-orange-500'
  },
  {
    title: 'Expertise',
    description: 'Deep destination knowledge and industry partnerships worldwide',
    color: 'from-emerald-500 to-teal-500'
  }
];

export function AboutPage() {
  return (
    <div className="bg-white">
      {/* Hero */}
      <PageHero
        image="https://images.unsplash.com/photo-1643904736472-8b77e93ca3d7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxEdWJhaSUyMHNreWxpbmUlMjBCdXJqJTIwS2hhbGlmYXxlbnwxfHx8fDE3NjIyODc0OTN8MA&ixlib=rb-4.1.0&q=80&w=1080"
        title={<>About <span className="inline-block text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent">Incel Tourism</span></>}
        subtitle="Your trusted partner in creating unforgettable travel experiences"
      >
        <span className="inline-block py-1 px-3 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-sm font-medium text-white">
          Establishing Excellence Since 2018
        </span>
      </PageHero>

      {/* Two Column Content */}
      <section className="py-24 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-1/3 h-full bg-gradient-to-l from-blue-50/50 to-transparent pointer-events-none" />

        <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-20 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
            <div className="space-y-8 pr-4 lg:pr-12">
              <div>
                <h2 className="text-4xl md:text-5xl font-bold mb-6 tracking-tight text-neutral-900">
                  Global Reach, <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent">Local Expertise</span>
                </h2>
                <div className="w-20 h-1.5 bg-gradient-to-r from-primary to-accent rounded-full mb-8" />
              </div>

              <div className="space-y-6 text-lg text-neutral-600 leading-relaxed">
                <p>
                  Incel Tourism is a fully licensed Destination Management Company (DMC) based in Dubai, UAE, with a comprehensive office in Lagos, Nigeria, strategically positioned to serve travelers across Sub-Saharan Africa.
                </p>
                <p>
                  Since our establishment, we have been committed to delivering exceptional travel experiences, from visa processing and curated tour packages to local excursions and comprehensive travel support.
                </p>
                <p>
                  Our expert team combines deep destination knowledge with personalized service, ensuring every journey exceeds expectations. Whether you're planning a family vacation, business trip, or spiritual pilgrimage, we're here to make it seamless and memorable.
                </p>
              </div>

              <div className="grid grid-cols-2 gap-4 pt-4">
                {['Licensed DMC', 'Expert Team', '24/7 Support', 'Global Network'].map((item) => (
                  <div key={item} className="flex items-center gap-2">
                    <CheckCircle2 className="w-5 h-5 text-green-500" />
                    <span className="font-medium text-neutral-800">{item}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="relative h-[500px] rounded-[2.5rem] overflow-hidden rotate-3 hover:rotate-0 transition-transform duration-500">
              <ImageWithFallback
                src="https://images.unsplash.com/photo-1758223725156-ee49cc327a46?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsdXh1cnklMjB0cmF2ZWwlMjBmYW1pbHl8ZW58MXx8fHwxNzYyMzcxNjc2fDA&ixlib=rb-4.1.0&q=80&w=1080"
                alt="Travel experience"
                className="w-full h-full object-cover"
                style={{ borderRadius: '2.5rem' }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent z-10 rounded-[2.5rem]" />
              <div className="absolute bottom-8 left-8 right-8 z-20">
                <div className="bg-white/90 backdrop-blur-md p-6 rounded-2xl shadow-lg border border-white/50">
                  <p className="text-sm font-semibold text-blue-600 mb-1">Our Promise</p>
                  <p className="text-neutral-900 font-medium">Creating memories that last a lifetime.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Strip - Enhanced */}
      <section className="py-20 bg-neutral-900 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/30 via-accent/30 to-primary/20" />

        <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-20 relative z-10">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12">
            {stats.map((stat, index) => (
              <div key={index} className="text-center group">
                <div className="w-16 h-16 mx-auto mb-6 bg-white/10 rounded-2xl flex items-center justify-center backdrop-blur-sm group-hover:scale-110 group-hover:bg-white/20 transition-all duration-300">
                  <stat.icon className="w-8 h-8 text-blue-400 group-hover:text-white transition-colors" />
                </div>
                <p className="text-4xl font-bold mb-2 bg-clip-text text-transparent bg-gradient-to-b from-white to-white/60">
                  {stat.label}
                </p>
                <p className="text-white/60 text-sm tracking-wider uppercase">{stat.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Values Grid - Bento Style */}
      <section className="py-24 bg-neutral-50">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-20">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-neutral-900">
              Our Core <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent">Values</span>
            </h2>
            <p className="text-lg text-neutral-600 max-w-2xl mx-auto">
              The principles that guide everything we do and define our commitment to excellence
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((value, index) => (
              <div
                key={index}
                className="group relative p-8 bg-white rounded-[2rem] shadow-xl hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 border border-neutral-100 overflow-hidden"
              >
                <div className="absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r from-primary to-accent" />
                <div className={`absolute -right-8 -bottom-8 w-32 h-32 bg-gradient-to-br ${value.color} opacity-5 group-hover:opacity-10 transition-opacity rounded-full blur-2xl`} />

                <h3 className="text-2xl font-bold mb-4 text-neutral-900">{value.title}</h3>
                <p className="text-neutral-600 leading-relaxed relative z-10">
                  {value.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Mission Statement - Modern */}
      <section className="py-24 bg-white relative">
        <div className="max-w-[1000px] mx-auto px-4 sm:px-6 lg:px-20 text-center relative z-10">
          <h2 className="text-lg font-bold tracking-widest text-blue-600 uppercase mb-4">Our Mission</h2>
          <p className="text-3xl md:text-5xl font-medium text-neutral-900 leading-tight">
            "To be the leading DMC connecting <span className="text-blue-600">Africa</span> to the <span className="text-purple-600">world</span>,
            delivering exceptional travel experiences through expert guidance."
          </p>
        </div>
      </section>
    </div>
  );
}
