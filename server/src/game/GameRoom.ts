import { Server as SocketIOServer } from 'socket.io';
import {
  Player,
  GameSettings,
  GamePhase,
  Question,
  ClientQuestion,
  AnswerRevealData,
  LeaderboardEntry,
  RoomStateSummary
} from '../types/index.js';
import { QuestionService } from '../questions/questionBank.js';

export class GameRoom {
  public code: string;
  public hostId: string;
  public phase: GamePhase = 'LOBBY';
  public settings: GameSettings = {
    questionCount: 5,
    questionTimer: 15,
    difficulty: 'all',
    category: 'All'
  };
  public players: Map<string, Player> = new Map();
  public questions: Question[] = [];
  public currentQuestionIndex: number = -1;
  public questionStartTime: number = 0;
  public timerRemaining: number = 0;
  public lastReveal?: AnswerRevealData;
  public previousRankings: Map<string, number> = new Map();
  public createdAt: number = Date.now();
  public lastActivityAt: number = Date.now();

  private io: SocketIOServer;
  private timerInterval?: NodeJS.Timeout;
  private revealTimeout?: NodeJS.Timeout;
  private countdownTimeout?: NodeJS.Timeout;

  constructor(code: string, hostId: string, io: SocketIOServer) {
    this.code = code;
    this.hostId = hostId;
    this.io = io;
  }

  public touch(): void {
    this.lastActivityAt = Date.now();
  }

  public addPlayer(
    id: string,
    socketId: string,
    nickname: string,
    avatarSeed: number
  ): { player: Player; error?: string } {
    this.touch();
    // Validate duplicate nickname
    for (const p of this.players.values()) {
      if (p.nickname.trim().toLowerCase() === nickname.trim().toLowerCase() && p.id !== id) {
        return { player: null as any, error: 'Nickname already taken in this room' };
      }
    }

    const isHost = this.players.size === 0 || id === this.hostId;
    if (isHost) {
      this.hostId = id;
    }

    // Reconnection or new
    let player = this.players.get(id);
    if (player) {
      player.socketId = socketId;
      player.nickname = nickname;
    } else {
      player = {
        id,
        socketId,
        nickname,
        avatarSeed,
        score: 0,
        streak: 0,
        correctAnswers: 0,
        isHost,
        hasAnsweredCurrent: false
      };
      this.players.set(id, player);
    }

    return { player };
  }

  public removePlayer(playerId: string): { wasHost: boolean; newHostId?: string } {
    this.touch();
    const wasHost = this.hostId === playerId;
    this.players.delete(playerId);

    if (wasHost && this.players.size > 0) {
      const nextPlayer = this.players.values().next().value;
      if (nextPlayer) {
        this.hostId = nextPlayer.id;
        nextPlayer.isHost = true;
        return { wasHost: true, newHostId: nextPlayer.id };
      }
    }

    // If all players left and game was running, clean timers
    if (this.players.size === 0) {
      this.clearAllTimers();
    }

    return { wasHost };
  }

  public updateSettings(hostId: string, newSettings: Partial<GameSettings>): boolean {
    if (this.hostId !== hostId || this.phase !== 'LOBBY') {
      return false;
    }
    this.touch();
    this.settings = { ...this.settings, ...newSettings };
    return true;
  }

  public startGame(hostId: string): { success: boolean; error?: string } {
    if (this.hostId !== hostId) {
      return { success: false, error: 'Only the host can start the game.' };
    }
    if (this.players.size < 2) {
      return { success: false, error: 'At least 2 players are required to start the battle.' };
    }
    if (this.phase !== 'LOBBY') {
      return { success: false, error: 'Game has already started.' };
    }

    this.touch();
    this.clearAllTimers();

    // Reset scores & streaks
    for (const player of this.players.values()) {
      player.score = 0;
      player.streak = 0;
      player.correctAnswers = 0;
      player.hasAnsweredCurrent = false;
      player.selectedOption = undefined;
      player.pointsEarnedLastRound = 0;
    }

    // Pick questions
    this.questions = QuestionService.getQuestions(
      this.settings.questionCount,
      this.settings.category,
      this.settings.difficulty
    );

    this.currentQuestionIndex = 0;
    this.phase = 'STARTING';
    this.timerRemaining = 3; // 3 second countdown

    this.broadcastState();

    let count = 3;
    this.timerInterval = setInterval(() => {
      count--;
      this.timerRemaining = count;
      if (count <= 0) {
        clearInterval(this.timerInterval);
        this.startQuestionRound();
      } else {
        this.io.to(this.code).emit('countdown_tick', { count });
      }
    }, 1000);

    return { success: true };
  }

  private startQuestionRound(): void {
    this.clearAllTimers();
    this.touch();
    this.phase = 'QUESTION';
    this.lastReveal = undefined;

    // Reset player round answers
    for (const player of this.players.values()) {
      player.hasAnsweredCurrent = false;
      player.selectedOption = undefined;
      player.answerTimeMs = undefined;
      player.pointsEarnedLastRound = 0;
    }

    const currentQ = this.questions[this.currentQuestionIndex];
    if (!currentQ) {
      this.finishGame();
      return;
    }

    this.questionStartTime = Date.now();
    this.timerRemaining = this.settings.questionTimer;

    const clientQuestion: ClientQuestion = {
      id: currentQ.id,
      text: currentQ.text,
      options: currentQ.options,
      category: currentQ.category,
      difficulty: currentQ.difficulty,
      questionNumber: this.currentQuestionIndex + 1,
      totalQuestions: this.questions.length,
      timerSeconds: this.settings.questionTimer
    };

    this.io.to(this.code).emit('new_question', {
      question: clientQuestion,
      timerSeconds: this.settings.questionTimer
    });

    this.broadcastState();

    // Start 1-second countdown ticks
    this.timerInterval = setInterval(() => {
      this.timerRemaining--;
      this.io.to(this.code).emit('timer_update', { timerRemaining: this.timerRemaining });

      if (this.timerRemaining <= 0) {
        clearInterval(this.timerInterval);
        this.revealCurrentAnswer();
      }
    }, 1000);
  }

  public submitAnswer(playerId: string, optionIndex: number): { success: boolean; error?: string } {
    if (this.phase !== 'QUESTION') {
      return { success: false, error: 'Cannot submit answer outside of active question phase.' };
    }

    const player = this.players.get(playerId);
    if (!player) {
      return { success: false, error: 'Player not found in room.' };
    }

    if (player.hasAnsweredCurrent) {
      return { success: false, error: 'Answer already submitted for this round.' };
    }

    if (optionIndex < 0 || optionIndex > 3) {
      return { success: false, error: 'Invalid option index.' };
    }

    this.touch();
    const answerTime = Date.now();
    player.hasAnsweredCurrent = true;
    player.selectedOption = optionIndex;
    player.answerTimeMs = answerTime - this.questionStartTime;

    // Notify room that this player locked in their answer (without revealing the choice)
    this.io.to(this.code).emit('player_answered', {
      playerId: player.id,
      hasAnswered: true
    });

    // Check if ALL active players have answered
    const allAnswered = Array.from(this.players.values()).every((p) => p.hasAnsweredCurrent);
    if (allAnswered) {
      this.clearAllTimers();
      this.revealCurrentAnswer();
    }

    return { success: true };
  }

  private revealCurrentAnswer(): void {
    this.clearAllTimers();
    this.touch();
    this.phase = 'REVEAL';

    const currentQ = this.questions[this.currentQuestionIndex];
    if (!currentQ) return;

    const revealList: AnswerRevealData['playerAnswers'] = [];

    // Calculate score on server
    for (const player of this.players.values()) {
      const selected = player.selectedOption ?? null;
      const isCorrect = selected === currentQ.correctAnswer;
      let pointsEarned = 0;

      if (isCorrect) {
        // Base score: 500
        const baseScore = 500;
        // Speed bonus: up to 500 based on remaining time
        const totalDurationMs = this.settings.questionTimer * 1000;
        const timeTakenMs = player.answerTimeMs ?? totalDurationMs;
        const remainingMs = Math.max(0, totalDurationMs - timeTakenMs);
        const speedBonus = Math.round((remainingMs / totalDurationMs) * 500);

        player.streak += 1;
        // Streak bonus: 50 points per streak level beyond 1 (capped at 200)
        const streakBonus = player.streak > 1 ? Math.min(200, (player.streak - 1) * 50) : 0;

        pointsEarned = baseScore + speedBonus + streakBonus;
        player.score += pointsEarned;
        player.correctAnswers += 1;
      } else {
        player.streak = 0;
        pointsEarned = 0;
      }

      player.pointsEarnedLastRound = pointsEarned;

      revealList.push({
        playerId: player.id,
        nickname: player.nickname,
        avatarSeed: player.avatarSeed,
        selectedOption: selected,
        isCorrect,
        pointsEarned,
        totalScore: player.score,
        streak: player.streak
      });
    }

    this.lastReveal = {
      questionId: currentQ.id,
      correctAnswer: currentQ.correctAnswer,
      explanation: currentQ.explanation,
      playerAnswers: revealList
    };

    const leaderboard = this.getLeaderboard();

    this.io.to(this.code).emit('reveal_answer', {
      reveal: this.lastReveal,
      leaderboard
    });

    this.broadcastState();

    // Wait 4 seconds for reveal inspection, then proceed
    this.revealTimeout = setTimeout(() => {
      this.currentQuestionIndex++;
      if (this.currentQuestionIndex < this.questions.length) {
        this.startQuestionRound();
      } else {
        this.finishGame();
      }
    }, 4500);
  }

  private finishGame(): void {
    this.clearAllTimers();
    this.touch();
    this.phase = 'GAME_OVER';

    const leaderboard = this.getLeaderboard();
    const winner = leaderboard.length > 0 ? leaderboard[0] : undefined;

    this.io.to(this.code).emit('game_finished', {
      leaderboard,
      winner
    });

    this.broadcastState();
  }

  public playAgain(hostId: string): { success: boolean; error?: string } {
    if (this.hostId !== hostId) {
      return { success: false, error: 'Only host can restart the game.' };
    }
    this.touch();
    this.clearAllTimers();
    this.phase = 'LOBBY';
    this.currentQuestionIndex = -1;
    this.questions = [];
    this.lastReveal = undefined;

    for (const player of this.players.values()) {
      player.score = 0;
      player.streak = 0;
      player.correctAnswers = 0;
      player.hasAnsweredCurrent = false;
      player.selectedOption = undefined;
      player.pointsEarnedLastRound = 0;
    }

    this.io.to(this.code).emit('game_reset_to_lobby', {
      state: this.getSummary()
    });

    this.broadcastState();
    return { success: true };
  }

  public getLeaderboard(): LeaderboardEntry[] {
    const sorted = Array.from(this.players.values()).sort((a, b) => {
      if (b.score !== a.score) return b.score - a.score;
      return b.correctAnswers - a.correctAnswers;
    });

    const entries: LeaderboardEntry[] = sorted.map((p, index) => {
      const currentRank = index + 1;
      const prevRank = this.previousRankings.get(p.id) ?? currentRank;
      const positionChange = prevRank - currentRank; // positive = went up, negative = went down

      return {
        rank: currentRank,
        playerId: p.id,
        nickname: p.nickname,
        avatarSeed: p.avatarSeed,
        score: p.score,
        correctAnswers: p.correctAnswers,
        streak: p.streak,
        isHost: p.isHost,
        pointsEarnedLastRound: p.pointsEarnedLastRound,
        positionChange
      };
    });

    // Update previous rankings for next diff
    this.previousRankings.clear();
    entries.forEach((e) => this.previousRankings.set(e.playerId, e.rank));

    return entries;
  }

  public getSummary(): RoomStateSummary {
    const currentQ =
      this.currentQuestionIndex >= 0 && this.currentQuestionIndex < this.questions.length
        ? this.questions[this.currentQuestionIndex]
        : undefined;

    const clientQ: ClientQuestion | undefined = currentQ
      ? {
          id: currentQ.id,
          text: currentQ.text,
          options: currentQ.options,
          category: currentQ.category,
          difficulty: currentQ.difficulty,
          questionNumber: this.currentQuestionIndex + 1,
          totalQuestions: this.questions.length,
          timerSeconds: this.settings.questionTimer
        }
      : undefined;

    const leaderboard = this.getLeaderboard();
    const winner = this.phase === 'GAME_OVER' && leaderboard.length > 0 ? leaderboard[0] : undefined;

    return {
      code: this.code,
      hostId: this.hostId,
      phase: this.phase,
      settings: this.settings,
      players: Array.from(this.players.values()).map((p) => ({
        id: p.id,
        nickname: p.nickname,
        avatarSeed: p.avatarSeed,
        score: p.score,
        streak: p.streak,
        correctAnswers: p.correctAnswers,
        isHost: p.isHost,
        hasAnsweredCurrent: p.hasAnsweredCurrent
      })),
      currentQuestionNumber: this.currentQuestionIndex + 1,
      totalQuestions: this.questions.length,
      currentQuestion: clientQ,
      timerRemaining: this.timerRemaining,
      lastReveal: this.lastReveal,
      leaderboard,
      winner
    };
  }

  public broadcastState(): void {
    const summary = this.getSummary();
    this.io.to(this.code).emit('room_state_update', summary);
  }

  public clearAllTimers(): void {
    if (this.timerInterval) {
      clearInterval(this.timerInterval);
      this.timerInterval = undefined;
    }
    if (this.revealTimeout) {
      clearTimeout(this.revealTimeout);
      this.revealTimeout = undefined;
    }
    if (this.countdownTimeout) {
      clearTimeout(this.countdownTimeout);
      this.countdownTimeout = undefined;
    }
  }
}
