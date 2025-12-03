'use client';

import { Navigation } from '../../components/Navigation';
import { Footer } from '../../components/Footer';
import { WhatsAppButton } from '../../components/WhatsAppButton';
import { ScrollProgress } from '../../components/ScrollProgress';
import { Toaster } from '../../components/ui/sonner';
import { AboutPage } from '../../pages/AboutPage';

export default function AboutUs() {
  return (
    <div className="min-h-screen flex flex-col">
      <ScrollProgress />
      <Navigation />
      <main className="flex-1">
        <AboutPage />
      </main>
      <Footer />
      <WhatsAppButton />
      <Toaster position="top-right" richColors />
    </div>
  );
}


