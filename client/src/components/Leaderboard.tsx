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
          <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-amber-400 to-yellow-600 text-slate-950 font-black flex items-center justify-center text-xs shadow-lg shadow-yellow-500/30 border border-yellow-200">
            <Crown className="w-4 h-4 fill-current" />
          </div>
        );
      case 2:
        return (
          <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-slate-200 to-slate-400 text-slate-950 font-black flex items-center justify-center text-xs shadow-md border border-slate-100">
            2
          </div>
        );
      case 3:
        return (
          <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-amber-700 to-amber-900 text-amber-100 font-black flex items-center justify-center text-xs shadow-md border border-amber-600">
            3
          </div>
        );
      default:
        return (
          <div className="w-7 h-7 rounded-lg bg-slate-800/80 text-slate-400 font-bold flex items-center justify-center text-xs border border-white/5">
            {rank}
          </div>
        );
    }
  };

  return (
    <div className={`w-full ${isCompact ? 'max-w-md' : 'max-w-xl'} mx-auto`}>
      <div className="flex items-center justify-between mb-3 px-1">
        <h3 className="text-sm font-black uppercase tracking-wider text-purple-300 flex items-center gap-2">
          <Trophy className="w-4 h-4 text-yellow-400" />
          <span>Live Arena Standings</span>
        </h3>
        <span className="text-xs font-mono text-slate-400">
          {entries.length} Challenger{entries.length !== 1 ? 's' : ''}
        </span>
      </div>

      <div className="space-y-2">
        {entries.map((player) => {
          const isMe = player.playerId === myPlayerId;

          return (
            <div
              key={player.playerId}
              className={`p-3 sm:p-4 rounded-2xl flex items-center justify-between gap-3 transition-all duration-300 ${
                isMe
                  ? 'bg-purple-900/40 border border-purple-500/50 shadow-[0_0_20px_rgba(168,85,247,0.25)]'
                  : 'glass-card hover:bg-slate-800/40 border-white/5'
              }`}
            >
              {/* Left Rank & Avatar */}
              <div className="flex items-center gap-3 min-w-0">
                {getRankBadge(player.rank)}
                <Avatar seed={player.avatarSeed} size="sm" isHost={player.isHost} />

                <div className="min-w-0">
                  <div className="flex items-center gap-1.5">
                    <span className={`font-bold text-sm sm:text-base truncate ${isMe ? 'text-white' : 'text-slate-200'}`}>
                      {player.nickname}
                    </span>
                    {isMe && (
                      <span className="text-[10px] bg-purple-500/40 text-purple-200 font-black px-1.5 py-0.2 rounded-md uppercase tracking-wider">
                        YOU
                      </span>
                    )}
                  </div>

                  {/* Streak & accuracy pill */}
                  <div className="flex items-center gap-2 text-xs text-slate-400">
                    <span>{player.correctAnswers} correct</span>
                    {player.streak > 1 && (
                      <span className="flex items-center gap-0.5 text-amber-400 font-bold">
                        <Flame className="w-3 h-3 fill-amber-400 text-amber-500" />
                        {player.streak} streak
                      </span>
                    )}
                  </div>
                </div>
              </div>

              {/* Right: Score and Round Points */}
              <div className="flex items-center gap-3 shrink-0">
                {player.pointsEarnedLastRound !== undefined && player.pointsEarnedLastRound > 0 && (
                  <span className="text-xs font-bold text-emerald-400 bg-emerald-950/60 border border-emerald-500/30 px-2 py-0.5 rounded-full animate-pulse">
                    +{player.pointsEarnedLastRound}
                  </span>
                )}

                <div className="text-right">
                  <div className="text-base sm:text-lg font-black font-mono tracking-tight text-cyan-300">
                    {player.score.toLocaleString()}
                  </div>
                  <span className="text-[10px] uppercase font-bold text-slate-500 tracking-wider">PTS</span>
                </div>

                {/* Position shift */}
                {player.positionChange !== undefined && (
                  <div className="w-5 flex items-center justify-center">
                    {player.positionChange > 0 ? (
                      <ArrowUp className="w-4 h-4 text-emerald-400" />
                    ) : player.positionChange < 0 ? (
                      <ArrowDown className="w-4 h-4 text-rose-400" />
                    ) : (
                      <Minus className="w-3.5 h-3.5 text-slate-600" />
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
