import React, { useEffect } from 'react';
import { useSocket } from '../context/SocketContext';
import { TimerBar } from '../components/TimerBar';
import { QuestionCard } from '../components/QuestionCard';
import { Leaderboard } from '../components/Leaderboard';
import { Avatar } from '../components/Avatar';
import { Flame, Trophy, Users, Zap } from 'lucide-react';

export const GamePage: React.FC = () => {
  const {
    roomState,
    currentQuestion,
    timerRemaining,
    lastReveal,
    leaderboard,
    selectedOption,
    submitAnswer,
    myPlayerId,
    myPlayer
  } = useSocket();

  // Keyboard shortcut listener for options 1-4 or A-D
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!currentQuestion || selectedOption !== null || !!lastReveal) return;

      const key = e.key.toUpperCase();
      if (key === '1' || key === 'A') submitAnswer(0);
      else if (key === '2' || key === 'B') submitAnswer(1);
      else if (key === '3' || key === 'C') submitAnswer(2);
      else if (key === '4' || key === 'D') submitAnswer(3);
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentQuestion, selectedOption, lastReveal, submitAnswer]);

  if (!roomState) return null;

  // 1. Starting 3-second countdown screen
  if (roomState.phase === 'STARTING') {
    return (
      <div className="w-full min-h-[70vh] flex flex-col items-center justify-center text-center px-4">
        <div className="glass-panel p-10 rounded-3xl border border-purple-500/30 max-w-md w-full shadow-2xl relative overflow-hidden">
          <div className="w-20 h-20 rounded-full bg-gradient-to-tr from-purple-600 to-cyan-500 mx-auto flex items-center justify-center text-white font-black text-4xl mb-6 shadow-xl shadow-cyan-500/30 animate-pulse">
            <Zap className="w-10 h-10" />
          </div>
          <h2 className="text-2xl font-black text-white mb-2">BATTLE IMMINENT!</h2>
          <p className="text-slate-400 text-sm mb-6">Prepare your reflexes. Questions appear in:</p>

          <div className="text-7xl font-mono font-black bg-gradient-to-r from-amber-400 via-pink-500 to-cyan-400 bg-clip-text text-transparent animate-bounce">
            {timerRemaining > 0 ? timerRemaining : 'GO!'}
          </div>
        </div>
      </div>
    );
  }

  // 2. Active Question or Reveal phase
  return (
    <div className="w-full max-w-6xl mx-auto px-4 py-6 flex flex-col items-center">
      {/* Top HUD Bar */}
      <div className="w-full glass-panel p-4 rounded-2xl border border-purple-500/20 mb-6 flex flex-wrap items-center justify-between gap-4">
        {/* Left: Player Profile & Live Score */}
        <div className="flex items-center gap-3">
          {myPlayer && <Avatar seed={myPlayer.avatarSeed} size="md" />}
          <div>
            <div className="flex items-center gap-1.5">
              <span className="font-extrabold text-white text-base">
                {myPlayer?.nickname || 'Challenger'}
              </span>
              {myPlayer && myPlayer.streak > 1 && (
                <span className="inline-flex items-center gap-0.5 text-xs font-black text-amber-400 bg-amber-950/60 border border-amber-500/30 px-2 py-0.5 rounded-full">
                  <Flame className="w-3.5 h-3.5 fill-current" />
                  {myPlayer.streak} STREAK
                </span>
              )}
            </div>
            <div className="flex items-center gap-2 text-xs">
              <span className="font-mono text-cyan-300 font-bold">
                {(myPlayer?.score || 0).toLocaleString()} PTS
              </span>
              <span className="text-slate-500">•</span>
              <span className="text-slate-400">{myPlayer?.correctAnswers || 0} Correct</span>
            </div>
          </div>
        </div>

        {/* Center: Synchronized Timer */}
        <div className="mx-auto sm:mx-0">
          <TimerBar
            remaining={timerRemaining}
            total={roomState.settings.questionTimer}
          />
        </div>

        {/* Right: Room & Progress indicator */}
        <div className="flex items-center gap-4 text-right">
          <div>
            <div className="text-xs uppercase tracking-wider text-slate-400 font-bold">
              Round Progress
            </div>
            <div className="font-mono text-sm font-black text-purple-300">
              Q{roomState.currentQuestionNumber} of {roomState.totalQuestions}
            </div>
          </div>

          <div className="hidden sm:flex items-center gap-1.5 bg-black/40 px-3 py-1.5 rounded-xl border border-white/5 text-xs text-slate-300">
            <Users className="w-4 h-4 text-cyan-400" />
            <span className="font-bold">{roomState.players.length}</span>
          </div>
        </div>
      </div>

      {/* Main Content: Question and Live Standings */}
      <div className="w-full grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left/Main: Interactive Question Card (8 cols) */}
        <div className="lg:col-span-8 flex flex-col items-center w-full">
          {currentQuestion ? (
            <QuestionCard
              question={currentQuestion}
              selectedOption={selectedOption}
              onSelectOption={submitAnswer}
              reveal={lastReveal}
              myPlayerId={myPlayerId}
            />
          ) : (
            <div className="glass-panel p-12 rounded-3xl text-center">
              <p className="text-slate-400 font-bold">Loading next question...</p>
            </div>
          )}
        </div>

        {/* Right: Live Mini Standings (4 cols) */}
        <div className="lg:col-span-4 w-full">
          <div className="glass-panel p-5 rounded-3xl border border-purple-500/20 shadow-xl">
            <Leaderboard
              entries={leaderboard.length > 0 ? leaderboard : roomState.players.map((p, idx) => ({
                rank: idx + 1,
                playerId: p.id,
                nickname: p.nickname,
                avatarSeed: p.avatarSeed,
                score: p.score,
                correctAnswers: p.correctAnswers,
                streak: p.streak,
                isHost: p.isHost,
                positionChange: 0
              }))}
              myPlayerId={myPlayerId}
              isCompact
            />
          </div>
        </div>
      </div>
    </div>
  );
};
