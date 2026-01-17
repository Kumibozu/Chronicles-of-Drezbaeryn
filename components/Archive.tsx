import React from 'react';
import { ARTIFACTS } from '../constants';

const Archive: React.FC = () => {
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
               {/* Placeholder for artifact image */}
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

export default Archive;