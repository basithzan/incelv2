'use client';

import { useSearchParams } from 'next/navigation';
import { Navigation } from '../../../components/Navigation';
import { Footer } from '../../../components/Footer';
import { WhatsAppButton } from '../../../components/WhatsAppButton';
import { Toaster } from '../../../components/ui/sonner';
import { motion } from 'framer-motion';
import { CheckCircle2, ArrowRight, Download, Home, Package } from 'lucide-react';
import { Button } from '../../../components/ui/button';
import { Suspense } from 'react';

function PaymentSuccessContent() {
    const searchParams = useSearchParams();

    const orderId = searchParams.get('order_id') || 'N/A';
    const trackingId = searchParams.get('tracking_id') || 'N/A';
    const amount = searchParams.get('amount') || '0';
    const currency = searchParams.get('currency') || 'AED';
    const packageTitle = searchParams.get('package_title') || 'Travel Package';

    return (
        <div className="min-h-screen flex flex-col bg-white">
            <Navigation />
            <main className="flex-1 flex items-center justify-center px-4 py-20">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="max-w-lg w-full text-center"
                >
                    {/* Success Icon */}
                    <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ type: 'spring', damping: 12, stiffness: 200, delay: 0.2 }}
                        className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-8"
                    >
                        <CheckCircle2 className="w-14 h-14 text-green-600" />
                    </motion.div>

                    <h1 className="text-3xl font-bold text-neutral-900 mb-3">Payment Successful!</h1>
                    <p className="text-neutral-500 text-lg mb-10">
                        Your booking has been confirmed. You will receive a confirmation email shortly.
                    </p>

                    {/* Order Details Card */}
                    <div className="bg-neutral-50 rounded-2xl p-6 mb-8 text-left space-y-4 border border-neutral-100">
                        <div className="flex justify-between items-center">
                            <span className="text-sm text-neutral-500">Package</span>
                            <span className="font-semibold text-neutral-900 text-sm text-right max-w-[200px]">{packageTitle}</span>
                        </div>
                        <div className="border-t border-neutral-200" />
                        <div className="flex justify-between items-center">
                            <span className="text-sm text-neutral-500">Order ID</span>
                            <span className="font-mono text-sm text-neutral-700">{orderId}</span>
                        </div>
                        <div className="flex justify-between items-center">
                            <span className="text-sm text-neutral-500">Tracking ID</span>
                            <span className="font-mono text-sm text-neutral-700">{trackingId}</span>
                        </div>
                        <div className="border-t border-neutral-200" />
                        <div className="flex justify-between items-center">
                            <span className="text-sm text-neutral-500">Amount Paid</span>
                            <span className="text-xl font-bold text-green-600">
                                {currency} {parseFloat(amount).toLocaleString()}
                            </span>
                        </div>
                    </div>

                    {/* Actions */}
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <Button
                            asChild
                            className="h-12 px-6 bg-neutral-900 hover:bg-neutral-800 text-white rounded-xl"
                        >
                            <a href="/#/packages">
                                <Package className="w-5 h-5 mr-2" /> Browse More Packages
                            </a>
                        </Button>
                        <Button
                            asChild
                            variant="outline"
                            className="h-12 px-6 border-neutral-200 hover:bg-neutral-50 rounded-xl"
                        >
                            <a href="/">
                                <Home className="w-5 h-5 mr-2" /> Go Home
                            </a>
                        </Button>
                    </div>
                </motion.div>
            </main>
            <Footer />
            <WhatsAppButton />
            <Toaster position="top-right" richColors />
        </div>
    );
}

export default function PaymentSuccessPage() {
    return (
        <Suspense fallback={<div className="min-h-screen flex items-center justify-center"><p>Loading...</p></div>}>
            <PaymentSuccessContent />
        </Suspense>
    );
}
