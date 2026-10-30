import React from 'react';

interface TimerBarProps {
  remaining: number;
  total: number;
  compact?: boolean;
}

export const TimerBar: React.FC<TimerBarProps> = ({ remaining, total, compact = false }) => {
  const percentage = Math.max(0, Math.min(100, (remaining / (total || 1)) * 100));
  const isUrgent = remaining <= 4;
  const isWarning = remaining <= 7 && remaining > 4;

  const colorClass = isUrgent
    ? 'text-rose-500 from-rose-500 to-red-600'
    : isWarning
    ? 'text-amber-400 from-amber-400 to-orange-500'
    : 'text-cyan-400 from-cyan-400 to-purple-500';

  const strokeColor = isUrgent ? '#f43f5e' : isWarning ? '#fbbf24' : '#06b6d4';

  const radius = 26;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (percentage / 100) * circumference;

  const sizeClasses = compact
    ? 'w-12 h-12 sm:w-16 sm:h-16'
    : 'w-14 h-14 sm:w-18 sm:h-18 md:w-20 md:h-20';

  return (
    <div className="flex flex-col items-center">
      {/* Circular Timer Ring */}
      <div className={`relative ${sizeClasses} flex items-center justify-center shrink-0`}>
        <svg viewBox="0 0 64 64" className="w-full h-full transform -rotate-90">
          {/* Background circle */}
          <circle
            cx="32"
            cy="32"
            r={radius}
            stroke="rgba(255, 255, 255, 0.1)"
            strokeWidth="4.5"
            fill="transparent"
          />
          {/* Active animated countdown circle */}
          <circle
            cx="32"
            cy="32"
            r={radius}
            stroke={strokeColor}
            strokeWidth="4.5"
            fill="transparent"
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
            strokeLinecap="round"
            className="transition-all duration-1000 ease-linear"
          />
        </svg>

        {/* Center content */}
        <div className={`absolute inset-0 flex flex-col items-center justify-center ${isUrgent ? 'animate-bounce' : ''}`}>
          <span className={`text-base sm:text-xl md:text-2xl font-black font-mono tracking-tighter ${colorClass.split(' ')[0]}`}>
            {remaining}
          </span>
          <span className="text-[7px] sm:text-[9px] uppercase tracking-widest text-slate-400 font-bold -mt-0.5 sm:-mt-1">SEC</span>
        </div>
      </div>

      {/* Linear Micro Bar */}
      <div className="w-full max-w-[140px] sm:max-w-md h-1 sm:h-1.5 bg-slate-800/80 rounded-full overflow-hidden mt-1 sm:mt-2 border border-white/5">
        <div
          className={`h-full bg-gradient-to-r ${colorClass} transition-all duration-1000 ease-linear rounded-full`}
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
};
