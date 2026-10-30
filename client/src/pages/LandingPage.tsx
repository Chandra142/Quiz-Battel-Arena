import React, { useState, useEffect } from 'react';
import { Swords, Plus, ArrowRight, Zap, Trophy, ShieldCheck, Users, Sparkles, Smartphone } from 'lucide-react';
import { useSocket } from '../context/SocketContext';
import { Avatar, getAvatarMeta } from '../components/Avatar';
import { sound } from '../services/soundManager';

export const LandingPage: React.FC = () => {
  const { createRoom, joinRoom, error, clearError } = useSocket();

  const [nickname, setNickname] = useState<string>(() => {
    return (typeof window !== 'undefined' && localStorage.getItem('qba_nickname')) || '';
  });
  const [avatarSeed, setAvatarSeed] = useState<number>(0);
  const [roomCodeInput, setRoomCodeInput] = useState<string>('');
  const [activeTab, setActiveTab] = useState<'create' | 'join'>('create');

  // Check URL query param for ?room=CODE
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search);
      const roomParam = params.get('room');
      if (roomParam) {
        setRoomCodeInput(roomParam.toUpperCase());
        setActiveTab('join');
      }
    }
  }, []);

  const handleNicknameChange = (val: string) => {
    setNickname(val);
    clearError();
    if (typeof window !== 'undefined') {
      localStorage.setItem('qba_nickname', val);
    }
  };

  const handleCreate = (e: React.FormEvent) => {
    e.preventDefault();
    sound.playClick();
    const finalNick = nickname.trim() || 'Champion';
    createRoom(finalNick, avatarSeed);
  };

  const handleJoin = (e: React.FormEvent) => {
    e.preventDefault();
    sound.playClick();
    const finalNick = nickname.trim() || 'Challenger';
    joinRoom(roomCodeInput.trim().toUpperCase(), finalNick, avatarSeed);
  };

  return (
    <div className="w-full flex flex-col items-center">
      {/* Hero Section */}
      <section className="w-full max-w-5xl px-4 pt-8 pb-16 text-center flex flex-col items-center">
        {/* Glowing Top Pill */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-purple-950/60 border border-purple-500/30 text-purple-300 text-xs font-bold uppercase tracking-widest mb-6 shadow-lg shadow-purple-900/20 animate-pulse-subtle">
          <Zap className="w-3.5 h-3.5 text-cyan-400" />
          <span>Real-Time Multiplayer Combat Arena</span>
        </div>

        {/* Hero Title */}
        <h1 className="text-4xl sm:text-6xl md:text-7xl font-black tracking-tight leading-none text-white max-w-4xl">
          THINK FAST. <br className="hidden sm:inline" />
          <span className="bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-500 bg-clip-text text-transparent">
            ANSWER FASTER.
          </span>
          <br />
          BECOME CHAMPION.
        </h1>

        <p className="mt-6 text-base sm:text-xl text-slate-300 max-w-2xl font-normal leading-relaxed">
          Challenge friends or colleagues to instant, synchronized trivia battles. No registration, no app downloads—just pure real-time competitive knowledge.
        </p>

        {/* Error notification if any */}
        {error && (
          <div className="mt-6 w-full max-w-md bg-rose-950/80 border border-rose-500/50 text-rose-200 text-sm font-semibold p-4 rounded-2xl shadow-xl flex items-center justify-between">
            <span>{error}</span>
            <button
              onClick={clearError}
              className="text-rose-400 hover:text-white font-bold ml-2 text-xs uppercase"
            >
              Dismiss
            </button>
          </div>
        )}

        {/* Interactive Play Station Form Card */}
        <div className="mt-10 w-full max-w-md glass-panel p-6 sm:p-8 rounded-3xl border border-purple-500/30 shadow-2xl relative">
          <div className="absolute -top-10 -right-10 w-40 h-40 bg-pink-500/10 rounded-full blur-2xl pointer-events-none" />
          <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-cyan-500/10 rounded-full blur-2xl pointer-events-none" />

          {/* Avatar Selector Carousel */}
          <div className="flex flex-col items-center mb-6">
            <span className="text-xs font-bold uppercase tracking-wider text-purple-300 mb-2">
              Select Your Arena Avatar
            </span>
            <div className="flex items-center gap-2 overflow-x-auto py-2 px-1 max-w-full">
              {[0, 1, 2, 3, 4, 5, 6, 7].map((seed) => {
                const isSelected = avatarSeed === seed;
                return (
                  <button
                    key={seed}
                    type="button"
                    onClick={() => {
                      setAvatarSeed(seed);
                      sound.playClick();
                    }}
                    className={`p-1 rounded-2xl transition-all cursor-pointer ${
                      isSelected
                        ? 'ring-2 ring-cyan-400 scale-110 shadow-lg'
                        : 'opacity-60 hover:opacity-100 hover:scale-105'
                    }`}
                  >
                    <Avatar seed={seed} size="md" />
                  </button>
                );
              })}
            </div>
            <span className="text-xs text-slate-400 mt-1 font-medium">
              {getAvatarMeta(avatarSeed).name}
            </span>
          </div>

          {/* Nickname Input */}
          <div className="mb-6 text-left">
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-2">
              Your Battle Nickname
            </label>
            <input
              type="text"
              value={nickname}
              onChange={(e) => handleNicknameChange(e.target.value)}
              placeholder="e.g. CyberNinja, Flash, Alex..."
              maxLength={20}
              className="w-full px-4 py-3.5 rounded-2xl bg-black/40 border border-purple-500/30 text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400 focus:ring-2 focus:ring-cyan-500/20 font-bold text-base transition-all"
            />
          </div>

          {/* Mode Tabs: Create Room / Join Room */}
          <div className="grid grid-cols-2 p-1 bg-black/40 rounded-2xl mb-6 border border-white/5">
            <button
              type="button"
              onClick={() => {
                setActiveTab('create');
                sound.playClick();
              }}
              className={`py-2.5 text-xs font-black uppercase tracking-wider rounded-xl transition-all cursor-pointer ${
                activeTab === 'create'
                  ? 'bg-gradient-to-r from-purple-600 to-indigo-600 text-white shadow-md'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              Create Room
            </button>
            <button
              type="button"
              onClick={() => {
                setActiveTab('join');
                sound.playClick();
              }}
              className={`py-2.5 text-xs font-black uppercase tracking-wider rounded-xl transition-all cursor-pointer ${
                activeTab === 'join'
                  ? 'bg-gradient-to-r from-cyan-600 to-blue-600 text-white shadow-md'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              Join Room
            </button>
          </div>

          {/* Create Room Form */}
          {activeTab === 'create' ? (
            <form onSubmit={handleCreate}>
              <button
                type="submit"
                className="w-full py-4 px-6 rounded-2xl bg-gradient-to-r from-purple-600 via-indigo-600 to-cyan-500 hover:from-purple-500 hover:to-cyan-400 text-white font-black text-base shadow-lg shadow-purple-600/40 flex items-center justify-center gap-2 transition-all transform hover:scale-[1.02] cursor-pointer"
              >
                <Plus className="w-5 h-5" />
                <span>Create Multiplayer Room</span>
              </button>
              <p className="text-[11px] text-slate-400 mt-3 text-center">
                You will be the Host and receive a 6-digit room code to invite challengers.
              </p>
            </form>
          ) : (
            /* Join Room Form */
            <form onSubmit={handleJoin} className="space-y-4">
              <div>
                <input
                  type="text"
                  value={roomCodeInput}
                  onChange={(e) => {
                    setRoomCodeInput(e.target.value.toUpperCase());
                    clearError();
                  }}
                  placeholder="Enter 6-char Room Code"
                  maxLength={6}
                  className="w-full text-center font-mono tracking-widest text-2xl uppercase px-4 py-3 rounded-2xl bg-black/40 border border-cyan-500/40 text-cyan-300 placeholder-slate-600 focus:outline-none focus:border-cyan-400 focus:ring-2 focus:ring-cyan-500/30 font-black transition-all"
                />
              </div>

              <button
                type="submit"
                disabled={roomCodeInput.trim().length !== 6}
                className="w-full py-4 px-6 rounded-2xl bg-gradient-to-r from-cyan-500 via-blue-600 to-indigo-600 hover:from-cyan-400 hover:to-indigo-500 disabled:opacity-40 disabled:cursor-not-allowed text-white font-black text-base shadow-lg shadow-cyan-600/40 flex items-center justify-center gap-2 transition-all transform hover:scale-[1.02] cursor-pointer"
              >
                <span>Enter Arena</span>
                <ArrowRight className="w-5 h-5" />
              </button>
            </form>
          )}
        </div>
      </section>

      {/* How To Play Section */}
      <section className="w-full max-w-5xl px-4 py-16 border-t border-purple-900/30">
        <div className="text-center mb-12">
          <h2 className="text-2xl sm:text-4xl font-extrabold text-white">How To Battle</h2>
          <p className="text-slate-400 text-sm sm:text-base mt-2">Four simple steps to dominate the quiz arena</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="glass-card p-6 rounded-2xl border-white/5 relative group hover:border-purple-500/30 transition-all">
            <div className="w-10 h-10 rounded-xl bg-purple-600/20 text-purple-400 flex items-center justify-center font-black text-lg mb-4 border border-purple-500/30">
              1
            </div>
            <h3 className="text-lg font-bold text-white mb-2">Create or Join</h3>
            <p className="text-sm text-slate-400 leading-relaxed">
              Launch a private room and share your 6-character room code or invite link with friends.
            </p>
          </div>

          <div className="glass-card p-6 rounded-2xl border-white/5 relative group hover:border-cyan-500/30 transition-all">
            <div className="w-10 h-10 rounded-xl bg-cyan-600/20 text-cyan-400 flex items-center justify-center font-black text-lg mb-4 border border-cyan-500/30">
              2
            </div>
            <h3 className="text-lg font-bold text-white mb-2">Beat The Clock</h3>
            <p className="text-sm text-slate-400 leading-relaxed">
              Questions appear simultaneously. Fast correct answers award up to 500 bonus speed points.
            </p>
          </div>

          <div className="glass-card p-6 rounded-2xl border-white/5 relative group hover:border-pink-500/30 transition-all">
            <div className="w-10 h-10 rounded-xl bg-pink-600/20 text-pink-400 flex items-center justify-center font-black text-lg mb-4 border border-pink-500/30">
              3
            </div>
            <h3 className="text-lg font-bold text-white mb-2">Stack Streaks</h3>
            <p className="text-sm text-slate-400 leading-relaxed">
              Chain consecutive correct answers to multiply streak points and climb the live leaderboard.
            </p>
          </div>

          <div className="glass-card p-6 rounded-2xl border-white/5 relative group hover:border-yellow-500/30 transition-all">
            <div className="w-10 h-10 rounded-xl bg-yellow-600/20 text-yellow-400 flex items-center justify-center font-black text-lg mb-4 border border-yellow-500/30">
              4
            </div>
            <h3 className="text-lg font-bold text-white mb-2">Claim The Podium</h3>
            <p className="text-sm text-slate-400 leading-relaxed">
              Celebrate your victory on the 3D podium with confetti, share scores, and trigger instant rematches.
            </p>
          </div>
        </div>
      </section>

      {/* Feature Highlights Grid */}
      <section className="w-full max-w-5xl px-4 py-16 border-t border-purple-900/30">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="glass-panel p-6 rounded-3xl border-purple-500/20 flex flex-col items-start">
            <div className="w-12 h-12 rounded-2xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400 mb-4">
              <Zap className="w-6 h-6" />
            </div>
            <h4 className="text-lg font-bold text-white mb-1">Authoritative Server Sync</h4>
            <p className="text-sm text-slate-400">
              Zero client tampering. Timers, question delivery, and speed bonus calculations run securely on Node.js & WebSockets.
            </p>
          </div>

          <div className="glass-panel p-6 rounded-3xl border-purple-500/20 flex flex-col items-start">
            <div className="w-12 h-12 rounded-2xl bg-purple-500/10 border border-purple-500/30 flex items-center justify-center text-purple-400 mb-4">
              <Trophy className="w-6 h-6" />
            </div>
            <h4 className="text-lg font-bold text-white mb-1">100+ Curated Questions</h4>
            <p className="text-sm text-slate-400">
              Spanning Science, Technology, Sports, History, Geography, and General Knowledge across multiple difficulties.
            </p>
          </div>

          <div className="glass-panel p-6 rounded-3xl border-purple-500/20 flex flex-col items-start">
            <div className="w-12 h-12 rounded-2xl bg-pink-500/10 border border-pink-500/30 flex items-center justify-center text-pink-400 mb-4">
              <Smartphone className="w-6 h-6" />
            </div>
            <h4 className="text-lg font-bold text-white mb-1">Mobile & Desktop Friendly</h4>
            <p className="text-sm text-slate-400">
              Flawless responsive touch layout engineered for phones, tablets, and laptops without installing any apps.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};
