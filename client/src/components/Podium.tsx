import React, { useEffect } from 'react';
import confetti from 'canvas-confetti';
import { Trophy, Crown, Medal, Share2, RotateCcw, Home, Sparkles, CheckCircle2 } from 'lucide-react';
import { LeaderboardEntry } from '../types';
import { Avatar } from './Avatar';
import { sound } from '../services/soundManager';

interface PodiumProps {
  entries: LeaderboardEntry[];
  myPlayerId: string;
  isHost: boolean;
  onPlayAgain: () => void;
  onReturnHome: () => void;
}

export const Podium: React.FC<PodiumProps> = ({
  entries,
  myPlayerId,
  isHost,
  onPlayAgain,
  onReturnHome
}) => {
  const winner = entries[0];
  const second = entries[1];
  const third = entries[2];

  useEffect(() => {
    // Fire celebratory confetti blast
    const count = 200;
    const defaults = {
      origin: { y: 0.7 }
    };

    function fire(particleRatio: number, opts: confetti.Options) {
      confetti({
        ...defaults,
        ...opts,
        particleCount: Math.floor(count * particleRatio)
      });
    }

    fire(0.25, {
      spread: 26,
      startVelocity: 55,
      colors: ['#ffd700', '#ff007f', '#00f0ff']
    });
    fire(0.2, {
      spread: 60,
      colors: ['#a855f7', '#6366f1', '#38bdf8']
    });
    fire(0.35, {
      spread: 100,
      decay: 0.91,
      scalar: 0.8
    });
    fire(0.1, {
      spread: 120,
      startVelocity: 25,
      decay: 0.92,
      colors: ['#ffd700', '#ffffff', '#ec4899']
    });
    fire(0.1, {
      spread: 120,
      startVelocity: 45
    });
  }, []);

  const handleShare = () => {
    sound.playClick();
    const myEntry = entries.find((e) => e.playerId === myPlayerId);
    const text = myEntry
      ? `🎮 I just placed #${myEntry.rank} with ${myEntry.score.toLocaleString()} points in Quiz Battle Arena! Can you beat my score?`
      : `🎮 Check out Quiz Battle Arena - real-time multiplayer trivia!`;

    if (navigator.share) {
      navigator.share({
        title: 'Quiz Battle Arena Score',
        text,
        url: window.location.origin
      }).catch(() => {});
    } else {
      navigator.clipboard.writeText(`${text} ${window.location.origin}`);
      alert('Results copied to clipboard!');
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto flex flex-col items-center py-4 sm:py-6 px-3 sm:px-4">
      {/* Champion Banner */}
      <div className="text-center mb-6 sm:mb-10 px-2">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-gradient-to-r from-amber-500/20 via-yellow-500/30 to-amber-500/20 border border-amber-400/40 text-amber-300 text-[10px] sm:text-xs font-black tracking-widest uppercase mb-2 sm:mb-3 shadow-lg">
          <Sparkles className="w-3.5 h-3.5 text-amber-400 shrink-0" />
          <span>Champion Crowned</span>
        </div>
        <h2 className="text-2xl sm:text-4xl md:text-5xl font-black bg-gradient-to-r from-amber-200 via-yellow-300 to-amber-400 bg-clip-text text-transparent break-words">
          {winner?.nickname || 'Champion'} Wins!
        </h2>
        <p className="text-xs sm:text-sm text-slate-400 mt-1 sm:mt-2 font-medium">
          Dominated the arena with <span className="text-cyan-300 font-mono font-bold">{winner?.score.toLocaleString()}</span> points
        </p>
      </div>

      {/* 3D Visual Podium */}
      <div className="w-full max-w-2xl flex items-end justify-center gap-1.5 sm:gap-4 mb-8 sm:mb-12 pt-8 sm:pt-12 px-1">
        {/* 2nd Place (Left) */}
        {second && (
          <div className="flex-1 flex flex-col items-center max-w-[110px] sm:max-w-[180px] min-w-0">
            <div className="relative mb-1.5 sm:mb-2">
              <Avatar seed={second.avatarSeed} size="md" />
              <div className="absolute -top-2 -right-1.5 bg-slate-300 text-slate-950 text-[9px] sm:text-[10px] font-black w-4 h-4 sm:w-5 sm:h-5 rounded-full flex items-center justify-center border border-slate-100 shadow-md">
                2
              </div>
            </div>
            <span className="font-bold text-xs sm:text-base text-slate-200 truncate max-w-full text-center px-1">
              {second.nickname}
            </span>
            <span className="font-mono text-[10px] sm:text-sm text-cyan-300 font-black">
              {second.score.toLocaleString()}
            </span>
            {/* Podium Pillar */}
            <div className="w-full h-24 sm:h-36 md:h-40 bg-gradient-to-t from-slate-800 to-slate-700/80 rounded-t-xl sm:rounded-t-2xl border-t-2 border-x border-slate-400/50 flex flex-col items-center justify-center shadow-xl mt-2 sm:mt-3">
              <Medal className="w-5 h-5 sm:w-8 sm:h-8 text-slate-300 mb-0.5 sm:mb-1" />
              <span className="text-sm sm:text-lg font-black text-slate-200 font-mono">2ND</span>
            </div>
          </div>
        )}

        {/* 1st Place (Center - Tallest) */}
        {winner && (
          <div className="flex-1 flex flex-col items-center max-w-[130px] sm:max-w-[210px] -mt-6 sm:-mt-8 min-w-0">
            <div className="relative mb-1.5 sm:mb-2 animate-bounce">
              <Crown className="w-6 h-6 sm:w-8 sm:h-8 text-amber-400 absolute -top-6 sm:-top-8 left-1/2 -translate-x-1/2 filter drop-shadow-[0_0_12px_rgba(251,191,36,0.8)]" />
              <Avatar seed={winner.avatarSeed} size="lg" />
              <div className="absolute -top-1.5 -right-1.5 bg-gradient-to-r from-amber-400 to-yellow-500 text-slate-950 text-[10px] sm:text-xs font-black w-5 h-5 sm:w-6 sm:h-6 rounded-full flex items-center justify-center border-2 border-yellow-200 shadow-xl">
                1
              </div>
            </div>
            <span className="font-black text-xs sm:text-lg text-amber-300 truncate max-w-full text-center px-1">
              {winner.nickname}
            </span>
            <span className="font-mono text-[11px] sm:text-base text-yellow-300 font-black">
              {winner.score.toLocaleString()} PTS
            </span>
            {/* Podium Pillar */}
            <div className="w-full h-32 sm:h-48 md:h-56 bg-gradient-to-t from-yellow-950/60 via-amber-900/60 to-amber-600/50 rounded-t-xl sm:rounded-t-2xl border-t-2 sm:border-t-4 border-x border-amber-400 flex flex-col items-center justify-center shadow-[0_0_35px_rgba(245,158,11,0.3)] mt-2 sm:mt-3">
              <Trophy className="w-6 h-6 sm:w-10 sm:h-10 text-amber-300 mb-0.5 sm:mb-1 filter drop-shadow-md" />
              <span className="text-base sm:text-xl font-black text-amber-200 font-mono">1ST</span>
              <span className="text-[8px] sm:text-[10px] text-amber-300 font-bold uppercase tracking-wider hidden xs:block">CHAMPION</span>
            </div>
          </div>
        )}

        {/* 3rd Place (Right) */}
        {third && (
          <div className="flex-1 flex flex-col items-center max-w-[110px] sm:max-w-[180px] min-w-0">
            <div className="relative mb-1.5 sm:mb-2">
              <Avatar seed={third.avatarSeed} size="md" />
              <div className="absolute -top-2 -right-1.5 bg-amber-700 text-amber-100 text-[9px] sm:text-[10px] font-black w-4 h-4 sm:w-5 sm:h-5 rounded-full flex items-center justify-center border border-amber-500 shadow-md">
                3
              </div>
            </div>
            <span className="font-bold text-xs sm:text-base text-slate-200 truncate max-w-full text-center px-1">
              {third.nickname}
            </span>
            <span className="font-mono text-[10px] sm:text-sm text-cyan-300 font-black">
              {third.score.toLocaleString()}
            </span>
            {/* Podium Pillar */}
            <div className="w-full h-18 sm:h-28 md:h-32 bg-gradient-to-t from-amber-950 to-amber-900/70 rounded-t-xl sm:rounded-t-2xl border-t-2 border-x border-amber-600/40 flex flex-col items-center justify-center shadow-lg mt-2 sm:mt-3">
              <Medal className="w-4 h-4 sm:w-7 sm:h-7 text-amber-600 mb-0.5 sm:mb-1" />
              <span className="text-xs sm:text-base font-black text-amber-300 font-mono">3RD</span>
            </div>
          </div>
        )}
      </div>

      {/* Full Scoreboard Card */}
      <div className="w-full max-w-2xl glass-panel p-4 sm:p-6 rounded-2xl sm:rounded-3xl border border-purple-500/20 mb-6 sm:mb-8">
        <h3 className="text-xs sm:text-sm font-black uppercase tracking-wider text-purple-300 mb-3 sm:mb-4 flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
          <span>Final Tournament Standings</span>
        </h3>

        <div className="space-y-1.5 sm:space-y-2">
          {entries.map((player) => {
            const isMe = player.playerId === myPlayerId;
            return (
              <div
                key={player.playerId}
                className={`p-2.5 sm:p-3.5 rounded-xl sm:rounded-2xl flex items-center justify-between gap-2 sm:gap-3 ${
                  isMe ? 'bg-purple-900/40 border border-purple-500/40' : 'bg-black/30 border border-white/5'
                }`}
              >
                <div className="flex items-center gap-2 sm:gap-3 min-w-0 flex-1">
                  <span className="font-mono font-bold text-xs sm:text-sm text-slate-400 w-4 sm:w-5 text-center shrink-0">
                    {player.rank}
                  </span>
                  <Avatar seed={player.avatarSeed} size="sm" isHost={player.isHost} />
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-1 sm:gap-1.5">
                      <span className={`font-bold text-xs sm:text-sm truncate max-w-[90px] xs:max-w-[140px] sm:max-w-[200px] ${isMe ? 'text-white' : 'text-slate-200'}`}>
                        {player.nickname}
                      </span>
                      {isMe && (
                        <span className="text-[8px] sm:text-[9px] bg-purple-500/30 text-purple-200 font-black px-1.5 py-0.2 rounded uppercase shrink-0">
                          YOU
                        </span>
                      )}
                    </div>
                    <span className="text-[10px] sm:text-xs text-slate-400 truncate block">{player.correctAnswers} answers correct</span>
                  </div>
                </div>

                <div className="text-right shrink-0">
                  <span className="font-mono font-black text-sm sm:text-base text-cyan-300">
                    {player.score.toLocaleString()}
                  </span>
                  <span className="text-[9px] sm:text-[10px] text-slate-500 font-bold ml-1">PTS</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Bottom Action Buttons */}
      <div className="w-full max-w-md flex flex-col sm:flex-row items-stretch sm:items-center justify-center gap-2.5 sm:gap-3">
        {isHost ? (
          <button
            onClick={() => {
              sound.playClick();
              onPlayAgain();
            }}
            className="flex-1 min-h-[48px] py-3 px-5 rounded-xl sm:rounded-2xl bg-gradient-to-r from-purple-600 via-indigo-600 to-cyan-500 hover:from-purple-500 hover:to-cyan-400 text-white font-black text-sm sm:text-base shadow-lg shadow-purple-600/40 flex items-center justify-center gap-2 transition-all transform hover:scale-[1.01] active:scale-[0.99] cursor-pointer"
          >
            <RotateCcw className="w-4 h-4 sm:w-5 sm:h-5 shrink-0" />
            <span>Play Again</span>
          </button>
        ) : (
          <div className="text-xs text-purple-300 font-medium bg-purple-950/40 border border-purple-500/20 px-3.5 py-2.5 rounded-xl text-center">
            Waiting for Host to start another match...
          </div>
        )}

        <div className="flex gap-2.5">
          <button
            onClick={handleShare}
            className="flex-1 sm:flex-none min-h-[48px] py-3 px-4 rounded-xl sm:rounded-2xl bg-slate-800 hover:bg-slate-700 border border-slate-700 text-slate-200 font-bold text-xs sm:text-sm flex items-center justify-center gap-1.5 transition-all cursor-pointer"
          >
            <Share2 className="w-4 h-4 text-cyan-400 shrink-0" />
            <span>Share</span>
          </button>

          <button
            onClick={() => {
              sound.playClick();
              onReturnHome();
            }}
            className="flex-1 sm:flex-none min-h-[48px] py-3 px-4 rounded-xl sm:rounded-2xl bg-slate-800 hover:bg-slate-700 border border-slate-700 text-slate-200 font-bold text-xs sm:text-sm flex items-center justify-center gap-1.5 transition-all cursor-pointer"
          >
            <Home className="w-4 h-4 text-purple-400 shrink-0" />
            <span>Home</span>
          </button>
        </div>
      </div>
    </div>
  );
};
