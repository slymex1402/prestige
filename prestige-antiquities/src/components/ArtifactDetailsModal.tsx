import React, { useState, useEffect } from 'react';
import { Artifact } from '../types';
import { X, Calendar, Landmark, MapPin, Sparkles, ArrowRight, BookOpen, Compass } from 'lucide-react';

interface ArtifactDetailsModalProps {
  artifact: Artifact | null;
  onClose: () => void;
  onInquire: (artifact: Artifact) => void;
}

export default function ArtifactDetailsModal({
  artifact,
  onClose,
  onInquire
}: ArtifactDetailsModalProps) {
  const [imgSrc, setImgSrc] = useState(artifact?.imageUrl || undefined);

  useEffect(() => {
    if (artifact) {
      setImgSrc(artifact.imageUrl);
    }
  }, [artifact]);

  if (!artifact) return null;

  return (
    <div
      id="artifact-modal-overlay"
      className="fixed inset-0 z-[10000] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm overflow-y-auto"
      onClick={onClose}
    >
      <div
        id="artifact-modal-content"
        className="relative bg-[#F5F3EF] border border-[#B8860B]/30 max-w-4xl w-full text-[#2C2C2C] shadow-2xl rounded-sm overflow-hidden my-8"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-20 p-2 bg-[#2C2C2C] text-[#F5F3EF] hover:bg-[#B8860B] hover:text-[#2C2C2C] transition-colors rounded-full"
          aria-label="Close detailed view"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="grid grid-cols-1 md:grid-cols-2">
          {/* Left Side: Magnificent high-res image and basic visual tags */}
          <div className="relative aspect-[3/4] md:h-full min-h-[400px] bg-black">
            <img
              src={imgSrc || undefined}
              alt={artifact.title}
              className="w-full h-full object-cover object-center opacity-90"
              referrerPolicy="no-referrer"
              onError={() => {
                if (artifact.category === 'glass') {
                  setImgSrc('https://images.unsplash.com/photo-1565192647048-f997ded879f9?auto=format&fit=crop&w=800&q=80');
                } else {
                  setImgSrc('https://images.unsplash.com/photo-1603132151631-0dc5ea90878e?auto=format&fit=crop&w=800&q=80');
                }
              }}
            />
            {/* Visual aesthetic overlay showing rarity and seal */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent"></div>
            <div className="absolute bottom-6 left-6 right-6 text-white text-left">
              <span className="text-[10px] uppercase tracking-[0.2em] bg-[#B8860B] text-white px-2.5 py-1 font-sans font-semibold mb-2 inline-block">
                {artifact.rarity} Classification
              </span>
              <h3 className="font-serif text-2xl tracking-wide max-w-sm mt-1 mb-1">
                {artifact.title}
              </h3>
              <p className="font-mono text-[10px] text-neutral-400 uppercase tracking-widest leading-none">
                {artifact.culture} • {artifact.date}
              </p>
            </div>
          </div>

          {/* Right Side: Museum dossier label sheets */}
          <div className="p-8 md:p-10 flex flex-col justify-between max-h-[90vh] overflow-y-auto">
            <div>
              {/* Museum catalog code */}
              <div className="flex items-center justify-between border-b border-[#2C2C2C]/10 pb-4 mb-6">
                <div>
                  <span className="text-neutral-400 text-[10px] font-sans uppercase tracking-widest">Masterwork Dossier No.</span>
                  <p className="font-mono text-xs font-semibold text-[#B8860B]">PA-{artifact.id.slice(0, 4).toUpperCase()}-940</p>
                </div>
                <div className="text-right">
                  <span className="text-neutral-400 text-[10px] font-sans uppercase tracking-widest">Class</span>
                  <p className="text-xs uppercase font-sans font-bold text-[#2C2C2C]">{artifact.category}</p>
                </div>
              </div>

              {/* Specifications Card */}
              <div className="bg-[#2C2C2C]/5 border border-[#2C2C2C]/10 p-4 mb-6 rounded-sm text-xs space-y-2.5">
                <div className="flex justify-between items-start">
                  <span className="font-semibold text-neutral-500 uppercase tracking-wider font-sans text-[10px]">Culture:</span>
                  <span className="text-[#2C2C2C] font-semibold text-right">{artifact.culture}</span>
                </div>
                <div className="flex justify-between items-start">
                  <span className="font-semibold text-neutral-500 uppercase tracking-wider font-sans text-[10px]">Date Rate:</span>
                  <span className="text-[#2C2C2C] font-semibold text-right">{artifact.date}</span>
                </div>
                <div className="flex justify-between items-start">
                  <span className="font-semibold text-neutral-500 uppercase tracking-wider font-sans text-[10px]">Material:</span>
                  <span className="text-[#2C2C2C] font-semibold text-right max-w-xs">{artifact.material}</span>
                </div>
                <div className="flex justify-between items-start">
                  <span className="font-semibold text-neutral-500 uppercase tracking-wider font-sans text-[10px]">Dimensions:</span>
                  <span className="text-[#2C2C2C] font-semibold text-right">{artifact.dimensions}</span>
                </div>
              </div>

              <div className="space-y-6">
                {/* Masterwork description */}
                <div>
                  <div className="flex items-center gap-1.5 text-[#B8860B] border-b border-[#B8860B]/10 pb-1.5 mb-3">
                    <Sparkles className="w-3.5 h-3.5" />
                    <h4 className="font-serif text-xs uppercase tracking-widest font-bold">Curator's Note</h4>
                  </div>
                  <p className="text-xs font-sans leading-relaxed text-neutral-600 font-normal">
                    {artifact.description}
                  </p>
                </div>

                {/* Provenance timeline history */}
                <div>
                  <div className="flex items-center gap-1.5 text-[#B8860B] border-b border-[#B8860B]/10 pb-1.5 mb-3">
                    <BookOpen className="w-3.5 h-3.5" />
                    <h4 className="font-serif text-xs uppercase tracking-widest font-bold">Provenance Chronology</h4>
                  </div>
                  <div className="p-3 bg-amber-50 border border-amber-500/15 rounded-sm relative">
                    <p className="text-xs font-sans leading-relaxed italic text-neutral-700">
                      {artifact.provenance}
                    </p>
                  </div>
                </div>

                {/* Exhibition History, if any */}
                {artifact.exhibited && (
                  <div>
                    <div className="flex items-center gap-1.5 text-[#B8860B] border-b border-[#B8860B]/10 pb-1.5 mb-3">
                      <Landmark className="w-3.5 h-3.5" />
                      <h4 className="font-serif text-xs uppercase tracking-widest font-bold">Scholarship & Exhibitions</h4>
                    </div>
                    <p className="text-xs font-sans leading-relaxed text-neutral-600">
                      {artifact.exhibited}
                    </p>
                  </div>
                )}
              </div>
            </div>

            {/* Inquire overlay Trigger link */}
            <div className="mt-8 pt-6 border-t border-[#2C2C2C]/10 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="text-left">
                <span className="block text-[9px] uppercase tracking-widest text-[#B8860B] font-bold font-sans">Aquisition Status</span>
                <span className="text-xs text-neutral-500 font-sans font-medium">Pricing upon private application</span>
              </div>
              <button
                onClick={() => onInquire(artifact)}
                className="w-full sm:w-auto px-6 py-3 text-xs uppercase tracking-widest font-bold bg-[#2C2C2C] hover:bg-[#B8860B] text-[#F5F3EF] hover:text-[#2C2C2C] transition-all duration-300 rounded-sm flex items-center justify-center gap-2 shadow-sm"
              >
                Inquire Acquisition <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
