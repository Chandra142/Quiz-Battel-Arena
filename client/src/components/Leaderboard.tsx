import React from 'react';
import { Trophy, Flame, ArrowUp, ArrowDown, Minus, Crown } from 'lucide-react';
import { LeaderboardEntry } from '../types';
import { Avatar } from './Avatar';

interface LeaderboardProps {
  entries: LeaderboardEntry[];
  myPlayerId?: string;
  isCompact?: boolean;
}

export const Leaderboard: React.FC<LeaderboardProps> = ({
  entries,
  myPlayerId,
  isCompact = false
}) => {
  const getRankBadge = (rank: number) => {
    switch (rank) {
      case 1:
        return (
          <div className="w-6 h-6 sm:w-7 sm:h-7 rounded-md sm:rounded-lg bg-gradient-to-br from-amber-400 to-yellow-600 text-slate-950 font-black flex items-center justify-center text-[10px] sm:text-xs shadow-lg shadow-yellow-500/30 border border-yellow-200 shrink-0">
            <Crown className="w-3.5 h-3.5 fill-current" />
          </div>
        );
      case 2:
        return (
          <div className="w-6 h-6 sm:w-7 sm:h-7 rounded-md sm:rounded-lg bg-gradient-to-br from-slate-200 to-slate-400 text-slate-950 font-black flex items-center justify-center text-[10px] sm:text-xs shadow-md border border-slate-100 shrink-0">
            2
          </div>
        );
      case 3:
        return (
          <div className="w-6 h-6 sm:w-7 sm:h-7 rounded-md sm:rounded-lg bg-gradient-to-br from-amber-700 to-amber-900 text-amber-100 font-black flex items-center justify-center text-[10px] sm:text-xs shadow-md border border-amber-600 shrink-0">
            3
          </div>
        );
      default:
        return (
          <div className="w-6 h-6 sm:w-7 sm:h-7 rounded-md sm:rounded-lg bg-slate-800/80 text-slate-400 font-bold flex items-center justify-center text-[10px] sm:text-xs border border-white/5 shrink-0">
            {rank}
          </div>
        );
    }
  };

  return (
    <div className={`w-full ${isCompact ? 'max-w-md' : 'max-w-xl'} mx-auto`}>
      <div className="flex items-center justify-between mb-2.5 sm:mb-3 px-1">
        <h3 className="text-xs sm:text-sm font-black uppercase tracking-wider text-purple-300 flex items-center gap-1.5 sm:gap-2">
          <Trophy className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-yellow-400 shrink-0" />
          <span className="truncate">Live Arena Standings</span>
        </h3>
        <span className="text-[10px] sm:text-xs font-mono text-slate-400 shrink-0">
          {entries.length} Challenger{entries.length !== 1 ? 's' : ''}
        </span>
      </div>

      <div className="space-y-1.5 sm:space-y-2">
        {entries.map((player) => {
          const isMe = player.playerId === myPlayerId;

          return (
            <div
              key={player.playerId}
              className={`p-2.5 sm:p-3.5 rounded-xl sm:rounded-2xl flex items-center justify-between gap-2 sm:gap-3 transition-all duration-300 ${
                isMe
                  ? 'bg-purple-900/40 border border-purple-500/50 shadow-[0_0_20px_rgba(168,85,247,0.25)]'
                  : 'glass-card hover:bg-slate-800/40 border-white/5'
              }`}
            >
              {/* Left Rank & Avatar */}
              <div className="flex items-center gap-2 sm:gap-3 min-w-0 flex-1">
                {getRankBadge(player.rank)}
                <Avatar seed={player.avatarSeed} size="sm" isHost={player.isHost} />

                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-1 sm:gap-1.5">
                    <span className={`font-bold text-xs sm:text-base truncate max-w-[85px] xs:max-w-[130px] sm:max-w-[180px] ${isMe ? 'text-white' : 'text-slate-200'}`}>
                      {player.nickname}
                    </span>
                    {isMe && (
                      <span className="text-[8px] sm:text-[9px] bg-purple-500/40 text-purple-200 font-black px-1 sm:px-1.5 py-0.2 rounded uppercase shrink-0">
                        YOU
                      </span>
                    )}
                  </div>

                  {/* Streak & accuracy pill */}
                  <div className="flex items-center gap-1.5 sm:gap-2 text-[10px] sm:text-xs text-slate-400">
                    <span className="truncate">{player.correctAnswers} correct</span>
                    {player.streak > 1 && (
                      <span className="flex items-center gap-0.5 text-amber-400 font-bold shrink-0">
                        <Flame className="w-2.5 h-2.5 sm:w-3 sm:h-3 fill-amber-400 text-amber-500" />
                        <span>{player.streak}</span>
                      </span>
                    )}
                  </div>
                </div>
              </div>

              {/* Right: Score and Round Points */}
              <div className="flex items-center gap-1.5 sm:gap-3 shrink-0">
                {player.pointsEarnedLastRound !== undefined && player.pointsEarnedLastRound > 0 && (
                  <span className="text-[10px] sm:text-xs font-bold text-emerald-400 bg-emerald-950/60 border border-emerald-500/30 px-1.5 py-0.5 rounded-full animate-pulse shrink-0">
                    +{player.pointsEarnedLastRound}
                  </span>
                )}

                <div className="text-right shrink-0">
                  <div className="text-sm sm:text-base md:text-lg font-black font-mono tracking-tight text-cyan-300">
                    {player.score.toLocaleString()}
                  </div>
                  <span className="text-[8px] sm:text-[10px] uppercase font-bold text-slate-500 tracking-wider block -mt-0.5">PTS</span>
                </div>

                {/* Position shift */}
                {player.positionChange !== undefined && (
                  <div className="w-3.5 sm:w-5 flex items-center justify-center shrink-0">
                    {player.positionChange > 0 ? (
                      <ArrowUp className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-emerald-400" />
                    ) : player.positionChange < 0 ? (
                      <ArrowDown className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-rose-400" />
                    ) : (
                      <Minus className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-slate-600" />
                    )}
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
