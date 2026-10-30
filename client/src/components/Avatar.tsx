import React from 'react';

interface AvatarProps {
  seed: number;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  showBadge?: boolean;
  isHost?: boolean;
}

const AVATARS = [
  { name: 'Cyber Fox', emoji: '🦊', bg: 'from-orange-500 to-amber-600', border: 'border-orange-400' },
  { name: 'Neon Dragon', emoji: '🐲', bg: 'from-emerald-500 to-teal-600', border: 'border-emerald-400' },
  { name: 'Cosmic Owl', emoji: '🦉', bg: 'from-indigo-600 to-purple-600', border: 'border-indigo-400' },
  { name: 'Thunder Tiger', emoji: '🐯', bg: 'from-yellow-500 to-orange-600', border: 'border-yellow-400' },
  { name: 'Shadow Wolf', emoji: '🐺', bg: 'from-cyan-600 to-blue-700', border: 'border-cyan-400' },
  { name: 'Cyber Ape', emoji: '🦍', bg: 'from-fuchsia-600 to-pink-600', border: 'border-pink-400' },
  { name: 'Astro Cat', emoji: '🐱', bg: 'from-rose-500 to-red-600', border: 'border-rose-400' },
  { name: 'Turbo Falcon', emoji: '🦅', bg: 'from-sky-500 to-blue-600', border: 'border-sky-400' },
];

export const getAvatarMeta = (seed: number) => {
  const index = Math.abs(seed) % AVATARS.length;
  return AVATARS[index];
};

export const Avatar: React.FC<AvatarProps> = ({
  seed,
  size = 'md',
  showBadge = false,
  isHost = false
}) => {
  const meta = getAvatarMeta(seed);

  const sizeClasses = {
    sm: 'w-8 h-8 text-base border-2',
    md: 'w-12 h-12 text-2xl border-2',
    lg: 'w-16 h-16 text-3xl border-[3px]',
    xl: 'w-24 h-24 text-5xl border-4'
  }[size];

  return (
    <div className="relative inline-flex items-center justify-center shrink-0">
      <div
        className={`rounded-2xl bg-gradient-to-br ${meta.bg} ${meta.border} ${sizeClasses} flex items-center justify-center shadow-lg transition-transform hover:scale-105 select-none`}
      >
        <span>{meta.emoji}</span>
      </div>

      {showBadge && isHost && (
        <span
          title="Room Host"
          className="absolute -top-1.5 -right-1.5 bg-gradient-to-r from-amber-400 to-yellow-500 text-slate-950 text-[10px] font-black px-1.5 py-0.5 rounded-full border border-yellow-200 shadow-md flex items-center gap-0.5"
        >
          👑 HOST
        </span>
      )}
    </div>
  );
};
