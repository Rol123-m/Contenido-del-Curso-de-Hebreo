import React, { useState, useEffect } from 'react';
import { Link2, RefreshCw } from 'lucide-react';

export default function MatchingGame({ words, stats, setStats }) {
  const [hebrewItems, setHebrewItems] = useState([]);
  const [meaningItems, setMeaningItems] = useState([]);
  const [selectedHebrew, setSelectedHebrew] = useState(null);
  const [matchedPairs, setMatchedPairs] = useState([]);
  const [gameCompleted, setGameCompleted] = useState(false);

  useEffect(() => {
    initializeGame();
  }, [words]);

  const initializeGame = () => {
    const selectedWords = shuffleArray([...words]).slice(0, Math.min(6, words.length));
    setHebrewItems(shuffleArray([...selectedWords]));
    setMeaningItems(shuffleArray([...selectedWords]));
    setMatchedPairs([]);
    setSelectedHebrew(null);
    setGameCompleted(false);
    
    setStats(prev => ({
      ...prev,
      practiceStats: {
        ...prev.practiceStats,
        matching: {
          ...prev.practiceStats.matching,
          gamesPlayed: prev.practiceStats.matching.gamesPlayed + 1
        }
      }
    }));
  };

  const shuffleArray = (array) => {
    const newArray = [...array];
    for (let i = newArray.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
    }
    return newArray;
  };

  const handleHebrewClick = (word, index) => {
    if (matchedPairs.includes(word.hebrew)) return;
    setSelectedHebrew({ word, index });
  };

  const handleMeaningClick = (word, index) => {
    if (!selectedHebrew || matchedPairs.includes(word.meaning)) return;

    if (selectedHebrew.word.meaning === word.meaning) {
      setMatchedPairs(prev => [...prev, selectedHebrew.word.hebrew, word.meaning]);
      
      if (matchedPairs.length + 2 === hebrewItems.length * 2) {
        setGameCompleted(true);
        setStats(prev => ({
          ...prev,
          practiceStats: {
            ...prev.practiceStats,
            matching: {
              ...prev.practiceStats.matching,
              gamesCompleted: prev.practiceStats.matching.gamesCompleted + 1
            }
          }
        }));
      }
    }
    
    setSelectedHebrew(null);
  };

  if (hebrewItems.length === 0) return null;

  return (
    <div className="max-w-4xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-xl font-semibold text-gray-800">Juego de Emparejar</h3>
        <div className="flex items-center gap-2 bg-purple-100 px-4 py-2 rounded-full">
          <Link2 className="w-5 h-5 text-purple-600" />
          <span className="font-bold text-purple-600">
            {matchedPairs.length / 2}/{hebrewItems.length}
          </span>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-8">
        <div className="space-y-4">
          <h4 className="text-center font-semibold text-gray-700">Hebreo</h4>
          {hebrewItems.map((word, index) => (
            <div
              key={`heb-${index}`}
              onClick={() => handleHebrewClick(word, index)}
              className={`matching-item ${
                matchedPairs.includes(word.hebrew) ? 'matched' : ''
              } ${
                selectedHebrew?.index === index && !matchedPairs.includes(word.hebrew) 
                  ? 'selected' 
                  : ''
              }`}
            >
              <span className="hebrew-text text-xl">{word.hebrew}</span>
            </div>
          ))}
        </div>

        <div className="space-y-4">
          <h4 className="text-center font-semibold text-gray-700">Significado</h4>
          {meaningItems.map((word, index) => (
            <div
              key={`mean-${index}`}
              onClick={() => handleMeaningClick(word, index)}
              className={`matching-item ${
                matchedPairs.includes(word.meaning) ? 'matched' : ''
              }`}
            >
              <span className="text-gray-700">{word.meaning}</span>
            </div>
          ))}
        </div>
      </div>

      {gameCompleted && (
        <div className="text-center mt-8 p-6 bg-green-100 rounded-xl">
          <p className="text-xl font-bold text-green-700 mb-4">
            ¡Felicidades! Completaste el juego
          </p>
          <button
            onClick={initializeGame}
            className="btn-primary flex items-center gap-2 mx-auto"
          >
            <RefreshCw className="w-5 h-5" /> Nuevo Juego
          </button>
        </div>
      )}

      {!gameCompleted && (
        <div className="text-center mt-8">
          <button
            onClick={initializeGame}
            className="btn-secondary flex items-center gap-2 mx-auto"
          >
            <RefreshCw className="w-5 h-5" /> Reiniciar
          </button>
        </div>
      )}
    </div>
  );
}