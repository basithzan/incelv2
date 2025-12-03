'use client';

import { useParams } from 'next/navigation';
import { Navigation } from '../../../components/Navigation';
import { Footer } from '../../../components/Footer';
import { WhatsAppButton } from '../../../components/WhatsAppButton';
import { ScrollProgress } from '../../../components/ScrollProgress';
import { Toaster } from '../../../components/ui/sonner';

export default function TourDetail() {
  const params = useParams();
  const tourId = (params?.id as string) || '';
  
  return (
    <div className="min-h-screen flex flex-col">
      <ScrollProgress />
      <Navigation />
      <main className="flex-1">
        <div className="py-12">
          <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-20">
            <h1 className="mb-4">Tour Details</h1>
            <p className="text-neutral-700">Tour ID: {tourId}</p>
            <p className="text-neutral-700 mt-4">Tour details page - similar structure to package detail page</p>
          </div>
        </div>
      </main>
      <Footer />
      <WhatsAppButton />
      <Toaster position="top-right" richColors />
    </div>
  );
}


