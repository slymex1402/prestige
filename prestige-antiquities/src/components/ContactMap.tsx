/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useRef } from 'react';
import { 
  MapPin, 
  Phone, 
  Mail, 
  Gem, 
  Send, 
  CheckCircle2, 
  ArrowRight,
  Instagram,
  Facebook,
  Twitter,
  ExternalLink
} from 'lucide-react';
import { Artifact } from '../types';
import { ART_ITEMS } from '../data/artifacts';

interface ContactMapProps {
  selectedArtifactForInquiry: Artifact | null;
  onClearInquiryArtifact: () => void;
  initialSubject?: string;
  onClearInitialSubject?: () => void;
}

export default function ContactMap({
  selectedArtifactForInquiry,
  onClearInquiryArtifact,
  initialSubject,
  onClearInitialSubject
}: ContactMapProps) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [confirmationNumber, setConfirmationNumber] = useState('');

  // Form reference for scrolling
  const formRef = useRef<HTMLDivElement>(null);
  const nameInputRef = useRef<HTMLInputElement>(null);

  // Sync state if an artifact is flagged from gallery
  useEffect(() => {
    if (selectedArtifactForInquiry) {
      setFormData((prev) => ({
        ...prev,
        subject: 'Acquisition & Reserve Request',
        message: `Dear Prestige Antiquities Curator, \n\nI am writing to inquire about the piece "${selectedArtifactForInquiry.title}" (${selectedArtifactForInquiry.date}). I am interested in requesting a detailed condition assessment report, provenance audit dossier, and private acquisition pricing.`
      }));
      // Scroll to form smoothly
      setTimeout(() => {
        formRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
        nameInputRef.current?.focus();
      }, 100);
    }
  }, [selectedArtifactForInquiry]);

  // Sync initialSubject (e.g., from footer links)
  useEffect(() => {
    if (initialSubject) {
      setFormData((prev) => ({
        ...prev,
        subject: initialSubject,
        message: initialSubject === 'Private Gallery Viewing Appointment'
          ? "I would like to schedule an in-person private viewing appointment of your collection in Rome. Please let me know your availability for the coming week."
          : initialSubject === 'Collection Valuation / Appraisal'
          ? "I would like to arrange for an appraisal valuation of a private antiquity collection heritage asset. Please advise regarding standard consultation terms."
          : `I am interested in your services regarding ${initialSubject}. Please reach out with information.`
      }));
      // Scroll to form smoothly
      setTimeout(() => {
        formRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
        nameInputRef.current?.focus();
        if (onClearInitialSubject) onClearInitialSubject();
      }, 100);
    }
  }, [initialSubject, onClearInitialSubject]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleActionClick = (subjectValue: string) => {
    setFormData((prev) => ({
      ...prev,
      subject: subjectValue,
      message: subjectValue === 'Private Gallery Viewing Appointment' 
        ? "I would like to schedule an in-person private viewing appointment of your collection in Rome. Please let me know your availability for the coming week."
        : "I would like to arrange a virtual curatorial viewing session to review your active acquisitions catalog. Please let me know the secure liaison process."
    }));
    // Scroll to form smoothly
    formRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    setTimeout(() => {
      nameInputRef.current?.focus();
    }, 600);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate an luxury gallery network request delay
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitSuccess(true);
      // Generate a premium tracking code
      const code = 'PA-' + Math.floor(100000 + Math.random() * 900000);
      setConfirmationNumber(code);
      onClearInquiryArtifact();
    }, 1500);
  };

  const resetForm = () => {
    setFormData({
      name: '',
      email: '',
      phone: '',
      subject: '',
      message: ''
    });
    setSubmitSuccess(false);
  };

  return (
    <div id="contact-section" className="bg-white text-[#2C2C2C] selection:bg-[#E25C02] selection:text-white pb-0">
      
      {/* 1. HERO BANNER HEADER */}
      <div className="relative w-full h-[320px] sm:h-[400px] overflow-hidden">
        {/* Underlay Image: Vintage Letter, writing paper & wood theme */}
        <img 
          src="https://images.unsplash.com/photo-1544816155-12df9643f363?q=80&w=1600"
          alt="Vintage letters and writing items"
          className="w-full h-full object-cover brightness-[0.7] contrast-[1.05]"
          referrerPolicy="no-referrer"
        />
        {/* Subtle linen/vignette overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/25 via-black/10 to-black/30"></div>
        
        {/* Floating brand styling elements to resemble the screenshots precisely with a tweak */}
        <div className="absolute inset-0 flex flex-col items-center justify-center p-4 text-center">
          <h1 
            className="text-white text-4xl sm:text-5xl font-serif tracking-wider mb-3 drop-shadow-md"
            style={{ fontFamily: '"Cinzel", "Playfair Display", serif' }}
          >
            Contact Us
          </h1>
          <p className="text-white/90 text-sm sm:text-base tracking-widest font-sans font-light italic max-w-lg mt-1">
            We'd love to hear from you
          </p>
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-6 sm:px-8 py-16 sm:py-24 space-y-20">
        
        {/* 2. GET IN TOUCH SECTION */}
        <div className="space-y-8 text-left">
          <div>
            <h2 
              className="text-3xl sm:text-4xl font-serif tracking-wide text-[#2C2C2C]"
              style={{ fontFamily: '"Cinzel", "Playfair Display", serif' }}
            >
              Get In Touch
            </h2>
            {/* Elegant Solid Orange Rule */}
            <div className="w-16 h-[3.5px] bg-[#E25C02] mt-3" />
          </div>

          <div className="space-y-10 pt-4">
            
            {/* Item 1: Visit Our Gallery */}
            <div className="flex gap-6 items-start group">
              <div className="p-3 bg-red-50 rounded-full border border-red-100 shadow-xs flex items-center justify-center text-red-500 shrink-0">
                <MapPin className="w-6 h-6 fill-red-100" />
              </div>
              <div className="space-y-1">
                <h4 className="font-serif text-lg font-bold text-neutral-900 tracking-wide">
                  Visit Our Gallery
                </h4>
                <p className="text-sm text-neutral-500 font-sans font-light">
                  By appointment only
                </p>
              </div>
            </div>

            {/* Item 2: Call Us */}
            <div className="flex gap-6 items-start group">
              <div className="p-3 bg-neutral-100 rounded-full border border-neutral-200 flex items-center justify-center text-neutral-500 shrink-0">
                <Phone className="w-6 h-6" />
              </div>
              <div className="space-y-1">
                <h4 className="font-serif text-lg font-bold text-neutral-900 tracking-wide">
                  Call Us
                </h4>
                <div className="text-sm text-[#E25C02] hover:text-[#D95300] font-sans font-medium transition-colors">
                  <a href="tel:+17732423024">+1 (773) 242-3024</a>
                </div>
                <p className="text-xs text-neutral-400 font-sans font-light">
                  Monday - Friday: 9am - 6pm
                </p>
              </div>
            </div>

            {/* Item 3: Email Us */}
            <div className="flex gap-6 items-start group">
              <div className="p-3 bg-neutral-100 rounded-full border border-neutral-200 flex items-center justify-center text-neutral-500 shrink-0">
                <Mail className="w-6 h-6" />
              </div>
              <div className="space-y-1">
                <h4 className="font-serif text-lg font-bold text-neutral-900 tracking-wide">
                  Email Us
                </h4>
                <div className="text-sm space-y-0.5 text-[#E25C02] font-sans font-medium">
                  <p className="hover:text-[#D95300] transition-colors">
                    <a href="mailto:prestigeantiquities@svk.jp">prestigeantiquities@svk.jp</a>
                  </p>
                </div>
              </div>
            </div>

            {/* Item 4: Follow Us */}
            <div className="flex gap-6 items-start group">
              <div className="p-3 bg-cyan-50 rounded-full border border-cyan-100 flex items-center justify-center text-sky-500 shrink-0">
                <Gem className="w-6 h-6 fill-cyan-50" />
              </div>
              <div className="space-y-3">
                <h4 className="font-serif text-lg font-bold text-neutral-900 tracking-wide">
                  Follow Us
                </h4>
                <p className="text-sm text-neutral-500 font-sans font-light leading-relaxed">
                  Stay updated with our latest acquisitions and events
                </p>
                {/* Active and working social sharing platform links */}
                <div className="flex items-center gap-3 pt-1">
                  <a 
                    href="https://instagram.com" 
                    target="_blank" 
                    rel="noreferrer"
                    className="p-2 rounded-full border border-neutral-200 hover:border-[#E25C02] hover:text-[#E25C02] text-neutral-500 transition-all hover:scale-110 flex items-center justify-center"
                    aria-label="Instagram Profile"
                  >
                    <Instagram className="w-4 h-4" />
                  </a>
                  <a 
                    href="https://facebook.com" 
                    target="_blank" 
                    rel="noreferrer"
                    className="p-2 rounded-full border border-neutral-200 hover:border-[#E25C02] hover:text-[#E25C02] text-neutral-500 transition-all hover:scale-110 flex items-center justify-center"
                    aria-label="Facebook Page"
                  >
                    <Facebook className="w-4 h-4" />
                  </a>
                  <a 
                    href="https://twitter.com" 
                    target="_blank" 
                    rel="noreferrer"
                    className="p-2 rounded-full border border-neutral-200 hover:border-[#E25C02] hover:text-[#E25C02] text-neutral-500 transition-all hover:scale-110 flex items-center justify-center"
                    aria-label="Twitter Profile"
                  >
                    <Twitter className="w-4 h-4" />
                  </a>
                </div>
              </div>
            </div>

          </div>
        </div>

        {/* 3. SEND US A MESSAGE SECTION */}
        <div ref={formRef} id="send-message-form" className="space-y-8 text-left border-t border-neutral-100 pt-16">
          <div>
            <h2 
              className="text-3xl sm:text-4xl font-serif tracking-wide text-[#2C2C2C]"
              style={{ fontFamily: '"Cinzel", "Playfair Display", serif' }}
            >
              Send Us a Message
            </h2>
            <div className="w-16 h-[3.5px] bg-[#E25C02] mt-3" />
          </div>

          {submitSuccess ? (
            /* Curatorial Confirmation Ticket Box */
            <div className="bg-neutral-50 border-2 border-neutral-100 p-8 rounded-xs text-center space-y-6 animate-fadeIn">
              <div className="w-16 h-16 bg-emerald-50 rounded-full border border-emerald-200 flex items-center justify-center mx-auto text-emerald-600">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <div className="space-y-2">
                <h3 className="font-serif text-2xl text-neutral-900 font-semibold uppercase tracking-wider">
                  Dossier Submitted Successfully
                </h3>
                <p className="text-xs font-mono text-[#E25C02] font-bold">
                  REGISTRATION ID: {confirmationNumber}
                </p>
                <p className="text-sm font-sans text-neutral-500 max-w-md mx-auto leading-relaxed">
                  Thank you for contacting Prestige Antiquities. Your message has been logged. Our specialist consultation team will review and reply within 24 business hours.
                </p>
              </div>

              <div className="pt-4 border-t border-neutral-200/60 max-w-sm mx-auto flex justify-center gap-4">
                <button
                  type="button"
                  onClick={resetForm}
                  className="px-6 py-2.5 bg-[#E25C02] hover:bg-[#D95300] text-white text-xs font-semibold uppercase tracking-widest transition-colors duration-300"
                >
                  Send Another Message
                </button>
              </div>
            </div>
          ) : (
            /* Luxury Contact Input Fields Form */
            <form onSubmit={handleSubmit} className="space-y-6">
              
              {selectedArtifactForInquiry && (
                <div className="p-4 bg-orange-50/50 border border-orange-200 flex items-center justify-between gap-4">
                  <div>
                    <span className="text-[10px] text-[#E25C02] font-bold uppercase tracking-widest font-sans block">Inquiring Item</span>
                    <h4 className="font-serif text-sm text-[#2C2C2C] font-semibold">{selectedArtifactForInquiry.title}</h4>
                    <span className="text-[10px] font-sans text-neutral-500">{selectedArtifactForInquiry.date} ({selectedArtifactForInquiry.culture})</span>
                  </div>
                  <button
                    type="button"
                    onClick={onClearInquiryArtifact}
                    className="text-xs text-neutral-500 hover:text-black underline font-sans"
                  >
                    Clear Link
                  </button>
                </div>
              )}

              {/* Your Name */}
              <div className="space-y-2">
                <label className="block text-sm font-sans font-medium text-neutral-700">
                  Your Name
                </label>
                <input
                  type="text"
                  name="name"
                  required
                  ref={nameInputRef}
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-white border border-neutral-200 focus:border-[#E25C02] focus:outline-none text-base font-sans transition-all rounded-xs focus:ring-1 focus:ring-[#E25C02]"
                />
              </div>

              {/* Email Address */}
              <div className="space-y-2">
                <label className="block text-sm font-sans font-medium text-neutral-700">
                  Email Address
                </label>
                <input
                  type="email"
                  name="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-white border border-neutral-200 focus:border-[#E25C02] focus:outline-none text-base font-sans transition-all rounded-xs focus:ring-1 focus:ring-[#E25C02]"
                />
              </div>

              {/* Phone Number */}
              <div className="space-y-2">
                <label className="block text-sm font-sans font-medium text-neutral-700">
                  Phone Number
                </label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-white border border-neutral-200 focus:border-[#E25C02] focus:outline-none text-base font-sans transition-all rounded-xs focus:ring-1 focus:ring-[#E25C02]"
                />
              </div>

              {/* Subject Select */}
              <div className="space-y-2">
                <label className="block text-sm font-sans font-medium text-neutral-700">
                  Subject
                </label>
                <div className="relative">
                  <select
                    name="subject"
                    required
                    value={formData.subject}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-white border border-neutral-200 focus:border-[#E25C02] focus:outline-none text-base font-sans transition-all rounded-xs appearance-none focus:ring-1 focus:ring-[#E25C02]"
                  >
                    <option value="">Please select a subject</option>
                    <option value="Acquisition & Reserve Request">Acquisition & Reserve Request</option>
                    <option value="Private Gallery Viewing Appointment">Private Gallery Viewing Appointment</option>
                    <option value="Provenance Research Liaison">Provenance Research Liaison</option>
                    <option value="Collection Valuation / Appraisal">Collection Valuation / Appraisal</option>
                    <option value="Virtual Consultation Request">Virtual Consultation Request</option>
                    <option value="General Inquiry">General Inquiry</option>
                  </select>
                  {/* Select arrow overlay */}
                  <div className="absolute inset-y-0 right-4 flex items-center pointer-events-none text-neutral-400">
                    <span className="text-[11px]">▼</span>
                  </div>
                </div>
              </div>

              {/* Your Message */}
              <div className="space-y-2">
                <label className="block text-sm font-sans font-medium text-neutral-700">
                  Your Message
                </label>
                <textarea
                  name="message"
                  required
                  rows={6}
                  value={formData.message}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-white border border-neutral-200 focus:border-[#E25C02] focus:outline-none text-base font-sans transition-all rounded-xs resize-y focus:ring-1 focus:ring-[#E25C02]"
                />
              </div>

              {/* Button */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="px-8 py-3 bg-[#E25C02] hover:bg-[#D95300] text-white font-sans text-sm font-semibold tracking-widest uppercase transition-all duration-300 rounded-full flex items-center gap-2 shadow-md hover:shadow-lg hover:translate-y-[-1px] active:translate-y-[0.5px]"
              >
                {isSubmitting ? (
                  <>Sending Message...</>
                ) : (
                  <>
                    Send Message <Send className="w-4 h-4 ml-1" />
                  </>
                )}
              </button>

            </form>
          )}
        </div>

      </div>

      {/* 4. SCHEDULE PRIVATE VIEWING BANNER SECTION */}
      <div className="w-full bg-[#FAF8F5] p-12 sm:p-20 text-center border-t border-b border-neutral-100 flex flex-col items-center justify-center space-y-8">
        <h3 
          className="text-3xl sm:text-4xl font-serif tracking-wide text-[#2C2C2C] max-w-2xl leading-snug uppercase"
          style={{ fontFamily: '"Cinzel", "Playfair Display", serif' }}
        >
          Schedule a Private Viewing
        </h3>
        
        <p className="text-neutral-500 text-sm sm:text-base font-sans font-light leading-relaxed max-w-xl">
          Experience our collection in person with a private appointment tailored to your interests
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4 w-full">
          <button
            onClick={() => handleActionClick('Private Gallery Viewing Appointment')}
            className="w-full sm:w-auto px-8 py-3.5 bg-[#E25C02] hover:bg-[#D95300] text-white text-xs font-bold tracking-widest uppercase transition-all duration-300 rounded-full shadow-md"
          >
            Book An Appointment
          </button>
          
          <button
            onClick={() => handleActionClick('Virtual Consultation Request')}
            className="w-full sm:w-auto px-8 py-3.5 bg-transparent border-2 border-[#E25C02] hover:bg-[#E25C02]/5 text-[#E25C02] text-xs font-bold tracking-widest uppercase transition-all duration-300 rounded-full"
          >
            Virtual Viewing
          </button>
        </div>
      </div>

    </div>
  );
}
