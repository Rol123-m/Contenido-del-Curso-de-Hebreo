import { CONFIG } from '../config/vocabulary';

export const loadStats = () => {
  const storedStats = localStorage.getItem(CONFIG.STORAGE_KEY);
  
  if (storedStats) {
    return JSON.parse(storedStats);
  }
  
  const initialStats = {
    totalSessions: 0,
    totalStudyTime: 0,
    sessionStartTime: Date.now(),
    wordsMastered: {},
    weekProgress: {},
    masteryLevels: { easy: 0, medium: 0, hard: 0 },
    streak: 0,
    lastStudyDate: null,
    practiceStats: {
      multipleChoice: { correct: 0, total: 0 },
      matching: { gamesPlayed: 0, gamesCompleted: 0 },
      writing: { correct: 0, total: 0 }
    }
  };

  for (let week = 1; week <= CONFIG.TOTAL_WEEKS; week++) {
    initialStats.weekProgress[week] = 0;
  }
  
  return initialStats;
};

export const saveStats = (stats) => {
  localStorage.setItem(CONFIG.STORAGE_KEY, JSON.stringify(stats));
};