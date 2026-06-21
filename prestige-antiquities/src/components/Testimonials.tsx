import React, { useState } from 'react';
import { TESTIMONIALS } from '../data/artifacts';
import { Quote, ChevronLeft, ChevronRight, MessageSquareCode, Award } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export default function Testimonials() {
  const [activeIndex, setActiveIndex] = useState(0);

  const handlePrev = () => {
    setActiveIndex((prev) => (prev === 0 ? TESTIMONIALS.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setActiveIndex((prev) => (prev === TESTIMONIALS.length - 1 ? 0 : prev + 1));
  };

  const current = TESTIMONIALS[activeIndex];

  return (
    <div id="testimonials-section" className="bg-[#2C2C2C] text-[#F5F3EF] py-24 md:py-32 relative overflow-hidden">
      {/* Visual background accents */}
      <div className="absolute top-0 right-0 w-80 h-80 bg-[#B8860B]/5 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-[#B8860B]/5 rounded-full blur-3xl pointer-events-none"></div>

      <div className="max-w-5xl mx-auto px-4 md:px-8 text-center relative z-10">
        
        {/* Section Header */}
        <div className="mb-16">
          <div className="flex items-center justify-center gap-2 mb-3">
            <Award className="w-5 h-5 text-[#B8860B]" />
            <span className="text-xs font-semibold tracking-[0.25em] uppercase font-sans text-[#D4AF37]">
              Patrons & Collections
            </span>
          </div>
          <h2
            className="text-3xl md:text-5xl font-serif tracking-wide text-white"
            style={{ fontFamily: '"Cinzel", "Playfair Display", serif' }}
          >
            Endorsed by Global Institutions & Advisors
          </h2>
          <div className="w-20 h-[1.5px] bg-[#B8860B] mx-auto mt-6"></div>
        </div>

        {/* Dynamic Carousel Slide Container */}
        <div className="relative min-h-[300px] flex items-center justify-center">
          <AnimatePresence mode="wait">
            <motion.div
              key={current.id}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.5 }}
              className="max-w-3xl mx-auto px-6"
            >
              <Quote className="w-12 h-12 text-[#B8860B]/30 mx-auto mb-6" />

              <blockquote className="text-lg md:text-2xl font-serif italic text-neutral-200 leading-relaxed tracking-wide">
                "{current.quote}"
              </blockquote>

              <div className="mt-8">
                <p className="font-serif text-[#D4AF37] text-base md:text-lg tracking-widest uppercase font-medium">
                  {current.author}
                </p>
                <p className="text-xs md:text-sm text-neutral-400 mt-1 font-sans">
                  {current.role} • <strong className="text-neutral-500 font-medium">{current.location}</strong>
                </p>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Navigation Arrows & Pagination Indicators */}
        <div className="flex flex-col items-center gap-6 mt-12">
          {/* Circular Navigation Buttons */}
          <div className="flex items-center gap-4">
            <button
              onClick={handlePrev}
              className="w-10 h-10 rounded-full border border-neutral-600 hover:border-[#B8860B] hover:bg-[#B8860B]/10 flex items-center justify-center text-[#F5F3EF] transition-all hover:scale-105"
              aria-label="Previous testimonial"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>

            <button
              onClick={handleNext}
              className="w-10 h-10 rounded-full border border-neutral-600 hover:border-[#B8860B] hover:bg-[#B8860B]/10 flex items-center justify-center text-[#F5F3EF] transition-all hover:scale-105"
              aria-label="Next testimonial"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>

          {/* Dots indicating state */}
          <div className="flex gap-2">
            {TESTIMONIALS.map((test, index) => (
              <button
                key={test.id}
                onClick={() => setActiveIndex(index)}
                className={`w-2 h-2 rounded-full transition-all duration-300 ${
                  activeIndex === index ? 'bg-[#B8860B] w-6' : 'bg-neutral-600 hover:bg-neutral-500'
                }`}
                aria-label={`Go to slide ${index + 1}`}
              ></button>
            ))}
          </div>
        </div>

        {/* Global Preservation Footnote */}
        <div className="mt-20 border-t border-[#F5F3EF]/10 pt-10 text-neutral-500 font-sans text-[11px] leading-relaxed max-w-2xl mx-auto">
          *Institutional and collector identification is anonymized or altered in certain entries to conform to absolute private transaction privacy charters. All other museum-collaborations are matters of public research record.
        </div>

      </div>
    </div>
  );
}
