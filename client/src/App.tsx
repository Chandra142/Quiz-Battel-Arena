import React from 'react';
import { SocketProvider, useSocket } from './context/SocketContext';
import { Navbar } from './components/Navbar';
import { LandingPage } from './pages/LandingPage';
import { LobbyPage } from './pages/LobbyPage';
import { GamePage } from './pages/GamePage';
import { ResultsPage } from './pages/ResultsPage';
import { Sparkles } from 'lucide-react';

const GameRouter: React.FC = () => {
  const { roomState, notification } = useSocket();

  const renderActiveScreen = () => {
    if (!roomState) {
      return <LandingPage />;
    }

    switch (roomState.phase) {
      case 'LOBBY':
        return <LobbyPage />;
      case 'STARTING':
      case 'QUESTION':
      case 'REVEAL':
      case 'LEADERBOARD':
        return <GamePage />;
      case 'GAME_OVER':
        return <ResultsPage />;
      default:
        return <LandingPage />;
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#0a0815] text-slate-100 selection:bg-purple-600 selection:text-white">
      <Navbar />

      {/* Floating Notification Toast */}
      {notification && (
        <div className="fixed top-18 left-1/2 -translate-x-1/2 z-50 animate-bounce">
          <div className="bg-gradient-to-r from-purple-900/90 to-cyan-900/90 border border-cyan-400/50 backdrop-blur-md text-white text-xs font-bold px-4 py-2 rounded-full shadow-2xl flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-cyan-300" />
            <span>{notification}</span>
          </div>
        </div>
      )}

      {/* Main Page Area */}
      <main className="flex-1 flex flex-col items-center justify-start w-full">
        {renderActiveScreen()}
      </main>

      {/* Footer */}
      <footer className="w-full border-t border-purple-900/20 py-6 px-4 text-center text-xs text-slate-500 bg-[#07050e]/60">
        <div className="max-w-5xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="flex items-center gap-1.5 font-medium">
            <span className="text-purple-400 font-bold">Quiz Battle Arena</span> — Real-Time Multiplayer Competitive Engine
          </p>
          <div className="flex items-center gap-4 text-slate-400">
            <span>Server-Authoritative</span>
            <span>•</span>
            <span>WebSockets</span>
            <span>•</span>
            <span>No Registration</span>
          </div>
        </div>
      </footer>
    </div>
  );
};

export const App: React.FC = () => {
  return (
    <SocketProvider>
      <GameRouter />
    </SocketProvider>
  );
};

export default App;
