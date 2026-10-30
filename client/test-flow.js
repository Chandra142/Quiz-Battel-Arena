import { io } from 'socket.io-client';

const SERVER_URL = 'http://localhost:3001';

console.log('🧪 Starting Multiplayer End-to-End Simulation Test...');

async function runTest() {
  const hostSocket = io(SERVER_URL);
  const player2Socket = io(SERVER_URL);

  let roomCode = '';
  let hostPlayerId = 'test_host_' + Date.now();
  let player2Id = 'test_p2_' + Date.now();

  await new Promise((resolve) => hostSocket.on('connect', resolve));
  await new Promise((resolve) => player2Socket.on('connect', resolve));
  console.log('✅ Both sockets connected to backend server');

  // 1. Host creates room
  console.log('1️⃣ Host creating room...');
  hostSocket.emit('create_room', {
    playerId: hostPlayerId,
    nickname: 'HostAce',
    avatarSeed: 1
  });

  const createRes = await new Promise((resolve) => {
    hostSocket.on('room_created', resolve);
  });
  roomCode = createRes.roomCode;
  console.log(`✅ Room created successfully! Code: ${roomCode}`);

  // 2. Player 2 joins room
  console.log(`2️⃣ Player 2 joining room ${roomCode}...`);
  player2Socket.emit('join_room', {
    roomCode,
    playerId: player2Id,
    nickname: 'TurboBlaze',
    avatarSeed: 3
  });

  const joinRes = await new Promise((resolve) => {
    player2Socket.on('joined_room_success', resolve);
  });
  console.log(`✅ Player 2 joined successfully! Players count: ${joinRes.roomState.players.length}`);

  // 3. Host updates settings (5 questions, 10s timer)
  console.log('3️⃣ Host setting rules: 5 Qs, 10s timer, category: All...');
  hostSocket.emit('update_settings', {
    roomCode,
    playerId: hostPlayerId,
    settings: {
      questionCount: 5,
      questionTimer: 10,
      difficulty: 'all',
      category: 'All'
    }
  });

  await new Promise((r) => setTimeout(r, 500));

  // 4. Host starts game
  console.log('4️⃣ Host starting battle...');
  hostSocket.emit('start_game', {
    roomCode,
    playerId: hostPlayerId
  });

  // Wait for new_question event
  console.log('⏳ Waiting for round to start (after 3s countdown)...');
  const questionData = await new Promise((resolve) => {
    hostSocket.on('new_question', resolve);
  });

  console.log(`✅ Received Question 1: "${questionData.question.text}"`);
  console.log(`   Options: ${JSON.stringify(questionData.question.options)}`);

  // Verify answer is not exposed
  if (questionData.question.correctAnswer !== undefined) {
    throw new Error('SECURITY VIOLATION: Correct answer leaked to client during question phase!');
  }
  console.log('🛡️ Security Check Passed: Correct answer is hidden from client.');

  // 5. Submit answers: Host answers Option 1, Player 2 answers Option 2
  console.log('5️⃣ Submitting answers for both players...');
  hostSocket.emit('submit_answer', {
    roomCode,
    playerId: hostPlayerId,
    optionIndex: 1
  });

  player2Socket.emit('submit_answer', {
    roomCode,
    playerId: player2Id,
    optionIndex: 2
  });

  // 6. Expect instant reveal because both players answered
  console.log('6️⃣ Waiting for server answer reveal & score calculation...');
  const revealData = await new Promise((resolve) => {
    hostSocket.on('reveal_answer', resolve);
  });

  console.log(`✅ Reveal Received! Correct Answer Index: ${revealData.reveal.correctAnswer}`);
  console.log(`   Explanation: ${revealData.reveal.explanation || 'N/A'}`);
  console.log('   Scores calculated:');
  revealData.leaderboard.forEach((p) => {
    console.log(`   - ${p.nickname}: ${p.score} pts (${p.correctAnswers} correct, streak: ${p.streak})`);
  });

  console.log('🎉 Multiplayer simulation test completed with 100% success!');

  hostSocket.disconnect();
  player2Socket.disconnect();
  process.exit(0);
}

runTest().catch((err) => {
  console.error('❌ Test failed:', err);
  process.exit(1);
});
