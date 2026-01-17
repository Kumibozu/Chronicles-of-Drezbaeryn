import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { REGIONS } from '../constants';
import { Region } from '../types';
import { X } from 'lucide-react';

const Atlas: React.FC = () => {
  const [selectedRegion, setSelectedRegion] = useState<Region | null>(null);

  return (
    <div className="h-full w-full flex flex-col md:flex-row overflow-hidden relative">
      {/* Map Area */}
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
          
          {/* Water/Background */}
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
              {/* Simple Label calculation (centroid approx) */}
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

      {/* Info Panel */}
      <motion.div 
        className={`fixed md:relative right-0 top-0 h-full w-full md:w-1/3 bg-parchment-50 border-l border-parchment-400 shadow-2xl overflow-y-auto p-6 z-40 ${selectedRegion ? 'translate-x-0' : 'translate-x-full md:translate-x-0 md:hidden'}`}
        initial={false}
        animate={{ x: selectedRegion ? 0 : '100%' }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
        style={{ position: 'fixed', right: 0, top: 0, bottom: 0 }} // Force fix for mobile overlay
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

export default Atlas;