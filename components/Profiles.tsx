import React from 'react';
import { CHARACTERS } from '../constants';

const Profiles: React.FC = () => {
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

export default Profiles;