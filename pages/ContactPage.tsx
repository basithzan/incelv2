'use client';

import { useState } from 'react';
import { MapPin, Phone, Mail, Clock } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Textarea } from '../components/ui/textarea';
import { Card } from '../components/ui/card';

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
    <div>
      {/* Hero */}
      <section className="relative h-96 flex items-center justify-center overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: `url(https://images.unsplash.com/photo-1673515335086-c762bbd7a7cf?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0cmF2ZWwlMjBhZ2VuY3klMjBjb250YWN0JTIwY3VzdG9tZXIlMjBzZXJ2aWNlfGVufDF8fHx8MTc2MjYzNzg0OHww&ixlib=rb-4.1.0&q=80&w=1080)`
          }}
        >
          <div className="absolute inset-0 bg-neutral-900/50" />
        </div>
        <div className="relative z-10 text-center text-white max-w-3xl mx-auto px-4">
          <h1 className="mb-4">Contact Us</h1>
          <p>Get in touch with our team. We're here to help with all your travel needs.</p>
        </div>
      </section>

      {/* Contact Information & Form */}
      <section className="py-20">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-20">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
            {/* Dubai Office */}
            <Card className="p-6">
              <h3 className="mb-4">Dubai Office</h3>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <MapPin className="w-5 h-5 text-primary flex-shrink-0 mt-1" />
                  <div>
                    <p className="text-neutral-700">
                      Suite 403, Dubai National Insurance Building<br />
                      Port Saeed, Dubai, UAE
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Phone className="w-5 h-5 text-primary flex-shrink-0" />
                  <a href="tel:+97143977242" className="text-neutral-700 hover:text-primary">
                    +971 4 397 7242
                  </a>
                </div>
                <div className="flex items-center gap-3">
                  <Mail className="w-5 h-5 text-primary flex-shrink-0" />
                  <a href="mailto:info@inceltourism.com" className="text-neutral-700 hover:text-primary">
                    info@inceltourism.com
                  </a>
                </div>
                <div className="flex items-start gap-3">
                  <Clock className="w-5 h-5 text-primary flex-shrink-0 mt-1" />
                  <div className="text-neutral-700">
                    <p>Sunday - Thursday: 9:00 AM - 6:00 PM</p>
                    <p>Friday - Saturday: Closed</p>
                  </div>
                </div>
              </div>
            </Card>

            {/* Lagos Office */}
            <Card className="p-6">
              <h3 className="mb-4">Lagos Office</h3>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <MapPin className="w-5 h-5 text-primary flex-shrink-0 mt-1" />
                  <div>
                    <p className="text-neutral-700">
                      4th Floor, Right Wing, Mulliner Towers<br />
                      Plot 39 Alfred Rewane Road<br />
                      Ikoyi, Lagos, Nigeria
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Phone className="w-5 h-5 text-primary flex-shrink-0" />
                  <a href="tel:+2348180850745" className="text-neutral-700 hover:text-primary">
                    +234 818 085 0745
                  </a>
                </div>
                <div className="flex items-center gap-3">
                  <Mail className="w-5 h-5 text-primary flex-shrink-0" />
                  <a href="mailto:info@inceltourism.com" className="text-neutral-700 hover:text-primary">
                    info@inceltourism.com
                  </a>
                </div>
                <div className="flex items-start gap-3">
                  <Clock className="w-5 h-5 text-primary flex-shrink-0 mt-1" />
                  <div className="text-neutral-700">
                    <p>Monday - Friday: 9:00 AM - 5:00 PM</p>
                    <p>Saturday - Sunday: Closed</p>
                  </div>
                </div>
              </div>
            </Card>

            {/* Quick Contact */}
            <Card className="p-6 bg-[#0076ad] text-white">
              <h3 className="mb-4">Quick Contact</h3>
              <p className="mb-6">
                For immediate assistance, reach us through WhatsApp or call our 24/7 helpline.
              </p>
              <div className="space-y-3">
                <Button asChild className="w-full bg-[#25D366] hover:bg-[#20BA5A] text-white border-0">
                  <a href="https://wa.me/971543977242" target="_blank" rel="noopener noreferrer" className="flex items-center justify-center gap-2">
                    <WhatsAppIcon className="w-5 h-5" />
                    Chat on WhatsApp
                  </a>
                </Button>
                <Button asChild variant="outline" className="w-full bg-white text-neutral-900 hover:bg-white/90">
                  <a href="tel:+97143977242">
                    Call Dubai Office
                  </a>
                </Button>
              </div>
            </Card>
          </div>

          {/* Contact Form */}
          <Card className="p-8 max-w-3xl mx-auto">
            <h2 className="mb-6 text-center">Send Us a Message</h2>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="name">Your Name</Label>
                  <Input
                    id="name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email Address</Label>
                  <Input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="phone">Phone Number</Label>
                  <Input
                    id="phone"
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="subject">Subject</Label>
                  <Input
                    id="subject"
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="message">Message</Label>
                <Textarea
                  id="message"
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  rows={6}
                  required
                />
              </div>

              <Button 
                type="submit" 
                size="lg" 
                className="w-full bg-yellow-400 hover:bg-yellow-500 text-neutral-900 px-6 rounded-full shadow-lg hover:shadow-xl transition-all border-0"
              >
                Send Message
              </Button>
            </form>
          </Card>
        </div>
      </section>

      {/* Map Placeholder */}
      <section className="py-12 bg-neutral-100">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-20">
          <div className="bg-neutral-300 rounded-xl h-96 flex items-center justify-center">
            <p className="text-neutral-700">Google Maps Integration Placeholder</p>
          </div>
        </div>
      </section>
    </div>
  );
}
