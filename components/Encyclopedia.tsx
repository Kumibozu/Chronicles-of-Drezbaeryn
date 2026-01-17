import React, { useState } from 'react';
import { Search, Send, Sparkles } from 'lucide-react';
import { askArchivist } from '../services/geminiService';

const Encyclopedia: React.FC = () => {
  const [query, setQuery] = useState('');
  const [response, setResponse] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim()) return;

    setLoading(true);
    setResponse(null);
    
    // Simulate thinking delay for immersion if API is fast, or actual API call
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
               {/* Simple formatting for the AI response */}
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

export default Encyclopedia;