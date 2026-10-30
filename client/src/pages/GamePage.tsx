import React, { useEffect } from 'react';
import { useSocket } from '../context/SocketContext';
import { TimerBar } from '../components/TimerBar';
import { QuestionCard } from '../components/QuestionCard';
import { Leaderboard } from '../components/Leaderboard';
import { Avatar } from '../components/Avatar';
import { Flame, Users, Zap } from 'lucide-react';

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
      <div className="w-full min-h-[60vh] flex flex-col items-center justify-center text-center px-4 py-8">
        <div className="glass-panel p-6 sm:p-10 rounded-2xl sm:rounded-3xl border border-purple-500/30 max-w-sm sm:max-w-md w-full shadow-2xl relative overflow-hidden">
          <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-gradient-to-tr from-purple-600 to-cyan-500 mx-auto flex items-center justify-center text-white font-black text-3xl sm:text-4xl mb-4 sm:mb-6 shadow-xl shadow-cyan-500/30 animate-pulse">
            <Zap className="w-8 h-8 sm:w-10 sm:h-10" />
          </div>
          <h2 className="text-xl sm:text-2xl font-black text-white mb-1.5 sm:mb-2">BATTLE IMMINENT!</h2>
          <p className="text-slate-400 text-xs sm:text-sm mb-4 sm:mb-6">Prepare your reflexes. Questions appear in:</p>

          <div className="text-5xl sm:text-7xl font-mono font-black bg-gradient-to-r from-amber-400 via-pink-500 to-cyan-400 bg-clip-text text-transparent animate-bounce">
            {timerRemaining > 0 ? timerRemaining : 'GO!'}
          </div>
        </div>
      </div>
    );
  }

  // 2. Active Question or Reveal phase
  return (
    <div className="w-full max-w-6xl mx-auto px-3 sm:px-6 py-4 sm:py-6 flex flex-col items-center">
      {/* Top HUD Bar */}
      <div className="w-full glass-panel p-3 sm:p-4 rounded-xl sm:rounded-2xl border border-purple-500/20 mb-4 sm:mb-6 flex items-center justify-between gap-2 sm:gap-4">
        {/* Left: Player Profile & Live Score */}
        <div className="flex items-center gap-2 sm:gap-3 min-w-0 flex-1">
          {myPlayer && <Avatar seed={myPlayer.avatarSeed} size="sm" />}
          <div className="min-w-0">
            <div className="flex items-center gap-1 sm:gap-1.5">
              <span className="font-extrabold text-white text-xs sm:text-base truncate max-w-[80px] xs:max-w-[120px] sm:max-w-[180px]">
                {myPlayer?.nickname || 'Challenger'}
              </span>
              {myPlayer && myPlayer.streak > 1 && (
                <span className="inline-flex items-center gap-0.5 text-[9px] sm:text-xs font-black text-amber-400 bg-amber-950/60 border border-amber-500/30 px-1.5 py-0.2 rounded-full shrink-0">
                  <Flame className="w-2.5 h-2.5 sm:w-3.5 sm:h-3.5 fill-current" />
                  <span>{myPlayer.streak}</span>
                </span>
              )}
            </div>
            <div className="flex items-center gap-1.5 text-[10px] sm:text-xs">
              <span className="font-mono text-cyan-300 font-bold">
                {(myPlayer?.score || 0).toLocaleString()} PTS
              </span>
              <span className="text-slate-500 hidden xs:inline">•</span>
              <span className="text-slate-400 hidden xs:inline">{myPlayer?.correctAnswers || 0} Correct</span>
            </div>
          </div>
        </div>

        {/* Center: Synchronized Timer */}
        <div className="shrink-0 px-1">
          <TimerBar
            remaining={timerRemaining}
            total={roomState.settings.questionTimer}
            compact
          />
        </div>

        {/* Right: Room & Progress indicator */}
        <div className="flex items-center gap-2 sm:gap-4 text-right shrink-0 justify-end">
          <div>
            <div className="text-[10px] sm:text-xs uppercase tracking-wider text-slate-400 font-bold hidden xs:block">
              Progress
            </div>
            <div className="font-mono text-xs sm:text-sm font-black text-purple-300">
              Q{roomState.currentQuestionNumber}/{roomState.totalQuestions}
            </div>
          </div>

          <div className="hidden sm:flex items-center gap-1.5 bg-black/40 px-2.5 py-1.5 rounded-xl border border-white/5 text-xs text-slate-300">
            <Users className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
            <span className="font-bold">{roomState.players.length}</span>
          </div>
        </div>
      </div>

      {/* Main Content: Question and Live Standings */}
      <div className="w-full flex flex-col lg:grid lg:grid-cols-12 gap-4 sm:gap-6 items-start">
        {/* Left/Main: Interactive Question Card (8 cols) */}
        <div className="w-full lg:col-span-8 flex flex-col items-center">
          {currentQuestion ? (
            <QuestionCard
              question={currentQuestion}
              selectedOption={selectedOption}
              onSelectOption={submitAnswer}
              reveal={lastReveal}
              myPlayerId={myPlayerId}
            />
          ) : (
            <div className="glass-panel p-8 sm:p-12 rounded-2xl sm:rounded-3xl text-center w-full">
              <p className="text-slate-400 font-bold text-sm sm:text-base">Loading next question...</p>
            </div>
          )}
        </div>

        {/* Right: Live Mini Standings (4 cols) */}
        <div className="w-full lg:col-span-4 mt-2 lg:mt-0">
          <div className="glass-panel p-3.5 sm:p-5 rounded-2xl sm:rounded-3xl border border-purple-500/20 shadow-xl">
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
