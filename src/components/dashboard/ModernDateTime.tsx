
import { useState, useEffect } from 'react';
import { Calendar, Clock } from 'lucide-react';

const ModernDateTime = () => {
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('fr-FR', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('fr-FR', {
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit'
    });
  };

  return (
    <div className="bg-gradient-to-r from-slate-800/50 to-slate-700/30 backdrop-blur-xl border border-blue-500/20 rounded-xl p-6 shadow-lg">
      <div className="flex items-center space-x-4">
        <div className="flex flex-col items-center">
          <Calendar className="w-8 h-8 text-blue-400 mb-2" />
          <div className="text-center">
            <p className="text-slate-400 text-xs uppercase tracking-wider">Date</p>
            <p className="text-white font-semibold text-sm capitalize">
              {formatDate(currentTime)}
            </p>
          </div>
        </div>
        
        <div className="w-px h-16 bg-gradient-to-b from-transparent via-blue-500/30 to-transparent"></div>
        
        <div className="flex flex-col items-center">
          <Clock className="w-8 h-8 text-purple-400 mb-2" />
          <div className="text-center">
            <p className="text-slate-400 text-xs uppercase tracking-wider">Heure</p>
            <p className="text-white font-bold text-xl font-mono">
              {formatTime(currentTime)}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ModernDateTime;
