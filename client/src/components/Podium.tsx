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
    <div className="w-full max-w-4xl mx-auto flex flex-col items-center py-6 px-4">
      {/* Champion Banner */}
      <div className="text-center mb-10">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-gradient-to-r from-amber-500/20 via-yellow-500/30 to-amber-500/20 border border-amber-400/40 text-amber-300 text-xs font-black tracking-widest uppercase mb-3 shadow-lg">
          <Sparkles className="w-4 h-4 text-amber-400" />
          <span>Tournament Champion Crowned</span>
        </div>
        <h2 className="text-3xl sm:text-5xl font-black bg-gradient-to-r from-amber-200 via-yellow-300 to-amber-400 bg-clip-text text-transparent">
          {winner?.nickname || 'Champion'} Wins!
        </h2>
        <p className="text-sm text-slate-400 mt-2 font-medium">
          Dominated the arena with <span className="text-cyan-300 font-mono font-bold">{winner?.score.toLocaleString()}</span> points
        </p>
      </div>

      {/* 3D Visual Podium */}
      <div className="w-full max-w-2xl flex items-end justify-center gap-2 sm:gap-4 mb-12 pt-12">
        {/* 2nd Place (Left) */}
        {second && (
          <div className="flex-1 flex flex-col items-center max-w-[180px]">
            <div className="relative mb-2">
              <Avatar seed={second.avatarSeed} size="lg" />
              <div className="absolute -top-3 -right-2 bg-slate-300 text-slate-950 text-[10px] font-black w-6 h-6 rounded-full flex items-center justify-center border-2 border-slate-100 shadow-md">
                2
              </div>
            </div>
            <span className="font-bold text-sm sm:text-base text-slate-200 truncate max-w-full text-center">
              {second.nickname}
            </span>
            <span className="font-mono text-xs sm:text-sm text-cyan-300 font-black">
              {second.score.toLocaleString()}
            </span>
            {/* Podium Pillar */}
            <div className="w-full h-32 sm:h-40 bg-gradient-to-t from-slate-800 to-slate-700/80 rounded-t-2xl border-t-2 border-x border-slate-400/50 flex flex-col items-center justify-center shadow-xl mt-3">
              <Medal className="w-8 h-8 text-slate-300 mb-1" />
              <span className="text-lg font-black text-slate-200 font-mono">2ND</span>
            </div>
          </div>
        )}

        {/* 1st Place (Center - Tallest) */}
        {winner && (
          <div className="flex-1 flex flex-col items-center max-w-[210px] -mt-8">
            <div className="relative mb-2 animate-bounce">
              <Crown className="w-8 h-8 text-amber-400 absolute -top-8 left-1/2 -translate-x-1/2 filter drop-shadow-[0_0_12px_rgba(251,191,36,0.8)]" />
              <Avatar seed={winner.avatarSeed} size="xl" />
              <div className="absolute -top-2 -right-2 bg-gradient-to-r from-amber-400 to-yellow-500 text-slate-950 text-xs font-black w-7 h-7 rounded-full flex items-center justify-center border-2 border-yellow-200 shadow-xl">
                1
              </div>
            </div>
            <span className="font-black text-base sm:text-lg text-amber-300 truncate max-w-full text-center">
              {winner.nickname}
            </span>
            <span className="font-mono text-sm sm:text-base text-yellow-300 font-black">
              {winner.score.toLocaleString()} PTS
            </span>
            {/* Podium Pillar */}
            <div className="w-full h-44 sm:h-56 bg-gradient-to-t from-yellow-950/60 via-amber-900/60 to-amber-600/50 rounded-t-2xl border-t-4 border-x-2 border-amber-400 flex flex-col items-center justify-center shadow-[0_0_35px_rgba(245,158,11,0.3)] mt-3">
              <Trophy className="w-10 h-10 text-amber-300 mb-1 filter drop-shadow-md" />
              <span className="text-xl font-black text-amber-200 font-mono">1ST</span>
              <span className="text-[10px] text-amber-300 font-bold uppercase tracking-wider">CHAMPION</span>
            </div>
          </div>
        )}

        {/* 3rd Place (Right) */}
        {third && (
          <div className="flex-1 flex flex-col items-center max-w-[180px]">
            <div className="relative mb-2">
              <Avatar seed={third.avatarSeed} size="lg" />
              <div className="absolute -top-3 -right-2 bg-amber-700 text-amber-100 text-[10px] font-black w-6 h-6 rounded-full flex items-center justify-center border-2 border-amber-500 shadow-md">
                3
              </div>
            </div>
            <span className="font-bold text-sm sm:text-base text-slate-200 truncate max-w-full text-center">
              {third.nickname}
            </span>
            <span className="font-mono text-xs sm:text-sm text-cyan-300 font-black">
              {third.score.toLocaleString()}
            </span>
            {/* Podium Pillar */}
            <div className="w-full h-24 sm:h-32 bg-gradient-to-t from-amber-950 to-amber-900/70 rounded-t-2xl border-t-2 border-x border-amber-600/40 flex flex-col items-center justify-center shadow-lg mt-3">
              <Medal className="w-7 h-7 text-amber-600 mb-1" />
              <span className="text-base font-black text-amber-300 font-mono">3RD</span>
            </div>
          </div>
        )}
      </div>

      {/* Full Scoreboard Card */}
      <div className="w-full max-w-2xl glass-panel p-6 rounded-3xl border border-purple-500/20 mb-8">
        <h3 className="text-sm font-black uppercase tracking-wider text-purple-300 mb-4 flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 text-emerald-400" />
          <span>Final Tournament Standings</span>
        </h3>

        <div className="space-y-2">
          {entries.map((player) => {
            const isMe = player.playerId === myPlayerId;
            return (
              <div
                key={player.playerId}
                className={`p-3.5 rounded-2xl flex items-center justify-between ${
                  isMe ? 'bg-purple-900/40 border border-purple-500/40' : 'bg-black/30 border border-white/5'
                }`}
              >
                <div className="flex items-center gap-3">
                  <span className="font-mono font-bold text-slate-400 w-5 text-center">{player.rank}</span>
                  <Avatar seed={player.avatarSeed} size="sm" isHost={player.isHost} />
                  <div>
                    <div className="flex items-center gap-1.5">
                      <span className={`font-bold text-sm ${isMe ? 'text-white' : 'text-slate-200'}`}>
                        {player.nickname}
                      </span>
                      {isMe && (
                        <span className="text-[9px] bg-purple-500/30 text-purple-200 font-black px-1.5 py-0.2 rounded uppercase">
                          YOU
                        </span>
                      )}
                    </div>
                    <span className="text-xs text-slate-400">{player.correctAnswers} answers correct</span>
                  </div>
                </div>

                <div className="text-right">
                  <span className="font-mono font-black text-base text-cyan-300">
                    {player.score.toLocaleString()}
                  </span>
                  <span className="text-[10px] text-slate-500 font-bold ml-1">PTS</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Bottom Action Buttons */}
      <div className="flex flex-wrap items-center justify-center gap-4 w-full max-w-md">
        {isHost ? (
          <button
            onClick={() => {
              sound.playClick();
              onPlayAgain();
            }}
            className="flex-1 min-w-[180px] py-3.5 px-6 rounded-2xl bg-gradient-to-r from-purple-600 via-indigo-600 to-cyan-500 hover:from-purple-500 hover:to-cyan-400 text-white font-black text-base shadow-lg shadow-purple-600/40 flex items-center justify-center gap-2 transition-all transform hover:scale-[1.02] cursor-pointer"
          >
            <RotateCcw className="w-5 h-5" />
            <span>Play Again</span>
          </button>
        ) : (
          <div className="text-xs text-purple-300 font-medium bg-purple-950/40 border border-purple-500/20 px-4 py-2.5 rounded-xl">
            Waiting for Host to start another match...
          </div>
        )}

        <button
          onClick={handleShare}
          className="py-3.5 px-5 rounded-2xl bg-slate-800 hover:bg-slate-700 border border-slate-700 text-slate-200 font-bold flex items-center justify-center gap-2 transition-all cursor-pointer"
        >
          <Share2 className="w-4 h-4 text-cyan-400" />
          <span>Share</span>
        </button>

        <button
          onClick={() => {
            sound.playClick();
            onReturnHome();
          }}
          className="py-3.5 px-5 rounded-2xl bg-slate-800 hover:bg-slate-700 border border-slate-700 text-slate-200 font-bold flex items-center justify-center gap-2 transition-all cursor-pointer"
        >
          <Home className="w-4 h-4 text-purple-400" />
          <span>Home</span>
        </button>
      </div>
    </div>
  );
};
