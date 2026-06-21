import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Artifact } from '../types';
import { Compass, Eye, MailCheck } from 'lucide-react';

interface ArtifactCardProps {
  key?: string;
  artifact: Artifact;
  onSelect: () => void;
  onInquire: () => void;
}

export default function ArtifactCard({ artifact, onSelect, onInquire }: ArtifactCardProps) {
  const [imgSrc, setImgSrc] = useState(artifact.imageUrl);

  useEffect(() => {
    setImgSrc(artifact.imageUrl);
  }, [artifact.imageUrl]);

  return (
    <motion.div
      id={`artifact-card-${artifact.id}`}
      initial={{ opacity: 0, y: 70, scale: 0.96 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      whileHover={{ y: -10, scale: 1.015 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      className="group bg-[#F5F3EF] border border-[#2C2C2C]/10 flex flex-col overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-500 relative cursor-pointer"
      onClick={onSelect}
    >
      {/* Category Tag & Rarity Badge */}
      <div className="absolute top-4 left-4 z-10 flex flex-col gap-2">
        <span className="text-[9px] uppercase tracking-widest bg-[#2C2C2C] text-[#F5F3EF] px-2 py-1 font-sans font-medium">
          {artifact.category}
        </span>
        <span className="text-[9px] uppercase tracking-widest bg-[#B8860B] text-white px-2 py-1 font-sans font-semibold">
          {artifact.rarity}
        </span>
      </div>

      {/* Frame of the Image */}
      <div className="aspect-[4/3] overflow-hidden relative bg-neutral-900 border-b border-[#2C2C2C]/10">
        <img
          src={imgSrc || undefined}
          alt={artifact.title}
          className="w-full h-full object-cover object-center group-hover:scale-110 transition-transform duration-700 opacity-90 group-hover:opacity-100"
          referrerPolicy="no-referrer"
          onError={() => {
            // Guarantee that we don't display broken image placeholder if any of the urls fail
            if (artifact.category === 'glass') {
              setImgSrc('https://images.unsplash.com/photo-1565192647048-f997ded879f9?auto=format&fit=crop&w=800&q=80');
            } else {
              setImgSrc('https://images.unsplash.com/photo-1603132151631-0dc5ea90878e?auto=format&fit=crop&w=800&q=80');
            }
          }}
        />
        {/* Subtle Gradient Shadow */}
        <div className="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-end justify-center pb-3">
          <span className="flex items-center gap-1.5 text-white font-sans text-xs uppercase tracking-widest">
            <Eye className="w-3.5 h-3.5" /> View Curatorial Sheet
          </span>
        </div>
      </div>

      {/* Museum Style Label Text */}
      <div className="p-6 flex-1 flex flex-col justify-between">
        <div>
          {/* Era / Origin */}
          <span className="text-[10px] tracking-widest uppercase font-mono text-[#B8860B] font-semibold">
            {artifact.culture} • {artifact.date}
          </span>

          {/* Title */}
          <h3 className="font-serif mt-1 text-lg text-[#2C2C2C] group-hover:text-[#B8860B] transition-colors leading-snug duration-300">
            {artifact.title}
          </h3>

          {/* Material & Size */}
          <p className="text-neutral-500 mt-2 text-xs leading-relaxed font-sans flex items-center gap-1.5">
            <Compass className="w-3.5 h-3.5 flex-shrink-0 text-neutral-400" />
            <span className="truncate">{artifact.material}</span>
          </p>

          <p className="text-neutral-400 text-[11px] mt-1 font-sans">
            Dimensions: {artifact.dimensions.split('|')[0]}
          </p>
        </div>

        {/* Card Footer Actions */}
        <div className="mt-6 pt-4 border-t border-[#2C2C2C]/5 flex items-center justify-between">
          <button
            onClick={(e) => {
              e.stopPropagation();
              onSelect();
            }}
            className="text-xs uppercase tracking-widest font-sans font-bold hover:text-[#B8860B] text-[#2C2C2C] transition-colors"
          >
            Details
          </button>

          <button
            onClick={(e) => {
              e.stopPropagation();
              onInquire();
            }}
            className="flex items-center gap-1 bg-[#2C2C2C] hover:bg-[#B8860B] text-[#F5F3EF] hover:text-[#2C2C2C] rounded-sm px-3.5 py-1.5 text-[10px] font-sans uppercase font-bold tracking-widest transition-all duration-300 shadow-sm"
          >
            <MailCheck className="w-3 h-3" /> Inquire
          </button>
        </div>
      </div>
    </motion.div>
  );
}
