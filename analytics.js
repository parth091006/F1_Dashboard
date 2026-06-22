// ── analytics.js · Parth's Pit Wall ──
// Fetches all 2026 season race results and renders cumulative points trajectory
// charts for Drivers' Championship and Constructors' Cup using Chart.js.

const ANALYTICS_API = 'https://api.jolpi.ca/ergast/f1/current';

const TEAM_HEX = {
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

let driverChartInstance   = null;
let constrChartInstance   = null;
let cachedRaces           = null;
let cachedSprints         = null;
let cachedDriverData      = null;
let cachedConstructorData = null;

async function fetchAllErgast(baseUrl, key) {
  const cached = sessionStorage.getItem(key);
  if (cached) {
    try {
      const parsed = JSON.parse(cached);
      if (Date.now() - parsed.ts < 300000) return parsed.data;
    } catch(e) {}
  }
  
  let allRaces = [];
  let offset = 0;
  const limit = 100;
  let total = 1;
  
  while (offset < total) {
    const res = await fetch(`${baseUrl}?limit=${limit}&offset=${offset}`);
    if (!res.ok) {
      if (cached) return JSON.parse(cached).data;
      throw new Error('HTTP ' + res.status);
    }
    const data = await res.json();
    total = parseInt(data.MRData.total) || 0;
    
    const races = data.MRData.RaceTable?.Races || [];
    allRaces = allRaces.concat(races);
    
    offset += limit;
  }
  
  try { sessionStorage.setItem(key, JSON.stringify({ ts: Date.now(), data: allRaces })); } catch(e) {}
  return allRaces;
}

// ── Data Fetching ──

async function fetchSeasonResults() {
  if (cachedRaces) return cachedRaces;
  cachedRaces = await fetchAllErgast(`${ANALYTICS_API}/results.json`, 'cache_analytics_races_v2');
  return cachedRaces;
}

async function fetchSeasonSprints() {
  if (cachedSprints) return cachedSprints;
  try {
    cachedSprints = await fetchAllErgast(`${ANALYTICS_API}/sprint.json`, 'cache_analytics_sprints_v2');
    return cachedSprints;
  } catch(e) {
    return [];
  }
}

// ── Data Processing ──

function buildDriverData(races, sprints) {
  if (cachedDriverData) return cachedDriverData;

  const driverMap = {}; // driverId → { name, code, teamId, pointsByRound }

  races.forEach(race => {
    (race.Results || []).forEach(r => {
      const id = r.Driver.driverId;
      if (!driverMap[id]) {
        driverMap[id] = {
          name:   `${r.Driver.givenName.charAt(0)}. ${r.Driver.familyName}`,
          code:   r.Driver.code || r.Driver.familyName.substring(0, 3).toUpperCase(),
          teamId: r.Constructor.constructorId,
          pointsByRound: {},
        };
      }
      driverMap[id].pointsByRound[race.round] = parseFloat(r.points) || 0;
    });
  });

  (sprints || []).forEach(sprint => {
    (sprint.SprintResults || []).forEach(r => {
      const id = r.Driver.driverId;
      if (driverMap[id]) {
        driverMap[id].pointsByRound[sprint.round] = 
          (driverMap[id].pointsByRound[sprint.round] || 0) + (parseFloat(r.points) || 0);
      }
    });
  });

  const rounds  = [...new Set(races.map(r => r.round))].sort((a, b) => parseInt(a) - parseInt(b));
  const drivers = Object.values(driverMap);

  // Build cumulative array
  drivers.forEach(d => {
    let cum = 0;
    d.cumulative = rounds.map(rnd => {
      cum += (d.pointsByRound[rnd] || 0);
      return cum;
    });
    d.total = cum;
  });

  // Sort by total points desc
  drivers.sort((a, b) => b.total - a.total);

  cachedDriverData = { drivers, rounds };
  return cachedDriverData;
}

function buildConstructorData(races, sprints) {
  if (cachedConstructorData) return cachedConstructorData;

  const conMap = {}; // constructorId → { name, teamId, pointsByRound }

  races.forEach(race => {
    (race.Results || []).forEach(r => {
      const id = r.Constructor.constructorId;
      if (!conMap[id]) {
        conMap[id] = {
          name:   r.Constructor.name,
          teamId: id,
          pointsByRound: {},
        };
      }
      conMap[id].pointsByRound[race.round] =
        (conMap[id].pointsByRound[race.round] || 0) + (parseFloat(r.points) || 0);
    });
  });

  (sprints || []).forEach(sprint => {
    (sprint.SprintResults || []).forEach(r => {
      const id = r.Constructor.constructorId;
      if (conMap[id]) {
        conMap[id].pointsByRound[sprint.round] =
          (conMap[id].pointsByRound[sprint.round] || 0) + (parseFloat(r.points) || 0);
      }
    });
  });

  const rounds = [...new Set(races.map(r => r.round))].sort((a, b) => parseInt(a) - parseInt(b));
  const constructors = Object.values(conMap);

  constructors.forEach(c => {
    let cum = 0;
    c.cumulative = rounds.map(rnd => {
      cum += (c.pointsByRound[rnd] || 0);
      return cum;
    });
    c.total = cum;
  });

  constructors.sort((a, b) => b.total - a.total);

  cachedConstructorData = { constructors, rounds };
  return cachedConstructorData;
}

// ── Chart Config Helpers ──

const inlineLabelsPlugin = {
  id: 'inlineLabels',
  afterDatasetsDraw(chart, args, options) {
    const { ctx } = chart;
    ctx.save();
    ctx.font = "600 11px 'JetBrains Mono', monospace";
    ctx.textAlign = 'left';
    ctx.textBaseline = 'middle';

    let labels = [];
    chart.data.datasets.forEach((dataset, i) => {
      const meta = chart.getDatasetMeta(i);
      if (meta.hidden) return;
      const lastPoint = meta.data[meta.data.length - 1];
      if (!lastPoint) return;
      
      labels.push({
        text: dataset.label,
        color: dataset.borderColor,
        x: lastPoint.x,
        y: lastPoint.y,
        origY: lastPoint.y
      });
    });

    labels.sort((a, b) => a.y - b.y);

    const MIN_DIST = 14; 
    for (let i = 1; i < labels.length; i++) {
      if (labels[i].y - labels[i - 1].y < MIN_DIST) {
        labels[i].y = labels[i - 1].y + MIN_DIST;
      }
    }

    labels.forEach(lb => {
      // Draw connecting line from original point to new label position
      ctx.beginPath();
      ctx.moveTo(lb.x + 4, lb.origY);
      ctx.lineTo(lb.x + 10, lb.y);
      ctx.strokeStyle = lb.color;
      ctx.lineWidth = 1.5;
      ctx.globalAlpha = 0.6;
      ctx.stroke();
      ctx.globalAlpha = 1.0;
      
      // Draw text
      ctx.fillStyle = 'rgba(255,255,255,0.85)';
      ctx.fillText(lb.text, lb.x + 14, lb.y);
    });

    ctx.restore();
  }
};

function makeChartOptions(titleText) {
  return {
    responsive:          true,
    maintainAspectRatio: false,
    layout:              { padding: { right: 45 } },
    animation:           { duration: 900, easing: 'easeInOutQuart' },
    interaction:         { mode: 'index', intersect: false },
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        backgroundColor: 'rgba(8,8,8,0.96)',
        borderColor:     'rgba(255,255,255,0.1)',
        borderWidth:     1,
        padding:         12,
        titleColor:      'rgba(255,255,255,0.5)',
        bodyColor:       '#ffffff',
        titleFont:       { family: "'JetBrains Mono', monospace", size: 10, weight: '600' },
        bodyFont:        { family: "'JetBrains Mono', monospace", size: 12, weight: '700' },
        callbacks: {
          label: ctx => ` ${ctx.dataset.label}  ${ctx.parsed.y} pts`,
        },
      },
    },
    scales: {
      x: {
        grid:  { color: 'rgba(255,255,255,0.05)', drawBorder: false },
        ticks: {
          color: 'rgba(255,255,255,0.35)',
          font:  { family: "'JetBrains Mono', monospace", size: 10 },
          maxRotation: 0,
        },
        title: {
          display: true,
          text:    'Round',
          color:   'rgba(255,255,255,0.25)',
          font:    { family: "'JetBrains Mono', monospace", size: 9 },
          padding: { top: 8 },
        },
      },
      y: {
        grid:  { color: 'rgba(255,255,255,0.05)', drawBorder: false },
        ticks: {
          color: 'rgba(255,255,255,0.35)',
          font:  { family: "'JetBrains Mono', monospace", size: 10 },
        },
        title: {
          display: true,
          text:    'Points',
          color:   'rgba(255,255,255,0.25)',
          font:    { family: "'JetBrains Mono', monospace", size: 9 },
          padding: { bottom: 8 },
        },
        beginAtZero: true,
      },
    },
  };
}

// ── Chart Renderers ──

function renderDriverChart(limit) {
  const { drivers, rounds } = cachedDriverData;
  const wrap  = document.getElementById('driverChartWrap');
  wrap.innerHTML = '<canvas id="driverChart"></canvas>';
  const ctx   = document.getElementById('driverChart').getContext('2d');

  if (driverChartInstance) { driverChartInstance.destroy(); driverChartInstance = null; }

  const slice    = drivers.slice(0, Math.min(limit, drivers.length));
  const labels   = rounds.map(r => `R${r}`);
  const datasets = slice.map(d => {
    const hex = TEAM_HEX[d.teamId] || '#888';
    return {
      label:            d.code,
      data:             d.cumulative,
      borderColor:      hex,
      backgroundColor:  hex + '18',
      borderWidth:      2,
      pointRadius:      rounds.length <= 10 ? 4 : 2.5,
      pointHoverRadius: 7,
      pointBackgroundColor: hex,
      pointBorderColor:     'transparent',
      tension:          0.35,
      fill:             false,
    };
  });

  driverChartInstance = new Chart(ctx, {
    type:    'line',
    data:    { labels, datasets },
    options: makeChartOptions('Drivers'),
    plugins: [inlineLabelsPlugin],
  });
}

function renderConstructorChart() {
  const { constructors, rounds } = cachedConstructorData;
  const wrap = document.getElementById('constructorChartWrap');
  wrap.innerHTML = '<canvas id="constructorChart"></canvas>';
  const ctx  = document.getElementById('constructorChart').getContext('2d');

  if (constrChartInstance) { constrChartInstance.destroy(); constrChartInstance = null; }

  const labels   = rounds.map(r => `R${r}`);
  const datasets = constructors.map(c => {
    const hex = TEAM_HEX[c.teamId] || '#888';
    return {
      label:            c.name,
      data:             c.cumulative,
      borderColor:      hex,
      backgroundColor:  hex + '18',
      borderWidth:      2.5,
      pointRadius:      rounds.length <= 10 ? 4 : 2.5,
      pointHoverRadius: 7,
      pointBackgroundColor: hex,
      pointBorderColor:     'transparent',
      tension:          0.35,
      fill:             false,
    };
  });

  constrChartInstance = new Chart(ctx, {
    type:    'line',
    data:    { labels, datasets },
    options: makeChartOptions('Constructors'),
    plugins: [inlineLabelsPlugin],
  });
}

// ── Empty / Error States ──

function showEmpty(wrapId, message) {
  document.getElementById(wrapId).innerHTML =
    `<div class="chart-empty"><div class="chart-empty-text">${message}</div></div>`;
}

// ── Filter Buttons ──

document.querySelectorAll('[data-driver-filter]').forEach(btn => {
  btn.addEventListener('click', () => {
    if (!cachedDriverData) return;
    document.querySelectorAll('[data-driver-filter]').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    renderDriverChart(parseInt(btn.dataset.driverFilter));
  });
});

// ── Main Init ──

async function initAnalytics() {
  try {
    const races = await fetchSeasonResults();
    const sprints = await fetchSeasonSprints();

    if (!races || races.length === 0) {
      showEmpty('driverChartWrap',      'No race data available yet — check back after the season opener.');
      showEmpty('constructorChartWrap', 'No race data available yet — check back after the season opener.');
      return;
    }

    buildDriverData(races, sprints);
    buildConstructorData(races, sprints);

    renderDriverChart(5);       // Default: Top 5
    renderConstructorChart();

  } catch (err) {
    console.error('[analytics] fetch error:', err);
    showEmpty('driverChartWrap',      'Could not load data. Please check your connection and try again.');
    showEmpty('constructorChartWrap', 'Could not load data. Please check your connection and try again.');
  }
}

initAnalytics();
