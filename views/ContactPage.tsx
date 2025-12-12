'use client';

import { useState } from 'react';
import { MapPin, Phone, Mail, Clock, Send } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Textarea } from '../components/ui/textarea';
import { Card } from '../components/ui/card';
import { motion } from 'framer-motion';

// WhatsApp Icon Component
const WhatsAppIcon = ({ className }: { className?: string }) => (
  <svg
    viewBox="0 0 24 24"
    fill="currentColor"
    className={className}
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
  </svg>
);

import { PageHero } from '../components/PageHero';

export function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert('Thank you for your message! We will get back to you shortly.');
  };

  return (
    <div className="bg-white min-h-screen">
      {/* Hero */}
      <PageHero
        image="https://images.unsplash.com/photo-1673515335086-c762bbd7a7cf?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0cmF2ZWwlMjBhZ2VuY3klMjBjb250YWN0JTIwY3VzdG9tZXIlMjBzZXJ2aWNlfGVufDF8fHx8MTc2MjYzNzg0OHww&ixlib=rb-4.1.0&q=80&w=1080"
        title={<>Get in <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent">Touch</span></>}
        subtitle="We're here to help you plan your next adventure. Reach out to us for personalized travel guidance."
      />

      {/* Contact Content */}
      <section className="py-20 relative z-10">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-20">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-20" style={{ paddingTop: '20px', paddingBottom: '50px' }}>
            {/* Dubai Office */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="group p-8 bg-white rounded-[2rem] shadow-xl border border-neutral-100 hover:shadow-2xl transition-all duration-300"
            >
              <div className="w-14 h-14 bg-blue-50 rounded-2xl flex items-center justify-center mb-6 text-blue-600 group-hover:scale-110 transition-transform">
                <MapPin className="w-7 h-7" />
              </div>
              <h3 className="text-2xl font-bold mb-4 text-neutral-900">Dubai HQ</h3>
              <div className="space-y-4 text-neutral-600">
                <p className="leading-relaxed">
                  Suite 403, Dubai National Insurance Building<br />
                  Port Saeed, Dubai, UAE
                </p>
                <div className="flex items-center gap-3 pt-2">
                  <Phone className="w-5 h-5 text-blue-500" />
                  <a href="tel:+97143977242" className="hover:text-blue-600 font-medium transition-colors">
                    +971 4 397 7242
                  </a>
                </div>
                <div className="flex items-center gap-3">
                  <Mail className="w-5 h-5 text-blue-500" />
                  <a href="mailto:info@inceltourism.com" className="hover:text-blue-600 font-medium transition-colors">
                    info@inceltourism.com
                  </a>
                </div>
                <div className="flex items-center gap-3 text-sm text-neutral-500 pt-2 border-t border-neutral-100 mt-4">
                  <Clock className="w-4 h-4" />
                  <p>Sun - Thu: 9AM - 6PM</p>
                </div>
              </div>
            </motion.div>

            {/* Lagos Office */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="group p-8 bg-white rounded-[2rem] shadow-xl border border-neutral-100 hover:shadow-2xl transition-all duration-300"
            >
              <div className="w-14 h-14 bg-green-50 rounded-2xl flex items-center justify-center mb-6 text-green-600 group-hover:scale-110 transition-transform">
                <MapPin className="w-7 h-7" />
              </div>
              <h3 className="text-2xl font-bold mb-4 text-neutral-900">Lagos Office</h3>
              <div className="space-y-4 text-neutral-600">
                <p className="leading-relaxed">
                  4th Floor, Right Wing, Mulliner Towers<br />
                  Ikoyi, Lagos, Nigeria
                </p>
                <div className="flex items-center gap-3 pt-2">
                  <Phone className="w-5 h-5 text-green-500" />
                  <a href="tel:+2348180850745" className="hover:text-green-600 font-medium transition-colors">
                    +234 818 085 0745
                  </a>
                </div>
                <div className="flex items-center gap-3">
                  <Mail className="w-5 h-5 text-green-500" />
                  <a href="mailto:info@inceltourism.com" className="hover:text-green-600 font-medium transition-colors">
                    info@inceltourism.com
                  </a>
                </div>
                <div className="flex items-center gap-3 text-sm text-neutral-500 pt-2 border-t border-neutral-100 mt-4">
                  <Clock className="w-4 h-4" />
                  <p>Mon - Fri: 9AM - 5PM</p>
                </div>
              </div>
            </motion.div>

            {/* Quick Contact */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="relative p-8 bg-gradient-to-br from-primary to-accent rounded-[2rem] shadow-xl text-white overflow-hidden"
            >
              <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-2xl -mr-10 -mt-10" />
              <div className="absolute bottom-0 left-0 w-32 h-32 bg-black/10 rounded-full blur-2xl -mb-10 -ml-10" />

              <div className="relative z-10">
                <h3 className="text-2xl font-bold mb-4">Quick Support</h3>
                <p className="text-blue-100 mb-8 leading-relaxed">
                  Need immediate assistance? Our support team is available 24/7 on WhatsApp to answer your queries.
                </p>
                <div className="space-y-4">
                  <Button asChild size="lg" className="w-full bg-[#25D366] hover:bg-[#20bd5a] text-white border-0 h-12 shadow-lg hover:shadow-xl transition-all">
                    <a href="https://wa.me/971543977242" target="_blank" rel="noopener noreferrer" className="flex items-center justify-center gap-2 font-bold">
                      <WhatsAppIcon className="w-5 h-5" />
                      Chat on WhatsApp
                    </a>
                  </Button>
                  <Button asChild variant="outline" size="lg" className="w-full bg-white/10 text-white border-white/20 hover:bg-white/20 h-12">
                    <a href="tel:+97143977242">
                      Call Support
                    </a>
                  </Button>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-white rounded-[2.5rem] shadow-2xl px-8 md:px-12 py-8 md:py-12 pt-20 md:pt-24 relative overflow-hidden border border-neutral-100"
          >
            <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-primary to-accent" />

            <div className="max-w-3xl mx-auto">
              <div className="text-center mb-10">
                <h2 className="text-3xl md:text-4xl font-bold mb-4">Send us a Message</h2>
                <p className="text-neutral-600">Fill out the form below and we'll get back to you within 24 hours.</p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="space-y-2">
                    <Label htmlFor="name" className="text-neutral-600 font-medium ml-1">Your Name</Label>
                    <Input
                      id="name"
                      placeholder="John Doe"
                      className="h-12 rounded-xl border-neutral-200 focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all bg-neutral-50 focus:bg-white"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email" className="text-neutral-600 font-medium ml-1">Email Address</Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="john@example.com"
                      className="h-12 rounded-xl border-neutral-200 focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all bg-neutral-50 focus:bg-white"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      required
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="space-y-2">
                    <Label htmlFor="phone" className="text-neutral-600 font-medium ml-1">Phone Number</Label>
                    <Input
                      id="phone"
                      type="tel"
                      placeholder="+971 50 000 0000"
                      className="h-12 rounded-xl border-neutral-200 focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all bg-neutral-50 focus:bg-white"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="subject" className="text-neutral-600 font-medium ml-1">Subject</Label>
                    <Input
                      id="subject"
                      placeholder="General Inquiry"
                      className="h-12 rounded-xl border-neutral-200 focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all bg-neutral-50 focus:bg-white"
                      value={formData.subject}
                      onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="message" className="text-neutral-600 font-medium ml-1">Message</Label>
                  <Textarea
                    id="message"
                    placeholder="How can we help you?"
                    className="min-h-[150px] rounded-xl border-neutral-200 focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all bg-neutral-50 focus:bg-white resize-none"
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    required
                  />
                </div>

                <Button
                  type="submit"
                  size="lg"
                  className="w-full h-14 text-lg bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90 text-white rounded-xl shadow-xl hover:shadow-2xl transition-all mt-6"
                >
                  <Send className="w-5 h-5 mr-2" /> Send Message
                </Button>
              </form>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Map Placeholder - Styled */}
      <section className="h-[400px] w-full bg-neutral-100 relative grayscale hover:grayscale-0 transition-all duration-700">
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center p-8 bg-white/80 backdrop-blur-md rounded-2xl shadow-lg border border-white/50">
            <MapPin className="w-10 h-10 text-neutral-400 mx-auto mb-4" />
            <p className="text-neutral-500 font-medium">Interactive Map Integration</p>
            <p className="text-xs text-neutral-400 mt-2">View our locations on Google Maps</p>
          </div>
        </div>
        {/* Actual map iframe would go here */}
        <div className="w-full h-full bg-[url('https://images.unsplash.com/photo-1524661135-423995f22d0b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtYXAlMjBkaXJlY3Rpb258ZW58MXx8fHwxNzYyNjM3ODQ5fDA&ixlib=rb-4.1.0&q=80&w=1080')] bg-cover bg-center opacity-30" />
      </section>
    </div>
  );
}
