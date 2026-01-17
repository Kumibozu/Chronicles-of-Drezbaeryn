import React from 'react';
import { FACTIONS } from '../constants';
import { Shield, Flag, Coins, Crown, Landmark } from 'lucide-react';

const Codex: React.FC = () => {
  const getIcon = (iconName: string) => {
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

export default Codex;