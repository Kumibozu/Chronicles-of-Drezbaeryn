import React from 'react';
import { View } from '../types';
import { Scroll, Map, Book, Landmark, Users, Activity, Search } from 'lucide-react';

interface NavigationProps {
  currentView: View;
  setView: (view: View) => void;
}

const Navigation: React.FC<NavigationProps> = ({ currentView, setView }) => {
  const navItems: { id: View; label: string; icon: React.ReactNode }[] = [
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

export default Navigation;