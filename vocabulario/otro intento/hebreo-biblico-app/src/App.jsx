import React, { useState, useEffect } from 'react';
import { BookOpen, PenTool, BarChart3, Flame } from 'lucide-react';
import StudyView from './components/StudyView';
import PracticeView from './components/PracticeView';
import StatsView from './components/StatsView';
import { loadStats, saveStats } from './utils/storage';

function App() {
  const [currentView, setCurrentView] = useState('study');
  const [stats, setStats] = useState(null);

  useEffect(() => {
    const loadedStats = loadStats();
    setStats(loadedStats);
  }, []);

  useEffect(() => {
    if (stats) {
      saveStats(stats);
    }
  }, [stats]);

  const navItems = [
    { id: 'study', icon: BookOpen, label: 'Estudiar' },
    { id: 'practice', icon: PenTool, label: 'Practicar' },
    { id: 'stats', icon: BarChart3, label: 'Estadísticas' },
  ];

  if (!stats) return null;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-600 to-purple-700">
      <div className="max-w-7xl mx-auto px-4 py-6">
        {/* Header */}
        <header className="glass-effect rounded-2xl p-4 mb-6 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <img 
              src="https://i.postimg.cc/wMJ2bCgV/mas-logos.jpg" 
              alt="Vivos para Servir" 
              className="w-12 h-12 rounded-xl object-cover"
            />
            <h1 className="text-2xl font-bold text-gray-800">Hebreo Bíblico</h1>
          </div>
          <div className="flex items-center gap-2 bg-orange-100 px-4 py-2 rounded-full">
            <Flame className="w-5 h-5 text-orange-500" />
            <span className="font-bold text-orange-600">{stats.streak}</span>
          </div>
        </header>

        {/* Navigation */}
        <nav className="glass-effect rounded-2xl p-2 mb-6 flex justify-around">
          {navItems.map(({ id, icon: Icon, label }) => (
            <button
              key={id}
              onClick={() => setCurrentView(id)}
              className={`nav-btn ${currentView === id ? 'active' : ''}`}
            >
              <Icon className="w-6 h-6 mb-1" />
              <span className="text-sm">{label}</span>
            </button>
          ))}
        </nav>

        {/* Main Content */}
        <main className="glass-effect rounded-2xl p-6">
          {currentView === 'study' && (
            <StudyView stats={stats} setStats={setStats} />
          )}
          {currentView === 'practice' && (
            <PracticeView stats={stats} setStats={setStats} />
          )}
          {currentView === 'stats' && (
            <StatsView stats={stats} setStats={setStats} />
          )}
        </main>
      </div>
    </div>
  );
}

export default App;