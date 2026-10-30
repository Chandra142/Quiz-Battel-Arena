import React from 'react';
import { CheckCircle2, XCircle, Sparkles, Lock } from 'lucide-react';
import { ClientQuestion, AnswerRevealData } from '../types';
import { Avatar } from './Avatar';

interface QuestionCardProps {
  question: ClientQuestion;
  selectedOption: number | null;
  onSelectOption: (index: number) => void;
  reveal?: AnswerRevealData | null;
  myPlayerId: string;
}

const OPTION_LABELS = ['A', 'B', 'C', 'D'];
const OPTION_COLORS = [
  'from-rose-500/20 to-orange-500/20 border-rose-500/30 text-rose-300',
  'from-blue-500/20 to-cyan-500/20 border-cyan-500/30 text-cyan-300',
  'from-amber-500/20 to-yellow-500/20 border-amber-500/30 text-amber-300',
  'from-emerald-500/20 to-teal-500/20 border-emerald-500/30 text-emerald-300'
];

export const QuestionCard: React.FC<QuestionCardProps> = ({
  question,
  selectedOption,
  onSelectOption,
  reveal
}) => {
  const isLocked = selectedOption !== null || (reveal !== null && reveal !== undefined);
  const isRevealed = !!reveal;

  const getDifficultyPill = (diff: string) => {
    switch (diff) {
      case 'easy':
        return 'bg-emerald-950/60 text-emerald-400 border-emerald-500/30';
      case 'medium':
        return 'bg-amber-950/60 text-amber-400 border-amber-500/30';
      case 'hard':
        return 'bg-rose-950/60 text-rose-400 border-rose-500/30';
      default:
        return 'bg-purple-950/60 text-purple-400 border-purple-500/30';
    }
  };

  return (
    <div className="w-full max-w-3xl mx-auto flex flex-col gap-3.5 sm:gap-6">
      {/* Question Header Card */}
      <div className="glass-panel p-4 sm:p-6 md:p-8 rounded-2xl sm:rounded-3xl relative overflow-hidden border border-purple-500/20 shadow-2xl">
        <div className="absolute top-0 right-0 w-64 h-64 bg-purple-600/10 rounded-full blur-3xl pointer-events-none" />

        {/* Top Badges Row */}
        <div className="flex flex-wrap items-center justify-between gap-2 mb-2.5 sm:mb-4">
          <div className="flex items-center gap-1.5 sm:gap-2 flex-wrap">
            <span className="px-2.5 py-0.5 sm:px-3 sm:py-1 rounded-full text-[10px] sm:text-xs font-bold uppercase tracking-wider bg-purple-600/30 text-purple-200 border border-purple-400/30">
              {question.category}
            </span>
            <span className={`px-2 py-0.5 sm:px-2.5 sm:py-1 rounded-full text-[10px] sm:text-xs font-semibold uppercase tracking-wider border ${getDifficultyPill(question.difficulty)}`}>
              {question.difficulty}
            </span>
          </div>

          <div className="text-[10px] sm:text-xs font-mono font-bold text-slate-400 bg-black/40 px-2.5 py-0.5 sm:px-3 sm:py-1 rounded-full border border-white/5 shrink-0">
            QUESTION <span className="text-cyan-400 font-extrabold">{question.questionNumber}</span> / {question.totalQuestions}
          </div>
        </div>

        {/* Question Text */}
        <h2 className="text-base sm:text-xl md:text-2xl lg:text-3xl font-extrabold text-white leading-snug tracking-tight text-left py-1 sm:py-2 break-words">
          {question.text}
        </h2>

        {/* Lock indicator message */}
        {isLocked && !isRevealed && (
          <div className="mt-3 flex items-center justify-start gap-1.5 sm:gap-2 text-[11px] sm:text-xs font-bold text-cyan-300 bg-cyan-950/40 border border-cyan-500/30 px-2.5 py-1 sm:px-3 sm:py-1.5 rounded-lg sm:rounded-xl animate-pulse">
            <Lock className="w-3.5 h-3.5 shrink-0" />
            <span className="truncate">Answer Locked In! Waiting for all challengers...</span>
          </div>
        )}
      </div>

      {/* Answer Options Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 sm:gap-4">
        {question.options.map((optionText, index) => {
          const isSelected = selectedOption === index;
          const isCorrect = isRevealed && reveal.correctAnswer === index;
          const isWrongSelection = isRevealed && isSelected && !isCorrect;

          // Find other players who chose this option
          const playersChoseThis = isRevealed
            ? reveal.playerAnswers.filter((pa) => pa.selectedOption === index)
            : [];

          let buttonStyle = 'glass-card-interactive border-white/10 hover:border-purple-400/40';

          if (isRevealed) {
            if (isCorrect) {
              buttonStyle = 'bg-emerald-950/80 border-emerald-400 text-white shadow-[0_0_25px_rgba(16,185,129,0.4)] scale-[1.01]';
            } else if (isWrongSelection) {
              buttonStyle = 'bg-rose-950/70 border-rose-500 text-rose-200';
            } else {
              buttonStyle = 'opacity-40 border-white/5 bg-slate-900/40';
            }
          } else if (isSelected) {
            buttonStyle = 'glass-card-selected text-white scale-[1.01]';
          }

          return (
            <button
              key={index}
              onClick={() => !isLocked && onSelectOption(index)}
              disabled={isLocked}
              className={`p-3.5 sm:p-5 rounded-xl sm:rounded-2xl text-left relative flex flex-col justify-between transition-all duration-200 group w-full min-h-[52px] sm:min-h-[64px] ${buttonStyle} ${
                isLocked ? 'cursor-default' : 'cursor-pointer active:scale-[0.99]'
              }`}
            >
              <div className="flex items-start gap-2.5 sm:gap-3 w-full">
                {/* Option Badge */}
                <div
                  className={`w-7 h-7 sm:w-9 sm:h-9 rounded-lg sm:rounded-xl flex items-center justify-center font-black text-xs sm:text-sm shrink-0 border transition-all ${
                    isCorrect
                      ? 'bg-emerald-500 text-slate-950 border-emerald-300'
                      : isWrongSelection
                      ? 'bg-rose-500 text-white border-rose-300'
                      : isSelected
                      ? 'bg-purple-500 text-white border-purple-300 shadow-md'
                      : `bg-gradient-to-br ${OPTION_COLORS[index]}`
                  }`}
                >
                  {isCorrect ? (
                    <CheckCircle2 className="w-4 h-4 sm:w-5 sm:h-5 text-slate-950" />
                  ) : isWrongSelection ? (
                    <XCircle className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
                  ) : (
                    OPTION_LABELS[index]
                  )}
                </div>

                {/* Option Content */}
                <div className="flex-1 min-w-0">
                  <p className="text-sm sm:text-base font-semibold text-slate-100 group-hover:text-white leading-snug break-words">
                    {optionText}
                  </p>
                </div>
              </div>

              {/* Player avatars who chose this option on reveal */}
              {isRevealed && playersChoseThis.length > 0 && (
                <div className="mt-2.5 pt-1.5 border-t border-white/10 flex items-center gap-1.5 flex-wrap">
                  {playersChoseThis.map((p) => (
                    <span
                      key={p.playerId}
                      title={`${p.nickname} ${p.isCorrect ? '(+ ' + p.pointsEarned + ' pts)' : ''}`}
                      className="inline-flex items-center gap-1 bg-black/50 px-1.5 py-0.5 rounded-md text-[10px] font-bold text-slate-200 border border-white/10"
                    >
                      <Avatar seed={p.avatarSeed} size="sm" />
                      <span className="truncate max-w-[70px] sm:max-w-[90px]">{p.nickname}</span>
                      {p.isCorrect && <span className="text-emerald-400 font-mono text-[9px]">+{p.pointsEarned}</span>}
                    </span>
                  ))}
                </div>
              )}
            </button>
          );
        })}
      </div>

      {/* Answer Explanation on Reveal */}
      {isRevealed && reveal.explanation && (
        <div className="glass-panel p-3.5 sm:p-5 rounded-xl sm:rounded-2xl border border-cyan-500/30 bg-cyan-950/20 flex items-start gap-2.5 sm:gap-3 animate-fadeIn">
          <Sparkles className="w-4 h-4 sm:w-5 sm:h-5 text-cyan-400 shrink-0 mt-0.5" />
          <div className="min-w-0">
            <h4 className="text-[11px] sm:text-xs font-black uppercase tracking-wider text-cyan-300 mb-0.5">Trivia Insight</h4>
            <p className="text-xs sm:text-sm text-slate-200 leading-relaxed break-words">{reveal.explanation}</p>
          </div>
        </div>
      )}
    </div>
  );
};
