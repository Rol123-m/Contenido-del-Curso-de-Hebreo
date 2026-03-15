import React, { useState } from 'react';
import { List, Link2, Keyboard } from 'lucide-react';
import { VOCABULARY } from '../config/vocabulary';
import MultipleChoice from './practice/MultipleChoice';
import MatchingGame from './practice/MatchingGame';
import WritingPractice from './practice/WritingPractice';

export default function PracticeView({ stats, setStats }) {
  const [currentWeek, setCurrentWeek] = useState(1);
  const [practiceMode, setPracticeMode] = useState('multiple');

  const weekWords = VOCABULARY[currentWeek] || [];

  const modes = [
    { id: 'multiple', icon: List, label: 'Múltiple' },
    { id: 'match', icon: Link2, label: 'Emparejar' },
    { id: 'write', icon: Keyboard, label: 'Escribir' },
  ];

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
        <div className="flex items-center gap-4">
          <label className="text-gray-700 font-medium">Semana:</label>
          <select
            value={currentWeek}
            onChange={(e) => setCurrentWeek(parseInt(e.target.value))}
            className="px-4 py-2 rounded-xl border border-gray-200 bg-white focus:ring-2 focus:ring-blue-500 outline-none"
          >
            {[1].map(week => (
              <option key={week} value={week}>Semana {week}</option>
            ))}
          </select>
        </div>

        <div className="flex gap-2">
          {modes.map(({ id, icon: Icon, label }) => (
            <button
              key={id}
              onClick={() => setPracticeMode(id)}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl transition-all duration-300
                ${practiceMode === id 
                  ? 'bg-blue-600 text-white shadow-lg' 
                  : 'bg-white text-gray-600 hover:bg-gray-50'}`}
            >
              <Icon className="w-5 h-5" />
              <span className="hidden sm:inline">{label}</span>
            </button>
          ))}
        </div>
      </div>

      <div className="mt-8">
        {practiceMode === 'multiple' && (
          <MultipleChoice words={weekWords} stats={stats} setStats={setStats} />
        )}
        {practiceMode === 'match' && (
          <MatchingGame words={weekWords} stats={stats} setStats={setStats} />
        )}
        {practiceMode === 'write' && (
          <WritingPractice words={weekWords} stats={stats} setStats={setStats} />
        )}
      </div>
    </div>
  );
}