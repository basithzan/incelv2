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
import { FileUp, CheckCircle2, CreditCard, Building2, Smartphone, Lock, ChevronRight, ArrowLeft, Globe, FileText, Check, Upload, X, File } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

import { PageHero } from '../components/PageHero';

// Nationality-specific document requirements
const nationalityDocuments: Record<string, {
  name: string;
  documents: string[];
  additionalQuestions?: { id: string; question: string; type: 'text' | 'select' | 'checkbox'; options?: string[] }[];
}> = {
  nigeria: {
    name: 'Nigeria',
    documents: [
      'Valid passport (minimum 6 months validity)',
      'Passport-size photograph (white background)',
      'Confirmed return flight ticket',
      'Hotel reservation or accommodation proof',
      'Bank statement (last 3 months)',
      'Employment letter / Business registration',
      'Travel insurance'
    ],
    additionalQuestions: [
      { id: 'previousUaeVisa', question: 'Have you previously held a UAE visa?', type: 'select', options: ['Yes', 'No'] },
      { id: 'sponsor', question: 'Do you have a sponsor in UAE?', type: 'select', options: ['Yes', 'No'] }
    ]
  },
  ghana: {
    name: 'Ghana',
    documents: [
      'Valid passport (minimum 6 months validity)',
      'Passport-size photograph (white background)',
      'Confirmed return flight ticket',
      'Hotel reservation or accommodation proof',
      'Bank statement (last 3 months)',
      'Employment letter / Business registration',
      'Travel insurance'
    ],
    additionalQuestions: [
      { id: 'previousUaeVisa', question: 'Have you previously held a UAE visa?', type: 'select', options: ['Yes', 'No'] },
      { id: 'travelPurpose', question: 'Purpose of travel', type: 'select', options: ['Tourism', 'Business', 'Family Visit', 'Transit'] }
    ]
  },
  kenya: {
    name: 'Kenya',
    documents: [
      'Valid passport (minimum 6 months validity)',
      'Passport-size photograph (white background)',
      'Confirmed return flight ticket',
      'Hotel reservation or accommodation proof',
      'Bank statement (last 3 months)',
      'Employment letter / Business registration'
    ],
    additionalQuestions: [
      { id: 'previousUaeVisa', question: 'Have you previously held a UAE visa?', type: 'select', options: ['Yes', 'No'] }
    ]
  },
  southafrica: {
    name: 'South Africa',
    documents: [
      'Valid passport (minimum 6 months validity)',
      'Passport-size photograph (white background)',
      'Confirmed return flight ticket',
      'Hotel reservation or accommodation proof',
      'Proof of sufficient funds'
    ],
    additionalQuestions: [
      { id: 'previousUaeVisa', question: 'Have you previously held a UAE visa?', type: 'select', options: ['Yes', 'No'] }
    ]
  },
  india: {
    name: 'India',
    documents: [
      'Valid passport (minimum 6 months validity)',
      'Passport-size photograph (white background)',
      'Confirmed return flight ticket',
      'Hotel reservation or accommodation proof',
      'Bank statement (last 3 months)',
      'PAN Card copy',
      'ITR (last 2 years) for business travelers'
    ],
    additionalQuestions: [
      { id: 'previousUaeVisa', question: 'Have you previously held a UAE visa?', type: 'select', options: ['Yes', 'No'] },
      { id: 'ecr', question: 'ECR or ECNR passport?', type: 'select', options: ['ECR', 'ECNR'] }
    ]
  },
  pakistan: {
    name: 'Pakistan',
    documents: [
      'Valid passport (minimum 6 months validity)',
      'Passport-size photograph (white background)',
      'Confirmed return flight ticket',
      'Hotel reservation or accommodation proof',
      'Bank statement (last 6 months)',
      'Employment letter with salary details',
      'CNIC copy',
      'Travel insurance'
    ],
    additionalQuestions: [
      { id: 'previousUaeVisa', question: 'Have you previously held a UAE visa?', type: 'select', options: ['Yes', 'No'] },
      { id: 'sponsor', question: 'Do you have a sponsor in UAE?', type: 'select', options: ['Yes', 'No'] }
    ]
  },
  other: {
    name: 'Other',
    documents: [
      'Valid passport (minimum 6 months validity)',
      'Passport-size photograph (white background)',
      'Confirmed return flight ticket',
      'Hotel reservation or accommodation proof',
      'Proof of sufficient funds',
      'Travel insurance (recommended)'
    ],
    additionalQuestions: [
      { id: 'countryName', question: 'Please specify your country', type: 'text' },
      { id: 'previousUaeVisa', question: 'Have you previously held a UAE visa?', type: 'select', options: ['Yes', 'No'] }
    ]
  }
};

// Visa types with pricing
const visaTypes = [
  { id: '30days', name: 'Tourist Visa - 30 Days', processingTime: '3-5 working days', price: 899 },
  { id: '60days', name: 'Tourist Visa - 60 Days', processingTime: '3-5 working days', price: 1599 },
  { id: '90days', name: 'Multiple Entry - 90 Days', processingTime: '5-7 working days', price: 2499 }
];

export function UAEVisaPage() {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    fullName: '',
    nationality: '',
    visaType: '',
    passportNo: '',
    dob: '',
    travelDate: '',
    email: '',
    phone: '',
    notes: '',
    additionalAnswers: {} as Record<string, string>
  });
  const [uploadedFiles, setUploadedFiles] = useState<{ name: string; size: number; type: string }[]>([]);
  const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false);
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState<string>('');

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files) {
      const newFiles = Array.from(files).map(file => ({
        name: file.name,
        size: file.size,
        type: file.type
      }));
      setUploadedFiles(prev => [...prev, ...newFiles]);
    }
    e.target.value = ''; // Reset input
  };

  const removeFile = (index: number) => {
    setUploadedFiles(prev => prev.filter((_, i) => i !== index));
  };

  const formatFileSize = (bytes: number) => {
    if (bytes < 1024) return bytes + ' B';
    if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + ' KB';
    return (bytes / (1024 * 1024)).toFixed(1) + ' MB';
  };

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

  const selectedNationality = nationalityDocuments[formData.nationality];
  const selectedVisa = visaTypes.find(v => v.id === formData.visaType);

  const canProceedToStep2 = formData.nationality !== '';
  const canProceedToStep3 = formData.visaType !== '';

  const goToNextStep = () => {
    if (currentStep < 4) setCurrentStep(currentStep + 1);
  };

  const goToPrevStep = () => {
    if (currentStep > 1) setCurrentStep(currentStep - 1);
  };

  return (
    <div>
      {/* Hero */}
      <PageHero
        image="https://images.unsplash.com/photo-1643904736472-8b77e93ca3d7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxEdWJhaSUyMHNreWxpbmUlMjBCdXJqJTIwS2hhbGlmYXxlbnwxfHx8fDE3NjIyODc0OTN8MA&ixlib=rb-4.1.0&q=80&w=1080"
        title={<>Apply for <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent">UAE Visa</span></>}
        subtitle="Fast processing & expert assistance for all UAE visa types."
      />

      {/* Visa Types */}
      <section className="py-20">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-20">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 tracking-tight text-neutral-900">
              Choose Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent">Visa Type</span>
            </h2>
            <p className="text-lg text-neutral-600 max-w-2xl mx-auto">
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
      <section id="visa-application-form" className="py-32 bg-white relative overflow-hidden scroll-mt-20">
        <div className="absolute inset-0 bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:20px_20px] opacity-30" />

        {/* Standard Outer Container for Margins */}
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-20 relative z-10">

          {/* Inner Container for Narrow Form */}
          <div className="max-w-2xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-4xl md:text-5xl font-bold mb-6 tracking-tight text-neutral-900 pt-8">
                Start Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent">Visa Application</span>
              </h2>
              <p className="text-lg text-neutral-600 mb-2">
                Follow the steps below to complete your UAE visa application
              </p>
            </div>

            {/* Progress Steps */}
            <div className="flex items-center justify-center gap-2 mb-12">
              {[1, 2, 3, 4].map((step) => (
                <div key={step} className="flex items-center">
                  <div 
                    className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm transition-all ${
                      currentStep === step 
                        ? 'bg-gradient-to-r from-primary to-accent text-white shadow-lg' 
                        : currentStep > step 
                          ? 'bg-green-500 text-white' 
                          : 'bg-neutral-200 text-neutral-500'
                    }`}
                  >
                    {currentStep > step ? <Check className="w-5 h-5" /> : step}
                  </div>
                  {step < 4 && (
                    <div className={`w-8 md:w-16 h-1 mx-1 rounded-full transition-all ${
                      currentStep > step ? 'bg-green-500' : 'bg-neutral-200'
                    }`} />
                  )}
                </div>
              ))}
            </div>

            {/* Step Labels */}
            <div className="flex justify-between text-xs md:text-sm text-neutral-500 mb-8 px-2">
              <span className={currentStep >= 1 ? 'text-primary font-medium' : ''}>Nationality</span>
              <span className={currentStep >= 2 ? 'text-primary font-medium' : ''}>Visa Type</span>
              <span className={currentStep >= 3 ? 'text-primary font-medium' : ''}>Documents</span>
              <span className={currentStep >= 4 ? 'text-primary font-medium' : ''}>Details</span>
            </div>

            <Card className="p-8 md:p-12 pb-12 border-0 shadow-2xl rounded-[2.5rem] bg-white ring-1 ring-neutral-100 relative overflow-hidden">
              <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-primary to-accent" />

              <AnimatePresence mode="wait">
                {/* Step 1: Select Nationality */}
                {currentStep === 1 && (
                  <motion.div
                    key="step1"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.3 }}
                    className="space-y-8"
                  >
                    <div className="text-center mb-8">
                      <div className="w-20 h-20 bg-gradient-to-br from-primary/20 to-accent/20 rounded-full flex items-center justify-center mx-auto mb-4">
                        <Globe className="w-10 h-10 text-primary" />
                      </div>
                      <h3 className="text-2xl font-bold text-neutral-900 mb-2">Select Your Nationality</h3>
                      <p className="text-neutral-600">Choose your country to see the required documents</p>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                      {Object.entries(nationalityDocuments).map(([key, value]) => (
                        <button
                          key={key}
                          type="button"
                          onClick={() => setFormData({ ...formData, nationality: key })}
                          className={`p-4 rounded-2xl border-2 transition-all text-left hover:shadow-lg ${
                            formData.nationality === key
                              ? 'border-primary bg-primary/5 shadow-lg'
                              : 'border-neutral-200 hover:border-primary/50'
                          }`}
                        >
                          <span className="font-semibold text-neutral-900 block">{value.name}</span>
                          {formData.nationality === key && (
                            <Check className="w-5 h-5 text-primary mt-2" />
                          )}
                        </button>
                      ))}
                    </div>

                    <Button
                      onClick={goToNextStep}
                      disabled={!canProceedToStep2}
                      className="w-full h-14 bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90 text-white rounded-2xl font-bold text-lg mt-8 disabled:opacity-50"
                    >
                      Continue <ChevronRight className="w-5 h-5 ml-2" />
                    </Button>
                  </motion.div>
                )}

                {/* Step 2: Select Visa Type */}
                {currentStep === 2 && (
                  <motion.div
                    key="step2"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.3 }}
                    className="space-y-8"
                  >
                    <div className="text-center mb-8">
                      <div className="w-20 h-20 bg-gradient-to-br from-primary/20 to-accent/20 rounded-full flex items-center justify-center mx-auto mb-4">
                        <FileText className="w-10 h-10 text-primary" />
                      </div>
                      <h3 className="text-2xl font-bold text-neutral-900 mb-2">Select Visa Type</h3>
                      <p className="text-neutral-600">Choose the visa duration that suits your travel plans</p>
                    </div>

                    <div className="space-y-4">
                      {visaTypes.map((visa) => (
                        <button
                          key={visa.id}
                          type="button"
                          onClick={() => setFormData({ ...formData, visaType: visa.id })}
                          className={`w-full p-6 rounded-2xl border-2 transition-all text-left hover:shadow-lg ${
                            formData.visaType === visa.id
                              ? 'border-primary bg-primary/5 shadow-lg'
                              : 'border-neutral-200 hover:border-primary/50'
                          }`}
                        >
                          <div className="flex justify-between items-center">
                            <div>
                              <span className="font-bold text-lg text-neutral-900 block mb-1">{visa.name}</span>
                              <span className="text-sm text-neutral-500">Processing: {visa.processingTime}</span>
                            </div>
                            {formData.visaType === visa.id && (
                              <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center">
                                <Check className="w-5 h-5 text-white" />
                              </div>
                            )}
                          </div>
                        </button>
                      ))}
                    </div>

                    <div className="flex gap-4 mt-8">
                      <Button
                        type="button"
                        variant="outline"
                        onClick={goToPrevStep}
                        className="flex-1 h-14 rounded-2xl font-bold text-lg"
                      >
                        <ArrowLeft className="w-5 h-5 mr-2" /> Back
                      </Button>
                      <Button
                        onClick={goToNextStep}
                        disabled={!canProceedToStep3}
                        className="flex-1 h-14 bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90 text-white rounded-2xl font-bold text-lg disabled:opacity-50"
                      >
                        Continue <ChevronRight className="w-5 h-5 ml-2" />
                      </Button>
                    </div>
                  </motion.div>
                )}

                {/* Step 3: Document Requirements */}
                {currentStep === 3 && selectedNationality && (
                  <motion.div
                    key="step3"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.3 }}
                    className="space-y-8"
                  >
                    <div className="text-center mb-8">
                      <div className="w-20 h-20 bg-gradient-to-br from-green-400/20 to-green-600/20 rounded-full flex items-center justify-center mx-auto mb-4">
                        <CheckCircle2 className="w-10 h-10 text-green-600" />
                      </div>
                      <h3 className="text-2xl font-bold text-neutral-900 mb-2">Required Documents</h3>
                      <p className="text-neutral-600">
                        Documents required for <span className="font-semibold text-primary">{selectedNationality.name}</span> nationals
                      </p>
                    </div>

                    <div className="bg-gradient-to-br from-neutral-50 to-neutral-100/50 rounded-2xl p-6">
                      <h4 className="font-bold text-neutral-900 mb-4 flex items-center gap-2">
                        <FileUp className="w-5 h-5 text-primary" /> Document Checklist
                      </h4>
                      <ul className="space-y-3">
                        {selectedNationality.documents.map((doc, index) => (
                          <li key={index} className="flex items-start gap-3">
                            <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                              <Check className="w-4 h-4 text-primary" />
                            </div>
                            <span className="text-neutral-700">{doc}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Additional Questions based on Nationality */}
                    {selectedNationality.additionalQuestions && selectedNationality.additionalQuestions.length > 0 && (
                      <div className="space-y-6">
                        <h4 className="font-bold text-neutral-900">Additional Information</h4>
                        {selectedNationality.additionalQuestions.map((q) => (
                          <div key={q.id} className="space-y-3">
                            <Label className="text-base font-semibold text-neutral-700">{q.question}</Label>
                            {q.type === 'select' && q.options ? (
                              <Select
                                value={formData.additionalAnswers[q.id] || ''}
                                onValueChange={(value) => setFormData({ 
                                  ...formData, 
                                  additionalAnswers: { ...formData.additionalAnswers, [q.id]: value } 
                                })}
                              >
                                <SelectTrigger className="h-14 bg-neutral-50/50 border-neutral-200 rounded-2xl text-lg">
                                  <SelectValue placeholder="Select an option" />
                                </SelectTrigger>
                                <SelectContent className="rounded-xl border-neutral-100 shadow-xl">
                                  {q.options.map((opt) => (
                                    <SelectItem key={opt} value={opt.toLowerCase()}>{opt}</SelectItem>
                                  ))}
                                </SelectContent>
                              </Select>
                            ) : (
                              <Input
                                value={formData.additionalAnswers[q.id] || ''}
                                onChange={(e) => setFormData({ 
                                  ...formData, 
                                  additionalAnswers: { ...formData.additionalAnswers, [q.id]: e.target.value } 
                                })}
                                className="h-14 bg-neutral-50/50 border-neutral-200 rounded-2xl text-lg"
                                placeholder="Enter your answer"
                              />
                            )}
                          </div>
                        ))}
                      </div>
                    )}

                    {/* Document Upload Section */}
                    <div className="space-y-4">
                      <h4 className="font-bold text-neutral-900 flex items-center gap-2">
                        <Upload className="w-5 h-5 text-primary" /> Upload Your Documents
                      </h4>
                      
                      {/* Upload Area */}
                      <label className="block cursor-pointer">
                        <div className="border-2 border-dashed border-neutral-300 hover:border-primary rounded-2xl p-8 text-center transition-all hover:bg-primary/5">
                          <div className="w-16 h-16 bg-gradient-to-br from-primary/20 to-accent/20 rounded-full flex items-center justify-center mx-auto mb-4">
                            <Upload className="w-8 h-8 text-primary" />
                          </div>
                          <p className="font-semibold text-neutral-900 mb-1">Drop files here or click to upload</p>
                          <p className="text-sm text-neutral-500">PDF, JPG, PNG up to 10MB each</p>
                        </div>
                        <input
                          type="file"
                          multiple
                          accept=".pdf,.jpg,.jpeg,.png"
                          onChange={handleFileUpload}
                          className="hidden"
                        />
                      </label>

                      {/* Uploaded Files List */}
                      {uploadedFiles.length > 0 && (
                        <div className="space-y-2 mt-4">
                          <p className="text-sm font-medium text-neutral-700">{uploadedFiles.length} file(s) uploaded</p>
                          {uploadedFiles.map((file, index) => (
                            <div 
                              key={index} 
                              className="flex items-center justify-between bg-neutral-50 rounded-xl p-3 border border-neutral-200"
                            >
                              <div className="flex items-center gap-3">
                                <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                                  <File className="w-5 h-5 text-primary" />
                                </div>
                                <div>
                                  <p className="text-sm font-medium text-neutral-900 truncate max-w-[200px]">{file.name}</p>
                                  <p className="text-xs text-neutral-500">{formatFileSize(file.size)}</p>
                                </div>
                              </div>
                              <button 
                                type="button"
                                onClick={() => removeFile(index)}
                                className="w-8 h-8 rounded-full hover:bg-red-100 flex items-center justify-center transition-colors"
                              >
                                <X className="w-4 h-4 text-red-500" />
                              </button>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>

                    <div className="bg-amber-50/50 border border-amber-200 rounded-2xl p-4 text-amber-800 text-sm">
                      <p className="font-medium mb-1">📋 Important Note</p>
                      <p>Please ensure all documents are clear and legible. You can also upload documents later via email.</p>
                    </div>

                    <div className="flex gap-4 mt-8">
                      <Button
                        type="button"
                        variant="outline"
                        onClick={goToPrevStep}
                        className="flex-1 h-14 rounded-2xl font-bold text-lg"
                      >
                        <ArrowLeft className="w-5 h-5 mr-2" /> Back
                      </Button>
                      <Button
                        onClick={goToNextStep}
                        className="flex-1 h-14 bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90 text-white rounded-2xl font-bold text-lg"
                      >
                        Continue <ChevronRight className="w-5 h-5 ml-2" />
                      </Button>
                    </div>
                  </motion.div>
                )}

                {/* Step 4: Personal Details Form */}
                {currentStep === 4 && (
                  <motion.div
                    key="step4"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.3 }}
                  >
                    {/* Summary Banner */}
                    <div className="bg-gradient-to-r from-primary/10 to-accent/10 rounded-2xl p-4 mb-8">
                      <div className="flex flex-wrap items-center justify-between gap-4">
                        <div>
                          <span className="text-sm text-neutral-600">Nationality</span>
                          <p className="font-bold text-neutral-900">{selectedNationality?.name}</p>
                        </div>
                        <div className="text-right">
                          <span className="text-sm text-neutral-600">Visa Type</span>
                          <p className="font-bold text-primary">{selectedVisa?.name}</p>
                        </div>
                      </div>
                      {uploadedFiles.length > 0 && (
                        <div className="mt-3 pt-3 border-t border-primary/20">
                          <span className="text-sm text-neutral-600">{uploadedFiles.length} document(s) uploaded</span>
                        </div>
                      )}
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-3">
                          <Label htmlFor="fullName" className="text-base font-semibold text-neutral-700">Full Name (as per passport)</Label>
                          <Input
                            id="fullName"
                            value={formData.fullName}
                            onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                            required
                            className="h-14 bg-neutral-50/50 border-neutral-200 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 rounded-2xl text-lg transition-all"
                            placeholder="Enter your full name"
                          />
                        </div>
                        <div className="space-y-3">
                          <Label htmlFor="passportNo" className="text-base font-semibold text-neutral-700">Passport Number</Label>
                          <Input
                            id="passportNo"
                            value={formData.passportNo}
                            onChange={(e) => setFormData({ ...formData, passportNo: e.target.value })}
                            required
                            className="h-14 bg-neutral-50/50 border-neutral-200 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 rounded-2xl text-lg transition-all"
                            placeholder="Enter passport number"
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-3">
                          <Label htmlFor="dob" className="text-base font-semibold text-neutral-700">Date of Birth</Label>
                          <Input
                            id="dob"
                            type="date"
                            value={formData.dob}
                            onChange={(e) => setFormData({ ...formData, dob: e.target.value })}
                            required
                            className="h-14 bg-neutral-50/50 border-neutral-200 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 rounded-2xl text-lg transition-all"
                          />
                        </div>
                        <div className="space-y-3">
                          <Label htmlFor="travelDate" className="text-base font-semibold text-neutral-700">Intended Travel Date</Label>
                          <Input
                            id="travelDate"
                            type="date"
                            value={formData.travelDate}
                            onChange={(e) => setFormData({ ...formData, travelDate: e.target.value })}
                            required
                            className="h-14 bg-neutral-50/50 border-neutral-200 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 rounded-2xl text-lg transition-all"
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-3">
                          <Label htmlFor="email" className="text-base font-semibold text-neutral-700">Email Address</Label>
                          <Input
                            id="email"
                            type="email"
                            value={formData.email}
                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                            required
                            className="h-14 bg-neutral-50/50 border-neutral-200 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 rounded-2xl text-lg transition-all"
                            placeholder="name@example.com"
                          />
                        </div>
                        <div className="space-y-3">
                          <Label htmlFor="phone" className="text-base font-semibold text-neutral-700">Phone Number</Label>
                          <Input
                            id="phone"
                            type="tel"
                            value={formData.phone}
                            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                            required
                            className="h-14 bg-neutral-50/50 border-neutral-200 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 rounded-2xl text-lg transition-all"
                            placeholder="+1 234 567 890"
                          />
                        </div>
                      </div>

                      <div className="space-y-3">
                        <Label htmlFor="notes" className="text-base font-semibold text-neutral-700">Additional Notes (Optional)</Label>
                        <Textarea
                          id="notes"
                          value={formData.notes}
                          onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                          rows={3}
                          className="bg-neutral-50/50 border-neutral-200 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 rounded-2xl text-lg transition-all resize-none px-4 pt-4 pb-4"
                          placeholder="Any special requirements or questions?"
                        />
                      </div>

                      <div className="flex gap-4 mt-8">
                        <Button
                          type="button"
                          variant="outline"
                          onClick={goToPrevStep}
                          className="flex-1 h-14 rounded-2xl font-bold text-lg"
                        >
                          <ArrowLeft className="w-5 h-5 mr-2" /> Back
                        </Button>
                        <Button
                          type="submit"
                          className="flex-1 h-14 bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90 text-white rounded-2xl font-bold text-lg"
                        >
                          Submit Application
                        </Button>
                      </div>

                      <p className="text-center text-sm text-neutral-400 mt-4">
                        By submitting this form, you agree to our Terms of Service and Privacy Policy.
                      </p>
                    </form>
                  </motion.div>
                )}
              </AnimatePresence>
            </Card>
          </div>
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
