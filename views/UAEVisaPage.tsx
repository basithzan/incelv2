'use client';

import { useState } from 'react';
import { VisaCard } from '../components/VisaCard';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select';
import { Textarea } from '../components/ui/textarea';
import { Card } from '../components/ui/card';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '../components/ui/dialog';
import { visas } from '../data/mockData';
import { FileUp, CheckCircle2, CreditCard, Building2, Smartphone, Lock } from 'lucide-react';

export function UAEVisaPage() {
  const [formData, setFormData] = useState({
    fullName: '',
    nationality: '',
    passportNo: '',
    dob: '',
    travelDate: '',
    email: '',
    phone: '',
    notes: ''
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
            backgroundImage: `url(https://images.unsplash.com/photo-1643904736472-8b77e93ca3d7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxEdWJhaSUyMHNreWxpbmUlMjBCdXJqJTIwS2hhbGlmYXxlbnwxfHx8fDE3NjIyODc0OTN8MA&ixlib=rb-4.1.0&q=80&w=1080)`
          }}
        >
          <div className="absolute inset-0 bg-neutral-900/50" />
        </div>
        <div className="relative z-10 text-center text-white max-w-3xl mx-auto px-4">
          <h1 className="mb-4">Apply for UAE Visa</h1>
          <p>Fast processing & expert assistance for all UAE visa types</p>
        </div>
      </section>

      {/* Visa Types */}
      <section className="py-20">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-20">
          <div className="text-center mb-12">
            <h2 className="mb-4">Choose Your Visa Type</h2>
            <p className="text-neutral-700 max-w-2xl mx-auto">
              We offer various UAE visa options to suit your travel needs
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            {visas.map((visa, index) => (
              <VisaCard key={index} {...visa} />
            ))}
          </div>

          <div className="bg-accent/10 rounded-xl p-8 border-l-4 border-accent">
            <div className="flex items-start gap-4">
              <CheckCircle2 className="w-6 h-6 text-accent flex-shrink-0 mt-1" />
              <div>
                <h4 className="mb-2">Why Choose Our Visa Services?</h4>
                <ul className="space-y-2 text-neutral-700">
                  <li>• Expert guidance throughout the application process</li>
                  <li>• Fast processing with 95% approval rate</li>
                  <li>• Document verification and review</li>
                  <li>• 24/7 customer support</li>
                  <li>• Transparent pricing with no hidden fees</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Application Form */}
      <section id="visa-application-form" className="py-20 bg-neutral-100 scroll-mt-20">
        <div className="max-w-[800px] mx-auto px-4 sm:px-6 lg:px-20">
          <div className="text-center mb-12">
            <h2 className="mb-4">Visa Application Form</h2>
            <p className="text-neutral-700">
              Fill in your details and our visa experts will contact you within 24 hours
            </p>
          </div>

          <Card className="p-8">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="fullName">Full Name (as per passport)</Label>
                  <Input
                    id="fullName"
                    value={formData.fullName}
                    onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="nationality">Nationality</Label>
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
                  <Label htmlFor="passportNo">Passport Number</Label>
                  <Input
                    id="passportNo"
                    value={formData.passportNo}
                    onChange={(e) => setFormData({ ...formData, passportNo: e.target.value })}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="dob">Date of Birth</Label>
                  <Input
                    id="dob"
                    type="date"
                    value={formData.dob}
                    onChange={(e) => setFormData({ ...formData, dob: e.target.value })}
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="travelDate">Intended Travel Date</Label>
                <Input
                  id="travelDate"
                  type="date"
                  value={formData.travelDate}
                  onChange={(e) => setFormData({ ...formData, travelDate: e.target.value })}
                  required
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
              </div>

              <div className="space-y-2">
                <Label htmlFor="notes">Additional Notes (Optional)</Label>
                <Textarea
                  id="notes"
                  value={formData.notes}
                  onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                  rows={4}
                  placeholder="Any special requirements or questions?"
                />
              </div>

              <div className="border-2 border-dashed border-neutral-300 rounded-lg p-8 text-center">
                <FileUp className="w-12 h-12 text-neutral-500 mx-auto mb-4" />
                <h4 className="mb-2">Document Upload</h4>
                <p className="text-neutral-700 mb-4">
                  After submission, our team will send you a secure link to upload required documents
                </p>
                <p className="text-neutral-500">
                  Required: Passport copy, photo, supporting documents
                </p>
              </div>

              <Button 
                type="submit" 
                size="lg" 
                className="w-full bg-yellow-400 hover:bg-yellow-500 text-neutral-900 px-6 rounded-full shadow-lg hover:shadow-xl transition-all border-0"
              >
                Submit Application
              </Button>

              <p className="text-center text-neutral-500">
                By submitting, you agree to our Terms & Conditions and Privacy Policy
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
