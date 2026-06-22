// ── drivers.js · Parth's Pit Wall ──
// Renders the 2026 F1 driver grid and on-click career stats modal.
// Uses Jolpica/Ergast API + Open-Meteo for data.

const DRIVERS_API = 'https://api.jolpi.ca/ergast/f1';

// Use hex values directly — CSS variables for teams are not guaranteed in every page
const TEAM_COLORS_DRV = {
  'mercedes':     '#27F4D2',
  'ferrari':      '#E8002D',
  'mclaren':      '#FF8000',
  'red_bull':     '#3671C6',
  'aston_martin': '#229971',
  'alpine':       '#0093CC',
  'rb':           '#6692FF',
  'haas':         '#B6BABD',
  'williams':     '#64C4FF',
  'audi':         '#00877C',
  'cadillac':     '#8A9099',
};

const TEAM_HEX_DRV = {
  'mercedes':     '#27F4D2',
  'ferrari':      '#E8002D',
  'mclaren':      '#FF8000',
  'red_bull':     '#3671C6',
  'aston_martin': '#229971',
  'alpine':       '#0093CC',
  'rb':           '#6692FF',
  'haas':         '#B6BABD',
  'williams':     '#64C4FF',
  'audi':         '#00877C',
  'cadillac':     '#8A9099',
};

// ── Static driver bios (concise, 2 sentences per driver) ──
const DRIVER_BIOS = {
  'max_verstappen':       'The most dominant driver of the 2020s — four consecutive World Championships with Red Bull from 2021 to 2024. He has rewritten records at a pace that benchmarks an entire generation.',
  'lawson':               'The highly rated New Zealander graduated to a full Red Bull seat in 2025, having dazzled across several stand-in performances with lightning one-lap pace. He is considered one of the most naturally gifted talents of his cohort.',
  'leclerc':              "Ferrari's standard-bearer and one of the most electrifying qualifiers in the paddock. Leclerc has long been considered among the very finest drivers in the sport.",
  'hamilton':             'The most decorated driver in Formula 1 history with seven World Championships matching Schumacher\'s legendary record. Hamilton made his landmark move to Ferrari for 2025, seeking one final title with the Prancing Horse.',
  'norris':               'The Briton emerged as a genuine championship contender in 2024, claiming his first victories and pushing the title fight to the final round with McLaren. His speed, technical intelligence, and effortless personality have made him a fan favourite worldwide.',
  'piastri':              'Arrived at McLaren in 2023 and immediately looked like a future champion — composure and pace in equal measure. Piastri is routinely challenging for race wins, establishing himself as one of the sport\'s brightest futures.',
  'russell':              'Meticulous, analytical, and devastatingly fast in qualifying, Russell has grown into one of Mercedes\' greatest assets. His maiden race win at Interlagos in 2022 announced his arrival as a bona fide front-runner.',
  'antonelli':            "Mercedes' golden teenage prodigy and the most anticipated debut in years. Antonelli carries the weight of a nation's expectations as Italy's great F1 hope for a new era.",
  'alonso':               'A two-time world champion still competing well into his forties, Alonso at Aston Martin remains the definitive masterclass in racecraft and sheer competitive will. His late-career resurgence is one of the sport\'s most compelling stories.',
  'stroll':               'The Canadian has shown genuine front-running pace on multiple occasions since his 2017 debut, racing for the Aston Martin team founded by his father. A cool head and raw speed make him a consistent points scorer.',
  'gasly':                'The 2021 Italian Grand Prix winner brings experience, hard-earned Grand Prix mileage, and passionate French flair to Alpine. A versatile and underrated performer who consistently out-drives his machinery.',
  'colapinto':            'The Argentine driver stepped into Formula 1 and immediately impressed with his raw pace and remarkable maturity. Now with Alpine, he carries the hopes of a passionate nation on the global stage.',
  'hadjar':               'The 2024 Formula 2 champion joined Racing Bulls as one of the most highly touted rookies in recent memory. Backed by Red Bull\'s formidable junior programme, Hadjar has the tools to be a long-term fixture at the front.',
  'arvid_lindblad':       'The young British sensation graduated to F1 with Racing Bulls after a meteoric rise through the junior categories. Backed by Red Bull, his innate speed has him widely viewed as a future World Champion.',
  'hulkenberg':           'The perpetually podium-less veteran with one of the most potent single-lap speed profiles on the grid. Hülkenberg\'s late-career move to Audi is his long-awaited shot at a works environment worthy of his talent.',
  'bortoleto':            'The 2024 Formula 2 champion — a Carlos Sainz protégé — stepped up with Audi, bringing Brazilian flair and a steely technical intelligence to the German works programme. Widely regarded as a future race winner.',
  'bearman':              'The youngest Briton to score F1 points, Bearman announced himself to the world with an astonishing performance as a Ferrari stand-in at just 18. Now a full-time Haas driver, he is one of the most exciting prospects in years.',
  'ocon':                 'A 2021 race winner at Hungary, Ocon joined Haas after his time at Alpine, known for a committed and sometimes combative wheel-to-wheel style. Fiercely competitive and reliable in the points.',
  'albon':                'After being dropped by Red Bull in 2020, Albon rebuilt his career at Williams and became one of the most respected drivers of his generation — consistently extracting results far beyond what the car should be capable of.',
  'sainz':                'A relentlessly consistent performer and 2024 Australian Grand Prix winner, Sainz brought his talents to Williams after his Ferrari chapter closed. He invariably over-delivers relative to his machinery.',
  'bottas':               'A multiple race winner and key figure in Mercedes\' dominant era, Bottas is one of the most experienced drivers in the field. His move to Cadillac represents a new chapter in a lengthy and decorated career.',
  'perez':                'Mexico\'s most successful Formula 1 driver, Pérez brings a wealth of experience and exceptional tire management skills to the Cadillac F1 Team. A proven race winner and the ultimate team player.',
};

const DRIVER_IMAGES = {
  'russell': 'https://media.formula1.com/image/upload/c_lfill,w_440/q_auto/d_common:f1:2026:fallback:driver:2026fallbackdriverright.webp/v1740000001/common/f1/2026/mercedes/georus01/2026mercedesgeorus01right.webp',
  'antonelli': 'https://media.formula1.com/image/upload/c_lfill,w_440/q_auto/d_common:f1:2026:fallback:driver:2026fallbackdriverright.webp/v1740000001/common/f1/2026/mercedes/andant01/2026mercedesandant01right.webp',
  'leclerc': 'https://media.formula1.com/image/upload/c_lfill,w_440/q_auto/d_common:f1:2026:fallback:driver:2026fallbackdriverright.webp/v1740000001/common/f1/2026/ferrari/chalec01/2026ferrarichalec01right.webp',
  'hamilton': 'https://media.formula1.com/image/upload/c_lfill,w_440/q_auto/d_common:f1:2026:fallback:driver:2026fallbackdriverright.webp/v1740000001/common/f1/2026/ferrari/lewham01/2026ferrarilewham01right.webp',
  'norris': 'https://media.formula1.com/image/upload/c_lfill,w_440/q_auto/d_common:f1:2026:fallback:driver:2026fallbackdriverright.webp/v1740000001/common/f1/2026/mclaren/lannor01/2026mclarenlannor01right.webp',
  'piastri': 'https://media.formula1.com/image/upload/c_lfill,w_440/q_auto/d_common:f1:2026:fallback:driver:2026fallbackdriverright.webp/v1740000001/common/f1/2026/mclaren/oscpia01/2026mclarenoscpia01right.webp',
  'max_verstappen': 'https://media.formula1.com/image/upload/c_lfill,w_440/q_auto/d_common:f1:2026:fallback:driver:2026fallbackdriverright.webp/v1740000001/common/f1/2026/redbullracing/maxver01/2026redbullracingmaxver01right.webp',
  'hadjar': 'https://media.formula1.com/image/upload/c_lfill,w_440/q_auto/d_common:f1:2026:fallback:driver:2026fallbackdriverright.webp/v1740000001/common/f1/2026/redbullracing/isahad01/2026redbullracingisahad01right.webp',
  'alonso': 'https://media.formula1.com/image/upload/c_lfill,w_440/q_auto/d_common:f1:2026:fallback:driver:2026fallbackdriverright.webp/v1740000001/common/f1/2026/astonmartin/feralo01/2026astonmartinferalo01right.webp',
  'stroll': 'https://media.formula1.com/image/upload/c_lfill,w_440/q_auto/d_common:f1:2026:fallback:driver:2026fallbackdriverright.webp/v1740000001/common/f1/2026/astonmartin/lanstr01/2026astonmartinlanstr01right.webp',
  'gasly': 'https://media.formula1.com/image/upload/c_lfill,w_440/q_auto/d_common:f1:2026:fallback:driver:2026fallbackdriverright.webp/v1740000001/common/f1/2026/alpine/piegas01/2026alpinepiegas01right.webp',
  'colapinto': 'https://media.formula1.com/image/upload/c_lfill,w_440/q_auto/d_common:f1:2026:fallback:driver:2026fallbackdriverright.webp/v1740000001/common/f1/2026/alpine/fracol01/2026alpinefracol01right.webp',
  'ocon': 'https://media.formula1.com/image/upload/c_lfill,w_440/q_auto/d_common:f1:2026:fallback:driver:2026fallbackdriverright.webp/v1740000001/common/f1/2026/haasf1team/estoco01/2026haasf1teamestoco01right.webp',
  'bearman': 'https://media.formula1.com/image/upload/c_lfill,w_440/q_auto/d_common:f1:2026:fallback:driver:2026fallbackdriverright.webp/v1740000001/common/f1/2026/haasf1team/olibea01/2026haasf1teamolibea01right.webp',
  'lawson': 'https://media.formula1.com/image/upload/c_lfill,w_440/q_auto/d_common:f1:2026:fallback:driver:2026fallbackdriverright.webp/v1740000001/common/f1/2026/racingbulls/lialaw01/2026racingbullslialaw01right.webp',
  'arvid_lindblad': 'https://media.formula1.com/image/upload/c_lfill,w_440/q_auto/d_common:f1:2026:fallback:driver:2026fallbackdriverright.webp/v1740000001/common/f1/2026/racingbulls/arvlin01/2026racingbullsarvlin01right.webp',
  'albon': 'https://media.formula1.com/image/upload/c_lfill,w_440/q_auto/d_common:f1:2026:fallback:driver:2026fallbackdriverright.webp/v1740000001/common/f1/2026/williams/alealb01/2026williamsalealb01right.webp',
  'sainz': 'https://media.formula1.com/image/upload/c_lfill,w_440/q_auto/d_common:f1:2026:fallback:driver:2026fallbackdriverright.webp/v1740000001/common/f1/2026/williams/carsai01/2026williamscarsai01right.webp',
  'hulkenberg': 'https://media.formula1.com/image/upload/c_lfill,w_440/q_auto/d_common:f1:2026:fallback:driver:2026fallbackdriverright.webp/v1740000001/common/f1/2026/audi/nichul01/2026audinichul01right.webp',
  'bortoleto': 'https://media.formula1.com/image/upload/c_lfill,w_440/q_auto/d_common:f1:2026:fallback:driver:2026fallbackdriverright.webp/v1740000001/common/f1/2026/audi/gabbor01/2026audigabbor01right.webp',
  'bottas': 'https://media.formula1.com/image/upload/c_lfill,w_440/q_auto/d_common:f1:2026:fallback:driver:2026fallbackdriverright.webp/v1740000001/common/f1/2026/cadillac/valbot01/2026cadillacvalbot01right.webp',
  'perez': 'https://media.formula1.com/image/upload/c_lfill,w_440/q_auto/d_common:f1:2026:fallback:driver:2026fallbackdriverright.webp/v1740000001/common/f1/2026/cadillac/serper01/2026cadillacserper01right.webp'
};

// ── Flag emoji lookup by nationality ──
const NATIONALITY_FLAGS = {
  'Dutch': '🇳🇱', 'New Zealander': '🇳🇿', 'Monegasque': '🇲🇨', 'British': '🇬🇧',
  'Australian': '🇦🇺', 'Spanish': '🇪🇸', 'French': '🇫🇷', 'Canadian': '🇨🇦',
  'Japanese': '🇯🇵', 'German': '🇩🇪', 'Brazilian': '🇧🇷', 'Thai': '🇹🇭',
  'Finnish': '🇫🇮', 'Italian': '🇮🇹', 'Mexican': '🇲🇽', 'Chinese': '🇨🇳',
  'Danish': '🇩🇰', 'Austrian': '🇦🇹', 'American': '🇺🇸', 'Argentinian': '🇦🇷',
};

// ── State ──
let currentDriverId = null;

async function fetchWithCache(url, key) {
  const cached = sessionStorage.getItem(key);
  if (cached) {
    try {
      const parsed = JSON.parse(cached);
      if (Date.now() - parsed.ts < 300000) return parsed.data;
    } catch(e) {}
  }
  const res = await fetch(url);
  if (!res.ok) {
    if (cached) return JSON.parse(cached).data;
    throw new Error('HTTP ' + res.status);
  }
  const data = await res.json();
  try { sessionStorage.setItem(key, JSON.stringify({ ts: Date.now(), data })); } catch(e) {}
  return data;
}

// ── Render Driver Grid ──

async function fetchAndRenderDriverGrid() {
  try {
    const data = await fetchWithCache(`${DRIVERS_API}/current/driverStandings.json`, 'cache_drivers_grid');
    const standings = data.MRData.StandingsTable.StandingsLists[0]?.DriverStandings || [];

    const grid      = document.getElementById('driversGrid');
    const countEl   = document.getElementById('driversCount');
    const favDriver = localStorage.getItem('fav_driver');

    grid.innerHTML = '';

    // Separate favourite from rest
    const sorted = [...standings].sort((a, b) => {
      const teamA = a.Constructors[0]?.name || '';
      const teamB = b.Constructors[0]?.name || '';
      // If teams are the same, sort by points or position
      if (teamA === teamB) return parseInt(a.position) - parseInt(b.position);
      return teamA.localeCompare(teamB);
    });

    const favIdx = sorted.findIndex(s => s.Driver.driverId === favDriver);
    if (favIdx > 0) {
      const [favItem] = sorted.splice(favIdx, 1);
      sorted.unshift(favItem);
    }

    sorted.forEach((item, index) => {
      const d         = item.Driver;
      const teamId    = item.Constructors[0]?.constructorId || '';
      const teamName  = item.Constructors[0]?.name || 'Unknown';
      const teamColor = TEAM_COLORS_DRV[teamId] || 'var(--ink-3)';
      const teamHex   = TEAM_HEX_DRV[teamId] || '#666';
      const isFav     = d.driverId === favDriver;
      const delay     = Math.min(index * 0.06, 1.2);
      const flag      = NATIONALITY_FLAGS[d.nationality] || '';
      const number    = d.permanentNumber || '??';

      const card = document.createElement('div');
      card.className = `driver-card${isFav ? ' is-favorite' : ''}`;
      card.style.cssText = `--team-color: ${teamColor}; animation-delay: ${delay}s;`;
      card.dataset.driverId = d.driverId;

      const driverImgUrl = DRIVER_IMAGES[d.driverId] || `https://ui-avatars.com/api/?name=${encodeURIComponent(d.givenName + ' ' + d.familyName)}&background=1d1d1d&color=fff&size=256&bold=true`;

      card.innerHTML = `
        <div class="dc-number">${number}</div>
        <img class="dc-image" src="${driverImgUrl}" alt="${d.givenName} ${d.familyName}">
        <div class="dc-code" style="background:${teamHex}">${d.code || d.familyName.substring(0,3).toUpperCase()}</div>
        <div class="dc-name">${d.givenName} ${d.familyName}</div>
        <div class="dc-team">${flag} ${teamName}</div>
        <div class="dc-footer">
          <div class="dc-pos-pts">P${item.position}<span class="dc-pts">· ${item.points} pts</span></div>
          <button class="dc-fav-btn${isFav ? ' active' : ''}" data-driver-id="${d.driverId}" title="${isFav ? 'Remove favourite' : 'Set as favourite'}" aria-label="Toggle favourite">★</button>
        </div>
        <div class="dc-view-hint">View Profile →</div>
      `;

      // Click card → open modal (but not if clicking fav button)
      card.addEventListener('click', (e) => {
        if (e.target.closest('.dc-fav-btn')) return;
        openDriverModal(d, item, teamId, teamHex);
      });

      // Click fav button
      card.querySelector('.dc-fav-btn').addEventListener('click', (e) => {
        e.stopPropagation();
        const cur = localStorage.getItem('fav_driver');
        if (cur === d.driverId) {
          localStorage.removeItem('fav_driver');
        } else {
          localStorage.setItem('fav_driver', d.driverId);
        }
        fetchAndRenderDriverGrid(); // Re-render
      });

      grid.appendChild(card);
    });

    if (countEl) countEl.textContent = `${standings.length} Drivers`;

  } catch (err) {
    console.error('[drivers] grid fetch error:', err);
    document.getElementById('driversGrid').innerHTML =
      '<div class="grid-loading">Could not load driver data. Please check your connection.</div>';
  }
}

// ── Modal: Open ──

function openDriverModal(driver, standingItem, teamId, teamHex) {
  currentDriverId = driver.driverId;
  const flag = NATIONALITY_FLAGS[driver.nationality] || '';

  // Header
  document.getElementById('dm-eyebrow').textContent =
    `◆ ${driver.code || ''} · ${driver.nationality} · ${driver.dateOfBirth?.substring(0,4) || ''}`;
  document.getElementById('dm-name').textContent =
    `${driver.givenName} ${driver.familyName}`;
  document.getElementById('dm-hero-num').textContent = driver.permanentNumber || '';

  // Meta row
  document.getElementById('dm-meta').innerHTML = `
    <span class="dm-meta-item"><span class="dm-meta-dot"></span>${flag} ${driver.nationality}</span>
    <span class="dm-meta-item"><span class="dm-meta-dot"></span>${standingItem.Constructors[0]?.name || ''}</span>
    <span class="dm-meta-item"><span class="dm-meta-dot"></span>P${standingItem.position} · ${standingItem.points} pts this season</span>
  `;

  // Apply team accent colour to border
  const modal = document.getElementById('driverModalInner');
  modal.style.borderTopColor = teamHex;

  // Body: loading state
  document.getElementById('dm-body').innerHTML = `
    <div class="dm-loading">
      <div style="margin-bottom: 8px;">
        <div class="skeleton-line" style="width: 100%;"></div>
        <div class="skeleton-line" style="width: 90%;"></div>
        <div class="skeleton-line" style="width: 60%;"></div>
      </div>
      <div class="skeleton-label"></div>
      <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(100px, 1fr)); gap: 16px;">
        <div class="skeleton-box"></div>
        <div class="skeleton-box"></div>
        <div class="skeleton-box"></div>
        <div class="skeleton-box"></div>
        <div class="skeleton-box"></div>
      </div>
    </div>`;

  // Open overlay
  document.getElementById('driverModal').classList.add('open');
  document.body.style.overflow = 'hidden';

  // Fetch career data
  fetchCareerStats(driver);
}

// ── Modal: Fetch career stats ──

async function fetchCareerStats(driver) {
  if (driver.driverId !== currentDriverId) return;

  const id  = driver.driverId;
  const api = DRIVERS_API;

  try {
    // 5 parallel requests — all return 0 or 1 results but MRData.total is always accurate
    const [standingsRes, totalRes, p1Res, p2Res, p3Res, flRes] = await Promise.all([
      fetch(`${api}/drivers/${id}/driverStandings.json?limit=100`),
      fetch(`${api}/drivers/${id}/results.json?limit=1`),
      fetch(`${api}/drivers/${id}/results/1.json?limit=1`),
      fetch(`${api}/drivers/${id}/results/2.json?limit=1`),
      fetch(`${api}/drivers/${id}/results/3.json?limit=1`),
      fetch(`${api}/drivers/${id}/fastest/1/results.json?limit=1`),
    ]);

    if (driver.driverId !== currentDriverId) return; // stale guard

    const safeJson = async (res) => {
      if (!res.ok) return { MRData: { total: "0" } };
      try { return await res.json(); } catch(e) { return { MRData: { total: "0" } }; }
    };

    const seasonsRes = await fetch(`${api}/drivers/${id}/seasons.json?limit=100`);
    const seasonsData = await safeJson(seasonsRes);
    const allSeasons = seasonsData.MRData?.SeasonTable?.Seasons || [];
    allSeasons.sort((a, b) => parseInt(b.season) - parseInt(a.season));

    const [totalData, p1Data, p2Data, p3Data, flData] = await Promise.all([
      fetch(`${api}/drivers/${id}/results.json?limit=1`).then(safeJson),
      fetch(`${api}/drivers/${id}/results/1.json?limit=1`).then(safeJson),
      fetch(`${api}/drivers/${id}/results/2.json?limit=1`).then(safeJson),
      fetch(`${api}/drivers/${id}/results/3.json?limit=1`).then(safeJson),
      fetch(`${api}/drivers/${id}/fastest/1/results.json?limit=1`).then(safeJson)
    ]);

    // Fetch season standings sequentially to avoid Jolpica API rate limits (429 Too Many Requests)
    // which was silently failing and causing the Season History table to be empty.
    const allStandingsData = [];
    for (const s of allSeasons) {
      if (driver.driverId !== currentDriverId) return; // stale guard
      try {
        const res = await fetch(`${api}/${s.season}/drivers/${id}/driverStandings.json`);
        allStandingsData.push(await safeJson(res));
      } catch (e) {
        // Continue to next season if one fails
      }
    }

    if (driver.driverId !== currentDriverId) return; // stale guard

    // ── Derive stats ──
    const totalRaces  = parseInt(totalData.MRData?.total)  || 0;
    const wins        = parseInt(p1Data.MRData?.total)     || 0;
    const p2          = parseInt(p2Data.MRData?.total)     || 0;
    const p3          = parseInt(p3Data.MRData?.total)     || 0;
    const podiums     = wins + p2 + p3;
    const fastestLaps = parseInt(flData.MRData?.total)     || 0;

    // Build Season history (already sorted most recent first)
    const seasonsList = allStandingsData
      .map(d => d.MRData?.StandingsTable?.StandingsLists?.[0])
      .filter(Boolean);

    const CHAMPIONS = { 'hamilton': 7, 'max_verstappen': 4, 'alonso': 2, 'norris': 1 };
    const championships = CHAMPIONS[id] || 0;

    renderDriverModalBody(driver, totalRaces, wins, podiums, fastestLaps, championships, seasonsList);

  } catch (err) {
    console.error('[drivers] career fetch error:', err);
    if (driver.driverId === currentDriverId) {
      document.getElementById('dm-body').innerHTML = `
        <div style="padding:40px 0;text-align:center;font-family:'JetBrains Mono',monospace;font-size:10px;letter-spacing:.16em;text-transform:uppercase;color:rgba(255,255,255,0.25)">
          Career data unavailable
        </div>`;
    }
  }
}

// ── Modal: Render body ──

function renderDriverModalBody(driver, totalRaces, wins, podiums, fastestLaps, championships, seasons) {
  if (driver.driverId !== currentDriverId) return;

  const bio = DRIVER_BIOS[driver.driverId] ||
    `${driver.givenName} ${driver.familyName} is a Formula 1 driver competing in the 2026 season.`;

  // Season history rows
  const historyRows = seasons.map(s => {
    const sd   = s.DriverStandings[0];
    const pos  = parseInt(sd?.position || sd?.positionText);
    const posClass = pos === 1 ? 'dm-pos-1' : pos === 2 ? 'dm-pos-2' : pos === 3 ? 'dm-pos-3' : '';
    const teamStr  = sd?.Constructors?.[0]?.name || '—';
    const pts      = sd?.points || '0';
    
    const isTrophy = (pos === 1 && parseInt(s.season) < 2026);
    const posStr   = isNaN(pos) ? (sd?.positionText && sd?.positionText !== '-' ? sd.positionText : 'NC') : (pos <= 3 ? `${isTrophy ? '🏆 ' : ''}P${pos}` : `P${pos}`);
    
    return `
      <tr>
        <td class="dm-season-year">${s.season}</td>
        <td class="dm-season-team">${teamStr}</td>
        <td class="dm-season-pos ${posClass}">${posStr}</td>
        <td class="dm-season-pts">${pts} pts</td>
      </tr>`;
  }).join('');

  document.getElementById('dm-body').innerHTML = `
    <div class="dm-bio">${bio}</div>

    <div class="dm-section-label">Career Statistics</div>
    <div class="dm-stats-grid">
      <div class="dm-stat-cell">
        <div class="dm-stat-num">${totalRaces}</div>
        <div class="dm-stat-label">Races</div>
      </div>
      <div class="dm-stat-cell">
        <div class="dm-stat-num">${wins}</div>
        <div class="dm-stat-label">Wins</div>
      </div>
      <div class="dm-stat-cell">
        <div class="dm-stat-num">${podiums}</div>
        <div class="dm-stat-label">Podiums</div>
      </div>
      <div class="dm-stat-cell" style="border-color: rgba(177,83,204,0.25);">
        <div class="dm-stat-num" style="color: #df99df;">${fastestLaps}</div>
        <div class="dm-stat-label">Fastest Laps</div>
      </div>
      <div class="dm-stat-cell" style="${championships > 0 ? 'border-color: rgba(212,160,23,0.35);' : ''}">
        <div class="dm-stat-num" style="${championships > 0 ? 'color: var(--gold);' : ''}">${championships}</div>
        <div class="dm-stat-label">Championships</div>
      </div>
    </div>

    ${seasons.length > 0 ? `
      <div class="dm-section-label">Season History</div>
      <table class="dm-history-table">
        <thead>
          <tr>
            <th>Season</th>
            <th>Team</th>
            <th style="text-align:right">Position</th>
            <th style="text-align:right">Points</th>
          </tr>
        </thead>
        <tbody>${historyRows}</tbody>
      </table>` : ''}
  `;
}

// ── Modal: Close ──

function closeDriverModal() {
  currentDriverId = null;
  document.getElementById('driverModal').classList.remove('open');
  document.body.style.overflow = '';
}

// ── Event Listeners ──

document.getElementById('dmClose').addEventListener('click', closeDriverModal);

document.getElementById('driverModal').addEventListener('click', (e) => {
  if (e.target === e.currentTarget) closeDriverModal();
});

document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') closeDriverModal();
});

// ── Init ──

fetchAndRenderDriverGrid();
