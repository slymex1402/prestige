import React from 'react';

interface LogoProps {
  className?: string;
  variant?: 'light' | 'dark' | 'gold';
  showText?: boolean;
  size?: 'sm' | 'md' | 'lg';
  orientation?: 'horizontal' | 'vertical';
}

export default function Logo({
  className = '',
  variant = 'gold',
  showText = true,
  size = 'md',
  orientation = 'horizontal'
}: LogoProps) {
  // Determine color variables
  const colorPrimary = variant === 'dark' ? '#2C2C2C' : variant === 'light' ? '#E5E5E5' : '#B8860B';
  const colorSecondary = variant === 'dark' ? '#1A1A1A' : variant === 'light' ? '#F5F3EF' : '#D4AF37';
  
  const iconSize_px = size === 'sm' ? 36 : size === 'md' ? 48 : 72;

  const isVertical = orientation === 'vertical';

  return (
    <div
      id="prestige-logo-container"
      className={`flex select-none transition-all duration-300 ${
        isVertical ? 'flex-col items-center gap-2 text-center' : 'items-center gap-3'
      } ${className}`}
    >
      {/* Exquisite Hand-Crafted Classical Bust & Ornate Scrollwork Emblem */}
      <svg
        id="prestige-logo-svg"
        width={iconSize_px}
        height={iconSize_px}
        viewBox="0 0 100 100"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="transition-transform duration-500 hover:scale-[1.05]"
      >
        <defs>
          <linearGradient id="goldGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#8A6623" />
            <stop offset="30%" stopColor="#C5A059" />
            <stop offset="70%" stopColor="#D4AF37" />
            <stop offset="100%" stopColor="#B8860B" />
          </linearGradient>
        </defs>

        {/* Ornate Frame & Filigree (Classical Curls and Swirls) */}
        {/* Symmetrical Left Scroll */}
        <path
          d="M 50,68 C 36,68 24,62 20,50 C 17,40 21,30 28,30 C 33,30 35,35 34,40 C 32,46 25,48 24,42"
          stroke={variant === 'gold' ? 'url(#goldGradient)' : colorPrimary}
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M 28,30 C 24,20 32,12 40,15"
          stroke={variant === 'gold' ? 'url(#goldGradient)' : colorPrimary}
          strokeWidth="1.5"
          strokeLinecap="round"
        />
        
        {/* Symmetrical Right Scroll */}
        <path
          d="M 50,68 C 64,68 76,62 80,50 C 83,40 79,30 72,30 C 67,30 65,35 66,40 C 68,46 75,48 76,42"
          stroke={variant === 'gold' ? 'url(#goldGradient)' : colorPrimary}
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M 72,30 C 76,20 68,12 60,15"
          stroke={variant === 'gold' ? 'url(#goldGradient)' : colorPrimary}
          strokeWidth="1.5"
          strokeLinecap="round"
        />

        {/* Top Decorative Crown/Leaf-motif */}
        <path
          d="M 44,15 C 46,12 48,10 50,10 C 52,10 54,12 56,15"
          stroke={variant === 'gold' ? 'url(#goldGradient)' : colorPrimary}
          strokeWidth="1.5"
          strokeLinecap="round"
        />
        <circle cx="50" cy="8" r="1.5" fill={variant === 'gold' ? 'url(#goldGradient)' : colorPrimary} />

        {/* Outer Circular Medallion Ribbon Rim */}
        <circle
          cx="50"
          cy="42"
          r="22"
          stroke={variant === 'gold' ? 'url(#goldGradient)' : colorPrimary}
          strokeWidth="1"
          strokeDasharray="2 2"
        />
        <circle
          cx="50"
          cy="42"
          r="19"
          stroke={variant === 'gold' ? 'url(#goldGradient)' : colorPrimary}
          strokeWidth="1.25"
        />

        {/* Hand-Drawn Classical Greek Goddess Bust Profile inside Medallion */}
        {/* Hair Bun / Laurel wreath details */}
        <path
          d="M 46,31 C 47,30 49,29 51,29 C 55,29 57,32 57,35 C 57,37 55,40 51,41"
          stroke={variant === 'gold' ? 'url(#goldGradient)' : colorPrimary}
          strokeWidth="1.25"
          strokeLinecap="round"
        />
        {/* Classic Grecian Profile Silhouette (Forehead, Nose, Lips, Chin, Neck) */}
        <path
          d="M 49,29 C 48,32 48.2,35 48.5,37 C 48.7,38.2 46.5,39 46.8,40.5 C 47,41.2 48.5,41.5 48.5,42.5 C 48.5,43.2 47.7,43.8 48,44.5 C 48.5,45.5 49.5,45.8 50.5,45.2 C 51.5,44.5 51.8,46 51.8,47 M 49,42.5 C 50.5,42.8 51,43.5 50.5,44"
          stroke={variant === 'gold' ? 'url(#goldGradient)' : colorPrimary}
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        {/* Back Head & Braided Hair curls */}
        <path
          d="M 49,29 C 52,28 55,29 57,31 C 58,32 59.5,31 60,32 C 61,34 60,36 59,37 C 58.5,37.5 58.8,39 57.5,40 C 56,41 54.5,41 53,42"
          stroke={variant === 'gold' ? 'url(#goldGradient)' : colorPrimary}
          strokeWidth="1.25"
          strokeLinecap="round"
        />
        {/* Laurel Wreath band on locks */}
        <path
          d="M 52,30 L 54,34 M 55,31 L 57,35"
          stroke={variant === 'gold' ? 'url(#goldGradient)' : colorPrimary}
          strokeWidth="1.25"
        />
        {/* Elegant Neck and Toga Tunic Shoulder Drapery */}
        <path
          d="M 50.5,45.2 C 51.5,47.5 51,51 51,54 C 54,55 57,54 59,52 M 53,42 C 54.5,44.5 56.5,47 59,48 C 61,48.8 62,51 61.5,53.5 C 61,56 55,57.5 50,57 C 45,56.5 44.5,53 47,52"
          stroke={variant === 'gold' ? 'url(#goldGradient)' : colorPrimary}
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M 52,49 C 55,50 56,52 54.5,54.5"
          stroke={variant === 'gold' ? 'url(#goldGradient)' : colorPrimary}
          strokeWidth="1"
          strokeLinecap="round"
        />

        {/* Lower classical base support with ribbons */}
        <path
          d="M 40,65 L 60,65"
          stroke={variant === 'gold' ? 'url(#goldGradient)' : colorPrimary}
          strokeWidth="1.5"
          strokeLinecap="round"
        />
        <path
          d="M 43,68 C 47,71 53,71 57,68"
          stroke={variant === 'gold' ? 'url(#goldGradient)' : colorPrimary}
          strokeWidth="1.25"
          strokeLinecap="round"
        />
        <circle cx="50" cy="74" r="1.5" fill={variant === 'gold' ? 'url(#goldGradient)' : colorPrimary} />
      </svg>

      {/* Elegant Serif Wordmark */}
      {showText && (
        <div className={`flex flex-col ${isVertical ? 'items-center text-center' : 'items-start'}`}>
          <span
            className={`font-serif tracking-[0.2em] font-semibold transition-colors duration-300 ${
              size === 'sm' ? 'text-lg' : size === 'md' ? 'text-2xl' : 'text-4xl'
            } ${
              variant === 'dark'
                ? 'text-charcoal'
                : variant === 'light'
                ? 'text-white'
                : 'text-bronze'
            }`}
            style={{
              fontFamily: '"Cinzel", "Playfair Display", serif',
            }}
          >
            PRESTIGE ANTIQUITIES
          </span>
          <span
            className={`tracking-[0.15em] uppercase font-light leading-none ${
              size === 'sm' ? 'text-[8px]' : size === 'md' ? 'text-[10px]' : 'text-xs'
            } text-neutral-500`}
            style={{
              fontFamily: '"Inter", sans-serif',
            }}
          >
            Art • History • Passion
          </span>
        </div>
      )}
    </div>
  );
}
