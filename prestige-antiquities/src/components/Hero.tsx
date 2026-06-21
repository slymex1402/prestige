import React from 'react';
import { motion } from 'motion/react';
import { Compass, BookOpen, ShieldCheck } from 'lucide-react';

interface HeroProps {
  onExploreClick: () => void;
  onInquireClick: () => void;
  onLabClick?: () => void;
}

export default function Hero({ onExploreClick, onInquireClick, onLabClick }: HeroProps) {
  return (
    <div
      id="hero-section"
      className="relative min-h-screen bg-black flex items-center justify-center overflow-hidden"
    >
      {/* Background Image with Dramatic Overlay */}
      <div className="absolute inset-0 z-0">
        <img
          src="/src/assets/images/sculpture_hero_image_1780072801086.png"
          alt="Ancient Roman Marcus Aurelius Sculpture Bust"
          className="w-full h-full object-cover object-center opacity-70 transform scale-105 transition-transform duration-10000 ease-out"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/40 to-transparent"></div>
        <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-[#2C2C2C] to-transparent"></div>
      </div>

      {/* Floating Light Flare Overlay */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-[#B8860B]/10 rounded-full blur-3xl pointer-events-none"></div>

      {/* Hero Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 md:px-8 mt-20 w-full">
        <div className="max-w-3xl text-left">
          {/* Top Label */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="flex items-center gap-2 mb-6"
          >
            <div className="w-8 h-[1px] bg-[#B8860B]"></div>
            <span className="text-[#B8860B] tracking-[0.3em] text-xs font-sans uppercase font-semibold">
              The Fine Art of Antiquity
            </span>
          </motion.div>

          {/* Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-5xl md:text-7xl font-serif text-[#F5F3EF] leading-tight tracking-wider mb-2"
            style={{ fontFamily: '"Cinzel", "Playfair Display", serif' }}
          >
            PRESTIGE ANTIQUITIES
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="text-lg md:text-2xl font-serif italic text-[#D4AF37] tracking-wider mb-6 ml-1"
          >
            Venerable Forms, Timeless Stories
          </motion.p>

          {/* Description */}
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-[#F5F3EF]/80 font-sans text-sm md:text-base leading-relaxed tracking-wide mb-8 pl-1 max-w-2xl"
          >
            Step into a museum-quality collection of highly vetted Greek, Roman, and Hellenistic masterpieces. 
            Every relic in our care represents an authenticated lineage, combining pristine provenance with 
            the high classical proportions that shaped human civilization.
          </motion.p>

          {/* Interactive CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="flex flex-wrap gap-4 pl-1"
          >
            {/* Explore trigger */}
            <button
              onClick={onExploreClick}
              className="px-8 py-4 text-xs font-semibold uppercase tracking-widest bg-gradient-to-r from-[#B8860B] to-[#D4AF37] text-white hover:brightness-110 shadow-lg hover:shadow-[#B8860B]/20 transition-all duration-300 transform hover:-translate-y-0.5"
            >
              Explore Collection
            </button>

            {/* Inquire trigger */}
            <button
              onClick={onInquireClick}
              className="px-8 py-4 text-xs font-semibold uppercase tracking-widest border border-[#F5F3EF]/30 text-[#F5F3EF] hover:border-[#F5F3EF] hover:bg-[#F5F3EF]/5 transition-all duration-300 backdrop-blur-sm"
            >
              Private Consultation
            </button>
          </motion.div>
        </div>

        {/* Feature Tracing Highlights */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.7 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-20 border-t border-[#F5F3EF]/10 pt-8"
        >
          <div 
            onClick={onLabClick}
            className="flex items-start gap-4 cursor-pointer group hover:bg-[#B8860B]/5 p-2 rounded-xs transition-all duration-300"
          >
            <div className="p-3 rounded bg-white/5 border border-white/10 text-[#D4AF37] group-hover:bg-[#B8860B] group-hover:text-black transition-all">
              <ShieldCheck className="w-6 h-6 border-none" />
            </div>
            <div>
              <h3 className="font-serif text-[#F5F3EF] text-sm uppercase tracking-wider group-hover:text-[#B8860B] transition-colors leading-snug">Absolute Authenticity</h3>
              <p className="text-[#F5F3EF]/60 text-xs mt-1 leading-relaxed">
                Subject to sub-surface TL testing and isotope maps; read our <span className="text-[#B8860B] underline font-semibold">Verification Lab ➔</span>.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-4">
            <div className="p-3 rounded bg-white/5 border border-white/10 text-[#D4AF37]">
              <Compass className="w-6 h-6" />
            </div>
            <div>
              <h3 className="font-serif text-[#F5F3EF] text-sm uppercase tracking-wider font-semibold">Exquisite Materiality</h3>
              <p className="text-[#F5F3EF]/60 text-xs mt-1 leading-relaxed">
                Luminous Pentelic marbles, lost-wax bronzes, and classical Greek pottery showing peak craftsmanship.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-4">
            <div className="p-3 rounded bg-white/5 border border-white/10 text-[#D4AF37]">
              <BookOpen className="w-6 h-6" />
            </div>
            <div>
              <h3 className="font-serif text-[#F5F3EF] text-sm uppercase tracking-wider font-semibold">Scholarly Provenance</h3>
              <p className="text-[#F5F3EF]/60 text-xs mt-1 leading-relaxed">
                Full chain of ownership verified against international registers, including old noble family records.
              </p>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Decorative Slide Indicator */}
      <div className="absolute right-8 bottom-32 hidden xl:flex flex-col items-center gap-4">
        <span className="text-[10px] tracking-[0.3em] uppercase text-[#F5F3EF]/40 font-mono rotate-90 origin-bottom-right translate-y-10">
          Scroll Down
        </span>
        <div className="w-[1px] h-16 bg-[#F5F3EF]/25 relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-1/2 bg-[#B8860B] animate-bounce"></div>
        </div>
      </div>
    </div>
  );
}
