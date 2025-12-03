'use client';

import { useState } from 'react';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select';
import { Textarea } from '../components/ui/textarea';
import { Card } from '../components/ui/card';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '../components/ui/dialog';
import { Globe, CheckCircle2, CreditCard, Building2, Smartphone, Lock } from 'lucide-react';

const popularDestinations = [
  'United Kingdom',
  'United States',
  'Canada',
  'Schengen Area (Europe)',
  'Australia',
  'New Zealand',
  'Singapore',
  'China',
  'Turkey',
  'Egypt'
];

export function GlobalVisaPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    nationality: '',
    destination: '',
    travelPurpose: '',
    message: ''
  });
  const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false);
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState<string>('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsPaymentModalOpen(true);
  };

  const handlePayment = (method: string) => {
    setSelectedPaymentMethod(method);
    // Here you would integrate with payment gateway
    alert(`Redirecting to ${method} payment...`);
    setIsPaymentModalOpen(false);
  };

  return (
    <div>
      {/* Hero */}
      <section className="relative h-96 flex items-center justify-center overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: `url(https://images.unsplash.com/photo-1758223725156-ee49cc327a46?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsdXh1cnklMjB0cmF2ZWwlMjBmYW1pbHl8ZW58MXx8fHwxNzYyMzcxNjc2fDA&ixlib=rb-4.1.0&q=80&w=1080)`
          }}
        >
          <div className="absolute inset-0 bg-neutral-900/50" />
        </div>
        <div className="relative z-10 text-center text-white max-w-3xl mx-auto px-4">
          <h1 className="mb-4">Global Visa Assistance</h1>
          <p>Expert guidance for visa applications to popular destinations worldwide</p>
        </div>
      </section>

      {/* Popular Destinations */}
      <section className="py-20">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-20">
          <div className="text-center mb-12">
            <h2 className="mb-4">We Assist with Visas to</h2>
            <p className="text-neutral-700 max-w-2xl mx-auto">
              Our experienced team provides guidance for visa applications to major destinations around the world
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 mb-12">
            {popularDestinations.map((destination, index) => (
              <Card key={index} className="p-4 text-center hover:shadow-lg transition-shadow">
                <Globe className="w-8 h-8 text-primary mx-auto mb-2" />
                <p>{destination}</p>
              </Card>
            ))}
          </div>

          <div className="bg-accent/10 rounded-xl p-8 border-l-4 border-accent">
            <div className="flex items-start gap-4">
              <CheckCircle2 className="w-6 h-6 text-accent flex-shrink-0 mt-1" />
              <div>
                <h3 className="mb-4">What We Offer</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <ul className="space-y-2 text-neutral-700">
                    <li>• Visa requirement assessment</li>
                    <li>• Document preparation guidance</li>
                    <li>• Application form assistance</li>
                    <li>• Interview preparation tips</li>
                  </ul>
                  <ul className="space-y-2 text-neutral-700">
                    <li>• Embassy appointment booking</li>
                    <li>• Application tracking</li>
                    <li>• Travel insurance arrangement</li>
                    <li>• Post-visa travel planning</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Inquiry Form */}
      <section className="py-20 bg-neutral-100">
        <div className="max-w-[800px] mx-auto px-4 sm:px-6 lg:px-20">
          <div className="text-center mb-12">
            <h2 className="mb-4">Visa Inquiry Form</h2>
            <p className="text-neutral-700">
              Tell us about your travel plans and our visa experts will provide personalized guidance
            </p>
          </div>

          <Card className="p-8">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="name">Full Name</Label>
                  <Input
                    id="name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email Address</Label>
                  <Input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="phone">Phone Number</Label>
                  <Input
                    id="phone"
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="nationality">Your Nationality</Label>
                  <Select
                    value={formData.nationality}
                    onValueChange={(value) => setFormData({ ...formData, nationality: value })}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select nationality" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="nigeria">Nigeria</SelectItem>
                      <SelectItem value="ghana">Ghana</SelectItem>
                      <SelectItem value="kenya">Kenya</SelectItem>
                      <SelectItem value="southafrica">South Africa</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="destination">Destination Country</Label>
                  <Select
                    value={formData.destination}
                    onValueChange={(value) => setFormData({ ...formData, destination: value })}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select destination" />
                    </SelectTrigger>
                    <SelectContent>
                      {popularDestinations.map((dest) => (
                        <SelectItem key={dest} value={dest.toLowerCase().replace(/\s+/g, '-')}>
                          {dest}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="travelPurpose">Purpose of Travel</Label>
                  <Select
                    value={formData.travelPurpose}
                    onValueChange={(value) => setFormData({ ...formData, travelPurpose: value })}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select purpose" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="tourism">Tourism</SelectItem>
                      <SelectItem value="business">Business</SelectItem>
                      <SelectItem value="study">Study</SelectItem>
                      <SelectItem value="work">Work</SelectItem>
                      <SelectItem value="family">Family Visit</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="message">Additional Information</Label>
                <Textarea
                  id="message"
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  rows={5}
                  placeholder="Tell us about your travel plans, timeline, or any specific questions..."
                />
              </div>

              <Button 
                type="submit" 
                size="lg" 
                className="w-full bg-yellow-400 hover:bg-yellow-500 text-neutral-900 px-6 rounded-full shadow-lg hover:shadow-xl transition-all border-0"
              >
                Submit Inquiry
              </Button>

              <p className="text-center text-neutral-500">
                Our visa experts will review your inquiry and contact you within 24 hours
              </p>
            </form>
          </Card>
        </div>
      </section>

      {/* Payment Modal */}
      <Dialog open={isPaymentModalOpen} onOpenChange={setIsPaymentModalOpen}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto bg-white text-neutral-900">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold text-center text-neutral-900">
              Complete Your Payment
            </DialogTitle>
            <DialogDescription className="text-center text-neutral-700">
              Choose your preferred payment method to proceed with your visa application
            </DialogDescription>
          </DialogHeader>

          <div className="mt-6 space-y-4">
            {/* Payment Methods */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Credit/Debit Card */}
              <button
                onClick={() => handlePayment('card')}
                className="p-6 border-2 border-neutral-200 rounded-xl hover:border-primary hover:bg-primary/5 transition-all text-left group"
              >
                <div className="flex items-center gap-4 mb-3">
                  <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                    <CreditCard className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-neutral-900">Credit/Debit Card</h3>
                    <p className="text-sm text-neutral-600">Visa, Mastercard, Amex</p>
                  </div>
                </div>
                <p className="text-xs text-neutral-500">Secure payment via encrypted gateway</p>
              </button>

              {/* Bank Transfer */}
              <button
                onClick={() => handlePayment('bank')}
                className="p-6 border-2 border-neutral-200 rounded-xl hover:border-primary hover:bg-primary/5 transition-all text-left group"
              >
                <div className="flex items-center gap-4 mb-3">
                  <div className="w-12 h-12 rounded-lg bg-accent/10 flex items-center justify-center group-hover:bg-accent/20 transition-colors">
                    <Building2 className="w-6 h-6 text-accent" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-neutral-900">Bank Transfer</h3>
                    <p className="text-sm text-neutral-600">Direct bank transfer</p>
                  </div>
                </div>
                <p className="text-xs text-neutral-500">Transfer funds directly to our account</p>
              </button>

              {/* Mobile Payment */}
              <button
                onClick={() => handlePayment('mobile')}
                className="p-6 border-2 border-neutral-200 rounded-xl hover:border-primary hover:bg-primary/5 transition-all text-left group"
              >
                <div className="flex items-center gap-4 mb-3">
                  <div className="w-12 h-12 rounded-lg bg-yellow-400/20 flex items-center justify-center group-hover:bg-yellow-400/30 transition-colors">
                    <Smartphone className="w-6 h-6 text-yellow-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-neutral-900">Mobile Payment</h3>
                    <p className="text-sm text-neutral-600">Apple Pay, Google Pay</p>
                  </div>
                </div>
                <p className="text-xs text-neutral-500">Quick and secure mobile payment</p>
              </button>

              {/* Pay Later */}
              <button
                onClick={() => handlePayment('later')}
                className="p-6 border-2 border-neutral-200 rounded-xl hover:border-primary hover:bg-primary/5 transition-all text-left group"
              >
                <div className="flex items-center gap-4 mb-3">
                  <div className="w-12 h-12 rounded-lg bg-neutral-100 flex items-center justify-center group-hover:bg-neutral-200 transition-colors">
                    <Lock className="w-6 h-6 text-neutral-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-neutral-900">Pay Later</h3>
                    <p className="text-sm text-neutral-600">Pay after approval</p>
                  </div>
                </div>
                <p className="text-xs text-neutral-500">Submit now, pay after visa approval</p>
              </button>
            </div>

            {/* Security Notice */}
            <div className="mt-6 p-4 bg-neutral-50 rounded-lg border border-neutral-200">
              <div className="flex items-start gap-3">
                <Lock className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-sm font-medium text-neutral-900 mb-1">Secure Payment</p>
                  <p className="text-xs text-neutral-600">
                    All transactions are encrypted and secure. Your payment information is protected.
                  </p>
                </div>
              </div>
            </div>

            {/* Cancel Button */}
            <div className="mt-6">
              <Button
                variant="outline"
                onClick={() => setIsPaymentModalOpen(false)}
                className="w-full"
              >
                Cancel
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
