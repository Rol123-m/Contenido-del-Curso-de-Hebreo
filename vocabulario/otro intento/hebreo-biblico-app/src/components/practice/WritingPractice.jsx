import React, { useState, useEffect } from 'react';
import { Check, X, ArrowRight } from 'lucide-react';

export default function WritingPractice({ words, stats, setStats }) {
  const [currentWord, setCurrentWord] = useState(null);
  const [input, setInput] = useState('');
  const [feedback, setFeedback] = useState(null);
  const [answered, setAnswered] = useState(false);
  const [correctAnswers, setCorrectAnswers] = useState(0);
  const [totalQuestions, setTotalQuestions] = useState(0);

  useEffect(() => {
    if (words.length > 0) {
      generateQuestion();
    }
  }, [words]);

  const generateQuestion = () => {
    const randomWord = words[Math.floor(Math.random() * words.length)];
    setCurrentWord(randomWord);
    setInput('');
    setFeedback(null);
    setAnswered(false);
    setTotalQuestions(prev => prev + 1);
  };

  const removeAccents = (str) => {
    return str.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
  };

  const checkAnswer = () => {
    if (answered || !currentWord) return;

    const userAnswer = input.toLowerCase().trim();
    const correctMeanings = currentWord.meaning.toLowerCase().split(',').map(m => m.trim());
    
    let isCorrect = false;

    for (const correctMeaning of correctMeanings) {
      const correctWords = correctMeaning.split(/[\s,]+/).filter(w => w.length > 0);
      const inputWords = userAnswer.split(/[\s,]+/).filter(w => w.length > 0);

      if (inputWords.length === 0) continue;

      let allWordsMatch = true;

      for (const inputWord of inputWords) {
        if (inputWord.length < 3) continue;

        let wordMatch = false;
        for (const correctWord of correctWords) {
          if (removeAccents(inputWord) === removeAccents(correctWord)) {
            wordMatch = true;
            break;
          }
        }

        if (!wordMatch) {
          allWordsMatch = false;
          break;
        }
      }

      if (allWordsMatch && inputWords.length > 0) {
        isCorrect = true;
        break;
      }
    }

    setAnswered(true);

    if (isCorrect) {
      setCorrectAnswers(prev => prev + 1);
      setFeedback({ type: 'correct', message: '¡Correcto! Muy bien.' });
      
      setStats(prev => ({
        ...prev,
        practiceStats: {
          ...prev.practiceStats,
          writing: {
            ...prev.practiceStats.writing,
            correct: prev.practiceStats.writing.correct + 1
          }
        }
      }));
    } else {
      setFeedback({ 
        type: 'incorrect', 
        message: `Incorrecto. Significado: ${currentWord.meaning}` 
      });
    }

    setStats(prev => ({
      ...prev,
      practiceStats: {
        ...prev.practiceStats,
        writing: {
          ...prev.practiceStats.writing,
          total: prev.practiceStats.writing.total + 1
        }
      },
      totalSessions: prev.totalSessions + 1
    }));
  };

  if (!currentWord) return null;

  return (
    <div className="max-w-2xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-xl font-semibold text-gray-800">Práctica de Escritura</h3>
        <div className="flex items-center gap-2 bg-green-100 px-4 py-2 rounded-full">
          <Check className="w-5 h-5 text-green-600" />
          <span className="font-bold text-green-600">
            {correctAnswers}/{totalQuestions}
          </span>
        </div>
      </div>

      <div className="text-center mb-8">
        <div className="hebrew-word text-6xl mb-2">{currentWord.hebrew}</div>
        <div className="transliteration text-xl text-gray-600">
          {currentWord.transliteration}
        </div>
        <p className="text-gray-500 mt-4">Escribe el significado:</p>
      </div>

      <div className="flex gap-3">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && !answered && checkAnswer()}
          disabled={answered}
          placeholder="Ej: hombre, humanidad, Adán"
          className="flex-1 px-4 py-3 rounded-xl border border-gray-200 
                   focus:ring-2 focus:ring-blue-500 outline-none
                   disabled:bg-gray-100 disabled:cursor-not-allowed"
        />
        <button
          onClick={checkAnswer}
          disabled={answered || !input.trim()}
          className="px-6 py-3 bg-blue-600 text-white rounded-xl
                   hover:bg-blue-700 transition-colors disabled:opacity-50
                   disabled:cursor-not-allowed flex items-center gap-2"
        >
          <Check className="w-5 h-5" /> Comprobar
        </button>
      </div>

      {feedback && (
        <div className={`mt-4 p-4 rounded-xl ${
          feedback.type === 'correct' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
        }`}>
          <div className="flex items-center gap-2">
            {feedback.type === 'correct' ? (
              <Check className="w-5 h-5" />
            ) : (
              <X className="w-5 h-5" />
            )}
            <p className="font-medium">{feedback.message}</p>
          </div>
        </div>
      )}

      {answered && (
        <div className="text-center mt-8">
          <button
            onClick={generateQuestion}
            className="btn-primary flex items-center gap-2 mx-auto"
          >
            Siguiente Palabra <ArrowRight className="w-5 h-5" />
          </button>
        </div>
      )}
    </div>
  );
}