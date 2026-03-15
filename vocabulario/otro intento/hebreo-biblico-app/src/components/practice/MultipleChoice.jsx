import React, { useState, useEffect } from 'react';
import { CheckCircle } from 'lucide-react';

export default function MultipleChoice({ words, stats, setStats }) {
  const [currentWord, setCurrentWord] = useState(null);
  const [options, setOptions] = useState([]);
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
    
    let newOptions = [randomWord];
    const otherWords = words.filter(w => w !== randomWord);
    
    while (newOptions.length < 4 && otherWords.length > 0) {
      const randomIndex = Math.floor(Math.random() * otherWords.length);
      const randomOption = otherWords[randomIndex];
      if (!newOptions.includes(randomOption)) {
        newOptions.push(randomOption);
      }
    }
    
    setOptions(shuffleArray(newOptions));
    setAnswered(false);
    setTotalQuestions(prev => prev + 1);
  };

  const handleAnswer = (selectedOption, isCorrect) => {
    if (answered) return;
    
    setAnswered(true);
    
    if (isCorrect) {
      setCorrectAnswers(prev => prev + 1);
      setStats(prev => ({
        ...prev,
        practiceStats: {
          ...prev.practiceStats,
          multipleChoice: {
            ...prev.practiceStats.multipleChoice,
            correct: prev.practiceStats.multipleChoice.correct + 1
          }
        }
      }));
    }
    
    setStats(prev => ({
      ...prev,
      practiceStats: {
        ...prev.practiceStats,
        multipleChoice: {
          ...prev.practiceStats.multipleChoice,
          total: prev.practiceStats.multipleChoice.total + 1
        }
      },
      totalSessions: prev.totalSessions + 1
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

  if (!currentWord) return null;

  return (
    <div className="max-w-2xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-xl font-semibold text-gray-800">Selección Múltiple</h3>
        <div className="flex items-center gap-2 bg-blue-100 px-4 py-2 rounded-full">
          <CheckCircle className="w-5 h-5 text-blue-600" />
          <span className="font-bold text-blue-600">
            {correctAnswers}/{totalQuestions}
          </span>
        </div>
      </div>

      <div className="text-center mb-8">
        <div className="hebrew-word text-6xl mb-2">{currentWord.hebrew}</div>
        <div className="transliteration text-xl text-gray-600">
          {currentWord.transliteration}
        </div>
        <p className="text-gray-500 mt-4">¿Cuál es el significado?</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {options.map((option, index) => (
          <button
            key={index}
            onClick={() => handleAnswer(option, option.meaning === currentWord.meaning)}
            disabled={answered}
            className={`option-btn ${
              answered && option.meaning === currentWord.meaning ? 'correct' : ''
            } ${
              answered && option.meaning !== currentWord.meaning ? 'incorrect' : ''
            }`}
          >
            {option.meaning}
          </button>
        ))}
      </div>

      {answered && (
        <div className="text-center mt-8">
          <button
            onClick={generateQuestion}
            className="btn-primary"
          >
            Siguiente Pregunta
          </button>
        </div>
      )}
    </div>
  );
}