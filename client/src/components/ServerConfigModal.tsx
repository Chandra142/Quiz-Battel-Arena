import React, { useState } from 'react';
import { Server, Check, X, Wifi, AlertTriangle } from 'lucide-react';
import { useSocket } from '../context/SocketContext';
import { sound } from '../services/soundManager';

interface ServerConfigModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ServerConfigModal: React.FC<ServerConfigModalProps> = ({ isOpen, onClose }) => {
  const { serverUrl, updateServerUrl, isConnected } = useSocket();
  const [inputUrl, setInputUrl] = useState<string>(serverUrl || '');
  const [testStatus, setTestStatus] = useState<'idle' | 'testing' | 'success' | 'failed'>('idle');

  if (!isOpen) return null;

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    sound.playClick();
    updateServerUrl(inputUrl);
    onClose();
  };

  const handleTest = async () => {
    if (!inputUrl) return;
    setTestStatus('testing');
    try {
      const clean = inputUrl.trim().replace(/\/+$/, '');
      const res = await fetch(`${clean}/health`, { method: 'GET' });
      if (res.ok) {
        setTestStatus('success');
      } else {
        setTestStatus('failed');
      }
    } catch {
      setTestStatus('failed');
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/80 backdrop-blur-md animate-fadeIn overflow-y-auto">
      <div className="w-full max-w-md glass-panel p-4 sm:p-6 md:p-8 rounded-2xl sm:rounded-3xl border border-purple-500/30 shadow-2xl relative my-auto">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2 text-purple-300 min-w-0">
            <Server className="w-5 h-5 text-cyan-400 shrink-0" />
            <h3 className="text-sm sm:text-base font-black uppercase tracking-wider text-white truncate">
              Backend Server Settings
            </h3>
          </div>
          <button
            onClick={() => {
              sound.playClick();
              onClose();
            }}
            className="p-1.5 rounded-xl text-slate-400 hover:text-white hover:bg-white/10 transition-colors shrink-0"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <p className="text-xs text-slate-300 leading-relaxed mb-4">
          The frontend is hosted on Vercel. To enable live multiplayer synchronization, connect to your Node.js & Socket.IO backend (e.g. deployed on Render or Fly.io).
        </p>

        <form onSubmit={handleSave} className="space-y-4">
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-1.5">
              Backend Socket URL
            </label>
            <div className="flex flex-col sm:flex-row gap-2">
              <input
                type="text"
                value={inputUrl}
                onChange={(e) => {
                  setInputUrl(e.target.value);
                  setTestStatus('idle');
                }}
                placeholder="https://your-service.onrender.com"
                className="flex-1 px-3.5 py-2.5 rounded-xl bg-black/40 border border-purple-500/30 text-white placeholder-slate-600 focus:outline-none focus:border-cyan-400 font-mono text-xs w-full"
              />
              <button
                type="button"
                onClick={handleTest}
                disabled={testStatus === 'testing' || !inputUrl}
                className="px-4 py-2.5 rounded-xl bg-purple-900/50 hover:bg-purple-800 border border-purple-500/30 text-xs font-bold text-purple-200 shrink-0"
              >
                {testStatus === 'testing' ? 'Testing...' : 'Test'}
              </button>
            </div>
          </div>

          {/* Test Status feedback */}
          {testStatus === 'success' && (
            <div className="flex items-center gap-2 text-xs font-semibold text-emerald-400 bg-emerald-950/40 p-2.5 rounded-xl border border-emerald-500/30">
              <Check className="w-4 h-4 shrink-0" />
              <span>Backend server is reachable!</span>
            </div>
          )}

          {testStatus === 'failed' && (
            <div className="flex items-center gap-2 text-xs font-semibold text-rose-400 bg-rose-950/40 p-2.5 rounded-xl border border-rose-500/30">
              <AlertTriangle className="w-4 h-4 shrink-0" />
              <span>Could not reach server. Verify the URL is correct.</span>
            </div>
          )}

          {/* Current status summary */}
          <div className="p-3 rounded-xl bg-black/30 border border-white/5 flex flex-col sm:flex-row sm:items-center justify-between gap-1.5 text-xs">
            <span className="text-slate-400 font-medium">Socket Connection:</span>
            <span className={`font-bold flex items-center gap-1.5 ${isConnected ? 'text-emerald-400' : 'text-amber-400'}`}>
              <Wifi className="w-3.5 h-3.5 shrink-0" />
              {isConnected ? 'Connected & Ready' : 'Awaiting Valid Backend'}
            </span>
          </div>

          {/* Action buttons */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-end gap-2.5 pt-2">
            <button
              type="button"
              onClick={() => {
                setInputUrl('http://localhost:3001');
                setTestStatus('idle');
              }}
              className="text-xs text-slate-400 hover:text-white underline cursor-pointer text-center sm:text-left sm:mr-auto py-1"
            >
              Reset to Localhost
            </button>
            <div className="flex items-center gap-2 w-full sm:w-auto">
              <button
                type="button"
                onClick={onClose}
                className="flex-1 sm:flex-none px-4 py-2.5 rounded-xl text-xs font-bold text-slate-400 hover:text-white bg-slate-800 transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="flex-1 sm:flex-none px-5 py-2.5 rounded-xl text-xs font-black uppercase tracking-wider bg-gradient-to-r from-cyan-500 to-purple-600 text-white shadow-lg transition-transform active:scale-95"
              >
                Save & Connect
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};
