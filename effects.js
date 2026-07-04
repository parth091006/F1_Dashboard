// ── effects.js · Parth's Pit Wall ──
// Shared visual effects: page transitions, telemetry background, and nav interception.
// Include on every page BEFORE other scripts.

(function () {
  'use strict';

  // ═══════════════════════════════════════════════════
  // 1. SMOOTH PAGE TRANSITIONS
  // ═══════════════════════════════════════════════════

  // Mark body as entering on load
  document.documentElement.classList.add('page-ready');

  // Step 13: GSAP-Style Smooth Navigation Transitions
  function handlePageEnter() {
    let curtain = document.getElementById('gsap-nav-curtain');
    if (!curtain) {
      curtain = document.createElement('div');
      curtain.id = 'gsap-nav-curtain';
      curtain.style.cssText = 'position:fixed; inset:0; background:linear-gradient(135deg, #0a0a0c, #131317); z-index:999999; transform:translateY(0%); transition:transform 0.55s cubic-bezier(0.16, 1, 0.3, 1); pointer-events:none; border-bottom: 2px solid var(--gold, #D4AF37); box-shadow: 0 20px 40px rgba(0,0,0,0.8);';
      document.body.appendChild(curtain);
    }
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        curtain.style.transform = 'translateY(-100%)';
        setTimeout(() => { if (curtain && curtain.parentNode) curtain.remove(); }, 600);
      });
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', handlePageEnter);
  } else {
    handlePageEnter();
  }
  window.addEventListener('pageshow', handlePageEnter);

  // Intercept all nav-link clicks for smooth exit transitions
  document.addEventListener('click', function (e) {
    const link = e.target.closest('a.nav-link, a.nav-logo-link');
    if (!link) return;

    const href = link.getAttribute('href');
    if (!href || href.startsWith('#') || href.startsWith('javascript')) return;

    // Don't intercept if it's the current page
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    if (href === currentPage) {
      e.preventDefault();
      return;
    }

    // Don't intercept if modifier keys are held (new tab, etc.)
    if (e.metaKey || e.ctrlKey || e.shiftKey) return;

    e.preventDefault();
    document.body.classList.add('page-exiting');
    sessionStorage.setItem('pitwall_nav_transition', 'true');

    // Create GSAP-style transition wipe curtain for seamless slide
    let curtain = document.getElementById('gsap-nav-curtain');
    if (!curtain) {
      curtain = document.createElement('div');
      curtain.id = 'gsap-nav-curtain';
      curtain.style.cssText = 'position:fixed; inset:0; background:linear-gradient(135deg, #0a0a0c, #131317); z-index:999999; transform:translateY(100%); transition:transform 0.38s cubic-bezier(0.16, 1, 0.3, 1); pointer-events:none; border-top: 2px solid var(--gold, #D4AF37); box-shadow: 0 -20px 40px rgba(0,0,0,0.8);';
      document.body.appendChild(curtain);
    }

    requestAnimationFrame(() => {
      curtain.style.transform = 'translateY(0%)';
    });

    // Navigate after exit animation & wipe complete
    setTimeout(function () {
      window.location.href = href;
    }, 380);
  });


  // ═══════════════════════════════════════════════════
  // 2. ANIMATED TELEMETRY BACKGROUND
  // ═══════════════════════════════════════════════════

  function createTelemetryBackground() {
    const bg = document.createElement('div');
    bg.className = 'telemetry-bg';
    bg.setAttribute('aria-hidden', 'true');

    bg.innerHTML = `
      <div class="telemetry-grid"></div>
      <div class="telemetry-scan"></div>
      <div class="telemetry-scan telemetry-scan-2"></div>
    `;

    // Insert as first child of body so it's behind everything
    document.body.insertBefore(bg, document.body.firstChild);
  }

  // Create once DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', createTelemetryBackground);
  } else {
    createTelemetryBackground();
  }


  // ═══════════════════════════════════════════════════
  // 3. STEP 15: CINEMATIC F1 TELEMETRY LOADING SCREEN
  // ═══════════════════════════════════════════════════

  function initSplashScreen() {
    // If arriving from an internal nav click, skip the long loading screen
    if (sessionStorage.getItem('pitwall_nav_transition') === 'true') {
      sessionStorage.removeItem('pitwall_nav_transition');
      return;
    }

    const style = document.createElement('style');
    style.id = 'f1-splash-styles';
    style.textContent = `
      #f1-splash-screen {
        position: fixed; inset: 0;
        background: radial-gradient(circle at center, #15151b 0%, #08080a 100%);
        z-index: 9999999; display: flex; flex-direction: column;
        align-items: center; justify-content: center;
        font-family: 'JetBrains Mono', monospace; color: #fff; overflow: hidden;
        transition: transform 0.65s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.65s ease, filter 0.65s ease;
      }
      #f1-splash-screen.splash-exit {
        transform: translateY(-100%) scale(1.05);
        opacity: 0; filter: blur(8px); pointer-events: none;
      }
      .splash-grid {
        position: absolute; inset: 0;
        background-image: 
          linear-gradient(rgba(212, 175, 55, 0.05) 1px, transparent 1px),
          linear-gradient(90deg, rgba(212, 175, 55, 0.05) 1px, transparent 1px);
        background-size: 40px 40px; background-position: center; z-index: 1;
      }
      .splash-sweep {
        position: absolute; top: -15%; left: 0; right: 0; height: 140px;
        background: linear-gradient(180deg, transparent 0%, rgba(255, 24, 1, 0.15) 50%, rgba(212, 175, 55, 0.35) 100%);
        border-bottom: 2px solid var(--gold, #D4AF37);
        box-shadow: 0 5px 25px rgba(212, 175, 55, 0.5); z-index: 2;
        animation: telemetryLaserScan 1.8s infinite ease-in-out;
      }
      @keyframes telemetryLaserScan {
        0% { top: -15%; opacity: 0; }
        20% { opacity: 1; }
        80% { opacity: 1; }
        100% { top: 105%; opacity: 0; }
      }
      .splash-content {
        position: relative; z-index: 10; display: flex; flex-direction: column;
        align-items: center; width: 100%; max-width: 460px; padding: 0 24px;
      }
      .splash-logo-box {
        position: relative; margin-bottom: 36px; perspective: 600px;
      }
      .splash-logo {
        font-family: 'Inter', sans-serif; font-size: 54px; font-weight: 900;
        font-style: italic; letter-spacing: -3px; display: flex; align-items: center; gap: 4px;
        animation: splashLogoFloat 3s infinite ease-in-out; text-shadow: 0 10px 30px rgba(0,0,0,0.8);
      }
      @keyframes splashLogoFloat {
        0%, 100% { transform: rotateX(8deg) rotateY(-5deg) scale(1); }
        50% { transform: rotateX(0deg) rotateY(5deg) scale(1.04); }
      }
      .splash-f { color: #ffffff; text-shadow: 0 0 15px rgba(255,255,255,0.4); }
      .splash-1 { color: #FF1801; text-shadow: 0 0 20px rgba(255, 24, 1, 0.6); }
      .splash-brand { 
        font-size: 32px; letter-spacing: 2px; margin-left: 8px; 
        color: var(--gold, #D4AF37); text-shadow: 0 0 15px rgba(212, 175, 55, 0.5);
      }
      .splash-brand em { color: #fff; font-style: normal; font-weight: 300; }
      .splash-status {
        font-size: 11px; letter-spacing: 2px; color: rgba(255, 255, 255, 0.75);
        margin-bottom: 16px; text-transform: uppercase; min-height: 16px;
        text-align: center; text-shadow: 0 0 8px rgba(0,0,0,0.8);
      }
      .splash-track {
        width: 100%; height: 6px; background: rgba(255, 255, 255, 0.1);
        border-radius: 3px; overflow: hidden; position: relative;
        box-shadow: inset 0 1px 3px rgba(0,0,0,0.8); margin-bottom: 20px;
        border: 1px solid rgba(255, 255, 255, 0.15);
      }
      .splash-bar {
        width: 0%; height: 100%; background: linear-gradient(90deg, #FF1801, #D4AF37);
        border-radius: 3px; box-shadow: 0 0 15px #D4AF37; transition: width 0.1s ease-out;
      }
      .splash-meta {
        width: 100%; display: flex; justify-content: space-between; align-items: center;
        font-size: 11px; color: rgba(255, 255, 255, 0.5);
        border-top: 1px dashed rgba(255, 255, 255, 0.15); padding-top: 14px;
      }
      .splash-meta-val { color: var(--gold, #D4AF37); font-weight: 700; }
      .splash-pct {
        font-size: 20px; font-weight: 800; color: #fff;
        text-shadow: 0 0 10px rgba(255,255,255,0.5);
      }
    `;
    document.head.appendChild(style);

    const splash = document.createElement('div');
    splash.id = 'f1-splash-screen';
    splash.innerHTML = `
      <div class="splash-grid"></div>
      <div class="splash-sweep"></div>
      <div class="splash-content">
        <div class="splash-logo-box">
          <div class="splash-logo">
            <span class="splash-f">F</span><span class="splash-1">1</span>
            <span class="splash-brand">PIT<em>WALL</em></span>
          </div>
        </div>
        <div class="splash-status" id="splash-status">INITIALIZING TELEMETRY STREAM...</div>
        <div class="splash-track"><div class="splash-bar" id="splash-bar"></div></div>
        <div class="splash-meta">
          <div>SYSTEM <span class="splash-meta-val">ONLINE</span></div>
          <div class="splash-pct" id="splash-pct">0%</div>
          <div>LATENCY <span class="splash-meta-val">4ms</span></div>
        </div>
      </div>
    `;
    document.body.appendChild(splash);

    const bar = document.getElementById('splash-bar');
    const pct = document.getElementById('splash-pct');
    const status = document.getElementById('splash-status');
    
    let currentPct = 0;
    const statusSteps = [
      { p: 15, text: "CONNECTING TO ERGAST & JOLPI DATA NODES..." },
      { p: 45, text: "SYNCING 2026 DRIVER & CONSTRUCTOR GRID..." },
      { p: 75, text: "CALIBRATING PIT WALL TIMING TOWER..." },
      { p: 98, text: "TELEMETRY STREAM SYNCHRONIZED." }
    ];

    const interval = setInterval(() => {
      currentPct += Math.random() * 4.5 + 1.5;
      if (currentPct >= 100) {
        currentPct = 100;
        clearInterval(interval);
        bar.style.width = '100%';
        pct.textContent = '100%';
        status.textContent = 'SYSTEM ONLINE · LIGHTS OUT AND AWAY WE GO';
        setTimeout(() => {
          splash.classList.add('splash-exit');
          setTimeout(() => { if (splash && splash.parentNode) splash.remove(); }, 680);
        }, 280);
      } else {
        bar.style.width = currentPct + '%';
        pct.textContent = Math.floor(currentPct) + '%';
        for (const s of statusSteps) {
          if (currentPct >= s.p && currentPct < s.p + 25) {
            status.textContent = s.text;
          }
        }
      }
    }, 28);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initSplashScreen);
  } else {
    initSplashScreen();
  }

})();
