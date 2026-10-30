<div align="center">

![Quiz Battle Arena Preview Banner](./banner.jpg)

# ⚔️ QUIZ BATTLE ARENA

> **"Think Fast. Answer Faster. Become the Champion."**

[![Live Demo](https://img.shields.io/badge/Live%20Demo-quiz--battel--arena.vercel.app-00f0ff?style=for-the-badge&logo=vercel&logoColor=white)](https://quiz-battel-arena.vercel.app/)
[![GitHub Repo](https://img.shields.io/badge/GitHub-Repository-8b5cf6?style=for-the-badge&logo=github&logoColor=white)](https://github.com/Chandra142/Quiz-Battel-Arena)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg?style=for-the-badge)](https://opensource.org/licenses/MIT)

[![React 19](https://img.shields.io/badge/React%2019-20232A?style=flat-square&logo=react&logoColor=61DAFB)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=flat-square&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Vite](https://img.shields.io/badge/Vite-646CFF?style=flat-square&logo=vite&logoColor=white)](https://vitejs.dev/)
[![Tailwind CSS v4](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=flat-square&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![Node.js](https://img.shields.io/badge/Node.js-339933?style=flat-square&logo=node.js&logoColor=white)](https://nodejs.org/)
[![Socket.IO](https://img.shields.io/badge/Socket.IO-010101?style=flat-square&logo=socket.io&logoColor=white)](https://socket.io/)

</div>

Quiz Battle Arena is a production-ready, real-time multiplayer competitive quiz game built with **React**, **TypeScript**, **Vite**, **Tailwind CSS**, **Node.js**, **Express**, and **Socket.IO**.

Players can create private rooms, share invitation codes/links, compete head-to-head on desktop and mobile, and experience instantaneous server-synchronized trivia battles with zero registration or installation required.

---

## 🌟 Key Features

### 🎮 Real-Time Multiplayer Gameplay
- **Authoritative Server Architecture**: The Node.js server controls timers, delivers questions, scores answers, and manages room lifecycles. Zero client-side cheating or score manipulation.
- **Instant Room Creation**: Generates unique, memorable 6-character room codes (e.g. `ARENA9`, `CYBER7`).
- **Shareable Invite Links**: One-click URL copying (`?room=XYZ123`) that auto-fills room codes for seamless onboarding.
- **Customizable Host Settings**: The room host configures question counts (5, 10, 15), timer duration (10s, 15s, 20s), difficulty (Easy, Medium, Hard, All), and topics.
- **Dynamic Scoring Engine**:
  - Base points: **500 points** for correct answers.
  - Speed bonus: Up to **500 bonus points** based on elapsed server timestamp.
  - Consecutive streak multiplier: Up to **200 bonus streak points**.
  - Incorrect or unanswered: **0 points**.
- **Synchronized Visual HUD**: Circular SVG countdown rings, progress indicators, locked-answer badges, and real-time choice reveals.
- **Live Leaderboard & Standings**: Animated position changes, round points diffs (`+850 PTS`), and streak badges.
- **3D Animated Podium**: Celebrates 1st, 2nd, and 3rd place with gold/silver/bronze crowns, medals, and a confetti explosion.
- **Instant Rematch ("Play Again")**: Host can restart new rounds with the same players in the lobby without re-entering codes.
- **Procedural Web Audio Engine**: Zero-latency synthesized sound effects for countdown ticks, answer locks, victory chimes, and wrong answer buzzers via Web Audio API.

### 📚 120+ Curated Questions Question Bank
Questions are organized into 6 distinct categories across Easy, Medium, and Hard difficulties:
1. **General Knowledge**
2. **Science** (Physics, Biology, Chemistry, Astronomy)
3. **Technology** (Computing, Web, Networks, Programming, Cryptography, AI)
4. **Sports** (Olympics, Football/Soccer, Basketball, Formula 1, Tennis)
5. **History** (Ancient Empires, Revolutions, World Wars, Renowned Figures)
6. **Geography** (Capitals, Wonders, Continents, Natural Landmarks)

---

## 🛠️ Technology Stack

| Layer | Technology |
|---|---|
| **Frontend** | React 19, TypeScript, Vite, Tailwind CSS v4, Lucide React, Canvas Confetti |
| **Backend** | Node.js, Express.js, Socket.IO 4.8 |
| **Real-time Protocol** | WebSockets + Long-polling fallback via Socket.IO |
| **Audio** | Custom Web Audio API Synthesizer (Zero asset download failure) |
| **Deployment Targets** | Frontend: Vercel / Netlify \| Backend: Render / Railway / Fly.io |

---

## 🚀 Quick Start & Local Development

### Prerequisites
- Node.js (v18 or higher, tested on v20+)
- npm (v9 or higher)

### 1. Clone & Install Dependencies
```bash
# Clone the repository
git clone <your-repo-url>
cd "Quiz Arena"

# Install server and client dependencies
npm run install:all
```

Or install individually:
```bash
cd server && npm install
cd ../client && npm install
```

### 2. Environment Configuration
Create `.env` in `server/` and `client/` using the provided templates:

**Server** (`server/.env`):
```env
PORT=3001
NODE_ENV=development
CLIENT_URL=http://localhost:5173
```

**Client** (`client/.env`):
```env
VITE_SERVER_URL=http://localhost:3001
```

### 3. Launch Development Servers
Open two terminal windows:

**Terminal 1 (Backend Server)**:
```bash
cd server
npm run dev
# Server will listen on http://localhost:3001
```

**Terminal 2 (Frontend Client)**:
```bash
cd client
npm run dev
# Vite will launch on http://localhost:5173
```

Now open [http://localhost:5173](http://localhost:5173) in your browser!

To test multiplayer locally:
1. Open [http://localhost:5173](http://localhost:5173) in regular browser (Player 1 - Host).
2. Click **Create Room**, pick an avatar, and enter your nickname.
3. Copy the 6-character room code.
4. Open an Incognito/Private window or another browser (Player 2 - Challenger).
5. Enter the room code and join. Both players will appear instantly in the lobby!
6. Click **Start Game Now** on the Host screen to begin the live battle!

---

## 🌐 Deployment Guide

### Deploying the Backend (e.g. Render)
1. Push your code to GitHub.
2. In [Render](https://render.com), create a new **Web Service**.
3. Connect your GitHub repository.
4. Set the **Root Directory** to `server`.
5. Set:
   - **Build Command**: `npm install && npm run build`
   - **Start Command**: `npm start`
6. Add Environment Variables:
   - `PORT=3001`
   - `NODE_ENV=production`
7. Copy your deployed Render URL (e.g., `https://quiz-battle-arena-server.onrender.com`).

### Deploying the Frontend (e.g. Vercel)
1. In [Vercel](https://vercel.com), import your repository.
2. Set the **Root Directory** to `client`.
3. Set Framework Preset to **Vite**.
4. In **Environment Variables**, set:
   - `VITE_SERVER_URL` = Your backend Render URL (e.g., `https://quiz-battle-arena-server.onrender.com`).
5. Click **Deploy**. Your multiplayer game will be live globally!

---

## 🔌 Socket.IO Event Contract

| Event | Direction | Payload | Description |
|---|---|---|---|
| `create_room` | Client ➔ Server | `{ playerId, nickname, avatarSeed }` | Creates a new game room |
| `join_room` | Client ➔ Server | `{ roomCode, playerId, nickname, avatarSeed }` | Joins an existing room |
| `update_settings` | Client ➔ Server | `{ roomCode, playerId, settings }` | Host updates question count/timer/topic |
| `start_game` | Client ➔ Server | `{ roomCode, playerId }` | Host triggers starting 3s countdown |
| `new_question` | Server ➔ Room | `{ question, timerSeconds }` | Dispatches synchronized question without answer |
| `submit_answer` | Client ➔ Server | `{ roomCode, playerId, optionIndex }` | Locks player choice; server calculates speed bonus |
| `timer_update` | Server ➔ Room | `{ timerRemaining }` | Broadcasts 1-second server countdown ticks |
| `reveal_answer` | Server ➔ Room | `{ reveal, leaderboard }` | Reveals correct answer and points earned |
| `game_finished` | Server ➔ Room | `{ leaderboard, winner }` | Concludes match and triggers podium screen |
| `play_again` | Client ➔ Server | `{ roomCode, playerId }` | Host resets match to lobby with current roster |

---

## 🛡️ Security & Reliability
- **Strict Server Authoritative Scoring**: Answers and speed calculations are validated exclusively on the backend.
- **Omission of Correct Answers**: The server strips the `correctAnswer` index from payloads until the question's reveal phase.
- **Double Submission Prevention**: Once a player locks an answer, further submissions for that round are rejected.
- **Automatic Inactivity Cleanup**: Abandoned rooms are automatically garbage-collected after 45 minutes of inactivity.

---

## 📄 License
MIT License. Built for real-time multiplayer gaming challenges.
