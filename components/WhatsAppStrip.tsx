import { Sparkles } from 'lucide-react';
import { Button } from './ui/button';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';

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

export function WhatsAppStrip() {
  const whatsappNumber = '+971543977242';
  const message = 'Hi, I need help with my bookings.';
  const whatsappUrl = `https://wa.me/${whatsappNumber.replace(/[^0-9]/g, '')}?text=${encodeURIComponent(message)}`;

  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], ['-50%', '50%']);

  return (
    <section ref={sectionRef} className="relative overflow-hidden min-h-[500px] flex items-center">
      {/* Parallax Image Background */}
      <motion.div 
        style={{ 
          y,
          backgroundImage: 'url(https://images.unsplash.com/photo-1597434429739-2574d7e06807?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxuYXR1cmUlMjBsYW5kc2NhcGUlMjBtb3VudGFpbnMlMjBzY2VuaWN8ZW58MXx8fHwxNzYyNjI2OTgyfDA&ixlib=rb-4.1.0&q=80&w=1080)'
        }}
        className="absolute inset-0 w-full h-[150%] top-[-25%] bg-cover bg-center"
      >
        {/* Black transparent overlay for text readability */}
        <div className="absolute inset-0 bg-black/60" />
      </motion.div>
      
      {/* Animated Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-white rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-white rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
      </div>
      
      <div className="relative max-w-[1400px] mx-auto px-6 lg:px-12 py-24">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-8">
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="text-center lg:text-left flex-1"
          >
            <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm rounded-full px-4 py-2 mb-4">
              <span className="text-white/90">Instant Support</span>
            </div>
            
            <h2 className="text-white mb-3 text-3xl lg:text-4xl">
              Need help with bookings?
            </h2>
            <p className="text-white/90 text-lg max-w-xl">
              Our travel experts are just a message away. Chat with us on WhatsApp for instant assistance and personalized recommendations.
            </p>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Button 
              asChild
              size="lg" 
              className="bg-[#25D366] hover:bg-[#20BA5A] text-white shadow-2xl hover:shadow-[#25D366]/30 h-16 px-10 rounded-2xl group border-0"
            >
              <a href={whatsappUrl} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3">
                <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center">
                  <WhatsAppIcon className="w-5 h-5 text-white" />
                </div>
                <div className="text-left">
                  <div className="font-semibold text-white">Chat on WhatsApp</div>
                  <div className="text-xs text-white/80">Usually replies instantly</div>
                </div>
              </a>
            </Button>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
