import React, { useState } from 'react';
import { Swords, Volume2, VolumeX, Wifi, WifiOff, LogOut, Copy, Check, Server } from 'lucide-react';
import { useSocket } from '../context/SocketContext';
import { sound } from '../services/soundManager';
import { ServerConfigModal } from './ServerConfigModal';

export const Navbar: React.FC = () => {
  const { isConnected, roomState, leaveRoom } = useSocket();
  const [isMuted, setIsMuted] = useState<boolean>(() => sound.getMuted());
  const [copied, setCopied] = useState<boolean>(false);
  const [isServerModalOpen, setIsServerModalOpen] = useState<boolean>(false);

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
    <>
      <header className="sticky top-0 z-40 w-full border-b border-purple-900/30 bg-[#0c0919]/90 backdrop-blur-md px-3 sm:px-6 lg:px-8 py-2.5 sm:py-3.5 flex items-center justify-between gap-2">
        {/* Brand */}
        <div className="flex items-center gap-2 sm:gap-3 min-w-0">
          <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-lg sm:rounded-xl bg-gradient-to-br from-indigo-500 via-purple-600 to-pink-500 flex items-center justify-center shadow-lg shadow-purple-600/30 border border-purple-400/30 shrink-0">
            <Swords className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
          </div>
          <div className="min-w-0">
            <h1 className="text-sm sm:text-base md:text-lg font-black tracking-wider bg-gradient-to-r from-white via-purple-200 to-cyan-300 bg-clip-text text-transparent flex items-center gap-1.5 truncate">
              QUIZ BATTLE <span className="text-[9px] sm:text-xs bg-purple-600/30 text-purple-300 border border-purple-500/30 px-1.5 py-0.2 sm:px-2 sm:py-0.5 rounded font-bold uppercase tracking-widest shrink-0">ARENA</span>
            </h1>
            <p className="hidden sm:block text-[10px] md:text-[11px] text-purple-300/60 font-medium truncate">Real-Time Multiplayer Combat</p>
          </div>
        </div>

        {/* Center: Room Code Quick Badge if in room */}
        {roomState && (
          <div className="hidden md:flex items-center gap-2 bg-purple-950/40 border border-purple-500/20 px-3 py-1.5 rounded-xl shrink-0">
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
        <div className="flex items-center gap-1.5 sm:gap-2.5 shrink-0">
          {/* Connection status indicator (Clickable to configure server URL) */}
          <button
            onClick={() => {
              sound.playClick();
              setIsServerModalOpen(true);
            }}
            title={isConnected ? 'Live Server Connected (Click to configure)' : 'Click to configure Backend Server URL'}
            className={`flex items-center gap-1 sm:gap-1.5 px-2 py-1 sm:px-2.5 sm:py-1 rounded-full text-[11px] sm:text-xs font-semibold border cursor-pointer transition-all hover:scale-105 ${
              isConnected
                ? 'bg-emerald-950/40 text-emerald-400 border-emerald-500/30 hover:bg-emerald-900/50'
                : 'bg-rose-950/40 text-rose-400 border-rose-500/30 hover:bg-rose-900/50 animate-pulse'
            }`}
          >
            {isConnected ? (
              <>
                <span className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-emerald-400 animate-ping" />
                <Wifi className="w-3 h-3 sm:w-3.5 sm:h-3.5 shrink-0" />
                <span className="hidden sm:inline">Online</span>
              </>
            ) : (
              <>
                <WifiOff className="w-3 h-3 sm:w-3.5 sm:h-3.5 shrink-0" />
                <span className="hidden sm:inline">Connect</span>
              </>
            )}
            <Server className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-slate-400 ml-0.5" />
          </button>

          {/* Audio Mute/Unmute */}
          <button
            onClick={toggleSound}
            title={isMuted ? 'Unmute Sound' : 'Mute Sound'}
            className="p-1.5 sm:p-2 rounded-lg sm:rounded-xl bg-purple-950/40 border border-purple-500/20 text-purple-300 hover:text-white hover:bg-purple-800/30 transition-all hover:scale-105 shrink-0"
          >
            {isMuted ? <VolumeX className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-rose-400" /> : <Volume2 className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-cyan-400" />}
          </button>

          {/* Leave Room if active */}
          {roomState && (
            <button
              onClick={leaveRoom}
              title="Leave current room"
              className="flex items-center gap-1 sm:gap-1.5 px-2 py-1 sm:px-3 sm:py-1.5 text-[11px] sm:text-xs font-bold text-rose-300 hover:text-rose-100 bg-rose-950/40 hover:bg-rose-900/50 border border-rose-500/30 rounded-lg sm:rounded-xl transition-all shrink-0"
            >
              <LogOut className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
              <span className="hidden sm:inline">Leave</span>
            </button>
          )}
        </div>
      </header>

      {/* Backend Server Settings Modal */}
      <ServerConfigModal
        isOpen={isServerModalOpen}
        onClose={() => setIsServerModalOpen(false)}
      />
    </>
  );
};
