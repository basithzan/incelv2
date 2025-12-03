'use client';

import { Navigation } from '../components/Navigation';
import { Footer } from '../components/Footer';
import { WhatsAppButton } from '../components/WhatsAppButton';
import { ScrollProgress } from '../components/ScrollProgress';
import { Toaster } from '../components/ui/sonner';
import { HomePage } from '../views/HomePage';

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col">
      <ScrollProgress />
      <Navigation />
      <main className="flex-1">
        <HomePage />
      </main>
      <Footer />
      <WhatsAppButton />
      <Toaster position="top-right" richColors />
    </div>
  );
}


