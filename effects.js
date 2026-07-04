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

    // Navigate after exit animation completes
    setTimeout(function () {
      window.location.href = href;
    }, 280);
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

})();
