/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Mail, Phone, MapPin, Landmark, Heart, ShieldCheck, HelpCircle } from 'lucide-react';

interface FooterProps {
  onNavigate: (sectionId: string, searchFilter?: string) => void;
}

export default function Footer({ onNavigate }: FooterProps) {
  const years = new Date().getFullYear();
  const [showComplianceModal, setShowComplianceModal] = useState(false);

  const handleLinkClick = (e: React.MouseEvent, pageId: string, filter?: string) => {
    e.preventDefault();
    onNavigate(pageId, filter);
  };

  const collectionsLinks = [
    { name: 'Fine Art', query: 'pottery' },
    { name: 'Glass & Crystal', query: 'glass' },
    { name: 'Sculptures', query: 'sculpture' },
    { name: 'Antique Furniture', query: 'furniture' },
    { name: 'Musical Instruments', query: 'musical' },
    { name: 'Vintage Toys', query: 'toys' },
    { name: 'Classic Automobiles', query: 'automobiles' },
    { name: 'Rare Diamonds', query: 'coin' }
  ];

  const servicesLinks = [
    { name: 'Private Viewings', page: 'contact', query: 'Private Gallery Viewing Appointment' },
    { name: 'Appraisal Services', page: 'contact', query: 'Collection Valuation / Appraisal' }
  ];

  return (
    <footer id="main-footer" className="bg-[#1A1A1A] text-neutral-300 py-16 border-t border-neutral-800">
      <div className="max-w-4xl mx-auto px-6 sm:px-8">
        
        {/* Core Layout Grid - Matching the Screenshots Exactly */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 text-left pb-12 border-b border-neutral-800/80">
          
          {/* Column 1: Prestige Antiquities Brand description */}
          <div className="md:col-span-6 space-y-4 text-left">
            <h3 className="font-serif text-white font-semibold text-lg uppercase tracking-wider">
              Prestige Antiquities
            </h3>
            {/* Thick custom accent line from screenshots */}
            <div className="w-12 h-[3.5px] bg-[#E25C02] mt-2 mb-4" />
            
            <p className="text-sm text-neutral-400 font-sans font-light leading-relaxed max-w-sm">
              Founded by Margaret McGinley in 2004, we specialize in fine art, antiques, collectibles, and rare diamonds from around the world.
            </p>
          </div>

          {/* Column 2: Collections Links */}
          <div className="md:col-span-3 space-y-4 text-left">
            <h3 className="font-serif text-white font-semibold text-xs uppercase tracking-widest">
              Collections
            </h3>
            <div className="w-8 h-[3.5px] bg-[#E25C02] mt-2 mb-4" />
            
            <ul className="space-y-3.5 text-xs font-sans font-light text-neutral-400">
              {collectionsLinks.map((link) => (
                <li key={link.name}>
                  <a 
                    href="#gallery-section" 
                    onClick={(e) => handleLinkClick(e, 'gallery-section', link.query)}
                    className="hover:text-[#E25C02] transition-colors relative"
                  >
                    • {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Services Links & Contact Desk */}
          <div className="md:col-span-3 space-y-4 text-left">
            <h3 className="font-serif text-white font-semibold text-xs uppercase tracking-widest font-bold">
              Services
            </h3>
            <div className="w-8 h-[3.5px] bg-[#E25C02] mt-2 mb-4" />
            
            <ul className="space-y-3.5 text-xs font-sans font-light text-neutral-400">
              {servicesLinks.map((link) => (
                <li key={link.name}>
                  <a 
                    href="#contact-section" 
                    onClick={(e) => handleLinkClick(e, link.page, link.query)}
                    className="hover:text-[#E25C02] transition-colors"
                  >
                    • {link.name}
                  </a>
                </li>
              ))}
              <li>
                <a 
                  href="#lab" 
                  onClick={(e) => handleLinkClick(e, 'lab')}
                  className="hover:text-[#E25C02] transition-colors"
                >
                  • Curation & Lab
                </a>
              </li>
              <li>
                <button 
                  onClick={() => setShowComplianceModal(true)}
                  className="hover:text-[#E25C02] transition-colors text-left flex items-center gap-1.5"
                >
                  • UNESCO Ethics Charter
                </button>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom copyright metadata row */}
        <div className="pt-8 flex flex-col md:flex-row items-center justify-between gap-6 text-[11px] font-sans text-neutral-500 text-left">
          
          <div className="space-y-1 text-center md:text-left">
            <p>
              © {years} <span className="font-serif text-neutral-400 tracking-wider">PRESTIGE ANTIQUITIES</span>. All rights reserved. 
            </p>
            <p className="text-neutral-600">
              Registered Heritage Dealer and Appraiser. UNESCO 1970 compliant antiquity catalog. Licensed under art-loss clearance.
            </p>
          </div>

          {/* Verification Badges */}
          <div className="flex flex-wrap justify-center gap-4 text-[10px] uppercase font-semibold">
            <button 
              onClick={() => setShowComplianceModal(true)}
              className="flex items-center gap-1 text-neutral-500 hover:text-[#E25C02] transition-colors"
            >
              <ShieldCheck className="w-3.5 h-3.5 text-[#E25C02]" /> Secure Heritage
            </button>
            <span className="flex items-center gap-1 text-neutral-500 select-none">
              Made with <Heart className="w-3 h-3 text-[#E25C02] fill-[#E25C02]" /> for Antiquities Preservation
            </span>
          </div>

        </div>

      </div>

      {/* ROME COMPLIANCE DIALOG MODAL PANEL */}
      {showComplianceModal && (
        <div className="fixed inset-0 z-[100000] flex items-center justify-center p-4 bg-black/80 backdrop-blur-xs select-none">
          <div className="bg-white border border-neutral-200 text-[#2C2C2C] p-6 sm:p-8 max-w-md w-full rounded-xs shadow-2xl relative text-left">
            <h4 
              className="font-serif text-xl font-bold uppercase tracking-wide border-b border-neutral-100 pb-3"
              style={{ fontFamily: '"Cinzel", "Playfair Display", serif' }}
            >
              UNESCO Compliance Directive
            </h4>
            
            <p className="text-xs text-neutral-600 font-sans leading-relaxed mt-4">
              Prestige Antiquities enforces complete legal alignment with the <strong>1970 UNESCO Convention</strong> on the Means of Prohibiting and Preventing the Illicit Import, Export and Transfer of Ownership of Cultural Property.
            </p>

            <ul className="text-xs text-neutral-500 font-sans space-y-2 mt-4 leading-relaxed max-h-48 overflow-y-auto pr-2">
              <li className="flex gap-2">
                <span className="text-[#E25C02] font-bold">•</span>
                <span><strong>Rigorous Provenance Audit:</strong> Each work in our custody is subjected to cross-checked registry evaluation.</span>
              </li>
              <li className="flex gap-2">
                <span className="text-[#E25C02] font-bold">•</span>
                <span><strong>No Illicit Trade:</strong> We completely boycott materials sourced from modern zones of war or conflict.</span>
              </li>
              <li className="flex gap-2">
                <span className="text-[#E25C02] font-bold">•</span>
                <span><strong>Academic Cooperation:</strong> We provide full disclosure archives to researchers, curators, and institutional historians.</span>
              </li>
            </ul>

            <div className="pt-6 border-t border-neutral-100 mt-6 flex justify-end">
              <button
                onClick={() => setShowComplianceModal(false)}
                className="px-6 py-2 bg-[#E25C02] hover:bg-[#D95300] text-white text-xs font-bold uppercase tracking-widest transition-colors rounded-full"
              >
                Close Charter
              </button>
            </div>
          </div>
        </div>
      )}

    </footer>
  );
}
