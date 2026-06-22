const api = 'https://api.jolpi.ca/ergast/f1';

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

// ── Shared Utils ──
async function safeJson(res) {
  if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
  return res.json();
}

// ── Styling / Colors lookup ──
const TEAM_COLORS = {
  'mercedes': '#27F4D2',
  'ferrari': '#E8002D',
  'mclaren': '#FF8000',
  'red_bull': '#3671C6',
  'aston_martin': '#229971',
  'alpine': '#0093cc',
  'haas': '#B6BABD',
  'rb': '#6692FF',
  'williams': '#64C4FF',
  'audi': '#F50537',
  'cadillac': '#FFB800'
};

const CHAMPIONSHIPS = {
  'ferrari': 16,
  'williams': 9,
  'mclaren': 8,
  'mercedes': 8,
  'red_bull': 6
};

// ── Static team bios ──
const TEAM_BIOS = {
  'mercedes': 'The Silver Arrows dominated the dawn of the turbo-hybrid era with unprecedented success. Under new leadership and returning to their iconic silver livery, they look to reclaim their place at the summit of the sport.',
  'ferrari': 'The oldest, most successful, and most iconic team in Formula 1 history. The Prancing Horse carries the hopes of an entire nation every time it hits the track, forever pursuing its glorious legacy.',
  'mclaren': 'Founded by Bruce McLaren, the Woking-based outfit is a giant of the sport. Recently returning to genuine championship contention with a dynamic driver pairing and blistering development pace.',
  'red_bull': 'The Milton Keynes squad redefined modern F1 with their ruthless efficiency and aerodynamic mastery. They have established two separate eras of outright dominance in the 21st century.',
  'alpine': 'The French national team of Formula 1. Operating out of Enstone and Viry-Châtillon, Alpine brings Gallic flair and immense manufacturer backing to their pursuit of the top step.',
  'rb': 'The Faenza-based sister team to Red Bull Racing, formerly Toro Rosso and AlphaTauri. Known for aggressively developing young talent and occasionally pulling off stunning underdog results.',
  'haas': 'The sole American team on the grid. Operating with a unique, lean organizational model and a deep technical partnership with Ferrari, they are the perennial scrappy underdogs of the midfield.',
  'williams': 'A proudly independent team with a rich championship-winning history. After years of struggles, Williams is systematically rebuilding its infrastructure to return to its former glory.',
  'audi': 'The German automotive powerhouse officially enters Formula 1 as a works team, taking over the Sauber operation. Bringing vast resources and motorsport pedigree, their arrival is one of the most anticipated in modern F1 history.',
  'aston_martin': 'Racing in iconic British racing green, Aston Martin operates out of a state-of-the-art facility in Silverstone. Backed by immense ambition, they are determined to challenge the established elite.',
  'cadillac': 'The newest addition to the Formula 1 grid. Bringing the might of General Motors and American racing royalty to the pinnacle of motorsport, Cadillac aims to establish a trans-Atlantic powerhouse.'
};

const TEAM_PRINCIPALS = {
  'mclaren': { name: 'Andrea Stella', img: 'https://media.formula1.com/image/upload/t_16by9North/c_lfill,w_3392/q_auto/v1740000001/fom-website/2025/Bahrain/GettyImages-2210107527.webp' },
  'mercedes': { name: 'Toto Wolff', img: 'https://media.formula1.com/image/upload/t_16by9North/c_lfill,w_3392/q_auto/v1740000001/trackside-images/2025/F1_Grand_Prix_of_Brazil/2245811681.webp' },
  'red_bull': { name: 'Laurent Mekies', img: 'https://media.formula1.com/image/upload/t_16by9North/c_lfill,w_3392/q_auto/v1740000001/fom-website/2025/Qatar/GettyImages-2249023480.webp' },
  'ferrari': { name: 'Fred Vasseur', img: 'https://media.formula1.com/image/upload/t_16by9North/c_lfill,w_3392/q_auto/v1740000001/trackside-images/2025/F1_Grand_Prix_of_Abu_Dhabi___Practice/2250117585.webp' },
  'williams': { name: 'James Vowles', img: 'https://media.formula1.com/image/upload/t_16by9North/c_lfill,w_3392/q_auto/v1740000001/trackside-images/2025/F1_Grand_Prix_of_Brazil___Previews/2245297636.webp' },
  'rb': { name: 'Alan Permane', img: 'https://media.formula1.com/image/upload/t_16by9North/c_lfill,w_3392/q_auto/v1740000001/trackside-images/2025/F1_Grand_Prix_of_Las_Vegas___Previews/2247516844.webp' },
  'aston_martin': { name: 'Andy Cowell', img: '' },
  'haas': { name: 'Ayao Komatsu', img: 'https://media.formula1.com/image/upload/t_16by9North/c_lfill,w_3392/q_auto/v1740000001/trackside-images/2025/F1_Grand_Prix_of_Monaco___Previews/2216517332.webp' },
  'audi': { name: 'Jonathan Wheatley', img: 'https://media.formula1.com/image/upload/t_16by9North/c_lfill,w_3392/q_auto/v1740000001/trackside-images/2025/F1_Grand_Prix_of_Las_Vegas___Previews/2247510876.webp' },
  'alpine': { name: 'Flavio Briatore', img: 'https://media.formula1.com/image/upload/t_16by9North/c_lfill,w_3392/q_auto/v1740000001/fom-website/2025/Austria/GettyImages-2222409477.webp' },
  'cadillac': { name: 'Graeme Lowdon', img: 'https://media.formula1.com/image/upload/t_16by9North/c_lfill,w_3392/q_auto/v1740000001/trackside-images/2024/F1_Grand_Prix_of_Austria___Sprint__Qualifying/2159773387.webp' }
};

const TEAM_DETAILS = {
  "alpine": {
    "Highest Race Finish": "1 (x21)",
    "Pole Positions": "20",
    "World Championships": "2",
    "Base": "Enstone, United Kingdom",
    "Team Chief": "Flavio Briatore",
    "Technical Chief": "David Sanchez",
    "Chassis": "A526",
    "Power Unit": "Mercedes",
    "First Team Entry": "1986"
  },
  "aston_martin": {
    "Highest Race Finish": "1 (x1)",
    "Pole Positions": "1",
    "World Championships": "0",
    "Base": "Silverstone, United Kingdom",
    "Team Chief": "Andy Cowell",
    "Technical Chief": "Enrico Cardile",
    "Chassis": "AMR26",
    "Power Unit": "Honda",
    "First Team Entry": "2018"
  },
  "audi": {
    "Highest Race Finish": "9 (x1)",
    "Pole Positions": "0",
    "World Championships": "0",
    "Base": "Hinwil, Switzerland",
    "Team Chief": "Mattia Binotto",
    "Technical Chief": "James Key",
    "Chassis": "R26",
    "Power Unit": "Audi",
    "First Team Entry": "2026"
  },
  "cadillac": {
    "Highest Race Finish": "13 (x1)",
    "Pole Positions": "0",
    "World Championships": "0",
    "Base": "Silverstone, United Kingdom",
    "Team Chief": "Graeme Lowdon",
    "Technical Chief": "Nick Chester",
    "Chassis": "MAC-26",
    "Power Unit": "Ferrari",
    "First Team Entry": "2026"
  },
  "ferrari": {
    "Highest Race Finish": "1 (x250)",
    "Pole Positions": "254",
    "World Championships": "16",
    "Base": "Maranello, Italy",
    "Team Chief": "Frédéric Vasseur",
    "Technical Chief": "Loic Serra / Enrico Gualtieri",
    "Chassis": "SF-26",
    "Power Unit": "Ferrari",
    "First Team Entry": "1950"
  },
  "haas": {
    "Highest Race Finish": "4 (x2)",
    "Pole Positions": "0",
    "World Championships": "0",
    "Base": "Kannapolis, United States",
    "Team Chief": "Ayao Komatsu",
    "Technical Chief": "Andrea De Zordo",
    "Chassis": "VF-26",
    "Power Unit": "Ferrari",
    "First Team Entry": "2016"
  },
  "mclaren": {
    "Highest Race Finish": "1 (x203)",
    "Pole Positions": "177",
    "World Championships": "10",
    "Base": "Woking, United Kingdom",
    "Team Chief": "Andrea Stella",
    "Technical Chief": "Peter Prodromou / Neil Houldey",
    "Chassis": "MCL40",
    "Power Unit": "Mercedes",
    "First Team Entry": "1966"
  },
  "mercedes": {
    "Highest Race Finish": "1 (x128)",
    "Pole Positions": "143",
    "World Championships": "8",
    "Base": "Brackley, United Kingdom",
    "Team Chief": "Toto Wolff",
    "Technical Chief": "James Allison",
    "Chassis": "W17",
    "Power Unit": "Mercedes",
    "First Team Entry": "1970"
  },
  "rb": {
    "Highest Race Finish": "1 (x2)",
    "Pole Positions": "1",
    "World Championships": "0",
    "Base": "Faenza, Italy",
    "Team Chief": "Alan Permane",
    "Technical Chief": "Tim Goss",
    "Chassis": "VCARB 03",
    "Power Unit": "Red Bull Ford",
    "First Team Entry": "1985"
  },
  "red_bull": {
    "Highest Race Finish": "1 (x130)",
    "Pole Positions": "111",
    "World Championships": "6",
    "Base": "Milton Keynes, United Kingdom",
    "Team Chief": "Laurent Mekies",
    "Technical Chief": "Pierre Waché",
    "Chassis": "RB22",
    "Power Unit": "Red Bull Ford",
    "First Team Entry": "1997"
  },
  "williams": {
    "Highest Race Finish": "1 (x114)",
    "Pole Positions": "128",
    "World Championships": "8",
    "Base": "Grove, United Kingdom",
    "Team Chief": "James Vowles",
    "Technical Chief": "Pat Fry",
    "Chassis": "FW48",
    "Power Unit": "Mercedes",
    "First Team Entry": "1978"
  }
};

const TEAM_CARS = {
  "alpine": "https://media.formula1.com/image/upload/c_lfill,w_512/q_auto/d_common:f1:2026:fallback:car:2026fallbackcarright.webp/v1740000001/common/f1/2026/alpine/2026alpinecarright.webp",
  "aston_martin": "https://media.formula1.com/image/upload/c_lfill,w_512/q_auto/d_common:f1:2026:fallback:car:2026fallbackcarright.webp/v1740000001/common/f1/2026/astonmartin/2026astonmartincarright.webp",
  "audi": "https://media.formula1.com/image/upload/c_lfill,w_512/q_auto/d_common:f1:2026:fallback:car:2026fallbackcarright.webp/v1740000001/common/f1/2026/audi/2026audicarright.webp",
  "cadillac": "https://media.formula1.com/image/upload/c_lfill,w_512/q_auto/d_common:f1:2026:fallback:car:2026fallbackcarright.webp/v1740000001/common/f1/2026/cadillac/2026cadillaccarright.webp",
  "ferrari": "https://media.formula1.com/image/upload/c_lfill,w_512/q_auto/d_common:f1:2026:fallback:car:2026fallbackcarright.webp/v1740000001/common/f1/2026/ferrari/2026ferraricarright.webp",
  "haas": "https://media.formula1.com/image/upload/c_lfill,w_512/q_auto/d_common:f1:2026:fallback:car:2026fallbackcarright.webp/v1740000001/common/f1/2026/haasf1team/2026haasf1teamcarright.webp",
  "mclaren": "https://media.formula1.com/image/upload/c_lfill,w_512/q_auto/d_common:f1:2026:fallback:car:2026fallbackcarright.webp/v1740000001/common/f1/2026/mclaren/2026mclarencarright.webp",
  "mercedes": "https://media.formula1.com/image/upload/c_lfill,w_512/q_auto/d_common:f1:2026:fallback:car:2026fallbackcarright.webp/v1740000001/common/f1/2026/mercedes/2026mercedescarright.webp",
  "rb": "https://media.formula1.com/image/upload/c_lfill,w_512/q_auto/d_common:f1:2026:fallback:car:2026fallbackcarright.webp/v1740000001/common/f1/2026/racingbulls/2026racingbullscarright.webp",
  "red_bull": "https://media.formula1.com/image/upload/c_lfill,w_512/q_auto/d_common:f1:2026:fallback:car:2026fallbackcarright.webp/v1740000001/common/f1/2026/redbullracing/2026redbullracingcarright.webp",
  "williams": "https://media.formula1.com/image/upload/c_lfill,w_512/q_auto/d_common:f1:2026:fallback:car:2026fallbackcarright.webp/v1740000001/common/f1/2026/williams/2026williamscarright.webp"
};

// Explicit 2026 lineup to prevent API sorting issues & reserve drivers
const TEAM_DRIVERS = {
  'mercedes': ['russell', 'antonelli'],
  'ferrari': ['leclerc', 'hamilton'],
  'mclaren': ['norris', 'piastri'],
  'red_bull': ['max_verstappen', 'hadjar'],
  'aston_martin': ['alonso', 'stroll'],
  'alpine': ['gasly', 'colapinto'],
  'haas': ['ocon', 'bearman'],
  'rb': ['lawson', 'arvid_lindblad'],
  'williams': ['albon', 'sainz'],
  'audi': ['hulkenberg', 'bortoleto'],
  'cadillac': ['bottas', 'perez']
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
  'German': '🇩🇪', 'Italian': '🇮🇹', 'British': '🇬🇧', 'Austrian': '🇦🇹',
  'French': '🇫🇷', 'American': '🇺🇸'
};

// ── State ──
let currentTeamId = null;

// ── Render Team Grid ──

async function fetchAndRenderTeamGrid() {
  const container = document.getElementById('teamsGrid');
  const countEl = document.getElementById('teamsCount');

  try {
    const data = await fetchWithCache(`${api}/current/constructorStandings.json`, 'cache_teams_grid');
    const standings = data.MRData.StandingsTable.StandingsLists[0]?.ConstructorStandings || [];

    countEl.textContent = `${standings.length} Constructors`;
    container.innerHTML = '';

    standings.forEach((item, index) => {
      const team = item.Constructor;
      const tId = team.constructorId;
      const isFav = localStorage.getItem(`fav_team_${tId}`) === 'true';

      const hex = TEAM_COLORS[tId] || '#8a8172';
      const delay = Math.min(index * 0.08, 1.2);
      
      const card = document.createElement('div');
      card.className = `team-card ${isFav ? 'is-favorite' : ''}`;
      card.style.cssText = `--team-color: ${hex}; animation-delay: ${delay}s;`;

      const carImg = TEAM_CARS[tId];
      const carHtml = carImg ? `<div class="dc-car-wrap"><img src="${carImg}" class="dc-car-img" alt="${team.name} F1 Car"></div>` : '';

      card.innerHTML = `
        <div class="dc-number">P${item.position}</div>
        <div class="dc-name">${team.name}</div>
        <div class="dc-team">${team.nationality}</div>
        ${carHtml}
        <div class="dc-footer">
          <div class="dc-pos-pts">${item.points} <span class="dc-pts">PTS</span></div>
          <button class="dc-fav-btn ${isFav ? 'active' : ''}" data-id="${tId}" aria-label="Toggle favorite">★</button>
        </div>
        <div class="dc-view-hint">View Profile</div>
      `;

      // Fav button logic
      const btn = card.querySelector('.dc-fav-btn');
      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        const active = btn.classList.toggle('active');
        if (active) {
          localStorage.setItem(`fav_team_${tId}`, 'true');
          card.classList.add('is-favorite');
        } else {
          localStorage.removeItem(`fav_team_${tId}`);
          card.classList.remove('is-favorite');
        }
      });

      // Card click -> modal
      card.addEventListener('click', () => {
        openTeamModal(team, item);
      });

      container.appendChild(card);
    });

  } catch (err) {
    console.error('Failed to load teams', err);
    container.innerHTML = `<div class="grid-loading" style="color:var(--racing)">Failed to load data. Try refreshing.</div>`;
  }
}

// ── Team Modal Logic ──

function openTeamModal(team, standingItem) {
  const id = team.constructorId;
  currentTeamId = id;
  const teamHex = TEAM_COLORS[id] || '#8a8172';
  const flag = NATIONALITY_FLAGS[team.nationality] || '🌐';

  // Hero
  document.getElementById('dm-name').textContent = team.name;
  
  // Set background number to position, e.g. "1" instead of driver number
  document.getElementById('dm-hero-num').textContent = standingItem.position || '';

  // Meta row
  document.getElementById('dm-meta').innerHTML = `
    <span class="dm-meta-item"><span class="dm-meta-dot"></span>${flag} ${team.nationality}</span>
    <span class="dm-meta-item"><span class="dm-meta-dot"></span>P${standingItem.position} · ${standingItem.points} pts this season</span>
  `;

  // Apply team accent colour to border
  const modal = document.getElementById('teamModalInner');
  modal.style.borderTopColor = teamHex;
  
  // Clear personnel
  document.getElementById('dm-personnel').innerHTML = '';

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
  document.getElementById('teamModal').classList.add('open');
  document.body.style.overflow = 'hidden';

  // Fetch career data
  fetchCareerStats(team);
}

function closeTeamModal() {
  currentTeamId = null;
  document.getElementById('teamModal').classList.remove('open');
  document.body.style.overflow = '';
}
document.getElementById('dmClose').addEventListener('click', closeTeamModal);
document.getElementById('teamModal').addEventListener('click', e => {
  if (e.target.id === 'teamModal') closeTeamModal();
});
document.addEventListener('keydown', e => {
  if (e.key === 'Escape' && document.getElementById('teamModal').classList.contains('open')) {
    closeTeamModal();
  }
});

// ── Fetch Extended Data ──

async function getWikiImage(wikiUrlOrTitle, fallbackName) {
  try {
    let title = wikiUrlOrTitle;
    if (title.includes('wikipedia.org/wiki/')) {
      title = title.split('wiki/')[1];
    }
    const res = await fetch(`https://en.wikipedia.org/api/rest_v1/page/summary/${title}`);
    if (res.ok) {
      const data = await res.json();
      if (data.originalimage && data.originalimage.source) {
        return data.originalimage.source;
      } else if (data.thumbnail && data.thumbnail.source) {
        return data.thumbnail.source;
      }
    }
  } catch (e) {
    // Ignore fetch errors
  }
  return `https://ui-avatars.com/api/?name=${encodeURIComponent(fallbackName)}&background=1d1d1d&color=fff&size=256&bold=true`;
}

async function fetchCareerStats(team) {
  const id = team.constructorId;
  const teamHex = TEAM_COLORS[id] || '#8a8172';

  try {
    // Fire analytical queries in parallel
    const [totRes, p1Res, p2Res, p3Res, seasonsRes, driversRes] = await Promise.all([
      fetch(`${api}/constructors/${id}/results.json?limit=1`),
      fetch(`${api}/constructors/${id}/results/1.json?limit=1`),
      fetch(`${api}/constructors/${id}/results/2.json?limit=1`),
      fetch(`${api}/constructors/${id}/results/3.json?limit=1`),
      fetch(`${api}/constructors/${id}/seasons.json?limit=100`),
      fetch(`${api}/current/constructors/${id}/drivers.json`)
    ]);

    if (team.constructorId !== currentTeamId) return; // guard against stale modal

    const tData = await safeJson(totRes);
    const p1Data = await safeJson(p1Res);
    const p2Data = await safeJson(p2Res);
    const p3Data = await safeJson(p3Res);
    const seasonsData = await safeJson(seasonsRes);
    const driversData = await safeJson(driversRes);

    const totalRaces = tData.MRData?.total || 0;
    const wins = p1Data.MRData?.total || 0;
    const p2s = parseInt(p2Data.MRData?.total || 0);
    const p3s = parseInt(p3Data.MRData?.total || 0);
    const podiums = parseInt(wins) + p2s + p3s;
    const championships = CHAMPIONSHIPS[id] || 0;

    const allSeasons = seasonsData.MRData?.SeasonTable?.Seasons || [];
    allSeasons.sort((a, b) => parseInt(b.season) - parseInt(a.season));

    // Fetch season standings sequentially to avoid Jolpica API rate limits (429 Too Many Requests)
    const allStandingsData = [];
    for (const s of allSeasons) {
      if (team.constructorId !== currentTeamId) return; // stale guard
      try {
        const res = await fetch(`${api}/${s.season}/constructors/${id}/constructorStandings.json`);
        allStandingsData.push(await safeJson(res));
      } catch (e) {
        // Continue to next season if one fails
      }
    }

    if (team.constructorId !== currentTeamId) return;

    const allDrivers = driversData.MRData?.DriverTable?.Drivers || [];
    
    // Use hardcoded lineup to avoid API returning reserves or wrong order
    let driversList = [];
    const expectedIds = TEAM_DRIVERS[id] || [];
    
    if (expectedIds.length > 0) {
      for (const eId of expectedIds) {
        const found = allDrivers.find(d => d.driverId === eId);
        if (found) {
          driversList.push(found);
        } else {
          // Fallback if API hasn't updated for the driver yet
          const nameParts = eId.split('_').map(s => s.charAt(0).toUpperCase() + s.slice(1));
          driversList.push({
            driverId: eId,
            givenName: nameParts[0],
            familyName: nameParts.slice(1).join(' ') || nameParts[0],
            url: `https://en.wikipedia.org/wiki/${nameParts.join('_')}`
          });
        }
      }
    } else {
      driversList = allDrivers.slice(0, 2);
    }

    // Render Stats
    const bio = TEAM_BIOS[id] || `${team.name} is a Formula 1 constructor competing in the current season.`;
    
    // Generate Personnel HTML for Hero Section
    const principalInfo = TEAM_PRINCIPALS[id] || { name: 'Team Principal', img: '' };
    const pName = principalInfo.name;

    const [pImg, d1Img, d2Img] = await Promise.all([
      Promise.resolve(principalInfo.img || `https://ui-avatars.com/api/?name=${encodeURIComponent(pName)}&background=1d1d1d&color=fff&size=256&bold=true`),
      driversList[0] ? Promise.resolve(DRIVER_IMAGES[driversList[0].driverId] || await getWikiImage(driversList[0].url, `${driversList[0].givenName} ${driversList[0].familyName}`)) : Promise.resolve(''),
      driversList[1] ? Promise.resolve(DRIVER_IMAGES[driversList[1].driverId] || await getWikiImage(driversList[1].url, `${driversList[1].givenName} ${driversList[1].familyName}`)) : Promise.resolve('')
    ]);

    let personnelHtml = `
      <div class="dm-person">
        <img class="dm-person-img dm-principal-img" src="${pImg}" alt="${pName}" />
        <div class="dm-person-role">Principal</div>
        <div class="dm-person-name">${pName}</div>
      </div>
    `;

    if (driversList[0]) {
      const d = driversList[0];
      personnelHtml += `
        <div class="dm-person">
          <img class="dm-person-img" src="${d1Img}" alt="${d.givenName}" />
          <div class="dm-person-role">Driver</div>
          <div class="dm-person-name">${d.givenName}<br>${d.familyName}</div>
        </div>
      `;
    }

    if (driversList[1]) {
      const d = driversList[1];
      personnelHtml += `
        <div class="dm-person">
          <img class="dm-person-img" src="${d2Img}" alt="${d.givenName}" />
          <div class="dm-person-role">Driver</div>
          <div class="dm-person-name">${d.givenName}<br>${d.familyName}</div>
        </div>
      `;
    }

    const specs = TEAM_DETAILS[team.constructorId] || {};

    let html = '';
    
    html += `<div class="dm-bio" style="border-left-color: ${teamHex}">${bio}</div>`;

    // Technical Specifications Grid
    if (Object.keys(specs).length > 0) {
      html += `<div class="dm-section-label">Technical Specifications</div>`;
      html += `<div class="tm-specs-grid">`;
      for (const [key, val] of Object.entries(specs)) {
        if (['Highest Race Finish', 'Pole Positions', 'World Championships'].includes(key)) continue;
        html += `
          <div class="tm-spec-cell">
            <div class="tm-spec-label">${key}</div>
            <div class="tm-spec-val">${val}</div>
          </div>
        `;
      }
      html += `</div>`;
    }

    html += `
      <div class="dm-section-label">All-Time Statistics</div>
      <div class="dm-stats-grid">
        <div class="dm-stat-cell">
          <div class="dm-stat-num">${totalRaces}</div>
          <div class="dm-stat-label">Grands Prix</div>
        </div>
        <div class="dm-stat-cell">
          <div class="dm-stat-num">${championships}</div>
          <div class="dm-stat-label">World Titles</div>
        </div>
        <div class="dm-stat-cell">
          <div class="dm-stat-num">${wins}</div>
          <div class="dm-stat-label">Race Wins</div>
        </div>
        <div class="dm-stat-cell">
          <div class="dm-stat-num">${podiums}</div>
          <div class="dm-stat-label">Podiums</div>
        </div>
        <div class="dm-stat-cell">
          <div class="dm-stat-num">${allSeasons.length}</div>
          <div class="dm-stat-label">Seasons</div>
        </div>
        ${specs['Pole Positions'] ? `
        <div class="dm-stat-cell">
          <div class="dm-stat-num" style="font-size:22px">${specs['Pole Positions']}</div>
          <div class="dm-stat-label">Pole Positions</div>
        </div>` : ''}
        ${specs['Highest Race Finish'] ? `
        <div class="dm-stat-cell">
          <div class="dm-stat-num" style="font-size:16px">${specs['Highest Race Finish']}</div>
          <div class="dm-stat-label">Best Finish</div>
        </div>` : ''}
      </div>
    `;

    // Render Season History Table
    html += `
      <div class="dm-section-label">Season History</div>
      <table class="dm-history-table">
        <thead>
          <tr>
            <th>Year</th>
            <th>Pos</th>
            <th style="text-align:right;">Points</th>
          </tr>
        </thead>
        <tbody>
    `;

    for (const d of allStandingsData) {
      const st = d.MRData?.StandingsTable;
      if (!st || !st.StandingsLists || st.StandingsLists.length === 0) continue;
      const list = st.StandingsLists[0];
      const cs = list.ConstructorStandings[0];
      if (!cs) continue;

      const pos = parseInt(cs.position);
      let pClass = '';
      if (pos === 1) pClass = 'dm-pos-1';
      else if (pos === 2) pClass = 'dm-pos-2';
      else if (pos === 3) pClass = 'dm-pos-3';

      const isTrophy = (pos === 1 && parseInt(list.season) < 2026);
      const posStr = pos <= 3 ? `${isTrophy ? '🏆 ' : ''}P${pos}` : `P${pos}`;

      html += `
        <tr>
          <td class="dm-season-year">${list.season}</td>
          <td class="dm-season-pos ${pClass}">${posStr}</td>
          <td class="dm-season-pts">${cs.points}</td>
        </tr>
      `;
    }

    html += `</tbody></table>`;
    
    // Safety check again before DOM injection
    if (team.constructorId === currentTeamId) {
      document.getElementById('dm-body').innerHTML = html;
      document.getElementById('dm-personnel').innerHTML = personnelHtml;
    }

  } catch (err) {
    console.error('Error fetching career stats', err);
    if (team.constructorId === currentTeamId) {
      document.getElementById('dm-body').innerHTML = `
        <div style="padding:40px 0; color:var(--racing); font-family:'JetBrains Mono', monospace; font-size:11px;">
          Error loading history data.
        </div>`;
    }
  }
}

// ── Init ──
fetchAndRenderTeamGrid();
