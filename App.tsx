import React, { useState } from 'react';
import Navigation from './components/Navigation';
import Timeline from './components/Timeline';
import Atlas from './components/Atlas';
import Codex from './components/Codex';
import Archive from './components/Archive';
import Profiles from './components/Profiles';
import Dashboard from './components/Dashboard';
import Encyclopedia from './components/Encyclopedia';
import { View } from './types';
import { motion, AnimatePresence } from 'framer-motion';

const App: React.FC = () => {
  const [currentView, setCurrentView] = useState<View>('timeline');

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

export default App;