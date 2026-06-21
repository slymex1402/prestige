/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { motion } from 'motion/react';
import { 
  Scroll, 
  ShieldCheck, 
  HeartHandshake, 
  Library, 
  Globe,
  Award, 
  Compass,
  Clock
} from 'lucide-react';

export default function AboutCuration() {
  const pillars = [
    {
      icon: <Scroll className="w-6 h-6 text-[#E25C02]" />,
      title: 'Heritage Preservation',
      desc: 'We believe historical objects deserve careful stewardship and protection so future generations can appreciate their significance.'
    },
    {
      icon: <ShieldCheck className="w-6 h-6 text-[#E25C02]" />,
      title: 'Authenticity & Integrity',
      desc: 'Every item undergoes detailed examination and documentation to ensure confidence in its origin and historical value.'
    },
    {
      icon: <HeartHandshake className="w-6 h-6 text-[#E25C02]" />,
      title: 'Exceptional Service',
      desc: 'We are committed to providing a professional and personalized experience for every client, from first inquiry to final acquisition.'
    },
    {
      icon: <Library className="w-6 h-6 text-[#E25C02]" />,
      title: 'Knowledge & Expertise',
      desc: 'Our team values continuous research and education, enabling us to present collections with accuracy, context, and respect for their historical importance.'
    },
    {
      icon: <Globe className="w-6 h-6 text-[#E25C02]" />,
      title: 'Global Trust',
      desc: 'Through years of ethical business practices and transparent operations, Prestige Antiquities has built lasting relationships with collectors and institutions around the world.'
    }
  ];

  const timelineEvents = [
    {
      date: '2004',
      title: 'The Beginning',
      desc: 'Margaret McGinley launches Prestige Antiquities with a carefully selected collection of historical artifacts and decorative antiques.'
    },
    {
      date: '2008',
      title: 'Expanding Horizons',
      desc: 'The company broadens its reach by establishing relationships with trusted sources and specialists across multiple continents.'
    },
    {
      date: '2013',
      title: 'Specialist Collections',
      desc: 'Prestige Antiquities introduces dedicated collections featuring ancient sculptures, ceremonial artifacts, and rare cultural treasures.'
    },
    {
      date: '2017',
      title: 'Digital Gallery Launch',
      desc: 'A modern online platform is introduced, allowing collectors worldwide to explore and acquire unique pieces from the comfort of their homes.'
    },
    {
      date: '2021',
      title: 'Worldwide Recognition',
      desc: 'The company gains recognition among international collectors for its commitment to authenticity and exceptional customer service.'
    },
    {
      date: 'Today',
      title: 'Preserving the Legacy',
      desc: 'Prestige Antiquities continues to serve a growing global community of collectors, museums, researchers, and history enthusiasts seeking rare and meaningful artifacts.'
    }
  ];

  return (
    <div id="about-section" className="bg-[#FAF8F5] text-[#2C2C2C] pb-24 border-b border-neutral-200 selection:bg-[#E25C02] selection:text-white">
      
      {/* 1. HERO HEADER SECTION */}
      <div className="relative w-full bg-[#B3B3B3] py-16 sm:py-24 text-center overflow-hidden flex items-center justify-center min-h-[460px]">
        {/* Grey flanks background layout styling to mimic the screenshot exactly */}
        <div className="absolute inset-0 bg-[#A3A3A3] opacity-20"></div>
        
        {/* Centered container for vertical portrait block */}
        <div className="relative z-10 max-w-xl mx-auto px-4">
          <div className="relative aspect-[3/4] w-72 sm:w-80 mx-auto rounded-xs overflow-hidden shadow-2xl border-4 border-white/95 group">
            {/* Background image of founder Margaret McGinley in pinstripe navy blazer */}
            <img
              src="/src/assets/images/lori_williamson_1780546223842.png"
              alt="Margaret McGinley - Founder of Prestige Antiquities"
              className="w-full h-full object-cover grayscale brightness-95 group-hover:grayscale-0 transition-all duration-700"
              referrerPolicy="no-referrer"
            />
            {/* Dark elegant text overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-black/20 flex flex-col items-center justify-center px-6 text-center">
              <h1 
                className="text-white text-3xl sm:text-4xl font-serif tracking-wider mb-3 drop-shadow-md text-center"
                style={{ fontFamily: '"Cinzel", "Playfair Display", serif' }}
              >
                About Prestige Antiquities
              </h1>
              
              <div className="w-12 h-[1px] bg-white/40 my-2"></div>
              
              <p className="text-white/90 text-sm sm:text-base tracking-widest font-sans font-light italic leading-relaxed">
                Where Art, History, and Passion Converge
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-6 sm:px-8 mt-20">
        
        {/* 2. MEET OUR FOUNDER SECTION */}
        <div className="text-left space-y-8 pb-16 border-b border-neutral-200">
          <div>
            <h2 
              className="text-3xl sm:text-4xl font-serif tracking-wide text-[#2C2C2C] uppercase"
              style={{ fontFamily: '"Cinzel", "Playfair Display", serif' }}
            >
              MEET OUR FOUNDER
            </h2>
            {/* Prominent Solid Orange Underline Highlight */}
            <div className="w-24 h-[3.5px] bg-[#E25C02] mt-3 rounded-none"></div>
          </div>

          <div className="space-y-6 text-left leading-relaxed text-[#2C2C2C] text-sm sm:text-base font-sans">
            <p>
              Prestige Antiquities was established by <span className="font-semibold text-neutral-800">Margaret McGinley</span>, a dedicated collector and respected expert in historical artifacts whose lifelong fascination with ancient civilizations inspired the creation of a company devoted to preserving the world's cultural heritage.
            </p>

            <p>
              Founded in 2004, Prestige Antiquities began as a modest private collection and has since evolved into an internationally recognized destination for authentic antiquities, rare sculptures, historical relics, and distinguished collectibles. Margaret's commitment to authenticity, research, and ethical acquisition has shaped the company's reputation for excellence.
            </p>

            <p>
              For more than two decades, she has worked closely with collectors, historians, institutions, and art enthusiasts, helping them discover remarkable pieces that connect the present with the past. Her vision has always been to make history accessible through carefully curated objects that possess both cultural significance and enduring value.
            </p>

            {/* Signature Quote styling */}
            <div className="my-8 pl-6 border-l-4 border-[#E25C02] italic text-[#4A4A4A] bg-neutral-50 py-4 pr-4">
              <span className="text-3xl font-serif text-[#E25C02] leading-none block -mb-2">“</span>
              <p className="text-sm sm:text-base font-medium font-serif leading-relaxed text-neutral-700">
                "Our responsibility extends beyond collecting rare objects," Margaret explains. "We are custodians of history, preserving the stories, craftsmanship, and traditions that have survived through generations."
              </p>
              <span className="block text-[11px] uppercase tracking-wider font-mono font-bold text-neutral-500 mt-2 text-right">
                — Margaret McGinley, Founder
              </span>
            </div>
          </div>
        </div>

        {/* 3. THE PRESTIGE ANTIQUITIES STORY TIMELINE */}
        <div className="text-left space-y-8 py-16 border-b border-neutral-200">
          <div>
            <h2 
              className="text-3xl sm:text-4xl font-serif tracking-wide text-[#2C2C2C] uppercase"
              style={{ fontFamily: '"Cinzel", "Playfair Display", serif' }}
            >
              THE PRESTIGE ANTIQUITIES STORY
            </h2>
            <div className="w-16 h-[3.5px] bg-[#E25C02] mt-3"></div>
          </div>

          <div className="relative pl-6 sm:pl-10 ml-2 py-4">
            {/* Absolute Vertical Orange Line */}
            <div className="absolute top-0 bottom-0 left-0 w-[3px] bg-[#E25C02]" />

            {/* Interactive Timeline Cards */}
            <div className="space-y-10">
              {timelineEvents.map((ev, index) => (
                <div key={index} className="relative group text-left">
                  
                  {/* Timeline Circle Node on the vertical line */}
                  <div className="absolute -left-[31px] sm:-left-[47px] top-1.5 w-4 h-4 rounded-full bg-[#FAF8F5] border-[3px] border-[#E25C02] group-hover:scale-125 transition-transform duration-300 shadow-sm" />

                  {/* Card Container */}
                  <div className="bg-white p-5 sm:p-6 rounded-none border border-neutral-200/80 shadow-xs hover:shadow-md transition-shadow duration-300">
                    <span className="block text-xs uppercase tracking-widest font-mono font-bold text-[#D95300] mb-1">
                      {ev.date} — {ev.title}
                    </span>
                    <p className="text-xs sm:text-sm text-neutral-600 leading-relaxed font-sans font-light">
                      {ev.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* 4. OUR PRINCIPLES SECTION */}
        <div className="text-left space-y-8 pt-16">
          <div>
            <h2 
              className="text-3xl sm:text-4xl font-serif tracking-wide text-[#2C2C2C] uppercase"
              style={{ fontFamily: '"Cinzel", "Playfair Display", serif' }}
            >
              OUR PRINCIPLES
            </h2>
            <div className="w-20 h-[3.5px] bg-[#E25C02] mt-3"></div>
            <p className="text-sm text-neutral-500 mt-2 max-w-xl">
              We operate under the highest standards of integrity, historical stewardship, and customer service.
            </p>
          </div>

          {/* Core Principles grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-4">
            {pillars.map((pillar, idx) => (
              <div 
                key={idx} 
                className="bg-white p-6 border border-neutral-200 hover:border-[#E25C02] hover:shadow-lg transition-all duration-300 relative text-left"
              >
                {/* Visual orange edge trim */}
                <div className="absolute top-0 left-0 right-0 h-[3px] bg-neutral-100 group-hover:bg-[#E25C02] transition-colors" />
                
                <div className="flex gap-4 items-start">
                  <div className="p-2.5 bg-neutral-50 border border-neutral-200 shrink-0">
                    {pillar.icon}
                  </div>
                  <div>
                    <h4 className="font-serif text-[15px] font-bold text-neutral-900 tracking-wide mb-1.5 uppercase">
                      {pillar.title}
                    </h4>
                    <p className="text-xs text-neutral-600 font-sans leading-relaxed">
                      {pillar.desc}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}
