export type Difficulty = 'easy' | 'medium' | 'hard';
export type Category = 
  | 'All'
  | 'General Knowledge' 
  | 'Science' 
  | 'Technology' 
  | 'Sports' 
  | 'History' 
  | 'Geography';

export interface Question {
  id: string;
  text: string;
  options: [string, string, string, string];
  correctAnswer: number; // 0, 1, 2, 3
  category: string;
  difficulty: Difficulty;
  explanation?: string;
}

export interface ClientQuestion {
  id: string;
  text: string;
  options: [string, string, string, string];
  category: string;
  difficulty: Difficulty;
  questionNumber: number;
  totalQuestions: number;
  timerSeconds: number;
}

export interface Player {
  id: string;
  socketId: string;
  nickname: string;
  avatarSeed: number; // Avatar variation identifier
  score: number;
  streak: number;
  correctAnswers: number;
  isHost: boolean;
  hasAnsweredCurrent: boolean;
  selectedOption?: number;
  answerTimeMs?: number;
  pointsEarnedLastRound?: number;
}

export interface GameSettings {
  questionCount: number; // 5, 10, 15
  questionTimer: number; // 10, 15, 20 seconds
  difficulty: 'all' | Difficulty;
  category: Category;
}

export type GamePhase = 
  | 'LOBBY' 
  | 'STARTING' 
  | 'QUESTION' 
  | 'REVEAL' 
  | 'LEADERBOARD' 
  | 'GAME_OVER';

export interface AnswerRevealData {
  questionId: string;
  correctAnswer: number;
  explanation?: string;
  playerAnswers: {
    playerId: string;
    nickname: string;
    avatarSeed: number;
    selectedOption: number | null;
    isCorrect: boolean;
    pointsEarned: number;
    totalScore: number;
    streak: number;
  }[];
}

export interface LeaderboardEntry {
  rank: number;
  playerId: string;
  nickname: string;
  avatarSeed: number;
  score: number;
  correctAnswers: number;
  streak: number;
  isHost: boolean;
  pointsEarnedLastRound?: number;
  positionChange: number; // e.g. +1, -1, 0
}

export interface RoomStateSummary {
  code: string;
  hostId: string;
  phase: GamePhase;
  settings: GameSettings;
  players: {
    id: string;
    nickname: string;
    avatarSeed: number;
    score: number;
    streak: number;
    correctAnswers: number;
    isHost: boolean;
    hasAnsweredCurrent: boolean;
  }[];
  currentQuestionNumber: number;
  totalQuestions: number;
  currentQuestion?: ClientQuestion;
  timerRemaining: number;
  lastReveal?: AnswerRevealData;
  leaderboard?: LeaderboardEntry[];
  winner?: LeaderboardEntry;
}
