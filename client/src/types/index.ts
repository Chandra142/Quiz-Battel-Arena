export type Difficulty = 'easy' | 'medium' | 'hard';
export type Category = 
  | 'All'
  | 'General Knowledge' 
  | 'Science' 
  | 'Technology' 
  | 'Sports' 
  | 'History' 
  | 'Geography';

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

export interface PlayerSummary {
  id: string;
  nickname: string;
  avatarSeed: number;
  score: number;
  streak: number;
  correctAnswers: number;
  isHost: boolean;
  hasAnsweredCurrent: boolean;
}

export interface GameSettings {
  questionCount: number;
  questionTimer: number;
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
  positionChange: number;
}

export interface RoomStateSummary {
  code: string;
  hostId: string;
  phase: GamePhase;
  settings: GameSettings;
  players: PlayerSummary[];
  currentQuestionNumber: number;
  totalQuestions: number;
  currentQuestion?: ClientQuestion;
  timerRemaining: number;
  lastReveal?: AnswerRevealData;
  leaderboard?: LeaderboardEntry[];
  winner?: LeaderboardEntry;
}
