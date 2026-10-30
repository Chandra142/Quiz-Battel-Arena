import { Server as SocketIOServer } from 'socket.io';
import { GameRoom } from './GameRoom.js';

export class RoomManager {
  private rooms: Map<string, GameRoom> = new Map();
  private socketToRoom: Map<string, string> = new Map();
  private socketToPlayerId: Map<string, string> = new Map();
  private io: SocketIOServer;

  constructor(io: SocketIOServer) {
    this.io = io;

    // Periodically clean up abandoned rooms (older than 45 minutes)
    setInterval(() => {
      this.cleanupInactiveRooms();
    }, 10 * 60 * 1000);
  }

  public generateRoomCode(): string {
    const chars = '23456789ABCDEFGHJKLMNPQRSTUVWXYZ';
    let code = '';
    do {
      code = '';
      for (let i = 0; i < 6; i++) {
        code += chars.charAt(Math.floor(Math.random() * chars.length));
      }
    } while (this.rooms.has(code));
    return code;
  }

  public createRoom(hostId: string): GameRoom {
    const code = this.generateRoomCode();
    const room = new GameRoom(code, hostId, this.io);
    this.rooms.set(code, room);
    return room;
  }

  public getRoom(code: string): GameRoom | undefined {
    return this.rooms.get(code.toUpperCase().trim());
  }

  public trackPlayer(socketId: string, roomCode: string, playerId: string): void {
    this.socketToRoom.set(socketId, roomCode.toUpperCase().trim());
    this.socketToPlayerId.set(socketId, playerId);
  }

  public untrackPlayer(socketId: string): { room?: GameRoom; playerId?: string } {
    const roomCode = this.socketToRoom.get(socketId);
    const playerId = this.socketToPlayerId.get(socketId);
    this.socketToRoom.delete(socketId);
    this.socketToPlayerId.delete(socketId);

    if (roomCode) {
      const room = this.rooms.get(roomCode);
      return { room, playerId };
    }
    return {};
  }

  public removeRoom(code: string): void {
    const room = this.rooms.get(code);
    if (room) {
      room.clearAllTimers();
      this.rooms.delete(code);
    }
  }

  private cleanupInactiveRooms(): void {
    const now = Date.now();
    const timeout = 45 * 60 * 1000;
    for (const [code, room] of this.rooms.entries()) {
      if (now - room.lastActivityAt > timeout || room.players.size === 0) {
        room.clearAllTimers();
        this.rooms.delete(code);
      }
    }
  }
}
