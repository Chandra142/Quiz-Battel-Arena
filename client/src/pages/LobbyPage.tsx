import React, { useState } from 'react';
import { Copy, Check, Users, Play, Settings2, Share2, Sparkles, AlertCircle, ShieldAlert } from 'lucide-react';
import { useSocket } from '../context/SocketContext';
import { Avatar } from '../components/Avatar';
import { sound } from '../services/soundManager';
import { Category, Difficulty } from '../types';

const CATEGORIES: Category[] = [
  'All',
  'General Knowledge',
  'Science',
  'Technology',
  'Sports',
  'History',
  'Geography'
];

export const LobbyPage: React.FC = () => {
  const { roomState, myPlayerId, updateSettings, startGame, error } = useSocket();
  const [copiedCode, setCopiedCode] = useState<boolean>(false);
  const [copiedLink, setCopiedLink] = useState<boolean>(false);

  if (!roomState) return null;

  const isHost = roomState.hostId === myPlayerId;
  const canStart = roomState.players.length >= 2;
  const inviteLink = typeof window !== 'undefined' ? `${window.location.origin}/?room=${roomState.code}` : '';

  const copyCode = () => {
    sound.playClick();
    navigator.clipboard.writeText(roomState.code);
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 2000);
  };

  const copyLink = () => {
    sound.playClick();
    navigator.clipboard.writeText(inviteLink);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2000);
  };

  return (
    <div className="w-full max-w-5xl mx-auto px-3 sm:px-6 py-6 sm:py-8 flex flex-col items-center">
      {/* Top Room Banner */}
      <div className="w-full glass-panel p-4 sm:p-6 md:p-8 rounded-2xl sm:rounded-3xl border border-purple-500/30 mb-6 sm:mb-8 relative overflow-hidden shadow-2xl">
        <div className="absolute top-0 right-0 w-80 h-80 bg-purple-600/10 rounded-full blur-3xl pointer-events-none" />

        <div className="flex flex-col md:flex-row items-center justify-between gap-5 text-center md:text-left">
          <div className="min-w-0">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-purple-950/80 border border-purple-400/30 text-purple-300 text-[10px] sm:text-xs font-bold uppercase tracking-widest mb-2">
              <Sparkles className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
              <span>Multiplayer Battle Lobby</span>
            </div>
            <h2 className="text-xl sm:text-3xl md:text-4xl font-black text-white break-words">
              Room Code: <span className="font-mono text-cyan-300 tracking-wider font-extrabold text-2xl sm:text-4xl">{roomState.code}</span>
            </h2>
            <p className="text-slate-400 text-xs sm:text-sm mt-1 max-w-md">
              Share this code or link with opponents to bring them into the arena.
            </p>
          </div>

          {/* Quick Share Buttons */}
          <div className="grid grid-cols-2 sm:flex sm:flex-row items-center gap-2 sm:gap-3 w-full sm:w-auto shrink-0">
            <button
              onClick={copyCode}
              className="py-2.5 px-3 sm:px-4 rounded-xl bg-purple-900/50 hover:bg-purple-800/60 border border-purple-400/30 text-purple-200 text-xs font-black uppercase tracking-wider flex items-center justify-center gap-1.5 sm:gap-2 transition-all cursor-pointer shadow-md min-h-[44px]"
            >
              {copiedCode ? <Check className="w-4 h-4 text-emerald-400 shrink-0" /> : <Copy className="w-4 h-4 shrink-0" />}
              <span className="truncate">{copiedCode ? 'Copied' : 'Copy Code'}</span>
            </button>

            <button
              onClick={copyLink}
              className="py-2.5 px-3 sm:px-4 rounded-xl bg-cyan-950/60 hover:bg-cyan-900/70 border border-cyan-400/40 text-cyan-200 text-xs font-black uppercase tracking-wider flex items-center justify-center gap-1.5 sm:gap-2 transition-all cursor-pointer shadow-md min-h-[44px]"
            >
              {copiedLink ? <Check className="w-4 h-4 text-emerald-400 shrink-0" /> : <Share2 className="w-4 h-4 shrink-0" />}
              <span className="truncate">{copiedLink ? 'Copied' : 'Copy Link'}</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Grid: Player Roster & Game Settings */}
      <div className="w-full flex flex-col lg:grid lg:grid-cols-12 gap-6 sm:gap-8">
        {/* Left: Connected Players (7 cols) */}
        <div className="lg:col-span-7 flex flex-col w-full">
          <div className="flex flex-wrap items-center justify-between gap-2 mb-3 sm:mb-4 px-1">
            <h3 className="text-sm sm:text-base font-black uppercase tracking-wider text-purple-300 flex items-center gap-2">
              <Users className="w-4 h-4 sm:w-5 sm:h-5 text-cyan-400 shrink-0" />
              <span>Challengers ({roomState.players.length})</span>
            </h3>
            <span className={`text-[10px] sm:text-xs font-bold px-2.5 py-1 rounded-full border ${
              canStart ? 'bg-emerald-950/60 text-emerald-400 border-emerald-500/30' : 'bg-amber-950/60 text-amber-400 border-amber-500/30'
            }`}>
              {canStart ? 'Ready to Battle' : 'Need 2+ Players'}
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 sm:gap-3.5">
            {roomState.players.map((p) => {
              const isMe = p.id === myPlayerId;
              return (
                <div
                  key={p.id}
                  className={`p-3 sm:p-4 rounded-xl sm:rounded-2xl flex items-center gap-3 transition-all min-w-0 ${
                    isMe
                      ? 'bg-purple-900/40 border border-purple-400/50 shadow-lg'
                      : 'glass-card border-white/5'
                  }`}
                >
                  <Avatar seed={p.avatarSeed} size="md" isHost={p.isHost} showBadge />
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-1.5">
                      <span className={`font-bold text-sm sm:text-base truncate max-w-[120px] sm:max-w-[160px] ${isMe ? 'text-white' : 'text-slate-200'}`}>
                        {p.nickname}
                      </span>
                      {isMe && (
                        <span className="text-[9px] bg-purple-500/40 text-purple-200 font-black px-1.5 py-0.2 rounded uppercase shrink-0">
                          YOU
                        </span>
                      )}
                    </div>
                    <span className="text-[11px] sm:text-xs text-slate-400 font-medium truncate block">
                      {p.isHost ? 'Room Commander' : 'Ready to fight'}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Warning if under 2 players */}
          {!canStart && (
            <div className="mt-4 sm:mt-6 p-3.5 sm:p-4 rounded-xl sm:rounded-2xl bg-amber-950/40 border border-amber-500/30 text-amber-200 text-xs flex items-start sm:items-center gap-2.5">
              <AlertCircle className="w-4 h-4 sm:w-5 sm:h-5 text-amber-400 shrink-0 mt-0.5 sm:mt-0" />
              <span>
                At least <strong>2 players</strong> are required to start the battle. Share the room code or link above!
              </span>
            </div>
          )}

          {/* Error notice */}
          {error && (
            <div className="mt-4 p-3.5 sm:p-4 rounded-xl sm:rounded-2xl bg-rose-950/70 border border-rose-500/40 text-rose-200 text-xs flex items-center gap-2">
              <ShieldAlert className="w-4 h-4 text-rose-400 shrink-0" />
              <span className="break-words">{error}</span>
            </div>
          )}
        </div>

        {/* Right: Game Settings & Start Action (5 cols) */}
        <div className="lg:col-span-5 flex flex-col w-full">
          <div className="glass-panel p-4 sm:p-6 rounded-2xl sm:rounded-3xl border border-purple-500/20 shadow-xl flex-1 flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-2 mb-4 sm:mb-6 text-purple-300">
                <Settings2 className="w-4 h-4 sm:w-5 sm:h-5 text-cyan-400 shrink-0" />
                <h3 className="text-sm sm:text-base font-black uppercase tracking-wider truncate">
                  Arena Rules {isHost ? '(Host Only)' : '(Host Configured)'}
                </h3>
              </div>

              {/* Questions Count Setting */}
              <div className="mb-4 sm:mb-5">
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-1.5">
                  Question Count
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {[5, 10, 15].map((count) => {
                    const isSelected = roomState.settings.questionCount === count;
                    return (
                      <button
                        key={count}
                        type="button"
                        disabled={!isHost}
                        onClick={() => {
                          sound.playClick();
                          updateSettings({ questionCount: count });
                        }}
                        className={`py-2 rounded-xl text-xs font-black uppercase transition-all min-h-[40px] ${
                          isSelected
                            ? 'bg-purple-600 text-white shadow-md border border-purple-400'
                            : 'bg-black/30 text-slate-400 hover:text-white border border-white/5'
                        } ${!isHost ? 'cursor-default' : 'cursor-pointer'}`}
                      >
                        {count} Qs
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Timer Setting */}
              <div className="mb-4 sm:mb-5">
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-1.5">
                  Timer Per Question
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {[10, 15, 20].map((seconds) => {
                    const isSelected = roomState.settings.questionTimer === seconds;
                    return (
                      <button
                        key={seconds}
                        type="button"
                        disabled={!isHost}
                        onClick={() => {
                          sound.playClick();
                          updateSettings({ questionTimer: seconds });
                        }}
                        className={`py-2 rounded-xl text-xs font-black uppercase transition-all min-h-[40px] ${
                          isSelected
                            ? 'bg-cyan-600 text-white shadow-md border border-cyan-400'
                            : 'bg-black/30 text-slate-400 hover:text-white border border-white/5'
                        } ${!isHost ? 'cursor-default' : 'cursor-pointer'}`}
                      >
                        {seconds}s
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Difficulty Setting */}
              <div className="mb-4 sm:mb-5">
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-1.5">
                  Difficulty Level
                </label>
                <div className="grid grid-cols-4 gap-1.5 sm:gap-2">
                  {(['all', 'easy', 'medium', 'hard'] as const).map((diff) => {
                    const isSelected = roomState.settings.difficulty === diff;
                    return (
                      <button
                        key={diff}
                        type="button"
                        disabled={!isHost}
                        onClick={() => {
                          sound.playClick();
                          updateSettings({ difficulty: diff });
                        }}
                        className={`py-2 px-1 rounded-xl text-[10px] sm:text-[11px] font-black uppercase transition-all truncate min-h-[40px] ${
                          isSelected
                            ? 'bg-gradient-to-r from-purple-600 to-indigo-600 text-white shadow-md border border-purple-400'
                            : 'bg-black/30 text-slate-400 hover:text-white border border-white/5'
                        } ${!isHost ? 'cursor-default' : 'cursor-pointer'}`}
                      >
                        {diff}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Category Setting */}
              <div className="mb-5 sm:mb-6">
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-1.5">
                  Topic / Category
                </label>
                <select
                  disabled={!isHost}
                  value={roomState.settings.category}
                  onChange={(e) => {
                    sound.playClick();
                    updateSettings({ category: e.target.value as Category });
                  }}
                  className={`w-full px-3.5 py-2.5 rounded-xl bg-black/40 border border-purple-500/30 text-white font-bold text-xs sm:text-sm focus:outline-none focus:border-cyan-400 min-h-[44px] ${
                    !isHost ? 'cursor-default opacity-80' : 'cursor-pointer'
                  }`}
                >
                  {CATEGORIES.map((cat) => (
                    <option key={cat} value={cat} className="bg-slate-900 text-white">
                      {cat}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Start Game Action Button */}
            <div className="pt-3 sm:pt-4 border-t border-white/10">
              {isHost ? (
                <button
                  type="button"
                  disabled={!canStart}
                  onClick={() => {
                    sound.playClick();
                    startGame();
                  }}
                  className={`w-full min-h-[50px] py-3.5 sm:py-4 px-4 sm:px-6 rounded-xl sm:rounded-2xl font-black text-sm sm:text-base flex items-center justify-center gap-2 shadow-xl transition-all transform ${
                    canStart
                      ? 'bg-gradient-to-r from-emerald-500 via-teal-600 to-cyan-500 hover:from-emerald-400 hover:to-cyan-400 text-slate-950 shadow-emerald-500/30 hover:scale-[1.01] active:scale-[0.99] cursor-pointer'
                      : 'bg-slate-800 text-slate-500 cursor-not-allowed border border-white/5'
                  }`}
                >
                  <Play className="w-5 h-5 fill-current shrink-0" />
                  <span>Start Game Now</span>
                </button>
              ) : (
                <div className="p-3.5 sm:p-4 rounded-xl sm:rounded-2xl bg-purple-950/40 border border-purple-500/20 text-center">
                  <p className="text-xs text-purple-300 font-bold">
                    Waiting for the host ({roomState.players.find((p) => p.isHost)?.nickname}) to start the battle...
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
