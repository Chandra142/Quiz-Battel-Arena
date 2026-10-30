import { io } from 'socket.io-client';

const SERVER_URL = 'http://localhost:3001';

console.log('🛡️ Starting Security & Edge Case Validation Suite...');

async function testEdgeCases() {
  const socket1 = io(SERVER_URL);
  const socket2 = io(SERVER_URL);

  await new Promise((r) => socket1.on('connect', r));
  await new Promise((r) => socket2.on('connect', r));

  // Test 1: Invalid room code
  console.log('1️⃣ Testing invalid room code rejection...');
  socket1.emit('join_room', {
    roomCode: 'INVALID',
    playerId: 'p_test_1',
    nickname: 'TestUser'
  });
  const invalidCodeError = await new Promise((resolve) => {
    socket1.on('join_error', resolve);
  });
  console.log(`✅ Server correctly rejected invalid room: "${invalidCodeError.message}"`);

  // Test 2: Room creation & duplicate nickname test
  console.log('2️⃣ Testing duplicate nickname rejection in same room...');
  socket1.emit('create_room', {
    playerId: 'host_p1',
    nickname: 'Viper'
  });
  const roomRes = await new Promise((r) => socket1.on('room_created', r));
  const roomCode = roomRes.roomCode;

  // Socket 2 tries to join with identical nickname "Viper"
  socket2.emit('join_room', {
    roomCode,
    playerId: 'p_test_2',
    nickname: 'Viper'
  });
  const duplicateError = await new Promise((resolve) => {
    socket2.on('join_error', resolve);
  });
  console.log(`✅ Duplicate nickname prevented: "${duplicateError.message}"`);

  // Test 3: Attempting to start game with only 1 player
  console.log('3️⃣ Testing minimum player validation (>= 2 players)...');
  socket1.emit('start_game', {
    roomCode,
    playerId: 'host_p1'
  });
  const minPlayerError = await new Promise((resolve) => {
    socket1.on('game_error', resolve);
  });
  console.log(`✅ Game start blocked for <2 players: "${minPlayerError.message}"`);

  // Test 4: Socket 2 joins with unique name, then non-host attempts to start game
  console.log('4️⃣ Testing non-host permission guard...');
  socket2.emit('join_room', {
    roomCode,
    playerId: 'p_test_2',
    nickname: 'ShadowWolf'
  });
  await new Promise((r) => socket2.on('joined_room_success', r));

  // Non-host attempts to start game
  socket2.emit('start_game', {
    roomCode,
    playerId: 'p_test_2'
  });
  const nonHostError = await new Promise((resolve) => {
    socket2.on('game_error', resolve);
  });
  console.log(`✅ Unauthorized start rejected: "${nonHostError.message}"`);

  console.log('🛡️ All Security & Edge Cases Passed with Flying Colors!');

  socket1.disconnect();
  socket2.disconnect();
  process.exit(0);
}

testEdgeCases().catch((err) => {
  console.error('❌ Edge case test failed:', err);
  process.exit(1);
});
