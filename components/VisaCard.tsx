import { Card } from './ui/card';
import { Button } from './ui/button';
import { Clock, FileText, CheckCircle2, ArrowRight } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { motion } from 'framer-motion';

interface VisaCardProps {
  country: string;
  flag: string;
  processingTime: string;
  price: number;
  currency?: string;
  requirements: string[];
  visaType: string;
}

export function VisaCard({
  country,
  flag,
  processingTime,
  price,
  currency = 'AED',
  requirements,
  visaType
}: VisaCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      className="h-full"
    >
      <Card className="overflow-hidden group border border-neutral-200 shadow-md hover:shadow-xl transition-all duration-300 bg-white rounded-2xl relative h-full flex flex-col">
        {/* Header Section with Flag */}
        <div className="relative bg-gradient-to-br from-primary/10 via-accent/5 to-primary/10 p-6 border-b border-neutral-100">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-4">
              <div className="w-16 h-12 rounded-lg overflow-hidden border-2 border-white shadow-sm bg-white">
                <ImageWithFallback
                  src={flag}
                  alt={`${country} flag`}
                  className="w-full h-full object-cover"
                />
              </div>
              <div>
                <h3 className="text-xl font-bold text-neutral-900 mb-1">
                  {country} Visa
                </h3>
                <p className="text-sm text-neutral-600 font-medium">
                  {visaType}
                </p>
              </div>
            </div>
          </div>

        </div>

        {/* Content Section */}
        <div className="px-6 pb-6 pt-4 flex-1 flex flex-col">
          {/* Info Icons */}
          <div className="space-y-3 mb-6">
            <div className="flex items-center gap-3 text-neutral-700">
              <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                <Clock className="w-5 h-5 text-primary" />
              </div>
              <div>
                <p className="text-sm font-medium text-neutral-900">Processing Time</p>
                <p className="text-sm text-neutral-600">{processingTime}</p>
              </div>
            </div>
            
            <div className="flex items-center gap-3 text-neutral-700">
              <div className="w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center flex-shrink-0">
                <FileText className="w-5 h-5 text-accent" />
              </div>
              <div>
                <p className="text-sm font-medium text-neutral-900">Documents</p>
                <p className="text-sm text-neutral-600">{requirements.length} documents required</p>
              </div>
            </div>
          </div>

          {/* Requirements List */}
          <div className="mb-6 flex-1">
            <p className="text-sm font-semibold text-neutral-900 mb-3">Required Documents:</p>
            <ul className="space-y-2.5">
              {requirements.map((req, index) => (
                <li 
                  key={index}
                  className="flex items-start gap-2.5 text-sm text-neutral-700"
                >
                  <CheckCircle2 className="w-4 h-4 text-accent flex-shrink-0 mt-0.5" />
                  <span className="leading-relaxed">{req}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* CTA Button */}
          <Button 
            asChild
            className="w-full bg-yellow-400 hover:bg-yellow-500 text-neutral-900 rounded-lg h-11 font-semibold shadow-lg hover:shadow-xl transition-all border-0"
          >
            <a 
              href="#visa-application-form"
              onClick={(e) => {
                e.preventDefault();
                const element = document.getElementById('visa-application-form');
                if (element) {
                  element.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }
              }}
              className="flex items-center justify-center gap-2"
            >
              Apply Now
              <ArrowRight className="w-4 h-4" />
            </a>
          </Button>
        </div>
      </Card>
    </motion.div>
  );
}
