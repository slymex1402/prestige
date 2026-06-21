/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import ArtifactGallery from './components/ArtifactGallery';
import AboutCuration from './components/AboutCuration';
import Testimonials from './components/Testimonials';
import ContactMap from './components/ContactMap';
import Footer from './components/Footer';
import ArtifactDetailsModal from './components/ArtifactDetailsModal';
import ProvenanceLab from './components/ProvenanceLab';
import { Artifact } from './types';
import { ART_ITEMS } from './data/artifacts';

const COLOR_THEMES = {
  classic: {
    '--theme-charcoal': '#2C2C2C',
    '--theme-ivory': '#F5F3EF',
    '--theme-bronze': '#B8860B',
    '--theme-bronze-light': '#D4AF37',
  },
  pompeian: {
    '--theme-charcoal': '#4A1711',
    '--theme-ivory': '#F0E6D2',
    '--theme-bronze': '#D49B43',
    '--theme-bronze-light': '#E2B165',
  },
  tuscan: {
    '--theme-charcoal': '#263220',
    '--theme-ivory': '#FAF6EE',
    '--theme-bronze': '#C39D4C',
    '--theme-bronze-light': '#D5B56E',
  }
};

export default function App() {
  const [currentPage, setCurrentPage] = useState<'home' | 'collections' | 'about' | 'contact' | 'lab'>('home');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedArtifact, setSelectedArtifact] = useState<Artifact | null>(null);
  const [inquireArtifact, setInquireArtifact] = useState<Artifact | null>(null);
  const [currentTheme, setCurrentTheme] = useState<'classic' | 'pompeian' | 'tuscan'>('classic');
  const [contactSubjectPreset, setContactSubjectPreset] = useState('');

  const handleNavigate = (pageIdOrSectionId: string, subjectOrQuery?: string) => {
    let targetPage: 'home' | 'collections' | 'about' | 'contact' | 'lab' = 'home';
    if (pageIdOrSectionId === 'gallery-section' || pageIdOrSectionId === 'collections') {
      targetPage = 'collections';
      if (subjectOrQuery) {
        setSearchQuery(subjectOrQuery);
      }
    } else if (pageIdOrSectionId === 'about-section' || pageIdOrSectionId === 'testimonials-section' || pageIdOrSectionId === 'about') {
      targetPage = 'about';
    } else if (pageIdOrSectionId === 'contact-section' || pageIdOrSectionId === 'contact') {
      targetPage = 'contact';
      if (subjectOrQuery) {
        setContactSubjectPreset(subjectOrQuery);
      }
    } else if (pageIdOrSectionId === 'lab-section' || pageIdOrSectionId === 'lab') {
      targetPage = 'lab';
    } else {
      targetPage = 'home';
    }

    setCurrentPage(targetPage);
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  const handleSearchChange = (query: string) => {
    setSearchQuery(query);
    if (query.trim() !== '' && currentPage !== 'collections') {
      setCurrentPage('collections');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleInquireArtifact = (artifact: Artifact) => {
    setInquireArtifact(artifact);
    setSelectedArtifact(null); // Close modal if open
    setCurrentPage('contact');
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  const activeThemeVars = COLOR_THEMES[currentTheme] as React.CSSProperties;

  return (
    <div
      id="app-root-container"
      className="min-h-screen bg-charcoal text-ivory flex flex-col font-sans transition-all duration-500 justify-between relative"
      style={activeThemeVars}
    >
      <AnimatePresence mode="wait">
        <motion.main
          key={currentPage}
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -15 }}
          transition={{ duration: 0.4, ease: 'easeInOut' }}
          className="pt-20 flex-1 relative z-10"
        >
            {currentPage === 'home' && (
              <>
                <Hero
                  onExploreClick={() => handleNavigate('collections')}
                  onInquireClick={() => handleNavigate('contact')}
                  onLabClick={() => handleNavigate('lab-section')}
                />

                {/* Classical Curatorial Featured Spotlight */}
                <section className="bg-[#2C2C2C] text-[#F5F3EF] py-24 border-t border-[#B8860B]/15 relative overflow-hidden">
                  <div className="absolute top-0 right-1/4 w-72 h-72 bg-[#B8860B]/5 rounded-full blur-3xl pointer-events-none"></div>
                  <div className="max-w-7xl mx-auto px-4 md:px-8">
                    
                    {/* Spotlight Header */}
                    <div className="text-center max-w-3xl mx-auto mb-16">
                      <span className="text-[#B8860B] tracking-[0.25em] text-xs font-sans uppercase font-bold block mb-3">
                        Curator's Spotlight
                      </span>
                      <h2 
                        className="text-3xl md:text-5xl font-serif tracking-wide leading-tight text-white"
                        style={{ fontFamily: '"Cinzel", "Playfair Display", serif' }}
                      >
                        Featured Acquisitions
                      </h2>
                      <div className="w-20 h-[1px] bg-[#B8860B] mx-auto mt-6 mb-4"></div>
                      <p className="text-sm text-neutral-400 font-sans max-w-lg mx-auto leading-relaxed">
                        A refined showcase of our peerless, highly vetted classical antiquities, representing supreme standards of human craftsmanship.
                      </p>
                    </div>

                    {/* Spotlight Card Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                      {ART_ITEMS.slice(0, 3).map((item) => (
                        <div
                          key={item.id}
                          onClick={() => setSelectedArtifact(item)}
                          className="cursor-pointer group bg-black/10 border border-neutral-800/40 hover:border-[#B8860B]/40 transition-all duration-300 flex flex-col justify-between overflow-hidden shadow-xl"
                        >
                          <div className="aspect-[4/3] w-full overflow-hidden relative bg-black/30">
                            <img
                              src={item.imageUrl || undefined}
                              alt={item.title}
                              className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                              referrerPolicy="no-referrer"
                              onError={(e) => {
                                (e.target as HTMLImageElement).src = item.category === 'glass' 
                                  ? 'https://images.unsplash.com/photo-1565192647048-f997ded879f9?auto=format&fit=crop&w=800&q=80'
                                  : 'https://images.unsplash.com/photo-1603132151631-0dc5ea90878e?auto=format&fit=crop&w=800&q=80';
                              }}
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-60"></div>
                            <span className="absolute top-4 right-4 bg-[#B8860B] text-[#F5F3EF] text-[9px] uppercase tracking-widest px-2.5 py-1 font-sans font-bold shadow-sm">
                              {item.rarity}
                            </span>
                          </div>
                          <div className="p-6 text-left flex-1 flex flex-col justify-between">
                            <div>
                              <span className="text-[10px] uppercase tracking-[0.15em] font-sans font-bold text-[#D4AF37]">
                                {item.culture}
                              </span>
                              <h3 className="font-serif text-lg text-white mt-1 group-hover:text-[#D4AF37] transition-colors leading-snug line-clamp-1">
                                {item.title}
                              </h3>
                              <p className="text-neutral-400 text-xs mt-3 line-clamp-2 leading-relaxed">
                                {item.description}
                              </p>
                            </div>
                            <div className="mt-6 flex items-center justify-between pt-4 border-t border-white/5">
                              <span className="text-[10px] font-mono text-neutral-500 uppercase tracking-widest">
                                {item.material.split(' ')[0]}
                              </span>
                              <span className="text-[11px] text-[#B8860B] font-serif group-hover:translate-x-1 transition-transform duration-300 flex items-center gap-1 font-semibold">
                                Examine Details ➔
                              </span>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* Spotlight Redirect Button */}
                    <div className="text-center mt-12">
                      <button
                        onClick={() => handleNavigate('collections')}
                        className="px-8 py-4 bg-transparent border border-[#B8860B]/50 hover:border-[#B8860B] text-[#B8860B] rounded-none text-xs font-semibold uppercase tracking-widest font-sans transition-all duration-300 hover:bg-[#B8860B]/5"
                      >
                        Open Curation Repository
                      </button>
                    </div>

                  </div>
                </section>

                <Testimonials />
              </>
            )}

            {currentPage === 'collections' && (
              <ArtifactGallery
                searchQuery={searchQuery}
                onSelectArtifact={setSelectedArtifact}
                onInquireArtifact={handleInquireArtifact}
              />
            )}

            {currentPage === 'about' && (
              <>
                <AboutCuration />
                <Testimonials />
              </>
            )}

            {currentPage === 'contact' && (
              <ContactMap
                selectedArtifactForInquiry={inquireArtifact}
                onClearInquiryArtifact={() => setInquireArtifact(null)}
                initialSubject={contactSubjectPreset}
                onClearInitialSubject={() => setContactSubjectPreset('')}
              />
            )}

            {currentPage === 'lab' && (
              <ProvenanceLab />
            )}
          </motion.main>
        </AnimatePresence>

      <Footer onNavigate={handleNavigate} />

      <Navbar
        searchQuery={searchQuery}
        onSearchChange={handleSearchChange}
        onNavigate={handleNavigate}
        currentTheme={currentTheme}
        onThemeChange={setCurrentTheme}
        currentPage={currentPage}
      />

      {/* Detailed curatorial sheet modal */}
      <ArtifactDetailsModal
        artifact={selectedArtifact}
        onClose={() => setSelectedArtifact(null)}
        onInquire={handleInquireArtifact}
      />
    </div>
  );
}
