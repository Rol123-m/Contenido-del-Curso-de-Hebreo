import React from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';
import { Calendar, Clock, CheckCircle, TrendingUp, Trash2 } from 'lucide-react';
import { CONFIG } from '../config/vocabulary';

ChartJS.register(ArcElement, Tooltip, Legend);

export default function StatsView({ stats, setStats }) {
  const resetStats = () => {
    if (window.confirm('¿Estás seguro de que quieres resetear todas las estadísticas?')) {
      const newStats = {
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
        newStats.weekProgress[week] = 0;
      }

      setStats(newStats);
    }
  };

  const chartData = {
    labels: ['Fácil', 'Medio', 'Difícil'],
    datasets: [
      {
        data: [
          stats.masteryLevels.easy || 0,
          stats.masteryLevels.medium || 0,
          stats.masteryLevels.hard || 0,
        ],
        backgroundColor: CONFIG.CHART_COLORS,
        borderWidth: 0,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'bottom',
        labels: {
          font: {
            size: 14,
          },
        },
      },
    },
  };

  const statCards = [
    { icon: Calendar, label: 'Sesiones', value: stats.totalSessions, color: 'blue' },
    { icon: Clock, label: 'Minutos', value: Math.floor(stats.totalStudyTime / 60), color: 'purple' },
    { icon: CheckCircle, label: 'Dominadas', value: Object.keys(stats.wordsMastered).length, color: 'green' },
    { icon: TrendingUp, label: 'Racha', value: stats.streak, color: 'orange' },
  ];

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <h3 className="text-2xl font-bold text-gray-800">Tu Progreso</h3>
        <button
          onClick={resetStats}
          className="p-3 bg-red-100 text-red-600 rounded-xl hover:bg-red-200 
                   transition-colors duration-300"
        >
          <Trash2 className="w-5 h-5" />
        </button>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {statCards.map(({ icon: Icon, label, value, color }) => (
          <div key={label} className="stat-card">
            <Icon className={`w-8 h-8 text-${color}-500 mx-auto mb-2`} />
            <div className="text-2xl font-bold text-gray-800">{value}</div>
            <div className="text-sm text-gray-600">{label}</div>
          </div>
        ))}
      </div>

      <div className="glass-effect p-6 rounded-xl">
        <h4 className="text-lg font-semibold text-gray-800 mb-4">Progreso por Semana</h4>
        <div className="space-y-4">
          {[1].map(week => (
            <div key={week} className="flex items-center gap-4">
              <span className="text-gray-600 w-20">Semana {week}</span>
              <div className="flex-1 progress-bar-container">
                <div 
                  className="progress-bar-fill" 
                  style={{ width: `${stats.weekProgress[week] || 0}%` }}
                />
              </div>
              <span className="text-gray-600 font-medium">
                {Math.round(stats.weekProgress[week] || 0)}%
              </span>
            </div>
          ))}
        </div>
      </div>

      <div className="glass-effect p-6 rounded-xl">
        <h4 className="text-lg font-semibold text-gray-800 mb-4">Nivel de Dominio</h4>
        <div className="h-64">
          <Doughnut data={chartData} options={chartOptions} />
        </div>
      </div>

      <div className="glass-effect p-6 rounded-xl">
        <h4 className="text-lg font-semibold text-gray-800 mb-4">Estadísticas de Práctica</h4>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="text-center p-4 bg-blue-50 rounded-xl">
            <div className="text-2xl font-bold text-blue-600">
              {Math.round((stats.practiceStats.multipleChoice.correct / 
                (stats.practiceStats.multipleChoice.total || 1)) * 100)}%
            </div>
            <div className="text-sm text-gray-600">Múltiple Choice</div>
            <div className="text-xs text-gray-500">
              ({stats.practiceStats.multipleChoice.correct}/{stats.practiceStats.multipleChoice.total})
            </div>
          </div>
          <div className="text-center p-4 bg-purple-50 rounded-xl">
            <div className="text-2xl font-bold text-purple-600">
              {Math.round((stats.practiceStats.matching.gamesCompleted / 
                (stats.practiceStats.matching.gamesPlayed || 1)) * 100)}%
            </div>
            <div className="text-sm text-gray-600">Emparejar</div>
            <div className="text-xs text-gray-500">
              ({stats.practiceStats.matching.gamesCompleted}/{stats.practiceStats.matching.gamesPlayed})
            </div>
          </div>
          <div className="text-center p-4 bg-green-50 rounded-xl">
            <div className="text-2xl font-bold text-green-600">
              {Math.round((stats.practiceStats.writing.correct / 
                (stats.practiceStats.writing.total || 1)) * 100)}%
            </div>
            <div className="text-sm text-gray-600">Escritura</div>
            <div className="text-xs text-gray-500">
              ({stats.practiceStats.writing.correct}/{stats.practiceStats.writing.total})
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}