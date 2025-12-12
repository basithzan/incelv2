import { Badge } from './ui/badge';
import { Calendar, MapPin, Star, Clock, Users, ArrowUpRight } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { useRef } from 'react';

interface PackageCardProps {
  id: string;
  title: string;
  image: string;
  location: string;
  duration: string;
  price: number;
  currency?: string;
  category: string;
  highlights?: string[];
}

export function PackageCard({
  id,
  title,
  image,
  location,
  duration,
  price,
  currency = 'AED',
  category,
}: PackageCardProps) {
  const ref = useRef<HTMLDivElement>(null);

  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x);
  const mouseYSpring = useSpring(y);

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["12deg", "-12deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-12deg", "12deg"]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    if (!ref.current) return;

    const rect = ref.current.getBoundingClientRect();

    const width = rect.width;
    const height = rect.height;

    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;

    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;

    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      style={{
        perspective: 1000,
      }}
      className="h-full"
    >
      <motion.div
        ref={ref}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={{
          rotateX,
          rotateY,
          transformStyle: "preserve-3d",
        }}
        className="group relative h-[450px] w-full cursor-pointer rounded-[2rem] bg-neutral-900 transition-all duration-200 ease-linear shadow-xl"
        onClick={() => window.location.href = `#/packages/${id}`}
      >
        {/* Reflection/Sheen Effect */}
        <div
          style={{
            transform: "translateZ(75px)",
            transformStyle: "preserve-3d",
          }}
          className="absolute inset-4 z-10 grid place-content-center rounded-xl bg-white/10 opacity-0 transition-opacity duration-500 group-hover:opacity-10 pointer-events-none"
        />

        {/* Background Image */}
        <div className="absolute inset-0 h-full w-full overflow-hidden rounded-[2rem]">
          <ImageWithFallback
            src={image}
            alt={title}
            className="h-full w-full object-cover transition-transform duration-700 ease-in-out group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent" />
        </div>

        {/* Floating Badges - 3D Lift */}
        <div
          style={{ transform: "translateZ(50px)" }}
          className="absolute top-4 left-4 right-4 flex justify-between z-20 pointer-events-none"
        >
          <Badge className="bg-white/90 backdrop-blur-md text-neutral-900 font-semibold px-3 py-1.5 rounded-full border-0 shadow-lg">
            {category}
          </Badge>
          <div className="flex items-center gap-1 bg-white/90 backdrop-blur-md rounded-full px-2.5 py-1.5 shadow-lg">
            <Star className="w-3.5 h-3.5 text-amber-500 fill-amber-500" />
            <span className="text-xs font-bold text-neutral-900">4.9</span>
          </div>
        </div>

        {/* Content Overlay - 3D Lift */}
        <div
          style={{ transform: "translateZ(30px)" }}
          className="absolute bottom-0 left-0 right-0 p-6 z-20"
        >
          <div className="space-y-4">
            {/* Title & Location */}
            <div>
              <div className="flex items-center gap-2 mb-2">
                <Badge variant="outline" className="border-white/30 text-white bg-white/10 backdrop-blur-sm px-2 py-0.5 text-xs font-normal">
                  <MapPin className="w-3 h-3 mr-1" /> {location}
                </Badge>
              </div>
              <h3 className="text-2xl font-bold text-white leading-tight mb-2 group-hover:text-primary-foreground transition-colors drop-shadow-lg">
                {title}
              </h3>
            </div>

            {/* Price & Details */}
            <div className="grid grid-cols-2 gap-4 pb-2">
              <div className="flex items-center gap-2 text-white/80">
                <Clock className="w-4 h-4" />
                <span className="text-sm shadow-black drop-shadow-md">{duration}</span>
              </div>
              <div className="flex items-center gap-2 text-white/80">
                <Users className="w-4 h-4" />
                <span className="text-sm shadow-black drop-shadow-md">Group Tour</span>
              </div>
            </div>

            <div className="flex items-center justify-between pt-4 border-t border-white/20">
              <div>
                <p className="text-xs text-white/60 uppercase tracking-wider">Starting from</p>
                <p className="flex items-baseline gap-1">
                  <span className="text-sm text-primary font-bold">{currency}</span>
                  <span className="text-2xl font-bold text-white">{price.toLocaleString()}</span>
                </p>
              </div>

              <div className="w-12 h-12 rounded-full bg-white text-neutral-900 flex items-center justify-center shadow-lg group-hover:bg-primary group-hover:text-white transition-colors">
                <ArrowUpRight className="w-6 h-6" />
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}
