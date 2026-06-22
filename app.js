const API_BASE = 'https://api.jolpi.ca/ergast/f1/current';

// Maps Constructor IDs to CSS Variables
const TEAM_COLORS = {
  'mercedes': 'var(--mercedes)',
  'ferrari': 'var(--ferrari)',
  'mclaren': 'var(--mclaren)',
  'red_bull': 'var(--redbull)',
  'aston_martin': 'var(--aston)',
  'alpine': 'var(--alpine)',
  'rb': 'var(--racingbulls)',
  'haas': 'var(--haas)',
  'williams': 'var(--williams)',
  'audi': 'var(--audi)',
  'cadillac': 'var(--cadillac)',
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

async function fetchWithCache(url, key) {
  const cached = sessionStorage.getItem(key);
  if (cached) {
    try {
      const parsed = JSON.parse(cached);
      if (Date.now() - parsed.ts < 300000) return parsed.data; // 5 minute cache
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

async function fetchDriverStandings() {
  try {
    const data = await fetchWithCache(`${API_BASE}/driverStandings.json`, 'cache_dash_drv');
    const standings = data.MRData.StandingsTable.StandingsLists[0]?.DriverStandings || [];
    if (!standings.length) throw new Error("No driver standings data");

    const container = document.getElementById('driver-standings-container');
    container.innerHTML = '';

    const leaderPoints = parseInt(standings[0].points);

    standings.forEach((item, index) => {
      const isLeader = index === 0;
      const delay = 4.5 + (index * 0.08);
      const constructorId = item.Constructors[0]?.constructorId || 'default';
      const teamColor = TEAM_COLORS[constructorId] || 'var(--ink-3)';
      const teamName = item.Constructors[0]?.name || 'Unknown';
      const gap = isLeader ? '' : `<span class="gap">−${leaderPoints - parseInt(item.points)}</span>`;
      const favDriver = localStorage.getItem('fav_driver');
      const isFav     = item.Driver.driverId === favDriver;

      const rowHTML = `
        <div class="driver-row ${isLeader ? 'leader' : ''} ${isFav ? 'is-fav' : ''}" style="--team-color: ${teamColor}; animation-delay:${delay}s;">
          <div class="driver-pos">${item.position.padStart(2, '0')}</div>
          <div class="driver-info">
            <div class="driver-line">
              <span class="driver-name">${item.Driver.givenName.charAt(0)}. ${item.Driver.familyName}</span>
              <span class="driver-code" style="background:${teamColor}; color:${isLeader || teamColor === 'var(--mercedes)' ? '#000' : '#fff'}; ">${item.Driver.code || item.Driver.familyName.substring(0, 3).toUpperCase()}</span>
            </div>
            <div class="driver-team">${teamName} · ${item.Driver.nationality.substring(0, 3).toUpperCase()} ${gap ? '· ' + gap : ''}</div>
          </div>
          <div class="driver-pts-wrap">
            <div class="driver-pts">${item.points}</div>
            <div class="driver-pts-sub">pts</div>
          </div>
          <button class="fav-star-btn${isFav ? ' active' : ''}" data-driver-id="${item.Driver.driverId}" title="${isFav ? 'Remove favourite' : 'Set as favourite'}">★</button>
        </div>
      `;
      container.insertAdjacentHTML('beforeend', rowHTML);
    });

    // Favourite star click delegation
    container.addEventListener('click', function handleFavClick(e) {
      const btn = e.target.closest('.fav-star-btn');
      if (!btn) return;
      const dId  = btn.dataset.driverId;
      const cur  = localStorage.getItem('fav_driver');
      cur === dId ? localStorage.removeItem('fav_driver') : localStorage.setItem('fav_driver', dId);
      fetchDriverStandings();
    }, { once: true });



  } catch (err) {
    console.error("Error fetching driver standings", err);
  }
}

async function fetchConstructorStandings() {
  try {
    const data = await fetchWithCache(`${API_BASE}/constructorStandings.json`, 'cache_dash_con');
    const standings = data.MRData.StandingsTable.StandingsLists[0]?.ConstructorStandings || [];
    if (!standings.length) throw new Error("No constructor standings data");

    const container = document.getElementById('constructor-standings-container');
    container.innerHTML = '';

    const maxPoints = parseInt(standings[0].points) || 1;

      const favTeam = localStorage.getItem('fav_team');

      standings.forEach((item, index) => {
      const delay = 4.5 + (index * 0.08);
      const teamColor = TEAM_COLORS[item.Constructor.constructorId] || 'var(--ink-3)';
      const pct = (parseInt(item.points) / maxPoints) * 100;
      const isFav = item.Constructor.constructorId === favTeam;

      const carImgSrc = TEAM_CARS[item.Constructor.constructorId] || '';
      const carImgHTML = carImgSrc ? `<img src="${carImgSrc}" class="dash-img dash-car-img" alt="${item.Constructor.name}">` : `<div class="dash-img-placeholder"></div>`;

      const rowHTML = `
        <div class="con-row${isFav ? ' is-fav' : ''}" style="--team-color: ${teamColor}; animation-delay:${delay}s;">
          <div class="con-top">
            <div class="con-pos">${item.position.padStart(2, '0')}</div>
            <div class="con-info">
              <div class="con-name">${item.Constructor.name}</div>
              <div class="con-engine">${item.Constructor.nationality.substring(0, 3).toUpperCase()}</div>
            </div>
            ${carImgHTML}
            <div class="con-pts">${item.points}</div>
            <button class="fav-star-btn${isFav ? ' active' : ''}" data-team-id="${item.Constructor.constructorId}" title="${isFav ? 'Remove favourite' : 'Set as favourite'}">★</button>
          </div>
          <div class="con-bar"><div class="con-bar-fill" style="width:${pct}%; animation-delay:${delay + 1}s;"></div></div>
        </div>
      `;
      container.insertAdjacentHTML('beforeend', rowHTML);
    });

    // Favourite team click delegation
    container.addEventListener('click', function handleTeamFav(e) {
      const btn = e.target.closest('.fav-star-btn');
      if (!btn) return;
      const tId = btn.dataset.teamId;
      const cur = localStorage.getItem('fav_team');
      cur === tId ? localStorage.removeItem('fav_team') : localStorage.setItem('fav_team', tId);
      fetchConstructorStandings();
    }, { once: true });

  } catch (err) {
    console.error("Error fetching constructor standings", err);
  }
}

let countdownInterval;
let allRaces = []; // Shared with modal logic

const F1_2026_CALENDAR = [
  { season: "2026", round: "1", raceName: "Australian Grand Prix", date: "2026-03-08", time: "14:00:00Z", Circuit: { circuitId: "albert_park", circuitName: "Albert Park Circuit", Location: { locality: "Melbourne", country: "Australia" } } },
  { season: "2026", round: "2", raceName: "Chinese Grand Prix", date: "2026-03-15", time: "14:00:00Z", Circuit: { circuitId: "shanghai", circuitName: "Shanghai International Circuit", Location: { locality: "Shanghai", country: "China" } } },
  { season: "2026", round: "3", raceName: "Japanese Grand Prix", date: "2026-03-29", time: "14:00:00Z", Circuit: { circuitId: "suzuka", circuitName: "Suzuka International Racing Course", Location: { locality: "Suzuka", country: "Japan" } } },
  { season: "2026", round: "4", raceName: "Miami Grand Prix", date: "2026-05-03", time: "14:00:00Z", Circuit: { circuitId: "miami", circuitName: "Miami International Autodrome", Location: { locality: "Miami", country: "USA" } } },
  { season: "2026", round: "5", raceName: "Canadian Grand Prix", date: "2026-05-24", time: "14:00:00Z", Circuit: { circuitId: "villeneuve", circuitName: "Circuit Gilles Villeneuve", Location: { locality: "Montreal", country: "Canada" } } },
  { season: "2026", round: "6", raceName: "Monaco Grand Prix", date: "2026-06-07", time: "14:00:00Z", Circuit: { circuitId: "monaco", circuitName: "Circuit de Monaco", Location: { locality: "Monte-Carlo", country: "Monaco" } } },
  { season: "2026", round: "7", raceName: "Spanish Grand Prix", date: "2026-06-14", time: "14:00:00Z", Circuit: { circuitId: "catalunya", circuitName: "Circuit de Barcelona-Catalunya", Location: { locality: "Montmeló", country: "Spain" } } },
  { season: "2026", round: "8", raceName: "Austrian Grand Prix", date: "2026-06-28", time: "14:00:00Z", Circuit: { circuitId: "red_bull_ring", circuitName: "Red Bull Ring", Location: { locality: "Spielberg", country: "Austria" } } },
  { season: "2026", round: "9", raceName: "British Grand Prix", date: "2026-07-05", time: "14:00:00Z", Circuit: { circuitId: "silverstone", circuitName: "Silverstone Circuit", Location: { locality: "Silverstone", country: "UK" } } },
  { season: "2026", round: "10", raceName: "Belgian Grand Prix", date: "2026-07-19", time: "14:00:00Z", Circuit: { circuitId: "spa", circuitName: "Circuit de Spa-Francorchamps", Location: { locality: "Spa", country: "Belgium" } } },
  { season: "2026", round: "11", raceName: "Hungarian Grand Prix", date: "2026-07-26", time: "14:00:00Z", Circuit: { circuitId: "hungaroring", circuitName: "Hungaroring", Location: { locality: "Mogyoród", country: "Hungary" } } },
  { season: "2026", round: "12", raceName: "Dutch Grand Prix", date: "2026-08-23", time: "14:00:00Z", Circuit: { circuitId: "zandvoort", circuitName: "Circuit Zandvoort", Location: { locality: "Zandvoort", country: "Netherlands" } } },
  { season: "2026", round: "13", raceName: "Italian Grand Prix", date: "2026-09-06", time: "14:00:00Z", Circuit: { circuitId: "monza", circuitName: "Autodromo Nazionale Monza", Location: { locality: "Monza", country: "Italy" } } },
  { season: "2026", round: "14", raceName: "Madrid Grand Prix", date: "2026-09-13", time: "14:00:00Z", Circuit: { circuitId: "madrid", circuitName: "Circuito de Madrid", Location: { locality: "Madrid", country: "Spain" } } },
  { season: "2026", round: "15", raceName: "Azerbaijan Grand Prix", date: "2026-09-26", time: "14:00:00Z", Circuit: { circuitId: "baku", circuitName: "Baku City Circuit", Location: { locality: "Baku", country: "Azerbaijan" } } },
  { season: "2026", round: "16", raceName: "Singapore Grand Prix", date: "2026-10-11", time: "14:00:00Z", Circuit: { circuitId: "marina_bay", circuitName: "Marina Bay Street Circuit", Location: { locality: "Marina Bay", country: "Singapore" } } },
  { season: "2026", round: "17", raceName: "United States Grand Prix", date: "2026-10-25", time: "14:00:00Z", Circuit: { circuitId: "americas", circuitName: "Circuit of the Americas", Location: { locality: "Austin", country: "USA" } } },
  { season: "2026", round: "18", raceName: "Mexico City Grand Prix", date: "2026-11-01", time: "14:00:00Z", Circuit: { circuitId: "rodriguez", circuitName: "Autódromo Hermanos Rodríguez", Location: { locality: "Mexico City", country: "Mexico" } } },
  { season: "2026", round: "19", raceName: "São Paulo Grand Prix", date: "2026-11-08", time: "14:00:00Z", Circuit: { circuitId: "interlagos", circuitName: "Autódromo José Carlos Pace", Location: { locality: "São Paulo", country: "Brazil" } } },
  { season: "2026", round: "20", raceName: "Las Vegas Grand Prix", date: "2026-11-21", time: "14:00:00Z", Circuit: { circuitId: "vegas", circuitName: "Las Vegas Strip Circuit", Location: { locality: "Las Vegas", country: "USA" } } },
  { season: "2026", round: "21", raceName: "Qatar Grand Prix", date: "2026-11-29", time: "14:00:00Z", Circuit: { circuitId: "losail", circuitName: "Lusail International Circuit", Location: { locality: "Lusail", country: "Qatar" } } },
  { season: "2026", round: "22", raceName: "Abu Dhabi Grand Prix", date: "2026-12-06", time: "14:00:00Z", Circuit: { circuitId: "yas_marina", circuitName: "Yas Marina Circuit", Location: { locality: "Abu Dhabi", country: "UAE" } } }
];

async function fetchCalendar() {
  try {
    const races = F1_2026_CALENDAR;
    allRaces = races; // Make available to modal

    const container = document.getElementById('calStrip');
    container.innerHTML = '';

    const now = new Date();
    let nextRace = null;

    let completedCount = 0;
    races.forEach((race, index) => {
      const raceDate = new Date(`${race.date}T${race.time || '00:00:00Z'}`);
      const isPast = raceDate < now;
      let statusClass = '';

      if (isPast) {
        statusClass = 'done';
        completedCount++;
      } else if (!nextRace) {
        statusClass = 'next';
        nextRace = race;
      }

      const rNumStr = `R${String(index + 1).padStart(2, '0')}`;
      const headerStr = statusClass === 'next' ? `${rNumStr} · NEXT` : rNumStr;

      const dateStr = raceDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });

      const icon = isPast ? '<span style="color: #229971;">✓</span>' : '🏁';

      let shortName = race.Circuit.circuitName.split(' ')[0];
      const full = race.Circuit.circuitName;
      if (full.includes('Monza')) shortName = 'Monza';
      else if (full.includes('Imola') || full.includes('Enzo')) shortName = 'Imola';
      else if (full.includes('Hermanos') || full.includes('Rodríguez')) shortName = 'Mexico City';
      else if (full.includes('Pace') || full.includes('Interlagos')) shortName = 'Interlagos';
      else if (full.includes('Red Bull')) shortName = 'Red Bull Ring';
      else if (full.includes('Albert')) shortName = 'Albert Park';
      else if (full.includes('Gilles')) shortName = 'Montreal';
      else if (full.includes('Catalunya') || full.includes('Barcelona')) shortName = 'Barcelona';
      else if (full.includes('Americas')) shortName = 'COTA';
      else if (full.includes('Miami')) shortName = 'Miami';
      else if (full.includes('Vegas')) shortName = 'Las Vegas';
      else if (shortName === 'Circuit' || shortName === 'Autodromo' || shortName === 'Autódromo') shortName = race.Circuit.Location.locality;

      const rowHTML = `
        <div class="cal-round ${statusClass}">
          <div class="cal-rnum">${headerStr}<span class="cal-status-dot"></span></div>
          <div class="cal-flag-emoji">${icon}</div>
          <div class="cal-country">${race.Circuit.Location.country}</div>
          <div class="cal-flag-name">${shortName}</div>
          <div class="cal-date">${dateStr}</div>
        </div>
      `;
      container.insertAdjacentHTML('beforeend', rowHTML);
    });



    if (nextRace) {
      updateNextRaceDetails(nextRace, races.length);
      // Auto-scroll to next race in strip
      setTimeout(() => {
        const nextEl = document.querySelector('.cal-round.next');
        if (nextEl) {
          container.scrollTo({ left: nextEl.offsetLeft - 60, behavior: 'smooth' });
        }
      }, 2000);
    }

  } catch (err) {
    console.error("Error fetching calendar", err);
  }
}

function updateNextRaceDetails(race, totalRaces) {
  document.getElementById('next-race-round').textContent = `◆ Round ${race.round} · Up Next`;
  document.getElementById('next-race-name').innerHTML = `${race.raceName.replace('Grand Prix', '<em>Grand Prix</em>')}`;
  document.getElementById('next-race-circuit').innerHTML = `<strong>${race.Circuit.circuitName}</strong> · ${race.Circuit.Location.locality}, ${race.Circuit.Location.country}`;

  const detailsEl = document.getElementById('next-race-details');
  if (detailsEl) {
    detailsEl.textContent = `Round ${race.round} of ${totalRaces}`;
  }

  const raceDate = new Date(`${race.date}T${race.time || '00:00:00Z'}`);
  document.getElementById('next-race-date').textContent = raceDate.toLocaleDateString('en-US', { month: 'long', day: 'numeric' });
  document.getElementById('next-race-time').textContent = raceDate.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });

  // Update countdown target
  const target = raceDate.getTime();
  const pad = (n) => String(n).padStart(2, '0');

  if (countdownInterval) clearInterval(countdownInterval);

  function tick() {
    const diff = target - Date.now();
    if (diff <= 0) {
      ['cd-d', 'cd-h', 'cd-m', 'cd-s'].forEach(id => {
        const el = document.getElementById(id);
        if (el) el.textContent = '00';
      });
      return;
    }
    const cd_d = document.getElementById('cd-d');
    if (cd_d) cd_d.textContent = pad(Math.floor(diff / 86400000));

    const cd_h = document.getElementById('cd-h');
    if (cd_h) cd_h.textContent = pad(Math.floor((diff % 86400000) / 3600000));

    const cd_m = document.getElementById('cd-m');
    if (cd_m) cd_m.textContent = pad(Math.floor((diff % 3600000) / 60000));

    const cd_s = document.getElementById('cd-s');
    if (cd_s) cd_s.textContent = pad(Math.floor((diff % 60000) / 1000));
  }
  tick();
  countdownInterval = setInterval(tick, 1000);
}



// Set up the static ticker
function setupTicker() {
  // Can be made dynamic later by fetching live stats. Using placeholders for now.
  const items = Array(12).fill({ sym: "PARTH'S PIT WALL", val: 'F1 2026' });
  const mk = (it) => `<span class="tick"><span class="sym">${it.sym}</span> <span class="val">${it.val}</span></span><span class="tick tick-dot">◆</span>`;
  const half = items.map(mk).join('');
  const track = document.getElementById('tkTrack');
  if (track) track.innerHTML = half + half;
}

// Initial fetch
setupTicker();
fetchDriverStandings();
fetchConstructorStandings();
fetchCalendar();

// Refresh every hour
setInterval(() => {
  fetchDriverStandings();
  fetchConstructorStandings();
  fetchCalendar();
}, 60 * 60 * 1000);

// ─────────────────────────────────────────────────────────────────────────────
// CALENDAR CLICK → RACE MODAL
// ─────────────────────────────────────────────────────────────────────────────

const TEAM_HEX_MODAL = {
  'mercedes': '#27F4D2', 'ferrari': '#E8002D', 'mclaren': '#FF8000',
  'red_bull': '#3671C6', 'aston_martin': '#229971', 'alpine': '#0093CC',
  'rb': '#6692FF', 'haas': '#B6BABD', 'williams': '#64C4FF',
  'audi': '#00877C', 'cadillac': '#8A9099',
};

const CIRCUIT_INFO = {
  'bahrain':      { length: '5.412 km', laps: 57, record: '1:31.447 (2005)', image: 'Bahrain_Circuit.png' },
  'jeddah':       { length: '6.174 km', laps: 50, record: '1:30.734 (2021)', image: 'Saudi_Arabia_Circuit.png' },
  'albert_park':  { length: '5.278 km', laps: 58, record: '1:19.813 (2024)', image: 'Australia_Circuit.png' },
  'suzuka':       { length: '5.807 km', laps: 53, record: '1:30.983 (2019)', image: 'Japan_Circuit.png' },
  'shanghai':     { length: '5.451 km', laps: 56, record: '1:32.238 (2004)', image: 'China_Circuit.png' },
  'miami':        { length: '5.412 km', laps: 57, record: '1:29.708 (2023)', image: 'Miami_Circuit.png' },
  'imola':        { length: '4.909 km', laps: 63, record: '1:15.484 (2020)', image: 'Emilia_Romagna_Circuit.png' },
  'monaco':       { length: '3.337 km', laps: 78, record: '1:12.909 (2021)', image: 'Monaco_Circuit.png' },
  'villeneuve':   { length: '4.361 km', laps: 70, record: '1:13.078 (2019)', image: 'Canada_Circuit.png' },
  'catalunya':    { length: '4.657 km', laps: 66, record: '1:16.330 (2023)', image: 'Spain_Circuit.png' },
  'red_bull_ring':{ length: '4.318 km', laps: 71, record: '1:05.619 (2020)', image: 'Austria_Circuit.png' },
  'silverstone':  { length: '5.891 km', laps: 52, record: '1:27.097 (2020)', image: 'Great_Britain_Circuit.png' },
  'hungaroring':  { length: '4.381 km', laps: 70, record: '1:16.627 (2020)', image: 'Hungary_Circuit.png' },
  'spa':          { length: '7.004 km', laps: 44, record: '1:46.286 (2018)', image: 'Belgium_Circuit.png' },
  'zandvoort':    { length: '4.259 km', laps: 72, record: '1:11.097 (2021)', image: 'Netherlands_Circuit.png' },
  'monza':        { length: '5.793 km', laps: 53, record: '1:21.046 (2004)', image: 'Italy_Circuit.png' },
  'baku':         { length: '6.003 km', laps: 51, record: '1:43.009 (2019)', image: 'Baku_Circuit.png' },
  'marina_bay':   { length: '4.940 km', laps: 62, record: '1:35.867 (2023)', image: 'Singapore_Circuit.png' },
  'americas':     { length: '5.513 km', laps: 56, record: '1:36.169 (2019)', image: 'USA_Circuit.png' },
  'rodriguez':    { length: '4.304 km', laps: 71, record: '1:17.774 (2021)', image: 'Mexico_Circuit.png' },
  'interlagos':   { length: '4.309 km', laps: 71, record: '1:10.540 (2018)', image: 'Brazil_Circuit.png' },
  'vegas':        { length: '6.201 km', laps: 50, record: '1:35.490 (2023)', image: 'Las_Vegas_Circuit.png' },
  'losail':       { length: '5.419 km', laps: 57, record: '1:24.319 (2023)', image: 'Qatar_Circuit.png' },
  'yas_marina':   { length: '5.281 km', laps: 58, record: '1:26.103 (2021)', image: 'Abu_Dhabi_Circuit.png' },
  'madrid':       { length: '5.474 km', laps: 55, record: 'TBD', image: 'Spain_Circuit.png' }
};

function getTeamHex(constructorId) {
  return TEAM_HEX_MODAL[constructorId] || '#888';
}

// Event delegation: calendar strip
document.getElementById('calStrip').addEventListener('click', (e) => {
  const calRound = e.target.closest('.cal-round');
  if (!calRound) return;
  const index = Array.from(calRound.parentNode.children).indexOf(calRound);
  if (index >= 0 && allRaces[index]) openRaceModal(allRaces[index]);
});

// ── Modal state ──
let currentModalRace = null;
let currentSession   = 'schedule';

function openRaceModal(race) {
  currentModalRace = race;
  const raceDate   = new Date(`${race.date}T${race.time || '00:00:00Z'}`);
  const isPast     = raceDate < new Date();

  // Header
  document.getElementById('rm-round').textContent =
    `◆ Round ${race.round} · ${race.Circuit.Location.country}`;
  document.getElementById('rm-title').innerHTML =
    race.raceName.replace('Grand Prix', '<em>Grand Prix</em>');
  document.getElementById('rm-circuit').innerHTML =
    `<strong>${race.Circuit.circuitName}</strong> · ${race.Circuit.Location.locality}, ${race.Circuit.Location.country}`;
  const cInfo = CIRCUIT_INFO[race.Circuit.circuitId] || { length: '--', laps: '--', record: '--' };
  document.getElementById('rm-circuit-info').innerHTML = 
    `<span style="margin-right:12px;">Length: <strong style="color:#fff;">${cInfo.length}</strong></span>` +
    `<span style="margin-right:12px;">Laps: <strong style="color:#fff;">${cInfo.laps}</strong></span>` +
    `<span>Record: <strong style="color:#fff;">${cInfo.record}</strong></span>`;

  // Fetch Official F1 circuit image
  const imgContainer = document.getElementById('rm-circuit-image-container');
  if (imgContainer) {
    if (cInfo.image) {
      const imgUrl = `https://media.formula1.com/image/upload/f_auto,c_limit,q_auto,w_1320/content/dam/fom-website/2018-redesign-assets/Circuit%20maps%2016x9/${cInfo.image}`;
      imgContainer.innerHTML = `<img src="${imgUrl}" alt="${race.Circuit.circuitName} layout" style="max-height: 100%; max-width: 100%; object-fit: contain; opacity: 0; animation: fadeSlow 0.6s ease forwards 0.2s;">`;
    } else {
      imgContainer.innerHTML = '';
    }
  }

  // Show / hide tabs based on sprint weekend
  const isSprint = !!race.Sprint;
  document.querySelectorAll('.rm-tab').forEach(tab => {
    const s = tab.dataset.session;
    if (s === 'schedule')                    tab.classList.remove('hidden');
    else if (s === 'sprint')                 tab.classList.toggle('hidden', !isSprint);
    else if (s === 'qualifying')             tab.classList.toggle('hidden', !isPast);
    else if (s === 'race')                   tab.classList.toggle('hidden', !isPast);
  });

  // Default tab
  const defaultTab = isPast ? 'race' : 'schedule';
  setActiveTab(defaultTab);
  loadTabContent(defaultTab);

  // Open
  document.getElementById('raceModal').classList.add('open');
  document.body.style.overflow = 'hidden';

  // Fetch weather in background
  fetchRaceWeather(race);
}

function closeRaceModal() {
  document.getElementById('raceModal').classList.remove('open');
  document.body.style.overflow = '';
  currentModalRace = null;
}

function setActiveTab(session) {
  currentSession = session;
  document.querySelectorAll('.rm-tab').forEach(tab => {
    tab.classList.toggle('active', tab.dataset.session === session);
  });
}

async function loadTabContent(session) {
  const race      = currentModalRace;
  if (!race) return;
  const container = document.getElementById('rmContent');
  const raceDate  = new Date(`${race.date}T${race.time || '00:00:00Z'}`);
  const isPast    = raceDate < new Date();

  if (session === 'schedule') {
    renderSchedule(race, container);
    return;
  }

  // Blank for upcoming, or practice sessions (API limitation)
  if (!isPast) {
    container.innerHTML = '<div class="rm-blank"></div>';
    return;
  }

  // Loading state
  container.innerHTML = '<div class="rm-loading"><div class="rm-loading-dot"></div><div class="rm-loading-text">Loading results</div></div>';

  const year  = race.season;
  const round = race.round;
  let url = '';
  if (session === 'race')       url = `https://api.jolpi.ca/ergast/f1/${year}/${round}/results.json`;
  if (session === 'qualifying') url = `https://api.jolpi.ca/ergast/f1/${year}/${round}/qualifying.json`;
  if (session === 'sprint')     url = `https://api.jolpi.ca/ergast/f1/${year}/${round}/sprint.json`;

  try {
    const res  = await fetch(url);
    const data = await res.json();
    if (session === 'qualifying') {
      const results = data.MRData.RaceTable.Races[0]?.QualifyingResults || [];
      renderQualifyingResults(results, container);
    } else {
      const results = data.MRData.RaceTable.Races[0]?.Results ||
                      data.MRData.RaceTable.Races[0]?.SprintResults || [];
      renderRaceResults(results, container);
    }
  } catch (err) {
    container.innerHTML = '<div class="rm-blank"><div class="rm-blank-title">Could not load results</div></div>';
    console.error('[modal] results fetch error:', err);
  }
}

function renderSchedule(race, container) {
  const sessions = [
    { label: 'Practice 1',      key: 'FirstPractice' },
    { label: 'Practice 2',      key: 'SecondPractice' },
    { label: 'Practice 3',      key: 'ThirdPractice' },
    { label: 'Sprint Shootout', key: 'SprintShootout' },
    { label: 'Sprint Race',     key: 'Sprint' },
    { label: 'Qualifying',      key: 'Qualifying' },
    { label: 'Race',            key: null },
  ];

  let html = '<div class="rm-schedule">';
  sessions.forEach(s => {
    let d;
    if (s.key === null) {
      d = new Date(`${race.date}T${race.time || '00:00:00Z'}`);
    } else if (race[s.key]) {
      d = new Date(`${race[s.key].date}T${race[s.key].time || '00:00:00Z'}`);
    } else return;

    const dateStr = d.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' });
    const timeStr = d.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
    html += `<div class="rm-sched-cell">
      <div class="rm-sched-label">${s.key === null ? 'Race' : s.label}</div>
      <div class="rm-sched-date">${dateStr}</div>
      <div class="rm-sched-time">${timeStr}</div>
    </div>`;
  });
  html += '</div>';
  container.innerHTML = html;
}

function renderRaceResults(results, container) {
  if (!results.length) {
    container.innerHTML = '<div class="rm-blank"><div class="rm-blank-title">No results available</div></div>';
    return;
  }
  let html = `<table class="rm-results-table">
    <thead><tr>
      <th>Pos</th><th>Driver</th><th style="text-align:right">Time / Status</th><th style="text-align:right">Pts</th>
    </tr></thead><tbody>`;

  results.forEach((r, i) => {
    const pos     = parseInt(r.position);
    const posClass = pos === 1 ? 'p1' : pos === 2 ? 'p2' : pos === 3 ? 'p3' : '';
    const hex     = getTeamHex(r.Constructor.constructorId);
    const isFl    = r.FastestLap?.rank === '1';
    let timeStr;
    if (i === 0 && r.Time?.time)      timeStr = r.Time.time;
    else if (r.Time?.time)             timeStr = `+${r.Time.time}`;
    else if (r.status !== 'Finished') timeStr = r.status;
    else                               timeStr = 'Finished';

    const timeStyle = isFl ? 'color:#df99df; font-weight:700;' : '';

    html += `<tr>
      <td><div class="rm-rpos ${posClass}">${r.position}</div></td>
      <td>
        <div class="rm-rdriver">${r.Driver.givenName.charAt(0)}. ${r.Driver.familyName}</div>
        <div class="rm-rteam"><span class="rm-team-bar" style="background:${hex}"></span>${r.Constructor.name}</div>
      </td>
      <td class="rm-rtime" style="${timeStyle}">${timeStr}</td>
      <td class="rm-rpts">${r.points}</td>
    </tr>`;
  });
  html += '</tbody></table>';
  container.innerHTML = html;
}

function renderQualifyingResults(results, container) {
  if (!results.length) {
    container.innerHTML = '<div class="rm-blank"><div class="rm-blank-title">No qualifying data available</div></div>';
    return;
  }
  let html = `<table class="rm-results-table">
    <thead><tr>
      <th>Pos</th><th>Driver</th><th style="text-align:right">Q1</th><th style="text-align:right">Q2</th><th style="text-align:right">Q3</th>
    </tr></thead><tbody>`;

  results.forEach(r => {
    const pos      = parseInt(r.position);
    const posClass = pos === 1 ? 'p1' : pos === 2 ? 'p2' : pos === 3 ? 'p3' : '';
    const hex      = getTeamHex(r.Constructor.constructorId);
    html += `<tr>
      <td><div class="rm-rpos ${posClass}">${r.position}</div></td>
      <td>
        <div class="rm-rdriver">${r.Driver.givenName.charAt(0)}. ${r.Driver.familyName}</div>
        <div class="rm-rteam"><span class="rm-team-bar" style="background:${hex}"></span>${r.Constructor.name}</div>
      </td>
      <td class="rm-rtime">${r.Q1 || '—'}</td>
      <td class="rm-rtime">${r.Q2 || '—'}</td>
      <td class="rm-rtime">${r.Q3 || '—'}</td>
    </tr>`;
  });
  html += '</tbody></table>';
  container.innerHTML = html;
}

// ─────────────────────────────────────────────────────────────────────────────
// WEATHER (Open-Meteo · no API key needed)
// ─────────────────────────────────────────────────────────────────────────────

function weatherCodeToIcon(code) {
  if (code === 0)                      return { icon: '☀️',  desc: 'Clear sky' };
  if (code <= 2)                       return { icon: '🌤️',  desc: 'Mainly clear' };
  if (code === 3)                      return { icon: '☁️',  desc: 'Overcast' };
  if (code <= 48)                      return { icon: '🌫️',  desc: 'Foggy' };
  if (code <= 57)                      return { icon: '🌦️',  desc: 'Drizzle' };
  if (code <= 67)                      return { icon: '🌧️',  desc: 'Rain' };
  if (code <= 77)                      return { icon: '❄️',  desc: 'Snow' };
  if (code <= 82)                      return { icon: '🌦️',  desc: 'Rain showers' };
  if (code <= 86)                      return { icon: '🌨️',  desc: 'Snow showers' };
  if (code <= 99)                      return { icon: '⛈️',  desc: 'Thunderstorm' };
  return { icon: '🌡️', desc: 'Unknown' };
}

function fmtDate(d) { return d.toISOString().split('T')[0]; }

async function fetchRaceWeather(race) {
  const wc  = document.getElementById('rmWeatherContent');
  const city = race.Circuit.Location.locality;
  const raceDate = new Date(`${race.date}T${race.time || '00:00:00Z'}`);
  const now  = new Date();
  const daysAway = Math.floor((raceDate - now) / 86400000);

  try {
    // Geocode
    const geoRes  = await fetch(`https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(city)}&count=1&format=json`);
    const geoData = await geoRes.json();
    if (!geoData.results?.length) { wc.innerHTML = '<p class="rm-weather-note">Location data not available</p>'; return; }

    const { latitude: lat, longitude: lon } = geoData.results[0];

    // Race-weekend Fri/Sat/Sun
    const sun = new Date(raceDate); sun.setHours(12,0,0,0);
    const sat = new Date(sun); sat.setDate(sun.getDate() - 1);
    const fri = new Date(sun); fri.setDate(sun.getDate() - 2);
    const startDate = fmtDate(fri);
    const endDate   = fmtDate(sun);

    let dailyData;

    if (daysAway > 15) {
      wc.innerHTML = `<p class="rm-weather-note">Forecast available closer to race weekend · ${Math.ceil(daysAway/7)} weeks away</p>`;
      return;
    } else if (daysAway < -3) {
      // Past race — archive
      const archRes  = await fetch(`https://archive-api.open-meteo.com/v1/archive?latitude=${lat}&longitude=${lon}&start_date=${startDate}&end_date=${endDate}&daily=weathercode,temperature_2m_max,temperature_2m_min,precipitation_sum,windspeed_10m_max&timezone=auto`);
      const archData = await archRes.json();
      dailyData = archData.daily;
    } else {
      // Forecast
      const fcRes  = await fetch(`https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&daily=weathercode,temperature_2m_max,temperature_2m_min,precipitation_probability_max,windspeed_10m_max&timezone=auto&start_date=${startDate}&end_date=${endDate}`);
      const fcData = await fcRes.json();
      dailyData = fcData.daily;
    }

    if (!dailyData || !dailyData.weathercode) {
      wc.innerHTML = '<p class="rm-weather-note">Weather data unavailable</p>';
      return;
    }

    const dayLabels = ['Fri · Practice', 'Sat · Qualifying', 'Sun · Race'];
    let html = '<div class="rm-weather-grid">';
    for (let i = 0; i < 3; i++) {
      const code  = dailyData.weathercode?.[i];
      const maxT  = dailyData.temperature_2m_max?.[i];
      const minT  = dailyData.temperature_2m_min?.[i];
      const wind  = dailyData.windspeed_10m_max?.[i];
      const rain  = dailyData.precipitation_sum?.[i];             // archive
      const rainP = dailyData.precipitation_probability_max?.[i]; // forecast
      const { icon, desc } = weatherCodeToIcon(code);

      const extraParts = [];
      if (minT  !== undefined) extraParts.push(`↓${Math.round(minT)}°`);
      if (wind  !== undefined) extraParts.push(`💨 ${Math.round(wind)} km/h`);
      if (rain  !== undefined) extraParts.push(`🌧 ${rain.toFixed(1)}mm`);
      if (rainP !== undefined) extraParts.push(`🌧 ${rainP}%`);

      html += `<div class="rm-weather-day">
        <div class="rm-wd-label">${dayLabels[i]}</div>
        <div class="rm-wd-icon">${icon}</div>
        <div class="rm-wd-temp">${maxT !== undefined ? Math.round(maxT) + '°C' : '--'}</div>
        <div class="rm-wd-desc">${desc}</div>
        ${extraParts.length ? `<div class="rm-wd-extra">${extraParts.map(p => `<span>${p}</span>`).join('')}</div>` : ''}
      </div>`;
    }
    html += '</div>';
    wc.innerHTML = html;

  } catch (err) {
    console.error('[modal] weather fetch error:', err);
    wc.innerHTML = '<p class="rm-weather-note">Weather data unavailable</p>';
  }
}

// ── Modal event listeners ──
document.getElementById('rmClose').addEventListener('click', closeRaceModal);
document.getElementById('raceModal').addEventListener('click', (e) => {
  if (e.target === e.currentTarget) closeRaceModal();
});
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && document.getElementById('raceModal').classList.contains('open')) closeRaceModal();
});
document.querySelectorAll('.rm-tab').forEach(tab => {
  tab.addEventListener('click', () => {
    if (tab.classList.contains('hidden')) return;
    setActiveTab(tab.dataset.session);
    loadTabContent(tab.dataset.session);
  });
});
