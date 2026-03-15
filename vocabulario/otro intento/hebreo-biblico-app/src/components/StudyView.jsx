import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, RotateCcw, Check, Minus, RotateCw } from 'lucide-react';
import { VOCABULARY } from '../config/vocabulary';

export default function StudyView({ stats, setStats }) {
  const [currentWeek, setCurrentWeek] = useState(1);
  const [currentCardIndex, setCurrentCardIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);

  const weekWords = VOCABULARY[currentWeek] || [];
  const currentWord = weekWords[currentCardIndex];

  useEffect(() => {
    setIsFlipped(false);
  }, [currentCardIndex]);

  const navigateCard = (direction) => {
    if (direction === 'next') {
      setCurrentCardIndex((prev) => (prev + 1) % weekWords.length);
    } else {
      setCurrentCardIndex((prev) => (prev - 1 + weekWords.length) % weekWords.length);
    }
  };

  const markWord = (level) => {
    if (!currentWord) return;

    const wordKey = `${currentWord.hebrew}_${currentWeek}`;
    
    setStats(prev => {
      const newStats = { ...prev };
      newStats.wordsMastered[wordKey] = level;
      newStats.masteryLevels[level] = (newStats.masteryLevels[level] || 0) + 1;
      
      const masteredInWeek = weekWords.filter((w, i) => {
        const key = `${w.hebrew}_${currentWeek}`;
        return newStats.wordsMastered[key];
      }).length;
      
      newStats.weekProgress[currentWeek] = (masteredInWeek / weekWords.length) * 100;
      
      return newStats;
    });

    setTimeout(() => navigateCard('next'), 300);
  };

  if (!currentWord) return null;

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <label className="text-gray-700 font-medium">Semana:</label>
        <select
          value={currentWeek}
          onChange={(e) => {
            setCurrentWeek(parseInt(e.target.value));
            setCurrentCardIndex(0);
          }}
          className="px-4 py-2 rounded-xl border border-gray-200 bg-white focus:ring-2 focus:ring-blue-500 outline-none"
        >
          {[1].map(week => (
            <option key={week} value={week}>Semana {week}</option>
          ))}
        </select>
      </div>

      <div className="max-w-2xl mx-auto">
        <div
          className={`flashcard ${isFlipped ? 'flipped' : ''}`}
          onClick={() => setIsFlipped(!isFlipped)}
        >
          <div className="card-front">
            <span className="hebrew-word">{currentWord.hebrew}</span>
            <span className="transliteration">{currentWord.transliteration}</span>
          </div>
          <div className="card-back">
            <span className="meaning">{currentWord.meaning}</span>
            <span className="occurrences">Ocurrencias: {currentWord.occurrences}</span>
          </div>
        </div>

        <div className="text-center mt-4 text-gray-600">
          {currentCardIndex + 1} / {weekWords.length}
        </div>

        <div className="flex justify-center gap-4 mt-6">
          <button
            onClick={() => navigateCard('prev')}
            className="w-12 h-12 rounded-full bg-white shadow-md hover:shadow-lg 
                     flex items-center justify-center transition-all hover:scale-110"
          >
            <ChevronLeft className="w-6 h-6 text-gray-600" />
          </button>
          <button
            onClick={() => setIsFlipped(!isFlipped)}
            className="w-12 h-12 rounded-full bg-white shadow-md hover:shadow-lg 
                     flex items-center justify-center transition-all hover:scale-110"
          >
            <RotateCcw className="w-6 h-6 text-gray-600" />
          </button>
          <button
            onClick={() => navigateCard('next')}
            className="w-12 h-12 rounded-full bg-white shadow-md hover:shadow-lg 
                     flex items-center justify-center transition-all hover:scale-110"
          >
            <ChevronRight className="w-6 h-6 text-gray-600" />
          </button>
        </div>

        <div className="flex gap-3 mt-8">
          <button
            onClick={() => markWord('easy')}
            className="mastery-btn easy flex items-center justify-center gap-2"
          >
            <Check className="w-5 h-5" /> Fácil
          </button>
          <button
            onClick={() => markWord('medium')}
            className="mastery-btn medium flex items-center justify-center gap-2"
          >
            <Minus className="w-5 h-5" /> Medio
          </button>
          <button
            onClick={() => markWord('hard')}
            className="mastery-btn hard flex items-center justify-center gap-2"
          >
            <RotateCw className="w-5 h-5" /> Difícil
          </button>
        </div>
      </div>
    </div>
  );
}