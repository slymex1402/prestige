import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import Logo from './Logo';
import { Menu, X, Search, Globe, ChevronDown, Award } from 'lucide-react';

interface NavbarProps {
  onSearchChange: (query: string) => void;
  onNavigate: (sectionId: string) => void;
  searchQuery: string;
  currentTheme: 'classic' | 'pompeian' | 'tuscan';
  onThemeChange: (theme: 'classic' | 'pompeian' | 'tuscan') => void;
  currentPage: 'home' | 'collections' | 'about' | 'contact' | 'lab';
}

export default function Navbar({
  onSearchChange,
  onNavigate,
  searchQuery,
  currentTheme,
  onThemeChange,
  currentPage
}: NavbarProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [selectedLang, setSelectedLang] = useState('EN');
  const [showLangDropdown, setShowLangDropdown] = useState(false);
  const [showSearchInput, setShowSearchInput] = useState(false);
  const [showThemeOptions, setShowThemeOptions] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', id: 'hero-section' },
    { name: 'Collections', id: 'gallery-section' },
    { name: 'Curation Lab', id: 'lab' },
    { name: 'About & Curation', id: 'about-section' },
    { name: 'Rome Gallery', id: 'contact-section' },
  ];

  const mobileLinks = [
    { name: 'Home', id: 'hero-section' },
    { name: 'Collections', id: 'gallery-section' },
    { name: 'Curation Lab', id: 'lab' },
    { name: 'About', id: 'about-section' },
    { name: 'Contact', id: 'contact-section' },
  ];

  const isLinkActive = (linkId: string) => {
    if (currentPage === 'home' && (linkId === 'hero-section' || linkId === 'home')) return true;
    if (currentPage === 'collections' && (linkId === 'gallery-section' || linkId === 'collections')) return true;
    if (currentPage === 'about' && (linkId === 'about-section' || linkId === 'about' || linkId === 'testimonials-section')) return true;
    if (currentPage === 'contact' && (linkId === 'contact-section' || linkId === 'contact')) return true;
    if (currentPage === 'lab' && (linkId === 'lab-section' || linkId === 'lab')) return true;
    return false;
  };

  const handleLinkClick = (id: string) => {
    onNavigate(id);
    setIsOpen(false);
  };

  return (
    <nav
      id="main-nav"
      className={`fixed top-0 left-0 w-full z-[99999] pointer-events-auto transition-all duration-300 ${
        isScrolled
          ? 'bg-[#F5F3EF]/95 backdrop-blur-md shadow-md border-b border-[#2C2C2C]/10 py-3 text-[#2C2C2C]'
          : 'bg-gradient-to-b from-black/60 to-transparent py-5 text-[#F5F3EF]'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 md:px-8 flex items-center justify-between">
        {/* Prestige Antiquities Logo */}
        <div className="cursor-pointer" onClick={() => handleLinkClick('hero-section')}>
          <Logo
            variant={isScrolled ? 'gold' : 'gold'}
            size="sm"
            showText={true}
          />
        </div>

        {/* Desktop Menu */}
        <div className="hidden lg:flex items-center gap-8 font-serif">
          {navLinks.map((link) => {
            const active = isLinkActive(link.id);
            return (
              <button
                key={link.id}
                onClick={() => handleLinkClick(link.id)}
                className={`text-sm font-medium tracking-widest uppercase transition-colors relative duration-300 pb-1 ${
                  active ? 'text-[#B8860B]' : 'hover:text-[#B8860B]'
                }`}
              >
                {link.name}
                <span
                  style={{ width: active ? '100%' : '0%' }}
                  className="absolute bottom-0 left-0 h-[1.5px] bg-[#B8860B] transition-all duration-300 hover-divider"
                />
              </button>
            );
          })}
        </div>

        {/* Action Widgets */}
        <div className="hidden md:flex items-center gap-6">
          {/* Quick Search */}
          <div className="relative flex items-center">
            {showSearchInput || searchQuery ? (
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => onSearchChange(e.target.value)}
                placeholder="Search antiquities..."
                className={`px-3 py-1 font-sans text-xs bg-transparent border-b ${
                  isScrolled ? 'border-[#2C2C2C] text-[#2C2C2C] focus:border-[#B8860B]' : 'border-[#F5F3EF] text-[#F5F3EF] focus:border-[#D4AF37]'
                } focus:outline-none transition-all duration-300 w-44`}
              />
            ) : null}
            <button
              onClick={() => setShowSearchInput(!showSearchInput)}
              className="p-1 hover:text-[#B8860B] transition-colors"
              aria-label="Search Collection"
            >
              <Search className="w-5 h-5" />
            </button>
          </div>

          {/* Language Selector */}
          <div className="relative">
            <button
              onClick={() => setShowLangDropdown(!showLangDropdown)}
              className="flex items-center gap-1 text-xs tracking-widest font-sans font-semibold hover:text-[#B8860B] transition-colors"
            >
              <Globe className="w-4 h-4" />
              <span>{selectedLang}</span>
              <ChevronDown className="w-3 h-3" />
            </button>

            {showLangDropdown && (
              <div className="absolute right-0 mt-2 py-1 w-20 bg-[#2C2C2C] text-[#F5F3EF] rounded shadow-lg border border-[#B8860B]/25">
                {['EN', 'IT', 'FR'].map((lang) => (
                  <button
                    key={lang}
                    onClick={() => {
                      setSelectedLang(lang);
                      setShowLangDropdown(false);
                    }}
                    className={`block w-full text-left px-3 py-1.5 text-xs hover:bg-[#B8860B] hover:text-white transition-colors ${
                      selectedLang === lang ? 'font-bold text-[#B8860B]' : ''
                    }`}
                  >
                    {lang}
                  </button>
                ))}
              </div>
            )}
          </div>

          <button
            onClick={() => handleLinkClick('contact-section')}
            className={`px-5 py-2 text-xs uppercase tracking-widest font-sans border transition-all duration-300 ${
              isScrolled
                ? 'border-[#2C2C2C] text-[#2C2C2C] hover:bg-[#2C2C2C] hover:text-[#F5F3EF]'
                : 'border-[#F5F3EF]/30 text-[#F5F3EF] hover:border-[#F5F3EF] hover:bg-[#F5F3EF] hover:text-[#2C2C2C]'
            }`}
          >
            Inquire
          </button>
        </div>

        {/* Mobile menu trigger */}
        <div className="flex items-center gap-4 lg:hidden">
          {/* Quick search button for mobile */}
          <button
            onClick={() => {
              setShowSearchInput(!showSearchInput);
              if (!showSearchInput) onNavigate('gallery-section');
            }}
            className="p-1 hover:text-[#B8860B] transition-colors"
          >
            <Search className="w-5 h-5" />
          </button>

          <button
            onClick={() => setIsOpen(!isOpen)}
            className="p-1 hover:text-[#B8860B] transition-colors pointer-events-auto"
            aria-label="Toggle Mobile Menu"
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Expanded search for mobile */}
      {showSearchInput && (
        <div className="w-full px-6 py-2 block md:hidden bg-[#2C2C2C] border-t border-[#B8860B]/20">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="Search catalog (e.g. Sculptures, Amphora, Aureus...)"
            className="w-full px-3 py-2 text-sm bg-transparent border-b border-[#F5F3EF]/30 text-[#F5F3EF] placeholder:text-[#F5F3EF]/60 focus:border-[#B8860B] focus:outline-none"
          />
        </div>
      )}

      {/* Mobile Drawer Overlay */}
      {isOpen && typeof document !== 'undefined' && createPortal(
        <>
          {/* Dark overlay backdrop */}
          <div
            id="mobile-drawer-backdrop"
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[2147483646] transition-opacity duration-300 pointer-events-auto"
            onClick={() => setIsOpen(false)}
          />

          {/* Drawer Panel */}
          <div
            id="mobile-drawer-panel"
            className="fixed top-0 right-0 h-full w-80 max-w-[85vw] bg-white text-[#2C2C2C] shadow-2xl z-[2147483647] transform translate-x-0 transition-transform duration-300 flex flex-col justify-between p-6 overflow-y-auto animate-slide-in pointer-events-auto"
            style={{
              boxShadow: '-10px 0 30px rgba(0,0,0,0.15)'
            }}
          >
            {/* Close Button X */}
            <button
              onClick={() => setIsOpen(false)}
              className="absolute top-6 right-6 p-1 text-neutral-400 hover:text-black transition-colors"
              aria-label="Close Mobile Menu"
            >
              <X className="w-6 h-6" />
            </button>

            {/* Logo area - Ornate & Centered above text (Vertical stacked) */}
            <div className="pt-10 flex justify-center pb-6 border-b border-neutral-100">
              <Logo
                variant="gold"
                size="md"
                orientation="vertical"
                showText={true}
              />
            </div>

            {/* Links area */}
            <div className="flex-1 py-10 flex flex-col justify-start">
              <div className="flex flex-col font-serif">
                {mobileLinks.map((link) => {
                  const active = isLinkActive(link.id);
                  return (
                    <button
                      key={link.id}
                      onClick={() => handleLinkClick(link.id)}
                      className={`text-left py-4 border-b border-neutral-100 text-[15px] font-medium tracking-widest transition-colors uppercase flex items-center justify-between ${
                        active
                          ? 'text-[#B8860B] font-bold bg-[#B8860B]/5 px-2 rounded-xs'
                          : 'text-neutral-800 hover:text-[#B8860B]'
                      }`}
                    >
                      <span>{link.name}</span>
                      {active && <span className="w-1.5 h-1.5 bg-[#B8860B] rounded-full" />}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Theme selector action pill button & swatches */}
            <div className="pb-8 border-t border-neutral-100 pt-6">
              <div className="flex flex-col items-center">
                <button
                  onClick={() => setShowThemeOptions(!showThemeOptions)}
                  className="flex items-center justify-center gap-2 border border-[#B8860B]/70 hover:border-[#B8860B] text-[#B8860B] rounded-full px-6 py-2.5 text-[11px] font-sans uppercase font-bold tracking-widest transition-all duration-300 bg-transparent hover:bg-[#B8860B]/5 w-full text-center"
                >
                  <span>🎨 Color Theme</span>
                </button>

                {/* Theme selection swatches list */}
                {showThemeOptions && (
                  <div className="mt-4 grid grid-cols-1 gap-1.5 w-full border border-[#B8860B]/10 rounded-sm p-2 bg-[#F5F2EB]/50">
                    {[
                      { id: 'classic', name: 'Imperial Charcoal', desc: 'Charcoal & Classic Gold', colors: ['#2C2C2C', '#B8860B'] },
                      { id: 'pompeian', name: 'Pompeian Terracotta', desc: 'Roman Red & Gold-Bronze', colors: ['#4A1711', '#D49B43'] },
                      { id: 'tuscan', name: 'Tuscan Garden', desc: 'Italian Olive & Buttercream', colors: ['#263220', '#C39D4C'] }
                    ].map((themeItem) => (
                      <button
                        key={themeItem.id}
                        onClick={() => onThemeChange(themeItem.id as any)}
                        className={`flex items-center justify-between px-3 py-2 rounded-sm text-left transition-all ${
                          currentTheme === themeItem.id
                            ? 'bg-white text-[#B8860B] shadow-xs font-semibold'
                            : 'hover:bg-white/40 text-neutral-600'
                        }`}
                      >
                        <div className="flex items-center gap-2.5">
                          {/* Color preview swatches */}
                          <div className="flex gap-1 shrink-0">
                            <span className="w-3 h-3 rounded-full border border-neutral-300 shadow-2xs" style={{ backgroundColor: themeItem.colors[0] }} />
                            <span className="w-3 h-3 rounded-full border border-neutral-300 shadow-2xs" style={{ backgroundColor: themeItem.colors[1] }} />
                          </div>
                          <div className="flex flex-col leading-none">
                            <span className="text-[11px] tracking-wide uppercase font-bold">{themeItem.name}</span>
                            <span className="text-[9px] text-neutral-400 mt-0.5">{themeItem.desc}</span>
                          </div>
                        </div>
                        {currentTheme === themeItem.id && (
                          <span className="w-2 h-2 rounded-full bg-[#B8860B]" />
                        )}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Tagline / Address */}
            <div className="text-center text-neutral-400 scale-90 border-t border-neutral-100 pt-4">
              <p className="font-serif italic text-[11px] text-neutral-400">"Venerable Forms, Timeless Stories"</p>
              <p className="font-sans text-[9px] mt-1 tracking-widest text-[#B8860B]/70 font-semibold uppercase">PRESTIGE ANTIQUITIES — ROMA</p>
            </div>
          </div>
        </>,
        document.body
      )}
    </nav>
  );
}
