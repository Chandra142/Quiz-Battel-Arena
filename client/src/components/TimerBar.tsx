import React from 'react';
import { Clock } from 'lucide-react';

interface TimerBarProps {
  remaining: number;
  total: number;
}

export const TimerBar: React.FC<TimerBarProps> = ({ remaining, total }) => {
  const percentage = Math.max(0, Math.min(100, (remaining / (total || 1)) * 100));
  const isUrgent = remaining <= 4;
  const isWarning = remaining <= 7 && remaining > 4;

  const colorClass = isUrgent
    ? 'text-rose-500 from-rose-500 to-red-600'
    : isWarning
    ? 'text-amber-400 from-amber-400 to-orange-500'
    : 'text-cyan-400 from-cyan-400 to-purple-500';

  const strokeColor = isUrgent ? '#f43f5e' : isWarning ? '#fbbf24' : '#06b6d4';

  const radius = 28;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (percentage / 100) * circumference;

  return (
    <div className="flex flex-col items-center">
      {/* Circular Timer Ring */}
      <div className="relative w-20 h-20 flex items-center justify-center">
        <svg className="w-full h-full transform -rotate-90">
          {/* Background circle */}
          <circle
            cx="40"
            cy="40"
            r={radius}
            stroke="rgba(255, 255, 255, 0.1)"
            strokeWidth="5"
            fill="transparent"
          />
          {/* Active animated countdown circle */}
          <circle
            cx="40"
            cy="40"
            r={radius}
            stroke={strokeColor}
            strokeWidth="5"
            fill="transparent"
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
            strokeLinecap="round"
            className="transition-all duration-1000 ease-linear"
          />
        </svg>

        {/* Center content */}
        <div className={`absolute flex flex-col items-center justify-center ${isUrgent ? 'animate-bounce' : ''}`}>
          <span className={`text-2xl font-black font-mono tracking-tighter ${colorClass.split(' ')[0]}`}>
            {remaining}
          </span>
          <span className="text-[9px] uppercase tracking-widest text-slate-400 font-bold -mt-1">SEC</span>
        </div>
      </div>

      {/* Linear Micro Bar */}
      <div className="w-full max-w-md h-1.5 bg-slate-800/80 rounded-full overflow-hidden mt-2 border border-white/5">
        <div
          className={`h-full bg-gradient-to-r ${colorClass} transition-all duration-1000 ease-linear rounded-full`}
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
};
