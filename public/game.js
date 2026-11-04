// --- FOOTBALL CLIENT SCRIPT ---
const socket = io();

// Canvas & Context
const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

const FIELD_WIDTH = 1200;
const FIELD_HEIGHT = 700;
const GOAL_WIDTH = 60;
const GOAL_HEIGHT = 200;
const GOAL_Y_START = (FIELD_HEIGHT - GOAL_HEIGHT) / 2;
const GOAL_Y_END = GOAL_Y_START + GOAL_HEIGHT;

let myPlayerId = null;
let currentRoomId = 'global';
let selectedTeam = 'red';
let soundEnabled = true;

// Game State
let latestState = null;
let particles = [];

// --- PROCEDURAL WEB AUDIO SYNTHESIZER ---
let audioCtx = null;
function initAudio() {
  if (!audioCtx) {
    const AudioContext = window.AudioContext || window.webkitAudioContext;
    audioCtx = new AudioContext();
  }
  if (audioCtx.state === 'suspended') {
    audioCtx.resume();
  }
}

function playSound(type, opts = {}) {
  if (!soundEnabled) return;
  try {
    initAudio();
    if (!audioCtx) return;
    const t = audioCtx.currentTime;

    if (type === 'kick') {
      const osc = audioCtx.createOscillator();
      const gain = audioCtx.createGain();
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(160, t);
      osc.frequency.exponentialRampToValueAtTime(30, t + 0.12);
      gain.gain.setValueAtTime(0.7, t);
      gain.gain.exponentialRampToValueAtTime(0.01, t + 0.12);
      osc.connect(gain);
      gain.connect(audioCtx.destination);
      osc.start(t);
      osc.stop(t + 0.12);
    } else if (type === 'ball_touch') {
      const osc = audioCtx.createOscillator();
      const gain = audioCtx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(100, t);
      osc.frequency.exponentialRampToValueAtTime(40, t + 0.08);
      gain.gain.setValueAtTime(0.3, t);
      gain.gain.exponentialRampToValueAtTime(0.01, t + 0.08);
      osc.connect(gain);
      gain.connect(audioCtx.destination);
      osc.start(t);
      osc.stop(t + 0.08);
    } else if (type === 'post') {
      // Metallic ting
      const osc = audioCtx.createOscillator();
      const gain = audioCtx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(880, t);
      osc.frequency.exponentialRampToValueAtTime(440, t + 0.35);
      gain.gain.setValueAtTime(0.5, t);
      gain.gain.exponentialRampToValueAtTime(0.001, t + 0.35);
      osc.connect(gain);
      gain.connect(audioCtx.destination);
      osc.start(t);
      osc.stop(t + 0.35);
    } else if (type === 'wall') {
      const osc = audioCtx.createOscillator();
      const gain = audioCtx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(70, t);
      osc.frequency.exponentialRampToValueAtTime(25, t + 0.07);
      gain.gain.setValueAtTime(0.25, t);
      gain.gain.exponentialRampToValueAtTime(0.01, t + 0.07);
      osc.connect(gain);
      gain.connect(audioCtx.destination);
      osc.start(t);
      osc.stop(t + 0.07);
    } else if (type === 'whistle') {
      // Referee whistle: two bursts
      const osc = audioCtx.createOscillator();
      const gain = audioCtx.createGain();
      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(2600, t);
      osc.frequency.setValueAtTime(3200, t + 0.08);
      gain.gain.setValueAtTime(0.3, t);
      gain.gain.exponentialRampToValueAtTime(0.01, t + 0.4);
      osc.connect(gain);
      gain.connect(audioCtx.destination);
      osc.start(t);
      osc.stop(t + 0.4);
    }
  } catch (e) {
    // Audio context silently ignored if blocked by autoplay policy
  }
}

// --- PARTICLES ENGINE ---
function spawnGoalParticles(x, y, color) {
  for (let i = 0; i < 70; i++) {
    const angle = Math.random() * Math.PI * 2;
    const speed = 2 + Math.random() * 8;
    particles.push({
      x: x,
      y: y,
      vx: Math.cos(angle) * speed,
      vy: Math.sin(angle) * speed,
      size: 4 + Math.random() * 6,
      color: Math.random() > 0.4 ? color : (Math.random() > 0.5 ? '#ffbe0b' : '#ffffff'),
      alpha: 1,
      life: 0.95 + Math.random() * 0.04
    });
  }
}

function updateParticles() {
  for (let i = particles.length - 1; i >= 0; i--) {
    const p = particles[i];
    p.x += p.vx;
    p.y += p.vy;
    p.vx *= 0.96;
    p.vy *= 0.96;
    p.alpha *= 0.96;
    if (p.alpha <= 0.02) {
      particles.splice(i, 1);
    }
  }
}

function renderParticles() {
  for (const p of particles) {
    ctx.save();
    ctx.globalAlpha = p.alpha;
    ctx.fillStyle = p.color;
    ctx.beginPath();
    ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();
  }
}

// --- INPUT SYSTEM (AZERTY & QWERTY & ARROWS) ---
const input = {
  up: false,
  down: false,
  left: false,
  right: false,
  kick: false,
  sprint: false
};

function sendInput() {
  socket.emit('playerInput', input);
}

window.addEventListener('keydown', (e) => {
  // Prevent spacebar or arrows from scrolling the webpage
  if (['Space', 'ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight'].includes(e.code)) {
    if (document.activeElement.tagName !== 'INPUT') {
      e.preventDefault();
    }
  }

  if (document.activeElement.tagName === 'INPUT') return;

  let changed = false;
  const key = e.key.toLowerCase();
  const code = e.code;

  if (key === 'z' || key === 'w' || code === 'ArrowUp') {
    if (!input.up) { input.up = true; changed = true; }
  }
  if (key === 's' || code === 'ArrowDown') {
    if (!input.down) { input.down = true; changed = true; }
  }
  if (key === 'q' || key === 'a' || code === 'ArrowLeft') {
    if (!input.left) { input.left = true; changed = true; }
  }
  if (key === 'd' || code === 'ArrowRight') {
    if (!input.right) { input.right = true; changed = true; }
  }
  if (code === 'Space') {
    if (!input.kick) { input.kick = true; changed = true; }
  }
  if (code === 'ShiftLeft' || code === 'ShiftRight') {
    if (!input.sprint) { input.sprint = true; changed = true; }
  }

  if (changed) sendInput();
});

window.addEventListener('keyup', (e) => {
  if (document.activeElement.tagName === 'INPUT') return;

  let changed = false;
  const key = e.key.toLowerCase();
  const code = e.code;

  if (key === 'z' || key === 'w' || code === 'ArrowUp') {
    if (input.up) { input.up = false; changed = true; }
  }
  if (key === 's' || code === 'ArrowDown') {
    if (input.down) { input.down = false; changed = true; }
  }
  if (key === 'q' || key === 'a' || code === 'ArrowLeft') {
    if (input.left) { input.left = false; changed = true; }
  }
  if (key === 'd' || code === 'ArrowRight') {
    if (input.right) { input.right = false; changed = true; }
  }
  if (code === 'Space') {
    if (input.kick) { input.kick = false; changed = true; }
  }
  if (code === 'ShiftLeft' || code === 'ShiftRight') {
    if (input.sprint) { input.sprint = false; changed = true; }
  }

  if (changed) sendInput();
});

// Mouse Kick
canvas.addEventListener('mousedown', (e) => {
  if (e.button === 0) {
    initAudio();
    input.kick = true;
    sendInput();
  }
});

canvas.addEventListener('mouseup', (e) => {
  if (e.button === 0) {
    input.kick = false;
    sendInput();
  }
});

// --- RENDERING ROUTINES ---
function drawPitch() {
  // 1. Grass Stripes
  const stripeWidth = 80;
  const numStripes = Math.ceil(FIELD_WIDTH / stripeWidth);

  for (let i = 0; i < numStripes; i++) {
    ctx.fillStyle = (i % 2 === 0) ? '#22813b' : '#1d7334';
    ctx.fillRect(i * stripeWidth, 0, stripeWidth, FIELD_HEIGHT);
  }

  // 2. Outer border line
  ctx.strokeStyle = '#ffffff';
  ctx.lineWidth = 4;
  ctx.strokeRect(2, 2, FIELD_WIDTH - 4, FIELD_HEIGHT - 4);

  // 3. Halfway line
  ctx.beginPath();
  ctx.moveTo(FIELD_WIDTH / 2, 0);
  ctx.lineTo(FIELD_WIDTH / 2, FIELD_HEIGHT);
  ctx.stroke();

  // 4. Center Circle & Center Spot
  ctx.beginPath();
  ctx.arc(FIELD_WIDTH / 2, FIELD_HEIGHT / 2, 90, 0, Math.PI * 2);
  ctx.stroke();

  ctx.fillStyle = '#ffffff';
  ctx.beginPath();
  ctx.arc(FIELD_WIDTH / 2, FIELD_HEIGHT / 2, 5, 0, Math.PI * 2);
  ctx.fill();

  // 5. Penalty & Goal Areas (Left)
  // Large box
  ctx.strokeRect(0, (FIELD_HEIGHT - 380) / 2, 170, 380);
  // Small goal box
  ctx.strokeRect(0, (FIELD_HEIGHT - 240) / 2, 70, 240);
  // Penalty spot
  ctx.beginPath();
  ctx.arc(130, FIELD_HEIGHT / 2, 4, 0, Math.PI * 2);
  ctx.fill();
  // Penalty arc
  ctx.beginPath();
  ctx.arc(130, FIELD_HEIGHT / 2, 70, -0.65, 0.65);
  ctx.stroke();

  // 6. Penalty & Goal Areas (Right)
  // Large box
  ctx.strokeRect(FIELD_WIDTH - 170, (FIELD_HEIGHT - 380) / 2, 170, 380);
  // Small goal box
  ctx.strokeRect(FIELD_WIDTH - 70, (FIELD_HEIGHT - 240) / 2, 70, 240);
  // Penalty spot
  ctx.beginPath();
  ctx.arc(FIELD_WIDTH - 130, FIELD_HEIGHT / 2, 4, 0, Math.PI * 2);
  ctx.fill();
  // Penalty arc
  ctx.beginPath();
  ctx.arc(FIELD_WIDTH - 130, FIELD_HEIGHT / 2, 70, Math.PI - 0.65, Math.PI + 0.65);
  ctx.stroke();

  // 7. Corner Arcs
  const cornerR = 25;
  // Top-left
  ctx.beginPath(); ctx.arc(0, 0, cornerR, 0, Math.PI / 2); ctx.stroke();
  // Bottom-left
  ctx.beginPath(); ctx.arc(0, FIELD_HEIGHT, cornerR, -Math.PI / 2, 0); ctx.stroke();
  // Top-right
  ctx.beginPath(); ctx.arc(FIELD_WIDTH, 0, cornerR, Math.PI / 2, Math.PI); ctx.stroke();
  // Bottom-right
  ctx.beginPath(); ctx.arc(FIELD_WIDTH, FIELD_HEIGHT, cornerR, Math.PI, Math.PI * 1.5); ctx.stroke();

  // 8. Goal Nets
  drawGoalNet(-GOAL_WIDTH, GOAL_Y_START, GOAL_WIDTH, GOAL_HEIGHT, 'left');
  drawGoalNet(FIELD_WIDTH, GOAL_Y_START, GOAL_WIDTH, GOAL_HEIGHT, 'right');

  // 9. Goal Posts
  drawPost(0, GOAL_Y_START);
  drawPost(0, GOAL_Y_END);
  drawPost(FIELD_WIDTH, GOAL_Y_START);
  drawPost(FIELD_WIDTH, GOAL_Y_END);
}

function drawGoalNet(x, y, w, h, side) {
  // Net background
  ctx.fillStyle = 'rgba(255, 255, 255, 0.08)';
  ctx.fillRect(x, y, w, h);

  // Net mesh grid
  ctx.strokeStyle = 'rgba(255, 255, 255, 0.35)';
  ctx.lineWidth = 1.5;

  const step = 15;
  for (let lx = x; lx <= x + w; lx += step) {
    ctx.beginPath();
    ctx.moveTo(lx, y);
    ctx.lineTo(lx, y + h);
    ctx.stroke();
  }
  for (let ly = y; ly <= y + h; ly += step) {
    ctx.beginPath();
    ctx.moveTo(x, ly);
    ctx.lineTo(x + w, ly);
    ctx.stroke();
  }

  // Outer cage frame
  ctx.strokeStyle = '#ffffff';
  ctx.lineWidth = 3;
  ctx.strokeRect(x, y, w, h);
}

function drawPost(x, y) {
  // Shadow
  ctx.fillStyle = 'rgba(0, 0, 0, 0.4)';
  ctx.beginPath();
  ctx.arc(x + 2, y + 4, 10, 0, Math.PI * 2);
  ctx.fill();

  // Metallic Post
  const grad = ctx.createRadialGradient(x - 3, y - 3, 2, x, y, 10);
  grad.addColorStop(0, '#ffffff');
  grad.addColorStop(0.7, '#cccccc');
  grad.addColorStop(1, '#888888');

  ctx.fillStyle = grad;
  ctx.beginPath();
  ctx.arc(x, y, 10, 0, Math.PI * 2);
  ctx.fill();

  ctx.strokeStyle = '#444444';
  ctx.lineWidth = 2;
  ctx.stroke();
}

function drawBall(ball) {
  const { x, y, radius = 15, vx = 0, vy = 0 } = ball;

  // Ball speed trail
  const speed = Math.hypot(vx, vy);
  if (speed > 4) {
    ctx.save();
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.3)';
    ctx.lineWidth = radius * 1.5;
    ctx.lineCap = 'round';
    ctx.beginPath();
    ctx.moveTo(x - vx * 3, y - vy * 3);
    ctx.lineTo(x, y);
    ctx.stroke();
    ctx.restore();
  }

  // Drop shadow
  ctx.fillStyle = 'rgba(0, 0, 0, 0.35)';
  ctx.beginPath();
  ctx.ellipse(x + 3, y + 6, radius, radius * 0.7, 0, 0, Math.PI * 2);
  ctx.fill();

  // Ball body
  ctx.save();
  ctx.beginPath();
  ctx.arc(x, y, radius, 0, Math.PI * 2);
  ctx.fillStyle = '#ffffff';
  ctx.fill();
  ctx.lineWidth = 2;
  ctx.strokeStyle = '#1a1a1a';
  ctx.stroke();

  // Soccer pentagon markings
  ctx.fillStyle = '#111111';
  ctx.beginPath();
  ctx.arc(x, y, radius * 0.45, 0, Math.PI * 2);
  ctx.fill();

  for (let i = 0; i < 5; i++) {
    const angle = (i * Math.PI * 2) / 5;
    const px = x + Math.cos(angle) * (radius * 0.82);
    const py = y + Math.sin(angle) * (radius * 0.82);
    ctx.beginPath();
    ctx.arc(px, py, radius * 0.22, 0, Math.PI * 2);
    ctx.fill();
  }
  ctx.restore();
}

function drawPlayer(p) {
  const { x, y, radius = 26, team, name, number, isKicking, isSprinting } = p;
  const isMe = (p.id === myPlayerId);

  // Player drop shadow
  ctx.fillStyle = 'rgba(0, 0, 0, 0.4)';
  ctx.beginPath();
  ctx.ellipse(x + 2, y + 5, radius, radius * 0.8, 0, 0, Math.PI * 2);
  ctx.fill();

  // Kicking aura pulse
  if (isKicking) {
    ctx.strokeStyle = '#ffbe0b';
    ctx.lineWidth = 4;
    ctx.beginPath();
    ctx.arc(x, y, radius + 7, 0, Math.PI * 2);
    ctx.stroke();
  }

  // Sprint trail
  if (isSprinting) {
    ctx.fillStyle = team === 'red' ? 'rgba(255, 51, 75, 0.25)' : 'rgba(0, 136, 255, 0.25)';
    ctx.beginPath();
    ctx.arc(x, y, radius + 4, 0, Math.PI * 2);
    ctx.fill();
  }

  // Player Body Circle
  const grad = ctx.createRadialGradient(x - 5, y - 5, 3, x, y, radius);
  if (team === 'red') {
    grad.addColorStop(0, '#ff6677');
    grad.addColorStop(1, '#d91430');
  } else {
    grad.addColorStop(0, '#33a3ff');
    grad.addColorStop(1, '#0066cc');
  }

  ctx.fillStyle = grad;
  ctx.beginPath();
  ctx.arc(x, y, radius, 0, Math.PI * 2);
  ctx.fill();

  // Border outline
  ctx.strokeStyle = isMe ? '#ffbe0b' : '#ffffff';
  ctx.lineWidth = isMe ? 4 : 2.5;
  ctx.stroke();

  // Player Number on jersey
  ctx.fillStyle = '#ffffff';
  ctx.font = 'bold 15px Chakra Petch, sans-serif';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText(number || '10', x, y);

  // Player Name Tag & Indicator
  ctx.font = 'bold 12px Outfit, sans-serif';
  ctx.fillStyle = isMe ? '#ffbe0b' : '#ffffff';
  ctx.fillText((isMe ? '★ ' : '') + name, x, y - radius - 10);

  // Bot badge if applicable
  if (p.isBot) {
    ctx.fillStyle = '#ffbe0b';
    ctx.font = '9px Outfit, sans-serif';
    ctx.fillText('IA', x, y - radius - 22);
  }
}

// --- MAIN ANIMATION & RENDERING LOOP ---
function renderLoop() {
  ctx.clearRect(0, 0, FIELD_WIDTH, FIELD_HEIGHT);

  drawPitch();

  if (latestState) {
    // Render bots & players
    const all = [...(latestState.players || []), ...(latestState.bots || [])];
    for (const p of all) {
      drawPlayer(p);
    }

    // Render ball
    if (latestState.ball) {
      drawBall(latestState.ball);
    }

    // Update UI elements from latestState
    updateHUD(latestState);
  }

  updateParticles();
  renderParticles();

  requestAnimationFrame(renderLoop);
}
requestAnimationFrame(renderLoop);

// --- HUD & UI UPDATES ---
const scoreRedEl = document.getElementById('score-red');
const scoreBlueEl = document.getElementById('score-blue');
const timerEl = document.getElementById('match-timer');
const redCountEl = document.getElementById('red-players-count');
const blueCountEl = document.getElementById('blue-players-count');
const goalBanner = document.getElementById('goal-banner');
const goalScorerName = document.getElementById('goal-scorer-name');
const gameoverBanner = document.getElementById('gameover-banner');
const gameoverWinner = document.getElementById('gameover-winner');
const staminaFill = document.getElementById('stamina-fill');
const botBtnText = document.getElementById('bot-btn-text');

function updateHUD(state) {
  // Score
  if (scoreRedEl) scoreRedEl.textContent = state.score.red;
  if (scoreBlueEl) scoreBlueEl.textContent = state.score.blue;

  // Timer format mm:ss
  if (timerEl) {
    const mins = Math.floor(state.timer / 60);
    const secs = state.timer % 60;
    timerEl.textContent = `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  }

  // Player counts
  const all = [...(state.players || []), ...(state.bots || [])];
  const redCount = all.filter(p => p.team === 'red').length;
  const blueCount = all.filter(p => p.team === 'blue').length;
  if (redCountEl) redCountEl.textContent = `${redCount} Joueur${redCount > 1 ? 's' : ''}`;
  if (blueCountEl) blueCountEl.textContent = `${blueCount} Joueur${blueCount > 1 ? 's' : ''}`;

  // Bot button text
  if (botBtnText) {
    botBtnText.textContent = (state.bots && state.bots.length > 0) ? 'Retirer Bot IA' : 'Ajouter Bot IA';
  }

  // My Stamina bar
  const me = (state.players || []).find(p => p.id === myPlayerId);
  if (me && staminaFill) {
    staminaFill.style.width = `${Math.round(me.stamina)}%`;
  }

  // Goal celebration banner
  if (state.state === 'goal_celebration') {
    goalBanner.classList.remove('hidden');
    if (state.scorer) {
      goalScorerName.textContent = `${state.scorer.name} (${state.scorer.team === 'red' ? 'Rouge' : 'Bleu'})`;
    }
  } else {
    goalBanner.classList.add('hidden');
  }

  // Game over banner
  if (state.state === 'game_over') {
    gameoverBanner.classList.remove('hidden');
    if (state.winner === 'draw') {
      gameoverWinner.textContent = 'Match nul ! Bien joué aux deux équipes.';
    } else {
      gameoverWinner.textContent = `Victoire éclatante de l'Équipe ${state.winner === 'red' ? 'Rouge' : 'Bleue'} ! 🎉`;
    }
  } else {
    gameoverBanner.classList.add('hidden');
  }
}

// --- SOCKET EVENT HANDLERS ---
socket.on('connect', () => {
  myPlayerId = socket.id;
});

socket.on('joined', (data) => {
  myPlayerId = data.playerId;
  currentRoomId = data.roomId;
  document.getElementById('current-room-label').textContent = currentRoomId;
});

socket.on('gameState', (state) => {
  latestState = state;
});

socket.on('sound', ({ type }) => {
  playSound(type);
});

socket.on('goal', ({ scoringTeam, scorer }) => {
  playSound('whistle');
  const goalX = scoringTeam === 'red' ? FIELD_WIDTH : 0;
  const color = scoringTeam === 'red' ? '#ff334b' : '#0088ff';
  spawnGoalParticles(goalX, FIELD_HEIGHT / 2, color);
});

socket.on('chatMessage', ({ sender, team = 'neutral', text }) => {
  const chatMessages = document.getElementById('chat-messages');
  if (!chatMessages) return;

  const msgDiv = document.createElement('div');
  msgDiv.className = `chat-msg`;

  if (sender === 'Arbitre' || sender === 'Système') {
    msgDiv.classList.add('system');
    msgDiv.textContent = `📢 [${sender}] ${text}`;
  } else {
    const senderSpan = document.createElement('span');
    senderSpan.className = `sender-${team}`;
    senderSpan.textContent = `${sender}: `;
    msgDiv.appendChild(senderSpan);
    msgDiv.appendChild(document.createTextNode(text));
  }

  chatMessages.appendChild(msgDiv);
  chatMessages.scrollTop = chatMessages.scrollHeight;
});

// --- LOBBY & BUTTON EVENT LISTENERS ---
const lobbyScreen = document.getElementById('lobby-screen');
const gameContainer = document.getElementById('game-container');
const btnJoin = document.getElementById('btn-join');
const playerNameInput = document.getElementById('player-name');
const roomCodeInput = document.getElementById('room-code');
const btnRandomRoom = document.getElementById('btn-random-room');
const teamButtons = document.querySelectorAll('.team-btn');

teamButtons.forEach(btn => {
  btn.addEventListener('click', () => {
    teamButtons.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    selectedTeam = btn.dataset.team;
  });
});

btnRandomRoom.addEventListener('click', () => {
  const rand = 'SALON-' + Math.floor(100 + Math.random() * 900);
  roomCodeInput.value = rand;
});

btnJoin.addEventListener('click', () => {
  initAudio();
  const name = playerNameInput.value.trim() || 'Attaquant';
  const roomId = roomCodeInput.value.trim() || 'global';

  socket.emit('joinRoom', {
    roomId,
    name,
    team: selectedTeam
  });

  lobbyScreen.classList.add('hidden');
  gameContainer.classList.remove('hidden');
});

// HUD controls
document.getElementById('btn-toggle-bot').addEventListener('click', () => {
  socket.emit('toggleBot');
});

document.getElementById('btn-switch-team').addEventListener('click', () => {
  socket.emit('switchTeam');
});

document.getElementById('btn-restart-game').addEventListener('click', () => {
  socket.emit('restartGame');
});

const soundToggleBtn = document.getElementById('btn-sound-toggle');
soundToggleBtn.addEventListener('click', () => {
  soundEnabled = !soundEnabled;
  soundToggleBtn.textContent = soundEnabled ? '🔊 Son Actif' : '🔇 Son Coupé';
});

// Chat form
const chatForm = document.getElementById('chat-form');
const chatInput = document.getElementById('chat-input');

chatForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const text = chatInput.value.trim();
  if (text) {
    socket.emit('sendChat', text);
    chatInput.value = '';
  }
});

// Quick tags
document.querySelectorAll('.quick-tag').forEach(tag => {
  tag.addEventListener('click', () => {
    const msg = tag.dataset.msg;
    socket.emit('sendChat', msg);
  });
});

// Resize canvas handling to maintain crispness and aspect ratio
function adjustCanvasSize() {
  const dpr = window.devicePixelRatio || 1;
  // We keep canvas internal resolution at 1200 x 700
  canvas.width = FIELD_WIDTH;
  canvas.height = FIELD_HEIGHT;
}
adjustCanvasSize();
window.addEventListener('resize', adjustCanvasSize);
