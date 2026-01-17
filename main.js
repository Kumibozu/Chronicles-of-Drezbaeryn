import React, { useState } from 'react';
import ReactDOM from 'react-dom/client';
import { Scroll, Map, Book, Landmark, Users, Activity, Search, X, Shield, Flag, Coins, Crown, Send, Sparkles, ChevronDown } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar, Legend } from 'recharts';
import { GoogleGenAI } from "@google/genai";

// ==========================================
// 1. CONSTANTS & DATA
// ==========================================

const ERAS = [
  {
    id: 'collapse',
    name: 'Collapse of the Era of the Globe',
    yearRange: '0 - 50 PC (Post-Collapse)',
    description: 'The shattering of the old world order due to resource scarcity and the Great Silence.',
    details: 'Before the Collapse, the world was unified under a global network. When the network failed, mass starvation and infrastructure decay followed. The "Era of the Globe" is now a mythologized golden age.'
  },
  {
    id: 'anarchy',
    name: 'Era of Anarchy',
    yearRange: '51 - 200 PC',
    description: 'Warlords and tribal mysticism dominate the shattered continents.',
    details: 'During this period, no central government existed. The rise of local "Protectorates" laid the groundwork for modern city-states. The "Halphadites" emerged as a dominant raiding force in the south.'
  },
  {
    id: 'khynmour',
    name: 'Rise of the Khynmour Republic',
    yearRange: '201 - 350 PC',
    description: 'The first attempt at restoring complex governance in the north.',
    details: 'Khynmour scholars rediscovered steam power and printing. They established the first Republic, though it was plagued by internal corruption and the "Urban Tithe" riots.'
  },
  {
    id: 'commonwealth',
    name: 'Formation of the Commonwealth',
    yearRange: '351 - 480 PC',
    description: 'The unification of the northern city-states under the Revolutionary Montague.',
    details: 'Montague led the People’s Army to overthrow the decaying Khynmour elite. The Commonwealth was born on principles of shared labor and state atheism.'
  },
  {
    id: 'indros',
    name: 'Indros Industrialisation',
    yearRange: '481 - 550 PC',
    description: 'Rapid technological expansion in the eastern archipelago of Indros.',
    details: 'Indros, previously isolated, adopted aggressive factory-city models. Their output of steel and munitions quickly surpassed the mainland, leading to the "Smog Treaties".'
  },
  {
    id: 'gap-pass',
    name: 'Gap Pass Campaign',
    yearRange: '551 - 560 PC',
    description: 'A bloody territorial war between the Commonwealth and Indros proxies.',
    details: 'Fought over the strategic mountain pass known as "The Gap". Tens of thousands perished in trench warfare. It ended in a stalemate but solidified borders.'
  },
  {
    id: 'ryenarkia',
    name: 'Rise of Ryenarkia',
    yearRange: '561 - 600 PC',
    description: 'The unification of southern monarchies under the Imperial Cult.',
    details: 'Claiming divine mandate from the "Old Gods" of the Globe era, Emperor Darwues united the south against the "godless" Commonwealth.'
  },
  {
    id: 'cold-war',
    name: 'Modern Cold War',
    yearRange: '601 PC - Present',
    description: 'Ideological standoff between the Commonwealth and the Ryenarkian Empire.',
    details: 'A delicate peace held together by nuclear deterrence (relic weapons) and espionage. Proxy wars flare in the tribal territories and the Gap.'
  }
];

const REGIONS = [
  {
    id: 'commonwealth',
    name: 'The Commonwealth',
    description: 'An industrial socialist union of city-states. Strict, militaristic, and fiercely anti-monarchist.',
    politicalSystem: 'Council Republic',
    conflicts: ['Border skirmishes with Ryenarkia', 'Internal dissent in Sector 7'],
    color: '#8b3a3a',
    coordinates: 'M 50 50 L 150 50 L 180 120 L 120 200 L 40 180 Z'
  },
  {
    id: 'ryenarkia',
    name: 'Ryenarkian Empire',
    description: 'A sprawling theocratic empire valuing tradition, hierarchy, and divine right.',
    politicalSystem: 'Absolute Monarchy (Theocratic)',
    conflicts: ['Suppression of Jindu rebels', 'Cold War with Commonwealth'],
    color: '#4b3a8b',
    coordinates: 'M 200 100 L 350 100 L 380 250 L 250 300 L 180 200 Z'
  },
  {
    id: 'gap',
    name: 'The Gap',
    description: 'A neutral, lawless mountain corridor controlled by Merchant Houses.',
    politicalSystem: 'Plutocracy',
    conflicts: ['Mercenary wars', 'Smuggling suppression'],
    color: '#cfaa62',
    coordinates: 'M 150 50 L 200 50 L 220 150 L 180 120 Z'
  },
  {
    id: 'indros',
    name: 'Indros',
    description: 'Technocratic archipelago nation focused on efficiency and manufacturing.',
    politicalSystem: 'Corporate Syndicate',
    conflicts: ['Trade disputes with The Gap'],
    color: '#4a6fa5',
    coordinates: 'M 400 50 L 500 60 L 480 180 L 380 150 Z'
  },
  {
    id: 'jindu',
    name: 'Jindu / Southriver',
    description: 'Agricultural heartland suffering under Ryenarkian occupation.',
    politicalSystem: 'Occupied Territory',
    conflicts: ['Guerilla resistance'],
    color: '#647a46',
    coordinates: 'M 250 300 L 380 250 L 400 400 L 200 400 Z'
  }
];

const FACTIONS = [
  {
    id: 'city-council',
    name: 'City Council Government',
    type: 'Government',
    slogan: 'Order through Unity.',
    description: 'The ruling body of the Commonwealth. Bureaucratic and severe.',
    ideology: 'Collectivism',
    leader: 'High Councilor Vane',
    color: 'bg-red-800',
    logo: 'landmark'
  },
  {
    id: 'imperial-cult',
    name: 'Ryenarkian Imperial Cult',
    type: 'Religious/State',
    slogan: 'The Blood is the Crown.',
    description: 'The priesthood that enforces the Emperor’s will and maintains the relic archives.',
    ideology: 'Divine Right / Traditionalism',
    leader: 'Arch-Lector Sael',
    color: 'bg-purple-800',
    logo: 'crown'
  },
  {
    id: 'merchant-houses',
    name: 'Gap Merchant Houses',
    type: 'Corporate',
    slogan: 'Everything has a price.',
    description: 'A loose alliance of wealthy trading families controlling the mountain passes.',
    ideology: 'Capitalism / Neutrality',
    leader: 'Grand Prince Oland',
    color: 'bg-yellow-700',
    logo: 'coins'
  },
  {
    id: 'montague-rev',
    name: 'Revolutionary Commonwealth',
    type: 'Military / Political',
    slogan: 'Break the Chains of the Past.',
    description: 'The original founders of the Commonwealth, now a radical faction within the government.',
    ideology: 'Radical Socialism',
    leader: 'General Kaelen (Descendant)',
    color: 'bg-red-600',
    logo: 'flag'
  }
];

const ARTIFACTS = [
  {
    id: 'pamphlet',
    name: 'The Red Dawn Pamphlet',
    type: 'Propaganda',
    origin: 'Commonwealth (Early Era)',
    description: 'A faded manifesto calling for the end of the Khynmour Republic. "Bread not Stone" is scrawled on the back.',
  },
  {
    id: 'relic-rifle',
    name: 'Mi’yam Relic Rifle',
    type: 'Weapon',
    origin: 'Pre-Collapse',
    description: 'A coil-gun from the Era of the Globe. No longer functional, but used as a symbol of authority by Ryenarkian officers.',
  },
  {
    id: 'graffiti',
    name: 'Urban Tithe Slogans',
    type: 'Cultural',
    origin: 'Khynmour Ruins',
    description: 'Chalk rubbings preserved from the riots. "They eat while we bleed."',
  },
  {
    id: 'mask',
    name: 'Mask of the Wifuni',
    type: 'Ceremonial',
    origin: 'Tribal Territories',
    description: 'A wooden mask worn during the Harvest of Ash festivals in the unclaimed lands.',
  }
];

const CHARACTERS = [
  {
    id: 'darwues',
    name: 'Darwues the Emperor',
    title: 'Sovereign of Ryenarkia',
    faction: 'Ryenarkian Empire',
    description: 'The aging monarch who claims direct lineage to the Old World CEOs (now deified). He seeks to preserve tradition at any cost.',
    traits: ['Authoritarian', 'Pious', 'Strategic']
  },
  {
    id: 'montague',
    name: 'Montague the Revolutionary',
    title: 'Founder (Deceased)',
    faction: 'Commonwealth',
    description: 'The historical figure who united the north. His preserved body is on display in the Capital, a pilgrimage site for loyalists.',
    traits: ['Charismatic', 'Ruthless', 'Visionary']
  },
  {
    id: 'brenna',
    name: 'Brenna of Indros',
    title: 'Iron Admiral',
    faction: 'Indros',
    description: 'Commander of the Indros naval blockade. Known for her mechanical prosthetic arm and cold demeanor.',
    traits: ['Calculating', 'Technocrat', 'Patriot']
  }
];

// ==========================================
// 2. GEMINI SERVICE
// ==========================================

// TODO: Replace with your actual API key
const API_KEY = "MY_API_KEY_HERE";

const SYSTEM_INSTRUCTION = `
You are the Royal Archivist of Drezbaeryn. You are a historian within this fantasy world.
Your tone is academic, slightly archaic, but objective.
You are an expert on the history, politics, and cultures of Drezbaeryn.
The world includes the Commonwealth (socialist/industrial), Ryenarkia (imperial/theocratic), Indros (technocratic), and The Gap (mercantile).
History includes the Era of the Globe (ancient high-tech), the Collapse, the Anarchy, and the current Cold War.

Use the following context to answer user questions. If the answer is not in the context, hallucinate plausible details that fit the tone and existing lore.

Context:
Eras: ${JSON.stringify(ERAS.map(e => e.name + ': ' + e.description))}
Regions: ${JSON.stringify(REGIONS.map(r => r.name + ': ' + r.description))}
Factions: ${JSON.stringify(FACTIONS.map(f => f.name + ': ' + f.description))}
Characters: ${JSON.stringify(CHARACTERS.map(c => c.name + ': ' + c.description))}
`;

const askArchivist = async (query) => {
  if (!API_KEY || API_KEY === "MY_API_KEY_HERE") {
    return "The Archives are currently sealed. (Please set your API_KEY in main.js)";
  }

  try {
    const ai = new GoogleGenAI({ apiKey: API_KEY });
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: [{
        role: 'user',
        parts: [{ text: query }]
      }],
      config: {
        systemInstruction: SYSTEM_INSTRUCTION,
      }
    });

    return response.text || "The records are faded... (No response)";
  } catch (error) {
    console.error("Archivist error:", error);
    return "The Archivist is currently indisposed (API Error).";
  }
};

// ==========================================
// 3. COMPONENTS
// ==========================================

const Navigation = ({ currentView, setView }) => {
  const navItems = [
    { id: 'timeline', label: 'Timeline', icon: <Activity size={18} /> },
    { id: 'atlas', label: 'Atlas', icon: <Map size={18} /> },
    { id: 'codex', label: 'Factions', icon: <Landmark size={18} /> },
    { id: 'archive', label: 'Archive', icon: <Scroll size={18} /> },
    { id: 'profiles', label: 'Profiles', icon: <Users size={18} /> },
    { id: 'dashboard', label: 'Cold War', icon: <Activity size={18} /> },
    { id: 'encyclopedia', label: 'Search', icon: <Search size={18} /> },
  ];

  return (
    <nav className="fixed bottom-0 left-0 w-full bg-parchment-900 text-parchment-100 shadow-lg border-t border-parchment-700 z-50 md:top-0 md:bottom-auto md:h-16 flex items-center justify-between px-4 overflow-x-auto">
      <div className="hidden md:block font-display text-xl tracking-widest text-parchment-200">
        DREZBAERYN
      </div>
      <div className="flex w-full md:w-auto justify-around md:justify-end gap-1 md:gap-4 py-2 md:py-0">
        {navItems.map((item) => (
          <button
            key={item.id}
            onClick={() => setView(item.id)}
            className={`flex flex-col md:flex-row items-center gap-1 md:gap-2 px-3 py-2 rounded transition-colors duration-200 ${
              currentView === item.id
                ? 'bg-parchment-700 text-parchment-50'
                : 'hover:bg-parchment-800 text-parchment-300'
            }`}
          >
            {item.icon}
            <span className="text-xs md:text-sm font-serif uppercase tracking-wider">{item.label}</span>
          </button>
        ))}
      </div>
    </nav>
  );
};

const Timeline = () => {
  const [selectedEra, setSelectedEra] = useState(null);

  const toggleEra = (id) => {
    setSelectedEra(selectedEra === id ? null : id);
  };

  return (
    <div className="max-w-4xl mx-auto p-4 md:p-8 pt-6 pb-24">
      <h2 className="text-3xl md:text-5xl font-display text-parchment-900 mb-2 text-center border-b-2 border-parchment-400 pb-4">
        The Chronicles
      </h2>
      <p className="text-center font-serif italic text-parchment-700 mb-12">
        A record of the eras from the Collapse to the Modern Cold War.
      </p>

      <div className="relative border-l-2 border-parchment-400 ml-4 md:ml-1/2 space-y-12">
        {ERAS.map((era) => (
          <div key={era.id} className="relative pl-8 md:pl-12">
            <div 
              className={`absolute -left-[9px] top-0 w-4 h-4 rounded-full border-2 transition-colors duration-300 ${
                selectedEra === era.id ? 'bg-commonwealth border-commonwealth' : 'bg-parchment-100 border-parchment-600'
              }`}
            />
            
            <div 
              className={`cursor-pointer group transition-all duration-300 ${selectedEra === era.id ? 'opacity-100' : 'opacity-80 hover:opacity-100'}`}
              onClick={() => toggleEra(era.id)}
            >
              <div className="flex flex-col md:flex-row md:items-baseline gap-2 mb-2">
                <span className="font-display font-bold text-xl text-parchment-900">{era.yearRange}</span>
                <h3 className="text-2xl font-serif text-ink-900 group-hover:text-commonwealth transition-colors">
                  {era.name}
                </h3>
              </div>
              
              <p className="font-serif text-parchment-800 leading-relaxed max-w-2xl mb-2">
                {era.description}
              </p>

              <AnimatePresence>
                {selectedEra === era.id && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    className="overflow-hidden"
                  >
                    <div className="mt-4 p-6 bg-parchment-100 border border-parchment-300 rounded shadow-inner text-ink-800 font-serif leading-loose">
                      <p className="first-letter:text-4xl first-letter:float-left first-letter:mr-2 first-letter:font-display first-letter:text-commonwealth">
                        {era.details}
                      </p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
              
              {selectedEra !== era.id && (
                <div className="flex items-center gap-1 text-parchment-600 text-sm mt-2 uppercase tracking-widest font-bold">
                  Read Chronicle <ChevronDown size={14} />
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

const Atlas = () => {
  const [selectedRegion, setSelectedRegion] = useState(null);

  return (
    <div className="h-full w-full flex flex-col md:flex-row overflow-hidden relative">
      <div className="flex-grow bg-[#e8e4d9] relative flex items-center justify-center overflow-auto p-4 cursor-move">
        <svg viewBox="0 0 600 500" className="w-full h-full max-w-[800px] drop-shadow-xl">
          <defs>
            <filter id="paper-texture">
              <feTurbulence type="fractalNoise" baseFrequency="0.04" numOctaves="5" result="noise" />
              <feDiffuseLighting in="noise" lightingColor="#fff" surfaceScale="2">
                <feDistantLight azimuth="45" elevation="60" />
              </feDiffuseLighting>
            </filter>
          </defs>
          
          <rect width="100%" height="100%" fill="#d6d0c2" />

          {REGIONS.map((region) => (
            <g 
              key={region.id} 
              onClick={() => setSelectedRegion(region)}
              className="cursor-pointer transition-opacity duration-300 hover:opacity-90"
              style={{ opacity: selectedRegion && selectedRegion.id !== region.id ? 0.5 : 1 }}
            >
              <path
                d={region.coordinates}
                fill={region.color}
                stroke="#4a3b2a"
                strokeWidth="2"
                className="transition-all duration-300 hover:stroke-[4px]"
              />
              <text 
                x={region.id === 'commonwealth' ? 100 : region.id === 'ryenarkia' ? 280 : region.id === 'gap' ? 180 : region.id === 'indros' ? 440 : 300} 
                y={region.id === 'commonwealth' ? 120 : region.id === 'ryenarkia' ? 200 : region.id === 'gap' ? 90 : region.id === 'indros' ? 120 : 350} 
                className="font-display text-[12px] uppercase fill-parchment-50 font-bold pointer-events-none text-shadow-sm"
                textAnchor="middle"
              >
                {region.name}
              </text>
            </g>
          ))}
        </svg>

        <div className="absolute top-4 left-4 bg-parchment-50/80 p-2 rounded backdrop-blur-sm border border-parchment-300">
           <p className="font-serif italic text-sm text-parchment-800">Select a region to explore</p>
        </div>
      </div>

      <motion.div 
        className={`fixed md:relative right-0 top-0 h-full w-full md:w-1/3 bg-parchment-50 border-l border-parchment-400 shadow-2xl overflow-y-auto p-6 z-40 ${selectedRegion ? 'translate-x-0' : 'translate-x-full md:translate-x-0 md:hidden'}`}
        initial={false}
        animate={{ x: selectedRegion ? 0 : '100%' }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
        style={{ position: 'fixed', right: 0, top: 0, bottom: 0 }}
      >
        {selectedRegion && (
          <div className="relative pt-12 md:pt-0">
             <button 
                onClick={() => setSelectedRegion(null)}
                className="absolute top-0 right-0 p-2 hover:bg-parchment-200 rounded-full"
              >
                <X size={24} />
              </button>

            <h2 className="text-3xl font-display text-parchment-900 border-b-2 border-parchment-400 pb-2 mb-4">
              {selectedRegion.name}
            </h2>
            
            <div className="space-y-6 font-serif text-ink-800">
              <div>
                <h4 className="font-bold uppercase tracking-widest text-xs text-parchment-600 mb-1">Overview</h4>
                <p>{selectedRegion.description}</p>
              </div>

              <div>
                <h4 className="font-bold uppercase tracking-widest text-xs text-parchment-600 mb-1">Political System</h4>
                <p className="font-display text-lg text-commonwealth">{selectedRegion.politicalSystem}</p>
              </div>

              <div>
                <h4 className="font-bold uppercase tracking-widest text-xs text-parchment-600 mb-1">Active Conflicts</h4>
                <ul className="list-disc list-inside space-y-1">
                  {selectedRegion.conflicts.map((c, i) => (
                    <li key={i}>{c}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        )}
      </motion.div>
    </div>
  );
};

const Codex = () => {
  const getIcon = (iconName) => {
    switch (iconName) {
      case 'crown': return <Crown size={32} />;
      case 'coins': return <Coins size={32} />;
      case 'flag': return <Flag size={32} />;
      default: return <Landmark size={32} />;
    }
  };

  return (
    <div className="max-w-6xl mx-auto p-4 md:p-8 pt-6 pb-24">
      <div className="text-center mb-12">
        <h2 className="text-4xl font-display text-parchment-900 mb-4">Faction Codex</h2>
        <p className="font-serif italic text-parchment-700">The powers that shape Drezbaeryn.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {FACTIONS.map((faction) => (
          <div key={faction.id} className="bg-white border border-parchment-300 shadow-md rounded overflow-hidden flex flex-col hover:shadow-xl transition-shadow duration-300 group">
            <div className={`h-2 w-full ${faction.color}`} />
            <div className="p-6 flex-grow">
              <div className="flex justify-between items-start mb-4">
                <div className={`p-3 rounded-full bg-parchment-100 text-parchment-800 group-hover:bg-parchment-200 transition-colors`}>
                  {getIcon(faction.logo)}
                </div>
                <span className="text-xs font-bold uppercase tracking-widest border border-parchment-300 px-2 py-1 rounded text-parchment-600">
                  {faction.type}
                </span>
              </div>
              
              <h3 className="text-2xl font-display font-bold text-ink-900 mb-1">{faction.name}</h3>
              <p className="font-display text-sm italic text-commonwealth mb-4">"{faction.slogan}"</p>
              
              <p className="font-serif text-ink-800 mb-6 leading-relaxed">
                {faction.description}
              </p>

              <div className="border-t border-parchment-200 pt-4 mt-auto">
                <div className="flex justify-between items-center text-sm">
                   <span className="text-parchment-600 font-bold uppercase text-xs">Ideology</span>
                   <span className="font-serif">{faction.ideology}</span>
                </div>
                 <div className="flex justify-between items-center text-sm mt-2">
                   <span className="text-parchment-600 font-bold uppercase text-xs">Leader</span>
                   <span className="font-serif font-semibold">{faction.leader}</span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

const Archive = () => {
  return (
    <div className="max-w-6xl mx-auto p-4 md:p-8 pt-6 pb-24">
       <div className="text-center mb-12">
        <h2 className="text-4xl font-display text-parchment-900 mb-4">Cultural Archive</h2>
        <p className="font-serif italic text-parchment-700">Fragments of a history written in blood and ink.</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {ARTIFACTS.map((artifact) => (
          <div key={artifact.id} className="bg-parchment-50 border-2 border-parchment-200 p-4 rounded-sm shadow-sm hover:border-parchment-400 transition-colors relative">
            <div className="aspect-square bg-parchment-200 mb-4 flex items-center justify-center overflow-hidden grayscale contrast-125 sepia">
               <img 
                src={`https://picsum.photos/seed/${artifact.id}/300/300`} 
                alt={artifact.name}
                className="object-cover w-full h-full opacity-80 hover:opacity-100 transition-opacity"
               />
            </div>
            
            <div className="font-display text-xs text-parchment-600 uppercase tracking-widest mb-1">
              {artifact.origin}
            </div>
            <h3 className="font-serif font-bold text-lg text-ink-900 mb-2 leading-tight">
              {artifact.name}
            </h3>
            <p className="text-sm font-serif text-ink-800 leading-relaxed italic border-l-2 border-commonwealth pl-3">
              "{artifact.description}"
            </p>
            
            <div className="absolute top-2 right-2 bg-white/80 px-2 py-0.5 text-[10px] font-bold uppercase border border-parchment-300">
              {artifact.type}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

const Profiles = () => {
  return (
    <div className="max-w-5xl mx-auto p-4 md:p-8 pt-6 pb-24">
      <div className="text-center mb-12">
        <h2 className="text-4xl font-display text-parchment-900 mb-4">Notable Figures</h2>
        <p className="font-serif italic text-parchment-700">Leaders, revolutionaries, and tyrants.</p>
      </div>

      <div className="space-y-8">
        {CHARACTERS.map((char) => (
          <div key={char.id} className="flex flex-col md:flex-row bg-white border border-parchment-300 shadow-md rounded overflow-hidden">
            <div className="md:w-1/3 bg-parchment-200 relative group">
               <img 
                src={`https://picsum.photos/seed/${char.id}/400/500`} 
                alt={char.name}
                className="w-full h-full object-cover grayscale sepia contrast-125 transition-all duration-500 group-hover:grayscale-0 group-hover:sepia-0"
               />
               <div className="absolute bottom-0 left-0 w-full bg-gradient-to-t from-black/70 to-transparent p-4">
                 <p className="text-white font-display text-lg">{char.title}</p>
               </div>
            </div>
            
            <div className="md:w-2/3 p-6 md:p-8 flex flex-col justify-center">
              <div className="flex justify-between items-start mb-2">
                <h3 className="text-3xl font-display font-bold text-ink-900">{char.name}</h3>
                <span className="text-xs font-bold uppercase tracking-widest bg-parchment-100 px-2 py-1 rounded text-parchment-800 border border-parchment-300">
                  {char.faction}
                </span>
              </div>
              
              <div className="w-12 h-1 bg-commonwealth mb-6"></div>

              <p className="font-serif text-lg text-ink-800 leading-relaxed mb-6">
                {char.description}
              </p>

              <div className="flex flex-wrap gap-2">
                {char.traits.map(trait => (
                  <span key={trait} className="px-3 py-1 bg-parchment-50 border border-parchment-300 rounded-full text-xs font-serif italic text-parchment-700">
                    {trait}
                  </span>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

const Dashboard = () => {
  const influenceData = [
    { name: 'Drezbaeryn Proper', commonwealth: 80, ryenarkia: 10 },
    { name: 'The Gap', commonwealth: 45, ryenarkia: 40 },
    { name: 'Jindu', commonwealth: 20, ryenarkia: 90 },
    { name: 'Indros', commonwealth: 60, ryenarkia: 20 },
    { name: 'Tribal Lands', commonwealth: 30, ryenarkia: 35 },
  ];

  const statsData = [
    { subject: 'Military', A: 120, B: 110, fullMark: 150 },
    { subject: 'Economy', A: 98, B: 130, fullMark: 150 },
    { subject: 'Stability', A: 86, B: 130, fullMark: 150 },
    { subject: 'Tech', A: 99, B: 50, fullMark: 150 },
    { subject: 'Espionage', A: 85, B: 90, fullMark: 150 },
    { subject: 'Relics', A: 20, B: 150, fullMark: 150 },
  ];

  return (
    <div className="max-w-6xl mx-auto p-4 md:p-8 pt-6 pb-24">
      <div className="text-center mb-12">
        <h2 className="text-4xl font-display text-parchment-900 mb-4">Cold War Dashboard</h2>
        <p className="font-serif italic text-parchment-700">Strategic analysis of the geopolitical stalemate.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
        <div className="bg-white p-6 border border-parchment-300 shadow rounded">
          <h3 className="text-xl font-display font-bold text-ink-900 mb-6 border-b border-parchment-200 pb-2">
            Regional Influence
          </h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={influenceData} layout="vertical">
                <XAxis type="number" hide />
                <YAxis dataKey="name" type="category" width={100} tick={{fontFamily: 'serif', fontSize: 12}} />
                <Tooltip cursor={{fill: '#f5ebd0'}} contentStyle={{backgroundColor: '#fdfbf7', fontFamily: 'serif'}} />
                <Legend />
                <Bar dataKey="commonwealth" name="Commonwealth" stackId="a" fill="#8b3a3a" />
                <Bar dataKey="ryenarkia" name="Ryenarkia" stackId="a" fill="#4b3a8b" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-white p-6 border border-parchment-300 shadow rounded">
          <h3 className="text-xl font-display font-bold text-ink-900 mb-6 border-b border-parchment-200 pb-2">
             Asymmetric Capabilities
          </h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <RadarChart cx="50%" cy="50%" outerRadius="80%" data={statsData}>
                <PolarGrid stroke="#dec489" />
                <PolarAngleAxis dataKey="subject" tick={{ fontFamily: 'serif', fontSize: 12, fill: '#7a5836' }} />
                <PolarRadiusAxis angle={30} domain={[0, 150]} tick={false} axisLine={false} />
                <Radar name="Commonwealth" dataKey="A" stroke="#8b3a3a" fill="#8b3a3a" fillOpacity={0.4} />
                <Radar name="Ryenarkia" dataKey="B" stroke="#4b3a8b" fill="#4b3a8b" fillOpacity={0.4} />
                <Legend />
                <Tooltip contentStyle={{backgroundColor: '#fdfbf7', fontFamily: 'serif'}} />
              </RadarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      <div className="bg-parchment-100 p-6 border border-parchment-400 rounded relative overflow-hidden">
        <h3 className="text-xl font-display font-bold text-ink-900 mb-4">Current Threat Levels</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
           <div className="p-4 bg-red-50 border-l-4 border-commonwealth">
             <h4 className="font-bold font-display text-commonwealth">Gap Border</h4>
             <p className="text-sm font-serif mt-1">Troop buildup reported near Sector 4. Smugglers supplying heavy munitions.</p>
             <span className="inline-block mt-2 px-2 py-0.5 bg-red-200 text-red-900 text-xs font-bold rounded">CRITICAL</span>
           </div>
           <div className="p-4 bg-purple-50 border-l-4 border-ryenarkia">
             <h4 className="font-bold font-display text-ryenarkia">Southriver Rebellion</h4>
             <p className="text-sm font-serif mt-1">Ryenarkian inquisitors purging villages. Partisan activity increasing.</p>
             <span className="inline-block mt-2 px-2 py-0.5 bg-orange-200 text-orange-900 text-xs font-bold rounded">HIGH</span>
           </div>
           <div className="p-4 bg-blue-50 border-l-4 border-blue-600">
             <h4 className="font-bold font-display text-blue-800">Indros Trade Route</h4>
             <p className="text-sm font-serif mt-1">Naval blockade holding. Supply chains to the mainland strained.</p>
             <span className="inline-block mt-2 px-2 py-0.5 bg-yellow-200 text-yellow-900 text-xs font-bold rounded">MODERATE</span>
           </div>
        </div>
      </div>
    </div>
  );
};

const Encyclopedia = () => {
  const [query, setQuery] = useState('');
  const [response, setResponse] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!query.trim()) return;

    setLoading(true);
    setResponse(null);
    
    const answer = await askArchivist(query);
    setResponse(answer);
    setLoading(false);
  };

  return (
    <div className="max-w-3xl mx-auto p-4 md:p-8 pt-6 pb-24 min-h-screen flex flex-col">
      <div className="text-center mb-8">
        <h2 className="text-4xl font-display text-parchment-900 mb-2">Royal Archives</h2>
        <p className="font-serif italic text-parchment-700">Consult the Archivist for knowledge lost to time.</p>
      </div>

      <div className="bg-white p-6 rounded shadow-lg border border-parchment-300">
        <form onSubmit={handleSearch} className="relative mb-6">
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Ask about the Halphadites, the Smog Treaties, etc..."
            className="w-full pl-10 pr-12 py-3 bg-parchment-50 border border-parchment-400 rounded focus:outline-none focus:ring-2 focus:ring-commonwealth focus:border-transparent font-serif text-lg placeholder-parchment-500 text-ink-900"
          />
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-parchment-600" size={20} />
          <button 
            type="submit" 
            disabled={loading}
            className="absolute right-2 top-1/2 transform -translate-y-1/2 p-1.5 bg-parchment-200 hover:bg-parchment-300 rounded text-parchment-800 disabled:opacity-50 transition-colors"
          >
            {loading ? <Sparkles className="animate-spin" size={20} /> : <Send size={20} />}
          </button>
        </form>

        {loading && (
           <div className="text-center py-12">
             <div className="animate-pulse flex flex-col items-center">
               <div className="h-2 w-24 bg-parchment-300 rounded mb-2"></div>
               <p className="font-serif italic text-parchment-600">Unsealing scrolls...</p>
             </div>
           </div>
        )}

        {response && !loading && (
          <div className="animate-fade-in bg-parchment-50 p-6 rounded border border-parchment-200 relative">
             <div className="absolute -top-3 -left-3 bg-parchment-800 text-parchment-100 p-2 rounded shadow-sm">
                <Sparkles size={16} />
             </div>
             <div className="prose prose-stone font-serif leading-loose text-ink-900">
               {response.split('\n').map((line, i) => (
                 <p key={i} className="mb-2">{line}</p>
               ))}
             </div>
             <div className="mt-4 pt-4 border-t border-parchment-200 flex justify-end">
               <span className="text-xs uppercase tracking-widest text-parchment-500 font-bold">Entry Retrieved</span>
             </div>
          </div>
        )}
        
        {!response && !loading && (
           <div className="text-center py-8 text-parchment-400">
             <p className="font-display text-sm uppercase tracking-widest">Suggested Inquiries</p>
             <div className="flex flex-wrap justify-center gap-2 mt-4">
               {['Origins of the Gap War', 'Meaning of the Red Dawn', 'Technology of Indros', 'Who is Emperor Darwues?'].map(q => (
                 <button 
                    key={q} 
                    onClick={() => setQuery(q)}
                    className="px-3 py-1 border border-parchment-300 rounded-full text-xs hover:bg-parchment-100 hover:text-ink-900 transition-colors"
                 >
                   {q}
                 </button>
               ))}
             </div>
           </div>
        )}
      </div>
    </div>
  );
};

// ==========================================
// 4. MAIN APP COMPONENT
// ==========================================

const App = () => {
  const [currentView, setCurrentView] = useState('timeline');

  const renderView = () => {
    switch (currentView) {
      case 'timeline': return <Timeline />;
      case 'atlas': return <Atlas />;
      case 'codex': return <Codex />;
      case 'archive': return <Archive />;
      case 'profiles': return <Profiles />;
      case 'dashboard': return <Dashboard />;
      case 'encyclopedia': return <Encyclopedia />;
      default: return <Timeline />;
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#fdfbf7] text-[#2d2a2a] overflow-hidden selection:bg-[#cfaa62] selection:text-white">
      <Navigation currentView={currentView} setView={setCurrentView} />
      
      <main className="flex-grow relative h-full pt-0 md:pt-16 pb-16 md:pb-0 overflow-y-auto scrollbar-hide">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentView}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
            className="h-full"
          >
            {renderView()}
          </motion.div>
        </AnimatePresence>
      </main>
    </div>
  );
};

// ==========================================
// 5. ROOT RENDER
// ==========================================

const rootElement = document.getElementById('root');
const root = ReactDOM.createRoot(rootElement);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);