import React from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar, Legend } from 'recharts';

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

const Dashboard: React.FC = () => {
  return (
    <div className="max-w-6xl mx-auto p-4 md:p-8 pt-6 pb-24">
      <div className="text-center mb-12">
        <h2 className="text-4xl font-display text-parchment-900 mb-4">Cold War Dashboard</h2>
        <p className="font-serif italic text-parchment-700">Strategic analysis of the geopolitical stalemate.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
        {/* Influence Chart */}
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

        {/* Comparison Radar */}
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

      {/* Proxy Conflict Map Placeholder UI */}
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

export default Dashboard;