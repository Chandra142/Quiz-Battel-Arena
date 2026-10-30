import { Server as SocketIOServer, Socket } from 'socket.io';
import { RoomManager } from '../game/RoomManager.js';
import { GameSettings } from '../types/index.js';

export function setupSocketHandlers(io: SocketIOServer, roomManager: RoomManager) {
  io.on('connection', (socket: Socket) => {
    // console.log(`[Socket] Connected: ${socket.id}`);

    // Create Room
    socket.on('create_room', (data: { playerId: string; nickname: string; avatarSeed?: number }) => {
      const { playerId, nickname, avatarSeed = Math.floor(Math.random() * 8) } = data;
      const cleanNick = (nickname || 'Host').trim().slice(0, 20);

      const room = roomManager.createRoom(playerId);
      const { player } = room.addPlayer(playerId, socket.id, cleanNick, avatarSeed);

      socket.join(room.code);
      roomManager.trackPlayer(socket.id, room.code, playerId);

      socket.emit('room_created', {
        roomCode: room.code,
        player,
        roomState: room.getSummary()
      });

      room.broadcastState();
    });

    // Join Room
    socket.on('join_room', (data: { roomCode: string; playerId: string; nickname: string; avatarSeed?: number }) => {
      const { roomCode, playerId, nickname, avatarSeed = Math.floor(Math.random() * 8) } = data;
      const code = (roomCode || '').toUpperCase().trim();
      const cleanNick = (nickname || 'Challenger').trim().slice(0, 20);

      if (!code) {
        socket.emit('join_error', { message: 'Please enter a valid 6-character room code.' });
        return;
      }

      const room = roomManager.getRoom(code);
      if (!room) {
        socket.emit('join_error', { message: `Room "${code}" was not found or has expired.` });
        return;
      }

      if (room.phase !== 'LOBBY') {
        socket.emit('join_error', { message: `Room "${code}" is currently in a battle. Please wait for the match to end.` });
        return;
      }

      const { player, error } = room.addPlayer(playerId, socket.id, cleanNick, avatarSeed);
      if (error) {
        socket.emit('join_error', { message: error });
        return;
      }

      socket.join(code);
      roomManager.trackPlayer(socket.id, code, playerId);

      socket.emit('joined_room_success', {
        roomCode: code,
        player,
        roomState: room.getSummary()
      });

      socket.to(code).emit('player_joined', {
        player,
        message: `${player.nickname} has entered the arena!`
      });

      room.broadcastState();
    });

    // Update Settings (Host Only)
    socket.on('update_settings', (data: { roomCode: string; playerId: string; settings: Partial<GameSettings> }) => {
      const room = roomManager.getRoom(data.roomCode);
      if (!room) return;

      const success = room.updateSettings(data.playerId, data.settings);
      if (success) {
        room.broadcastState();
      }
    });

    // Start Game (Host Only)
    socket.on('start_game', (data: { roomCode: string; playerId: string }) => {
      const room = roomManager.getRoom(data.roomCode);
      if (!room) {
        socket.emit('game_error', { message: 'Room not found.' });
        return;
      }

      const result = room.startGame(data.playerId);
      if (!result.success) {
        socket.emit('game_error', { message: result.error });
      }
    });

    // Submit Answer
    socket.on('submit_answer', (data: { roomCode: string; playerId: string; optionIndex: number }) => {
      const room = roomManager.getRoom(data.roomCode);
      if (!room) return;

      const result = room.submitAnswer(data.playerId, data.optionIndex);
      if (!result.success) {
        socket.emit('game_error', { message: result.error });
      }
    });

    // Play Again (Host Only)
    socket.on('play_again', (data: { roomCode: string; playerId: string }) => {
      const room = roomManager.getRoom(data.roomCode);
      if (!room) return;

      const result = room.playAgain(data.playerId);
      if (!result.success) {
        socket.emit('game_error', { message: result.error });
      }
    });

    // Leave Room
    socket.on('leave_room', () => {
      handlePlayerExit(socket, io, roomManager);
    });

    // Disconnect
    socket.on('disconnect', () => {
      handlePlayerExit(socket, io, roomManager);
    });
  });
}

function handlePlayerExit(socket: Socket, io: SocketIOServer, roomManager: RoomManager) {
  const { room, playerId } = roomManager.untrackPlayer(socket.id);
  if (room && playerId) {
    const player = room.players.get(playerId);
    const nickname = player ? player.nickname : 'A player';

    const { wasHost, newHostId } = room.removePlayer(playerId);
    socket.leave(room.code);

    io.to(room.code).emit('player_left', {
      playerId,
      nickname,
      wasHost,
      newHostId,
      message: `${nickname} has left the arena.`
    });

    if (room.players.size > 0) {
      room.broadcastState();
    } else {
      roomManager.removeRoom(room.code);
    }
  }
}
