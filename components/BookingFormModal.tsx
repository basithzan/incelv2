'use client';

import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, CreditCard, User, Mail, Phone, Users, Calendar, Shield, Loader2 } from 'lucide-react';
import { Button } from './ui/button';

interface BookingFormModalProps {
    isOpen: boolean;
    onClose: () => void;
    packageId: string;
    packageTitle: string;
    packagePrice: number;
    packageDuration: string;
    currency?: string;
}

export function BookingFormModal({
    isOpen,
    onClose,
    packageId,
    packageTitle,
    packagePrice,
    packageDuration,
    currency = 'AED',
}: BookingFormModalProps) {
    const [formData, setFormData] = useState({
        fullName: '',
        email: '',
        phone: '',
        travelers: '1',
        travelDate: '',
    });
    const [isProcessing, setIsProcessing] = useState(false);
    const formRef = useRef<HTMLFormElement>(null);
    const hiddenFormRef = useRef<HTMLFormElement>(null);

    const totalPrice = packagePrice * parseInt(formData.travelers || '1');
    const modalWrapperRef = useRef<HTMLDivElement>(null);

    // Lock body scroll when modal is open (Lenis-compatible)
    useEffect(() => {
        if (!isOpen) return;

        const scrollY = window.scrollY;
        // Fix the body in place
        document.body.style.position = 'fixed';
        document.body.style.top = `-${scrollY}px`;
        document.body.style.left = '0';
        document.body.style.right = '0';
        document.body.style.overflow = 'hidden';
        document.documentElement.style.overflow = 'hidden';

        // Block wheel events from reaching Lenis
        const stopWheel = (e: WheelEvent) => {
            e.stopPropagation();
        };
        // Block touch events from reaching Lenis
        const stopTouch = (e: TouchEvent) => {
            // Allow touch inside the modal content
            const modalContent = modalWrapperRef.current;
            if (modalContent && modalContent.contains(e.target as Node)) return;
            e.preventDefault();
        };

        window.addEventListener('wheel', stopWheel, { capture: true });
        window.addEventListener('touchmove', stopTouch, { passive: false, capture: true });

        return () => {
            document.body.style.position = '';
            document.body.style.top = '';
            document.body.style.left = '';
            document.body.style.right = '';
            document.body.style.overflow = '';
            document.documentElement.style.overflow = '';
            window.scrollTo(0, scrollY);
            window.removeEventListener('wheel', stopWheel, { capture: true });
            window.removeEventListener('touchmove', stopTouch, { capture: true } as EventListenerOptions);
        };
    }, [isOpen]);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsProcessing(true);

        try {
            // Generate a unique order ID
            const orderId = `INCEL-${Date.now()}-${Math.random().toString(36).substring(2, 8).toUpperCase()}`;

            const response = await fetch('/api/ccavenue/encrypt', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    order_id: orderId,
                    amount: totalPrice.toFixed(2),
                    currency,
                    billing_name: formData.fullName,
                    billing_email: formData.email,
                    billing_tel: formData.phone,
                    merchant_param1: packageId,
                    merchant_param2: packageTitle,
                    merchant_param3: formData.travelers,
                    merchant_param4: formData.travelDate,
                }),
            });

            const data = await response.json();

            if (data.encRequest && data.accessCode) {
                // Dynamically create and submit the hidden form to CCAvenue
                const form = hiddenFormRef.current;
                if (form) {
                    form.action = data.ccavenueUrl;
                    (form.querySelector('[name="encRequest"]') as HTMLInputElement).value = data.encRequest;
                    (form.querySelector('[name="access_code"]') as HTMLInputElement).value = data.accessCode;
                    form.submit();
                }
            } else {
                throw new Error('Invalid response from server');
            }
        } catch (error) {
            console.error('Payment initiation failed:', error);
            setIsProcessing(false);
            alert('Failed to initiate payment. Please try again.');
        }
    };

    if (!isOpen) return null;

    return (
        <>
            {/* Hidden form for CCAvenue redirect */}
            <form ref={hiddenFormRef} method="POST" style={{ display: 'none' }}>
                <input type="hidden" name="encRequest" value="" />
                <input type="hidden" name="access_code" value="" />
                <input type="hidden" name="command" value="initiateTransaction" />
            </form>

            <AnimatePresence>
                {isOpen && (
                    <>
                        {/* Backdrop */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={onClose}
                            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[100]"
                        />

                        {/* Modal */}
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95, y: 20 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.95, y: 20 }}
                            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
                            className="fixed inset-0 z-[101] flex items-center justify-center p-4"
                        >
                            <div ref={modalWrapperRef} className="bg-white rounded-3xl shadow-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto relative" style={{ overscrollBehavior: 'contain' }}>
                                {/* Header gradient bar */}
                                <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-blue-600 via-purple-600 to-blue-600 rounded-t-3xl" />

                                {/* Close button */}
                                <button
                                    onClick={onClose}
                                    className="absolute top-4 right-4 w-10 h-10 rounded-full bg-neutral-100 hover:bg-neutral-200 flex items-center justify-center transition-colors z-10"
                                >
                                    <X className="w-5 h-5 text-neutral-600" />
                                </button>

                                <div className="p-8 pt-10">
                                    {/* Title */}
                                    <div className="mb-8">
                                        <h2 className="text-2xl font-bold text-neutral-900 mb-2">Book Your Journey</h2>
                                        <p className="text-neutral-500 text-sm">Complete the form below to proceed with payment</p>
                                    </div>

                                    {/* Package Summary */}
                                    <div className="bg-gradient-to-br from-neutral-50 to-blue-50/50 rounded-2xl p-5 mb-8 border border-neutral-100">
                                        <h3 className="font-semibold text-neutral-900 text-lg leading-snug mb-3">{packageTitle}</h3>
                                        <div className="flex items-center justify-between">
                                            <span className="text-sm text-neutral-500">{packageDuration}</span>
                                            <div className="text-right">
                                                <span className="text-xs text-neutral-400 block">per person</span>
                                                <span className="text-xl font-bold text-neutral-900">
                                                    {currency} {packagePrice.toLocaleString()}
                                                </span>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Form */}
                                    <form ref={formRef} onSubmit={handleSubmit} className="space-y-5">
                                        {/* Full Name */}
                                        <div>
                                            <label className="text-sm font-medium text-neutral-700 mb-1.5 flex items-center gap-2">
                                                <User className="w-4 h-4 text-neutral-400" />
                                                Full Name
                                            </label>
                                            <input
                                                type="text"
                                                name="fullName"
                                                value={formData.fullName}
                                                onChange={handleInputChange}
                                                required
                                                placeholder="Enter your full name"
                                                className="w-full h-12 px-4 rounded-xl border border-neutral-200 bg-neutral-50 focus:bg-white focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 outline-none transition-all text-neutral-900 placeholder:text-neutral-400"
                                            />
                                        </div>

                                        {/* Email */}
                                        <div>
                                            <label className="text-sm font-medium text-neutral-700 mb-1.5 flex items-center gap-2">
                                                <Mail className="w-4 h-4 text-neutral-400" />
                                                Email Address
                                            </label>
                                            <input
                                                type="email"
                                                name="email"
                                                value={formData.email}
                                                onChange={handleInputChange}
                                                required
                                                placeholder="your@email.com"
                                                className="w-full h-12 px-4 rounded-xl border border-neutral-200 bg-neutral-50 focus:bg-white focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 outline-none transition-all text-neutral-900 placeholder:text-neutral-400"
                                            />
                                        </div>

                                        {/* Phone */}
                                        <div>
                                            <label className="text-sm font-medium text-neutral-700 mb-1.5 flex items-center gap-2">
                                                <Phone className="w-4 h-4 text-neutral-400" />
                                                Phone Number
                                            </label>
                                            <input
                                                type="tel"
                                                name="phone"
                                                value={formData.phone}
                                                onChange={handleInputChange}
                                                required
                                                placeholder="+971 XX XXX XXXX"
                                                className="w-full h-12 px-4 rounded-xl border border-neutral-200 bg-neutral-50 focus:bg-white focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 outline-none transition-all text-neutral-900 placeholder:text-neutral-400"
                                            />
                                        </div>

                                        {/* Travelers & Date Row */}
                                        <div className="grid grid-cols-2 gap-4">
                                            <div>
                                                <label className="text-sm font-medium text-neutral-700 mb-1.5 flex items-center gap-2">
                                                    <Users className="w-4 h-4 text-neutral-400" />
                                                    Travelers
                                                </label>
                                                <select
                                                    name="travelers"
                                                    value={formData.travelers}
                                                    onChange={handleInputChange}
                                                    className="w-full h-12 px-4 rounded-xl border border-neutral-200 bg-neutral-50 focus:bg-white focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 outline-none transition-all text-neutral-900 appearance-none cursor-pointer"
                                                >
                                                    {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((n) => (
                                                        <option key={n} value={n}>
                                                            {n} {n === 1 ? 'Person' : 'People'}
                                                        </option>
                                                    ))}
                                                </select>
                                            </div>
                                            <div>
                                                <label className="text-sm font-medium text-neutral-700 mb-1.5 flex items-center gap-2">
                                                    <Calendar className="w-4 h-4 text-neutral-400" />
                                                    Travel Date
                                                </label>
                                                <input
                                                    type="date"
                                                    name="travelDate"
                                                    value={formData.travelDate}
                                                    onChange={handleInputChange}
                                                    required
                                                    min={new Date().toISOString().split('T')[0]}
                                                    className="w-full h-12 px-4 rounded-xl border border-neutral-200 bg-neutral-50 focus:bg-white focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 outline-none transition-all text-neutral-900"
                                                />
                                            </div>
                                        </div>

                                        {/* Total Price */}
                                        <div className="bg-neutral-900 rounded-2xl p-5 flex items-center justify-between">
                                            <div>
                                                <p className="text-white/60 text-xs uppercase tracking-wider">Total Amount</p>
                                                <p className="text-white text-2xl font-bold">
                                                    {currency} {totalPrice.toLocaleString()}
                                                </p>
                                                <p className="text-white/50 text-xs mt-0.5">
                                                    {formData.travelers} traveler{parseInt(formData.travelers) > 1 ? 's' : ''} × {currency} {packagePrice.toLocaleString()}
                                                </p>
                                            </div>
                                            <CreditCard className="w-10 h-10 text-white/20" />
                                        </div>

                                        {/* Submit */}
                                        <Button
                                            type="submit"
                                            disabled={isProcessing}
                                            className="w-full h-14 text-lg bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white rounded-xl shadow-lg hover:shadow-xl transition-all font-semibold disabled:opacity-70"
                                        >
                                            {isProcessing ? (
                                                <span className="flex items-center gap-2">
                                                    <Loader2 className="w-5 h-5 animate-spin" />
                                                    Processing...
                                                </span>
                                            ) : (
                                                <span className="flex items-center gap-2">
                                                    <Shield className="w-5 h-5" />
                                                    Proceed to Secure Payment
                                                </span>
                                            )}
                                        </Button>

                                        {/* Security note */}
                                        <p className="text-center text-xs text-neutral-400 flex items-center justify-center gap-1.5">
                                            <Shield className="w-3.5 h-3.5" />
                                            Secured by CCAvenue. Your payment details are encrypted.
                                        </p>
                                    </form>
                                </div>
                            </div>
                        </motion.div>
                    </>
                )}
            </AnimatePresence>
        </>
    );
}
