import { Mail, Phone, MapPin, Facebook, Instagram, Twitter, Send, Sparkles } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { motion } from 'framer-motion';
import { ImageWithFallback } from './figma/ImageWithFallback';

export function Footer() {
  return (
    <footer className="relative bg-gradient-to-b from-neutral-900 to-neutral-950 text-neutral-100 overflow-hidden">
      {/* Decorative Elements */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-20 left-20 w-96 h-96 bg-primary rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-20 w-96 h-96 bg-accent rounded-full blur-3xl" />
      </div>

      <div className="relative max-w-[1400px] mx-auto px-6 lg:px-12">
        {/* Newsletter Section */}
        <div className="py-16 border-b border-neutral-800">
          <div className="max-w-3xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="mb-6"
            >
              <h3 className="text-3xl lg:text-4xl mb-3">Get travel deals in your inbox</h3>
              <p className="text-neutral-400 text-lg">
                Subscribe to receive exclusive offers, travel tips, and destination inspiration delivered weekly
              </p>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="flex flex-col sm:flex-row gap-3 max-w-lg mx-auto"
            >
              <div className="relative flex-1">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-neutral-500" />
                <Input 
                  type="email" 
                  placeholder="Your email address" 
                  className="pl-12 h-14 rounded-2xl bg-neutral-800 border-neutral-700 text-white placeholder:text-neutral-500 focus:border-primary transition-colors"
                />
              </div>
              <Button className="bg-yellow-400 hover:bg-yellow-500 text-neutral-900 border-0 h-14 px-12 rounded-2xl shadow-lg hover:shadow-yellow-400/20 transition-all uppercase flex items-center gap-1 w-full sm:w-48">
                <Mail className="w-4 h-4" />
                Subscribe
              </Button>
            </motion.div>
          </div>
        </div>

        {/* Main Footer Content */}
        <div className="py-16">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
            {/* About */}
            <div>
              <div className="mb-6">
                <ImageWithFallback 
                  src="https://inceltourism.com/wp-content/uploads/elementor/thumbs/logowhite-qhzbd7e4e3m50i16db2lblzaxkieai6seqqrl7p81s.png"
                  alt="Incel Tourism"
                  className="h-16 w-auto"
                />
              </div>
              <p className="text-neutral-400 mb-6 leading-relaxed">
                UAE-licensed Destination Management Company serving travelers across Sub-Saharan Africa with expert visa assistance and unforgettable experiences.
              </p>
              <div className="flex gap-3">
                <a href="#" className="w-10 h-10 rounded-xl bg-neutral-800 hover:bg-gradient-to-br hover:from-primary hover:to-accent flex items-center justify-center transition-all group">
                  <Instagram className="w-5 h-5 text-neutral-400 group-hover:text-white transition-colors" />
                </a>
                <a href="#" className="w-10 h-10 rounded-xl bg-neutral-800 hover:bg-gradient-to-br hover:from-primary hover:to-accent flex items-center justify-center transition-all group">
                  <Facebook className="w-5 h-5 text-neutral-400 group-hover:text-white transition-colors" />
                </a>
                <a href="#" className="w-10 h-10 rounded-xl bg-neutral-800 hover:bg-gradient-to-br hover:from-primary hover:to-accent flex items-center justify-center transition-all group">
                  <Twitter className="w-5 h-5 text-neutral-400 group-hover:text-white transition-colors" />
                </a>
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h4 className="mb-6">Quick Links</h4>
              <ul className="space-y-3">
                {['Packages', 'Local Tours', 'UAE Visa', 'Global Visa', 'About Us', 'Contact'].map((link) => (
                  <li key={link}>
                    <a 
                      href={`#/${link.toLowerCase().replace(/\s+/g, '-')}`} 
                      className="text-neutral-400 hover:text-accent transition-colors inline-flex items-center gap-2 group"
                    >
                      <span className="w-1 h-1 rounded-full bg-neutral-700 group-hover:bg-accent transition-colors" />
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Dubai Office */}
            <div>
              <h4 className="mb-6">Dubai Office</h4>
              <ul className="space-y-4">
                <li className="flex gap-3 text-neutral-400">
                  <MapPin className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                  <span className="leading-relaxed">
                    Suite 403, Dubai National Insurance Building, Port Saeed, Dubai, UAE
                  </span>
                </li>
                <li className="flex gap-3">
                  <Phone className="w-5 h-5 text-primary flex-shrink-0" />
                  <a href="tel:+97143977242" className="text-neutral-400 hover:text-accent transition-colors">
                    +971 4 397 7242
                  </a>
                </li>
                <li className="flex gap-3">
                  <Mail className="w-5 h-5 text-primary flex-shrink-0" />
                  <a href="mailto:info@inceltourism.com" className="text-neutral-400 hover:text-accent transition-colors">
                    info@inceltourism.com
                  </a>
                </li>
              </ul>
            </div>

            {/* Lagos Office */}
            <div>
              <h4 className="mb-6">Lagos Office</h4>
              <ul className="space-y-4">
                <li className="flex gap-3 text-neutral-400">
                  <MapPin className="w-5 h-5 text-accent flex-shrink-0 mt-0.5" />
                  <span className="leading-relaxed">
                    4th Floor, Right Wing, Mulliner Towers, Plot 39 Alfred Rewane Road, Ikoyi, Lagos, Nigeria
                  </span>
                </li>
                <li className="flex gap-3">
                  <Phone className="w-5 h-5 text-accent flex-shrink-0" />
                  <a href="tel:+2348180850745" className="text-neutral-400 hover:text-accent transition-colors">
                    +234 818 085 0745
                  </a>
                </li>
                <li className="flex gap-3">
                  <Mail className="w-5 h-5 text-accent flex-shrink-0" />
                  <a href="mailto:info@inceltourism.com" className="text-neutral-400 hover:text-accent transition-colors">
                    info@inceltourism.com
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-neutral-800 py-8">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
            <p className="text-neutral-400">© 2025 Incel Tourism. All rights reserved.</p>
            <div className="flex flex-wrap gap-6 justify-center">
              <a href="#/privacy-policy" className="text-neutral-400 hover:text-accent transition-colors">Privacy Policy</a>
              <a href="#/terms-and-conditions" className="text-neutral-400 hover:text-accent transition-colors">Terms & Conditions</a>
              <a href="#/faq" className="text-neutral-400 hover:text-accent transition-colors">FAQ</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
