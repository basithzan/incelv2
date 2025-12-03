import { Award, Globe, Users, TrendingUp } from 'lucide-react';
import { ImageWithFallback } from '../components/figma/ImageWithFallback';

const stats = [
  { icon: Award, label: '6+ Years', description: 'Industry Experience' },
  { icon: Globe, label: 'UAE Licensed', description: 'Fully Regulated DMC' },
  { icon: Users, label: '10,000+', description: 'Happy Travelers' },
  { icon: TrendingUp, label: '95%', description: 'Customer Satisfaction' }
];

const values = [
  {
    title: 'Trust',
    description: 'We build lasting relationships through transparency and reliability'
  },
  {
    title: 'Value',
    description: 'Competitive pricing without compromising on quality or experience'
  },
  {
    title: 'Service',
    description: 'Dedicated support team available 24/7 for your peace of mind'
  },
  {
    title: 'Expertise',
    description: 'Deep destination knowledge and industry partnerships worldwide'
  }
];

export function AboutPage() {
  return (
    <div>
      {/* Hero */}
      <section className="relative h-96 flex items-center justify-center overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: `url(https://images.unsplash.com/photo-1643904736472-8b77e93ca3d7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxEdWJhaSUyMHNreWxpbmUlMjBCdXJqJTIwS2hhbGlmYXxlbnwxfHx8fDE3NjIyODc0OTN8MA&ixlib=rb-4.1.0&q=80&w=1080)`
          }}
        >
          <div className="absolute inset-0 bg-neutral-900/50" />
        </div>
        <div className="relative z-10 text-center text-white">
          <h1 className="mb-4">About Incel Tourism</h1>
          <p>Your trusted partner in creating unforgettable travel experiences</p>
        </div>
      </section>

      {/* Two Column Content */}
      <section className="py-20">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-20">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="mb-6">Destination Management Company</h2>
              <p className="text-neutral-700 mb-4">
                Incel Tourism is a fully licensed Destination Management Company (DMC) based in Dubai, UAE, with a comprehensive office in Lagos, Nigeria, strategically positioned to serve travelers across Sub-Saharan Africa.
              </p>
              <p className="text-neutral-700 mb-4">
                Since our establishment, we have been committed to delivering exceptional travel experiences, from visa processing and curated tour packages to local excursions and comprehensive travel support.
              </p>
              <p className="text-neutral-700">
                Our expert team combines deep destination knowledge with personalized service, ensuring every journey exceeds expectations. Whether you're planning a family vacation, business trip, or spiritual pilgrimage, we're here to make it seamless and memorable.
              </p>
            </div>
            <div className="relative h-[400px] rounded-2xl overflow-hidden">
              <ImageWithFallback
                src="https://images.unsplash.com/photo-1758223725156-ee49cc327a46?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsdXh1cnklMjB0cmF2ZWwlMjBmYW1pbHl8ZW58MXx8fHwxNzYyMzcxNjc2fDA&ixlib=rb-4.1.0&q=80&w=1080"
                alt="Travel experience"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Stats Strip */}
      <section className="py-16 bg-[#0076ad] text-white">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-20">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="flex justify-center mb-4">
                  <stat.icon className="w-12 h-12" />
                </div>
                <p className="mb-1">{stat.label}</p>
                <p className="text-white/80">{stat.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Values Grid */}
      <section className="py-20">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-20">
          <div className="text-center mb-12">
            <h2 className="mb-4">Our Core Values</h2>
            <p className="text-neutral-700 max-w-2xl mx-auto">
              The principles that guide everything we do
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <div key={index} className="text-center p-6 bg-neutral-100 rounded-xl">
                <h3 className="mb-3">{value.title}</h3>
                <p className="text-neutral-700">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Mission Statement */}
      <section className="py-16 bg-neutral-100">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-20 text-center">
          <h2 className="mb-6">Our Mission</h2>
          <p className="text-neutral-700 max-w-3xl mx-auto">
            To be the leading destination management company connecting Africa to the world, 
            delivering exceptional travel experiences through expert guidance, personalized service, 
            and unwavering commitment to customer satisfaction.
          </p>
        </div>
      </section>
    </div>
  );
}
