import React, { useState, useMemo, useRef } from 'react';
import { ART_ITEMS } from '../data/artifacts';
import ArtifactCard from './ArtifactCard';
import { Artifact } from '../types';
import { SlidersHorizontal, Grid3X3, RefreshCw, Trophy, Sparkles, ChevronDown } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface ArtifactGalleryProps {
  onSelectArtifact: (artifact: Artifact) => void;
  onInquireArtifact: (artifact: Artifact) => void;
  searchQuery: string;
}

type GlassCategory = 'all' | 'Lalique' | 'Tiffany' | 'Murano' | 'Bohemian';
type SculptureCategory = 'all' | 'Bronze' | 'Marble' | 'Wood' | 'Modern';
type OtherCategory = 'all' | 'pottery' | 'bronze' | 'coin' | 'jewelry';
type RaritySort = 'default' | 'age-asc' | 'age-desc' | 'rarity-high';

export default function ArtifactGallery({
  onSelectArtifact,
  onInquireArtifact,
  searchQuery
}: ArtifactGalleryProps) {
  // Filters
  const [glassFilter, setGlassFilter] = useState<GlassCategory>('all');
  const [sculptureFilter, setSculptureFilter] = useState<SculptureCategory>('all');
  const [otherCategory, setOtherCategory] = useState<OtherCategory>('all');
  const [activeSort, setActiveSort] = useState<RaritySort>('default');
  
  // Expand section for more categories
  const [isExpanded, setIsExpanded] = useState(false);
  const otherSectionRef = useRef<HTMLDivElement>(null);

  // Helper to resolve dynamically defined subcategories for sculptures
  const getSculptureSubCategory = (item: Artifact): string => {
    if (item.subCategory) return item.subCategory;
    const mat = item.material.toLowerCase();
    const desc = item.description.toLowerCase();
    const title = item.title.toLowerCase();
    
    if (mat.includes('bronze') || desc.includes('bronze') || title.includes('bronze')) {
      return 'Bronze';
    }
    if (mat.includes('wood') || desc.includes('wood') || title.includes('wood')) {
      return 'Wood';
    }
    if (
      title.includes('neoclassical') || 
      desc.includes('neoclassical') || 
      item.date.includes('1820') || 
      item.date.includes('1795') || 
      item.date.includes('18th Century') ||
      item.date.includes('Contour')
    ) {
      return 'Modern';
    }
    return 'Marble';
  };

  // Glass items filter
  const glassItems = useMemo(() => {
    let list = ART_ITEMS.filter((item) => item.category === 'glass');
    if (glassFilter !== 'all') {
      list = list.filter((item) => item.subCategory === glassFilter);
    }
    return list;
  }, [glassFilter]);

  // Sculpture items filter
  const sculptureItems = useMemo(() => {
    let list = ART_ITEMS.filter((item) => item.category === 'sculpture');
    if (sculptureFilter !== 'all') {
      list = list.filter((item) => {
        const sub = getSculptureSubCategory(item);
        return sub.toLowerCase() === sculptureFilter.toLowerCase();
      });
    }
    return list;
  }, [sculptureFilter]);

  // Combined Other Classical collections (pottery, bronze, coin, jewelry)
  const otherItems = useMemo(() => {
    let list = ART_ITEMS.filter(
      (item) => item.category !== 'glass' && item.category !== 'sculpture'
    );
    
    if (otherCategory !== 'all') {
      list = list.filter((item) => item.category === otherCategory);
    }

    // Sort selection
    if (activeSort === 'age-asc') {
      list.sort((a, b) => {
        const aIsBC = a.date.includes('BC');
        const bIsBC = b.date.includes('BC');
        if (aIsBC && !bIsBC) return -1;
        if (!aIsBC && bIsBC) return 1;
        const aVal = parseInt(a.date.replace(/[^0-9]/g, '')) || 0;
        const bVal = parseInt(b.date.replace(/[^0-9]/g, '')) || 0;
        if (aIsBC && bIsBC) return bVal - aVal;
        return aVal - bVal;
      });
    } else if (activeSort === 'age-desc') {
      list.sort((a, b) => {
        const aIsBC = a.date.includes('BC');
        const bIsBC = b.date.includes('BC');
        if (aIsBC && !bIsBC) return 1;
        if (!aIsBC && bIsBC) return -1;
        const aVal = parseInt(a.date.replace(/[^0-9]/g, '')) || 0;
        const bVal = parseInt(b.date.replace(/[^0-9]/g, '')) || 0;
        if (aIsBC && bIsBC) return aVal - bVal;
        return bVal - aVal;
      });
    } else if (activeSort === 'rarity-high') {
      const order = { Unique: 4, Exceptionnel: 3, 'Très Rare': 2, Rare: 1 };
      list.sort((a, b) => (order[b.rarity] || 0) - (order[a.rarity] || 0));
    }

    return list;
  }, [otherCategory, activeSort]);

  // Integrated Search Query Results Across All Items
  const searchResults = useMemo(() => {
    if (!searchQuery.trim()) return [];
    const q = searchQuery.toLowerCase();
    return ART_ITEMS.filter(
      (item) =>
        item.title.toLowerCase().includes(q) ||
        item.category.toLowerCase().includes(q) ||
        (item.subCategory && item.subCategory.toLowerCase().includes(q)) ||
        item.material.toLowerCase().includes(q) ||
        item.culture.toLowerCase().includes(q) ||
        item.description.toLowerCase().includes(q) ||
        item.date.toLowerCase().includes(q)
    );
  }, [searchQuery]);

  const handleResetFilters = () => {
    setGlassFilter('all');
    setSculptureFilter('all');
    setOtherCategory('all');
    setActiveSort('default');
    setIsExpanded(false);
  };

  const handleExpandMore = () => {
    setIsExpanded(true);
    setTimeout(() => {
      otherSectionRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 150);
  };

  return (
    <div id="gallery-section" className="bg-[#FAF9F6] text-neutral-800 py-16 md:py-24 border-b border-neutral-100">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        
        {/* If Search query is active - show Unified Search Results Page */}
        {searchQuery.trim() !== '' ? (
          <div>
            <div className="text-center max-w-3xl mx-auto mb-12">
              <span className="text-[#B8860B] tracking-[0.25em] text-xs font-sans uppercase font-bold block mb-3">
                Curation Index Search
              </span>
              <h2 className="text-3xl md:text-5xl font-serif text-neutral-950 tracking-wide">
                Archive Search Results
              </h2>
              <div className="w-16 h-[3px] bg-[#B8860B] mx-auto mt-4 mb-6 rounded-full"></div>
              <p className="text-sm text-neutral-500 font-sans leading-relaxed">
                Vault results matching your current catalog query: <strong className="text-neutral-900">"{searchQuery}"</strong>
              </p>
            </div>

            {/* Sorter Selector for Search */}
            <div className="flex items-center justify-between border-b border-neutral-200/60 pb-4 mb-8">
              <span className="text-xs text-neutral-500 font-sans">
                Found <strong className="text-neutral-800">{searchResults.length}</strong> matching masterworks
              </span>
              <div className="flex items-center gap-3">
                <SlidersHorizontal className="w-4 h-4 text-[#B8860B]" />
                <select
                  value={activeSort}
                  onChange={(e) => setActiveSort(e.target.value as RaritySort)}
                  className="bg-white border border-neutral-200 text-neutral-700 px-3 py-1.5 text-xs font-sans rounded-md focus:outline-none focus:border-[#B8860B]"
                >
                  <option value="default">Default Rank</option>
                  <option value="age-asc">Era: Oldest First</option>
                  <option value="age-desc">Era: Newest First</option>
                  <option value="rarity-high">Rarity: Ultimate Tier</option>
                </select>
              </div>
            </div>

            {/* Results Grid */}
            {searchResults.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {searchResults.map((item) => (
                  <ArtifactCard
                    key={item.id}
                    artifact={item}
                    onSelect={() => onSelectArtifact(item)}
                    onInquire={() => onInquireArtifact(item)}
                  />
                ))}
              </div>
            ) : (
              <div className="text-center py-20 border border-neutral-200/50 rounded-2xl max-w-xl mx-auto bg-neutral-50">
                <Sparkles className="w-12 h-12 text-[#B8860B] mx-auto mb-4 opacity-60" />
                <h3 className="font-serif text-lg text-neutral-900 mb-2">No Matching Artifacts</h3>
                <p className="text-xs text-neutral-500 font-sans max-w-sm mx-auto mb-6 leading-relaxed">
                  We could not find any fine art or glass objects matching your search criteria. Please review search criteria or try searching for major materials like "marble", "gold" or "crystal".
                </p>
                <button
                  onClick={handleResetFilters}
                  className="px-6 py-2.5 text-xs uppercase tracking-widest font-sans bg-[#B8860B] hover:bg-neutral-950 text-white transition-colors rounded-full font-medium"
                >
                  Show Full Collections
                </button>
              </div>
            )}
          </div>
        ) : (
          /* Normal View - Elegant segmented collection like in the video */
          <div className="space-y-24">
            
            {/* SECTION 1: Glass & Crystal */}
            <section id="category-glass-section">
              <div className="text-center max-w-3xl mx-auto mb-10">
                <h2 
                  className="text-4xl md:text-5xl font-serif text-neutral-950 tracking-wide font-normal"
                  style={{ fontFamily: '"Cinzel", "Playfair Display", serif' }}
                >
                  Glass & Crystal
                </h2>
                {/* Thick accent line underline */}
                <div className="w-16 h-[3.5px] bg-[#B8860B] mx-auto mt-4 mb-8 rounded-full"></div>
                
                {/* Pill Style Filter Switchees */}
                <div className="flex flex-wrap items-center justify-center gap-2 md:gap-3">
                  {(['all', 'Lalique', 'Tiffany', 'Murano', 'Bohemian'] as GlassCategory[]).map((tab) => (
                    <button
                      key={tab}
                      onClick={() => setGlassFilter(tab)}
                      className={`px-6 py-2 rounded-full text-sm font-sans font-medium tracking-wide transition-all duration-300 ${
                        glassFilter === tab
                          ? 'bg-[#B8860B] text-white shadow-md'
                          : 'bg-white text-neutral-700 border border-neutral-200/50 hover:border-[#B8860B]/40 hover:text-[#B8860B]'
                      }`}
                    >
                      {tab === 'all' ? 'All' : tab}
                    </button>
                  ))}
                </div>
              </div>

              {/* Glass Artifacts Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {glassItems.map((item) => (
                  <ArtifactCard
                    key={item.id}
                    artifact={item}
                    onSelect={() => onSelectArtifact(item)}
                    onInquire={() => onInquireArtifact(item)}
                  />
                ))}
              </div>
            </section>

            {/* SECTION 2: Sculptures */}
            <section id="category-sculptures-section">
              <div className="text-center max-w-3xl mx-auto mb-10">
                <h2 
                  className="text-4xl md:text-5xl font-serif text-neutral-950 tracking-wide font-normal"
                  style={{ fontFamily: '"Cinzel", "Playfair Display", serif' }}
                >
                  Sculptures
                </h2>
                {/* Thick accent line underline */}
                <div className="w-16 h-[3.5px] bg-[#B8860B] mx-auto mt-4 mb-8 rounded-full"></div>
                
                {/* Pill Style Filter Switchees */}
                <div className="flex flex-wrap items-center justify-center gap-2 md:gap-3">
                  {(['all', 'Bronze', 'Marble', 'Wood', 'Modern'] as SculptureCategory[]).map((tab) => (
                    <button
                      key={tab}
                      onClick={() => setSculptureFilter(tab)}
                      className={`px-6 py-2 rounded-full text-sm font-sans font-medium tracking-wide transition-all duration-300 ${
                        sculptureFilter === tab
                          ? 'bg-[#B8860B] text-white shadow-md'
                          : 'bg-white text-neutral-700 border border-neutral-200/50 hover:border-[#B8860B]/40 hover:text-[#B8860B]'
                      }`}
                    >
                      {tab === 'all' ? 'All' : tab}
                    </button>
                  ))}
                </div>
              </div>

              {/* Sculpture Artifacts Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {sculptureItems.slice(0, 9).map((item) => (
                  <ArtifactCard
                    key={item.id}
                    artifact={item}
                    onSelect={() => onSelectArtifact(item)}
                    onInquire={() => onInquireArtifact(item)}
                  />
                ))}
              </div>
            </section>

            {/* Center Load More Button */}
            {!isExpanded && (
              <div className="text-center pt-8">
                <button
                  onClick={handleExpandMore}
                  className="group inline-flex items-center gap-2.5 px-8 py-4 bg-transparent border-2 border-neutral-800 hover:border-neutral-950 text-neutral-800 hover:text-neutral-950 text-xs font-semibold uppercase tracking-widest font-sans transition-all duration-300 rounded-full hover:bg-neutral-950/5 cursor-pointer shadow-sm hover:shadow"
                >
                  LOAD MORE PRESTIGE ANTIQUITIES
                  <ChevronDown className="w-4 h-4 transition-transform group-hover:translate-y-0.5 duration-300" />
                </button>
              </div>
            )}

            {/* SECTION 3: Other Fine Collections - Expandable on demand */}
            <AnimatePresence>
              {isExpanded && (
                <motion.section 
                  ref={otherSectionRef}
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.8, ease: 'easeInOut' }}
                  className="border-t border-neutral-200/60 pt-20 overflow-hidden"
                >
                  <div className="text-center max-w-3xl mx-auto mb-10">
                    <span className="text-[#B8860B] tracking-[0.25em] text-xs font-sans uppercase font-bold block mb-3">
                      Historical Treasures
                    </span>
                    <h2 
                      className="text-4xl md:text-5xl font-serif text-neutral-950 tracking-wide font-normal"
                      style={{ fontFamily: '"Cinzel", "Playfair Display", serif' }}
                    >
                      Pottery, Coinage, & Accessories
                    </h2>
                    <div className="w-16 h-[3.5px] bg-[#B8860B] mx-auto mt-4 mb-8 rounded-full"></div>
                    
                    {/* Category selectors */}
                    <div className="flex flex-wrap items-center justify-center gap-2 md:gap-3 mb-8">
                      {([
                        { label: 'All Rarities', value: 'all' },
                        { label: 'Noble Pottery', value: 'pottery' },
                        { label: 'Ancient Bronzes', value: 'bronze' },
                        { label: 'Golden Coinage', value: 'coin' },
                        { label: 'Classic Accessories', value: 'jewelry' },
                      ] as { label: string; value: OtherCategory }[]).map((cat) => (
                        <button
                          key={cat.value}
                          onClick={() => setOtherCategory(cat.value)}
                          className={`px-5 py-2.5 rounded-full text-xs uppercase tracking-widest font-sans font-semibold transition-all duration-300 ${
                            otherCategory === cat.value
                              ? 'bg-[#B8860B] text-white shadow-md'
                              : 'bg-white text-neutral-600 border border-neutral-200/50 hover:border-[#B8860B]/40 hover:text-[#B8860B]'
                          }`}
                        >
                          {cat.label}
                        </button>
                      ))}
                    </div>

                    {/* Sorter Selector */}
                    <div className="flex items-center gap-2 justify-center text-neutral-500 text-xs font-sans mb-12">
                      <SlidersHorizontal className="w-3.5 h-3.5 text-[#B8860B]" />
                      <span className="uppercase tracking-widest font-semibold mr-2">Sort Era:</span>
                      <select
                        value={activeSort}
                        onChange={(e) => setActiveSort(e.target.value as RaritySort)}
                        className="bg-white border border-neutral-200 text-neutral-700 px-3 py-1.5 text-xs font-sans rounded-md focus:outline-none focus:border-[#B8860B]"
                      >
                        <option value="default">Default Catalog Rank</option>
                        <option value="age-asc">Era: Oldest First</option>
                        <option value="age-desc">Era: Newest First</option>
                        <option value="rarity-high">Rarity: Ultimate Tier</option>
                      </select>
                    </div>
                  </div>

                  {/* Other Artifacts Grid */}
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {otherItems.map((item) => (
                      <ArtifactCard
                        key={item.id}
                        artifact={item}
                        onSelect={() => onSelectArtifact(item)}
                        onInquire={() => onInquireArtifact(item)}
                      />
                    ))}
                  </div>
                </motion.section>
              )}
            </AnimatePresence>

          </div>
        )}

        {/* Authenticity Certificate Guarantee Sticker */}
        <div className="mt-28 p-8 bg-gradient-to-r from-stone-900 to-[#2C2C2C] border border-[#B8860B]/25 flex flex-col md:flex-row items-center justify-between gap-6 shadow-xl rounded-2xl leading-relaxed text-white">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-full border border-[#B8860B]/40 flex items-center justify-center flex-shrink-0 bg-black/40">
              <span className="font-serif font-black text-xl text-[#B8860B]">P•A</span>
            </div>
            <div>
              <h4 className="font-serif text-white font-medium text-base tracking-wide uppercase">The Prestige Antiquities Authenticity Seal</h4>
              <p className="text-stone-300 text-xs mt-1 max-w-xl">
                Every acquired antiquity is delivered with a notarized, physical catalog raisonné booklet containing detailed scientific material examination reports, expert provenance history dossiers, and international legal clearance certificates.
              </p>
            </div>
          </div>
          <button
            onClick={() => {
              const el = document.getElementById('about-section');
              if (el) el.scrollIntoView({ behavior: 'smooth' });
            }}
            className="px-6 py-3 border border-[#B8860B] text-[#B8860B] hover:bg-[#B8860B] hover:text-white text-xs uppercase tracking-widest font-sans transition-all duration-300 shrink-0 rounded-full"
          >
            Read Our Curation Process
          </button>
        </div>

      </div>
    </div>
  );
}
