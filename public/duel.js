function renderDebriefIcon(icon) {
  if (icon === 'h2h_win' || icon === '⚔️' || icon === '⚔') {
    return `<span class="w-7 h-7 rounded-lg bg-blue-500/10 text-blue-500 flex items-center justify-center shrink-0">${getCrossedSwordsSvg('w-4 h-4')}</span>`;
  }
  if (icon === 'target' || icon === '🎯' || icon === 'fit') {
    return `<span class="w-7 h-7 rounded-lg bg-emerald-500/10 text-emerald-500 flex items-center justify-center shrink-0"><svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="6"/><circle cx="12" cy="12" r="2"/></svg></span>`;
  }
  if (icon === 'chess' || icon === 'tactics' || icon === '♟️' || icon === 'synergy') {
    return `<span class="w-7 h-7 rounded-lg bg-indigo-500/10 text-indigo-500 flex items-center justify-center shrink-0"><svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 2l3 5H9l3-5zM9 7h6v3H9zM7 10h10v3H7zM5 13h14v4H5zM3 21h18v-4H3z"/></svg></span>`;
  }
  if (icon === 'puzzle' || icon === 'misfit' || icon === '🧩') {
    return `<span class="w-7 h-7 rounded-lg bg-amber-500/10 text-amber-500 flex items-center justify-center shrink-0"><svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M19.439 7.85c0-1.571-1.275-2.846-2.846-2.846a2.848 2.848 0 00-2.846 2.846v.286H9.742a2.848 2.848 0 00-2.846-2.846A2.848 2.848 0 004.05 7.85h.286v4.568a2.848 2.848 0 00-2.846 2.846 2.848 2.848 0 002.846 2.846h.286v4.568h4.568a2.848 2.848 0 002.846-2.846 2.848 2.848 0 002.846 2.846h4.568v-4.568a2.848 2.848 0 002.846-2.846 2.848 2.848 0 00-2.846-2.846h-.286V7.85h.286z"/></svg></span>`;
  }
  if (icon === 'brain' || icon === 'mind' || icon === '🧠') {
    return `<span class="w-7 h-7 rounded-lg bg-rose-500/10 text-rose-500 flex items-center justify-center shrink-0"><svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M9.5 2A2.5 2.5 0 0 1 12 4.5v15a2.5 2.5 0 0 1-4.96.44 2.5 2.5 0 0 1-2.96-3.08 3 3 0 0 1-.34-5.58 2.5 2.5 0 0 1 1.32-4.24 2.5 2.5 0 0 1 4.44-2.54z"/><path d="M14.5 2A2.5 2.5 0 0 0 12 4.5v15a2.5 2.5 0 0 0 4.96.44 2.5 2.5 0 0 0 2.96-3.08 3 3 0 0 0 .34-5.58 2.5 2.5 0 0 0-1.32-4.24 2.5 2.5 0 0 0-4.44-2.54z"/></svg></span>`;
  }
  if (icon === 'crown' || icon === 'leader' || icon === '👑') {
    return `<span class="w-7 h-7 rounded-lg bg-yellow-500/10 text-yellow-500 flex items-center justify-center shrink-0"><svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M2 4l3 12h14l3-12-6 7-4-7-4 7-6-7zm3 16h14v2H5v-2z"/></svg></span>`;
  }
  if (icon === 'medical' || icon === 'injury' || icon === '🩹') {
    return `<span class="w-7 h-7 rounded-lg bg-red-500/10 text-red-500 flex items-center justify-center shrink-0"><svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="3" width="18" height="18" rx="4"/><line x1="12" y1="8" x2="12" y2="16"/><line x1="8" y1="12" x2="16" y2="12"/></svg></span>`;
  }
  if (icon === 'penalty' || icon === 'drop' || icon === '📉') {
    return `<span class="w-7 h-7 rounded-lg bg-amber-500/10 text-amber-500 flex items-center justify-center shrink-0"><svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="23 18 13.5 8.5 8.5 13.5 1 6"/><polyline points="17 18 23 18 23 12"/></svg></span>`;
  }
  if (icon === 'warning' || icon === 'alert' || icon === '⚠️' || icon === '🚨') {
    return `<span class="w-7 h-7 rounded-lg bg-red-500/10 text-red-500 flex items-center justify-center shrink-0"><svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg></span>`;
  }
  if (icon === 'clean' || icon === 'check' || icon === '🟢' || icon === 'handshake' || icon === '🤝') {
    return `<span class="w-7 h-7 rounded-lg bg-emerald-500/10 text-emerald-500 flex items-center justify-center shrink-0"><svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="20 6 9 17 4 12"/></svg></span>`;
  }
  if (icon === 'balance' || icon === 'draw' || icon === '⚖️') {
    return `<span class="w-7 h-7 rounded-lg bg-blue-500/10 text-blue-500 flex items-center justify-center shrink-0"><svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 6h18M12 2v20M6 6l-3 7h6l-3-7zM18 6l-3 7h6l-3-7z"/></svg></span>`;
  }
  if (icon === 'bolt' || icon === 'resilience' || icon === '⚡') {
    return `<span class="w-7 h-7 rounded-lg bg-yellow-500/10 text-yellow-500 flex items-center justify-center shrink-0"><svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg></span>`;
  }
  return `<span class="w-7 h-7 rounded-lg bg-slate-500/10 text-slate-400 flex items-center justify-center shrink-0"><svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/></svg></span>`;
}


function getCrossedSwordsSvg(cls = "w-4 h-4 text-blue-600 dark:text-blue-400 inline-block") {
  return `<svg class="${cls}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M14.5 17.5 3 6V3h3l11.5 11.5"/><path d="m13 19 6 2-2-6"/><path d="M9.5 17.5 21 6V3h-3L6.5 14.5"/><path d="m11 19-6 2 2-6"/></svg>`;
}

function getClawSvg(cls = "w-8 h-8 text-amber-500 dark:text-amber-400") {
  return `<svg class="${cls}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M6 3c1.5 3 2 7 2 12M10 2c1.5 4 2 8 2 14M14 2c1.5 4 2 8 2 14M18 3c1.5 3 2 7 2 12M5 21c3-1 11-1 14 0"/></svg>`;
}

function getParasolSvg(cls = "w-8 h-8 text-amber-500") {
  return `<svg class="${cls}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 2a10 10 0 0 0-10 10h20a10 10 0 0 0-10-10Z"/><path d="M12 12v9a2 2 0 0 1-2 2"/><path d="M12 2v2"/><path d="M7 12a5 5 0 0 1 5-5"/><path d="M17 12a5 5 0 0 0-5-5"/></svg>`;
}

function renderDuelClubLogo(club) {
  if (!club) return '';
  const name = club.club || club.name || '';
  const lower = name.toLowerCase();
  if (lower.includes('boavista')) {
    return getClawSvg('w-8 h-8 text-amber-500 dark:text-amber-400');
  }
  if (lower.includes('estoril')) {
    return getParasolSvg('w-8 h-8 text-amber-500');
  }
  const initials = typeof getClubInitials === 'function' ? getClubInitials(name) : name.substring(0, 2).toUpperCase();
  return `<div class="w-10 h-10 rounded-2xl bg-blue-50 dark:bg-blue-950/40 text-blue-600 dark:text-blue-400 font-display font-black text-sm flex items-center justify-center border border-blue-200 dark:border-blue-900/40 shadow-xs">${initials}</div>`;
}

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
    showToast(` Salon ${code} créé ! Partagez le code ou le lien avec votre adversaire.`, 'success');
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
    showToast(`️ Préparez-vous pour le choc : ${toastTitle} !`, 'info');
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
    const elMobNego = document.getElementById('nego-mobile-budget');
    if (elMobNego) elMobNego.textContent = `${currentRemainingBudget.toFixed(1)} M€`;
    currentSignedPlayers = [];
    realtimeRemainingSeconds = timer;

    // Masquer le timer solo et afficher le bandeau Duel
    document.getElementById('duel-mercato-hud').classList.remove('hidden');
    updateDuelHUDInfo();

    // Masquer les boutons solo "CLÔTURER" pour éviter tout doublon avec "Mercato Bouclé "
    const btnCloseSolo = document.getElementById('btn-close-mercato');
    const btnCloseSoloMob = document.getElementById('btn-close-mercato-mobile');
    if (btnCloseSolo) btnCloseSolo.classList.add('hidden');
    if (btnCloseSoloMob) btnCloseSoloMob.classList.add('hidden');

    // Remplir le marché partagé (mise à jour de la variable globale utilisée par app.js)
    currentMarketPlayers = market;
    window.currentProceduralMarket = market;

    // Mettre à jour l'en-tête du club et les cibles du coach sur l'interface
    const badgeEl = document.getElementById('mercato-club-badge');
    if (badgeEl) badgeEl.textContent = activeScenario.logo || '️';
    const titleEl = document.getElementById('mercato-club-title');
    if (titleEl) titleEl.textContent = activeScenario.club;

    // Enrichissement tactique impératif (Parité Solo Difficile)
    if (typeof enrichScenarioTacticalDemands === 'function') {
      enrichScenarioTacticalDemands(activeScenario);
    }

    const originNote = (activeScenario.originConstraint && activeScenario.originConstraint.code !== 'FREE')
      ? `<span class="block mt-1 font-bold text-amber-300 not-italic">Réseau prioritaire : ${activeScenario.originConstraint.name} (${activeScenario.originConstraint.shortDesc})</span>`
      : '';
    const tacticalClues = (activeScenario.needs && activeScenario.needs.length > 0)
      ? activeScenario.needs.map((n, i) => {
          const posInfo = (typeof formatNeedPositionLabels === 'function') ? formatNeedPositionLabels(n) : { fullConcatenated: n.name || n.code };
          return `<span class="block mt-1 font-normal text-blue-100 text-xs sm:text-[13px] leading-relaxed">• <strong>${posInfo.fullConcatenated}</strong> : ${n.tacticalClue || n.name}</span>`;
        }).join('')
      : activeScenario.coachDemand;

    const coachRem = document.getElementById('mercato-coach-reminder');
    if (coachRem) {
      coachRem.innerHTML = `<span class="font-extrabold text-white block mb-1">"Voici mes exigences tactiques impératives :"</span>${tacticalClues}${originNote}`;
    }

    // Rendre les éléments de marché et le HUD
    updateMercatoHUD();
    renderSignedPlayers();
    renderMarketPlayers();

    showScreen('screen-mercato');
    audio.play('deal_signed');
    showToast(" C'EST PARTI ! 3 minutes pour boucler votre mercato avant votre adversaire !", "success");
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
      showToast(` ${buyerName} vient d'arracher un joueur pour ${agreedPrice.toFixed(1)} M€ !`, 'warning');
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
        showToast(` TROP TARD ! ${buyerName} a finalisé la signature de ce joueur sous votre nez !`, 'error', 4500);
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
        btn.textContent = 'En attente de votre rival...';
        btn.className = 'py-2.5 px-4 bg-gray-800 text-amber-400 font-display font-extrabold text-xs rounded-xl border border-amber-400/40';
      }
    } else {
      showToast(` ${playerName} a terminé son mercato !`, 'info');
      const oppStatusEl = document.getElementById('duel-opp-status');
      if (oppStatusEl) oppStatusEl.textContent = 'Mercato bouclé !';
    }
  });

  // Lancement de la simulation duel
  socket.on('startDuelSimulation', ({ simResult, p1, p2 }) => {
    duelSimData = { simResult, p1, p2 };
    directMatchQueue = [...((simResult && simResult.h2hMatches) || [])];
    currentDirectMatchIndex = 0;

    // Fermer toute négociation, modale ou overlay mobile en toute sécurité
    const modNego = document.getElementById('modal-negotiation');
    if (modNego) modNego.classList.add('hidden');
    const modMed = document.getElementById('modal-medical-dilemma');
    if (modMed) modMed.classList.add('hidden');
    const cdOverlay = document.getElementById('duel-countdown-overlay');
    if (cdOverlay) cdOverlay.classList.add('hidden');

    // Forcer la fermeture de l'overlay mobile et le masquage de l'écran mercato
    const negoCol = document.getElementById('in-game-negotiation-col');
    if (negoCol) {
      negoCol.classList.remove('mobile-nego-active');
      negoCol.style.display = 'none';
    }
    if (typeof closeMobileNegotiation === 'function') {
      closeMobileNegotiation();
    }

    const screenMercato = document.getElementById('screen-mercato');
    if (screenMercato) {
      screenMercato.classList.add('hidden');
      screenMercato.style.display = 'none';
    }
    document.body.classList.remove('in-mercato');

    // Basculer immédiatement sur l'écran Flash Matchday et lancer la simulation J1-J38
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
      rematchBtn.innerHTML = '<span>️ PROPOSER UNE REVANCHE IMMÉDIATE</span>';
      rematchBtn.className = 'w-full py-4 bg-gradient-to-r from-amber-400 via-amber-300 to-amber-500 hover:from-amber-300 hover:to-amber-400 text-black font-display font-black text-xs rounded-2xl shadow-xl transition transform hover:scale-[1.01] flex items-center justify-center gap-2 border border-amber-300';
    }

    const doneBtn = document.getElementById('duel-mercato-done-btn');
    if (doneBtn) {
      doneBtn.disabled = false;
      doneBtn.textContent = ' VALIDER MON EFFECTIF';
      doneBtn.className = 'py-2.5 px-4 bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-black font-display font-black text-xs rounded-xl shadow-lg transition transform hover:scale-105';
    }

    updateDuelReadyBtn(false);
    renderDuelLobbyMatchup(league, players, rivalryName, rivalryTag);
    showScreen('screen-duel-lobby');
    showToast("️ Revanche acceptée ! Nouveaux clubs et nouveau marché prêts !", "success");
  });

  socket.on('opponentLeftRoom', ({ message }) => {
    showToast(`️ ${message}`, 'warning');
    const oppStatusEl = document.getElementById('duel-opp-status');
    if (oppStatusEl) oppStatusEl.textContent = 'Déconnecté ';
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

  // 1. Drapeau vectoriel de la ligue en haut à gauche
  const leagueBadge = document.getElementById('duel-lobby-league-badge');
  if (leagueBadge) {
    const rawLeague = league || (p1 && p1.club && p1.club.country) || 'Liga Portugal';
    const cleanLeague = rawLeague.replace(/[\uD83C-\uDBFF\uDC00-\uDFFF]/g, '').trim() || 'Ligue';
    const flagHtml = typeof renderFlag === 'function' ? renderFlag(rawLeague, cleanLeague, 'w-4 h-3 inline-block shrink-0') : '';
    leagueBadge.innerHTML = `<span class="inline-flex items-center gap-1.5">${flagHtml} <span>${cleanLeague} • D1</span></span>`;
  }

  // 2. Bannière du Choc / Derby avec SVG d'épées croisées
  const rivBadge = document.getElementById('duel-lobby-rivalry-badge');
  const rivTag = document.getElementById('duel-lobby-rivalry-tag');
  const actualName = rivalryName || (currentDuelRoom && currentDuelRoom.rivalryName) || 'CHOC DIRECT EN LIGNE';
  const cleanRivName = actualName.replace(/⚔️/g, '').replace(/️/g, '').trim();
  const actualTag = rivalryTag || (currentDuelRoom && currentDuelRoom.rivalryTag) || 'Rivalité au sommet • Équité parfaite';
  if (rivBadge) {
    rivBadge.innerHTML = `<span class="inline-flex items-center gap-1.5">${getCrossedSwordsSvg('w-4 h-4 text-blue-600 dark:text-blue-400 shrink-0')} <span>${cleanRivName}</span></span>`;
  }
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

  // Joueur 1 : Logo vectoriel propre (griffe Boavista, parasol Estoril, ou blason typographique)
  if (p1) {
    const p1NameEl = document.getElementById('duel-p1-name');
    if (p1NameEl) p1NameEl.textContent = p1.name;
    if (p1.club) {
      const p1LogoEl = document.getElementById('duel-p1-logo');
      if (p1LogoEl) p1LogoEl.innerHTML = renderDuelClubLogo(p1.club);
      const p1ClubEl = document.getElementById('duel-p1-club');
      if (p1ClubEl) p1ClubEl.textContent = p1.club.club;
      const p1BudEl = document.getElementById('duel-p1-budget');
      if (p1BudEl) p1BudEl.textContent = `${p1.club.budget.toFixed(1)} M€`;
      const p1CoachEl = document.getElementById('duel-p1-coach');
      if (p1CoachEl) p1CoachEl.textContent = `Coach : "${p1.club.coachDemand}"`;
    }
    const r1 = document.getElementById('duel-p1-ready-badge');
    if (r1) {
      r1.textContent = p1.isReady ? 'PRÊT' : 'EN ATTENTE';
      r1.className = p1.isReady 
        ? 'text-[10px] font-black uppercase px-2.5 py-1 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/40'
        : 'text-[10px] font-black uppercase px-2.5 py-1 rounded-full bg-gray-200 dark:bg-slate-800 text-gray-500 dark:text-gray-400 border border-gray-300 dark:border-gray-700';
    }
  }

  // Joueur 2 : Logo vectoriel propre
  if (p2) {
    const p2NameEl = document.getElementById('duel-p2-name');
    if (p2NameEl) p2NameEl.textContent = p2.name;
    if (p2.club) {
      const p2LogoEl = document.getElementById('duel-p2-logo');
      if (p2LogoEl) p2LogoEl.innerHTML = renderDuelClubLogo(p2.club);
      const p2ClubEl = document.getElementById('duel-p2-club');
      if (p2ClubEl) p2ClubEl.textContent = p2.club.club;
      const p2BudEl = document.getElementById('duel-p2-budget');
      if (p2BudEl) p2BudEl.textContent = `${p2.club.budget.toFixed(1)} M€`;
      const p2CoachEl = document.getElementById('duel-p2-coach');
      if (p2CoachEl) p2CoachEl.textContent = `Coach : "${p2.club.coachDemand}"`;
    }
    const r2 = document.getElementById('duel-p2-ready-badge');
    if (r2) {
      r2.textContent = p2.isReady ? 'PRÊT' : 'EN ATTENTE';
      r2.className = p2.isReady 
        ? 'text-[10px] font-black uppercase px-2.5 py-1 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/40'
        : 'text-[10px] font-black uppercase px-2.5 py-1 rounded-full bg-gray-200 dark:bg-slate-800 text-gray-500 dark:text-gray-400 border border-gray-300 dark:border-gray-700';
    }
  }
}

function rerollDuelMatchupAction() {
  if (!socket) return;
  socket.emit('rerollDuelMatchup');
  showToast(' Tirage d\'un nouveau duel aléatoire...', 'info');
}

function updateDuelReadyBtn(isReady) {
  const btn = document.getElementById('duel-toggle-ready-btn');
  if (!btn) return;
  if (isReady) {
    btn.textContent = 'Annuler mon statut Prêt';
    btn.className = 'w-full py-4 bg-gray-800 hover:bg-gray-700 text-amber-300 font-display font-extrabold text-sm rounded-2xl border border-amber-400/40 transition shadow-lg';
  } else {
    btn.textContent = 'JE SUIS PRÊT !';
    btn.className = 'w-full py-4 bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-black font-display font-extrabold text-sm rounded-2xl shadow-xl shadow-emerald-500/20 transition transform hover:scale-[1.02]';
  }
}

function updateDuelHUDInfo() {
  if (!opponentDuelPlayer) return;
  const oppNameEl = document.getElementById('duel-opp-name');
  if (oppNameEl) oppNameEl.textContent = opponentDuelPlayer.name;
  const oppLogoEl = document.getElementById('duel-opp-club-logo');
  if (oppLogoEl) oppLogoEl.innerHTML = renderDuelClubLogo(opponentDuelPlayer.club);
  const oppClubNameEl = document.getElementById('duel-opp-club-name');
  if (oppClubNameEl) oppClubNameEl.textContent = opponentDuelPlayer.club ? opponentDuelPlayer.club.club : 'Rival';
  const oppBudEl = document.getElementById('duel-opp-budget');
  if (oppBudEl) oppBudEl.textContent = `${opponentDuelPlayer.remainingBudget.toFixed(1)} M€`;
  const oppCountEl = document.getElementById('duel-opp-count');
  if (oppCountEl) oppCountEl.textContent = `${opponentDuelPlayer.signedCount || 0} recrue${(opponentDuelPlayer.signedCount || 0) > 1 ? 's' : ''}`;
}

// Actions utilisateur depuis l'interface
function switchModesTab(mode) {
  const soloPanel = document.getElementById('modes-panel-solo');
  const duelPanel = document.getElementById('modes-panel-duel');
  const soloBtn = document.getElementById('tab-btn-solo');
  const duelBtn = document.getElementById('tab-btn-duel');

  if (mode === 'duel') {
    if (soloPanel) {
      soloPanel.classList.add('hidden');
      soloPanel.style.display = 'none';
    }
    if (duelPanel) {
      duelPanel.classList.remove('hidden');
      duelPanel.style.display = 'block';
    }

    if (soloBtn) {
      soloBtn.className = 'flex-1 sm:flex-initial px-4 sm:px-6 py-3 rounded-xl text-gray-600 hover:text-slate-900 dark:text-gray-400 dark:hover:text-white font-extrabold text-xs sm:text-sm transition cursor-pointer text-center select-none';
    }
    if (duelBtn) {
      duelBtn.className = 'flex-1 sm:flex-initial px-4 sm:px-6 py-3 rounded-xl bg-white dark:bg-slate-900 text-slate-900 dark:text-white font-black text-xs sm:text-sm shadow-sm transition cursor-pointer text-center select-none';
    }

    if (typeof initDuelSocket === 'function') {
      initDuelSocket();
    }

    const savedNick = localStorage.getItem('ddp_duel_nickname') || '';
    const nickInput = document.getElementById('duel-nickname-input');
    if (nickInput && savedNick && !nickInput.value) {
      nickInput.value = savedNick;
    }
  } else {
    // Mode Solo
    if (duelPanel) {
      duelPanel.classList.add('hidden');
      duelPanel.style.display = 'none';
    }
    if (soloPanel) {
      soloPanel.classList.remove('hidden');
      soloPanel.style.display = '';
    }

    if (soloBtn) {
      soloBtn.className = 'flex-1 sm:flex-initial px-4 sm:px-6 py-3 rounded-xl bg-white dark:bg-slate-900 text-slate-900 dark:text-white font-black text-xs sm:text-sm shadow-sm transition cursor-pointer text-center select-none';
    }
    if (duelBtn) {
      duelBtn.className = 'flex-1 sm:flex-initial px-4 sm:px-6 py-3 rounded-xl text-gray-600 hover:text-slate-900 dark:text-gray-400 dark:hover:text-white font-extrabold text-xs sm:text-sm transition cursor-pointer text-center select-none';
    }
  }
}

function openDuelPortal() {
  if (typeof showScreen === 'function') {
    showScreen('screen-modes');
  }
  switchModesTab('duel');
}

function openSoloMode() {
  isDuelActive = false;
  const hud = document.getElementById('duel-mercato-hud');
  if (hud) hud.classList.add('hidden');
  if (typeof showScreen === 'function') {
    showScreen('screen-modes');
  }
  switchModesTab('solo');
}

// Global exports
window.switchModesTab = switchModesTab;
window.openDuelPortal = openDuelPortal;
window.openSoloMode = openSoloMode;

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
    showToast(' Lien du salon copié dans le presse-papier !', 'success');
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
  // Masquage forcé du mercato et affichage immédiat de la simulation sur mobile et PC
  const screenMercato = document.getElementById('screen-mercato');
  if (screenMercato) {
    screenMercato.classList.add('hidden');
    screenMercato.style.display = 'none';
  }
  const negoCol = document.getElementById('in-game-negotiation-col');
  if (negoCol) {
    negoCol.classList.remove('mobile-nego-active');
    negoCol.style.display = 'none';
  }
  document.body.classList.remove('in-mercato');

  if (typeof showScreen === 'function') {
    showScreen('screen-simulation');
  } else {
    const simScreen = document.getElementById('screen-simulation');
    if (simScreen) {
      simScreen.classList.remove('hidden');
      simScreen.style.display = 'block';
    }
  }
  window.scrollTo({ top: 0, behavior: 'instant' });

  const progressBar = document.getElementById('sim-progress-bar');
  const matchdayEl = document.getElementById('sim-matchday');
  const tickerIcon = document.getElementById('sim-ticker-icon');
  const tickerText = document.getElementById('sim-ticker-text');
  const virtualRankEl = document.getElementById('sim-virtual-rank');
  const virtualPointsEl = document.getElementById('sim-virtual-points');

  // En-tête Flash Matchday avec drapeau de la ligue
  const leagueTitleEl = document.getElementById('sim-mini-standings-title');
  if (leagueTitleEl) {
    const rawLeague = (currentDuelRoom && currentDuelRoom.league) || 'Liga Portugal';
    const flagHtml = typeof renderFlag === 'function' ? renderFlag(rawLeague, 'Ligue', 'w-4 h-3 inline-block') : '';
    leagueTitleEl.innerHTML = `<span class="inline-flex items-center gap-1.5">${flagHtml} <span>Duel 1v1 en Direct</span></span>`;
  }

  const tickerTagEl = document.getElementById('sim-ticker-tag');
  if (tickerTagEl) {
    const rawLeague = (currentDuelRoom && currentDuelRoom.league) || 'Liga Portugal';
    const flagHtml = typeof renderFlag === 'function' ? renderFlag(rawLeague, 'Ligue', 'w-3.5 h-2.5 inline-block') : '';
    tickerTagEl.innerHTML = `<span class="inline-flex items-center gap-1.5">${flagHtml} <span>FLASH MATCHDAY 1V1</span></span>`;
  }

  let matchday = 0;
  const myName = (myDuelPlayer && myDuelPlayer.name) || '';
  const isP1 = simResult.p1Result && simResult.p1Result.name === myName;
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
    virtualRankEl.innerHTML = `<span class="truncate block max-w-[250px] sm:max-w-[340px]" title="${myResult.club} vs ${oppResult.club}"><span class="text-blue-500 font-bold">${myResult.club}</span> <span class="text-gray-400 font-normal">vs</span> <span>${oppResult.club}</span></span>`;

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
      tickerIcon.textContent = '';
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
    virtualRankEl.innerHTML = `<span class="truncate block max-w-[250px] sm:max-w-[340px]" title="${myResult.club} vs ${oppResult.club}"><span class="text-blue-500 font-bold">${myResult.club}</span> <span class="text-gray-400 font-normal">vs</span> <span>${oppResult.club}</span></span>`;

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
      tickerIcon.textContent = '';
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
        <span class="text-sm shrink-0">${first.res.logo || '️'}</span>
        <span class="font-bold text-white text-xs truncate">${first.res.club} <span class="text-[10px] text-gray-400 font-normal">(${first.res.name}${first.isMe ? ' - Vous' : ''})</span></span>
      </div>
      <span class="font-mono font-black ${first.isMe ? 'text-amber-400' : 'text-gray-300'} text-xs sm:text-sm shrink-0 ml-2">${first.pts} pts</span>
    </div>
    <div class="flex items-center justify-between p-2 sm:p-2.5 rounded-xl ${second.isMe ? 'bg-amber-500/15 border border-amber-500/40' : 'bg-gray-800/80 border border-gray-700'}">
      <div class="flex items-center gap-2 min-w-0">
        <span class="text-xs font-mono font-bold text-gray-500 w-5">2.</span>
        <span class="text-sm shrink-0">${second.res.logo || '️'}</span>
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
      <span class="text-3xl">${p.logo || '️'}</span>
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
    ? `<span>️</span> PRESSION DU REPAIRE LOCAL • CHOC J${matchData.matchday}`
    : `<span></span> GUERRE PSYCHOLOGIQUE EN DÉPLACEMENT • CHOC J${matchData.matchday}`;

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
      verdictEl.innerHTML = `<span> COUP RÉUSSI !</span><p class="text-[11px] font-normal mt-1 text-emerald-200">L'adversaire est totalement déstabilisé par le coup de pression. Avantage psychologique immédiat !</p>`;
    } else {
      audio.play('fail');
      verdictEl.className = 'py-3 px-3 rounded-xl text-xs font-bold mt-2 bg-rose-950/80 border border-rose-500 text-rose-300';
      verdictEl.innerHTML = `<span> RETOUR DE FLAMME !</span><p class="text-[11px] font-normal mt-1 text-rose-200">Le piège a fuité ou s'est retourné contre votre vestiaire. Vos joueurs sont crispés !</p>`;
    }
  } else {
    verdictEl.className = 'py-3 px-3 rounded-xl text-xs font-bold mt-2 bg-gray-800 border border-gray-700 text-gray-300';
    verdictEl.innerHTML = `<span>️ SAGESSE & RESPECT DU JEU</span><p class="text-[11px] font-normal mt-1 text-gray-400">Le piège n'est pas tenté. La vérité se fera exclusivement sur le terrain vert.</p>`;
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
  titleEl.textContent = `️ ${matchData.label.toUpperCase()} (J${matchData.matchday}) ️`;
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
        <span>${ev.type === 'goal' ? ' BUT !' : (ev.type === 'save' ? ' Parade !' : ' Carton')}</span>
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
        autoNotice.textContent = " Fin du match ! Reprise automatique du championnat...";
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
    outcomeTitle.textContent = ` VICTOIRE ÉCLATANTE DE ${myDuelPlayer.name.toUpperCase()} !`;
    outcomeSub.textContent = `Vous terminez devant votre rival au classement final ! La direction adverse est en crise.`;
  } else if (isDraw) {
    outcomeBanner.className = 'p-6 rounded-3xl border-2 border-amber-500 bg-amber-950/40 text-center mb-6 shadow-2xl shadow-amber-500/20';
    outcomeTitle.textContent = ` ÉGALITÉ FRATRICIDE !`;
    outcomeSub.textContent = `Les deux clubs terminent au coude-à-coude avec un total de points identique !`;
  } else {
    outcomeBanner.className = 'p-6 rounded-3xl border-2 border-rose-500 bg-rose-950/40 text-center mb-6 shadow-2xl shadow-rose-500/20';
    outcomeTitle.textContent = ` DÉFAITE FACE À ${simResult.duelWinner.toUpperCase()}...`;
    outcomeSub.textContent = `Votre rival termine devant vous au classement général. Votre mercato a coûté cher !`;
  }

  // Tableau comparatif
  const p1 = simResult.p1Result;
  const p2 = simResult.p2Result;

  const p1DncgBadge = p1.dncg ? `<div class="mt-2"><span class="text-[9px] px-2 py-0.5 rounded ${p1.dncg.badgeClass}">${p1.dncg.badge}</span></div>` : '';
  const p2DncgBadge = p2.dncg ? `<div class="mt-2"><span class="text-[9px] px-2 py-0.5 rounded ${p2.dncg.badgeClass}">${p2.dncg.badge}</span></div>` : '';

  document.getElementById('duel-recap-p1-card').innerHTML = `
    <div class="text-center">
      <span class="text-3xl">${p1.logo || '️'}</span>
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
      <span class="text-3xl">${p2.logo || '️'}</span>
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
        ${renderDebriefIcon(pt.icon)}
        <div>
          <strong class="text-white text-xs block font-bold mb-0.5">${pt.title}</strong>
          <p class="text-gray-300 text-[11px] leading-relaxed">${pt.desc}</p>
        </div>
      </div>
    `).join('');
    if (analysisPointsEl) analysisPointsEl.innerHTML = pointsHtml;
    if (punchlineEl) punchlineEl.innerHTML = `<span class="inline-flex items-center gap-1.5 font-bold text-blue-400"><svg class="w-4 h-4 inline-block" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg> <span>L'avis du consultant :</span></span> ${simResult.analysis.punchline}`;
  }
}

function requestDuelRematchAction() {
  if (!socket) return;
  socket.emit('requestRematch');
  const btn = document.getElementById('duel-rematch-btn');
  if (btn) {
    btn.disabled = true;
    btn.textContent = 'Demande de revanche envoyée... ';
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


window.createDuelRoomAction = createDuelRoomAction;
window.joinDuelRoomAction = joinDuelRoomAction;
window.toggleDuelReadyAction = toggleDuelReadyAction;
window.copyDuelShareLink = copyDuelShareLink;
window.finishDuelMercatoAction = finishDuelMercatoAction;
window.rerollDuelMatchupAction = rerollDuelMatchupAction;
