import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ERAS } from '../constants';
import { Era } from '../types';
import { ChevronDown } from 'lucide-react';

const Timeline: React.FC = () => {
  const [selectedEra, setSelectedEra] = useState<string | null>(null);

  const toggleEra = (id: string) => {
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
        {ERAS.map((era, index) => (
          <div key={era.id} className="relative pl-8 md:pl-12">
            {/* Dot on the line */}
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

export default Timeline;