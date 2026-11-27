/**
 * GAMEDEV - ANANTHAKRISHNAN SB PORTFOLIO ENGINE
 * 60FPS Ambient Voxel Particles, Retro Synthesizer & 3-in-1 Arcade Engine
 */

document.addEventListener('DOMContentLoaded', () => {

  /* ==========================================================================
     1. WEB AUDIO API SYNTHESIZER
     ========================================================================== */
  let soundEnabled = true;
  let audioCtx = null;

  function initAudioContext() {
    if (!audioCtx) {
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      if (AudioContext) {
        audioCtx = new AudioContext();
      }
    }
    if (audioCtx && audioCtx.state === 'suspended') {
      audioCtx.resume();
    }
  }

  function playUiSound(type = 'click') {
    if (!soundEnabled) return;
    initAudioContext();
    if (!audioCtx) return;

    const now = audioCtx.currentTime;
    const osc = audioCtx.createOscillator();
    const gain = audioCtx.createGain();

    osc.connect(gain);
    gain.connect(audioCtx.destination);

    if (type === 'leaf' || type === 'grass') {
      // Gentle lush leaf rustle & forest chime
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(523.25, now);
      osc.frequency.setValueAtTime(659.25, now + 0.07);
      osc.frequency.setValueAtTime(783.99, now + 0.14);
      osc.frequency.setValueAtTime(1046.50, now + 0.21);
      gain.gain.setValueAtTime(0.12, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.38);
      osc.start(now);
      osc.stop(now + 0.38);
    } else if (type === 'click') {
      // Gentle retro block tap
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(420, now);
      osc.frequency.exponentialRampToValueAtTime(160, now + 0.05);
      gain.gain.setValueAtTime(0.08, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.05);
      osc.start(now);
      osc.stop(now + 0.05);
    } else if (type === 'chest') {
      // Sparkling golden chest open chime
      osc.type = 'sine';
      osc.frequency.setValueAtTime(784, now); // G5
      osc.frequency.setValueAtTime(1046.5, now + 0.06); // C6
      osc.frequency.setValueAtTime(1318.5, now + 0.12); // E6
      gain.gain.setValueAtTime(0.12, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.22);
      osc.start(now);
      osc.stop(now + 0.22);
    } else if (type === 'jump') {
      // Arcade jump
      osc.type = 'square';
      osc.frequency.setValueAtTime(180, now);
      osc.frequency.exponentialRampToValueAtTime(480, now + 0.12);
      gain.gain.setValueAtTime(0.08, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.12);
      osc.start(now);
      osc.stop(now + 0.12);
    } else if (type === 'diamond') {
      // 2-tone pickup chime
      osc.type = 'sine';
      osc.frequency.setValueAtTime(987.77, now);
      osc.frequency.setValueAtTime(1318.51, now + 0.06);
      gain.gain.setValueAtTime(0.12, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.18);
      osc.start(now);
      osc.stop(now + 0.18);
    } else if (type === 'hit') {
      // Low crunch
      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(120, now);
      osc.frequency.exponentialRampToValueAtTime(40, now + 0.18);
      gain.gain.setValueAtTime(0.15, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.2);
      osc.start(now);
      osc.stop(now + 0.2);
    } else if (type === 'bounce') {
      // Paddle bounce
      osc.type = 'sine';
      osc.frequency.setValueAtTime(440, now);
      osc.frequency.exponentialRampToValueAtTime(330, now + 0.05);
      gain.gain.setValueAtTime(0.09, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.06);
      osc.start(now);
      osc.stop(now + 0.06);
    } else if (type === 'gameover') {
      // Descending sad arpeggio
      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(320, now);
      osc.frequency.linearRampToValueAtTime(240, now + 0.1);
      osc.frequency.linearRampToValueAtTime(180, now + 0.2);
      osc.frequency.linearRampToValueAtTime(120, now + 0.35);
      gain.gain.setValueAtTime(0.12, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.4);
      osc.start(now);
      osc.stop(now + 0.4);
    } else if (type === 'sakura') {
      // Gentle wind-chime cherry blossom arpeggio
      osc.type = 'sine';
      osc.frequency.setValueAtTime(880, now);
      osc.frequency.setValueAtTime(1174.66, now + 0.08);
      osc.frequency.setValueAtTime(1479.98, now + 0.16);
      osc.frequency.setValueAtTime(1760, now + 0.24);
      gain.gain.setValueAtTime(0.12, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.45);
      osc.start(now);
      osc.stop(now + 0.45);
    } else if (type === 'snow') {
      // Crisp glacial ice bell chime
      osc.type = 'sine';
      osc.frequency.setValueAtTime(1174.66, now); // D6
      osc.frequency.setValueAtTime(1567.98, now + 0.08); // G6
      osc.frequency.setValueAtTime(2093.00, now + 0.16); // C7
      gain.gain.setValueAtTime(0.12, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.42);
      osc.start(now);
      osc.stop(now + 0.42);
    } else if (type === 'nether') {
      // Deep resonant Nether portal warp
      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(130, now);
      osc.frequency.exponentialRampToValueAtTime(280, now + 0.14);
      osc.frequency.exponentialRampToValueAtTime(95, now + 0.38);
      gain.gain.setValueAtTime(0.14, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.45);
      osc.start(now);
      osc.stop(now + 0.45);
    } else if (type === 'coin') {
      // Classic 8-bit arcade coin insert chime
      osc.type = 'sine';
      osc.frequency.setValueAtTime(987.77, now);
      osc.frequency.setValueAtTime(1318.51, now + 0.08);
      gain.gain.setValueAtTime(0.15, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.35);
      osc.start(now);
      osc.stop(now + 0.35);
    }
  }

  // Audio Toggle
  const soundToggle = document.getElementById('soundToggle');
  if (soundToggle) {
    const soundOnIcon = soundToggle.querySelector('.sound-icon-on');
    const soundOffIcon = soundToggle.querySelector('.sound-icon-off');

    soundToggle.addEventListener('click', () => {
      soundEnabled = !soundEnabled;
      if (soundOnIcon) soundOnIcon.classList.toggle('hidden', !soundEnabled);
      if (soundOffIcon) soundOffIcon.classList.toggle('hidden', soundEnabled);
      if (soundEnabled) {
        playUiSound('click');
        showToast('Sound Effects: Enabled ??');
      } else {
        showToast('Sound Effects: Muted ??');
      }
    });
  }

  /* ==========================================================================
     2. TOAST SYSTEM
     ========================================================================== */
  const pixelToast = document.getElementById('pixelToast');
  const toastMessage = document.getElementById('toastMessage');
  let toastTimer = null;

  function showToast(msg) {
    if (!pixelToast || !toastMessage) return;
    if (toastTimer) clearTimeout(toastTimer);
    toastMessage.textContent = msg;
    pixelToast.classList.add('show');
    toastTimer = setTimeout(() => {
      pixelToast.classList.remove('show');
    }, 2800);
  }


  /* ==========================================================================
     3. MULTI-BIOME AMBIENT PARTICLE ENGINE (60FPS)
     Sakura Petals ?? · Floating Voxels ?? · Snowflakes ?? · Rising Embers ??
     ========================================================================== */
  const ambientCanvas = document.getElementById('ambient-pixel-canvas');
  if (ambientCanvas) {
    const ctx = ambientCanvas.getContext('2d');
    let width = ambientCanvas.width = window.innerWidth;
    let height = ambientCanvas.height = window.innerHeight;

    window.addEventListener('resize', () => {
      width = ambientCanvas.width = window.innerWidth;
      height = ambientCanvas.height = window.innerHeight;
    });

    const particles = [];
    const particleCount = 42;
    const sakuraColors = ['#ffb7c5', '#f472b6', '#fda4af', '#fce7f3', '#ec4899', '#fbcfe8'];
    const plainsColors = ['#a5b4fc', '#818cf8', '#38bdf8', '#94a3b8', '#c7d2fe'];
    const snowColors = ['#ffffff', '#f0f9ff', '#e0f2fe', '#bae6fd', '#7dd3fc'];
    const netherColors = ['#ef4444', '#f97316', '#fbbf24', '#dc2626', '#facc15'];

    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        w: 4 + Math.random() * 5,
        h: 4 + Math.random() * 4,
        speedY: 0.35 + Math.random() * 0.7,
        swaySpeed: 0.012 + Math.random() * 0.02,
        swayAmp: 0.8 + Math.random() * 1.6,
        swayOffset: Math.random() * Math.PI * 2,
        opacity: 0.35 + Math.random() * 0.5,
        sakuraColor: sakuraColors[Math.floor(Math.random() * sakuraColors.length)],
        plainsColor: plainsColors[Math.floor(Math.random() * plainsColors.length)],
        snowColor: snowColors[Math.floor(Math.random() * snowColors.length)],
        netherColor: netherColors[Math.floor(Math.random() * netherColors.length)],
        moodIdx: i
      });
    }

    let activeMoodColors = null;
    window.__setCoverFlowMoodPalette = (palette) => {
      activeMoodColors = Array.isArray(palette) && palette.length ? palette : null;
    };

    let frame = 0;
    let ambientRafId = null;
    function renderAmbientParticles() {
      if (document.hidden) {
        ambientRafId = null;
        return;
      }
      ctx.clearRect(0, 0, width, height);
      frame++;

      const isSakura = document.body.classList.contains('theme-sakura');
      const isSnow = document.body.classList.contains('theme-snow');
      const isNether = document.body.classList.contains('theme-nether');

      particles.forEach(p => {
        if (isSakura) {
          // Drifting, fluttering Sakura Petals
          p.y += p.speedY;
          p.x += Math.sin(frame * p.swaySpeed + p.swayOffset) * p.swayAmp + 0.3;
          if (p.y > height + 20) { p.y = -20; p.x = Math.random() * width; }
          if (p.x > width + 20) p.x = -20;
          if (p.x < -20) p.x = width + 20;

          ctx.save();
          ctx.globalAlpha = p.opacity;
          ctx.fillStyle = p.sakuraColor;
          const px = Math.floor(p.x);
          const py = Math.floor(p.y);
          ctx.fillRect(px, py, p.w, p.h);
          ctx.fillStyle = '#ffffff';
          ctx.globalAlpha = p.opacity * 0.45;
          ctx.fillRect(px + 1, py + 1, Math.max(1, p.w - 2), Math.max(1, p.h - 2));
          ctx.restore();
        } else if (isSnow) {
          // Falling Snowflakes
          p.y += p.speedY * 0.85;
          p.x += Math.sin(frame * p.swaySpeed + p.swayOffset) * 0.6;
          if (p.y > height + 20) { p.y = -20; p.x = Math.random() * width; }
          if (p.x > width + 20) p.x = -20;
          if (p.x < -20) p.x = width + 20;

          ctx.save();
          ctx.globalAlpha = p.opacity * 0.85;
          ctx.fillStyle = p.snowColor;
          const px = Math.floor(p.x);
          const py = Math.floor(p.y);
          const size = Math.max(2, Math.floor(p.w * 0.75));
          ctx.fillRect(px, py, size, size);
          ctx.restore();
        } else if (isNether) {
          // Rising Fiery Embers
          p.y -= p.speedY * 1.1;
          p.x += Math.sin(frame * (p.swaySpeed * 1.5) + p.swayOffset) * 0.9;
          if (p.y < -20) { p.y = height + 20; p.x = Math.random() * width; }
          if (p.x > width + 20) p.x = -20;
          if (p.x < -20) p.x = width + 20;

          ctx.save();
          ctx.globalAlpha = p.opacity;
          ctx.fillStyle = p.netherColor;
          const px = Math.floor(p.x);
          const py = Math.floor(p.y);
          const size = Math.max(2, Math.floor(p.w * 0.7));
          ctx.fillRect(px, py, size, size);
          ctx.restore();
        } else {
          // Classic Overworld Plains - Floating Voxels
          p.y -= p.speedY * 0.45;
          p.x += Math.sin(frame * p.swaySpeed + p.swayOffset) * 0.25;
          if (p.y < -20) { p.y = height + 20; p.x = Math.random() * width; }
          if (p.x > width + 20) p.x = -20;
          if (p.x < -20) p.x = width + 20;

          ctx.save();
          ctx.globalAlpha = p.opacity;
          ctx.fillStyle = activeMoodColors
            ? activeMoodColors[p.moodIdx % activeMoodColors.length]
            : p.plainsColor;
          ctx.fillRect(Math.floor(p.x), Math.floor(p.y), p.w, p.w);
          ctx.restore();
        }
      });

      ambientRafId = requestAnimationFrame(renderAmbientParticles);
    }

    document.addEventListener('visibilitychange', () => {
      if (!document.hidden && !ambientRafId) {
        ambientRafId = requestAnimationFrame(renderAmbientParticles);
      }
    });

    renderAmbientParticles();
  }


  /* ==========================================================================
     4. NUMBER COUNTER ANIMATION
     ========================================================================== */
  const counters = document.querySelectorAll('.counter');
  let counted = false;

  function runCounters() {
    if (counted) return;
    counted = true;

    counters.forEach(counter => {
      const target = +counter.getAttribute('data-count');
      const duration = 1200;
      const startTime = performance.now();

      function updateCounter(currentTime) {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        const easeOut = 1 - Math.pow(1 - progress, 3);
        const currentVal = Math.floor(easeOut * target);

        counter.textContent = currentVal;

        if (progress < 1) {
          requestAnimationFrame(updateCounter);
        } else {
          counter.textContent = target;
        }
      }

      requestAnimationFrame(updateCounter);
    });
  }

  // Trigger counters
  setTimeout(runCounters, 400);


  /* ==========================================================================
     5. CHEST WITH LANTERN INTERACTION (GET IN TOUCH)
     ========================================================================== */
  const chestContainer = document.getElementById('chestContainer');
  const chestSparks = document.getElementById('chestSparks');

  if (chestContainer) {
    chestContainer.addEventListener('click', () => {
      const isSakura = document.body.classList.contains('theme-sakura');
      const isSnow = document.body.classList.contains('theme-snow');
      const isNether = document.body.classList.contains('theme-nether');

      if (isSnow) {
        playUiSound('snow');
        showToast('?? Frozen Spruce & Soul Lantern: Crystalline Frost Mist ?');
      } else if (isNether) {
        playUiSound('nether');
        showToast('?? Nether Portal & Shroomlight: Ancient Debris Found! ?');
      } else {
        playUiSound('chest');
        showToast('?? Opened Minecraft Chest! Diamonds & Gold found! ?');
      }

      if (chestSparks) {
        const rect = chestContainer.getBoundingClientRect();
        const originX = rect.width * 0.5;
        const originY = rect.height * 0.45;

        let colors = ['#ffffff', '#f4f4f5', '#e4e4e7', '#d4d4d8', '#ffffff'];
        if (isSakura) {
          colors = ['#f472b6', '#ec4899', '#fda4af', '#fce7f3', '#2fd8c7', '#ffffff'];
        } else if (isSnow) {
          colors = ['#38bdf8', '#0284c7', '#e0f2fe', '#ffffff', '#7dd3fc'];
        } else if (isNether) {
          colors = ['#ef4444', '#f97316', '#fbbf24', '#dc2626', '#b91c1c'];
        }

        for (let i = 0; i < 14; i++) {
          const spark = document.createElement('div');
          spark.style.position = 'absolute';
          spark.style.left = `${originX}px`;
          spark.style.top = `${originY}px`;
          spark.style.width = '6px';
          spark.style.height = '6px';
          spark.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
          spark.style.boxShadow = `0 0 8px ${spark.style.backgroundColor}`;
          spark.style.pointerEvents = 'none';
          spark.style.transition = 'all 0.6s ease-out';

          const angle = Math.PI * 2 * Math.random();
          const dist = 30 + Math.random() * 50;
          const tx = Math.cos(angle) * dist;
          const ty = Math.sin(angle) * dist - 20;

          chestSparks.appendChild(spark);

          requestAnimationFrame(() => {
            spark.style.transform = `translate(${tx}px, ${ty}px) scale(0)`;
            spark.style.opacity = '0';
          });

          setTimeout(() => spark.remove(), 650);
        }
      }
    });
  }

  // Diamond Axe Brand Button
  const axeBrandBtn = document.getElementById('axeBrandBtn');
  if (axeBrandBtn) {
    axeBrandBtn.addEventListener('click', () => {
      playUiSound('diamond');
      const arcadeSec = document.getElementById('arcade-console');
      if (arcadeSec) {
        arcadeSec.scrollIntoView({ behavior: 'smooth', block: 'center' });
        showToast('?? Diamond Axe activated! Launching Arcade Screen ??');
      }
    });
  }


  /* ==========================================================================
     6. PROJECT PLAY BUTTONS -> SCROLL TO ARCADE
     ========================================================================== */
  const playButtons = document.querySelectorAll('.project-play-circle, #btnViewAllProjects, #btnHeroProjects');
  const arcadeConsoleSec = document.getElementById('arcade-console');

  playButtons.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      playUiSound('click');

      if (arcadeConsoleSec) {
        arcadeConsoleSec.scrollIntoView({ behavior: 'smooth', block: 'center' });
        showToast('?? Launching Game on Arcade Console Screen!');

        setTimeout(() => {
          if (!gameEngine.isPlaying) {
            gameEngine.startCurrentGame();
          }
        }, 600);
      }
    });
  });


  /* ==========================================================================
     6B. FEATURED GAMES VIDEO CONTROLLERS & FILTER TABS (HAIRPIN DRIFT & BALLPASS3D)
     ========================================================================== */
  function initGameVideoController(config) {
    const video = document.getElementById(config.videoId);
    const viewport = document.getElementById(config.viewportId);
    const playPauseBtn = document.getElementById(config.playPauseBtnId);
    const playPauseIcon = document.getElementById(config.playPauseIconId);
    const playPauseText = document.getElementById(config.playPauseTextId);
    const audioBtn = document.getElementById(config.audioBtnId);
    const audioIcon = document.getElementById(config.audioIconId);
    const audioText = document.getElementById(config.audioTextId);
    const quickAudioBtn = document.getElementById(config.quickAudioBtnId);
    const quickAudioIcon = document.getElementById(config.quickAudioIconId);
    const quickAudioText = document.getElementById(config.quickAudioTextId);
    const progressWrap = document.getElementById(config.progressWrapId);
    const progressFill = document.getElementById(config.progressFillId);
    const fullscreenBtn = document.getElementById(config.fullscreenBtnId);
    const playLink = document.getElementById(config.playLinkId);

    if (!video) return;

    let userPaused = false;

    // Lazy-play video only when scrolled into view so initial page load avoids 30+ MB eager download
    if ('IntersectionObserver' in window) {
      const videoObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            if (!userPaused && video.paused) {
              if (video.preload === 'none') video.preload = 'metadata';
              video.play().catch(() => {});
            }
          } else if (!video.paused) {
            video.pause();
          }
        });
      }, { rootMargin: '200px 250px', threshold: 0.1 });
      videoObserver.observe(video);
    }

    // 1. Play / Pause Toggle
    function togglePlay() {
      playUiSound('click');
      if (video.paused || video.ended) {
        userPaused = false;
        video.play().then(() => {
          if (playPauseIcon) playPauseIcon.textContent = '?';
          if (playPauseText) playPauseText.textContent = 'Pause';
          showToast(`?? Playing ${config.title} Gameplay Video`);
        }).catch(() => {});
      } else {
        userPaused = true;
        video.pause();
        if (playPauseIcon) playPauseIcon.textContent = '?';
        if (playPauseText) playPauseText.textContent = 'Play';
        showToast(`? ${config.title} Video Paused`);
      }
    }

    if (playPauseBtn) {
      playPauseBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        togglePlay();
      });
    }

    if (viewport) {
      viewport.addEventListener('click', togglePlay);
    }

    // 2. Audio Toggle (Mute / Unmute)
    function toggleAudio() {
      playUiSound('click');
      video.muted = !video.muted;
      const isMuted = video.muted;

      if (audioIcon) audioIcon.textContent = isMuted ? '??' : '??';
      if (audioText) audioText.textContent = isMuted ? 'Unmute' : 'Mute';

      if (quickAudioIcon) quickAudioIcon.textContent = isMuted ? '??' : '??';
      if (quickAudioText) quickAudioText.textContent = isMuted ? 'Sound: Off' : 'Sound: Playing';

      showToast(isMuted ? `?? ${config.title} Audio Muted` : `?? ${config.title} Audio Unmuted!`);
    }

    if (audioBtn) {
      audioBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        toggleAudio();
      });
    }

    if (quickAudioBtn) {
      quickAudioBtn.addEventListener('click', toggleAudio);
    }

    // 3. Progress Bar Fill
    video.addEventListener('timeupdate', () => {
      if (video.duration && progressFill) {
        const percent = (video.currentTime / video.duration) * 100;
        progressFill.style.width = percent + '%';
      }
    });

    // 4. Click progress bar to seek
    if (progressWrap) {
      progressWrap.addEventListener('click', (e) => {
        e.stopPropagation();
        if (!video.duration) return;
        const rect = progressWrap.getBoundingClientRect();
        const clickPos = (e.clientX - rect.left) / rect.width;
        video.currentTime = clickPos * video.duration;
        playUiSound('click');
      });
    }

    // 5. Fullscreen
    if (fullscreenBtn) {
      fullscreenBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        playUiSound('click');
        if (video.requestFullscreen) {
          video.requestFullscreen();
        } else if (video.webkitRequestFullscreen) {
          video.webkitRequestFullscreen();
        } else if (video.msRequestFullscreen) {
          video.msRequestFullscreen();
        }
      });
    }

    // 6. Play Game External Button Toast
    if (playLink) {
      playLink.addEventListener('click', () => {
        playUiSound('diamond');
        showToast(`?? Launching ${config.title} on Crayon AI!`);
      });
    }
  }

  // Initialize Video Controller for Hairpin Drift
  initGameVideoController({
    title: 'Hairpin Drift',
    videoId: 'hairpinDriftVideo',
    viewportId: 'hairpinVideoViewport',
    playPauseBtnId: 'hairpinPlayPauseBtn',
    playPauseIconId: 'hairpinPlayPauseIcon',
    playPauseTextId: 'hairpinPlayPauseText',
    audioBtnId: 'hairpinAudioBtn',
    audioIconId: 'hairpinAudioIcon',
    audioTextId: 'hairpinAudioText',
    quickAudioBtnId: 'hairpinAudioQuickToggle',
    quickAudioIconId: 'hairpinAudioQuickIcon',
    quickAudioTextId: 'hairpinAudioQuickText',
    progressWrapId: 'hairpinProgressWrap',
    progressFillId: 'hairpinProgressFill',
    fullscreenBtnId: 'hairpinFullscreenBtn',
    playLinkId: 'btnPlayHairpin'
  });

  // Initialize Video Controller for BallPass3D
  initGameVideoController({
    title: 'BallPass3D',
    videoId: 'ballPassVideo',
    viewportId: 'ballPassVideoViewport',
    playPauseBtnId: 'ballPassPlayPauseBtn',
    playPauseIconId: 'ballPassPlayPauseIcon',
    playPauseTextId: 'ballPassPlayPauseText',
    audioBtnId: 'ballPassAudioBtn',
    audioIconId: 'ballPassAudioIcon',
    audioTextId: 'ballPassAudioText',
    quickAudioBtnId: 'ballPassAudioQuickToggle',
    quickAudioIconId: 'ballPassAudioQuickIcon',
    quickAudioTextId: 'ballPassAudioQuickText',
    progressWrapId: 'ballPassProgressWrap',
    progressFillId: 'ballPassProgressFill',
    fullscreenBtnId: 'ballPassFullscreenBtn',
    playLinkId: 'btnPlayBallPass'
  });

    /* ==========================================================================
     PROJECTS FILTER TABS (MODERN AAA STUDIO STACK)
     ========================================================================== */
  const projectCards = Array.from(document.querySelectorAll('.project-item-card'));
  const projectFilterTabs = document.querySelectorAll('.project-tab-pill');

  projectFilterTabs.forEach(tab => {
    tab.addEventListener('click', () => {
      playUiSound('click');
      const filter = tab.getAttribute('data-filter') || 'all';

      projectFilterTabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');

      projectCards.forEach(card => {
        const game = card.getAttribute('data-game');
        const status = card.getAttribute('data-status');

        let isMatch = false;
        if (filter === 'all') {
          isMatch = true;
        } else if (filter === 'webgl' || filter === 'playable') {
          isMatch = (game === 'hairpin' || game === 'ballpass');
        } else if (filter === 'ongoing') {
          isMatch = (status === 'ongoing' || game === 'swordsaint' || game === 'maze');
        } else if (filter === 'jam') {
          isMatch = (game === 'reverie');
        } else if (filter === 'released') {
          isMatch = (status === 'released');
        } else if (filter === game) {
          isMatch = true;
        }

        card.classList.toggle('hidden', !isMatch);
      });

      if (filter === 'all') showToast('🎮 Showing All 5 Portfolio Projects');
      else if (filter === 'released') showToast('🏆 Showing 3 Released Games');
      else if (filter === 'webgl') showToast('🌐 Showing Playable WebGL Simulators');
      else if (filter === 'ongoing') showToast('🛠️ Showing 2 Projects in Active Development');
      else if (filter === 'jam') showToast('🏆 Showing BYOG 2026 Finalist: The Summer Reverie');
      else showToast('🎮 Filtering Projects');
    });
  });

// 8. Lightbox Modal & Concept Artwork Previewer
  const imageModal = document.getElementById('imageModal');
  const modalImage = document.getElementById('modalImage');
  const modalCloseBtn = document.getElementById('modalCloseBtn');
  const modalBackdrop = document.getElementById('modalBackdrop');

  function openImageModal(imgSrc, title) {
    if (!imageModal || !modalImage) return;
    modalImage.src = imgSrc;
    const modalTitle = document.getElementById('modalTitle');
    if (modalTitle && title) modalTitle.textContent = title;
    imageModal.classList.remove('hidden');
    playUiSound('click');
    showToast('??? Opening Full Artwork Preview');
  }

  function closeImageModal() {
    if (!imageModal) return;
    imageModal.classList.add('hidden');
    playUiSound('click');
  }

  // Handle any elements with data-preview-img or screenshot-thumb-btn
  const previewTargets = document.querySelectorAll('[data-preview-img], .screenshot-thumb-btn');
  previewTargets.forEach(el => {
    el.addEventListener('click', (e) => {
      e.stopPropagation();
      const src = el.getAttribute('data-preview-img') || el.getAttribute('data-img');
      const title = el.getAttribute('data-preview-title') || el.getAttribute('title') || 'Project Artwork Preview';
      if (src) openImageModal(src, title);
    });
  });

  if (modalCloseBtn) modalCloseBtn.addEventListener('click', closeImageModal);
  if (modalBackdrop) modalBackdrop.addEventListener('click', closeImageModal);

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && imageModal && !imageModal.classList.contains('hidden')) {
      closeImageModal();
    }
  });

  // Action Button Toasts for The Summer Reverie
  const btnViewReverie = document.getElementById('btnViewReverieSubmission');
  if (btnViewReverie) {
    btnViewReverie.addEventListener('click', () => {
      playUiSound('diamond');
      showToast('?? Opening The Summer Reverie on IndieConnect!');
    });
  }

  const btnDownloadReverie = document.getElementById('btnDownloadReverieBuild');
  if (btnDownloadReverie) {
    btnDownloadReverie.addEventListener('click', () => {
      playUiSound('diamond');
      showToast('?? Starting Windows Build Download for The Summer Reverie!');
    });
  }

  // Hero Stats Shelf Direct Link Navigation
  const statReleased = document.getElementById('statCellReleased');
  if (statReleased) {
    statReleased.addEventListener('click', (e) => {
      e.preventDefault();
      playUiSound('click');
      const targetTab = document.querySelector('.project-tab-pill[data-filter="released"]');
      if (targetTab) targetTab.click();
      const projSec = document.getElementById('projects');
      if (projSec) projSec.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
  }

  const statOngoing = document.getElementById('statCellOngoing');
  if (statOngoing) {
    statOngoing.addEventListener('click', (e) => {
      e.preventDefault();
      playUiSound('click');
      const targetTab = document.querySelector('.project-tab-pill[data-filter="ongoing"]');
      if (targetTab) targetTab.click();
      const ongoingSec = document.getElementById('ongoing-projects');
      if (ongoingSec) ongoingSec.scrollIntoView({ behavior: 'smooth', block: 'center' });
    });
  }
  if (btnDownloadReverie) {
    btnDownloadReverie.addEventListener('click', () => {
      playUiSound('diamond');
      showToast('?? Starting Windows Build Download for The Summer Reverie!');
    });
  }


  /* ==========================================================================
     7. NAVIGATION SMOOTH SCROLL, ACTIVE SPY & CYBER MOBILE DRAWER
     ========================================================================== */
  const navLinks = document.querySelectorAll('.aaa-nav-link, .mobile-nav-item, .nav-btn, .mobile-cta-link, #axeBrandBtn, .nav-cta-btn, #btnHeroProjects, #btnHeroArcade, #btnHeroAbout, #cfDockArcade, #cfDockAbout, #cfDockContact');
  const mobileNavDrawer = document.getElementById('mobileNavDrawer');
  const mobileMenuBtn = document.getElementById('mobileMenuBtn');
  const mobileNavCloseBtn = document.getElementById('mobileNavCloseBtn');
  const mobileNavBackdrop = document.getElementById('mobileNavBackdrop');

  function scrollToTrackElement(targetEl, align = 'start') {
    const track = document.getElementById('horizontalTrack');
    if (!targetEl) return;
    if (!track) {
      targetEl.scrollIntoView({ behavior: 'smooth', block: align === 'center' ? 'center' : 'start' });
      return;
    }
    if (targetEl.id === 'home') {
      track.scrollTo({ left: 0, behavior: 'smooth' });
      return;
    }
    const trackRect = track.getBoundingClientRect();
    const elRect = targetEl.getBoundingClientRect();
    let nextLeft = track.scrollLeft + (elRect.left - trackRect.left);
    if (align === 'center') {
      nextLeft -= Math.max(0, (trackRect.width - elRect.width) / 2);
    } else {
      nextLeft -= 16;
    }
    track.scrollTo({
      left: Math.max(0, Math.min(nextLeft, track.scrollWidth - track.clientWidth)),
      behavior: 'smooth'
    });
  }

  function openMobileNav() {
    if (!mobileNavDrawer) return;
    playUiSound('click');
    mobileNavDrawer.classList.add('open');
    mobileNavDrawer.setAttribute('aria-hidden', 'false');
    if (mobileMenuBtn) mobileMenuBtn.classList.add('active');
    document.body.classList.add('mobile-nav-locked');
  }

  function closeMobileNav() {
    if (!mobileNavDrawer) return;
    mobileNavDrawer.classList.remove('open');
    mobileNavDrawer.setAttribute('aria-hidden', 'true');
    if (mobileMenuBtn) mobileMenuBtn.classList.remove('active');
    document.body.classList.remove('mobile-nav-locked');
  }

  if (mobileMenuBtn) {
    mobileMenuBtn.addEventListener('click', () => {
      if (mobileNavDrawer && mobileNavDrawer.classList.contains('open')) {
        closeMobileNav();
      } else {
        openMobileNav();
      }
    });
  }

  if (mobileNavCloseBtn) {
    mobileNavCloseBtn.addEventListener('click', closeMobileNav);
  }

  if (mobileNavBackdrop) {
    mobileNavBackdrop.addEventListener('click', closeMobileNav);
  }

  navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      const targetHref = link.getAttribute('href');
      if (targetHref && targetHref.startsWith('#')) {
        const targetId = targetHref.substring(1);
        const targetSec = document.getElementById(targetId);
        if (targetSec) {
          e.preventDefault();
          playUiSound('click');
          closeMobileNav();
          document.querySelectorAll('.aaa-nav-link, .mobile-nav-item').forEach(l => {
            l.classList.toggle('active', l.getAttribute('href') === '#' + targetId);
          });
          scrollToTrackElement(targetSec, 'start');
        }
      }
    });
  });

  const backToTopBtn = document.getElementById('backToTopBtn');
  if (backToTopBtn) {
    backToTopBtn.addEventListener('click', () => {
      playUiSound('click');
      const homeEl = document.getElementById('home');
      if (homeEl) scrollToTrackElement(homeEl, 'start');
    });
  }

/* ==========================================================================
     8. 3-IN-1 PLAYABLE ARCADE ENGINE
     ========================================================================== */
  const canvasGame = document.getElementById('consoleGameCanvas');
  const hudGameTitle = document.getElementById('hudGameTitle');
  const consoleScore = document.getElementById('consoleScore');
  const consoleHighScore = document.getElementById('consoleHighScore');
  const screenOverlay = document.getElementById('screenOverlay');
  const overlayTitle = document.getElementById('overlayTitle');
  const overlayMsg = document.getElementById('overlayMsg');
  const overlayBtn = document.getElementById('overlayBtn');
  const btnRestartGame = document.getElementById('btnRestartGame');
  const btnPauseGame = document.getElementById('btnPauseGame');
  const gameTabs = document.querySelectorAll('.game-tab-btn, .pixel-tab-btn');

  // Controller wing buttons
  const btnDpadUp = document.getElementById('btnDpadUp');
  const btnDpadDown = document.getElementById('btnDpadDown');
  const btnDpadLeft = document.getElementById('btnDpadLeft');
  const btnDpadRight = document.getElementById('btnDpadRight');
  const btnActionA = document.getElementById('btnActionA');
  const btnActionB = document.getElementById('btnActionB');
  const btnActionX = document.getElementById('btnActionX');
  const btnActionY = document.getElementById('btnActionY');
  const btnConsoleStart = document.getElementById('btnConsoleStart');
  const btnConsoleSelect = document.getElementById('btnConsoleSelect');

  const highScores = { runner: 0, breakout: 0, sword: 0 };

  const gameEngine = {
    canvas: canvasGame,
    activeGame: 'runner',
    isPlaying: false,
    isPaused: false,
    score: 0,
    animationFrameId: null,
    ctx: canvasGame ? canvasGame.getContext('2d') : null,
    width: 800,
    height: 400,

    init() {
      if (!canvasGame || !this.ctx) return;
      this.width = canvasGame.width;
      this.height = canvasGame.height;

      gameTabs.forEach(tab => {
        tab.addEventListener('click', () => {
          const game = tab.getAttribute('data-game');
          this.switchGame(game);
        });
      });

      if (btnRestartGame) {
        btnRestartGame.addEventListener('click', () => {
          playUiSound('click');
          this.startCurrentGame();
        });
      }

      if (btnPauseGame) {
        btnPauseGame.addEventListener('click', () => this.togglePause());
      }

      const btnSideQuestPrompt = document.getElementById('btnSideQuestPrompt');
      if (btnSideQuestPrompt) {
        btnSideQuestPrompt.addEventListener('click', () => {
          playUiSound('click');
          if (this.activeGame !== 'sword') {
            this.switchGame('sword');
          }
          stickmanSwordSaint.openQuestBoard();
        });
      }

      const btnPlaySideQuest = document.getElementById('btnPlaySideQuest');
      if (btnPlaySideQuest) {
        btnPlaySideQuest.addEventListener('click', () => {
          playUiSound('click');
          const arcadeSec = document.getElementById('arcade-console');
          if (arcadeSec) {
            scrollToTrackElement(arcadeSec, 'start');
          }
          if (this.activeGame !== 'sword') {
            this.switchGame('sword');
          }
          stickmanSwordSaint.openQuestBoard();
        });
      }

      const btnPlayStickSaw = document.getElementById('btnPlayStickSaw');
      if (btnPlayStickSaw) {
        btnPlayStickSaw.addEventListener('click', (e) => {
          e.preventDefault();
          playUiSound('diamond');
          const arcadeSec = document.getElementById('arcade-console');
          if (arcadeSec) scrollToTrackElement(arcadeSec, 'start');
          if (this.activeGame !== 'sword') {
            this.switchGame('sword');
          }
        });
      }

      if (overlayBtn) {
        overlayBtn.addEventListener('click', () => {
          playUiSound('click');
          this.startCurrentGame();
        });
      }

      window.addEventListener('keydown', (e) => this.handleKeyDown(e));
      window.addEventListener('keyup', (e) => this.handleKeyUp(e));

      this.bindControls();
      this.showStartScreen();
    },

    switchGame(gameName) {
      if (!['runner', 'breakout', 'sword'].includes(gameName)) return;
      playUiSound('click');
      this.activeGame = gameName;
      this.isPlaying = false;
      this.isPaused = false;
      this.score = 0;
      this.updateHudScore(0);
      if (consoleHighScore) consoleHighScore.textContent = highScores[gameName];

      gameTabs.forEach(t => {
        t.classList.toggle('active', t.getAttribute('data-game') === gameName);
      });

      const titles = { runner: 'BLOCK RUNNER', breakout: 'VOXEL BREAKOUT', sword: 'StickSaw' };
      if (hudGameTitle) hudGameTitle.textContent = titles[gameName];

      if (gameName === 'sword') {
        this.startCurrentGame();
        return;
      }

      this.showStartScreen();
    },

    showStartScreen() {
      if (!screenOverlay) return;
      screenOverlay.classList.remove('hidden');

      if (this.activeGame === 'runner') {
        overlayTitle.textContent = 'BLOCK RUNNER';
        overlayMsg.textContent = 'Jump over creepers, dodge TNT, and collect shiny diamonds!';
      } else if (this.activeGame === 'breakout') {
        overlayTitle.textContent = 'VOXEL BREAKOUT';
        overlayMsg.textContent = 'Smash gemstone blocks with your glowing Ender Pearl!';
      } else if (this.activeGame === 'sword') {
        overlayTitle.textContent = 'StickSaw';
        overlayMsg.textContent = 'High-octane stickman action with lethal combos and streak finishers!';
      }

      this.drawThumbnail();
    },

    startCurrentGame() {
      if (screenOverlay) screenOverlay.classList.add('hidden');
      this.isPlaying = true;
      this.isPaused = false;
      this.score = 0;
      this.lastLoopTime = 0;
      this.updateHudScore(0);

      if (this.animationFrameId) cancelAnimationFrame(this.animationFrameId);

      if (this.activeGame === 'runner') blockRunner.init(this);
      else if (this.activeGame === 'breakout') voxelBreakout.init(this);
      else if (this.activeGame === 'sword') stickmanSwordSaint.init(this);

      this.loop();
    },

    togglePause() {
      if (!this.isPlaying) return;
      this.isPaused = !this.isPaused;
      playUiSound('click');

      if (this.isPaused) {
        if (screenOverlay) {
          overlayTitle.textContent = 'GAME PAUSED';
          overlayMsg.textContent = 'Press Resume to continue!';
          screenOverlay.classList.remove('hidden');
        }
      } else {
        if (screenOverlay) screenOverlay.classList.add('hidden');
        this.loop();
      }
    },

    gameOver(finalScore) {
      this.isPlaying = false;
      playUiSound('gameover');

      if (finalScore > highScores[this.activeGame]) {
        highScores[this.activeGame] = finalScore;
        if (consoleHighScore) consoleHighScore.textContent = finalScore;
        showToast(`?? New High Score: ${finalScore}!`);
      }

      if (screenOverlay) {
        overlayTitle.textContent = 'GAME OVER';
        overlayMsg.textContent = `Score: ${finalScore}. Play again!`;
        screenOverlay.classList.remove('hidden');
      }
    },

    updateHudScore(val) {
      this.score = val;
      if (consoleScore) consoleScore.textContent = val;
    },

    lastLoopTime: 0,

    loop(currentTime) {
      if (!this.isPlaying || this.isPaused) return;

      this.animationFrameId = requestAnimationFrame((t) => this.loop(t));

      const now = currentTime || performance.now();
      if (!this.lastLoopTime) this.lastLoopTime = now;
      const elapsed = now - this.lastLoopTime;
      const fpsInterval = 1000 / 60; // Locked 60 FPS cadence across all 60Hz/120Hz/144Hz displays

      if (elapsed < fpsInterval - 1) return; // Discard extra frames on high refresh rate displays

      this.lastLoopTime = now - (elapsed % fpsInterval);

      this.ctx.clearRect(0, 0, this.width, this.height);

      if (this.activeGame === 'runner') blockRunner.updateAndDraw(this);
      else if (this.activeGame === 'breakout') voxelBreakout.updateAndDraw(this);
      else if (this.activeGame === 'sword') stickmanSwordSaint.updateAndDraw(this);
    },

    drawThumbnail() {
      if (!this.ctx) return;
      if (this.activeGame === 'sword') {
        stickmanSwordSaint.drawGangBackground(this.ctx, 0, 0);
        this.ctx.fillStyle = 'rgba(11, 15, 25, 0.75)';
        this.ctx.fillRect(0, 0, this.width, this.height);
        return;
      }
      this.ctx.fillStyle = '#0f172a';
      this.ctx.fillRect(0, 0, this.width, this.height);

      this.ctx.strokeStyle = 'rgba(124, 58, 237, 0.2)';
      this.ctx.lineWidth = 1;
      for (let x = 0; x < this.width; x += 32) {
        this.ctx.beginPath();
        this.ctx.moveTo(x, 0);
        this.ctx.lineTo(x, this.height);
        this.ctx.stroke();
      }
    },

    handleKeyDown(e) {
      if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') return;

      // Do not hijack arrow keys when the Cover Flow Shelf is active and Arcade is idle off-screen
      const arcadeSection = document.getElementById('arcade-console');
      const rect = arcadeSection ? arcadeSection.getBoundingClientRect() : null;
      const arcadeInView = rect && rect.left < window.innerWidth * 0.72 && rect.right > window.innerWidth * 0.28;
      if (!this.isPlaying && !arcadeInView && document.activeElement !== this.canvas) return;

      if (this.activeGame === 'sword') {
        stickmanSwordSaint.handleKeyDown(e);
        if (['Space', 'ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'KeyW', 'KeyS', 'KeyA', 'KeyD', 'KeyJ', 'KeyK', 'KeyL', 'KeyE', 'KeyG', 'Enter', 'NumpadEnter'].includes(e.code)) {
          e.preventDefault();
        }
        return;
      }

      if (e.code === 'Space' || e.key === ' ') {
        e.preventDefault();
        this.pressA();
      } else if (e.code === 'ArrowUp' || e.key === 'w' || e.key === 'W') {
        e.preventDefault();
        if (this.activeGame === 'runner') blockRunner.jump();
      } else if (e.code === 'ArrowDown' || e.key === 's' || e.key === 'S') {
        e.preventDefault();
        if (this.activeGame === 'runner') blockRunner.duck(true);
      } else if (e.code === 'ArrowLeft' || e.key === 'a' || e.key === 'A') {
        e.preventDefault();
        if (this.activeGame === 'breakout') voxelBreakout.moveLeft(true);
      } else if (e.code === 'ArrowRight' || e.key === 'd' || e.key === 'D') {
        e.preventDefault();
        if (this.activeGame === 'breakout') voxelBreakout.moveRight(true);
      } else if (e.key === 'p' || e.key === 'P') {
        this.togglePause();
      }
    },

    handleKeyUp(e) {
      if (this.activeGame === 'sword') {
        stickmanSwordSaint.handleKeyUp(e);
        return;
      }
      if (e.code === 'ArrowLeft' || e.key === 'a' || e.key === 'A') {
        if (this.activeGame === 'breakout') voxelBreakout.moveLeft(false);
      } else if (e.code === 'ArrowRight' || e.key === 'd' || e.key === 'D') {
        if (this.activeGame === 'breakout') voxelBreakout.moveRight(false);
      } else if (e.code === 'ArrowDown' || e.key === 's' || e.key === 'S') {
        if (this.activeGame === 'runner') blockRunner.duck(false);
      }
    },

    pressA() {
      if (!this.isPlaying) this.startCurrentGame();
      else if (this.isPaused) this.togglePause();
      else {
        if (this.activeGame === 'runner') blockRunner.jump();
        else if (this.activeGame === 'breakout') voxelBreakout.launchBall();
        else if (this.activeGame === 'sword') stickmanSwordSaint.playerDash();
      }
    },

    bindControls() {
      const handleTap = (el, fn) => {
        if (!el) return;
        el.addEventListener('click', fn);
        el.addEventListener('touchstart', (e) => {
          e.preventDefault();
          fn();
        }, { passive: false });
      };

      if (btnDpadUp) handleTap(btnDpadUp, () => { 
        if (this.activeGame === 'runner') blockRunner.jump(); 
        else if (this.activeGame === 'sword') stickmanSwordSaint.handleKeyDown({ code: 'KeyW', key: 'w' });
      });

      if (btnDpadDown) handleTap(btnDpadDown, () => { 
        if (this.activeGame === 'sword') stickmanSwordSaint.startPlayerBlock();
      });

      if (btnDpadLeft) {
        const startLeft = (e) => {
          if (e && e.cancelable) e.preventDefault();
          if (this.activeGame === 'breakout') voxelBreakout.moveLeft(true); 
          else if (this.activeGame === 'sword') stickmanSwordSaint.handleKeyDown({ code: 'KeyA', key: 'a' });
        };
        const stopLeft = (e) => {
          if (e && e.cancelable) e.preventDefault();
          if (this.activeGame === 'breakout') voxelBreakout.moveLeft(false); 
          else if (this.activeGame === 'sword') stickmanSwordSaint.handleKeyUp({ code: 'KeyA', key: 'a' });
        };
        btnDpadLeft.addEventListener('mousedown', startLeft);
        btnDpadLeft.addEventListener('mouseup', stopLeft);
        btnDpadLeft.addEventListener('touchstart', startLeft, { passive: false });
        btnDpadLeft.addEventListener('touchend', stopLeft, { passive: false });
      }

      if (btnDpadRight) {
        const startRight = (e) => {
          if (e && e.cancelable) e.preventDefault();
          if (this.activeGame === 'breakout') voxelBreakout.moveRight(true); 
          else if (this.activeGame === 'sword') stickmanSwordSaint.handleKeyDown({ code: 'KeyD', key: 'd' });
        };
        const stopRight = (e) => {
          if (e && e.cancelable) e.preventDefault();
          if (this.activeGame === 'breakout') voxelBreakout.moveRight(false); 
          else if (this.activeGame === 'sword') stickmanSwordSaint.handleKeyUp({ code: 'KeyD', key: 'd' });
        };
        btnDpadRight.addEventListener('mousedown', startRight);
        btnDpadRight.addEventListener('mouseup', stopRight);
        btnDpadRight.addEventListener('touchstart', startRight, { passive: false });
        btnDpadRight.addEventListener('touchend', stopRight, { passive: false });
      }

      if (btnActionX) handleTap(btnActionX, () => {
        if (this.activeGame === 'sword') stickmanSwordSaint.playerAttack('light');
      });

      if (btnActionY) handleTap(btnActionY, () => {
        if (this.activeGame === 'sword') stickmanSwordSaint.playerAttack('heavy');
      });

      if (btnActionB) handleTap(btnActionB, () => {
        if (this.activeGame === 'sword') stickmanSwordSaint.startPlayerBlock();
      });

      if (btnActionA) handleTap(btnActionA, () => this.pressA());
      if (btnConsoleStart) handleTap(btnConsoleStart, () => this.togglePause());
      if (btnConsoleSelect) {
        handleTap(btnConsoleSelect, () => {
          if (this.activeGame === 'sword') {
            stickmanSwordSaint.state = stickmanSwordSaint.state === 'SHOP' ? 'MENU' : 'SHOP';
          }
        });
      }

      if (canvasGame) {
        canvasGame.addEventListener('click', (e) => {
          if (this.activeGame === 'sword') {
            stickmanSwordSaint.handleCanvasClick(e);
          } else {
            this.pressA();
          }
        });
        canvasGame.addEventListener('mousemove', (e) => {
          if (this.activeGame === 'sword') {
            stickmanSwordSaint.handleCanvasMouseMove(e);
          } else {
            canvasGame.style.cursor = 'default';
          }
        });
        canvasGame.addEventListener('mouseleave', () => {
          canvasGame.style.cursor = 'default';
        });
      }
    }
  };


  /* --- GAME 1: BLOCK RUNNER --- */
  const blockRunner = {
    player: null,
    obstacles: [],
    diamonds: [],
    groundY: 330,
    speed: 5.5,
    distance: 0,
    timer: 0,

    init(engine) {
      this.groundY = 330;
      this.speed = 5.2;
      this.distance = 0;
      this.obstacles = [];
      this.diamonds = [];
      this.timer = 60;

      this.player = {
        x: 80,
        y: this.groundY - 45,
        w: 30,
        h: 45,
        vy: 0,
        gravity: 0.85,
        jumpPower: -14,
        isGrounded: true,
        jumpsLeft: 2
      };
    },

    jump() {
      if (this.player.jumpsLeft > 0) {
        this.player.vy = this.player.jumpPower;
        this.player.isGrounded = false;
        this.player.jumpsLeft--;
        playUiSound('jump');
      }
    },

    duck(bool) {
      this.player.h = bool ? 26 : 45;
    },

    updateAndDraw(engine) {
      const ctx = engine.ctx;
      this.distance += this.speed * 0.1;
      this.speed = Math.min(5.2 + this.distance * 0.005, 10.5);

      // Sky
      const grad = ctx.createLinearGradient(0, 0, 0, this.groundY);
      grad.addColorStop(0, '#1e1b4b');
      grad.addColorStop(1, '#4c1d95');
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, engine.width, engine.height);

      // Ground
      ctx.fillStyle = '#22c55e';
      ctx.fillRect(0, this.groundY, engine.width, 14);
      ctx.fillStyle = '#854d0e';
      ctx.fillRect(0, this.groundY + 14, engine.width, engine.height - this.groundY);

      // Player
      this.player.vy += this.player.gravity;
      this.player.y += this.player.vy;

      if (this.player.y + this.player.h >= this.groundY) {
        this.player.y = this.groundY - this.player.h;
        this.player.vy = 0;
        this.player.isGrounded = true;
        this.player.jumpsLeft = 2;
      }

      // Draw Player (Steve pixel style)
      ctx.fillStyle = '#06b6d4'; // Cyan shirt
      ctx.fillRect(this.player.x, this.player.y + 12, this.player.w, 18);
      ctx.fillStyle = '#f6d7b0'; // Face
      ctx.fillRect(this.player.x + 4, this.player.y, 22, 12);
      ctx.fillStyle = '#1e3a8a'; // Pants
      ctx.fillRect(this.player.x + 2, this.player.y + 30, this.player.w - 4, this.player.h - 30);
      ctx.fillStyle = '#dc2626'; // Red cape
      ctx.fillRect(this.player.x - 8, this.player.y + 10, 8, this.player.h - 18);

      // Obstacles (Creepers)
      this.timer--;
      if (this.timer <= 0) {
        this.obstacles.push({
          x: engine.width + 10,
          y: this.groundY - 40,
          w: 24,
          h: 40
        });
        this.timer = Math.max(45, Math.floor(80 - this.speed * 3));
      }

      for (let i = this.obstacles.length - 1; i >= 0; i--) {
        const obs = this.obstacles[i];
        obs.x -= this.speed;

        ctx.fillStyle = '#22c55e';
        ctx.fillRect(obs.x, obs.y, obs.w, obs.h);
        ctx.fillStyle = '#052e16';
        ctx.fillRect(obs.x + 4, obs.y + 6, 4, 4);
        ctx.fillRect(obs.x + 16, obs.y + 6, 4, 4);
        ctx.fillRect(obs.x + 8, obs.y + 14, 8, 12);

        // Collision
        if (
          this.player.x + 4 < obs.x + obs.w &&
          this.player.x + this.player.w - 4 > obs.x &&
          this.player.y + 4 < obs.y + obs.h &&
          this.player.y + this.player.h > obs.y + 4
        ) {
          playUiSound('hit');
          engine.gameOver(Math.floor(this.distance));
          return;
        }

        if (obs.x < -30) this.obstacles.splice(i, 1);
      }

      engine.updateHudScore(Math.floor(this.distance));
    }
  };


  /* --- GAME 2: VOXEL BREAKOUT --- */
  const voxelBreakout = {
    paddle: { x: 350, y: 370, w: 100, h: 12, speed: 7, moveL: false, moveR: false },
    ball: { x: 400, y: 340, vx: 4, vy: -4, r: 7, stuck: true },
    blocks: [],
    score: 0,

    init(engine) {
      this.score = 0;
      this.paddle.x = (engine.width - this.paddle.w) / 2;
      this.ball.x = this.paddle.x + this.paddle.w / 2;
      this.ball.y = this.paddle.y - 10;
      this.ball.vx = 4 * (Math.random() > 0.5 ? 1 : -1);
      this.ball.vy = -4;
      this.ball.stuck = true;

      this.blocks = [];
      const cols = 9;
      const rows = 4;
      const bw = 75;
      const bh = 20;
      const colors = ['#2fd8c7', '#22c55e', '#fbbf24', '#ef4444'];

      for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
          this.blocks.push({
            x: 55 + c * (bw + 6),
            y: 40 + r * (bh + 6),
            w: bw,
            h: bh,
            color: colors[r],
            alive: true,
            pts: (4 - r) * 10
          });
        }
      }
    },

    moveLeft(bool) { this.paddle.moveL = bool; },
    moveRight(bool) { this.paddle.moveR = bool; },

    launchBall() {
      if (this.ball.stuck) {
        this.ball.stuck = false;
        playUiSound('jump');
      }
    },

    updateAndDraw(engine) {
      const ctx = engine.ctx;
      ctx.fillStyle = '#0a0d1a';
      ctx.fillRect(0, 0, engine.width, engine.height);

      if (this.paddle.moveL) this.paddle.x = Math.max(10, this.paddle.x - this.paddle.speed);
      if (this.paddle.moveR) this.paddle.x = Math.min(engine.width - this.paddle.w - 10, this.paddle.x + this.paddle.speed);

      if (this.ball.stuck) {
        this.ball.x = this.paddle.x + this.paddle.w / 2;
        this.ball.y = this.paddle.y - 8;
      } else {
        this.ball.x += this.ball.vx;
        this.ball.y += this.ball.vy;

        if (this.ball.x - this.ball.r <= 0 || this.ball.x + this.ball.r >= engine.width) {
          this.ball.vx = -this.ball.vx;
          playUiSound('bounce');
        }
        if (this.ball.y - this.ball.r <= 0) {
          this.ball.vy = -this.ball.vy;
          playUiSound('bounce');
        } else if (this.ball.y > engine.height) {
          playUiSound('hit');
          engine.gameOver(this.score);
          return;
        }

        // Paddle hit
        if (
          this.ball.y + this.ball.r >= this.paddle.y &&
          this.ball.y - this.ball.r <= this.paddle.y + this.paddle.h &&
          this.ball.x >= this.paddle.x &&
          this.ball.x <= this.paddle.x + this.paddle.w
        ) {
          this.ball.vy = -Math.abs(this.ball.vy);
          playUiSound('bounce');
        }

        // Blocks hit
        this.blocks.forEach(b => {
          if (!b.alive) return;
          if (
            this.ball.x + this.ball.r > b.x &&
            this.ball.x - this.ball.r < b.x + b.w &&
            this.ball.y + this.ball.r > b.y &&
            this.ball.y - this.ball.r < b.y + b.h
          ) {
            b.alive = false;
            this.ball.vy = -this.ball.vy;
            this.score += b.pts;
            playUiSound('diamond');
          }
        });
      }

      // Draw
      this.blocks.forEach(b => {
        if (!b.alive) return;
        ctx.fillStyle = b.color;
        ctx.fillRect(b.x, b.y, b.w, b.h);
      });

      ctx.fillStyle = '#7c3aed';
      ctx.fillRect(this.paddle.x, this.paddle.y, this.paddle.w, this.paddle.h);

      ctx.fillStyle = '#2fd8c7';
      ctx.beginPath();
      ctx.arc(this.ball.x, this.ball.y, this.ball.r, 0, Math.PI * 2);
      ctx.fill();

      engine.updateHudScore(this.score);
    }
  };


/* ==========================================================================
   GAME 3: STICKSAW
   2D Stickman Samurai Fighting Game
   ========================================================================== */

const stickmanSwordSaint = {
  engine: null,
  state: 'MENU', // 'MENU', 'BATTLE', 'SHOP', 'QUEST_SELECT', 'QUEST_VICTORY', 'QUEST_FAILED', 'STAGE_CLEAR', 'GANG_CLEAR', 'GAME_OVER', 'VICTORY'
  thrownWeapons: [],
  keys: {},

  // Playable Side Quest System
  isSideQuest: false,
  activeQuest: null,
  questTimer: 0,
  questParries: 0,
  questFailReason: '',
  sideQuests: [
    {
      id: 'quest_speed',
      badge: '[SPEED TRIAL]',
      badgeColor: '#38bdf8',
      title: 'Swift Blade Trial',
      targetName: 'Kage the Swift',
      targetWeapon: 'wakizashi',
      targetHp: 85,
      targetColor: '#38bdf8',
      descLine1: 'Defeat the agile shadow shinobi',
      descLine2: 'within a strict 30-second timer.',
      timeLimit: 30,
      requiredParries: 0,
      unarmedOnly: false,
      rewardGold: 250,
      rewardWeapon: 'wakizashi',
      rewardWeaponName: 'Twin Wakizashi',
      completed: false
    },
    {
      id: 'quest_parry',
      badge: '[PARRY TRIAL]',
      badgeColor: '#ef4444',
      title: 'Iron Guard Mastery',
      targetName: 'Tessai the Brute',
      targetWeapon: 'kanabo',
      targetHp: 110,
      targetColor: '#ef4444',
      descLine1: 'Perform 3 perfect timed parries',
      descLine2: 'against heavy attacks, then finish him.',
      timeLimit: 0,
      requiredParries: 3,
      unarmedOnly: false,
      rewardGold: 350,
      rewardWeapon: 'naginata',
      rewardWeaponName: 'Thunder Naginata',
      completed: false
    },
    {
      id: 'quest_unarmed',
      badge: '[UNARMED TRIAL]',
      badgeColor: '#fbbf24',
      title: 'Bare-Knuckle Ronin',
      targetName: 'Goro the Enforcer',
      targetWeapon: 'katana',
      targetHp: 90,
      targetColor: '#fbbf24',
      descLine1: 'Throw away your blade (E) and win',
      descLine2: 'using only lethal bare-knuckle fists.',
      timeLimit: 0,
      requiredParries: 0,
      unarmedOnly: true,
      rewardGold: 500,
      rewardWeapon: 'muramasa',
      rewardWeaponName: 'Cursed Muramasa',
      completed: false
    }
  ],

  bareHandsWeapon: {
    id: 'bare_hands',
    name: 'Bare Fists',
    damage: 12,
    postureDmg: 10,
    speed: 1.4,
    reach: 28,
    color: '#f59e0b',
    streakGrace: 0,
    lvl: 1
  },
  
  // Customization & Difficulty
  playerName: 'Kenshi',
  isEditingName: false,
  difficulty: 'normal', // 'easy', 'normal', 'hard'
  
  // Currency & Inventory
  gold: 150, // RyÅ
  currentWeaponIndex: 0,
  weapons: [
    { id: 'red_lightsaber', name: 'Red Lightsaber', cost: 0, unlocked: true, damage: 24, postureDmg: 20, speed: 1.15, reach: 68, color: '#ff1a40', streakGrace: 0.2, lvl: 1 },
    { id: 'wakizashi', name: 'Twin Wakizashi', cost: 150, unlocked: false, damage: 13, postureDmg: 10, speed: 1.35, reach: 38, color: '#38bdf8', streakGrace: 0.25, lvl: 1 },
    { id: 'naginata', name: 'Thunder Naginata', cost: 350, unlocked: false, damage: 22, postureDmg: 24, speed: 0.9, reach: 68, color: '#fbbf24', streakGrace: 0.15, lvl: 1 },
    { id: 'kanabo', name: 'Demon KanabÅ', cost: 600, unlocked: false, damage: 28, postureDmg: 38, speed: 0.75, reach: 52, color: '#ef4444', streakGrace: 0, lvl: 1 },
    { id: 'muramasa', name: 'Cursed Muramasa', cost: 900, unlocked: false, damage: 35, postureDmg: 20, speed: 1.15, reach: 48, color: '#ec4899', streakGrace: 0.35, lvl: 1 },
    { id: 'voidreaver', name: 'Void Reaver Scythe', cost: 1500, unlocked: false, damage: 45, postureDmg: 32, speed: 1.05, reach: 64, color: '#a855f7', streakGrace: 0.5, lvl: 1 }
  ],
  maxHpBonus: 0,
  
  // Progression: Level 1 to 80
  level: 1,
  maxLevel: 80,
  bossLevels: [5, 10, 20, 30, 50, 80],
  lastCombatActionTime: 0,

  getBossData(lvl) {
    const bosses = {
      5: { name: 'Kageyama', title: 'Shadow Shinobi', color: '#a855f7', auraColor: 'rgba(168, 85, 247, 0.55)', scale: 1.25 },
      10: { name: 'Orochi', title: 'Twin Serpent Master', color: '#06b6d4', auraColor: 'rgba(6, 182, 212, 0.55)', scale: 1.45 },
      20: { name: 'Ryuujin', title: 'Thunder Sovereign', color: '#eab308', auraColor: 'rgba(234, 179, 8, 0.6)', scale: 1.65 },
      30: { name: 'Akuma', title: 'Blood Oni', color: '#ef4444', auraColor: 'rgba(239, 68, 68, 0.65)', scale: 1.90 },
      50: { name: 'Enma', title: 'Nether Warlord', color: '#f43f5e', auraColor: 'rgba(244, 63, 94, 0.7)', scale: 2.15 },
      80: { name: 'Susanoo', title: 'Supreme Emperor', color: '#fbbf24', auraColor: 'rgba(251, 191, 36, 0.8)', scale: 2.45 }
    };
    return bosses[lvl] || { name: `Warlord L${lvl}`, title: 'Demon Boss', color: '#ef4444', auraColor: 'rgba(239,68,68,0.5)', scale: 1.5 };
  },

  randomWeaponPool: [
    { id: 'katana', name: 'Steel Katana', cost: 0, unlocked: true, damage: 18, postureDmg: 14, speed: 1.0, reach: 48, color: '#e2e8f0', streakGrace: 0, lvl: 1 },
    { id: 'wakizashi', name: 'Twin Wakizashi', cost: 150, unlocked: false, damage: 13, postureDmg: 10, speed: 1.35, reach: 38, color: '#38bdf8', streakGrace: 0.25, lvl: 1 },
    { id: 'naginata', name: 'Thunder Naginata', cost: 350, unlocked: false, damage: 22, postureDmg: 24, speed: 0.9, reach: 72, color: '#fbbf24', streakGrace: 0.15, lvl: 1 },
    { id: 'kanabo', name: 'Demon Kanabo', cost: 600, unlocked: false, damage: 28, postureDmg: 38, speed: 0.75, reach: 56, color: '#ef4444', streakGrace: 0, lvl: 1 },
    { id: 'muramasa', name: 'Cursed Muramasa', cost: 900, unlocked: false, damage: 35, postureDmg: 20, speed: 1.15, reach: 52, color: '#ec4899', streakGrace: 0.35, lvl: 1 },
    { id: 'voidreaver', name: 'Void Reaver Scythe', cost: 1500, unlocked: false, damage: 45, postureDmg: 32, speed: 1.05, reach: 68, color: '#a855f7', streakGrace: 0.5, lvl: 1 },
    { id: 'dragon_odachi', name: 'Dragon Greatblade', cost: 1200, unlocked: false, damage: 40, postureDmg: 30, speed: 0.85, reach: 75, color: '#f97316', streakGrace: 0.3, lvl: 1 },
    { id: 'frost_scythe', name: 'Glacial Scythe', cost: 1400, unlocked: false, damage: 42, postureDmg: 28, speed: 1.0, reach: 66, color: '#06b6d4', streakGrace: 0.4, lvl: 1 }
  ],
  
  // Gang Roster Data
  gangs: [
    {
      name: 'Ronin Vagabonds',
      jpName: 'æµªäººæ”¾æµªè¡†',
      bgType: 'bamboo',
      color: '#22c55e',
      enemies: [
        { name: 'Kenji Swiftblade', isFemale: false, weapon: 'katana', hp: 90, color: '#94a3b8' },
        { name: 'Ayame Windwhisper', isFemale: true, weapon: 'wakizashi', hp: 85, color: '#f472b6' },
        { name: 'Taro Stonefist', isFemale: false, weapon: 'kanabo', hp: 110, color: '#fbbf24' },
        { name: 'Kaede Nightpetal', isFemale: true, weapon: 'naginata', hp: 95, color: '#38bdf8' },
        { name: 'Jin Viperfang', isFemale: false, weapon: 'wakizashi', hp: 100, color: '#4ade80' }
      ],
      boss: null
    },
    {
      name: 'Crimson Lotus Yakuza',
      jpName: 'ç´…è“®çµ„',
      bgType: 'bloodmoon',
      color: '#ec4899',
      enemies: [
        { name: 'Ryota Bloodfang', isFemale: false, weapon: 'katana', hp: 110, color: '#f87171' },
        { name: 'Tomoe Firestrike', isFemale: true, weapon: 'wakizashi', hp: 105, color: '#fb7185' },
        { name: 'Kazuma Ironcrusher', isFemale: false, weapon: 'kanabo', hp: 130, color: '#fb923c' },
        { name: 'Renka Deathblossom', isFemale: true, weapon: 'naginata', hp: 115, color: '#e879f9' },
        { name: 'Shinji Shadowstalker', isFemale: false, weapon: 'katana', hp: 120, color: '#a78bfa' }
      ],
      boss: {
        name: 'Ryujin Dragonfang',
        title: 'The Flame Shogun',
        isFemale: false,
        weapon: 'dragon_odachi',
        specialWeaponName: 'Dragonflame Odachi',
        hp: 160,
        color: '#ef4444',
        auraColor: 'rgba(239, 68, 68, 0.65)'
      }
    },
    {
      name: 'Storm Mountain Shinobi',
      jpName: 'åµå±±å¿ç¾¤',
      bgType: 'storm',
      color: '#0284c7',
      enemies: [
        { name: 'Daiki Stormcaller', isFemale: false, weapon: 'katana', hp: 130, color: '#38bdf8' },
        { name: 'Kasumi Thundercloud', isFemale: true, weapon: 'wakizashi', hp: 125, color: '#67e8f9' },
        { name: 'Kenta Galeblade', isFemale: false, weapon: 'wakizashi', hp: 130, color: '#7dd3fc' },
        { name: 'Sayuri Frostviper', isFemale: true, weapon: 'naginata', hp: 140, color: '#a5f3fc' },
        { name: 'Goro Mountainrend', isFemale: false, weapon: 'kanabo', hp: 160, color: '#0284c7' }
      ],
      boss: {
        name: 'Kage Frostreaver',
        title: 'The Blizzard Demon',
        isFemale: false,
        weapon: 'frost_scythe',
        specialWeaponName: 'Glacial Reaver Scythe',
        hp: 195,
        color: '#06b6d4',
        auraColor: 'rgba(6, 182, 212, 0.65)'
      }
    },
    {
      name: 'Nether Shadow Shogunate',
      jpName: 'å†¥ç•Œå½±å¹•åºœ',
      bgType: 'nether',
      color: '#ef4444',
      enemies: [
        { name: 'Kaito Voidblade', isFemale: false, weapon: 'katana', hp: 150, color: '#c084fc' },
        { name: 'Momiji Bloodmoon', isFemale: true, weapon: 'wakizashi', hp: 145, color: '#f43f5e' },
        { name: 'Hidetora Soulreaper', isFemale: false, weapon: 'kanabo', hp: 180, color: '#dc2626' },
        { name: 'Chiyo Netherflame', isFemale: true, weapon: 'naginata', hp: 160, color: '#fb923c' },
        { name: 'Raiden Hellstorm', isFemale: false, weapon: 'katana', hp: 170, color: '#f59e0b' }
      ],
      boss: {
        name: 'Akuma Bloodstorm',
        title: 'The Nether Emperor',
        isFemale: false,
        weapon: 'apocalypse_cleaver',
        specialWeaponName: 'Apocalypse Cleaver',
        hp: 240,
        color: '#dc2626',
        auraColor: 'rgba(220, 38, 38, 0.85)'
      }
    }
  ],
  
  // Combatants
  player: null,
  enemy: null,
  
  // Streak & Timer Mechanics
  playerStreak: 0,
  playerStreakTimer: 0, // Max 1.0s + upgrades
  maxStreakTimer: 1.0,
  enemyStreak: 0,
  enemyStreakTimer: 0,
  
  // Visual Effects & Particles
  particles: [],
  slashes: [],
  combatMessages: [],
  finisherEffect: null, // For cinematic cut
  screenShake: 0,
  gameTime: 0,
  
  // Clickable UI Bounds Cache for Canvas Hit-Testing
  uiBounds: [],

  init(engine) {
    this.engine = engine;
    this.state = 'MENU';
    this.gameTime = 0;
    this.particles = [];
    this.slashes = [];
    this.combatMessages = [];
    this.finisherEffect = null;
    this.screenShake = 0;
    this.isFightFinished = false;
    this.fightVictor = null;
    this.bossIntro = null;
    this.bossAyakashiUses = 2;
    this.bossAyakashiActive = false;
    this.bossAyakashiTimer = 0;
    this.bossAyakashiCooldown = 5.0;
    this.bossAyakashiGrabbing = false;
    this.bossAyakashiGrabTimer = 0;

    // Preload Japanese Dojo Background Images
    if (!this.bgDojoRegular) {
      this.bgDojoRegular = new Image();
      this.bgDojoRegular.src = './assets/bg_dojo_regular.jpg';
    }
    if (!this.bgDojoBoss) {
      this.bgDojoBoss = new Image();
      this.bgDojoBoss.src = './assets/bg_dojo_boss.jpg';
    }
    
    // Bind canvas clicks for menu/shop navigation
    const cvs = (this.engine && this.engine.canvas) || canvasGame || document.getElementById('consoleGameCanvas');
    if (cvs && !this._clickBound) {
      cvs.addEventListener('click', (e) => this.handleCanvasClick(e));
      cvs.addEventListener('mousemove', (e) => this.handleCanvasMouseMove(e));
      cvs.addEventListener('mouseleave', () => { cvs.style.cursor = 'default'; });
      this._clickBound = true;
    }
  },

  getStreakThresholds() {
    if (this.difficulty === 'easy') {
      return {
        playerToDefeatEnemy: 6,
        enemyToDefeatPlayer: 8,
        playerToDefeatBoss: 12,
        bossToDefeatPlayer: 7
      };
    } else {
      // Normal & Hard
      return {
        playerToDefeatEnemy: 8,
        enemyToDefeatPlayer: 6,
        playerToDefeatBoss: 15,
        bossToDefeatPlayer: 5
      };
    }
  },

  openQuestBoard() {
    if (this.engine && !this.engine.isPlaying) {
      this.engine.startCurrentGame();
    }
    this.state = 'QUEST_SELECT';
  },

  startSideQuest(qId) {
    const q = this.sideQuests.find(item => item.id === qId) || this.sideQuests[0];
    this.isSideQuest = true;
    this.activeQuest = q;
    this.questTimer = q.timeLimit || 0;
    this.questParries = 0;
    this.questFailReason = '';
    this.isFightFinished = false;
    this.fightVictor = null;
    this.state = 'BATTLE';

    this.startFight({
      isQuest: true,
      enemyName: q.targetName,
      enemyTitle: q.badge,
      enemyWeapon: q.targetWeapon,
      enemyHp: q.targetHp,
      enemyColor: q.targetColor,
      unarmedOnly: q.unarmedOnly
    });

    this.addCombatMessage(`📜 QUEST: ${q.title}!`, 400, 180, '#fbbf24', 2.5);
    this.playSamuraiSound('clash');
  },

  startFight(opts = {}) {
    this.level = this.level || 1;
    this.lastCombatActionTime = this.gameTime;
    const isBoss = opts.isQuest ? false : this.bossLevels.includes(this.level);

    let enemyName = opts.enemyName || '';
    let enemyTitle = opts.enemyTitle || '';
    let enemyColor = opts.enemyColor || '#cbd5e1';
    let enemyScale = 1.0;
    let auraColor = null;

    if (!opts.isQuest) {
      if (isBoss) {
        const bData = this.getBossData(this.level);
        enemyName = bData.name;
        enemyTitle = bData.title;
        enemyColor = bData.color;
        enemyScale = bData.scale;
        auraColor = bData.auraColor;
      } else {
        const regularNames = ['Kenji', 'Ayane', 'Daiki', 'Kazuki', 'Ren', 'Hanzo', 'Sakura', 'Kaede', 'Jin', 'Raiden', 'Musashi', 'Kuro', 'Hayate', 'Yuki'];
        enemyName = regularNames[(this.level - 1) % regularNames.length];
        enemyTitle = 'Fighter L' + this.level;
        const colors = ['#38bdf8', '#22c55e', '#f472b6', '#fbbf24', '#cbd5e1', '#a855f7'];
        enemyColor = colors[(this.level - 1) % colors.length];
        enemyScale = 1.0;
      }
    }

    // Pick weapon from pool or quest target
    let randomWp = null;
    if (opts.enemyWeapon) {
      randomWp = this.randomWeaponPool.find(w => w.id === opts.enemyWeapon) || this.randomWeaponPool[0];
    } else {
      randomWp = this.randomWeaponPool[Math.floor(Math.random() * this.randomWeaponPool.length)];
    }

    const equippedWeapon = this.weapons[this.currentWeaponIndex];
    this.maxStreakTimer = 1.0 + equippedWeapon.streakGrace;
    this.thrownWeapons = [];
    this.keys = {};
    this.isFightFinished = false;
    this.fightVictor = null;

    // Ayakashi Ability: Boss can use exactly 2 times per fight
    this.bossAyakashiUses = 2;
    this.bossAyakashiActive = false;
    this.bossAyakashiTimer = 0;
    this.bossAyakashiCooldown = 4.5; // Activates first after ~4.5 seconds of combat
    this.bossAyakashiGrabbing = false;
    this.bossAyakashiGrabTimer = 0;

    // Special Random Intro Animations for Bosses
    if (isBoss) {
      const introType = Math.floor(Math.random() * 3); // 0: Meteor Drop, 1: Shadow Dash, 2: Demonic Power Surge
      this.bossIntro = {
        active: true,
        timer: 2.2,
        maxTimer: 2.2,
        type: introType,
        bossName: enemyName,
        bossTitle: enemyTitle
      };
    } else {
      this.bossIntro = null;
    }

    // Initialize Player Fighter (Firmly grounded on exact floor line 320)
    const startUnarmed = opts.unarmedOnly === true;
    this.player = {
      x: 220,
      y: 320, // Exact ground level
      vx: 0,
      vy: 0,
      dir: 1, // Facing right
      isGrounded: true,
      hp: 100 + this.maxHpBonus,
      maxHp: 100 + this.maxHpBonus,
      stamina: 100,
      maxStamina: 100,
      posture: 0,
      maxPosture: 100,
      isBlocking: false,
      blockTimer: 0,
      parryWindow: 0,
      isAttacking: false,
      attackType: null,
      attackTimer: 0,
      attackCooldown: 0,
      comboStep: 0,
      isDashing: false,
      dashTimer: 0,
      isHurt: false,
      hurtTimer: 0,
      isStunned: false,
      stunTimer: 0,
      hasWeapon: !startUnarmed,
      weapon: startUnarmed ? this.bareHandsWeapon : equippedWeapon,
      scale: 1.0,
      animTime: 0,
      isFallen: false,
      isVictorious: false
    };

    // Initialize Enemy Fighter (Firmly grounded on exact floor line 320)
    let enemyHp = opts.enemyHp || (65 + this.level * 9);
    if (isBoss && !opts.isQuest) enemyHp = Math.round(enemyHp * 1.5);

    let enemyStartY = 320;
    if (isBoss && this.bossIntro && this.bossIntro.type === 0) {
      enemyStartY = -120; // Meteor descent starting high in the sky
    }

    this.enemy = {
      x: 580,
      y: enemyStartY,
      vx: 0,
      vy: 0,
      dir: -1, // Facing left
      isGrounded: (enemyStartY === 320),
      name: enemyName,
      title: enemyTitle,
      isFemale: (this.level % 2 === 0),
      isBoss: isBoss,
      scale: enemyScale,
      hp: enemyHp,
      maxHp: enemyHp,
      stamina: 100,
      maxStamina: 100,
      posture: 0,
      maxPosture: 100,
      color: enemyColor,
      auraColor: auraColor,
      weaponId: randomWp.id,
      hasWeapon: true,
      weapon: { ...randomWp },
      isBlocking: false,
      blockTimer: 0,
      isAttacking: false,
      attackType: null,
      attackTimer: 0,
      aiActionTimer: Math.max(0.24, 0.75 - this.level * 0.007),
      isDashing: false,
      dashTimer: 0,
      isHurt: false,
      hurtTimer: 0,
      isStunned: false,
      stunTimer: 0,
      animTime: 0,
      ponytailAngle: 0,
      isFallen: false,
      isVictorious: false
    };

    this.playerStreak = 0;
    this.playerStreakTimer = 0;
    this.enemyStreak = 0;
    this.enemyStreakTimer = 0;
    this.particles = [];
    this.slashes = [];
    this.combatMessages = [];
    this.finisherEffect = null;
    this.screenShake = 0;
    this.state = 'BATTLE';

    if (isBoss) {
      this.addCombatMessage("👑 BOSS LEVEL " + this.level + ": " + enemyName + "!", 400, 180, '#ef4444', 2.5);
    } else {
      this.addCombatMessage("LEVEL " + this.level + " - FIGHT!", 400, 180, '#fbbf24', 1.8);
    }
    this.playSamuraiSound('gong');
  },

  handleKeyDown(e) {
    if (!this.keys) this.keys = {};
    this.keys[e.code] = true;

    if (this.state === 'MENU') {
      if (this.isEditingName) {
        if (e.key === 'Enter') {
          this.isEditingName = false;
        } else if (e.key === 'Backspace') {
          this.playerName = this.playerName.slice(0, -1);
        } else if (e.key.length === 1 && this.playerName.length < 12) {
          this.playerName += e.key;
        }
        return;
      }
      if (e.code === 'KeyF' || e.code === 'Space' || e.code === 'Enter' || e.code === 'NumpadEnter') {
        this.isSideQuest = false;
        this.activeQuest = null;
        this.startFight();
      } else if (e.code === 'KeyS') {
        this.state = 'SHOP';
      } else if (e.code === 'KeyQ') {
        this.state = 'QUEST_SELECT';
      }
      return;
    }

    if (this.state === 'SHOP' || this.state === 'QUEST_SELECT') {
      if (e.code === 'Escape' || e.code === 'KeyB') {
        this.state = 'MENU';
      }
      return;
    }

    if (this.state === 'QUEST_VICTORY' || this.state === 'QUEST_FAILED') {
      if (e.code === 'Space' || e.code === 'Enter' || e.code === 'Escape') {
        this.state = 'QUEST_SELECT';
      }
      return;
    }

    if (e.code === 'Digit5') {
      this.level = 5;
      this.startFight();
      return;
    }

    if (this.state !== 'BATTLE' || !this.player || this.player.isStunned) return;

    // Movement & Combat Controls
    if ((e.code === 'KeyW' || e.code === 'ArrowUp') && this.player.isGrounded) {
      this.player.vy = -11;
      this.player.isGrounded = false;
      this.playSamuraiSound('jump');
    } else if (e.code === 'KeyJ' || e.code === 'KeyZ') {
      this.playerAttack('light');
    } else if (e.code === 'KeyK' || e.code === 'Enter' || e.code === 'NumpadEnter') {
      // Replaced X with Enter for Heavy Slash
      this.playerAttack('heavy');
    } else if (e.code === 'KeyL' || e.code === 'KeyC') {
      this.startPlayerBlock();
    } else if (e.code === 'KeyE') {
      // Throw Weapon!
      this.playerThrowWeapon();
    } else if (e.code === 'KeyG') {
      // Grab Enemy's Weapon or Grounded Weapon!
      this.playerGrab();
    } else if (e.code === 'Space' || e.code === 'ShiftLeft') {
      this.playerDash();
    }
  },

  handleKeyUp(e) {
    if (!this.keys) this.keys = {};
    this.keys[e.code] = false;

    if (this.state !== 'BATTLE' || !this.player) return;
    if (e.code === 'KeyL' || e.code === 'KeyC') {
      this.player.isBlocking = false;
    }
  },

  playerThrowWeapon() {
    this.lastCombatActionTime = this.gameTime;
    if (!this.player || this.player.isStunned || this.player.isHurt) return;

    const isAlreadyUnarmed = this.player.hasWeapon === false || (this.player.weapon && this.player.weapon.id === 'bare_hands');
    if (isAlreadyUnarmed) {
      this.addCombatMessage("NO WEAPON! (Press G to Grab)", this.player.x, this.player.y - 45, '#ef4444', 1.2);
      return;
    }

    // Launch weapon projectile!
    const thrownWp = this.player.weapon;
    this.thrownWeapons.push({
      x: this.player.x + this.player.dir * 20,
      y: this.player.y - 28,
      vx: this.player.dir * 8.0,
      vy: -1.6,
      rotation: 0,
      rotSpeed: this.player.dir * 0.45,
      weapon: thrownWp,
      damage: Math.round((thrownWp.damage || 18) * 1.3),
      guardDmg: Math.round((thrownWp.postureDmg || 14) * 1.5),
      owner: 'player',
      active: true,
      grounded: false
    });

    // Player fights unarmed with bare fists
    this.player.hasWeapon = false;
    this.player.weapon = { ...this.bareHandsWeapon };

    this.playSamuraiSound('throw');
    this.addCombatMessage("WEAPON THROWN! (FISTS MODE)", this.player.x, this.player.y - 55, '#f59e0b', 1.5);
  },

  playerGrab() {
    this.lastCombatActionTime = this.gameTime;
    if (!this.player || this.player.isStunned || !this.enemy) return;

    const distToEnemy = Math.abs(this.player.x - this.enemy.x);
    const yDistToEnemy = Math.abs(this.player.y - this.enemy.y);

    // 1. First priority: Snatch the enemy's weapon if within reach
    if (distToEnemy < 75 && yDistToEnemy < 45 && this.enemy.hasWeapon !== false) {
      const stolenWeapon = this.enemy.weapon || this.weapons[0];
      this.player.hasWeapon = true;
      this.player.weapon = { ...stolenWeapon };
      this.enemy.hasWeapon = false;
      this.enemy.weapon = { id: 'enemy_fists', name: 'Bare Fists', damage: 8, postureDmg: 6, speed: 1.1, reach: 24, color: '#94a3b8' };
      this.enemy.weaponId = 'enemy_fists';
      this.enemy.isHurt = true;
      this.enemy.hurtTimer = 0.45;
      this.enemy.vx = -this.player.dir * 4.0;
      this.screenShake = 8;
      this.playSamuraiSound('grab');
      this.createSparks(this.enemy.x, this.enemy.y - 30, '#fbbf24');
      this.addCombatMessage("WEAPON SNATCHED!", this.player.x, this.player.y - 55, '#fbbf24', 1.8);
      return;
    }

    // 2. Second priority: Pick up a grounded thrown weapon
    for (let i = 0; i < this.thrownWeapons.length; i++) {
      const tw = this.thrownWeapons[i];
      if (tw.grounded && Math.abs(this.player.x - tw.x) < 45) {
        this.player.hasWeapon = true;
        this.player.weapon = tw.weapon;
        this.thrownWeapons.splice(i, 1);
        this.playSamuraiSound('grab');
        this.addCombatMessage("WEAPON RETRIEVED!", this.player.x, this.player.y - 50, '#38bdf8', 1.4);
        return;
      }
    }

    // 3. Distance feedback
    if (distToEnemy >= 75) {
      this.addCombatMessage("GET CLOSER TO GRAB!", this.player.x, this.player.y - 45, '#94a3b8', 0.9);
    } else if (this.enemy.hasWeapon === false) {
      this.addCombatMessage("ENEMY ALREADY DISARMED!", this.player.x, this.player.y - 45, '#94a3b8', 0.9);
    }
  },

  playerAttack(type) {
    this.lastCombatActionTime = this.gameTime;
    if (this.player.isAttacking || this.player.isDashing || this.player.isHurt || this.player.isStunned) return;
    const stamCost = type === 'light' ? 10 : 18;
    if (this.player.stamina < stamCost) return;

    this.player.stamina -= stamCost;
    this.player.isAttacking = true;
    this.player.attackType = type;
    this.player.attackTimer = type === 'light' ? 0.24 : 0.36;
    this.player.comboStep = (this.player.comboStep + 1) % 3;
    this.player.isBlocking = false;

    // Normal subtle forward step (controlled samurai movement)
    this.player.vx = this.player.dir * (type === 'light' ? 1.2 : 1.8);

    const isUnarmed = this.player.hasWeapon === false || (this.player.weapon && this.player.weapon.id === 'bare_hands');

    // Audio swoosh or punch
    this.playSamuraiSound(isUnarmed ? 'punch' : 'slash');

    // Add slash / punch visual arc
    const reach = (this.player.weapon && this.player.weapon.reach) ? this.player.weapon.reach : 28;
    this.slashes.push({
      x: this.player.x + this.player.dir * (isUnarmed ? 15 : 22),
      y: this.player.y - 28,
      dir: this.player.dir,
      color: isUnarmed ? '#f59e0b' : this.player.weapon.color,
      size: reach,
      life: 0.16,
      type: type,
      isFist: isUnarmed
    });

    // Check hit immediately or after slight windup
    setTimeout(() => {
      this.checkPlayerHit();
    }, type === 'light' ? 45 : 90);
  },

  checkPlayerHit() {
    if (!this.player || !this.enemy || !this.player.isAttacking) return;
    const reach = (this.player.weapon && this.player.weapon.reach) ? this.player.weapon.reach : 28;
    const dist = Math.abs((this.player.x + this.player.dir * 18) - this.enemy.x);
    if (dist < reach + 20 && Math.abs(this.player.y - this.enemy.y) < 40) {
      // Hit lands!
      this.onEnemyDamaged();
    }
  },

  startPlayerBlock() {
    this.lastCombatActionTime = this.gameTime;
    if (this.player.isAttacking || this.player.isDashing || this.player.isStunned) return;
    this.player.isBlocking = true;
    this.player.parryWindow = 0.22; // 0.22s window for perfect parry!
  },

  playerDash() {
    if (this.player.isDashing || this.player.stamina < 15 || this.player.isStunned) return;
    this.player.stamina -= 15;
    this.player.isDashing = true;
    this.player.dashTimer = 0.22;
    // Normal balanced dodge speed (5.2 instead of 12)
    this.player.vx = this.player.dir * 5.2;
    this.playSamuraiSound('dash');
    
    // Smoke / dust particles
    for (let i = 0; i < 4; i++) {
      this.particles.push({
        x: this.player.x,
        y: this.player.y,
        vx: -this.player.dir * (Math.random() * 2 + 0.5),
        vy: -Math.random() * 1.5,
        life: 0.25,
        color: 'rgba(255,255,255,0.5)',
        size: 3
      });
    }
  },

  onEnemyDamaged() {
    this.lastCombatActionTime = this.gameTime;
    const weapon = this.player.weapon;
    const isEnemyBlocking = this.enemy.isBlocking;

    if (isEnemyBlocking) {
      // Enemy blocked
      this.enemy.posture += weapon.postureDmg;
      this.playSamuraiSound('clash');
      this.createSparks(this.enemy.x, this.enemy.y - 30, '#fbbf24');
      this.addCombatMessage("GUARDED", this.enemy.x, this.enemy.y - 50, '#94a3b8', 0.8);

      if (this.enemy.posture >= this.enemy.maxPosture) {
        this.breakPosture(this.enemy);
      }
      return;
    }

    // Direct clean unblocked hit!
    const thresholds = this.getStreakThresholds();
    const targetStreak = this.enemy.isBoss ? thresholds.playerToDefeatBoss : thresholds.playerToDefeatEnemy;

    this.playerStreak++;
    this.playerStreakTimer = this.maxStreakTimer;

    const dmg = weapon.damage * (1 + (weapon.lvl - 1) * 0.2);
    this.enemy.hp = Math.max(0, this.enemy.hp - dmg);
    this.enemy.posture = Math.min(this.enemy.maxPosture, this.enemy.posture + weapon.postureDmg * 0.8);
    this.enemy.isHurt = true;
    this.enemy.hurtTimer = 0.25;
    this.enemy.vx = this.player.dir * 4;

    this.createBloodAndSparks(this.enemy.x, this.enemy.y - 30);
    this.playSamuraiSound('hit');
    this.screenShake = 5;

    // Check Streak Defeat Condition
    if (this.playerStreak >= targetStreak) {
      this.triggerFinisher('player');
      return;
    }

    // Check HP 0 or Posture Broken execution
    if (this.enemy.hp <= 0) {
      this.triggerFinisher('player');
    } else if (this.enemy.posture >= this.enemy.maxPosture) {
      this.breakPosture(this.enemy);
    }
  },

  onPlayerDamaged() {
    this.lastCombatActionTime = this.gameTime;
    const isBlocking = this.player.isBlocking;
    const thresholds = this.getStreakThresholds();
    const targetStreak = this.enemy.isBoss ? thresholds.bossToDefeatPlayer : thresholds.enemyToDefeatPlayer;

    if (isBlocking) {
      if (this.player.parryWindow > 0) {
        // PERFECT PARRY!
        this.playSamuraiSound('parry');
        this.createSparks(this.player.x, this.player.y - 30, '#38bdf8');
        this.addCombatMessage("PARRY!", this.player.x, this.player.y - 55, '#38bdf8', 1.2);
        if (this.isSideQuest && this.activeQuest && this.activeQuest.requiredParries > 0) {
          this.questParries = (this.questParries || 0) + 1;
          this.addCombatMessage(`QUEST: PARRY ${this.questParries}/${this.activeQuest.requiredParries}!`, 400, 140, '#fbbf24', 1.5);
        }
        this.enemy.posture += 35;
        this.enemy.isHurt = true;
        this.enemy.hurtTimer = 0.4;
        this.enemy.vx = -this.enemy.dir * 6;
        if (this.enemy.posture >= this.enemy.maxPosture) {
          this.breakPosture(this.enemy);
        }
        return;
      }

      // Regular block
      this.player.posture += 18;
      this.playSamuraiSound('clash');
      this.createSparks(this.player.x, this.player.y - 30, '#fbbf24');
      if (this.player.posture >= this.player.maxPosture) {
        this.breakPosture(this.player);
      }
      return;
    }

    // Direct clean hit to player
    this.enemyStreak++;
    this.enemyStreakTimer = 1.0;

    const enemyDmg = this.enemy.isBoss ? 26 : (this.difficulty === 'hard' ? 22 : 16);
    this.player.hp = Math.max(0, this.player.hp - enemyDmg);
    this.player.posture = Math.min(this.player.maxPosture, this.player.posture + 14);
    this.player.isHurt = true;
    this.player.hurtTimer = 0.25;
    this.player.vx = this.enemy.dir * 4.5;

    this.createBloodAndSparks(this.player.x, this.player.y - 30);
    this.playSamuraiSound('player_hit');
    this.screenShake = 7;

    // Check if Enemy reaches defeat streak
    if (this.enemyStreak >= targetStreak || this.player.hp <= 0) {
      this.triggerFinisher('enemy');
    }
  },

  breakPosture(target) {
    target.isStunned = true;
    target.stunTimer = 2.2; // 2.2 second dazed window!
    target.posture = target.maxPosture;
    this.playSamuraiSound('posture_break');
    this.addCombatMessage("GUARD BROKEN!", target.x, target.y - 55, '#ef4444', 1.8);
    this.screenShake = 8;
  },

  triggerFinisher(victor) {
    this.isFightFinished = true;
    this.fightVictor = victor;

    this.finisherEffect = {
      victor: victor,
      timer: 2.0,
      phase: 0
    };
    this.screenShake = 14;
    this.playSamuraiSound('finisher');

    // After defeated: Stop all fighter movements and freeze combat actions immediately
    if (this.player) {
      this.player.vx = 0;
      this.player.vy = 0;
      this.player.isAttacking = false;
      this.player.isDashing = false;
      if (victor === 'enemy') {
        this.player.isFallen = true; // Player collapses / drops to one knee
      } else {
        this.player.isVictorious = true; // Player assumes victorious sheathe stance
      }
    }

    if (this.enemy) {
      this.enemy.vx = 0;
      this.enemy.vy = 0;
      this.enemy.isAttacking = false;
      this.enemy.isDashing = false;
      if (victor === 'player') {
        this.enemy.isFallen = true; // Defeated enemy collapses
      } else {
        this.enemy.isVictorious = true; // Victorious enemy taunts
      }
    }

    if (victor === 'player') {
      const reward = this.enemy.isBoss ? 250 : 60;
      this.gold += reward;
      this.engine.updateHudScore(this.gold);
    }
  },

  updateFinisher(dt) {
    if (!this.finisherEffect) return;
    this.finisherEffect.timer -= dt;

    if (this.finisherEffect.timer <= 0) {
      const victor = this.finisherEffect.victor;
      this.finisherEffect = null;

      if (victor === 'player') {
        if (this.isSideQuest) {
          this.onQuestCompleted();
        } else {
          this.onRoundCleared();
        }
      } else {
        if (this.isSideQuest) {
          this.questFailReason = 'Defeated in battle by ' + (this.activeQuest ? this.activeQuest.targetName : 'enemy');
          this.state = 'QUEST_FAILED';
          this.playSamuraiSound('game_over');
        } else {
          this.state = 'GAME_OVER';
          this.playSamuraiSound('game_over');
        }
      }
    }
  },

  onQuestCompleted() {
    if (!this.activeQuest) {
      this.state = 'QUEST_SELECT';
      return;
    }

    // Check trial requirements
    if (this.activeQuest.requiredParries > 0 && (this.questParries || 0) < this.activeQuest.requiredParries) {
      this.questFailReason = `Required ${this.activeQuest.requiredParries} parries, but only landed ${this.questParries || 0}.`;
      this.state = 'QUEST_FAILED';
      this.playSamuraiSound('game_over');
      return;
    }
    if (this.activeQuest.unarmedOnly && this.player && this.player.hasWeapon) {
      this.questFailReason = 'Violated Unarmed Rule: Ended battle with a weapon.';
      this.state = 'QUEST_FAILED';
      this.playSamuraiSound('game_over');
      return;
    }

    // Quest Succeeded!
    this.activeQuest.completed = true;
    this.gold += this.activeQuest.rewardGold;
    if (this.engine && this.engine.updateHudScore) {
      this.engine.updateHudScore(this.gold);
    }

    // Unlock reward weapon if locked
    if (this.activeQuest.rewardWeapon) {
      const rw = this.weapons.find(w => w.id === this.activeQuest.rewardWeapon);
      if (rw && !rw.unlocked) {
        rw.unlocked = true;
      }
    }

    this.state = 'QUEST_VICTORY';
    this.playSamuraiSound('victory');
  },
  onRoundCleared() {
    this.level = (this.level || 1) + 1;
    if (this.level > this.maxLevel) {
      this.state = 'VICTORY';
      this.playSamuraiSound('victory');
      return;
    }

    const reward = this.enemy && this.enemy.isBoss ? 250 : (50 + this.level * 3);
    this.gold += reward;
    if (this.engine && this.engine.updateHudScore) {
      this.engine.updateHudScore(this.gold);
    }

    const isNextBoss = this.bossLevels.includes(this.level);
    if (isNextBoss) {
      const bData = this.getBossData(this.level);
      this.addCombatMessage(`👑 BOSS LEVEL ${this.level}: ${bData.name}!`, 400, 180, '#ef4444', 2.5);
    } else {
      this.addCombatMessage(`LEVEL ${this.level} - FIGHT!`, 400, 180, '#38bdf8', 1.8);
    }

    this.startFight();
  },

  updateAI(dt) {
    if (!this.enemy || this.enemy.isStunned || this.state !== 'BATTLE') return;

    this.enemy.aiActionTimer -= dt;
    const dist = Math.abs(this.enemy.x - this.player.x);
    this.enemy.dir = this.enemy.x < this.player.x ? 1 : -1;

    // Boss Elemental Waves / Special Attacks
    if (this.enemy.isBoss && this.bossStage >= 3 && Math.random() < 0.015 && dist > 120) {
      this.fireBossSpecialProjectile();
    }

    if (this.enemy.aiActionTimer <= 0) {
      const difficultyMulti = this.difficulty === 'easy' ? 1.4 : (this.difficulty === 'hard' ? 0.65 : 1.0);
      this.enemy.aiActionTimer = (Math.random() * 0.8 + 0.4) * difficultyMulti;

      // Smart decision tree
      if (dist > 160) {
        // Move closer
        this.enemy.vx = this.enemy.dir * (this.enemy.isBoss ? 4.2 : 3.5);
      } else if (dist < 70) {
        // In strike zone! Attack, parry, or backstep
        const roll = Math.random();
        if (roll < 0.55) {
          this.enemyAttack(Math.random() > 0.4 ? 'light' : 'heavy');
        } else if (roll < 0.8) {
          this.enemy.isBlocking = true;
          setTimeout(() => { if (this.enemy) this.enemy.isBlocking = false; }, 400);
        } else {
          // Quick backstep
          this.enemy.vx = -this.enemy.dir * 4.5;
        }
      } else {
        // Mid-distance: dash in or attack
        if (Math.random() > 0.4) {
          this.enemy.vx = this.enemy.dir * 3.5;
        } else {
          this.enemyAttack('light');
        }
      }
    }
  },

  enemyAttack(type) {
    this.lastCombatActionTime = this.gameTime;
    if (this.enemy.isAttacking || this.enemy.isStunned) return;
    this.enemy.isAttacking = true;
    this.enemy.attackType = type;
    this.enemy.attackTimer = type === 'light' ? 0.3 : 0.5;

    this.enemy.vx = this.enemy.dir * (type === 'light' ? 3.0 : 4.5);
    this.playSamuraiSound('enemy_slash');

    const reach = this.enemy.isBoss ? 70 : 45;
    this.slashes.push({
      x: this.enemy.x + this.enemy.dir * 25,
      y: this.enemy.y - 30,
      dir: this.enemy.dir,
      color: this.enemy.color,
      size: reach,
      life: 0.2,
      type: type
    });

    setTimeout(() => {
      if (!this.enemy || !this.player) return;
      const dist = Math.abs((this.enemy.x + this.enemy.dir * 20) - this.player.x);
      if (dist < reach + 20 && Math.abs(this.enemy.y - this.player.y) < 40) {
        this.onPlayerDamaged();
      }
    }, type === 'light' ? 80 : 150);
  },

  fireBossSpecialProjectile() {
    this.slashes.push({
      x: this.enemy.x,
      y: this.enemy.y - 30,
      dir: this.enemy.dir,
      color: this.enemy.color,
      size: 90,
      life: 0.6,
      isWave: true,
      vx: this.enemy.dir * 7
    });
    this.playSamuraiSound('boss_wave');
  },

  updateAndDraw(engine) {
    const ctx = engine.ctx;
    const width = engine.width;
    const height = engine.height;
    const dt = 0.016;
    this.gameTime += dt;

    // Apply Screen Shake
    ctx.save();
    if (this.screenShake > 0) {
      const sx = (Math.random() - 0.5) * this.screenShake;
      const sy = (Math.random() - 0.5) * this.screenShake;
      ctx.translate(sx, sy);
      this.screenShake = Math.max(0, this.screenShake - dt * 25);
    }

    // Clear Canvas & Draw Procedural Background
    this.drawGangBackground(ctx, this.currentGang, this.gameTime);

    // State Router
    if (this.state === 'MENU') {
      this.drawMainMenu(ctx, width, height);
    } else if (this.state === 'SHOP') {
      this.drawWeaponShop(ctx, width, height);
    } else if (this.state === 'QUEST_SELECT') {
      this.drawSideQuestSelect(ctx, width, height);
    } else if (this.state === 'QUEST_VICTORY') {
      this.drawQuestVictory(ctx, width, height);
    } else if (this.state === 'QUEST_FAILED') {
      this.drawQuestFailed(ctx, width, height);
    } else if (this.state === 'BATTLE') {
      this.updateBattle(dt);
      this.drawBattle(ctx, width, height);
    } else if (this.state === 'GANG_CLEAR') {
      this.drawGangClear(ctx, width, height);
    } else if (this.state === 'GAME_OVER') {
      this.drawGameOver(ctx, width, height);
    } else if (this.state === 'VICTORY') {
      this.drawVictory(ctx, width, height);
    }

    ctx.restore();
  },

  updateBattle(dt) {
    // Stop all fight actions and movement once combatant is defeated
    if (this.isFightFinished || this.finisherEffect || this.state !== 'BATTLE') {
      if (this.player) { this.player.vx = 0; this.player.isAttacking = false; }
      if (this.enemy) { this.enemy.vx = 0; this.enemy.isAttacking = false; }
      if (this.finisherEffect) {
        this.updateFinisher(dt);
      }
      return;
    }

    // Side Quest Live Objective Tracking & Conditions
    if (this.isSideQuest && this.activeQuest) {
      if (this.activeQuest.timeLimit > 0) {
        this.questTimer -= dt;
        if (this.questTimer <= 0) {
          this.questTimer = 0;
          this.questFailReason = 'Time Limit Expired (' + this.activeQuest.timeLimit + 's)';
          this.triggerFinisher('enemy');
          return;
        }
      }
      if (this.activeQuest.unarmedOnly && this.player && this.player.hasWeapon) {
        this.questFailReason = 'Violated Unarmed Rule: Picked up a weapon!';
        this.triggerFinisher('enemy');
        return;
      }
    }

    // Special Random Intro Animations for Bosses
    if (this.bossIntro && this.bossIntro.active) {
      this.bossIntro.timer -= dt;

      // Freeze player during boss intro
      if (this.player) { this.player.vx = 0; this.player.isAttacking = false; }

      // Handle specific random intro types
      if (this.bossIntro.type === 0) {
        // Type 0: Meteor Sky Drop - Boss falls from high above and slams onto floor Y=320
        if (!this.enemy.isGrounded) {
          this.enemy.vy += 1.4;
          this.enemy.y += this.enemy.vy;
          if (this.enemy.y >= 320) {
            this.enemy.y = 320;
            this.enemy.vy = 0;
            this.enemy.isGrounded = true;
            this.screenShake = 16;
            this.playSamuraiSound('clash');
            this.createSparks(this.enemy.x, 320, '#ef4444');
            for (let i = 0; i < 10; i++) {
              this.particles.push({
                x: this.enemy.x,
                y: 320,
                vx: (Math.random() - 0.5) * 8,
                vy: -Math.random() * 5,
                life: 0.45,
                color: '#ef4444',
                size: 4
              });
            }
          }
        }
      } else if (this.bossIntro.type === 1) {
        // Type 1: Shadow Dash - Boss dashes from center to position with blade flash
        const progress = 1 - (this.bossIntro.timer / this.bossIntro.maxTimer);
        this.enemy.x = 420 + progress * 160;
        this.enemy.y = 320;
        this.enemy.isGrounded = true;
        if (Math.random() < 0.25) {
          this.createSparks(this.enemy.x, this.enemy.y - 35, '#38bdf8');
        }
      } else if (this.bossIntro.type === 2) {
        // Type 2: Demonic Power Surge - Boss pulses demonic crimson aura
        this.enemy.x = 580;
        this.enemy.y = 320;
        this.enemy.isGrounded = true;
        if (Math.random() < 0.3) {
          this.createSparks(this.enemy.x, this.enemy.y - 45, '#a855f7');
        }
      }

      if (this.bossIntro.timer <= 0) {
        this.bossIntro.active = false;
        this.enemy.x = 580;
        this.enemy.y = 320;
        this.enemy.isGrounded = true;
        this.addCombatMessage("DUEL START!", 400, 180, '#ef4444', 1.8);
        this.playSamuraiSound('gong');
      }

      return; // Suspend normal combat during boss intro
    }

    // Boss Special Ability: AYAKASHI (Eyes turn red, active for 3s, grabs & throws player for half health + 50% posture)
    if (this.enemy && this.enemy.isBoss && !this.enemy.isStunned && !this.enemy.isHurt) {
      if (this.bossAyakashiCooldown > 0) {
        this.bossAyakashiCooldown -= dt;
      }

      // Trigger Ayakashi when off cooldown and uses remain (max 2 per fight)
      if (this.bossAyakashiUses > 0 && !this.bossAyakashiActive && !this.bossAyakashiGrabbing && this.bossAyakashiCooldown <= 0) {
        this.bossAyakashiActive = true;
        this.bossAyakashiTimer = 3.0; // Active for 3 seconds only!
        this.bossAyakashiUses--;
        this.bossAyakashiCooldown = 15.0; // Cooldown before potential second use
        this.screenShake = 6;
        this.playSamuraiSound('boss_wave');
        this.addCombatMessage("⚠️ AYAKASHI ACTIVATED! STAY BACK!", this.enemy.x, this.enemy.y - 120, '#ef4444', 2.8);
      }

      // Active Ayakashi window (3 seconds)
      if (this.bossAyakashiActive) {
        this.bossAyakashiTimer -= dt;

        // Eye particles & demonic flames
        if (Math.random() < 0.5) {
          this.particles.push({
            x: this.enemy.x + this.enemy.dir * 4,
            y: this.enemy.y - 84,
            vx: -this.enemy.dir * (Math.random() * 2 + 1),
            vy: -Math.random() * 2,
            life: 0.3,
            color: '#ff0033',
            size: 3
          });
        }

        // Distance check: player must not go near boss to avoid attack
        const distToBoss = Math.abs(this.enemy.x - this.player.x);
        const yDistToBoss = Math.abs(this.enemy.y - this.player.y);

        if (distToBoss < 88 && yDistToBoss < 45) {
          // Grab & Throw triggered!
          this.bossAyakashiActive = false;
          this.bossAyakashiGrabbing = true;
          this.bossAyakashiGrabTimer = 0.55;

          // Freeze player
          this.player.vx = 0;
          this.player.vy = 0;
          this.player.isHurt = true;
          this.player.hurtTimer = 0.6;

          // Sound & screen shake
          this.screenShake = 16;
          this.playSamuraiSound('grab');
          this.playSamuraiSound('finisher');

          // Violently slam/hurl player across arena
          this.player.vx = -this.enemy.dir * 12.5;
          this.player.vy = -6.5;
          this.player.isGrounded = false;

          // Reduce player health to half
          this.player.hp = Math.max(1, Math.floor(this.player.hp * 0.5));
          // Posture bar becomes 50% full (player becomes more vulnerable)
          this.player.posture = Math.max(this.player.posture, this.player.maxPosture * 0.5);

          this.createBloodAndSparks(this.player.x, this.player.y - 30);
          this.addCombatMessage("☠️ AYAKASHI SLAM! -50% HP!", this.player.x, this.player.y - 60, '#ef4444', 2.2);

          if (this.player.posture >= this.player.maxPosture) {
            this.breakPosture(this.player);
          }
        } else if (this.bossAyakashiTimer <= 0) {
          // Player successfully kept distance and evaded Ayakashi!
          this.bossAyakashiActive = false;
          this.addCombatMessage("AYAKASHI EVADED!", this.enemy.x, this.enemy.y - 80, '#38bdf8', 1.5);
        }
      }

      if (this.bossAyakashiGrabbing) {
        this.bossAyakashiGrabTimer -= dt;
        if (this.bossAyakashiGrabTimer <= 0) {
          this.bossAyakashiGrabbing = false;
        }
      }
    }

    // 1-Second Streak Decay Timer logic
    if (this.playerStreak > 0) {
      this.playerStreakTimer -= dt;
      if (this.playerStreakTimer <= 0) {
        this.playerStreak = 0;
        this.addCombatMessage("STREAK RESET", this.player.x, this.player.y - 60, '#94a3b8', 0.8);
      }
    }

    if (this.enemyStreak > 0) {
      this.enemyStreakTimer -= dt;
      if (this.enemyStreakTimer <= 0) {
        this.enemyStreak = 0;
      }
    }

    // Delay Inaction Posture Recovery (Rapidly restores posture of both fighters when delaying a fight)
    const timeSinceCombat = this.gameTime - (this.lastCombatActionTime || 0);
    if (timeSinceCombat > 0.7) {
      const delayRestore = dt * 35;
      if (this.player && this.player.posture > 0 && !this.player.isStunned) {
        this.player.posture = Math.max(0, this.player.posture - delayRestore);
      }
      if (this.enemy && this.enemy.posture > 0 && !this.enemy.isStunned) {
        this.enemy.posture = Math.max(0, this.enemy.posture - delayRestore);
      }
    }

    // Stamina Regeneration & Normal Posture Recovery
    if (this.player) {
      this.player.stamina = Math.min(this.player.maxStamina, this.player.stamina + dt * 30);
      if (!this.player.isBlocking && !this.player.isStunned) {
        this.player.posture = Math.max(0, this.player.posture - dt * 15);
      }

      // Smooth Normal Movement & Physics
      let targetVx = 0;
      if (!this.player.isStunned && !this.player.isHurt) {
        const moveLeft = this.keys && (this.keys['KeyA'] || this.keys['ArrowLeft']);
        const moveRight = this.keys && (this.keys['KeyD'] || this.keys['ArrowRight']);
        if (moveLeft && !moveRight) {
          targetVx = -2.6;
          this.player.dir = -1;
        } else if (moveRight && !moveLeft) {
          targetVx = 2.6;
          this.player.dir = 1;
        }
      }

      if (this.player.isDashing) {
        this.player.vx *= 0.90;
      } else if (this.player.isHurt) {
        this.player.vx *= 0.85;
      } else {
        // Normal grounded combat speed with smooth acceleration/deceleration
        this.player.vx = this.player.vx * 0.72 + targetVx * 0.28;
        if (Math.abs(this.player.vx) < 0.05) this.player.vx = 0;
      }

      this.player.x += this.player.vx;
      this.player.y += this.player.vy;

      if (!this.player.isGrounded) {
        this.player.vy += 0.75; // Normal gravity
        if (this.player.y >= 320) {
          this.player.y = 320;
          this.player.vy = 0;
          this.player.isGrounded = true;
        }
      }

      // Bounds
      this.player.x = Math.max(50, Math.min(800 - 50, this.player.x));

      // Timers
      if (this.player.parryWindow > 0) this.player.parryWindow -= dt;
      if (this.player.attackTimer > 0) {
        this.player.attackTimer -= dt;
        if (this.player.attackTimer <= 0) this.player.isAttacking = false;
      }
      if (this.player.dashTimer > 0) {
        this.player.dashTimer -= dt;
        if (this.player.dashTimer <= 0) this.player.isDashing = false;
      }
      if (this.player.hurtTimer > 0) {
        this.player.hurtTimer -= dt;
        if (this.player.hurtTimer <= 0) this.player.isHurt = false;
      }
      if (this.player.isStunned) {
        this.player.stunTimer -= dt;
        if (this.player.stunTimer <= 0) {
          this.player.isStunned = false;
          this.player.posture = 0;
        }
      }

            this.player.animTime += Math.abs(this.player.vx) * 0.22 + (this.player.isAttacking ? dt * 10 : 0);

      // Thrown Weapons Physics & Hit-Testing
      for (let i = this.thrownWeapons.length - 1; i >= 0; i--) {
        const tw = this.thrownWeapons[i];
        if (!tw.grounded) {
          tw.x += tw.vx;
          tw.y += tw.vy;
          tw.vy += 0.42; // Gravity
          tw.rotation += tw.rotSpeed;

          // Ground landing
          if (tw.y >= 320) {
            tw.y = 320;
            tw.grounded = true;
            tw.vx = 0;
            tw.vy = 0;
            this.playSamuraiSound('clash');
            this.createSparks(tw.x, tw.y, '#fbbf24');
          }

          // Hit enemy
          if (tw.active && tw.owner === 'player' && !tw.grounded && this.enemy) {
            const distToEnemy = Math.abs(tw.x - this.enemy.x);
            const yDistToEnemy = Math.abs(tw.y - (this.enemy.y - 25));
            if (distToEnemy < 35 && yDistToEnemy < 40) {
              tw.active = false;
              tw.grounded = true;
              tw.y = 320;
              const hitDmg = tw.damage;
              this.enemy.hp = Math.max(0, this.enemy.hp - hitDmg);
              this.enemy.posture = Math.min(this.enemy.maxPosture, this.enemy.posture + tw.guardDmg);
              this.enemy.isHurt = true;
              this.enemy.hurtTimer = 0.35;
              this.enemy.vx = tw.vx > 0 ? 3.5 : -3.5;
              this.createBloodAndSparks(this.enemy.x, this.enemy.y - 30);
              this.addCombatMessage("BLADE THROW HIT!", this.enemy.x, this.enemy.y - 50, '#fbbf24', 1.5);
              this.playSamuraiSound('clash');
              this.screenShake = 7;
              if (this.enemy.posture >= this.enemy.maxPosture) {
                this.breakPosture(this.enemy);
              }
            }
          }
        }
      }
    }

    // Enemy AI & Physics
    if (this.enemy) {
      this.updateAI(dt);

      this.enemy.x += this.enemy.vx;
      this.enemy.y += this.enemy.vy;
      this.enemy.vx *= 0.85; // Friction

      if (!this.enemy.isGrounded) {
        this.enemy.vy += 0.8;
        if (this.enemy.y >= 320) {
          this.enemy.y = 320;
          this.enemy.vy = 0;
          this.enemy.isGrounded = true;
        }
      }

      this.enemy.x = Math.max(50, Math.min(800 - 50, this.enemy.x));

      if (this.enemy.attackTimer > 0) {
        this.enemy.attackTimer -= dt;
        if (this.enemy.attackTimer <= 0) this.enemy.isAttacking = false;
      }
      if (this.enemy.hurtTimer > 0) {
        this.enemy.hurtTimer -= dt;
        if (this.enemy.hurtTimer <= 0) this.enemy.isHurt = false;
      }
      if (this.enemy.isStunned) {
        this.enemy.stunTimer -= dt;
        if (this.enemy.stunTimer <= 0) {
          this.enemy.isStunned = false;
          this.enemy.posture = 0;
        }
      }

      this.enemy.animTime += dt * 8;
      // Ponytail dynamic physics angle
      this.enemy.ponytailAngle = Math.sin(this.gameTime * 6) * 0.25 - (this.enemy.vx * 0.08);
    }

    // Finisher Cinematic update
    if (this.finisherEffect) {
      this.updateFinisher(dt);
    }
  },

  /* ==========================================================================
     PROCEDURAL REPLACEABLE GANG BACKGROUNDS
     ========================================================================== */
  /* ==========================================================================
     JAPANESE DOJO BACKGROUNDS (REGULAR DOJO FOR ENEMIES · BURNING DOJO FOR BOSSES)
     ========================================================================== */
  drawGangBackground(ctx, gangIdx, time) {
    const w = 800;
    const h = 400;

    const isBoss = (this.enemy && this.enemy.isBoss) || (this.bossLevels && this.bossLevels.includes(this.level));
    const bgImg = isBoss ? this.bgDojoBoss : this.bgDojoRegular;

    if (bgImg && bgImg.complete && bgImg.naturalWidth > 0) {
      // Draw Authentic Japanese Dojo Background
      ctx.drawImage(bgImg, 0, 0, w, h);

      // Subtle atmospheric floor reflection on tatami / polished wood
      ctx.fillStyle = isBoss ? 'rgba(239, 68, 68, 0.08)' : 'rgba(251, 191, 36, 0.05)';
      ctx.fillRect(0, 320, w, h - 320);

      // Luminous floor boundary line at Y = 320
      ctx.strokeStyle = isBoss ? 'rgba(239, 68, 68, 0.6)' : 'rgba(251, 191, 36, 0.45)';
      ctx.lineWidth = 1.5;
      ctx.beginPath();
      ctx.moveTo(0, 320);
      ctx.lineTo(w, 320);
      ctx.stroke();
    } else {
      // High-tech dark dojo fallback while loading
      ctx.fillStyle = isBoss ? '#1a0508' : '#080c16';
      ctx.fillRect(0, 0, w, h);
      ctx.fillStyle = '#0a0e17';
      ctx.fillRect(0, 320, w, 80);
      ctx.strokeStyle = isBoss ? '#ef4444' : '#38bdf8';
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(0, 320);
      ctx.lineTo(w, 320);
      ctx.stroke();
    }

    // Top HUD subtle dark vignette for high contrast and readability
    const topGrad = ctx.createLinearGradient(0, 0, 0, 95);
    topGrad.addColorStop(0, 'rgba(10, 14, 26, 0.82)');
    topGrad.addColorStop(1, 'rgba(10, 14, 26, 0)');
    ctx.fillStyle = topGrad;
    ctx.fillRect(0, 0, w, 95);
  },

  drawBattle(ctx, w, h) {
    // 1. Draw Thrown / Grounded Weapons
    this.drawThrownWeapons(ctx);

    // 2. Ayakashi Red Alert Vignette when active
    if (this.bossAyakashiActive) {
      ctx.save();
      const vGrad = ctx.createRadialGradient(w / 2, h / 2, 160, w / 2, h / 2, 420);
      vGrad.addColorStop(0, 'rgba(239, 68, 68, 0)');
      vGrad.addColorStop(1, 'rgba(239, 68, 68, 0.38)');
      ctx.fillStyle = vGrad;
      ctx.fillRect(0, 0, w, h);
      ctx.restore();
    }

    // 3. Draw Fighters in new Shadow Samurai Style
    this.drawStickman(ctx, this.player, false);
    this.drawStickman(ctx, this.enemy, true);

    // 4. Floating Streaks Behind Fighters
    this.drawFloatingStreaks(ctx);

    // 5. Draw Slash Effects & Projectiles
    this.drawSlashes(ctx);

    // 6. Draw Particles
    this.drawParticles(ctx);

    // 7. Draw Combat Floating Messages
    this.drawCombatMessages(ctx);

    // 8. Draw Minimal Top Combat HUD Bars
    this.drawBattleHUD(ctx, w, h);

    // 9. Boss Intro Cinematic Banner
    if (this.bossIntro && this.bossIntro.active) {
      ctx.save();
      ctx.fillStyle = 'rgba(10, 14, 26, 0.75)';
      ctx.fillRect(0, 140, w, 68);
      ctx.strokeStyle = '#ef4444';
      ctx.lineWidth = 2;
      ctx.strokeRect(0, 140, w, 68);

      ctx.textAlign = 'center';
      ctx.font = '900 24px "Pixelify Sans", sans-serif';
      ctx.fillStyle = '#ef4444';
      ctx.shadowColor = '#ef4444';
      ctx.shadowBlur = 12;
      ctx.fillText(`👑 BOSS LEVEL ${this.level}: ${this.bossIntro.bossName}`, w / 2, 172);
      ctx.shadowBlur = 0;

      ctx.font = 'bold 13px sans-serif';
      ctx.fillStyle = '#cbd5e1';
      ctx.fillText(this.bossIntro.bossTitle.toUpperCase(), w / 2, 194);
      ctx.restore();
    }

    // 10. Draw Finisher Cinematic Overlay
    if (this.finisherEffect) {
      this.drawFinisherCinematic(ctx, w, h);
    }
  },
  drawBattleHUD(ctx, w, h) {
    // Left: Player HUD (HP, Stamina, Posture only)
    ctx.fillStyle = 'rgba(15, 23, 42, 0.88)';
    ctx.strokeStyle = '#38bdf8';
    ctx.lineWidth = 1.5;
    ctx.fillRect(16, 12, 230, 72);
    ctx.strokeRect(16, 12, 230, 72);

    ctx.font = 'bold 13px sans-serif';
    ctx.fillStyle = '#ffffff';
    ctx.textAlign = 'left';
    const wpDisplayName = (this.player.hasWeapon === false || (this.player.weapon && this.player.weapon.id === 'bare_hands'))
      ? 'Bare Fists'
      : (this.player.weapon ? this.player.weapon.name : 'Katana');
    ctx.fillText(`${this.playerName} (${wpDisplayName})`, 24, 28);

    // Player HP Bar (Green)
    this.drawMeter(ctx, 24, 34, 180, 10, this.player.hp, this.player.maxHp, '#22c55e', '#14532d', 'HP');
    // Player Stamina Bar (Cyan)
    this.drawMeter(ctx, 24, 48, 140, 6, this.player.stamina, this.player.maxStamina, '#38bdf8', '#0369a1', 'STAM');
    // Player Posture Bar (Orange/Red)
    this.drawMeter(ctx, 24, 58, 180, 8, this.player.posture, this.player.maxPosture, '#f97316', '#7c2d12', 'POSTURE');

    // Right: Enemy HUD (Enemy Level, HP, Stamina, Posture only - NO place names, NO enemy count)
    ctx.fillStyle = 'rgba(15, 23, 42, 0.88)';
    ctx.strokeStyle = this.enemy.isBoss ? '#ef4444' : '#f472b6';
    ctx.lineWidth = 1.5;
    ctx.fillRect(w - 246, 12, 230, 72);
    ctx.strokeRect(w - 246, 12, 230, 72);

    ctx.font = 'bold 13px sans-serif';
    ctx.fillStyle = this.enemy.color || '#f472b6';
    ctx.textAlign = 'left';
    const enemyTitleStr = this.enemy.isBoss 
      ? `👑 Level ${this.level} - BOSS: ${this.enemy.name}` 
      : `Level ${this.level} (${this.enemy.name})`;
    ctx.fillText(enemyTitleStr, w - 238, 28);

    // Enemy HP Bar
    this.drawMeter(ctx, w - 238, 34, 180, 10, this.enemy.hp, this.enemy.maxHp, '#ef4444', '#7f1d1d', 'HP');
    // Enemy Stamina Bar
    this.drawMeter(ctx, w - 238, 48, 140, 6, this.enemy.stamina, this.enemy.maxStamina, '#a855f7', '#581c87', 'STAM');
    // Enemy Posture Bar
    this.drawMeter(ctx, w - 238, 58, 180, 8, this.enemy.posture, this.enemy.maxPosture, '#fbbf24', '#78350f', 'POSTURE');

    // Center: Live Side Quest Tracker HUD
    if (this.isSideQuest && this.activeQuest) {
      ctx.save();
      const qBoxW = 270;
      const qBoxH = 72;
      const qBoxX = Math.round((w - qBoxW) / 2);
      const qBoxY = 12;

      ctx.fillStyle = 'rgba(15, 23, 42, 0.92)';
      ctx.strokeStyle = '#f59e0b';
      ctx.lineWidth = 1.5;
      ctx.fillRect(qBoxX, qBoxY, qBoxW, qBoxH);
      ctx.strokeRect(qBoxX, qBoxY, qBoxW, qBoxH);

      ctx.textAlign = 'center';
      ctx.font = 'bold 12px sans-serif';
      ctx.fillStyle = '#fbbf24';
      ctx.fillText(`📜 QUEST: ${this.activeQuest.title}`, w / 2, qBoxY + 18);

      if (this.activeQuest.timeLimit > 0) {
        const isUrgent = this.questTimer < 8;
        ctx.font = 'bold 12px "Courier New", monospace';
        ctx.fillStyle = isUrgent ? '#ef4444' : '#38bdf8';
        ctx.fillText(`⏱️ TIME: ${Math.max(0, this.questTimer).toFixed(1)}s / ${this.activeQuest.timeLimit}s`, w / 2, qBoxY + 36);

        // Timer meter
        const pct = Math.max(0, Math.min(1, this.questTimer / this.activeQuest.timeLimit));
        ctx.fillStyle = '#1e293b';
        ctx.fillRect(w / 2 - 90, qBoxY + 43, 180, 5);
        ctx.fillStyle = isUrgent ? '#ef4444' : '#38bdf8';
        ctx.fillRect(w / 2 - 90, qBoxY + 43, 180 * pct, 5);
      } else if (this.activeQuest.requiredParries > 0) {
        const curParries = Math.min(this.activeQuest.requiredParries, this.questParries || 0);
        const pDone = curParries >= this.activeQuest.requiredParries;
        ctx.font = 'bold 12px sans-serif';
        ctx.fillStyle = pDone ? '#22c55e' : '#fbbf24';
        ctx.fillText(`🛡️ PARRIES: ${curParries} / ${this.activeQuest.requiredParries} ${pDone ? '✓ READY' : ''}`, w / 2, qBoxY + 36);

        // Parry meter
        const pct = Math.max(0, Math.min(1, curParries / this.activeQuest.requiredParries));
        ctx.fillStyle = '#1e293b';
        ctx.fillRect(w / 2 - 90, qBoxY + 43, 180, 5);
        ctx.fillStyle = pDone ? '#22c55e' : '#fbbf24';
        ctx.fillRect(w / 2 - 90, qBoxY + 43, 180 * pct, 5);
      } else if (this.activeQuest.unarmedOnly) {
        const isUnarmed = !this.player.hasWeapon;
        ctx.font = 'bold 12px sans-serif';
        ctx.fillStyle = isUnarmed ? '#22c55e' : '#ef4444';
        ctx.fillText(isUnarmed ? '👊 BARE FISTS ONLY (READY)' : '⚠️ WEAPON HELD! PRESS E TO THROW', w / 2, qBoxY + 36);
      }

      ctx.font = '10px sans-serif';
      ctx.fillStyle = '#cbd5e1';
      ctx.fillText(`Bounty: +${this.activeQuest.rewardGold} Ryo · Unlock: ${this.activeQuest.rewardWeaponName}`, w / 2, qBoxY + 63);
      ctx.restore();
    }

    // Live In-Game Combat Controls Reminder Strip
    ctx.font = 'bold 11px sans-serif';
    ctx.fillStyle = 'rgba(255, 255, 255, 0.85)';
    ctx.shadowColor = 'rgba(0, 0, 0, 0.85)';
    ctx.shadowBlur = 4;
    ctx.textAlign = 'center';
    ctx.fillText('A/D: Move | W: Jump | J: Light | K/Enter: Heavy | L: Block | E: Throw Weapon | G: Grab Weapon', w / 2, 388);
    ctx.shadowBlur = 0;
    ctx.textAlign = 'left';
  },

  drawFloatingStreaks(ctx) {
    // 1. Player's Streak -> shown BEHIND the ENEMY (who received the hits)
    if (this.playerStreak > 0 && this.enemy) {
      const scale = this.enemy.scale || 1.0;
      // Enemy faces this.enemy.dir. "Behind" is opposite to facing direction:
      const behindX = this.enemy.x - this.enemy.dir * (48 * scale);
      const behindY = this.enemy.y - (85 * scale);

      ctx.save();
      // Glowing Pill Container
      ctx.fillStyle = 'rgba(15, 23, 42, 0.92)';
      ctx.strokeStyle = '#38bdf8';
      ctx.lineWidth = 2;
      ctx.shadowColor = '#38bdf8';
      ctx.shadowBlur = 8;
      
      const badgeW = 92;
      const badgeH = 28;
      const bx = behindX - badgeW / 2;
      const by = behindY - badgeH / 2;

      ctx.fillRect(bx, by, badgeW, badgeH);
      ctx.strokeRect(bx, by, badgeW, badgeH);
      ctx.shadowBlur = 0;

      // Text: STREAK count
      ctx.font = 'bold 12px sans-serif';
      ctx.fillStyle = '#38bdf8';
      ctx.textAlign = 'center';
      ctx.fillText(`⚡ ${this.playerStreak} STREAK`, behindX, behindY + 4);

      // Streak timer decay gauge underneath
      const tRatio = Math.max(0, this.playerStreakTimer / this.maxStreakTimer);
      ctx.fillStyle = tRatio > 0.4 ? '#38bdf8' : '#ef4444';
      ctx.fillRect(bx + 4, by + badgeH - 4, (badgeW - 8) * tRatio, 3);
      ctx.restore();
    }

    // 2. Enemy's Streak -> shown BEHIND the PLAYER (who received the hits)
    if (this.enemyStreak > 0 && this.player) {
      // Player faces this.player.dir. "Behind" is opposite to facing direction:
      const behindX = this.player.x - this.player.dir * 48;
      const behindY = this.player.y - 85;

      ctx.save();
      // Glowing Pill Container
      ctx.fillStyle = 'rgba(15, 23, 42, 0.92)';
      ctx.strokeStyle = '#ef4444';
      ctx.lineWidth = 2;
      ctx.shadowColor = '#ef4444';
      ctx.shadowBlur = 8;

      const badgeW = 92;
      const badgeH = 28;
      const bx = behindX - badgeW / 2;
      const by = behindY - badgeH / 2;

      ctx.fillRect(bx, by, badgeW, badgeH);
      ctx.strokeRect(bx, by, badgeW, badgeH);
      ctx.shadowBlur = 0;

      // Text: ENEMY STREAK count
      ctx.font = 'bold 12px sans-serif';
      ctx.fillStyle = '#ef4444';
      ctx.textAlign = 'center';
      ctx.fillText(`🔥 ${this.enemyStreak} STREAK`, behindX, behindY + 4);

      // Streak timer decay gauge underneath
      const tRatio = Math.max(0, this.enemyStreakTimer / 1.0);
      ctx.fillStyle = '#ef4444';
      ctx.fillRect(bx + 4, by + badgeH - 4, (badgeW - 8) * tRatio, 3);
      ctx.restore();
    }
  },

  drawMeter(ctx, x, y, width, height, current, max, fillColor, bgColor, label) {
    const ratio = Math.max(0, Math.min(1, current / max));
    ctx.fillStyle = bgColor;
    ctx.fillRect(x, y, width, height);
    ctx.fillStyle = fillColor;
    ctx.fillRect(x, y, width * ratio, height);
    ctx.strokeStyle = '#0f172a';
    ctx.lineWidth = 1;
    ctx.strokeRect(x, y, width, height);
  },
  /* ==========================================================================
     SHADOW SAMURAI / SHINOBI SILHOUETTE RENDERING ENGINE
     Bigger characters, solid gi vest, hakama trousers, firmly grounded feet Y=320,
     Ayakashi glowing red eyes, and fallen/victory stances
     ========================================================================== */
  drawStickman(ctx, f, isEnemy) {
    if (!f) return;
    ctx.save();
    ctx.translate(f.x, f.y);

    const dir = f.dir;
    const isHurt = f.isHurt;
    const isAttacking = f.isAttacking;
    const isBlocking = f.isBlocking;
    const isStunned = f.isStunned;
    const isFallen = f.isFallen;
    const isVictorious = f.isVictorious;

    // Apply scale for Bosses or general scaling (scales upwards from feet at Y=0)
    const scale = f.scale || (f.isBoss ? 1.3 : 1.0);
    if (scale !== 1.0) {
      ctx.scale(scale, scale);
    }

    // Boss Aura Particles
    if (f.isBoss && f.auraColor) {
      ctx.fillStyle = f.auraColor;
      for (let i = 0; i < 4; i++) {
        const ox = (Math.sin(this.gameTime * 5 + i) * 32);
        const oy = -50 + Math.cos(this.gameTime * 4 + i) * 45;
        ctx.beginPath();
        ctx.arc(ox, oy, 9, 0, Math.PI * 2);
        ctx.fill();
      }
    }

    // Floating Overhead Posture Bar
    const pBarW = 46;
    const pBarH = 5;
    const pBarX = -pBarW / 2;
    const pBarY = f.isBoss ? -122 : -106;
    const postRatio = Math.max(0, Math.min(1, f.posture / f.maxPosture));

    ctx.fillStyle = 'rgba(15, 23, 42, 0.9)';
    ctx.fillRect(pBarX - 1, pBarY - 1, pBarW + 2, pBarH + 2);
    ctx.strokeStyle = '#475569';
    ctx.lineWidth = 1;
    ctx.strokeRect(pBarX - 1, pBarY - 1, pBarW + 2, pBarH + 2);

    if (postRatio > 0) {
      const pColor = postRatio > 0.75 ? '#ef4444' : (postRatio > 0.4 ? '#f97316' : '#fbbf24');
      ctx.fillStyle = pColor;
      ctx.fillRect(pBarX, pBarY, pBarW * postRatio, pBarH);
    }

    // 1. DEFEATED FALLEN STANCE (Combat halted, fighter kneels/collapses on floor)
    if (isFallen) {
      ctx.fillStyle = isHurt ? '#ef4444' : '#0b0f19';
      ctx.strokeStyle = isEnemy ? f.color : '#e2e8f0';
      ctx.lineWidth = 2;

      // Kneeling torso & legs on floor
      ctx.beginPath();
      ctx.moveTo(-dir * 12, 0);
      ctx.lineTo(-dir * 4, -18);
      ctx.lineTo(dir * 16, -14);
      ctx.lineTo(dir * 22, 0);
      ctx.closePath();
      ctx.fill();
      ctx.stroke();

      // Slumped head
      ctx.beginPath();
      ctx.arc(dir * 16, -26, 11, 0, Math.PI * 2);
      ctx.fill();
      ctx.stroke();

      ctx.restore();
      return;
    }

    // 2. NORMAL / VICTORIOUS COMBAT SHADOW WARRIOR
    const shadowBodyColor = isHurt ? '#ef4444' : '#0b0f19';
    const accentColor = isEnemy ? f.color : '#38bdf8';

    // SHADOW SAMURAI HEAD & COWL
    ctx.fillStyle = shadowBodyColor;
    ctx.strokeStyle = isHurt ? '#ef4444' : accentColor;
    ctx.lineWidth = 2.5;

    ctx.beginPath();
    // Angular Shinobi Cowl
    ctx.moveTo(0, -94);
    ctx.lineTo(dir * 12, -90);
    ctx.lineTo(dir * 14, -78);
    ctx.lineTo(dir * 8, -66);
    ctx.lineTo(0, -64);
    ctx.lineTo(-dir * 8, -66);
    ctx.lineTo(-dir * 14, -78);
    ctx.lineTo(-dir * 12, -90);
    ctx.closePath();
    ctx.fill();
    ctx.stroke();

    // GLOWING VISOR / EYES
    // When Boss Ayakashi is active -> EYES TURN FIERY RED!
    const isBossAyakashiEyes = isEnemy && f.isBoss && (this.bossAyakashiActive || this.bossAyakashiGrabbing);
    if (isBossAyakashiEyes) {
      ctx.fillStyle = '#ff0033';
      ctx.shadowColor = '#ff0033';
      ctx.shadowBlur = 14;
      ctx.fillRect(dir * 3, -82, dir * 9, 3.5);
      ctx.shadowBlur = 0;
    } else {
      ctx.fillStyle = isEnemy ? (f.isBoss ? '#ef4444' : '#fbbf24') : '#38bdf8';
      ctx.fillRect(dir * 4, -80, dir * 6, 2.5);
    }

    // FEMALE NINJA FEATURE: Dynamic Flowing Ponytail
    if (isEnemy && f.isFemale) {
      ctx.save();
      ctx.translate(-dir * 10, -84);
      ctx.rotate(f.ponytailAngle || 0);

      ctx.fillStyle = '#ec4899';
      ctx.fillRect(-2.5, -2.5, 5, 5);

      ctx.strokeStyle = '#0b0f19';
      ctx.lineWidth = 5;
      ctx.beginPath();
      ctx.moveTo(0, 0);
      ctx.quadraticCurveTo(-dir * 24, 14, -dir * 18, 36);
      ctx.stroke();

      ctx.lineWidth = 3;
      ctx.strokeStyle = f.color;
      ctx.beginPath();
      ctx.moveTo(-dir * 18, 36);
      ctx.lineTo(-dir * 28, 46);
      ctx.stroke();
      ctx.restore();
    }

    // MALE RONIN FEATURE: Wide Conical Straw Kasa Hat
    if (isEnemy && !f.isFemale && !f.isBoss) {
      ctx.fillStyle = '#b45309';
      ctx.beginPath();
      ctx.moveTo(-dir * 24, -86);
      ctx.lineTo(0, -100);
      ctx.lineTo(dir * 24, -86);
      ctx.closePath();
      ctx.fill();
      ctx.strokeStyle = '#78350f';
      ctx.lineWidth = 2;
      ctx.stroke();
    }

    // PLAYER NINJA FEATURE: Flowing Red Scarf
    if (!isEnemy) {
      ctx.strokeStyle = '#ef4444';
      ctx.lineWidth = 4;
      ctx.beginPath();
      ctx.moveTo(0, -66);
      const scarfWave = Math.sin(this.gameTime * 8) * 8;
      ctx.quadraticCurveTo(-dir * 20, -64 + scarfWave, -dir * 38, -58 + scarfWave * 1.5);
      ctx.stroke();
    }

    // BOSS DEMON FEATURE: Demon Horns
    if (f.isBoss) {
      ctx.strokeStyle = isBossAyakashiEyes ? '#ff0033' : '#ef4444';
      ctx.lineWidth = 3.5;
      ctx.beginPath();
      ctx.moveTo(-8, -90);
      ctx.lineTo(-18, -112);
      ctx.stroke();
      ctx.beginPath();
      ctx.moveTo(8, -90);
      ctx.lineTo(18, -112);
      ctx.stroke();
    }

    // ARMORED GI VEST / TORSO SILHOUETTE
    ctx.fillStyle = shadowBodyColor;
    ctx.strokeStyle = isHurt ? '#ef4444' : '#1e293b';
    ctx.lineWidth = 2.5;

    ctx.beginPath();
    ctx.moveTo(-13, -64);
    ctx.lineTo(13, -64);
    ctx.lineTo(8, -28);
    ctx.lineTo(-8, -28);
    ctx.closePath();
    ctx.fill();
    ctx.stroke();

    // Obi Sash Belt at Waist
    ctx.fillStyle = isEnemy ? (f.isBoss ? '#ef4444' : '#a855f7') : '#ef4444';
    ctx.fillRect(-9, -30, 18, 5);

    // Shoulder Pauldrons (Sode)
    ctx.fillStyle = '#1e293b';
    ctx.fillRect(-dir * 17 - 2, -66, 6, 8);
    ctx.fillRect(dir * 13, -66, 6, 8);

    // ARMS & GAUNTLETS
    const handX = isBlocking ? dir * 18 : (isAttacking ? dir * 36 : dir * 20);
    const handY = isBlocking ? -52 : (isAttacking ? -40 : -44);

    ctx.strokeStyle = shadowBodyColor;
    ctx.lineWidth = 4.5;
    ctx.beginPath();
    ctx.moveTo(0, -58);
    ctx.lineTo(handX * 0.5, handY + 6);
    ctx.lineTo(handX, handY);
    ctx.stroke();

    // Armored Gauntlet (Kote)
    ctx.strokeStyle = accentColor;
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.moveTo(handX * 0.5, handY + 6);
    ctx.lineTo(handX, handY);
    ctx.stroke();

    // Draw Equipped Weapon (including Red Lightsaber for player)
    this.drawStickmanWeapon(ctx, f, handX, handY, dir, isAttacking, isBlocking);

    // HAKAMA PLEATED TROUSERS & FIRMLY GROUNDED FEET (End at Y=0 / Y=320)
    const walkAnim = Math.sin(f.animTime) * 12;
    ctx.fillStyle = shadowBodyColor;
    ctx.strokeStyle = shadowBodyColor;
    ctx.lineWidth = 4.5;

    // Front leg: Waist -> Knee -> Ankle -> Flat Sandal on floor Y=0
    ctx.beginPath();
    ctx.moveTo(0, -28);
    ctx.lineTo(dir * 8 + walkAnim, -15);
    ctx.lineTo(dir * 14 + walkAnim, 0);
    ctx.lineTo(dir * 26 + walkAnim, 0);
    ctx.stroke();

    // Back leg: Waist -> Knee -> Ankle -> Flat Sandal on floor Y=0
    ctx.beginPath();
    ctx.moveTo(0, -28);
    ctx.lineTo(-dir * 8 - walkAnim, -15);
    ctx.lineTo(-dir * 12 - walkAnim, 0);
    ctx.lineTo(-dir * 2 - walkAnim, 0);
    ctx.stroke();

    // Shin Wraps (Suneate) Accent
    ctx.strokeStyle = accentColor;
    ctx.lineWidth = 2.5;
    ctx.beginPath();
    ctx.moveTo(dir * 10 + walkAnim, -12);
    ctx.lineTo(dir * 14 + walkAnim, 0);
    ctx.stroke();

    // Dazed Posture Stars
    if (isStunned) {
      ctx.fillStyle = '#fbbf24';
      for (let i = 0; i < 3; i++) {
        const starAngle = this.gameTime * 7 + (i * Math.PI * 2 / 3);
        const starX = Math.cos(starAngle) * 22;
        const starY = -105 + Math.sin(starAngle) * 7;
        ctx.fillRect(starX - 2.5, starY - 2.5, 6, 6);
      }
    }

    ctx.restore();
  },

  drawThrownWeapons(ctx) {
    if (!this.thrownWeapons) return;
    this.thrownWeapons.forEach(tw => {
      ctx.save();
      ctx.translate(tw.x, tw.y);
      if (!tw.grounded) {
        ctx.rotate(tw.rotation);
      } else {
        // Angled in the ground
        ctx.rotate(Math.PI / 4);
      }

      const bladeColor = tw.weapon ? tw.weapon.color : '#e2e8f0';

      // Hilt
      ctx.strokeStyle = '#1e293b';
      ctx.lineWidth = 3;
      ctx.beginPath();
      ctx.moveTo(0, 8);
      ctx.lineTo(0, -2);
      ctx.stroke();

      // Blade
      ctx.strokeStyle = bladeColor;
      ctx.lineWidth = 3.5;
      ctx.beginPath();
      ctx.moveTo(0, -2);
      ctx.lineTo(0, -32);
      ctx.stroke();

      // Ground pickup indicator ring
      if (tw.grounded) {
        ctx.strokeStyle = 'rgba(56, 189, 248, 0.7)';
        ctx.lineWidth = 1.5;
        ctx.beginPath();
        ctx.arc(0, -12, 18, 0, Math.PI * 2);
        ctx.stroke();
      }

      ctx.restore();
    });
  },
  drawStickmanWeapon(ctx, f, hx, hy, dir, isAttacking, isBlocking) {
    const isEnemy = (f === this.enemy);
    if (f.hasWeapon === false || (f.weapon && f.weapon.id === 'bare_hands') || (f.weapon && f.weapon.id === 'enemy_fists')) {
      // Unarmed bare-knuckle fist
      ctx.save();
      ctx.translate(hx, hy);
      ctx.fillStyle = f.isHurt ? '#ef4444' : (f.color || '#e2e8f0');
      ctx.beginPath();
      ctx.arc(dir * (isAttacking ? 8 : 2), isAttacking ? 2 : 0, 5, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();
      return;
    }

    ctx.save();
    ctx.translate(hx, hy);

    let angle = isBlocking ? -Math.PI / 3 * dir : (isAttacking ? Math.PI / 4 * dir : -Math.PI / 6 * dir);
    ctx.rotate(angle);

    const weaponId = f.weaponId || (f.weapon ? f.weapon.id : 'red_lightsaber');
    const bladeColor = f.weapon ? f.weapon.color : f.color;

    if (weaponId === 'red_lightsaber' || (!isEnemy && weaponId === 'katana')) {
      // LONG RED LIGHTSABER (Plasma Katana with multi-layer glowing energy core)
      const saberLen = 68;

      // Metallic hilt with emitter shroud & red activation switch
      ctx.fillStyle = '#1e293b';
      ctx.fillRect(-3, -2, 6, 12);
      ctx.fillStyle = '#64748b';
      ctx.fillRect(-4, -4, 8, 3);
      ctx.fillStyle = '#ff1a40';
      ctx.fillRect(-1.5, 2, 3, 2);

      // 1. Outer Neon Red Bloom
      ctx.shadowColor = '#ff1a40';
      ctx.shadowBlur = 14;
      ctx.strokeStyle = 'rgba(255, 26, 64, 0.45)';
      ctx.lineWidth = 10;
      ctx.beginPath();
      ctx.moveTo(0, -4);
      ctx.lineTo(0, -4 - saberLen);
      ctx.stroke();

      // 2. Mid Intense Plasma Beam
      ctx.strokeStyle = '#ff1a40';
      ctx.lineWidth = 5;
      ctx.beginPath();
      ctx.moveTo(0, -4);
      ctx.lineTo(0, -4 - saberLen);
      ctx.stroke();

      // 3. Superheated Brilliant White Center Core
      ctx.shadowBlur = 0;
      ctx.strokeStyle = '#ffffff';
      ctx.lineWidth = 2.2;
      ctx.beginPath();
      ctx.moveTo(0, -4);
      ctx.lineTo(0, -4 - saberLen);
      ctx.stroke();

      // 4. Emitter Lens Flare
      ctx.fillStyle = '#ffffff';
      ctx.beginPath();
      ctx.arc(0, -4, 3, 0, Math.PI * 2);
      ctx.fill();

    } else if (weaponId === 'naginata') {
      // Naginata Spear
      ctx.strokeStyle = '#b45309';
      ctx.lineWidth = 3;
      ctx.beginPath();
      ctx.moveTo(0, 16);
      ctx.lineTo(0, -55);
      ctx.stroke();
      ctx.strokeStyle = bladeColor;
      ctx.lineWidth = 4;
      ctx.beginPath();
      ctx.moveTo(0, -55);
      ctx.quadraticCurveTo(dir * 8, -70, dir * 12, -78);
      ctx.stroke();

    } else if (weaponId === 'kanabo') {
      // Kanabō Warclub
      ctx.fillStyle = '#3f3f46';
      ctx.fillRect(-5, -45, 10, 42);
      ctx.fillStyle = '#fbbf24';
      ctx.fillRect(-6, -38, 12, 4);
      ctx.fillRect(-6, -24, 12, 4);

    } else if (weaponId === 'frost_scythe' || weaponId === 'voidreaver') {
      // Scythe Blade
      ctx.strokeStyle = '#1e293b';
      ctx.lineWidth = 3;
      ctx.beginPath();
      ctx.moveTo(0, 15);
      ctx.lineTo(0, -50);
      ctx.stroke();
      ctx.strokeStyle = bladeColor;
      ctx.lineWidth = 4;
      ctx.beginPath();
      ctx.moveTo(0, -50);
      ctx.quadraticCurveTo(dir * 25, -55, dir * 35, -35);
      ctx.stroke();

    } else {
      // Standard Katana / Wakizashi / Odachi
      const len = weaponId === 'dragon_odachi' ? 65 : (weaponId === 'wakizashi' ? 32 : 46);
      ctx.strokeStyle = '#1e293b';
      ctx.lineWidth = 3;
      ctx.beginPath();
      ctx.moveTo(0, 6);
      ctx.lineTo(0, 0);
      ctx.stroke();

      ctx.strokeStyle = bladeColor;
      ctx.lineWidth = weaponId === 'dragon_odachi' ? 4.5 : 3;
      ctx.beginPath();
      ctx.moveTo(0, 0);
      ctx.lineTo(dir * 6, -len);
      ctx.stroke();
    }

    ctx.restore();
  },

  drawSlashes(ctx) {
    for (let i = this.slashes.length - 1; i >= 0; i--) {
      const s = this.slashes[i];
      s.life -= 0.016;

      ctx.save();
      ctx.strokeStyle = s.color;
      ctx.lineWidth = s.type === 'heavy' ? 4 : 2.5;

      ctx.beginPath();
      ctx.arc(s.x, s.y, s.size, -0.6 * s.dir, 0.6 * s.dir, s.dir < 0);
      ctx.stroke();
      ctx.restore();

      if (s.life <= 0) {
        this.slashes.splice(i, 1);
      }
    }
  },

  drawParticles(ctx) {
    for (let i = this.particles.length - 1; i >= 0; i--) {
      const p = this.particles[i];
      p.x += p.vx;
      p.y += p.vy;
      p.life -= 0.016;

      ctx.fillStyle = p.color;
      ctx.fillRect(p.x, p.y, p.size, p.size);

      if (p.life <= 0) {
        this.particles.splice(i, 1);
      }
    }
  },

  createSparks(x, y, color) {
    for (let i = 0; i < 14; i++) {
      this.particles.push({
        x: x,
        y: y,
        vx: (Math.random() - 0.5) * 8,
        vy: (Math.random() - 0.5) * 8,
        life: 0.25,
        color: color || '#fbbf24',
        size: 3
      });
    }
  },

  createBloodAndSparks(x, y) {
    for (let i = 0; i < 18; i++) {
      this.particles.push({
        x: x,
        y: y,
        vx: (Math.random() - 0.5) * 7,
        vy: (Math.random() - 0.5) * 7,
        life: 0.35,
        color: Math.random() > 0.4 ? '#ef4444' : '#fbbf24',
        size: 3
      });
    }
  },

  addCombatMessage(text, x, y, color, duration) {
    this.combatMessages.push({
      text: text,
      x: x,
      y: y,
      color: color,
      life: duration,
      maxLife: duration
    });
  },

  drawCombatMessages(ctx) {
    for (let i = this.combatMessages.length - 1; i >= 0; i--) {
      const m = this.combatMessages[i];
      m.life -= 0.016;
      m.y -= 0.5;

      const alpha = Math.max(0, m.life / m.maxLife);
      ctx.save();
      ctx.globalAlpha = alpha;
      ctx.font = '900 16px sans-serif';
      ctx.fillStyle = m.color;
      ctx.textAlign = 'center';
      ctx.shadowColor = '#000000';
      ctx.shadowBlur = 6;
      ctx.fillText(m.text, m.x, m.y);
      ctx.restore();

      if (m.life <= 0) {
        this.combatMessages.splice(i, 1);
      }
    }
  },

  drawFinisherCinematic(ctx, w, h) {
    const f = this.finisherEffect;
    ctx.save();
    
    // Dim background
    ctx.fillStyle = 'rgba(10, 10, 18, 0.82)';
    ctx.fillRect(0, 0, w, h);

    // Dynamic Slicing Cut Line across screen
    ctx.strokeStyle = f.victor === 'player' ? '#38bdf8' : '#ef4444';
    ctx.lineWidth = 4;
    ctx.beginPath();
    ctx.moveTo(40, 260);
    ctx.lineTo(w - 40, 140);
    ctx.stroke();

    // Epic Japanese Calligraphy Kanji: "æ–¬" (Slay / Zan)
    ctx.font = '900 90px "Pixelify Sans", "Yu Gothic", sans-serif';
    ctx.fillStyle = f.victor === 'player' ? '#f43f5e' : '#ef4444';
    ctx.textAlign = 'center';
    ctx.shadowColor = '#000000';
    ctx.shadowBlur = 18;
    ctx.fillText('æ–¬', w / 2, 210);

    ctx.font = 'bold 22px sans-serif';
    ctx.fillStyle = '#ffffff';
    ctx.fillText(f.victor === 'player' ? 'SAMURAI EXECUTION!' : 'YOU WERE SLAIN!', w / 2, 260);

    ctx.restore();
  },

  /* ==========================================================================
     MENUS & SHOP UI
     ========================================================================== */
  drawMainMenu(ctx, w, h) {
    this.uiBounds = [];

    // Title Card
    ctx.fillStyle = 'rgba(11, 15, 25, 0.88)';
    ctx.fillRect(80, 25, w - 160, 350);
    ctx.strokeStyle = '#38bdf8';
    ctx.lineWidth = 2;
    ctx.strokeRect(80, 25, w - 160, 350);

    ctx.textAlign = 'center';
    ctx.font = '900 32px "Pixelify Sans", sans-serif';
    ctx.fillStyle = '#38bdf8';
    ctx.shadowColor = 'rgba(56, 189, 248, 0.5)';
    ctx.shadowBlur = 12;
    ctx.fillText('StickSaw', w / 2, 68);
    ctx.shadowBlur = 0;

    ctx.font = 'bold 12px sans-serif';
    ctx.fillStyle = '#94a3b8';
    ctx.fillText('2D Samurai Duel | Epic Boss Encounters | Lethal Combo Combat', w / 2, 90);

    // Player Name Input Box
    ctx.fillStyle = '#1e293b';
    ctx.strokeStyle = this.isEditingName ? '#38bdf8' : '#475569';
    ctx.fillRect(w / 2 - 120, 106, 240, 32);
    ctx.strokeRect(w / 2 - 120, 106, 240, 32);

    ctx.font = 'bold 14px sans-serif';
    ctx.fillStyle = '#ffffff';
    const cursor = (this.isEditingName && Math.floor(this.gameTime * 2) % 2 === 0) ? '|' : '';
    ctx.fillText(`Player: ${this.playerName}${cursor}`, w / 2, 127);
    this.registerUiClick('edit_name', w / 2 - 120, 106, 240, 32);

    // Difficulty Selector: [EASY] [NORMAL] [HARD]
    ctx.font = 'bold 12px sans-serif';
    ctx.fillStyle = '#cbd5e1';
    ctx.fillText('Difficulty Mode:', w / 2, 158);

    const diffs = ['easy', 'normal', 'hard'];
    diffs.forEach((d, idx) => {
      const bx = w / 2 - 135 + idx * 95;
      const isSelected = this.difficulty === d;
      ctx.fillStyle = isSelected ? '#38bdf8' : '#1e293b';
      ctx.fillRect(bx, 168, 80, 28);
      ctx.strokeStyle = isSelected ? '#ffffff' : '#475569';
      ctx.strokeRect(bx, 168, 80, 28);

      ctx.fillStyle = isSelected ? '#0f172a' : '#94a3b8';
      ctx.font = 'bold 11px sans-serif';
      ctx.fillText(d.toUpperCase(), bx + 40, 186);
      this.registerUiClick(`diff_${d}`, bx, 168, 80, 28);
    });

    // Main Action Buttons
    const btnW = 260;
    const btnX = w / 2 - btnW / 2;

    // 1. Start Duel Button
    ctx.fillStyle = '#22c55e';
    ctx.fillRect(btnX, 206, btnW, 34);
    ctx.strokeStyle = '#86efac';
    ctx.lineWidth = 1.5;
    ctx.strokeRect(btnX, 206, btnW, 34);
    ctx.fillStyle = '#ffffff';
    ctx.font = 'bold 15px sans-serif';
    ctx.fillText('⚔️ START DUEL (ARCADE)', w / 2, 228);
    this.registerUiClick('start_duel', btnX, 206, btnW, 34);

    // 2. Play Side Quest (Bounty Board) Button
    ctx.fillStyle = '#d97706';
    ctx.fillRect(btnX, 246, btnW, 34);
    ctx.strokeStyle = '#fde047';
    ctx.lineWidth = 1.5;
    ctx.strokeRect(btnX, 246, btnW, 34);
    ctx.fillStyle = '#ffffff';
    ctx.font = 'bold 14px sans-serif';
    ctx.fillText('📜 PLAY SIDE QUEST (BOUNTY)', w / 2, 268);
    this.registerUiClick('open_quests', btnX, 246, btnW, 34);

    // 3. Weapon Shop Button
    ctx.fillStyle = '#7c3aed';
    ctx.fillRect(btnX, 286, btnW, 32);
    ctx.strokeStyle = '#c4b5fd';
    ctx.lineWidth = 1.5;
    ctx.strokeRect(btnX, 286, btnW, 32);
    ctx.fillStyle = '#ffffff';
    ctx.font = 'bold 13px sans-serif';
    ctx.fillText(`🛒 WEAPON SHOP (${this.gold} Ryo)`, w / 2, 307);
    this.registerUiClick('open_shop', btnX, 286, btnW, 32);

    // Controls Footer
    ctx.font = '11px sans-serif';
    ctx.fillStyle = '#94a3b8';
    ctx.fillText('A/D: Move | W: Jump | J: Light Attack | K/Enter: Heavy Attack | L: Block | E: Throw | G: Grab', w / 2, 336);
    ctx.fillText('Shortcuts: [Space] Duel | [Q] Side Quests | [S] Weapon Shop | [Esc] Back', w / 2, 354);
    ctx.textAlign = 'left';
  },

  drawWeaponShop(ctx, w, h) {
    this.uiBounds = [];

    ctx.fillStyle = 'rgba(11, 15, 25, 0.94)';
    ctx.fillRect(40, 15, w - 80, 370);
    ctx.strokeStyle = '#a855f7';
    ctx.lineWidth = 2;
    ctx.strokeRect(40, 15, w - 80, 370);

    ctx.textAlign = 'center';
    ctx.font = '900 22px "Pixelify Sans", sans-serif';
    ctx.fillStyle = '#c084fc';
    ctx.fillText(`SAMURAI WEAPON SHOP · ${this.gold} Ryo`, w / 2, 44);

    // Grid of 6 weapons
    this.weapons.forEach((wp, idx) => {
      const col = idx % 3;
      const row = Math.floor(idx / 3);
      const bx = 65 + col * 230;
      const by = 60 + row * 135;
      const isEquipped = this.currentWeaponIndex === idx;

      ctx.fillStyle = isEquipped ? 'rgba(168, 85, 247, 0.25)' : '#1e293b';
      ctx.fillRect(bx, by, 215, 120);
      ctx.strokeStyle = isEquipped ? '#a855f7' : '#334155';
      ctx.lineWidth = isEquipped ? 2 : 1;
      ctx.strokeRect(bx, by, 215, 120);

      // Weapon Name
      ctx.textAlign = 'left';
      ctx.font = 'bold 13px sans-serif';
      ctx.fillStyle = wp.color;
      ctx.fillText(wp.name, bx + 10, by + 22);

      // Stats
      ctx.font = '11px sans-serif';
      ctx.fillStyle = '#94a3b8';
      ctx.fillText(`DMG: ${wp.damage}  |  Guard Dmg: +${wp.postureDmg}`, bx + 10, by + 40);
      ctx.fillText(`Speed: x${wp.speed} | Streak Grace: +${wp.streakGrace}s`, bx + 10, by + 56);
      ctx.fillText(`Level: ${wp.lvl} / 5`, bx + 10, by + 72);

      // Action Button: Equip or Buy or Upgrade
      if (!wp.unlocked) {
        // Buy Button
        const canBuy = this.gold >= wp.cost;
        ctx.fillStyle = canBuy ? '#22c55e' : '#475569';
        ctx.fillRect(bx + 10, by + 84, 195, 26);
        ctx.fillStyle = '#ffffff';
        ctx.textAlign = 'center';
        ctx.font = 'bold 11px sans-serif';
        ctx.fillText(`BUY (${wp.cost} Ryo)`, bx + 107, by + 101);
        this.registerUiClick(`buy_weapon_${idx}`, bx + 10, by + 84, 195, 26);
      } else {
        // Equip / Equipped
        if (!isEquipped) {
          ctx.fillStyle = '#38bdf8';
          ctx.fillRect(bx + 10, by + 84, 90, 26);
          ctx.fillStyle = '#0f172a';
          ctx.textAlign = 'center';
          ctx.font = 'bold 11px sans-serif';
          ctx.fillText('EQUIP', bx + 55, by + 101);
          this.registerUiClick(`equip_weapon_${idx}`, bx + 10, by + 84, 90, 26);
        } else {
          ctx.fillStyle = '#10b981';
          ctx.fillRect(bx + 10, by + 84, 90, 26);
          ctx.fillStyle = '#ffffff';
          ctx.textAlign = 'center';
          ctx.font = 'bold 11px sans-serif';
          ctx.fillText('EQUIPPED', bx + 55, by + 101);
        }

        // Upgrade Button
        const upCost = wp.lvl * 90;
        const canUpgrade = wp.lvl < 5 && this.gold >= upCost;
        ctx.fillStyle = wp.lvl >= 5 ? '#334155' : (canUpgrade ? '#f59e0b' : '#475569');
        ctx.fillRect(bx + 110, by + 84, 95, 26);
        ctx.fillStyle = '#ffffff';
        ctx.textAlign = 'center';
        ctx.font = 'bold 10px sans-serif';
        ctx.fillText(wp.lvl >= 5 ? "MAX LEVEL" : `UP (${upCost} Ryo)`, bx + 157, by + 101);
        if (wp.lvl < 5) {
          this.registerUiClick(`upgrade_weapon_${idx}`, bx + 110, by + 84, 95, 26);
        }
      }
    });

    // Close Button
    ctx.fillStyle = '#ef4444';
    ctx.fillRect(w / 2 - 70, 345, 140, 30);
    ctx.fillStyle = '#ffffff';
    ctx.textAlign = 'center';
    ctx.font = 'bold 13px sans-serif';
    ctx.fillText('BACK TO MENU', w / 2, 365);
    this.registerUiClick('close_shop', w / 2 - 70, 345, 140, 30);
    ctx.textAlign = 'left';
  },

  drawGangClear(ctx, w, h) {
    this.uiBounds = [];
    ctx.fillStyle = 'rgba(11, 15, 25, 0.9)';
    ctx.fillRect(100, 50, w - 200, 300);
    ctx.strokeStyle = '#22c55e';
    ctx.lineWidth = 2;
    ctx.strokeRect(100, 50, w - 200, 300);

    ctx.textAlign = 'center';
    ctx.font = '900 28px "Pixelify Sans", sans-serif';
    ctx.fillStyle = '#4ade80';
    ctx.fillText('GANG CONQUERED!', w / 2, 110);

    // Stage cleared
    ctx.font = 'bold 16px sans-serif';
    ctx.fillStyle = '#ffffff';
    ctx.fillText(`Level ${this.level} Conquered!`, w / 2, 150);
    ctx.fillStyle = '#fbbf24';
    ctx.fillText("Reward: +150 Ryo & Next Level Unlocked!", w / 2, 185);

    // Next Gang Button
    ctx.fillStyle = '#22c55e';
    ctx.fillRect(w / 2 - 110, 220, 220, 38);
    ctx.fillStyle = '#ffffff';
    ctx.font = 'bold 15px sans-serif';
    ctx.fillText('NEXT GANG DUEL', w / 2, 244);
    this.registerUiClick('start_duel', w / 2 - 110, 220, 220, 38);

    // Shop Button
    ctx.fillStyle = '#8b5cf6';
    ctx.fillRect(w / 2 - 110, 270, 220, 34);
    ctx.fillStyle = '#ffffff';
    ctx.font = 'bold 13px sans-serif';
    ctx.fillText('UPGRADE WEAPONS', w / 2, 292);
    this.registerUiClick('open_shop', w / 2 - 110, 270, 220, 34);
    ctx.textAlign = 'left';
  },

  /* ==========================================================================
     PLAYABLE SIDE QUEST UI (SHINOBI BOUNTY BOARD)
     ========================================================================== */
  drawSideQuestSelect(ctx, w, h) {
    this.uiBounds = [];

    // Backdrop Board
    ctx.fillStyle = 'rgba(11, 15, 25, 0.94)';
    ctx.fillRect(30, 15, w - 60, 370);
    ctx.strokeStyle = '#f59e0b';
    ctx.lineWidth = 2;
    ctx.strokeRect(30, 15, w - 60, 370);

    // Header
    ctx.textAlign = 'center';
    ctx.font = '900 22px "Pixelify Sans", sans-serif';
    ctx.fillStyle = '#fbbf24';
    ctx.shadowColor = 'rgba(245, 158, 11, 0.4)';
    ctx.shadowBlur = 10;
    ctx.fillText('📜 SHINOBI BOUNTY BOARD · PLAYABLE SIDE QUESTS', w / 2, 45);
    ctx.shadowBlur = 0;

    ctx.font = '11px sans-serif';
    ctx.fillStyle = '#94a3b8';
    ctx.fillText('Accept specialized combat trials. Defeat bounty targets to claim heavy Ryo & unlock rare weapons.', w / 2, 64);

    // 3 Side Quest Bounty Cards
    const cardW = 226;
    const cardH = 245;
    const startX = 47;
    const gap = 16;
    const cardY = 76;

    this.sideQuests.forEach((q, idx) => {
      const cx = startX + idx * (cardW + gap);

      // Card Background
      ctx.fillStyle = q.completed ? 'rgba(34, 197, 94, 0.08)' : 'rgba(30, 41, 59, 0.9)';
      ctx.fillRect(cx, cardY, cardW, cardH);
      ctx.strokeStyle = q.completed ? '#22c55e' : (q.badgeColor || '#64748b');
      ctx.lineWidth = 1.5;
      ctx.strokeRect(cx, cardY, cardW, cardH);

      // Top Badge
      ctx.fillStyle = q.badgeColor || '#38bdf8';
      ctx.fillRect(cx + 8, cardY + 8, cardW - 16, 20);
      ctx.fillStyle = '#0f172a';
      ctx.font = '900 11px sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText(q.badge, cx + cardW / 2, cardY + 22);

      // Quest Title
      ctx.fillStyle = '#ffffff';
      ctx.font = 'bold 14px sans-serif';
      ctx.fillText(q.title, cx + cardW / 2, cardY + 46);

      // Target Name
      ctx.font = '11px sans-serif';
      ctx.fillStyle = q.targetColor || '#f472b6';
      ctx.fillText(`Target: ${q.targetName}`, cx + cardW / 2, cardY + 63);

      // Description lines
      ctx.font = '11px sans-serif';
      ctx.fillStyle = '#cbd5e1';
      ctx.fillText(q.descLine1, cx + cardW / 2, cardY + 85);
      ctx.fillText(q.descLine2, cx + cardW / 2, cardY + 101);

      // Condition Tag
      ctx.fillStyle = '#0f172a';
      ctx.fillRect(cx + 12, cardY + 114, cardW - 24, 22);
      ctx.strokeStyle = '#475569';
      ctx.lineWidth = 1;
      ctx.strokeRect(cx + 12, cardY + 114, cardW - 24, 22);
      ctx.font = 'bold 10px monospace';
      ctx.fillStyle = '#fbbf24';
      let condText = '';
      if (q.timeLimit > 0) condText = `⏱️ TIME LIMIT: ${q.timeLimit}s`;
      else if (q.requiredParries > 0) condText = `🛡️ PARRY REQUIRED: ${q.requiredParries}x`;
      else if (q.unarmedOnly) condText = `👊 BARE FISTS ONLY`;
      ctx.fillText(condText, cx + cardW / 2, cardY + 129);

      // Reward Box
      ctx.font = 'bold 11px sans-serif';
      ctx.fillStyle = '#38bdf8';
      ctx.fillText(`💰 Bounty: +${q.rewardGold} Ryo`, cx + cardW / 2, cardY + 154);
      ctx.font = '10px sans-serif';
      ctx.fillStyle = '#a855f7';
      ctx.fillText(`🎁 Unlock: ${q.rewardWeaponName}`, cx + cardW / 2, cardY + 170);

      // Completion status indicator
      if (q.completed) {
        ctx.fillStyle = '#22c55e';
        ctx.font = 'bold 11px sans-serif';
        ctx.fillText('✓ CLEARED', cx + cardW / 2, cardY + 188);
      }

      // Action Button
      const btnBtnY = cardY + 196;
      const btnBtnH = 34;
      const btnBtnW = cardW - 28;
      const btnBtnX = cx + 14;

      ctx.fillStyle = q.completed ? '#1e293b' : '#f59e0b';
      ctx.fillRect(btnBtnX, btnBtnY, btnBtnW, btnBtnH);
      ctx.strokeStyle = q.completed ? '#22c55e' : '#fef08a';
      ctx.lineWidth = 1.5;
      ctx.strokeRect(btnBtnX, btnBtnY, btnBtnW, btnBtnH);

      ctx.fillStyle = q.completed ? '#22c55e' : '#0f172a';
      ctx.font = 'bold 12px sans-serif';
      ctx.fillText(q.completed ? 'PLAY AGAIN ⚡' : 'ACCEPT BOUNTY ⚔️', btnBtnX + btnBtnW / 2, btnBtnY + 22);
      this.registerUiClick('start_quest_' + q.id, btnBtnX, btnBtnY, btnBtnW, btnBtnH);
    });

    // Return to Menu Button
    const backW = 180;
    const backH = 32;
    const backX = w / 2 - backW / 2;
    const backY = 336;

    ctx.fillStyle = '#334155';
    ctx.fillRect(backX, backY, backW, backH);
    ctx.strokeStyle = '#94a3b8';
    ctx.lineWidth = 1.5;
    ctx.strokeRect(backX, backY, backW, backH);

    ctx.fillStyle = '#ffffff';
    ctx.font = 'bold 12px sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText('← RETURN TO MENU [ESC]', w / 2, backY + 21);
    this.registerUiClick('open_menu', backX, backY, backW, backH);
    ctx.textAlign = 'left';
  },

  drawQuestVictory(ctx, w, h) {
    this.uiBounds = [];

    // Modal Background
    ctx.fillStyle = 'rgba(10, 16, 28, 0.96)';
    ctx.fillRect(100, 35, w - 200, 330);
    ctx.strokeStyle = '#22c55e';
    ctx.lineWidth = 2.5;
    ctx.strokeRect(100, 35, w - 200, 330);

    ctx.textAlign = 'center';
    ctx.font = '900 28px "Pixelify Sans", sans-serif';
    ctx.fillStyle = '#22c55e';
    ctx.shadowColor = 'rgba(34, 197, 94, 0.5)';
    ctx.shadowBlur = 12;
    ctx.fillText('🎉 BOUNTY COMPLETED! 🎉', w / 2, 85);
    ctx.shadowBlur = 0;

    const q = this.activeQuest || this.sideQuests[0];
    ctx.font = 'bold 18px sans-serif';
    ctx.fillStyle = '#ffffff';
    ctx.fillText(q.title, w / 2, 118);

    ctx.font = '13px sans-serif';
    ctx.fillStyle = '#94a3b8';
    ctx.fillText(`Eliminated target: ${q.targetName}`, w / 2, 142);

    // Rewards Card
    ctx.fillStyle = 'rgba(34, 197, 94, 0.12)';
    ctx.fillRect(w / 2 - 160, 156, 320, 75);
    ctx.strokeStyle = '#22c55e';
    ctx.lineWidth = 1;
    ctx.strokeRect(w / 2 - 160, 156, 320, 75);

    ctx.font = 'bold 15px sans-serif';
    ctx.fillStyle = '#fbbf24';
    ctx.fillText(`💰 Bounty Claimed: +${q.rewardGold} Ryo!`, w / 2, 185);

    ctx.font = 'bold 13px sans-serif';
    ctx.fillStyle = '#38bdf8';
    ctx.fillText(`⚔️ Weapon Unlocked: ${q.rewardWeaponName}`, w / 2, 212);

    // Action Buttons
    const btnW = 145;
    const btnH = 36;
    const btnY = 285;

    // Button 1: More Quests
    const b1X = w / 2 - btnW - 10;
    ctx.fillStyle = '#f59e0b';
    ctx.fillRect(b1X, btnY, btnW, btnH);
    ctx.strokeStyle = '#fef08a';
    ctx.lineWidth = 1.5;
    ctx.strokeRect(b1X, btnY, btnW, btnH);
    ctx.fillStyle = '#0f172a';
    ctx.font = 'bold 13px sans-serif';
    ctx.fillText('📜 MORE BOUNTIES', b1X + btnW / 2, btnY + 23);
    this.registerUiClick('open_quests', b1X, btnY, btnW, btnH);

    // Button 2: Main Menu
    const b2X = w / 2 + 10;
    ctx.fillStyle = '#334155';
    ctx.fillRect(b2X, btnY, btnW, btnH);
    ctx.strokeStyle = '#94a3b8';
    ctx.lineWidth = 1.5;
    ctx.strokeRect(b2X, btnY, btnW, btnH);
    ctx.fillStyle = '#ffffff';
    ctx.font = 'bold 13px sans-serif';
    ctx.fillText('🏠 MAIN MENU', b2X + btnW / 2, btnY + 23);
    this.registerUiClick('open_menu', b2X, btnY, btnW, btnH);
    ctx.textAlign = 'left';
  },

  drawQuestFailed(ctx, w, h) {
    this.uiBounds = [];

    // Modal Background
    ctx.fillStyle = 'rgba(20, 10, 15, 0.96)';
    ctx.fillRect(100, 35, w - 200, 330);
    ctx.strokeStyle = '#ef4444';
    ctx.lineWidth = 2.5;
    ctx.strokeRect(100, 35, w - 200, 330);

    ctx.textAlign = 'center';
    ctx.font = '900 28px "Pixelify Sans", sans-serif';
    ctx.fillStyle = '#ef4444';
    ctx.shadowColor = 'rgba(239, 68, 68, 0.5)';
    ctx.shadowBlur = 12;
    ctx.fillText('💀 BOUNTY FAILED 💀', w / 2, 85);
    ctx.shadowBlur = 0;

    const q = this.activeQuest || this.sideQuests[0];
    ctx.font = 'bold 18px sans-serif';
    ctx.fillStyle = '#ffffff';
    ctx.fillText(q.title, w / 2, 118);

    // Failure Reason Card
    ctx.fillStyle = 'rgba(239, 68, 68, 0.12)';
    ctx.fillRect(w / 2 - 160, 140, 320, 68);
    ctx.strokeStyle = '#ef4444';
    ctx.lineWidth = 1;
    ctx.strokeRect(w / 2 - 160, 140, 320, 68);

    ctx.font = 'bold 13px sans-serif';
    ctx.fillStyle = '#fca5a5';
    ctx.fillText('FAILED CONDITION:', w / 2, 162);
    ctx.font = '12px sans-serif';
    ctx.fillStyle = '#ffffff';
    ctx.fillText(this.questFailReason || 'Defeated before achieving trial objective.', w / 2, 185);

    ctx.font = '13px sans-serif';
    ctx.fillStyle = '#94a3b8';
    ctx.fillText(`Target survived: ${q.targetName}`, w / 2, 235);

    // Action Buttons
    const btnW = 145;
    const btnH = 36;
    const btnY = 285;

    // Button 1: Retry
    const b1X = w / 2 - btnW - 10;
    ctx.fillStyle = '#ef4444';
    ctx.fillRect(b1X, btnY, btnW, btnH);
    ctx.strokeStyle = '#fca5a5';
    ctx.lineWidth = 1.5;
    ctx.strokeRect(b1X, btnY, btnW, btnH);
    ctx.fillStyle = '#ffffff';
    ctx.font = 'bold 13px sans-serif';
    ctx.fillText('🔄 RETRY QUEST', b1X + btnW / 2, btnY + 23);
    this.registerUiClick('retry_quest', b1X, btnY, btnW, btnH);

    // Button 2: Bounty Board
    const b2X = w / 2 + 10;
    ctx.fillStyle = '#334155';
    ctx.fillRect(b2X, btnY, btnW, btnH);
    ctx.strokeStyle = '#94a3b8';
    ctx.lineWidth = 1.5;
    ctx.strokeRect(b2X, btnY, btnW, btnH);
    ctx.fillStyle = '#ffffff';
    ctx.font = 'bold 13px sans-serif';
    ctx.fillText('📜 BOUNTY BOARD', b2X + btnW / 2, btnY + 23);
    this.registerUiClick('open_quests', b2X, btnY, btnW, btnH);
    ctx.textAlign = 'left';
  },

  drawGameOver(ctx, w, h) {
    this.uiBounds = [];
    ctx.fillStyle = 'rgba(11, 15, 25, 0.92)';
    ctx.fillRect(100, 50, w - 200, 300);
    ctx.strokeStyle = '#ef4444';
    ctx.lineWidth = 2;
    ctx.strokeRect(100, 50, w - 200, 300);

    ctx.textAlign = 'center';
    ctx.font = '900 30px "Pixelify Sans", sans-serif';
    ctx.fillStyle = '#ef4444';
    ctx.fillText('DEFEATED', w / 2, 115);

    ctx.font = '14px sans-serif';
    ctx.fillStyle = '#94a3b8';
    ctx.fillText('Your blade was halted. Recover your honor.', w / 2, 155);

    ctx.fillStyle = '#ef4444';
    ctx.fillRect(w / 2 - 100, 200, 200, 38);
    ctx.fillStyle = '#ffffff';
    ctx.font = 'bold 15px sans-serif';
    ctx.fillText('RETRY DUEL', w / 2, 224);
    this.registerUiClick('start_duel', w / 2 - 100, 200, 200, 38);

    ctx.fillStyle = '#334155';
    ctx.fillRect(w / 2 - 100, 255, 200, 34);
    ctx.fillStyle = '#ffffff';
    ctx.font = 'bold 13px sans-serif';
    ctx.fillText('MAIN MENU', w / 2, 277);
    this.registerUiClick('open_menu', w / 2 - 100, 255, 200, 34);
    ctx.textAlign = 'left';
  },

  drawVictory(ctx, w, h) {
    this.uiBounds = [];
    ctx.fillStyle = 'rgba(11, 15, 25, 0.94)';
    ctx.fillRect(80, 40, w - 160, 320);
    ctx.strokeStyle = '#fbbf24';
    ctx.lineWidth = 3;
    ctx.strokeRect(80, 40, w - 160, 320);

    ctx.textAlign = 'center';
    ctx.font = '900 32px "Pixelify Sans", sans-serif';
    ctx.fillStyle = '#fbbf24';
    ctx.fillText('StickSaw - GRANDMASTER', w / 2, 105);

    ctx.font = 'bold 16px sans-serif';
    ctx.fillStyle = '#ffffff';
    ctx.fillText("All Martial Stages & Bosses Conquered!", w / 2, 145);
    ctx.font = '13px sans-serif';
    ctx.fillStyle = '#94a3b8';
    ctx.fillText(`Master ${this.playerName}, your martial legend will echo forever.`, w / 2, 175);

    ctx.fillStyle = '#22c55e';
    ctx.fillRect(w / 2 - 100, 230, 200, 38);
    ctx.fillStyle = '#ffffff';
    ctx.font = 'bold 14px sans-serif';
    ctx.fillText('PLAY AGAIN', w / 2, 254);
    this.registerUiClick('open_menu', w / 2 - 100, 230, 200, 38);
    ctx.textAlign = 'left';
  },

  /* ==========================================================================
     CLICK HANDLING ON CANVAS
     ========================================================================== */
  registerUiClick(action, x, y, w, h) {
    this.uiBounds.push({ action: action, x: x, y: y, w: w, h: h });
  },

  handleCanvasClick(e) {
    const canvas = (this.engine && this.engine.canvas) || canvasGame || document.getElementById('consoleGameCanvas');
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    if (!rect.width || !rect.height) return;
    const scaleX = canvas.width / rect.width;
    const scaleY = canvas.height / rect.height;
    const clickX = (e.clientX - rect.left) * scaleX;
    const clickY = (e.clientY - rect.top) * scaleY;

    for (let i = 0; i < this.uiBounds.length; i++) {
      const b = this.uiBounds[i];
      if (clickX >= b.x && clickX <= b.x + b.w && clickY >= b.y && clickY <= b.y + b.h) {
        this.executeUiAction(b.action);
        return;
      }
    }
  },

  handleCanvasMouseMove(e) {
    const canvas = (this.engine && this.engine.canvas) || canvasGame || document.getElementById('consoleGameCanvas');
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    if (!rect.width || !rect.height) return;
    const scaleX = canvas.width / rect.width;
    const scaleY = canvas.height / rect.height;
    const mouseX = (e.clientX - rect.left) * scaleX;
    const mouseY = (e.clientY - rect.top) * scaleY;

    let isOver = false;
    for (let i = 0; i < this.uiBounds.length; i++) {
      const b = this.uiBounds[i];
      if (mouseX >= b.x && mouseX <= b.x + b.w && mouseY >= b.y && mouseY <= b.y + b.h) {
        isOver = true;
        break;
      }
    }
    canvas.style.cursor = isOver ? 'pointer' : 'default';
  },

  executeUiAction(action) {
    this.playSamuraiSound('click');

    if (action === 'start_duel') {
      this.isSideQuest = false;
      this.activeQuest = null;
      this.startFight();
    } else if (action === 'open_shop') {
      this.state = 'SHOP';
    } else if (action === 'open_quests') {
      this.openQuestBoard();
    } else if (action.startsWith('start_quest_')) {
      const qId = action.replace('start_quest_', '');
      this.startSideQuest(qId);
    } else if (action === 'retry_quest') {
      if (this.activeQuest) {
        this.startSideQuest(this.activeQuest.id);
      } else {
        this.openQuestBoard();
      }
    } else if (action === 'close_shop' || action === 'open_menu') {
      this.state = 'MENU';
    } else if (action === 'edit_name') {
      this.isEditingName = true;
      const promptName = prompt("Enter your Samurai Name:", this.playerName);
      if (promptName && promptName.trim().length > 0) {
        this.playerName = promptName.trim().slice(0, 12);
      }
      this.isEditingName = false;
    } else if (action.startsWith('diff_')) {
      this.difficulty = action.replace('diff_', '');
    } else if (action.startsWith('equip_weapon_')) {
      const idx = parseInt(action.replace('equip_weapon_', ''), 10);
      this.currentWeaponIndex = idx;
    } else if (action.startsWith('buy_weapon_')) {
      const idx = parseInt(action.replace('buy_weapon_', ''), 10);
      const wp = this.weapons[idx];
      if (this.gold >= wp.cost) {
        this.gold -= wp.cost;
        wp.unlocked = true;
        this.currentWeaponIndex = idx;
        this.playSamuraiSound('buy');
      }
    } else if (action.startsWith('upgrade_weapon_')) {
      const idx = parseInt(action.replace('upgrade_weapon_', ''), 10);
      const wp = this.weapons[idx];
      const upCost = wp.lvl * 90;
      if (wp.lvl < 5 && this.gold >= upCost) {
        this.gold -= upCost;
        wp.lvl++;
        wp.damage = Math.round(wp.damage * 1.2);
        wp.postureDmg = Math.round(wp.postureDmg * 1.25);
        wp.streakGrace = +(wp.streakGrace + 0.15).toFixed(2);
        this.playSamuraiSound('upgrade');
      }
    }
  },

  /* ==========================================================================
     WEB AUDIO SYNTHESIS FOR COMBAT SOUNDS
     ========================================================================== */
  playSamuraiSound(type) {
    try {
      const ctx = new (window.AudioContext || window.webkitAudioContext)();
      const now = ctx.currentTime;

      if (type === 'throw') {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(450, now);
        osc.frequency.exponentialRampToValueAtTime(120, now + 0.16);
        gain.gain.setValueAtTime(0.2, now);
        gain.gain.linearRampToValueAtTime(0.01, now + 0.16);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(now);
        osc.stop(now + 0.16);
      } else if (type === 'punch') {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(180, now);
        osc.frequency.exponentialRampToValueAtTime(40, now + 0.1);
        gain.gain.setValueAtTime(0.25, now);
        gain.gain.linearRampToValueAtTime(0.01, now + 0.1);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(now);
        osc.stop(now + 0.1);
      } else if (type === 'grab') {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'sawtooth';
        osc.frequency.setValueAtTime(320, now);
        osc.frequency.exponentialRampToValueAtTime(640, now + 0.14);
        gain.gain.setValueAtTime(0.22, now);
        gain.gain.linearRampToValueAtTime(0.01, now + 0.14);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(now);
        osc.stop(now + 0.14);
      } else if (type === 'slash') {
        // High swoosh
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(600, now);
        osc.frequency.exponentialRampToValueAtTime(150, now + 0.12);
        gain.gain.setValueAtTime(0.18, now);
        gain.gain.linearRampToValueAtTime(0.01, now + 0.12);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(now);
        osc.stop(now + 0.12);
      } else if (type === 'clash' || type === 'parry') {
        // Metallic ding
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(type === 'parry' ? 1200 : 800, now);
        osc.frequency.exponentialRampToValueAtTime(200, now + 0.22);
        gain.gain.setValueAtTime(0.25, now);
        gain.gain.linearRampToValueAtTime(0.01, now + 0.22);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(now);
        osc.stop(now + 0.22);
      } else if (type === 'hit') {
        // Impact punch
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'sawtooth';
        osc.frequency.setValueAtTime(240, now);
        osc.frequency.linearRampToValueAtTime(60, now + 0.15);
        gain.gain.setValueAtTime(0.2, now);
        gain.gain.linearRampToValueAtTime(0.01, now + 0.15);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(now);
        osc.stop(now + 0.15);
      } else if (type === 'finisher' || type === 'gong') {
        // Deep resonating gong
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(140, now);
        osc.frequency.exponentialRampToValueAtTime(45, now + 0.8);
        gain.gain.setValueAtTime(0.35, now);
        gain.gain.linearRampToValueAtTime(0.01, now + 0.8);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(now);
        osc.stop(now + 0.8);
      } else if (type === 'click') {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(500, now);
        gain.gain.setValueAtTime(0.1, now);
        gain.gain.linearRampToValueAtTime(0.01, now + 0.05);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(now);
        osc.stop(now + 0.05);
      }
    } catch (err) {
      // AudioContext not allowed or disabled
    }
  }
};


  // Launch Engine
  window.gameEngine = gameEngine;
  window.stickmanSwordSaint = stickmanSwordSaint;
  gameEngine.init();


  /* ==========================================================================
     8. 3D COVER FLOW SHELF CONTROLLER (LAYOUT 4)
     ========================================================================== */
  function initCoverflowShelf() {
    const shell = document.getElementById('coverflowShowcase');
    const stage = document.getElementById('coverflowStage');
    if (!shell || !stage) return;

    const cards = Array.from(stage.querySelectorAll('.coverflow-card'));
    const dots = Array.from(document.querySelectorAll('.cf-page-dot'));
    const prevBtn = document.getElementById('cfPrevBtn');
    const nextBtn = document.getElementById('cfNextBtn');
    const n = cards.length;
    if (!n) return;

    const MOOD_PALETTES = {
      reverie: ['#f59e0b', '#fbbf24', '#10b981', '#34d399', '#fde68a'],
      hairpin: ['#00f0ff', '#0284c7', '#fb923c', '#38bdf8', '#f97316'],
      ballpass: ['#38bdf8', '#4f46e5', '#818cf8', '#0ea5e9', '#a5b4fc'],
      swordsaint: ['#ff0055', '#e11d48', '#00f0ff', '#fb7185', '#38bdf8'],
      maze: ['#7c3aed', '#a855f7', '#ef4444', '#c084fc', '#6366f1']
    };

    let activeIndex = 3; // Start focused on 04: Stickman Sword Saint
    let dragStartX = null;
    let didDrag = false;

    function resetCardTilt(card) {
      const tiltEl = card.querySelector('.cf-card-tilt');
      if (tiltEl) {
        tiltEl.style.setProperty('--tilt-x', '0deg');
        tiltEl.style.setProperty('--tilt-y', '0deg');
      }
    }

    function renderSlots() {
      const half = Math.floor(n / 2);
      cards.forEach((card, i) => {
        const slot = ((i - activeIndex + n + half) % n) - half;
        card.setAttribute('data-cf-slot', String(slot));
        card.setAttribute('aria-hidden', slot === 0 ? 'false' : 'true');
        if (slot !== 0) {
          card.classList.remove('is-flipped');
          resetCardTilt(card);
        }
      });

      const activeMood = cards[activeIndex].getAttribute('data-mood') || 'swordsaint';
      shell.setAttribute('data-cf-mood', activeMood);
      if (typeof window.__setCoverFlowMoodPalette === 'function') {
        window.__setCoverFlowMoodPalette(MOOD_PALETTES[activeMood]);
      }

      dots.forEach((dot, i) => {
        dot.classList.toggle('active', i === activeIndex);
      });
    }

    function goTo(idx, silent = false) {
      const nextIdx = ((idx % n) + n) % n;
      if (nextIdx !== activeIndex) {
        cards.forEach((c) => {
          c.classList.remove('is-flipped');
          resetCardTilt(c);
        });
      }
      activeIndex = nextIdx;
      renderSlots();
      if (!silent) playUiSound('click');
    }

    // Feature 2: Holographic Mouse Tilt + Specular Sheen on center card
    cards.forEach((card, idx) => {
      const tiltEl = card.querySelector('.cf-card-tilt');
      const sheenEl = card.querySelector('.cf-holo-sheen');

      card.addEventListener('mousemove', (e) => {
        if (idx !== activeIndex || card.classList.contains('is-flipped') || !tiltEl) return;
        const rect = card.getBoundingClientRect();
        const nx = (e.clientX - rect.left) / rect.width;
        const ny = (e.clientY - rect.top) / rect.height;
        const tiltX = ((nx - 0.5) * 12).toFixed(2);
        const tiltY = ((0.5 - ny) * 10).toFixed(2);
        tiltEl.style.setProperty('--tilt-x', `${tiltX}deg`);
        tiltEl.style.setProperty('--tilt-y', `${tiltY}deg`);
        if (sheenEl) {
          sheenEl.style.setProperty('--sheen-x', `${(nx * 100).toFixed(1)}%`);
          sheenEl.style.setProperty('--sheen-y', `${(ny * 100).toFixed(1)}%`);
        }
      });

      card.addEventListener('mouseleave', () => {
        resetCardTilt(card);
      });

      card.addEventListener('click', (e) => {
        if (didDrag) {
          e.preventDefault();
          return;
        }
        if (idx !== activeIndex) {
          e.preventDefault();
          e.stopPropagation();
          goTo(idx);
        }
      });
    });

    // Feature 3: 180° Flip Case Buttons
    stage.querySelectorAll('.cf-flip-btn').forEach((btn) => {
      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        const card = btn.closest('.coverflow-card');
        if (!card || card.getAttribute('data-cf-slot') !== '0') return;
        card.classList.toggle('is-flipped');
        resetCardTilt(card);
        playUiSound('click');
      });
    });

    dots.forEach((dot) => {
      dot.addEventListener('click', () => {
        const target = parseInt(dot.getAttribute('data-cf-goto'), 10);
        if (!Number.isNaN(target)) goTo(target);
      });
    });

    if (prevBtn) prevBtn.addEventListener('click', () => goTo(activeIndex - 1));
    if (nextBtn) nextBtn.addEventListener('click', () => goTo(activeIndex + 1));

    // Pointer swipe / drag across the 3D stage
    stage.addEventListener('pointerdown', (e) => {
      if (e.target.closest('a, button')) return;
      dragStartX = e.clientX;
      didDrag = false;
    });

    window.addEventListener('pointermove', (e) => {
      if (dragStartX === null) return;
      if (Math.abs(e.clientX - dragStartX) > 10) didDrag = true;
    });

    window.addEventListener('pointerup', (e) => {
      if (dragStartX === null) return;
      const dx = e.clientX - dragStartX;
      dragStartX = null;
      if (Math.abs(dx) > 42) {
        goTo(dx < 0 ? activeIndex + 1 : activeIndex - 1);
      }
      setTimeout(() => { didDrag = false; }, 60);
    });

    // Keyboard Left/Right navigation when Cover Flow is horizontally in view and Arcade isn't active
    window.addEventListener('keydown', (e) => {
      if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') return;
      if (window.gameEngine && window.gameEngine.isPlaying && !window.gameEngine.isPaused) return;
      const rect = shell.getBoundingClientRect();
      const inView = rect.right > window.innerWidth * 0.25 && rect.left < window.innerWidth * 0.75;
      if (!inView) return;

      if (e.key === 'ArrowLeft') {
        e.preventDefault();
        goTo(activeIndex - 1);
      } else if (e.key === 'ArrowRight') {
        e.preventDefault();
        goTo(activeIndex + 1);
      }
    });

    // Expand Details -> ensure card is unfiltered, pan horizontal track, and pulse highlight
    stage.querySelectorAll('.cf-expand-btn').forEach((btn) => {
      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        playUiSound('click');
        const allTab = document.querySelector('.project-tab-pill[data-filter="all"]');
        if (allTab && !allTab.classList.contains('active')) allTab.click();

        const targetSel = btn.getAttribute('data-target');
        const targetEl = targetSel ? document.querySelector(targetSel) : null;
        if (!targetEl) return;

        scrollToTrackElement(targetEl, 'center');
        targetEl.classList.remove('cf-target-pulse');
        void targetEl.offsetWidth;
        targetEl.classList.add('cf-target-pulse');
        setTimeout(() => targetEl.classList.remove('cf-target-pulse'), 1500);
      });
    });

    // Boot in Arcade directly on StickSaw v0.1
    stage.querySelectorAll('.cf-boot-arcade-btn').forEach((btn) => {
      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        playUiSound('diamond');
        const gameKey = btn.getAttribute('data-arcade-game') || 'sword';
        const tabBtn = document.querySelector(`.game-tab-btn[data-game="${gameKey}"]`);
        if (tabBtn) tabBtn.click();
        const consoleEl = document.getElementById('arcade-console');
        if (consoleEl) scrollToTrackElement(consoleEl, 'start');
        setTimeout(() => {
          if (window.gameEngine && !window.gameEngine.isPlaying) {
            window.gameEngine.startCurrentGame();
          }
        }, 480);
      });
    });

    renderSlots();
  }

  initCoverflowShelf();


  /* ==========================================================================
     9. CONCEPT B: HORIZONTAL PARALLAX WORLD TRACK & LEVEL SCRUBBER
     ========================================================================== */
  function initHorizontalWorldTrack() {
    const track = document.getElementById('horizontalTrack');
    if (!track) return;

    const zones = ['home', 'about', 'projects', 'arcade-console', 'skills', 'contact'];
    const zoneButtons = Array.from(document.querySelectorAll('.world-zone-btn'));
    const progressRail = document.getElementById('worldProgressRail');
    const progressFill = document.getElementById('worldProgressFill');
    const prevBtn = document.getElementById('worldPrevBtn');
    const nextBtn = document.getElementById('worldNextBtn');
    const cyberGrid = document.querySelector('.cyber-grid-overlay');
    const glows = Array.from(document.querySelectorAll('.ambient-glow'));
    let activeZoneIndex = 0;

    function updateScrubberAndNav() {
      const maxScroll = Math.max(1, track.scrollWidth - track.clientWidth);
      const pct = Math.max(0, Math.min(100, (track.scrollLeft / maxScroll) * 100));
      if (progressFill) progressFill.style.width = `${pct.toFixed(2)}%`;

      // Parallax drift on background glow & grid
      const pxShift = -(track.scrollLeft * 0.06);
      if (cyberGrid) cyberGrid.style.transform = `translate3d(${(pxShift * 0.5).toFixed(1)}px, 0, 0)`;
      glows.forEach((g, idx) => {
        const mult = idx === 0 ? 0.8 : idx === 1 ? 1.2 : 0.6;
        g.style.transform = `translate3d(${(pxShift * mult).toFixed(1)}px, 0, 0)`;
      });

      // Determine active zone nearest horizontal center
      const centerX = track.getBoundingClientRect().left + track.clientWidth * 0.42;
      let closestIdx = 0;
      let closestDist = Infinity;
      zones.forEach((zid, idx) => {
        const el = document.getElementById(zid);
        if (!el) return;
        const r = el.getBoundingClientRect();
        const dist = Math.abs((r.left + r.right) / 2 - centerX);
        if (dist < closestDist) {
          closestDist = dist;
          closestIdx = idx;
        }
      });

      activeZoneIndex = closestIdx;
      const activeId = zones[closestIdx];

      zoneButtons.forEach((btn) => {
        btn.classList.toggle('active', btn.getAttribute('data-zone') === activeId);
      });
      document.querySelectorAll('.aaa-nav-link, .mobile-nav-item').forEach((link) => {
        link.classList.toggle('active', link.getAttribute('href') === '#' + activeId);
      });
    }

    let scrollRaf = false;
    track.addEventListener('scroll', () => {
      if (scrollRaf) return;
      scrollRaf = true;
      requestAnimationFrame(() => {
        updateScrubberAndNav();
        scrollRaf = false;
      });
    }, { passive: true });

    window.addEventListener('resize', updateScrubberAndNav);

    // Smooth vertical mouse-wheel -> horizontal scroll translation
    track.addEventListener('wheel', (e) => {
      if (Math.abs(e.deltaY) <= Math.abs(e.deltaX)) return;

      // Allow inner vertical scroll first if the card under cursor has vertical overflow
      const scrollableCard = e.target.closest('.horizontal-track > .aaa-card, .project-item-card');
      if (scrollableCard && scrollableCard.scrollHeight > scrollableCard.clientHeight + 2) {
        const atTop = scrollableCard.scrollTop <= 0;
        const atBottom = scrollableCard.scrollTop + scrollableCard.clientHeight >= scrollableCard.scrollHeight - 2;
        if ((e.deltaY < 0 && !atTop) || (e.deltaY > 0 && !atBottom)) {
          return;
        }
      }

      e.preventDefault();
      track.scrollLeft += e.deltaY * 1.15;
    }, { passive: false });

    // Click & Drag panning across open track space
    let dragStart = null;
    let scrollStart = 0;
    track.addEventListener('mousedown', (e) => {
      if (e.button !== 0) return;
      if (e.target.closest('a, button, input, video, iframe, canvas, .coverflow-stage')) return;
      dragStart = e.clientX;
      scrollStart = track.scrollLeft;
      track.classList.add('is-dragging');
    });

    window.addEventListener('mousemove', (e) => {
      if (dragStart === null) return;
      const dx = e.clientX - dragStart;
      track.scrollLeft = scrollStart - dx;
    });

    window.addEventListener('mouseup', () => {
      if (dragStart !== null) {
        dragStart = null;
        track.classList.remove('is-dragging');
      }
    });

    // Scrubber Zone Buttons & Arrows
    zoneButtons.forEach((btn) => {
      btn.addEventListener('click', () => {
        const zid = btn.getAttribute('data-zone');
        const el = zid ? document.getElementById(zid) : null;
        if (el) {
          playUiSound('click');
          scrollToTrackElement(el, 'start');
        }
      });
    });

    if (prevBtn) {
      prevBtn.addEventListener('click', () => {
        const nextIdx = Math.max(0, activeZoneIndex - 1);
        const el = document.getElementById(zones[nextIdx]);
        if (el) {
          playUiSound('click');
          scrollToTrackElement(el, 'start');
        }
      });
    }

    if (nextBtn) {
      nextBtn.addEventListener('click', () => {
        const nextIdx = Math.min(zones.length - 1, activeZoneIndex + 1);
        const el = document.getElementById(zones[nextIdx]);
        if (el) {
          playUiSound('click');
          scrollToTrackElement(el, 'start');
        }
      });
    }

    // Click directly on progress rail to scrub
    if (progressRail) {
      progressRail.addEventListener('click', (e) => {
        const rect = progressRail.getBoundingClientRect();
        const frac = Math.max(0, Math.min(1, (e.clientX - rect.left) / rect.width));
        const maxScroll = Math.max(0, track.scrollWidth - track.clientWidth);
        playUiSound('click');
        track.scrollTo({ left: frac * maxScroll, behavior: 'smooth' });
      });
    }

    updateScrubberAndNav();
  }

  initHorizontalWorldTrack();

});
