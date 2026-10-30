import React, { createContext, useContext, useEffect, useState, useCallback, useRef } from 'react';
import { io, Socket } from 'socket.io-client';
import { RoomStateSummary, PlayerSummary, GameSettings, ClientQuestion, AnswerRevealData, LeaderboardEntry } from '../types';
import { sound } from '../services/soundManager';

interface SocketContextValue {
  socket: Socket | null;
  isConnected: boolean;
  roomState: RoomStateSummary | null;
  myPlayerId: string;
  myPlayer: PlayerSummary | null;
  error: string | null;
  notification: string | null;
  currentQuestion: ClientQuestion | null;
  timerRemaining: number;
  lastReveal: AnswerRevealData | null;
  leaderboard: LeaderboardEntry[];
  winner: LeaderboardEntry | null;
  selectedOption: number | null;
  serverUrl: string;
  updateServerUrl: (url: string) => void;
  createRoom: (nickname: string, avatarSeed?: number) => void;
  joinRoom: (roomCode: string, nickname: string, avatarSeed?: number) => void;
  updateSettings: (settings: Partial<GameSettings>) => void;
  startGame: () => void;
  submitAnswer: (optionIndex: number) => void;
  playAgain: () => void;
  leaveRoom: () => void;
  clearError: () => void;
}

const SocketContext = createContext<SocketContextValue | undefined>(undefined);

export const getStoredServerUrl = (): string => {
  if (typeof window !== 'undefined') {
    const custom = localStorage.getItem('qba_server_url');
    if (custom) return custom.trim();
  }
  if (import.meta.env.VITE_SERVER_URL) {
    return import.meta.env.VITE_SERVER_URL.trim();
  }
  if (typeof window !== 'undefined') {
    if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
      return `${window.location.protocol}//${window.location.hostname}:3001`;
    }
  }
  return '';
};

export const SocketProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [socket, setSocket] = useState<Socket | null>(null);
  const [isConnected, setIsConnected] = useState<boolean>(false);
  const [roomState, setRoomState] = useState<RoomStateSummary | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [notification, setNotification] = useState<string | null>(null);
  const [timerRemaining, setTimerRemaining] = useState<number>(0);
  const [currentQuestion, setCurrentQuestion] = useState<ClientQuestion | null>(null);
  const [lastReveal, setLastReveal] = useState<AnswerRevealData | null>(null);
  const [leaderboard, setLeaderboard] = useState<LeaderboardEntry[]>([]);
  const [winner, setWinner] = useState<LeaderboardEntry | null>(null);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);

  const [serverUrl, setServerUrl] = useState<string>(() => getStoredServerUrl());

  const updateServerUrl = useCallback((newUrl: string) => {
    const clean = newUrl.trim().replace(/\/+$/, ''); // Remove trailing slashes
    if (typeof window !== 'undefined') {
      if (clean) {
        localStorage.setItem('qba_server_url', clean);
      } else {
        localStorage.removeItem('qba_server_url');
      }
    }
    setServerUrl(clean || getStoredServerUrl());
  }, []);

  // Persistent Player ID
  const [myPlayerId] = useState<string>(() => {
    if (typeof window !== 'undefined') {
      const stored = localStorage.getItem('qba_player_id');
      if (stored) return stored;
      const newId = 'p_' + Math.random().toString(36).substring(2, 10);
      localStorage.setItem('qba_player_id', newId);
      return newId;
    }
    return 'p_' + Math.random().toString(36).substring(2, 10);
  });

  const socketRef = useRef<Socket | null>(null);

  useEffect(() => {
    if (!serverUrl) {
      setIsConnected(false);
      return;
    }

    const s = io(serverUrl, {
      transports: ['websocket', 'polling'],
      reconnectionAttempts: 10,
      reconnectionDelay: 1000
    });

    socketRef.current = s;
    setSocket(s);

    s.on('connect', () => {
      // console.log('[Socket] Connected to game server:', s.id);
      setIsConnected(true);
    });

    s.on('disconnect', () => {
      // console.log('[Socket] Disconnected from server');
      setIsConnected(false);
    });

    s.on('room_created', (data: { roomCode: string; roomState: RoomStateSummary }) => {
      setRoomState(data.roomState);
      setError(null);
      sound.playClick();
    });

    s.on('joined_room_success', (data: { roomCode: string; roomState: RoomStateSummary }) => {
      setRoomState(data.roomState);
      setError(null);
      sound.playClick();
    });

    s.on('join_error', (data: { message: string }) => {
      setError(data.message);
      sound.playWrong();
    });

    s.on('game_error', (data: { message: string }) => {
      setError(data.message);
      sound.playWrong();
    });

    s.on('player_joined', (data: { message: string }) => {
      setNotification(data.message);
      sound.playSelect();
      setTimeout(() => setNotification(null), 3500);
    });

    s.on('player_left', (data: { message: string }) => {
      setNotification(data.message);
      setTimeout(() => setNotification(null), 3500);
    });

    s.on('room_state_update', (updated: RoomStateSummary) => {
      setRoomState(updated);
      setTimerRemaining(updated.timerRemaining);
      if (updated.currentQuestion) {
        setCurrentQuestion(updated.currentQuestion);
      }
      if (updated.lastReveal) {
        setLastReveal(updated.lastReveal);
      }
      if (updated.leaderboard) {
        setLeaderboard(updated.leaderboard);
      }
      if (updated.winner) {
        setWinner(updated.winner);
      }
    });

    s.on('countdown_tick', (data: { count: number }) => {
      sound.playTick(true);
    });

    s.on('new_question', (data: { question: ClientQuestion; timerSeconds: number }) => {
      setCurrentQuestion(data.question);
      setTimerRemaining(data.timerSeconds);
      setSelectedOption(null);
      setLastReveal(null);
      sound.playSelect();
    });

    s.on('timer_update', (data: { timerRemaining: number }) => {
      setTimerRemaining(data.timerRemaining);
      if (data.timerRemaining <= 5 && data.timerRemaining > 0) {
        sound.playTick(true);
      }
    });

    s.on('reveal_answer', (data: { reveal: AnswerRevealData; leaderboard: LeaderboardEntry[] }) => {
      setLastReveal(data.reveal);
      setLeaderboard(data.leaderboard);

      // Check if this player was correct
      const myResult = data.reveal.playerAnswers.find((p) => p.playerId === myPlayerId);
      if (myResult?.isCorrect) {
        sound.playCorrect();
      } else {
        sound.playWrong();
      }
    });

    s.on('game_finished', (data: { leaderboard: LeaderboardEntry[]; winner?: LeaderboardEntry }) => {
      setLeaderboard(data.leaderboard);
      if (data.winner) setWinner(data.winner);
      sound.playFanfare();
    });

    s.on('game_reset_to_lobby', (data: { state: RoomStateSummary }) => {
      setRoomState(data.state);
      setCurrentQuestion(null);
      setLastReveal(null);
      setSelectedOption(null);
      setWinner(null);
      sound.playClick();
    });

    return () => {
      s.disconnect();
    };
  }, [serverUrl, myPlayerId]);

  const clearError = useCallback(() => {
    setError(null);
  }, []);

  const createRoom = useCallback((nickname: string, avatarSeed?: number) => {
    if (!socketRef.current) return;
    setError(null);
    socketRef.current.emit('create_room', {
      playerId: myPlayerId,
      nickname,
      avatarSeed: avatarSeed ?? Math.floor(Math.random() * 8)
    });
  }, [myPlayerId]);

  const joinRoom = useCallback((roomCode: string, nickname: string, avatarSeed?: number) => {
    if (!socketRef.current) return;
    setError(null);
    socketRef.current.emit('join_room', {
      roomCode,
      playerId: myPlayerId,
      nickname,
      avatarSeed: avatarSeed ?? Math.floor(Math.random() * 8)
    });
  }, [myPlayerId]);

  const updateSettings = useCallback((settings: Partial<GameSettings>) => {
    if (!socketRef.current || !roomState) return;
    socketRef.current.emit('update_settings', {
      roomCode: roomState.code,
      playerId: myPlayerId,
      settings
    });
  }, [roomState, myPlayerId]);

  const startGame = useCallback(() => {
    if (!socketRef.current || !roomState) return;
    setError(null);
    socketRef.current.emit('start_game', {
      roomCode: roomState.code,
      playerId: myPlayerId
    });
  }, [roomState, myPlayerId]);

  const submitAnswer = useCallback((optionIndex: number) => {
    if (!socketRef.current || !roomState) return;
    setSelectedOption(optionIndex);
    sound.playSelect();
    socketRef.current.emit('submit_answer', {
      roomCode: roomState.code,
      playerId: myPlayerId,
      optionIndex
    });
  }, [roomState, myPlayerId]);

  const playAgain = useCallback(() => {
    if (!socketRef.current || !roomState) return;
    socketRef.current.emit('play_again', {
      roomCode: roomState.code,
      playerId: myPlayerId
    });
  }, [roomState, myPlayerId]);

  const leaveRoom = useCallback(() => {
    if (!socketRef.current) return;
    socketRef.current.emit('leave_room');
    setRoomState(null);
    setCurrentQuestion(null);
    setLastReveal(null);
    setSelectedOption(null);
    setLeaderboard([]);
    setWinner(null);
    sound.playClick();
  }, []);

  const myPlayer = roomState?.players.find((p) => p.id === myPlayerId) || null;

  return (
    <SocketContext.Provider
      value={{
        socket,
        isConnected,
        roomState,
        myPlayerId,
        myPlayer,
        error,
        notification,
        currentQuestion,
        timerRemaining,
        lastReveal,
        leaderboard,
        winner,
        selectedOption,
        serverUrl,
        updateServerUrl,
        createRoom,
        joinRoom,
        updateSettings,
        startGame,
        submitAnswer,
        playAgain,
        leaveRoom,
        clearError
      }}
    >
      {children}
    </SocketContext.Provider>
  );
};

export const useSocket = () => {
  const context = useContext(SocketContext);
  if (!context) {
    throw new Error('useSocket must be used within a SocketProvider');
  }
  return context;
};
