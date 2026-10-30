import express from 'express';
import http from 'http';
import { Server as SocketIOServer } from 'socket.io';
import cors from 'cors';
import dotenv from 'dotenv';
import { RoomManager } from './game/RoomManager.js';
import { setupSocketHandlers } from './socket/socketHandler.js';
import { QUESTION_BANK } from './questions/questionBank.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT ? parseInt(process.env.PORT) : 3001;

// CORS setup
app.use(cors({
  origin: '*',
  methods: ['GET', 'POST']
}));
app.use(express.json());

const server = http.createServer(app);

const io = new SocketIOServer(server, {
  cors: {
    origin: '*',
    methods: ['GET', 'POST']
  },
  pingTimeout: 20000,
  pingInterval: 10000
});

const roomManager = new RoomManager(io);
setupSocketHandlers(io, roomManager);

// Health check & API info
app.get('/', (req, res) => {
  res.json({
    status: 'online',
    app: 'Quiz Battle Arena Server',
    activeConnections: io.engine.clientsCount,
    totalQuestionsInBank: QUESTION_BANK.length,
    timestamp: new Date().toISOString()
  });
});

app.get('/health', (req, res) => {
  res.status(200).send('OK');
});

server.listen(PORT, '0.0.0.0', () => {
  console.log(`⚡ Quiz Battle Arena Server listening on port ${PORT}`);
  console.log(`⚡ Ready for real-time multiplayer battles! Total questions: ${QUESTION_BANK.length}`);
});
