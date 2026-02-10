'use client';

import { useSearchParams } from 'next/navigation';
import { Navigation } from '../../../components/Navigation';
import { Footer } from '../../../components/Footer';
import { WhatsAppButton } from '../../../components/WhatsAppButton';
import { Toaster } from '../../../components/ui/sonner';
import { motion } from 'framer-motion';
import { XCircle, RefreshCw, MessageCircle, Home } from 'lucide-react';
import { Button } from '../../../components/ui/button';
import { Suspense } from 'react';

function PaymentFailureContent() {
    const searchParams = useSearchParams();

    const reason = searchParams.get('reason') || 'unknown';
    const orderId = searchParams.get('order_id') || '';
    const status = searchParams.get('status') || '';

    const reasonMessages: Record<string, { title: string; description: string }> = {
        cancelled: {
            title: 'Payment Cancelled',
            description: 'You cancelled the payment. No amount has been charged to your account.',
        },
        failed: {
            title: 'Payment Failed',
            description: 'The payment could not be processed. Please try again or use a different payment method.',
        },
        error: {
            title: 'Something Went Wrong',
            description: 'An unexpected error occurred while processing your payment. Please try again.',
        },
        no_response: {
            title: 'No Response Received',
            description: 'We did not receive a response from the payment gateway. Please contact support.',
        },
        unknown: {
            title: 'Payment Unsuccessful',
            description: 'Your payment could not be completed. Please try again or contact our support team.',
        },
    };

    const { title, description } = reasonMessages[reason] || reasonMessages.unknown;

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
                    {/* Failure Icon */}
                    <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ type: 'spring', damping: 12, stiffness: 200, delay: 0.2 }}
                        className="w-24 h-24 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-8"
                    >
                        <XCircle className="w-14 h-14 text-red-500" />
                    </motion.div>

                    <h1 className="text-3xl font-bold text-neutral-900 mb-3">{title}</h1>
                    <p className="text-neutral-500 text-lg mb-10">{description}</p>

                    {orderId && (
                        <div className="bg-neutral-50 rounded-2xl p-5 mb-8 border border-neutral-100">
                            <div className="flex justify-between items-center">
                                <span className="text-sm text-neutral-500">Order Reference</span>
                                <span className="font-mono text-sm text-neutral-700">{orderId}</span>
                            </div>
                        </div>
                    )}

                    {/* Actions */}
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <Button
                            asChild
                            className="h-12 px-6 bg-neutral-900 hover:bg-neutral-800 text-white rounded-xl"
                        >
                            <a href="/#/packages">
                                <RefreshCw className="w-5 h-5 mr-2" /> Try Again
                            </a>
                        </Button>
                        <Button
                            asChild
                            variant="outline"
                            className="h-12 px-6 border-neutral-200 hover:bg-neutral-50 rounded-xl"
                        >
                            <a
                                href="https://wa.me/971543977242?text=I need help with a payment issue"
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                <MessageCircle className="w-5 h-5 mr-2" /> Contact Support
                            </a>
                        </Button>
                        <Button
                            asChild
                            variant="ghost"
                            className="h-12 px-6 rounded-xl"
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

export default function PaymentFailurePage() {
    return (
        <Suspense fallback={<div className="min-h-screen flex items-center justify-center"><p>Loading...</p></div>}>
            <PaymentFailureContent />
        </Suspense>
    );
}
