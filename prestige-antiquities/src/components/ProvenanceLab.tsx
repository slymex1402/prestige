/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  ShieldCheck, 
  Layers, 
  Activity, 
  FileText, 
  Download, 
  History, 
  Sparkles, 
  Search, 
  ChevronRight, 
  Maximize2, 
  Award, 
  Cpu, 
  CheckCircle,
  Clock,
  ExternalLink
} from 'lucide-react';
import { ART_ITEMS } from '../data/artifacts';
import { Artifact } from '../types';

// Let's expand our artifacts with scientific hotspots and chronological journey records
interface LabDetails {
  id: string;
  certificateNo: string;
  chemicalFormula: string;
  conservationStatus: string;
  carbonIsotope?: string;
  microstructure: string;
  spectralSignature: string;
  hotspots: {
    id: string;
    label: string;
    x: number; // percentage from left
    y: number; // percentage from top
    testMethod: string;
    result: string;
    finding: string;
  }[];
  timeline: {
    era: string;
    date: string;
    title: string;
    location: string;
    description: string;
  }[];
}

const LAB_DATA: Record<string, LabDetails> = {
  'marcus-aurelius': {
    id: 'marcus-aurelius',
    certificateNo: 'PA-MURE-940A',
    chemicalFormula: 'CaCO3 (Calcium Carbonate > 99.2%)',
    conservationStatus: 'Excellent, stable, fully conserved (no modern fillers)',
    carbonIsotope: 'δ13C = +2.43‰, δ18O = -1.82‰ (Luni/Carrara Signature)',
    microstructure: 'Maximum grain size (MGS) 0.8mm, characteristic of luxury Carrara marble',
    spectralSignature: 'UV Luminescence: Normal orange-white (indicates ancient original carving)',
    hotspots: [
      {
        id: 'hair-drill',
        label: 'Hair drill-work',
        x: 48,
        y: 28,
        testMethod: 'Stereomicroscopic tool-mark analysis',
        result: 'Characteristic of running-drill tracks',
        finding: 'The deep negative curls display typical Roman imperial running-drill friction grooves and mineralized dust consistent only with late 2nd Century AD techniques.'
      },
      {
        id: 'marble-base',
        label: 'Carrara Marble base',
        x: 52,
        y: 85,
        testMethod: 'Isotopic mass-spectrometry & carbon testing',
        result: 'Confirmed Luni ancient Carrara quarry origin',
        finding: 'Calcite powder isotopic signature ties directly to the imperial stratum of the northern Apennine quarries worked during the reigns of Trajan through Marcus Aurelius.'
      },
      {
        id: 'eyes-carving',
        label: 'Pupil incisions',
        x: 44,
        y: 20,
        testMethod: 'Digital depth laser topography scanning',
        result: 'Incised dual-contour crescent pupils',
        finding: 'The heavy-lidded pupils display a hand-engraved crescent contour, characteristic of portraiture from the Antonine golden age. Zero modern mechanical toolmarks found.'
      }
    ],
    timeline: [
      {
        era: 'Antiquity',
        date: 'c. 175–180 AD',
        title: 'Imperial Sculptor\'s Guild',
        location: 'Rome, Italy',
        description: 'Carved by an elite imperial sculptor, likely matching portrait series commissioned immediately following the Marcomannic Wars to celebrate the Emperor\'s Stoic reserve.'
      },
      {
        era: 'Rediscovery',
        date: '1892',
        title: 'Tivoli Sub-Surface Excavation',
        location: 'Tivoli, Italy',
        description: 'Uncovered during agricultural drainage work near the ruins of a private patrician country estate in Tivoli. Registered in the regional archaeological bulletin.'
      },
      {
        era: 'Ownership Transfer',
        date: '1952',
        title: 'Marlborough Collection Transfer',
        location: 'Oxfordshire, UK to Naples',
        description: 'Transferred from the English Marlborough dukedom at Blenheim Palace to the renowned collection of Marquis Giuseppe di Sangro in Naples.'
      },
      {
        era: 'Vetting',
        date: '1985',
        title: 'Prestige Antiquities Scientific Cleared',
        location: 'Rome Gallery Lab',
        description: 'Acquired by Prestige Antiquities trustees. Subjected to extensive isotope verification, mineralized patina checks, and registered under permanent legal compliance.'
      }
    ]
  },
  'corinthian-helmet': {
    id: 'corinthian-helmet',
    certificateNo: 'PA-CHLM-510B',
    chemicalFormula: 'Cu88-Sn11-Pb1 (Archaic Bronze composition)',
    conservationStatus: 'Conserved, stable oxide crustations (malachite/azurite)',
    microstructure: 'Fibrous grain deformation due to manual cold-hammer planishing',
    spectralSignature: 'XRF Element Scan: 88.2% Copper, 11.1% Tin, 0.4% Lead, 0.3% Trace Silver',
    hotspots: [
      {
        id: 'alloy-spectroscopy',
        label: 'Alloy Composition',
        x: 50,
        y: 15,
        testMethod: 'X-Ray Fluorescence (XRF) Spectroscopy',
        result: '88% Cu, 11% Sn classic antique bronze alloy',
        finding: 'Zero zinc or trace elements of modern scrap alloys. The ratio of tin to copper represents the ideal metallurgical recipe of 6th-century Classical Greek foundries.'
      },
      {
        id: 'patina-structure',
        label: 'Mineral Patina Crust',
        x: 72,
        y: 45,
        testMethod: 'X-Ray Diffraction (XRD) mineral analysis',
        result: 'Natural layered Malachite & Cuprite layers',
        finding: 'Sub-surface layers consist of natural cuprite, covered by outer needle-like crystallizations of malachite. This complex bilayer takes at least 1,500 years of burial to naturally form.'
      },
      {
        id: 'eye-cut',
        label: 'Anatomical Eye Slit',
        x: 40,
        y: 60,
        testMethod: 'Microscopic mechanical wear assessment',
        result: 'Chiseled and filed beveled edge',
        finding: 'Micro-bevel cuts on eye openings show manual filing from ancient iron-works. Adhering biological mineral traces suggest helmet was actively fielded.'
      }
    ],
    timeline: [
      {
        era: 'Forge',
        date: 'c. 520 BC',
        title: 'Archaic Corinthian Foundry',
        location: 'Corinth, Greece',
        description: 'Forged from a single bronze ingot. Hammered over iron stakes into an ergonomic protective dome. Issued to an elite Corinthian hoplite.'
      },
      {
        era: 'Lost in Sea',
        date: 'c. 480 BC',
        title: 'Naval Ionian Deposition',
        location: 'Off Paxos Island',
        description: 'Deposited into the high-salinity bed of the Ionian Sea, likely following an unrecorded classic trireme skirmish or coastal storm.'
      },
      {
        era: 'Excavation',
        date: '1934',
        title: 'Sponge Diver Discovery',
        location: 'Ionian Sea Coast',
        description: 'Recovered fully intact by sponge divers from a depth of 42 meters. Retained in regional maritime cabinets before entering Munich private trade.'
      },
      {
        era: 'Curation',
        date: '2014',
        title: 'Prestige Antiquities Acquisition & Stabilisation',
        location: 'Geneva Labs',
        description: 'Exposed to low-humidity stabilization chambers at Prestige Antiquities partner laboratories to stop chloride active oxidation, ensuring permanent bronze preservation.'
      }
    ]
  },
  'apollo-thasos': {
    id: 'apollo-thasos',
    certificateNo: 'PA-APOL-350C',
    chemicalFormula: 'CaCO3 with accessory Dolomite traces',
    conservationStatus: 'Excellent, clean un-restored state',
    microstructure: 'Large interlocking calcite crystals (typical Thasian quarry)',
    spectralSignature: 'UV Luminescence: Pale amber (indicating original ancient marble crust)',
    hotspots: [
      {
        id: 'marble-veining',
        label: 'Thasian marble grain',
        x: 55,
        y: 50,
        testMethod: 'Petrographic microscopic mineral thin-section study',
        result: 'Coarse-grain white dolomite marble',
        finding: 'Confirms extraction from Cape Vathy, Thasos. Calcite grain boundaries show ancient structural relaxation, completely rules out modern high-speed diamond sawing.'
      },
      {
        id: 'hair-crevices',
        label: 'Hair Crevice Soil Residues',
        x: 65,
        y: 25,
        testMethod: 'Gas chromatography-mass spectrometry (GC-MS)',
        result: 'Complex clay silicates with pine-tar traces',
        finding: 'Soil residues in the deep curls contain ancient organic compounds, likely traces of ceremonial oils and Anatolian forest terra-rossa soils indicating historic burial characteristics.'
      },
      {
        id: 'weathering-patina',
        label: 'Calcite Weathering Skin',
        x: 35,
        y: 35,
        testMethod: 'Scanning Electron Microscopy (SEM)',
        result: '150-micron thick calcium carbonate dissolution',
        finding: 'Micro-karstic dissolution features on the cheeks prove exposure to rainwater and acidic soils prior to antique burial. This natural weathering skin cannot be artificial.'
      }
    ],
    timeline: [
      {
        era: 'Carving',
        date: 'c. 300 BC',
        title: 'Hellenistic Master Workshop',
        location: 'Thasos/Western Anatolia',
        description: 'Sculpted by an expert workshop demonstrating key transition traits from high Classical styles into dramatic, lyrical Hellenistic naturalism.'
      },
      {
        era: 'Rediscovery',
        date: 'Early 1900s',
        title: 'Miletus Sub-Level Excavation',
        location: 'Miletus, Anatolia',
        description: 'Recovered by local excavation teams in ruins near Miletus. Kept in Smyrna-area private collections, then transported legally to Paris.'
      },
      {
        era: 'Acquirement',
        date: '1968',
        title: 'Jean-Marie Rossi Collection',
        location: 'Paris, France',
        description: 'Transferred into the inventory of premium antiquarian Jean-Marie Rossi, documented in high-profile French academic monographs.'
      },
      {
        era: 'Cataloging',
        date: '2003',
        title: 'Prestige Antiquities Scientific Registration',
        location: 'Rome Gallery',
        description: 'Passed to Prestige Antiquities portfolio. Cleared under international heritage registers, complete with complete digital provenance passport.'
      }
    ]
  },
  'red-figure-amphora': {
    id: 'red-figure-amphora',
    certificateNo: 'PA-AMPH-500D',
    chemicalFormula: 'Al2Si2O5(OH)4 (Iron-rich Athenian Red Clay)',
    conservationStatus: 'Assembled from ancient original sherds, minimal over-painting',
    microstructure: 'Sintered clay platelets, aligned from hand-wheel spinning',
    spectralSignature: 'UV analysis: Identifies minor restoration seams. Original pottery makes up 97.4%',
    hotspots: [
      {
        id: 'clay-matrix',
        label: 'Athenian clay body',
        x: 48,
        y: 85,
        testMethod: 'Thermoluminescence (TL) Dating Analysis',
        result: 'Clay fired 2,520 years ago (± 120 years)',
        finding: 'Dating report ref: TL-8910 certifies the last high-temperature kiln firing occurred around 510 BC, matching perfectly with stylistic Attic date attributions.'
      },
      {
        id: 'black-slip',
        label: 'Iron Oxide Black Slip',
        x: 32,
        y: 48,
        testMethod: 'Mössbauer Spectroscopy',
        result: 'Triple-stage kiln oxidation-reduction signature',
        finding: 'Chemical analysis confirms slip was applied in fluid state using iron-rich liquid clay, heated during three-step firing (oxidizing, reducing, re-oxidizing). Authentic Athenian process.'
      },
      {
        id: 'slip-border',
        label: 'Pioneer-Group reserve line',
        x: 54,
        y: 35,
        testMethod: 'Macro-lens topographic stylus trace',
        result: 'Adhering continuous high relief line',
        finding: 'Reserve outlines display the prominent extruded relief-line, matching the stylistic execution of Phintias or Euthymides (Pioneer painters). Hand-drawn outline.'
      }
    ],
    timeline: [
      {
        era: 'Fired',
        date: 'c. 510–500 BC',
        title: 'Kerameikos Potters\' Atelier',
        location: 'Athens, Greece',
        description: 'Produced by an elite Athenian potter and decorated by a premier Pioneer Group painter. Traced to major export shipments heading west.'
      },
      {
        era: 'Etruscan Tomb',
        date: 'c. 490 BC',
        title: 'Burial Placement (Etruria)',
        location: 'Vulci, Italy',
        description: 'Acquired by a wealthy Etruscan merchant and placed as an elite funerary offering inside a chamber tomb, protecting the vessel from natural weathering for millennia.'
      },
      {
        era: 'Unveiling',
        date: '1845',
        title: 'Marquess of Northampton Acquisition',
        location: 'Vulci, Tuscany',
        description: 'Discovered during the famous tomb clears in Vulci. Obtained by Spencer Compton (2nd Marquess of Northampton) and displayed at Castle Ashby.'
      },
      {
        era: 'Modern Dossier',
        date: '1999',
        title: 'Prestige Antiquities Curatorial Entry',
        location: 'London & Rome Labs',
        description: 'Acquired at prestigious public auction in London. Re-examined under digital binocular scanners to verify absolute integrity of all painted panels.'
      }
    ]
  },
  'hadrian-aureus': {
    id: 'hadrian-aureus',
    certificateNo: 'PA-COIN-118E',
    chemicalFormula: 'Au (Gold > 98.48%), Ag1.2%, Cu0.32%',
    conservationStatus: 'About Uncirculated (AU) grade, superb strike luster',
    microstructure: 'Metal flow lines radiating outward from high-pressure cold strike',
    spectralSignature: 'Spectroscopy: 98.5% Pure Gold, zero modern silver-solder contaminants',
    hotspots: [
      {
        id: 'mintmark',
        label: 'Rome Mintmark & Portrait Detail',
        x: 50,
        y: 40,
        testMethod: 'Optical metallographic microscopic scan (500x)',
        result: 'Die flow-lines radiating to margins',
        finding: 'Obverse exhibits concentric metal stress-flow lines from hand-carved Roman imperial die strikes. Portrait matches master die registers for early Hadrianic issues.'
      },
      {
        id: 'alloy-composition-gold',
        label: 'High Purity Alloy Base',
        x: 35,
        y: 30,
        testMethod: 'Helium pycnometer density + XRF testing',
        result: '98.5% Pure Gold (23.6 Carat)',
        finding: 'Specific density and surface chemical readings verify gold content matches the precise, un-debased minting decrees of Hadrian\'s second consulship.'
      },
      {
        id: 'edge-integrity',
        label: 'Edge Rim & Weight',
        x: 65,
        y: 50,
        testMethod: 'Ultra-precision laboratory mass-balance',
        result: 'Mass: 7.32 grams, perfectly conforming',
        finding: 'Weight conforms exactly to Roman imperial Aurei standard (approx. 7.3g). Pristine edge rim proves coin was not clipped or shaved in antiquity.'
      }
    ],
    timeline: [
      {
        era: 'Strike',
        date: 'c. 118 AD',
        title: 'Central Roman Mint',
        location: 'Rome, Italy',
        description: 'Struck by imperial mint workers immediately celebrating Hadrian\'s consolidation of imperial borders and dedication of concord.'
      },
      {
        era: 'Vesuvius Hoard',
        date: 'c. 130 AD',
        title: 'Boscoreale Villa Deposit',
        location: 'Boscoreale, Italy',
        description: 'Part of a large elite household treasure, cached inside a bronze vessel beneath floors of a countryside villa just outside buried Pompeii.'
      },
      {
        era: 'Discovery',
        date: '1895',
        title: 'Boscoreale Excavation Discovery',
        location: 'Boscoreale, Italy',
        description: 'Uncovered during archaeological ruins clearances. Part of the legendary "Boscoreale Hoard" that sparked high luxury auctions in Paris.'
      },
      {
        era: 'Dossier Vetting',
        date: '1991',
        title: 'Prestige Antiquities Numismatic Clearance',
        location: 'Geneva / Rome Lab',
        description: 'Acquired from deep Swiss numismatic collections, legally documented with provenance certificates extending back to Paris 1902.'
      }
    ]
  },
  'hellenistic-diadem': {
    id: 'hellenistic-diadem',
    certificateNo: 'PA-DIAD-320F',
    chemicalFormula: 'Au (Pure Gold Sheet, thickness 0.12-0.22mm)',
    conservationStatus: 'Extremely fragile, stable, custom mounted of non-reactive silicon',
    microstructure: 'Repoussé deformation, manual shear-cuts on leaf stems',
    spectralSignature: 'Trace Element Lead Testing: Absolute zero presence of modern electroplating',
    hotspots: [
      {
        id: 'gold-leaves',
        label: 'Laurel Foil Leaves',
        x: 48,
        y: 45,
        testMethod: 'Scanning Electron Microscopy (SEM) / Imaging',
        result: '0.15mm thick hand-beaten gold sheet foil',
        finding: 'Foil sheet exhibits distinct microscopic striations, pointing to mechanical bronze-hammer beating on leather sheets. Leaf edge shears show ancient hand cuts.'
      },
      {
        id: 'wire-stems',
        label: 'Gold filigree wire joints',
        x: 35,
        y: 65,
        testMethod: 'High-res radiographic joints scan',
        result: 'Ancient mechanically twisted wire loops',
        finding: 'Zero modern chemical flux or electrical solder detected. All delicate wire joints are joined via mechanical twist-locks and low-temperature local forge diffusion.'
      },
      {
        id: 'berries',
        label: 'Embossed Gold Berries',
        x: 62,
        y: 35,
        testMethod: 'Macro mechanical molding analysis',
        result: 'Formed using ancient repoussé lead molds',
        finding: 'The hemispherical berries were pressed on soft wood or lead molds-indicates standard Hellenistic goldsmithing techniques. Inside of hollows has ancient micro-debris.'
      }
    ],
    timeline: [
      {
        era: 'Gilding',
        date: 'c. Late 4th Century BC',
        title: 'Royal Macedonian Goldsmiths',
        location: 'Thessaloniki/Beroia',
        description: 'Commissioned from an elite royal goldsmithing workshop, likely as a ceremonial funerary crown for a Macedonian general or aristocratic princess.'
      },
      {
        era: 'Tombal Rest',
        date: 'c. 300 BC',
        title: 'Royal Tholos Vault Interment',
        location: 'Veroia, Greece',
        description: 'Interred inside an elite chamber tomb, resting within high bronze vessels which preserved the delicate gold sheets from structural collapse.'
      },
      {
        era: 'Discovery',
        date: '1912',
        title: 'Archaeological Excavation clear',
        location: 'Northern Greece',
        description: 'Excavated under archaeological supervision post-Balkan expansion. Transferred under historical registers into German private noble collections.'
      },
      {
        era: 'Curation',
        date: '1997',
        title: 'Prestige Antiquities Purchase & Mounting',
        location: 'Geneva Vaults',
        description: 'Acquired at Christie\'s Geneva collection auction. Subjected to extensive SEM verification and mounted on a specialized air-cushioned museum-display frame.'
      }
    ]
  }
};

export default function ProvenanceLab() {
  const [selectedId, setSelectedId] = useState<string>('marcus-aurelius');
  const [activeHotspot, setActiveHotspot] = useState<string>('hair-drill');
  const [timelineIndex, setTimelineIndex] = useState<number>(3);
  const [customCertQuery, setCustomCertQuery] = useState<string>('');
  const [searchFeedback, setSearchFeedback] = useState<string>('');
  const [isScanning, setIsScanning] = useState<boolean>(false);
  const [certValidating, setCertValidating] = useState<boolean>(false);
  const [certVerifiedData, setCertVerifiedData] = useState<Artifact | null>(null);
  
  // Hologram 3D mouse parallax effect
  const [rotateX, setRotateX] = useState<number>(0);
  const [rotateY, setRotateY] = useState<number>(0);
  const coaRef = useRef<HTMLDivElement>(null);

  const activeArtifact = ART_ITEMS.find(item => item.id === selectedId) || ART_ITEMS[0];
  const activeLab = LAB_DATA[selectedId] || LAB_DATA['marcus-aurelius'];

  // Handle auto loading first hotspot on item change
  useEffect(() => {
    if (activeLab && activeLab.hotspots.length > 0) {
      setActiveHotspot(activeLab.hotspots[0].id);
    }
    setTimelineIndex(3); // Reset timeline to the curation era
  }, [selectedId]);

  // Handle custom certificate lookup
  const handleCertSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customCertQuery.trim()) return;

    setCertValidating(true);
    setSearchFeedback('');
    setCertVerifiedData(null);

    // Simulate database lookup
    setTimeout(() => {
      const cleanQuery = customCertQuery.toUpperCase().trim();
      
      // Match query by checking ID or cert no
      const foundMatch = Object.values(LAB_DATA).find(
        lab => lab.certificateNo === cleanQuery || 
               lab.id.toUpperCase().includes(cleanQuery) ||
               cleanQuery.includes(lab.id.toUpperCase().slice(0, 4))
      );

      setCertValidating(false);
      if (foundMatch) {
        setSelectedId(foundMatch.id);
        const art = ART_ITEMS.find(item => item.id === foundMatch.id);
        if (art) {
          setCertVerifiedData(art);
          setSearchFeedback(`Certificate verified successfully. Loaded Masterwork Dossier: ${art.title}`);
        }
      } else {
        setSearchFeedback('No matching archive crypt-certificate found. Please check certificate ID (e.g. PA-MURE-940A, PA-CHLM-510B).');
      }
    }, 1200);
  };

  // Trigger high tech scanning simulation on switching artifacts
  const handleSelectArtifact = (id: string) => {
    setIsScanning(true);
    setSelectedId(id);
    setCertVerifiedData(null);
    setSearchFeedback('');
    
    setTimeout(() => {
      setIsScanning(false);
    }, 1000);
  };

  // Hologram tilt effect
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!coaRef.current) return;
    const rect = coaRef.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left - width / 2;
    const mouseY = e.clientY - rect.top - height / 2;
    
    // Max rotation 12deg
    const rX = -(mouseY / (height / 2)) * 10;
    const rY = (mouseX / (width / 2)) * 10;

    setRotateX(rX);
    setRotateY(rY);
  };

  const handleMouseLeave = () => {
    setRotateX(0);
    setRotateY(0);
  };

  // Generate cryptographic-looking hash based on artifact
  const generateHash = (id: string) => {
    let result = '';
    const chars = 'ABCDEF0123456789';
    const seed = id.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
    for (let i = 0; i < 40; i++) {
      const index = (seed + i * 7) % chars.length;
      result += chars[index];
    }
    return `SHA256:${result.slice(0, 8)}...${result.slice(-8)}`;
  };

  const currentHotspotData = activeLab.hotspots.find(hs => hs.id === activeHotspot) || activeLab.hotspots[0];
  const activeTimelinePoint = activeLab.timeline[timelineIndex];

  return (
    <div className="bg-[#1A1A1A] text-[#F5F3EF] min-h-screen pb-20 pt-8 selection:bg-[#B8860B] selection:text-[#1A1A1A]">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        
        {/* Lab Header */}
        <div className="border-b border-neutral-800 pb-8 mb-12 flex flex-col md:flex-row items-start md:items-end justify-between gap-6">
          <div className="text-left">
            <div className="flex items-center gap-2 mb-2 text-[#B8860B]">
              <Cpu className="w-4 h-4 animate-pulse" />
              <span className="font-sans text-[11px] font-bold uppercase tracking-[0.3em] block">
                Prestige Antiquities Conservation Lab & Archives
              </span>
            </div>
            <h1 
              className="text-3xl md:text-5xl font-serif tracking-wider"
              style={{ fontFamily: '"Cinzel", "Playfair Display", serif' }}
            >
              Provenance Laboratory
            </h1>
            <p className="text-sm text-neutral-400 font-sans mt-2 max-w-xl leading-relaxed">
              Explore the advanced material diagnostics, historical verification, and certifiable archives corresponding to our peerless classical collections.
            </p>
          </div>

          {/* Quick Stats strip */}
          <div className="flex flex-wrap items-center gap-4 bg-black/30 border border-neutral-850 p-4 rounded-xs text-[11px] font-mono font-medium">
            <div className="flex items-center gap-1.5 text-neutral-400">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping shrink-0" />
              <span>Diagnostic System: <span className="text-emerald-400">Online</span></span>
            </div>
            <span className="hidden sm:block text-neutral-700">|</span>
            <div className="text-neutral-400">
              <span>Database Version: <span className="text-[#B8860B]">Classical-V3.82</span></span>
            </div>
            <span className="hidden sm:block text-neutral-700">|</span>
            <div className="text-neutral-400">
              <span>Authorized Personnel: <span className="text-white">Trustee Access Only</span></span>
            </div>
          </div>
        </div>

        {/* Master Panel Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* LEFT 5 COLS: Record Selector & Gilded Certificate of Authenticity */}
          <div className="lg:col-span-5 space-y-8 text-left">
            
            {/* Record Selector Card */}
            <div className="bg-black/20 border border-neutral-800 p-6 rounded-none relative">
              <h3 className="font-serif text-lg text-white mb-4 flex items-center gap-2">
                <Layers className="w-4 h-4 text-[#B8860B]" />
                <span>Select Antiquity File</span>
              </h3>
              
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
                {ART_ITEMS.map((item) => {
                  const isActive = item.id === selectedId;
                  return (
                    <button
                      key={item.id}
                      onClick={() => handleSelectArtifact(item.id)}
                      className={`p-3 text-left flex flex-col justify-between transition-all duration-300 border rounded-none uppercase text-[10px] ${
                        isActive
                          ? 'bg-[#B08A2E]/10 border-[#B8860B] text-white'
                          : 'bg-black/30 border-neutral-850 text-neutral-400 hover:border-neutral-700 hover:text-white'
                      }`}
                    >
                      <span className="font-mono text-neutral-500 text-[9px] block mb-1">
                        PA-{item.id.slice(0, 4).toUpperCase()}
                      </span>
                      <span className="font-serif font-bold text-[10px] leading-tight line-clamp-2">
                        {item.title.replace('Imperial Carrara Bust of ', '').replace('Archaic ', '').replace('Hellenistic ', '')}
                      </span>
                    </button>
                  );
                })}
              </div>

              {/* Certificate Verification Input form */}
              <div className="mt-6 pt-5 border-t border-neutral-800/60">
                <label className="block text-[10px] font-sans font-bold uppercase tracking-wider text-neutral-400 mb-2">
                  Verify Physical Certificate ID
                </label>
                <form onSubmit={handleCertSearch} className="flex gap-2">
                  <div className="relative flex-1">
                    <input
                      type="text"
                      value={customCertQuery}
                      onChange={(e) => setCustomCertQuery(e.target.value)}
                      placeholder="e.g. PA-MURE-940A"
                      className="w-full bg-black/40 border border-neutral-800 px-3 py-2 text-xs text-[#F5F3EF] placeholder:text-neutral-600 focus:outline-none focus:border-[#B8860B] font-mono uppercase"
                    />
                    <Search className="w-3.5 h-3.5 absolute right-3 top-2.5 text-neutral-600" />
                  </div>
                  <button
                    type="submit"
                    disabled={certValidating}
                    className="px-4 py-2 bg-[#2C2C2C] hover:bg-[#B8860B] text-[#F5F3EF] hover:text-[#1A1A1A] text-xs uppercase tracking-widest font-sans font-bold transition-all duration-300 border border-neutral-800 hover:border-[#B8860B]"
                  >
                    {certValidating ? 'Searching...' : 'Decrypt'}
                  </button>
                </form>

                {searchFeedback && (
                  <p className={`text-[10px] font-sans mt-2.5 leading-snug flex items-start gap-1 ${
                    searchFeedback.includes('successfully') ? 'text-emerald-400' : 'text-amber-500'
                  }`}>
                    <span className="font-bold">➔</span>
                    <span>{searchFeedback}</span>
                  </p>
                )}
              </div>
            </div>

            {/* Interactive Holographic Certificate */}
            <div className="perspective-1000">
              <span className="text-[10px] tracking-widest uppercase font-sans font-bold text-neutral-500 block mb-2.5">
                Interactive Security Dossier
              </span>
              <div
                ref={coaRef}
                onMouseMove={handleMouseMove}
                onMouseLeave={handleMouseLeave}
                style={{
                  transform: `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`,
                  transition: rotateX === 0 && rotateY === 0 ? 'all 0.5s ease-out' : 'none',
                  boxShadow: '0 20px 40px rgba(0,0,0,0.4)',
                }}
                className="relative bg-[#FAF8F5] text-[#2C2C2C] p-6 sm:p-8 rounded-xs border-2 border-double border-[#B8860B]/70 overflow-hidden select-none"
              >
                {/* Security fine-line watermarking backdrop */}
                <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[radial-gradient(#2C2C2C_1px,transparent_1px)] [background-size:16px_16px]"></div>
                
                {/* Microscopic security gilded trim */}
                <div className="absolute inset-2 border border-[#B8860B]/20 pointer-events-none"></div>

                {/* Content Layout */}
                <div className="relative flex flex-col justify-between h-full min-h-[360px]">
                  
                  {/* COA Header */}
                  <div className="text-center border-b border-[#2C2C2C]/10 pb-4">
                    <div className="flex justify-center mb-1">
                      <Award className="w-8 h-8 text-[#B8860B]" />
                    </div>
                    <span className="font-serif uppercase tracking-[0.2em] text-xs font-bold block text-[#2C2C2C]">
                      Prestige Antiquities Authenticity Group
                    </span>
                    <span className="font-sans uppercase text-[8px] tracking-[0.3em] font-bold text-[#B8860B] block mt-0.5">
                      Rome • Geneva • London
                    </span>
                  </div>

                  {/* COA Body */}
                  <div className="my-6 space-y-4">
                    <div className="text-center">
                      <span className="italic font-serif text-neutral-500 text-xs block">
                        This document certifies the absolute material and historic pedigree of:
                      </span>
                      <h4 className="font-serif text-lg tracking-wide text-[#2C2C2C] mt-2 font-bold leading-tight uppercase">
                        {activeArtifact.title}
                      </h4>
                      <p className="font-mono text-[10px] text-neutral-500 mt-1 uppercase tracking-widest">
                        Origin: {activeArtifact.culture} • Dated: {activeArtifact.date}
                      </p>
                    </div>

                    <div className="bg-[#2C2C2C]/5 border border-[#2C2C2C]/10 p-3.5 space-y-2 font-sans text-[10px]">
                      <div className="flex justify-between">
                        <span className="font-semibold text-neutral-500 uppercase tracking-wider">Diagnostic ID:</span>
                        <span className="font-mono font-bold text-[#B8860B]">{activeLab.certificateNo}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="font-semibold text-neutral-500 uppercase tracking-wider">Composition:</span>
                        <span className="text-neutral-800 font-medium">{activeLab.chemicalFormula.split(' ')[0]}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="font-semibold text-neutral-500 uppercase tracking-wider">Status Check:</span>
                        <span className="text-emerald-700 font-bold flex items-center gap-1">
                          <CheckCircle className="w-3 h-3 inline" /> Conserved & Registered
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="font-semibold text-neutral-500 uppercase tracking-wider">Database Lock:</span>
                        <span className="font-mono text-neutral-500">{generateHash(activeArtifact.id)}</span>
                      </div>
                    </div>
                  </div>

                  {/* COA Footer */}
                  <div className="flex items-end justify-between border-t border-[#2C2C2C]/10 pt-4 mt-2">
                    {/* Security Hologram Stamp */}
                    <div className="relative group/holo">
                      <div className="w-12 h-12 rounded-full bg-gradient-to-tr from-[#B1892B] via-[#ECDAA9] to-[#806117] relative flex items-center justify-center border-2 border-white/60 shadow-md overflow-hidden rotate-12 group-hover/holo:-rotate-12 transition-transform duration-500">
                        {/* Shimmer overlay */}
                        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/50 to-transparent -translate-x-full group-hover/holo:translate-x-full transition-transform duration-1000 ease-out" />
                        <span className="text-[7px] text-[#2C2C2C] font-mono leading-none tracking-tighter text-center font-black">
                          PRESTIGE<br/>VERIFIED
                        </span>
                      </div>
                      <span className="block text-[7px] text-neutral-400 mt-1 uppercase tracking-widest text-center font-mono">
                        Notarized Seal
                      </span>
                    </div>

                    {/* Authenticator Signature */}
                    <div className="text-right">
                      <p className="font-serif italic text-sm text-[#C39D4C] tracking-wide pr-2">
                        Claudio V. Sallustio
                      </p>
                      <div className="w-28 h-[1px] bg-neutral-300 ml-auto my-1"></div>
                      <p className="text-[8px] uppercase tracking-widest text-neutral-400 font-sans font-bold">
                        Dr. Claudio V. Sallustio
                      </p>
                      <p className="text-[7px] text-neutral-400 font-sans font-medium uppercase tracking-tight">
                        Director of Conservation, Roma
                      </p>
                    </div>
                  </div>

                </div>

                {/* Print button overlay */}
                <button
                  onClick={() => window.print()}
                  className="absolute bottom-2.5 left-2.5 p-1 text-neutral-400 hover:text-black hover:bg-[#2C2C2C]/10 transition-all rounded"
                  title="Print / PDF Certificate"
                >
                  <Download className="w-3.5 h-3.5" />
                </button>
              </div>
              <p className="text-[9.5px] font-sans text-neutral-500 mt-2 leading-relaxed text-center italic">
                Hover over the certificate card to tilt and reveal secure foil watermarks. Use the Print icon inside to generate physical records.
              </p>
            </div>

          </div>

          {/* MIDDLE 7 COLS: Image Spectroscopy Hotspot Scanner & Chronology Timeline */}
          <div className="lg:col-span-7 space-y-8 text-left">
            
            {/* Spectroscopy Scanner Panel */}
            <div className="bg-black/20 border border-neutral-800 p-6 rounded-none relative">
              <div className="flex items-center justify-between border-b border-neutral-800 pb-3.5 mb-6">
                <h3 className="font-serif text-lg text-white flex items-center gap-2">
                  <Activity className="w-4 h-4 text-[#B8860B]" />
                  <span>X-Ray & Material Diagnostics</span>
                </h3>
                <span className="font-mono text-[9px] text-[#B8860B] tracking-wider uppercase bg-[#B8860B]/10 px-2 py-0.5 border border-[#B8860B]/25">
                  Spectrogram Area
                </span>
              </div>

              {/* Grid Layout: Visual on Left, report detail on right */}
              <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-start">
                
                {/* Photo with hotspots (md: 6 of 12 cols) */}
                <div className="md:col-span-6 relative aspect-square bg-[#0F0F0F] border border-neutral-850 overflow-hidden group">
                  {/* Antiquity Image */}
                  <img
                    src={activeArtifact.imageUrl || undefined}
                    alt={activeArtifact.title}
                    className="w-full h-full object-cover opacity-80 select-none grayscale group-hover:grayscale-0 transition-all duration-700"
                    referrerPolicy="no-referrer"
                  />

                  {/* Gradient dark cast */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>

                  {/* Scanning sweep laser bar */}
                  <div className="absolute top-0 inset-x-0 h-0.5 bg-gradient-to-r from-transparent via-[#B8860B] to-transparent animate-scan-line shadow-[0_0_8px_#B8860B] pointer-events-none"></div>

                  {/* Loading Scan Overlay */}
                  <AnimatePresence>
                    {isScanning && (
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="absolute inset-0 bg-[#1A1A1A]/85 flex flex-col items-center justify-center z-10"
                      >
                        <Activity className="w-8 h-8 text-[#B8860B] animate-pulse mb-2" />
                        <span className="font-mono text-[10px] text-neutral-300 tracking-widest uppercase">
                          Recalibrating Spectroscopic...
                        </span>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  {/* Hotspots */}
                  {activeLab.hotspots.map((hs) => {
                    const isActive = hs.id === activeHotspot;
                    return (
                      <button
                        key={hs.id}
                        onClick={() => setActiveHotspot(hs.id)}
                        className="absolute w-7 h-7 -ml-3.5 -mt-3.5 flex items-center justify-center focus:outline-none z-25 group/hs-btn"
                        style={{ left: `${hs.x}%`, top: `${hs.y}%` }}
                      >
                        <span className={`absolute inset-0 rounded-full animate-ping opacity-35 ${
                          isActive ? 'bg-[#B08A2E]' : 'bg-white group-hover/hs-btn:bg-[#B08A2E]/50'
                        }`} />
                        <span className={`w-3.5 h-3.5 rounded-full border border-white text-[8px] flex items-center justify-center font-bold tracking-tighter ${
                          isActive 
                            ? 'bg-[#B8860B] text-[#1A1A1A] shadow-lg scale-110' 
                            : 'bg-[#1A1A1A]/85 text-white group-hover/hs-btn:bg-[#B8860B]'
                        } transition-all duration-300`}>
                          •
                        </span>
                      </button>
                    );
                  })}
                </div>

                {/* Hotspot Scientific Report (md: 6 of 12 cols) */}
                <div className="md:col-span-6 space-y-4">
                  <div className="bg-black/30 border border-neutral-850 p-4 min-h-[180px] flex flex-col justify-between relative">
                    {/* Glowing corner trim */}
                    <div className="absolute top-0 right-0 w-2.5 h-2.5 border-t border-r border-[#B8860B]/30"></div>
                    <div className="absolute bottom-0 left-0 w-2.5 h-2.5 border-b border-l border-[#B8860B]/30"></div>

                    <div className="space-y-3">
                      <div>
                        <span className="text-[9px] font-mono font-medium text-[#B8860B] uppercase tracking-widest block mb-0.5">
                          Active Hotspot Trace
                        </span>
                        <h4 className="font-serif text-[15px] font-bold text-white tracking-wide">
                          {currentHotspotData.label}
                        </h4>
                      </div>

                      <div className="space-y-2 border-y border-neutral-850 py-3 text-[11px] font-sans">
                        <p className="leading-tight text-neutral-400">
                          <span className="font-semibold text-neutral-200 block uppercase text-[10px] tracking-wider mb-0.5">Test Method:</span>
                          <span className="font-mono text-[#D4AF37]">{currentHotspotData.testMethod}</span>
                        </p>
                        <p className="leading-tight text-neutral-400">
                          <span className="font-semibold text-neutral-200 block uppercase text-[10px] tracking-wider mb-0.5">Physical Result:</span>
                          <span className="text-neutral-200">{currentHotspotData.result}</span>
                        </p>
                      </div>

                      <p className="text-[11px] text-neutral-400 leading-relaxed font-sans italic pt-1">
                        "{currentHotspotData.finding}"
                      </p>
                    </div>

                    <div className="mt-4 pt-1 flex items-center justify-between text-[9px] font-mono text-neutral-500">
                      <span>Dossier Reference: PRIS-{selectedId.slice(0, 4).toUpperCase()}</span>
                      <span className="text-[#B8860B]">VERIFIED ORIGINAL</span>
                    </div>
                  </div>

                  {/* Extra Material Diagnostics sheet */}
                  <div className="grid grid-cols-2 gap-3.5 font-sans text-xs">
                    <div className="bg-black/20 p-3 border border-neutral-850 rounded-none">
                      <span className="text-neutral-500 text-[10px] uppercase font-bold block mb-1">Microstructure</span>
                      <p className="text-neutral-300 leading-snug">{activeLab.microstructure}</p>
                    </div>
                    <div className="bg-black/20 p-3 border border-neutral-850 rounded-none">
                      <span className="text-neutral-500 text-[10px] uppercase font-bold block mb-1">Spectral Signature</span>
                      <p className="text-neutral-300 leading-snug">{activeLab.spectralSignature}</p>
                    </div>
                  </div>

                </div>

              </div>
            </div>

            {/* Chronology Timeline Slider */}
            <div className="bg-black/20 border border-neutral-800 p-6 rounded-none text-left">
              <div className="flex items-center justify-between border-b border-neutral-800 pb-3.5 mb-6">
                <h3 className="font-serif text-lg text-white flex items-center gap-2">
                  <History className="w-4 h-4 text-[#B8860B]" />
                  <span>Provenance Chronology Voyager</span>
                </h3>
                <span className="font-mono text-[9px] text-[#B8860B] tracking-wider uppercase bg-[#B8860B]/10 px-2 py-0.5 border border-[#B8860B]/25">
                  Interactive Journey
                </span>
              </div>

              {/* Timeline Track Slider component */}
              <div className="relative mb-8 px-2 select-none">
                {/* Horizontal guide track */}
                <div className="absolute top-[13px] left-0 right-0 h-0.5 bg-neutral-800" />
                {/* Active slider indicator track */}
                <div 
                  className="absolute top-[13px] left-0 h-0.5 bg-[#B8860B] transition-all duration-300" 
                  style={{ width: `${(timelineIndex / 3) * 100}%` }}
                />

                {/* Timeline interactive circle markers */}
                <div className="relative flex justify-between">
                  {activeLab.timeline.map((pt, idx) => {
                    const isActive = idx === timelineIndex;
                    const isPassed = idx <= timelineIndex;
                    return (
                      <button
                        key={idx}
                        onClick={() => setTimelineIndex(idx)}
                        className={`relative z-10 w-7 h-7 flex items-center justify-center rounded-full border transition-all duration-300 ${
                          isActive
                            ? 'bg-[#B08A2E] text-[#1A1A1A] border-[#B8860B] scale-110 shadow-lg'
                            : isPassed
                              ? 'bg-[#1A1A1A] text-[#B8860B] border-[#B08A2E] hover:bg-[#B08A2E]/20'
                              : 'bg-[#1A1A1A] text-neutral-500 border-neutral-800 hover:border-neutral-700'
                        }`}
                      >
                        <Clock className="w-3.5 h-3.5" />
                        
                        {/* Text label underneath */}
                        <div className="absolute top-8 left-1/2 -translate-x-1/2 flex flex-col items-center">
                          <span className={`text-[9px] font-mono font-bold uppercase tracking-widest whitespace-nowrap leading-none transition-colors ${
                            isActive ? 'text-[#B8860B]' : 'text-neutral-500'
                          }`}>
                            {pt.era}
                          </span>
                          <span className="text-[8px] font-sans text-neutral-400 mt-1 whitespace-nowrap leading-none">
                            {pt.date}
                          </span>
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Selected Timeline Event Display Card */}
              <AnimatePresence mode="wait">
                <motion.div
                  key={timelineIndex}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.3 }}
                  className="bg-black/35 border border-neutral-850 p-5 rounded-none relative mt-10 min-h-[140px] flex flex-col justify-between"
                >
                  <div className="absolute top-4 right-4 text-[9px] font-mono text-[#D4AF37] uppercase tracking-widest bg-[#D4AF37]/5 px-2 py-0.5 border border-[#D4AF37]/15">
                    Map Node: {activeTimelinePoint.location}
                  </div>
                  <div>
                    <span className="text-[10px] uppercase font-mono font-bold tracking-widest text-neutral-500">
                      Chapter {timelineIndex + 1} of 4 • {activeTimelinePoint.date}
                    </span>
                    <h4 className="font-serif text-[15px] font-bold text-white mt-1.5 mb-2 leading-snug">
                      {activeTimelinePoint.title}
                    </h4>
                    <p className="text-neutral-400 font-sans text-xs leading-relaxed italic pr-4 sm:pr-24">
                      "{activeTimelinePoint.description}"
                    </p>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>

          </div>

        </div>

      </div>
    </div>
  );
}
