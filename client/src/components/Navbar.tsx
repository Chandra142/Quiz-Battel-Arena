import React, { useState } from 'react';
import { Swords, Volume2, VolumeX, Wifi, WifiOff, LogOut, Copy, Check } from 'lucide-react';
import { useSocket } from '../context/SocketContext';
import { sound } from '../services/soundManager';

export const Navbar: React.FC = () => {
  const { isConnected, roomState, leaveRoom } = useSocket();
  const [isMuted, setIsMuted] = useState<boolean>(() => sound.getMuted());
  const [copied, setCopied] = useState<boolean>(false);

  const toggleSound = () => {
    const nextMuted = sound.toggleMute();
    setIsMuted(nextMuted);
    if (!nextMuted) {
      sound.playClick();
    }
  };

  const copyRoomCode = () => {
    if (roomState?.code) {
      navigator.clipboard.writeText(roomState.code);
      setCopied(true);
      sound.playClick();
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b border-purple-900/30 bg-[#0c0919]/80 backdrop-blur-md px-4 lg:px-8 py-3.5 flex items-center justify-between">
      {/* Brand */}
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-500 via-purple-600 to-pink-500 flex items-center justify-center shadow-lg shadow-purple-600/30 border border-purple-400/30">
          <Swords className="w-5 h-5 text-white" />
        </div>
        <div>
          <h1 className="text-lg font-black tracking-wider bg-gradient-to-r from-white via-purple-200 to-cyan-300 bg-clip-text text-transparent flex items-center gap-2">
            QUIZ BATTLE <span className="text-xs bg-purple-600/30 text-purple-300 border border-purple-500/30 px-2 py-0.5 rounded-md font-bold uppercase tracking-widest">ARENA</span>
          </h1>
          <p className="text-[11px] text-purple-300/60 font-medium">Real-Time Multiplayer Combat</p>
        </div>
      </div>

      {/* Center: Room Code Quick Badge if in room */}
      {roomState && (
        <div className="hidden sm:flex items-center gap-2 bg-purple-950/40 border border-purple-500/20 px-3 py-1.5 rounded-xl">
          <span className="text-xs text-purple-300/70 font-semibold uppercase tracking-wider">Room:</span>
          <span className="font-mono text-sm font-bold text-cyan-300 tracking-widest">{roomState.code}</span>
          <button
            onClick={copyRoomCode}
            title="Copy room code"
            className="p-1 text-purple-300/80 hover:text-white hover:bg-purple-800/40 rounded-md transition-colors"
          >
            {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
          </button>
        </div>
      )}

      {/* Right Controls */}
      <div className="flex items-center gap-2.5">
        {/* Connection status indicator */}
        <div
          title={isConnected ? 'Live WebSocket Connected' : 'Connecting to Server...'}
          className={`flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold border ${
            isConnected
              ? 'bg-emerald-950/40 text-emerald-400 border-emerald-500/30'
              : 'bg-rose-950/40 text-rose-400 border-rose-500/30 animate-pulse'
          }`}
        >
          {isConnected ? (
            <>
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
              <Wifi className="w-3.5 h-3.5" />
              <span className="hidden md:inline">Online</span>
            </>
          ) : (
            <>
              <WifiOff className="w-3.5 h-3.5" />
              <span className="hidden md:inline">Connecting</span>
            </>
          )}
        </div>

        {/* Audio Mute/Unmute */}
        <button
          onClick={toggleSound}
          title={isMuted ? 'Unmute Sound' : 'Mute Sound'}
          className="p-2 rounded-xl bg-purple-950/40 border border-purple-500/20 text-purple-300 hover:text-white hover:bg-purple-800/30 transition-all hover:scale-105"
        >
          {isMuted ? <VolumeX className="w-4 h-4 text-rose-400" /> : <Volume2 className="w-4 h-4 text-cyan-400" />}
        </button>

        {/* Leave Room if active */}
        {roomState && (
          <button
            onClick={leaveRoom}
            title="Leave current room"
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold text-rose-300 hover:text-rose-100 bg-rose-950/40 hover:bg-rose-900/50 border border-rose-500/30 rounded-xl transition-all"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Leave</span>
          </button>
        )}
      </div>
    </header>
  );
};
