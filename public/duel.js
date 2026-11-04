// ==============================================================
// MODE DUEL 1V1 MULTIJOUEUR EN TEMPS RÉEL (DEADLINE DAY PANIC)
// ==============================================================

let socket = null;
let currentDuelRoom = null;
let myDuelPlayerIndex = null;
let myDuelPlayer = null;
let opponentDuelPlayer = null;
let isDuelActive = false;
let isDuelMercatoDone = false;
let duelSimData = null;
let directMatchQueue = [];
let currentDirectMatchIndex = 0;

function initDuelSocket() {
  if (socket) return;
  if (typeof io === 'undefined') {
    console.error("Socket.io client library not loaded!");
    return;
  }

  socket = io();

  // Événements Salon & Lobby
  socket.on('duelRoomCreated', ({ code, playerIndex, player }) => {
    currentDuelRoom = { code, players: [player] };
    myDuelPlayerIndex = 0;
    myDuelPlayer = player;
    
    const codeEl = document.getElementById('duel-lobby-code-display');
    if (codeEl) codeEl.textContent = code;
    const shareEl = document.getElementById('duel-lobby-share-url');
    if (shareEl) shareEl.textContent = window.location.origin + '?duel=' + code;
    const waitHint = document.getElementById('duel-waiting-hint');
    if (waitHint) waitHint.classList.remove('hidden');
    const matchupBox = document.getElementById('duel-matchup-box');
    if (matchupBox) matchupBox.classList.add('hidden');
    const readyBtnBox = document.getElementById('duel-ready-btn-container');
    if (readyBtnBox) readyBtnBox.classList.add('hidden');
    
    showScreen('screen-duel-lobby');
    showToast(`✅ Salon ${code} créé ! Partagez le code ou le lien avec votre adversaire.`, 'success');
  });

  socket.on('duelRoomReady', ({ code, league, rivalryName, rivalryTag, tier, players, market }) => {
    currentDuelRoom = { code, league, rivalryName, rivalryTag, tier, players, market };
    const myId = socket.id;
    myDuelPlayerIndex = players.findIndex(p => p.id === myId);
    myDuelPlayer = players[myDuelPlayerIndex];
    opponentDuelPlayer = players[myDuelPlayerIndex === 0 ? 1 : 0];

    const codeEl = document.getElementById('duel-lobby-code-display');
    if (codeEl) codeEl.textContent = code;
    const shareEl = document.getElementById('duel-lobby-share-url');
    if (shareEl) shareEl.textContent = window.location.origin + '?duel=' + code;

    const waitHint = document.getElementById('duel-waiting-hint');
    if (waitHint) waitHint.classList.add('hidden');
    const matchupBox = document.getElementById('duel-matchup-box');
    if (matchupBox) matchupBox.classList.remove('hidden');
    const readyBtnBox = document.getElementById('duel-ready-btn-container');
    if (readyBtnBox) readyBtnBox.classList.remove('hidden');

    showScreen('screen-duel-lobby');
    updateDuelReadyBtn(myDuelPlayer ? myDuelPlayer.isReady : false);
    renderDuelLobbyMatchup(league, players, rivalryName, rivalryTag);
    const toastTitle = rivalryName ? `${rivalryName} (${league})` : league;
    showToast(`⚔️ Préparez-vous pour le choc : ${toastTitle} !`, 'info');
  });

  socket.on('duelPlayerReadyChanged', ({ playerId, isReady }) => {
    if (!currentDuelRoom) return;
    const p = currentDuelRoom.players.find(x => x.id === playerId);
    if (p) p.isReady = isReady;

    const myId = socket.id;
    if (playerId === myId) {
      updateDuelReadyBtn(isReady);
    }
    renderDuelLobbyMatchup(currentDuelRoom.league, currentDuelRoom.players, currentDuelRoom.rivalryName, currentDuelRoom.rivalryTag);
  });

  socket.on('duelCountdownTick', ({ count }) => {
    const overlay = document.getElementById('duel-countdown-overlay');
    const textEl = document.getElementById('duel-countdown-text');
    if (overlay && textEl) {
      overlay.classList.remove('hidden');
      textEl.textContent = count;
      audio.play('timer_tick');
    }
  });

  // Événements Mercato
  socket.on('duelMercatoStarted', ({ timer, market, players }) => {
    const overlay = document.getElementById('duel-countdown-overlay');
    if (overlay) overlay.classList.add('hidden');

    isDuelActive = true;
    isDuelMercatoDone = false;
    currentDuelRoom.market = market;

    const myId = socket.id;
    myDuelPlayer = players.find(p => p.id === myId);
    opponentDuelPlayer = players.find(p => p.id !== myId);

    // Initialiser le mode mercato avec le scénario attribué
    activeScenario = myDuelPlayer.club;
    currentRemainingBudget = myDuelPlayer.club.budget;
    currentSignedPlayers = [];
    realtimeRemainingSeconds = timer;

    // Masquer le timer solo et afficher le bandeau Duel
    document.getElementById('duel-mercato-hud').classList.remove('hidden');
    updateDuelHUDInfo();

    // Masquer les boutons solo "CLÔTURER" pour éviter tout doublon avec "Mercato Bouclé 🏁"
    const btnCloseSolo = document.getElementById('btn-close-mercato');
    const btnCloseSoloMob = document.getElementById('btn-close-mercato-mobile');
    if (btnCloseSolo) btnCloseSolo.classList.add('hidden');
    if (btnCloseSoloMob) btnCloseSoloMob.classList.add('hidden');

    // Remplir le marché partagé (mise à jour de la variable globale utilisée par app.js)
    currentMarketPlayers = market;
    window.currentProceduralMarket = market;

    // Mettre à jour l'en-tête du club et les cibles du coach sur l'interface
    const badgeEl = document.getElementById('mercato-club-badge');
    if (badgeEl) badgeEl.textContent = activeScenario.logo || '🛡️';
    const titleEl = document.getElementById('mercato-club-title');
    if (titleEl) titleEl.textContent = activeScenario.club;

    const originNote = (activeScenario.originConstraint && activeScenario.originConstraint.code !== 'FREE')
      ? `<span class="block mt-1 font-bold text-amber-300 not-italic">📍 Filière exigée : ${activeScenario.originConstraint.name || activeScenario.originConstraint.label} (${activeScenario.originConstraint.shortDesc || activeScenario.originConstraint.hint || ''})</span>`
      : '';
    const coachRem = document.getElementById('mercato-coach-reminder');
    if (coachRem) coachRem.innerHTML = `"${activeScenario.coachDemand}"${originNote}`;

    // Rendre les éléments de marché et le HUD
    updateMercatoHUD();
    renderSignedPlayers();
    renderMarketPlayers();

    showScreen('screen-mercato');
    audio.play('deal_signed');
    showToast("⏱️ C'EST PARTI ! 3 minutes pour boucler votre mercato avant votre adversaire !", "success");
  });

  socket.on('duelTimerTick', ({ timer }) => {
    realtimeRemainingSeconds = timer;
    const mins = Math.floor(timer / 60);
    const secs = timer % 60;
    const timeStr = `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    
    const timerEl = document.getElementById('realtime-clock');
    if (timerEl) timerEl.textContent = timeStr;
    const duelTimerEl = document.getElementById('duel-timer-display');
    if (duelTimerEl) duelTimerEl.textContent = timeStr;

    if (timer <= 30) {
      duelTimerEl.className = 'font-mono text-xl sm:text-2xl font-black text-rose-500 animate-pulse';
    } else {
      duelTimerEl.className = 'font-mono text-xl sm:text-2xl font-black text-amber-400';
    }
  });

  // Verrouillage en temps réel
  socket.on('playerLockedNotice', ({ playerId, lockerName }) => {
    const target = currentMarketPlayers.find(p => p.id === playerId);
    if (target) {
      target.isLockedByRival = true;
      target.rivalLockerName = lockerName;
    }
    renderMarketPlayers();
  });

  socket.on('playerUnlockedNotice', ({ playerId }) => {
    const target = currentMarketPlayers.find(p => p.id === playerId);
    if (target) {
      target.isLockedByRival = false;
      target.rivalLockerName = null;
    }
    renderMarketPlayers();
  });

  // Achat en direct par un joueur
  socket.on('playerSoldNotice', ({ playerId, buyerName, buyerId, agreedPrice, buyerRemainingBudget, buyerSignedCount }) => {
    audio.play('alert');
    const isMe = buyerId === socket.id;

    if (!isMe) {
      showToast(`🚨 ${buyerName} vient d'arracher un joueur pour ${agreedPrice.toFixed(1)} M€ !`, 'warning');
      if (opponentDuelPlayer) {
        opponentDuelPlayer.remainingBudget = buyerRemainingBudget;
        opponentDuelPlayer.signedCount = buyerSignedCount;
      }
      updateDuelHUDInfo();

      // Mettre à jour le joueur dans le marché partagé local
      const target = currentMarketPlayers.find(p => p.id === playerId);
      if (target) {
        target.isSold = true;
        target.isSoldToRival = true;
        target.rivalBidClub = buyerName;
        target.isLockedByRival = false;
      }

      // Si le joueur local négociait ce même joueur, fermer immédiatement la négociation !
      if (activeNegotiation && activeNegotiation.player && activeNegotiation.player.id === playerId) {
        const negoModal = document.getElementById('modal-negotiation');
        if (negoModal) negoModal.classList.add('hidden');
        const medModal = document.getElementById('modal-medical-dilemma');
        if (medModal) medModal.classList.add('hidden');
        showToast(`💥 TROP TARD ! ${buyerName} a finalisé la signature de ce joueur sous votre nez !`, 'error', 4500);
        audio.play('fail');
      }

      renderMarketPlayers();
    }
  });

  socket.on('playerLockFailed', ({ message }) => {
    showToast(message, 'error');
    audio.play('fail');
    const negoModal = document.getElementById('modal-negotiation');
    if (negoModal) negoModal.classList.add('hidden');
    const medModal = document.getElementById('modal-medical-dilemma');
    if (medModal) medModal.classList.add('hidden');
  });

  socket.on('playerDoneNotice', ({ playerId, playerName }) => {
    const isMe = playerId === socket.id;
    if (isMe) {
      const btn = document.getElementById('duel-mercato-done-btn');
      if (btn) {
        btn.disabled = true;
        btn.textContent = 'En attente de votre rival... ⏳';
        btn.className = 'py-2.5 px-4 bg-gray-800 text-amber-400 font-display font-extrabold text-xs rounded-xl border border-amber-400/40';
      }
    } else {
      showToast(`🏁 ${playerName} a terminé son mercato !`, 'info');
      const oppStatusEl = document.getElementById('duel-opp-status');
      if (oppStatusEl) oppStatusEl.textContent = 'Mercato bouclé ! 🏁';
    }
  });

  // Lancement de la simulation duel
  socket.on('startDuelSimulation', ({ simResult, p1, p2 }) => {
    duelSimData = { simResult, p1, p2 };
    directMatchQueue = [...simResult.h2hMatches];
    currentDirectMatchIndex = 0;

    // Fermer toute négociation ouverte
    document.getElementById('modal-negotiation').classList.add('hidden');
    document.getElementById('modal-medical-dilemma').classList.add('hidden');

    runDuelSeasonSimulation(simResult);
  });

  // Revanche
  socket.on('rematchOffered', ({ proposerName }) => {
    audio.play('alert');
    const modal = document.getElementById('modal-duel-rematch-offer');
    const textEl = document.getElementById('duel-rematch-offer-text');
    if (modal && textEl) {
      textEl.innerHTML = `<strong>${proposerName}</strong> souhaite prendre sa revanche immédiate ! Relevez-vous le défi ?`;
      modal.classList.remove('hidden');
    }
  });

  socket.on('duelRematchAccepted', ({ league, rivalryName, rivalryTag, tier, players, market }) => {
    document.getElementById('modal-duel-rematch-offer').classList.add('hidden');
    currentDuelRoom.league = league;
    currentDuelRoom.rivalryName = rivalryName;
    currentDuelRoom.rivalryTag = rivalryTag;
    currentDuelRoom.tier = tier;
    currentDuelRoom.players = players;
    currentDuelRoom.market = market;

    const myId = socket.id;
    myDuelPlayerIndex = players.findIndex(p => p.id === myId);
    myDuelPlayer = players[myDuelPlayerIndex];
    opponentDuelPlayer = players[myDuelPlayerIndex === 0 ? 1 : 0];

    // Réinitialiser les boutons de rematch et de fin de mercato
    const rematchBtn = document.getElementById('duel-rematch-btn');
    if (rematchBtn) {
      rematchBtn.disabled = false;
      rematchBtn.innerHTML = '<span>⚔️ PROPOSER UNE REVANCHE IMMÉDIATE</span>';
      rematchBtn.className = 'w-full py-4 bg-gradient-to-r from-amber-400 via-amber-300 to-amber-500 hover:from-amber-300 hover:to-amber-400 text-black font-display font-black text-xs rounded-2xl shadow-xl transition transform hover:scale-[1.01] flex items-center justify-center gap-2 border border-amber-300';
    }

    const doneBtn = document.getElementById('duel-mercato-done-btn');
    if (doneBtn) {
      doneBtn.disabled = false;
      doneBtn.textContent = '🏁 VALIDER MON EFFECTIF';
      doneBtn.className = 'py-2.5 px-4 bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-black font-display font-black text-xs rounded-xl shadow-lg transition transform hover:scale-105';
    }

    updateDuelReadyBtn(false);
    renderDuelLobbyMatchup(league, players, rivalryName, rivalryTag);
    showScreen('screen-duel-lobby');
    showToast("⚔️ Revanche acceptée ! Nouveaux clubs et nouveau marché prêts !", "success");
  });

  socket.on('opponentLeftRoom', ({ message }) => {
    showToast(`⚠️ ${message}`, 'warning');
    const oppStatusEl = document.getElementById('duel-opp-status');
    if (oppStatusEl) oppStatusEl.textContent = 'Déconnecté ❌';
  });

  socket.on('duelError', ({ message }) => {
    showToast(message, 'error');
  });
}

// ==============================================================
// GESTION DU LOBBY & AFFICHAGE DUEL
// ==============================================================

function renderDuelLobbyMatchup(league, players, rivalryName = null, rivalryTag = null) {
  const p1 = players[0];
  const p2 = players[1];

  const leagueBadge = document.getElementById('duel-lobby-league-badge');
  if (leagueBadge) leagueBadge.textContent = `🏆 ${league} • D1`;

  // Bannière du Choc / Derby
  const rivBadge = document.getElementById('duel-lobby-rivalry-badge');
  const rivTag = document.getElementById('duel-lobby-rivalry-tag');
  const actualName = rivalryName || (currentDuelRoom && currentDuelRoom.rivalryName) || '⚔️ CHOC DIRECT EN LIGNE';
  const actualTag = rivalryTag || (currentDuelRoom && currentDuelRoom.rivalryTag) || 'Rivalité au sommet • Équité parfaite';
  if (rivBadge) rivBadge.textContent = actualName;
  if (rivTag) rivTag.textContent = actualTag;

  // Désactivation du bouton reroll si au moins un joueur est prêt
  const rerollBtn = document.getElementById('btn-reroll-duel');
  const isAnyReady = (p1 && p1.isReady) || (p2 && p2.isReady);
  if (rerollBtn) {
    rerollBtn.disabled = isAnyReady;
    if (isAnyReady) {
      rerollBtn.classList.add('opacity-40', 'cursor-not-allowed');
      rerollBtn.title = "Impossible de changer de choc lorsqu'un manager est déjà prêt.";
    } else {
      rerollBtn.classList.remove('opacity-40', 'cursor-not-allowed');
      rerollBtn.title = "Tirer un autre choc parmi les 47 duos et 13 championnats";
    }
  }

  // Joueur 1
  if (p1) {
    document.getElementById('duel-p1-name').textContent = p1.name;
    if (p1.club) {
      document.getElementById('duel-p1-logo').textContent = p1.club.logo || '🛡️';
      document.getElementById('duel-p1-club').textContent = p1.club.club;
      document.getElementById('duel-p1-budget').textContent = `${p1.club.budget.toFixed(1)} M€`;
      document.getElementById('duel-p1-coach').textContent = `Coach : "${p1.club.coachDemand}"`;
    }
    const r1 = document.getElementById('duel-p1-ready-badge');
    r1.textContent = p1.isReady ? 'PRÊT 🟢' : 'EN ATTENTE ⏳';
    r1.className = p1.isReady 
      ? 'text-[10px] font-black uppercase px-2.5 py-1 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/40'
      : 'text-[10px] font-black uppercase px-2.5 py-1 rounded-full bg-gray-800 text-gray-400 border border-gray-700';
  }

  // Joueur 2
  if (p2) {
    document.getElementById('duel-p2-name').textContent = p2.name;
    if (p2.club) {
      document.getElementById('duel-p2-logo').textContent = p2.club.logo || '⚔️';
      document.getElementById('duel-p2-club').textContent = p2.club.club;
      document.getElementById('duel-p2-budget').textContent = `${p2.club.budget.toFixed(1)} M€`;
      document.getElementById('duel-p2-coach').textContent = `Coach : "${p2.club.coachDemand}"`;
    }
    const r2 = document.getElementById('duel-p2-ready-badge');
    r2.textContent = p2.isReady ? 'PRÊT 🟢' : 'EN ATTENTE ⏳';
    r2.className = p2.isReady 
      ? 'text-[10px] font-black uppercase px-2.5 py-1 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/40'
      : 'text-[10px] font-black uppercase px-2.5 py-1 rounded-full bg-gray-800 text-gray-400 border border-gray-700';
  }
}

function rerollDuelMatchupAction() {
  if (!socket) return;
  socket.emit('rerollDuelMatchup');
  showToast('🎲 Tirage d\'un nouveau duel aléatoire...', 'info');
}

function updateDuelReadyBtn(isReady) {
  const btn = document.getElementById('duel-toggle-ready-btn');
  if (!btn) return;
  if (isReady) {
    btn.textContent = 'Annuler mon statut Prêt ⏳';
    btn.className = 'w-full py-4 bg-gray-800 hover:bg-gray-700 text-amber-300 font-display font-extrabold text-sm rounded-2xl border border-amber-400/40 transition shadow-lg';
  } else {
    btn.textContent = 'JE SUIS PRÊT ! 🟢';
    btn.className = 'w-full py-4 bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-black font-display font-extrabold text-sm rounded-2xl shadow-xl shadow-emerald-500/20 transition transform hover:scale-[1.02]';
  }
}

function updateDuelHUDInfo() {
  if (!opponentDuelPlayer) return;
  document.getElementById('duel-opp-name').textContent = opponentDuelPlayer.name;
  document.getElementById('duel-opp-club-logo').textContent = opponentDuelPlayer.club ? opponentDuelPlayer.club.logo : '🛡️';
  document.getElementById('duel-opp-club-name').textContent = opponentDuelPlayer.club ? opponentDuelPlayer.club.club : 'Rival';
  document.getElementById('duel-opp-budget').textContent = `${opponentDuelPlayer.remainingBudget.toFixed(1)} M€`;
  document.getElementById('duel-opp-count').textContent = `${opponentDuelPlayer.signedCount || 0} recrue${(opponentDuelPlayer.signedCount || 0) > 1 ? 's' : ''}`;
}

// Actions utilisateur depuis l'interface
function openSoloMode() {
  isDuelActive = false;
  document.getElementById('duel-mercato-hud').classList.add('hidden');
  showScreen('screen-home');
}

function openDuelPortal() {
  initDuelSocket();
  const savedNick = localStorage.getItem('ddp_duel_nickname') || '';
  const nickInput = document.getElementById('duel-nickname-input');
  if (nickInput && savedNick) nickInput.value = savedNick;
  showScreen('screen-duel-portal');
}

function createDuelRoomAction() {
  const nickInput = document.getElementById('duel-nickname-input');
  const nick = (nickInput ? nickInput.value.trim() : '') || 'Manager 1';
  localStorage.setItem('ddp_duel_nickname', nick);

  initDuelSocket();
  if (socket && socket.connected) {
    socket.emit('createDuelRoom', { nickname: nick });
  } else if (socket) {
    showToast('Connexion au serveur du salon...', 'info');
    socket.once('connect', () => {
      socket.emit('createDuelRoom', { nickname: nick });
    });
  }
}

function joinDuelRoomAction() {
  const nickInput = document.getElementById('duel-nickname-input');
  const codeInput = document.getElementById('duel-code-input');
  const nick = (nickInput ? nickInput.value.trim() : '') || 'Manager 2';
  const code = codeInput ? codeInput.value.trim().toUpperCase() : '';

  if (!code) {
    showToast('Veuillez saisir le code du salon !', 'warning');
    return;
  }

  localStorage.setItem('ddp_duel_nickname', nick);
  initDuelSocket();
  if (socket && socket.connected) {
    socket.emit('joinDuelRoom', { code, nickname: nick });
  } else if (socket) {
    showToast('Connexion au serveur du salon...', 'info');
    socket.once('connect', () => {
      socket.emit('joinDuelRoom', { code, nickname: nick });
    });
  }
}

function toggleDuelReadyAction() {
  if (!socket) return;
  socket.emit('toggleDuelReady');
}

function copyDuelShareLink() {
  if (!currentDuelRoom) return;
  const url = window.location.origin + '?duel=' + currentDuelRoom.code;
  navigator.clipboard.writeText(url).then(() => {
    showToast('🔗 Lien du salon copié dans le presse-papier !', 'success');
  }).catch(() => {
    showToast(`Code salon : ${currentDuelRoom.code}`, 'info');
  });
}

function finishDuelMercatoAction() {
  if (!socket) return;
  socket.emit('playerDoneMercato');
}

// ==============================================================
// SIMULATION DUEL AVEC RALENTISSEMENT SUR LES CONFRONTATIONS
// ==============================================================

function runDuelSeasonSimulation(simResult) {
  showScreen('screen-simulation');

  const progressBar = document.getElementById('sim-progress-bar');
  const matchdayEl = document.getElementById('sim-matchday');
  const tickerIcon = document.getElementById('sim-ticker-icon');
  const tickerText = document.getElementById('sim-ticker-text');
  const virtualRankEl = document.getElementById('sim-virtual-rank');
  const virtualPointsEl = document.getElementById('sim-virtual-points');

  let matchday = 0;
  const isP1 = myDuelPlayer.name === simResult.p1Result.name;
  const myResult = isP1 ? simResult.p1Result : simResult.p2Result;
  const oppResult = isP1 ? simResult.p2Result : simResult.p1Result;

  const simInterval = setInterval(() => {
    matchday++;
    const pct = Math.round((matchday / 38) * 100);
    progressBar.style.width = `${pct}%`;
    matchdayEl.textContent = `Journée ${matchday} / 38`;

    // Progression réaliste des points
    const currentPts = Math.round((myResult.points / 38) * matchday);
    const oppPts = Math.round((oppResult.points / 38) * matchday);
    virtualPointsEl.textContent = `${currentPts} pts (Rival : ${oppPts} pts)`;
    virtualRankEl.textContent = `${myResult.club} vs ${oppResult.club}`;

    updateDuelMiniStandings(myResult, oppResult, currentPts, oppPts, matchday);

    // ÉVÉNEMENT 1 : AUDIT FINANCIER DNCG À J22
    if (matchday === 22 && simResult.dncg) {
      clearInterval(simInterval);
      triggerDNCGAnimation(simResult.dncg, () => {
        resumeDuelSimulation(matchday, simResult);
      });
      return;
    }

    // ÉVÉNEMENT 2 : Ralentissement & Choc Direct Aller ou Retour avec Dilemme d'Avant-Derby
    const directMatch = simResult.h2hMatches.find(m => m.matchday === matchday);
    if (directMatch) {
      clearInterval(simInterval);
      triggerDerbyDilemma(directMatch, () => {
        triggerDirectMatchAnimation(directMatch, () => {
          // Reprise automatique et synchronisée de la simulation après le choc
          resumeDuelSimulation(matchday, simResult);
        });
      });
      return;
    }

    if (matchday % 5 === 0) {
      tickerIcon.textContent = '⚡';
      tickerText.textContent = `J${matchday} : Lutte acharnée pour le maintien ! Écart : ${Math.abs(currentPts - oppPts)} pt(s).`;
    }

    if (matchday >= 38) {
      clearInterval(simInterval);
      setTimeout(() => {
        showDuelRecapScreen(simResult);
      }, 800);
    }
  }, 180);
}

function resumeDuelSimulation(startMatchday, simResult) {
  let matchday = startMatchday;
  const progressBar = document.getElementById('sim-progress-bar');
  const matchdayEl = document.getElementById('sim-matchday');
  const virtualPointsEl = document.getElementById('sim-virtual-points');
  const virtualRankEl = document.getElementById('sim-virtual-rank');
  const tickerIcon = document.getElementById('sim-ticker-icon');
  const tickerText = document.getElementById('sim-ticker-text');

  const isP1 = myDuelPlayer.name === simResult.p1Result.name;
  const myResult = isP1 ? simResult.p1Result : simResult.p2Result;
  const oppResult = isP1 ? simResult.p2Result : simResult.p1Result;

  const simInterval = setInterval(() => {
    matchday++;
    const pct = Math.round((matchday / 38) * 100);
    progressBar.style.width = `${pct}%`;
    matchdayEl.textContent = `Journée ${matchday} / 38`;

    const currentPts = Math.round((myResult.points / 38) * matchday);
    const oppPts = Math.round((oppResult.points / 38) * matchday);
    virtualPointsEl.textContent = `${currentPts} pts (Rival : ${oppPts} pts)`;
    virtualRankEl.textContent = `${myResult.club} vs ${oppResult.club}`;

    updateDuelMiniStandings(myResult, oppResult, currentPts, oppPts, matchday);

    // ÉVÉNEMENT 1 : AUDIT FINANCIER DNCG À J22
    if (matchday === 22 && simResult.dncg) {
      clearInterval(simInterval);
      triggerDNCGAnimation(simResult.dncg, () => {
        resumeDuelSimulation(matchday, simResult);
      });
      return;
    }

    // Vérifier si un autre match direct arrive (ex: Match Retour)
    const directMatch = simResult.h2hMatches.find(m => m.matchday === matchday);
    if (directMatch) {
      clearInterval(simInterval);
      triggerDerbyDilemma(directMatch, () => {
        triggerDirectMatchAnimation(directMatch, () => {
          resumeDuelSimulation(matchday, simResult);
        });
      });
      return;
    }

    if (matchday % 5 === 0) {
      tickerIcon.textContent = '⚡';
      tickerText.textContent = `J${matchday} : Lutte acharnée pour le maintien ! Écart : ${Math.abs(currentPts - oppPts)} pt(s).`;
    }

    if (matchday >= 38) {
      clearInterval(simInterval);
      setTimeout(() => {
        showDuelRecapScreen(simResult);
      }, 800);
    }
  }, 180);
}

function updateDuelMiniStandings(myResult, oppResult, myPts, oppPts, matchday) {
  const standingsEl = document.getElementById('sim-mini-standings');
  const matchdayLabel = document.getElementById('sim-mini-standings-matchday');
  if (matchdayLabel) matchdayLabel.textContent = `J${matchday} / 38`;
  if (!standingsEl) return;

  const isMeAhead = myPts >= oppPts;
  const first = isMeAhead ? { res: myResult, pts: myPts, isMe: true } : { res: oppResult, pts: oppPts, isMe: false };
  const second = isMeAhead ? { res: oppResult, pts: oppPts, isMe: false } : { res: myResult, pts: myPts, isMe: true };

  standingsEl.innerHTML = `
    <div class="flex items-center justify-between p-2 sm:p-2.5 rounded-xl ${first.isMe ? 'bg-amber-500/15 border border-amber-500/40' : 'bg-gray-800/80 border border-gray-700'}">
      <div class="flex items-center gap-2 min-w-0">
        <span class="text-xs font-mono font-bold text-amber-400 w-5">1.</span>
        <span class="text-sm shrink-0">${first.res.logo || '🛡️'}</span>
        <span class="font-bold text-white text-xs truncate">${first.res.club} <span class="text-[10px] text-gray-400 font-normal">(${first.res.name}${first.isMe ? ' - Vous' : ''})</span></span>
      </div>
      <span class="font-mono font-black ${first.isMe ? 'text-amber-400' : 'text-gray-300'} text-xs sm:text-sm shrink-0 ml-2">${first.pts} pts</span>
    </div>
    <div class="flex items-center justify-between p-2 sm:p-2.5 rounded-xl ${second.isMe ? 'bg-amber-500/15 border border-amber-500/40' : 'bg-gray-800/80 border border-gray-700'}">
      <div class="flex items-center gap-2 min-w-0">
        <span class="text-xs font-mono font-bold text-gray-500 w-5">2.</span>
        <span class="text-sm shrink-0">${second.res.logo || '🛡️'}</span>
        <span class="font-bold text-white text-xs truncate">${second.res.club} <span class="text-[10px] text-gray-400 font-normal">(${second.res.name}${second.isMe ? ' - Vous' : ''})</span></span>
      </div>
      <span class="font-mono font-black ${second.isMe ? 'text-amber-400' : 'text-gray-300'} text-xs sm:text-sm shrink-0 ml-2">${second.pts} pts</span>
    </div>
  `;
}

// ==============================================================
// AUDIT FINANCIER DNCG (J22)
// ==============================================================

function triggerDNCGAnimation(dncgData, onComplete) {
  audio.play('alert');
  const modal = document.getElementById('modal-duel-dncg');
  const card1 = document.getElementById('duel-dncg-card-p1');
  const card2 = document.getElementById('duel-dncg-card-p2');

  if (!modal || !card1 || !card2) {
    if (onComplete) onComplete();
    return;
  }

  const p1 = dncgData.p1;
  const p2 = dncgData.p2;

  const renderCard = (p) => `
    <div class="flex items-center gap-2.5 mb-2.5">
      <span class="text-3xl">${p.logo || '🛡️'}</span>
      <div class="min-w-0">
        <h4 class="font-display font-black text-sm text-white truncate">${p.club}</h4>
        <span class="text-[10px] text-gray-400 font-bold block truncate">Présidence : ${p.name}</span>
      </div>
    </div>
    <div class="mb-2">
      <span class="text-[10px] px-2.5 py-1 rounded-md ${p.badgeClass} block text-center uppercase tracking-wide">
        ${p.badge}
      </span>
    </div>
    <p class="text-xs text-gray-300 leading-snug italic bg-black/40 p-2.5 rounded-xl border border-gray-800">
      "${p.summary}"
    </p>
  `;

  card1.innerHTML = renderCard(p1);
  card2.innerHTML = renderCard(p2);

  modal.classList.remove('hidden');

  let hasResumed = false;
  const resume = () => {
    if (hasResumed) return;
    hasResumed = true;
    modal.classList.add('hidden');
    if (onComplete) onComplete();
  };

  setTimeout(resume, 3800);
}

// ==============================================================
// DILEMME D'AVANT-DERBY (GUERRE PSYCHOLOGIQUE & ULTRAS)
// ==============================================================

let activeDerbyDilemmaTimer = null;
let activeDerbyCallback = null;

function triggerDerbyDilemma(matchData, onComplete) {
  audio.play('alert');
  const modal = document.getElementById('modal-duel-derby-dilemma');
  const tagEl = document.getElementById('duel-derby-dilemma-tag');
  const timerEl = document.getElementById('duel-derby-dilemma-timer');
  const titleEl = document.getElementById('duel-derby-dilemma-title');
  const descEl = document.getElementById('duel-derby-dilemma-desc');
  const actionsEl = document.getElementById('duel-derby-dilemma-actions');
  const verdictEl = document.getElementById('duel-derby-dilemma-verdict');

  if (!modal) {
    if (onComplete) onComplete();
    return;
  }

  // Identifier si le joueur local est Domicile ou Extérieur
  const isMeHome = myDuelPlayer.club && myDuelPlayer.club.club === matchData.homeClub;
  const dilemma = isMeHome ? matchData.dilemmaHome : matchData.dilemmaAway;

  if (!dilemma) {
    if (onComplete) onComplete();
    return;
  }

  modal.classList.remove('hidden');
  actionsEl.classList.remove('hidden');
  verdictEl.classList.add('hidden');

  tagEl.innerHTML = isMeHome 
    ? `<span>🏟️</span> PRESSION DU REPAIRE LOCAL • CHOC J${matchData.matchday}`
    : `<span>🚌</span> GUERRE PSYCHOLOGIQUE EN DÉPLACEMENT • CHOC J${matchData.matchday}`;

  titleEl.textContent = dilemma.title;
  descEl.textContent = `"${dilemma.question}"`;

  activeDerbyCallback = onComplete;

  let secondsLeft = 6;
  timerEl.textContent = `0${secondsLeft}s`;

  if (activeDerbyDilemmaTimer) clearInterval(activeDerbyDilemmaTimer);
  activeDerbyDilemmaTimer = setInterval(() => {
    secondsLeft--;
    timerEl.textContent = `0${secondsLeft}s`;
    if (secondsLeft <= 0) {
      clearInterval(activeDerbyDilemmaTimer);
      submitDuelDerbyChoice(false); // Par défaut: rester clean si temps écoulé
    }
  }, 1000);
}

function submitDuelDerbyChoice(tenteLeCoup) {
  if (activeDerbyDilemmaTimer) {
    clearInterval(activeDerbyDilemmaTimer);
    activeDerbyDilemmaTimer = null;
  }

  const actionsEl = document.getElementById('duel-derby-dilemma-actions');
  const verdictEl = document.getElementById('duel-derby-dilemma-verdict');
  const modal = document.getElementById('modal-duel-derby-dilemma');

  actionsEl.classList.add('hidden');
  verdictEl.classList.remove('hidden');

  if (tenteLeCoup) {
    const success = Math.random() < 0.65;
    if (success) {
      audio.play('deal_signed');
      verdictEl.className = 'py-3 px-3 rounded-xl text-xs font-bold mt-2 bg-emerald-950/80 border border-emerald-500 text-emerald-300';
      verdictEl.innerHTML = `<span>🔥 COUP RÉUSSI !</span><p class="text-[11px] font-normal mt-1 text-emerald-200">L'adversaire est totalement déstabilisé par le coup de pression. Avantage psychologique immédiat !</p>`;
    } else {
      audio.play('fail');
      verdictEl.className = 'py-3 px-3 rounded-xl text-xs font-bold mt-2 bg-rose-950/80 border border-rose-500 text-rose-300';
      verdictEl.innerHTML = `<span>💥 RETOUR DE FLAMME !</span><p class="text-[11px] font-normal mt-1 text-rose-200">Le piège a fuité ou s'est retourné contre votre vestiaire. Vos joueurs sont crispés !</p>`;
    }
  } else {
    verdictEl.className = 'py-3 px-3 rounded-xl text-xs font-bold mt-2 bg-gray-800 border border-gray-700 text-gray-300';
    verdictEl.innerHTML = `<span>🛡️ SAGESSE & RESPECT DU JEU</span><p class="text-[11px] font-normal mt-1 text-gray-400">Le piège n'est pas tenté. La vérité se fera exclusivement sur le terrain vert.</p>`;
  }

  setTimeout(() => {
    modal.classList.add('hidden');
    if (activeDerbyCallback) {
      const cb = activeDerbyCallback;
      activeDerbyCallback = null;
      cb();
    }
  }, 1800);
}

// Animation rythmée du match direct avec fermeture automatique synchronisée
function triggerDirectMatchAnimation(matchData, onComplete) {
  audio.play('alert');
  const modal = document.getElementById('modal-duel-confrontation');
  const titleEl = document.getElementById('duel-match-title');
  const homeEl = document.getElementById('duel-match-home');
  const awayEl = document.getElementById('duel-match-away');
  const scoreEl = document.getElementById('duel-match-score');
  const timelineEl = document.getElementById('duel-match-timeline');
  const autoNotice = document.getElementById('duel-match-autoresume-notice');

  modal.classList.remove('hidden');
  titleEl.textContent = `⚔️ ${matchData.label.toUpperCase()} (J${matchData.matchday}) ⚔️`;
  homeEl.textContent = matchData.homeClub;
  awayEl.textContent = matchData.awayClub;
  scoreEl.textContent = '0 - 0';
  timelineEl.innerHTML = '';
  if (autoNotice) autoNotice.classList.add('hidden');

  let currentScore1 = 0;
  let currentScore2 = 0;
  let eventIdx = 0;

  const eventInterval = setInterval(() => {
    if (eventIdx < matchData.events.length) {
      const ev = matchData.events[eventIdx];
      eventIdx++;

      if (ev.type === 'goal') {
        audio.play('deal_signed');
        if (ev.isP1) currentScore1++;
        else currentScore2++;
        scoreEl.textContent = `${currentScore1} - ${currentScore2}`;
      }

      const row = document.createElement('div');
      row.className = 'flex items-center gap-2 text-xs py-1.5 border-b border-gray-800';
      row.innerHTML = `
        <span class="font-mono font-bold text-amber-400 w-8">${ev.minute}'</span>
        <span>${ev.type === 'goal' ? '⚽ BUT !' : (ev.type === 'save' ? '🧤 Parade !' : '🟨 Carton')}</span>
        <strong class="${ev.isP1 ? 'text-amber-300' : 'text-blue-300'} truncate">${ev.player}</strong>
        <span class="text-gray-400 text-[10px] shrink-0">(${ev.team})</span>
      `;
      timelineEl.prepend(row);
    } else {
      clearInterval(eventInterval);
      scoreEl.textContent = `${matchData.score1} - ${matchData.score2}`;
      audio.play('gong');

      // Compte à rebours automatique sans bouton manuel pour ne jamais désynchroniser les 2 joueurs
      if (autoNotice) {
        autoNotice.textContent = "⏱️ Fin du match ! Reprise automatique du championnat...";
        autoNotice.classList.remove('hidden');
      }

      let hasClosed = false;
      const doClose = () => {
        if (hasClosed) return;
        hasClosed = true;
        modal.classList.add('hidden');
        if (autoNotice) autoNotice.classList.add('hidden');
        if (onComplete) onComplete();
      };

      // Fermeture automatique synchronisée après 2.2 secondes
      setTimeout(doClose, 2200);
    }
  }, 550);
}

// Bilan final du duel
function showDuelRecapScreen(simResult) {
  audio.play('deal_signed');
  showScreen('screen-duel-recap');

  const isMeWinner = simResult.duelWinner === myDuelPlayer.name;
  const isDraw = simResult.duelWinner === 'Égalité';

  const outcomeBanner = document.getElementById('duel-recap-banner');
  const outcomeTitle = document.getElementById('duel-recap-title');
  const outcomeSub = document.getElementById('duel-recap-sub');

  if (isMeWinner) {
    outcomeBanner.className = 'p-6 rounded-3xl border-2 border-emerald-500 bg-emerald-950/40 text-center mb-6 shadow-2xl shadow-emerald-500/20';
    outcomeTitle.textContent = `👑 VICTOIRE ÉCLATANTE DE ${myDuelPlayer.name.toUpperCase()} !`;
    outcomeSub.textContent = `Vous terminez devant votre rival au classement final ! La direction adverse est en crise.`;
  } else if (isDraw) {
    outcomeBanner.className = 'p-6 rounded-3xl border-2 border-amber-500 bg-amber-950/40 text-center mb-6 shadow-2xl shadow-amber-500/20';
    outcomeTitle.textContent = `🤝 ÉGALITÉ FRATRICIDE !`;
    outcomeSub.textContent = `Les deux clubs terminent au coude-à-coude avec un total de points identique !`;
  } else {
    outcomeBanner.className = 'p-6 rounded-3xl border-2 border-rose-500 bg-rose-950/40 text-center mb-6 shadow-2xl shadow-rose-500/20';
    outcomeTitle.textContent = `💀 DÉFAITE FACE À ${simResult.duelWinner.toUpperCase()}...`;
    outcomeSub.textContent = `Votre rival termine devant vous au classement général. Votre mercato a coûté cher !`;
  }

  // Tableau comparatif
  const p1 = simResult.p1Result;
  const p2 = simResult.p2Result;

  const p1DncgBadge = p1.dncg ? `<div class="mt-2"><span class="text-[9px] px-2 py-0.5 rounded ${p1.dncg.badgeClass}">${p1.dncg.badge}</span></div>` : '';
  const p2DncgBadge = p2.dncg ? `<div class="mt-2"><span class="text-[9px] px-2 py-0.5 rounded ${p2.dncg.badgeClass}">${p2.dncg.badge}</span></div>` : '';

  document.getElementById('duel-recap-p1-card').innerHTML = `
    <div class="text-center">
      <span class="text-3xl">${p1.logo || '🛡️'}</span>
      <h4 class="font-display font-extrabold text-base text-white mt-1">${p1.name}</h4>
      <span class="text-xs text-gray-400">${p1.club}</span>
      <div class="mt-3 p-3 bg-gray-900 border border-gray-800 rounded-xl">
        <span class="text-2xl font-mono font-black text-amber-400">${p1.rank}e</span>
        <span class="text-xs text-gray-400 block font-semibold">${p1.points} points</span>
        ${p1DncgBadge}
      </div>
    </div>
  `;

  document.getElementById('duel-recap-p2-card').innerHTML = `
    <div class="text-center">
      <span class="text-3xl">${p2.logo || '⚔️'}</span>
      <h4 class="font-display font-extrabold text-base text-white mt-1">${p2.name}</h4>
      <span class="text-xs text-gray-400">${p2.club}</span>
      <div class="mt-3 p-3 bg-gray-900 border border-gray-800 rounded-xl">
        <span class="text-2xl font-mono font-black text-amber-400">${p2.rank}e</span>
        <span class="text-xs text-gray-400 block font-semibold">${p2.points} points</span>
        ${p2DncgBadge}
      </div>
    </div>
  `;

  // Confrontations directes
  const h1 = simResult.h2hMatches[0];
  const h2 = simResult.h2hMatches[1];
  document.getElementById('duel-recap-h2h').innerHTML = `
    <div class="flex items-center justify-between p-3 bg-gray-900/80 rounded-xl border border-gray-800 text-xs">
      <span class="text-gray-400 font-bold">Aller (J${h1.matchday}) :</span>
      <span class="font-bold text-white">${h1.homeClub} <strong>${h1.score1} - ${h1.score2}</strong> ${h1.awayClub}</span>
    </div>
    <div class="flex items-center justify-between p-3 bg-gray-900/80 rounded-xl border border-gray-800 text-xs mt-2">
      <span class="text-gray-400 font-bold">Retour (J${h2.matchday}) :</span>
      <span class="font-bold text-white">${h2.homeClub} <strong>${h2.score1} - ${h2.score2}</strong> ${h2.awayClub}</span>
    </div>
  `;

  // Autopsie du Duel / Analyse décisionnelle
  const analysisPointsEl = document.getElementById('duel-recap-analysis-points');
  const punchlineEl = document.getElementById('duel-recap-analysis-punchline');

  if (simResult.analysis) {
    const pointsHtml = (simResult.analysis.points || []).map(pt => `
      <div class="flex items-start gap-3 bg-gray-900/70 p-3 rounded-xl border border-gray-800">
        <span class="text-xl shrink-0 mt-0.5">${pt.icon}</span>
        <div>
          <strong class="text-white text-xs block font-bold mb-0.5">${pt.title}</strong>
          <p class="text-gray-300 text-[11px] leading-relaxed">${pt.desc}</p>
        </div>
      </div>
    `).join('');
    if (analysisPointsEl) analysisPointsEl.innerHTML = pointsHtml;
    if (punchlineEl) punchlineEl.innerHTML = `<strong>🎙️ L'avis du consultant :</strong> ${simResult.analysis.punchline}`;
  }
}

function requestDuelRematchAction() {
  if (!socket) return;
  socket.emit('requestRematch');
  const btn = document.getElementById('duel-rematch-btn');
  if (btn) {
    btn.disabled = true;
    btn.textContent = 'Demande de revanche envoyée... ⏳';
    btn.className = 'py-3 px-6 bg-gray-800 text-amber-400 font-display font-extrabold text-xs rounded-xl border border-amber-400/40';
  }
}

function acceptDuelRematchAction() {
  if (!socket) return;
  socket.emit('requestRematch');
}

function declineDuelRematchAction() {
  document.getElementById('modal-duel-rematch-offer').classList.add('hidden');
  openSoloMode();
}
