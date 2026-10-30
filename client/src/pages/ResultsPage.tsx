import React from 'react';
import { useSocket } from '../context/SocketContext';
import { Podium } from '../components/Podium';

export const ResultsPage: React.FC = () => {
  const { roomState, leaderboard, myPlayerId, playAgain, leaveRoom } = useSocket();

  if (!roomState) return null;

  const isHost = roomState.hostId === myPlayerId;

  // Fallback to players if leaderboard hasn't populated yet
  const sortedEntries = leaderboard.length > 0
    ? leaderboard
    : roomState.players
        .sort((a, b) => b.score - a.score)
        .map((p, idx) => ({
          rank: idx + 1,
          playerId: p.id,
          nickname: p.nickname,
          avatarSeed: p.avatarSeed,
          score: p.score,
          correctAnswers: p.correctAnswers,
          streak: p.streak,
          isHost: p.isHost,
          positionChange: 0
        }));

  return (
    <div className="w-full min-h-[85vh] flex flex-col items-center justify-center">
      <Podium
        entries={sortedEntries}
        myPlayerId={myPlayerId}
        isHost={isHost}
        onPlayAgain={playAgain}
        onReturnHome={leaveRoom}
      />
    </div>
  );
};
