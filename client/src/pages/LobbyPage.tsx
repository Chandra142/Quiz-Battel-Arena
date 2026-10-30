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
    <div className="w-full max-w-5xl mx-auto px-4 py-8 flex flex-col items-center">
      {/* Top Room Banner */}
      <div className="w-full glass-panel p-6 sm:p-8 rounded-3xl border border-purple-500/30 mb-8 relative overflow-hidden shadow-2xl">
        <div className="absolute top-0 right-0 w-80 h-80 bg-purple-600/10 rounded-full blur-3xl pointer-events-none" />

        <div className="flex flex-col md:flex-row items-center justify-between gap-6 text-center md:text-left">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-purple-950/80 border border-purple-400/30 text-purple-300 text-xs font-bold uppercase tracking-widest mb-2">
              <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
              <span>Multiplayer Battle Lobby</span>
            </div>
            <h2 className="text-2xl sm:text-4xl font-black text-white">
              Room Code: <span className="font-mono text-cyan-300 tracking-wider font-extrabold">{roomState.code}</span>
            </h2>
            <p className="text-slate-400 text-xs sm:text-sm mt-1">
              Share this code or link with opponents to bring them into the arena.
            </p>
          </div>

          {/* Quick Share Buttons */}
          <div className="flex items-center gap-3">
            <button
              onClick={copyCode}
              className="px-4 py-2.5 rounded-xl bg-purple-900/50 hover:bg-purple-800/60 border border-purple-400/30 text-purple-200 text-xs font-black uppercase tracking-wider flex items-center gap-2 transition-all cursor-pointer shadow-md"
            >
              {copiedCode ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
              <span>{copiedCode ? 'Code Copied' : 'Copy Code'}</span>
            </button>

            <button
              onClick={copyLink}
              className="px-4 py-2.5 rounded-xl bg-cyan-950/60 hover:bg-cyan-900/70 border border-cyan-400/40 text-cyan-200 text-xs font-black uppercase tracking-wider flex items-center gap-2 transition-all cursor-pointer shadow-md"
            >
              {copiedLink ? <Check className="w-4 h-4 text-emerald-400" /> : <Share2 className="w-4 h-4" />}
              <span>{copiedLink ? 'Link Copied' : 'Copy Invite Link'}</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Grid: Player Roster & Game Settings */}
      <div className="w-full grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left: Connected Players (7 cols) */}
        <div className="lg:col-span-7 flex flex-col">
          <div className="flex items-center justify-between mb-4 px-1">
            <h3 className="text-base font-black uppercase tracking-wider text-purple-300 flex items-center gap-2">
              <Users className="w-5 h-5 text-cyan-400" />
              <span>Challengers Assembled ({roomState.players.length})</span>
            </h3>
            <span className={`text-xs font-bold px-2.5 py-1 rounded-full border ${
              canStart ? 'bg-emerald-950/60 text-emerald-400 border-emerald-500/30' : 'bg-amber-950/60 text-amber-400 border-amber-500/30'
            }`}>
              {canStart ? 'Ready to Battle' : 'Waiting for 2nd Player'}
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
            {roomState.players.map((p) => {
              const isMe = p.id === myPlayerId;
              return (
                <div
                  key={p.id}
                  className={`p-4 rounded-2xl flex items-center gap-3.5 transition-all ${
                    isMe
                      ? 'bg-purple-900/40 border border-purple-400/50 shadow-lg'
                      : 'glass-card border-white/5'
                  }`}
                >
                  <Avatar seed={p.avatarSeed} size="md" isHost={p.isHost} showBadge />
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-1.5">
                      <span className={`font-bold text-sm sm:text-base truncate ${isMe ? 'text-white' : 'text-slate-200'}`}>
                        {p.nickname}
                      </span>
                      {isMe && (
                        <span className="text-[10px] bg-purple-500/40 text-purple-200 font-black px-1.5 py-0.2 rounded uppercase">
                          YOU
                        </span>
                      )}
                    </div>
                    <span className="text-xs text-slate-400 font-medium">
                      {p.isHost ? 'Room Commander' : 'Ready to fight'}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Warning if under 2 players */}
          {!canStart && (
            <div className="mt-6 p-4 rounded-2xl bg-amber-950/40 border border-amber-500/30 text-amber-200 text-xs flex items-center gap-3">
              <AlertCircle className="w-5 h-5 text-amber-400 shrink-0" />
              <span>
                At least <strong>2 players</strong> are required to start the quiz. Invite a friend by sharing the room code or link above!
              </span>
            </div>
          )}

          {/* Error notice */}
          {error && (
            <div className="mt-4 p-4 rounded-2xl bg-rose-950/70 border border-rose-500/40 text-rose-200 text-xs flex items-center gap-2">
              <ShieldAlert className="w-4 h-4 text-rose-400 shrink-0" />
              <span>{error}</span>
            </div>
          )}
        </div>

        {/* Right: Game Settings & Start Action (5 cols) */}
        <div className="lg:col-span-5 flex flex-col">
          <div className="glass-panel p-6 rounded-3xl border border-purple-500/20 shadow-xl flex-1 flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-2 mb-6 text-purple-300">
                <Settings2 className="w-5 h-5 text-cyan-400" />
                <h3 className="text-base font-black uppercase tracking-wider">
                  Arena Rules {isHost ? '(Host Only)' : '(Host Configured)'}
                </h3>
              </div>

              {/* Questions Count Setting */}
              <div className="mb-5">
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-2">
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
                        className={`py-2 rounded-xl text-xs font-black uppercase transition-all ${
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
              <div className="mb-5">
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-2">
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
                        className={`py-2 rounded-xl text-xs font-black uppercase transition-all ${
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
              <div className="mb-5">
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-2">
                  Difficulty Level
                </label>
                <div className="grid grid-cols-4 gap-2">
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
                        className={`py-2 rounded-xl text-[11px] font-black uppercase transition-all ${
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
              <div className="mb-6">
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-2">
                  Topic / Category
                </label>
                <select
                  disabled={!isHost}
                  value={roomState.settings.category}
                  onChange={(e) => {
                    sound.playClick();
                    updateSettings({ category: e.target.value as Category });
                  }}
                  className={`w-full px-4 py-2.5 rounded-xl bg-black/40 border border-purple-500/30 text-white font-bold text-sm focus:outline-none focus:border-cyan-400 ${
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
            <div className="pt-4 border-t border-white/10">
              {isHost ? (
                <button
                  type="button"
                  disabled={!canStart}
                  onClick={() => {
                    sound.playClick();
                    startGame();
                  }}
                  className={`w-full py-4 px-6 rounded-2xl font-black text-base flex items-center justify-center gap-2 shadow-xl transition-all transform ${
                    canStart
                      ? 'bg-gradient-to-r from-emerald-500 via-teal-600 to-cyan-500 hover:from-emerald-400 hover:to-cyan-400 text-slate-950 shadow-emerald-500/30 hover:scale-[1.02] cursor-pointer'
                      : 'bg-slate-800 text-slate-500 cursor-not-allowed border border-white/5'
                  }`}
                >
                  <Play className="w-5 h-5 fill-current" />
                  <span>Start Game Now</span>
                </button>
              ) : (
                <div className="p-4 rounded-2xl bg-purple-950/40 border border-purple-500/20 text-center">
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
