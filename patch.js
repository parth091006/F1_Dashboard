const fs = require('fs');

let html = fs.readFileSync('F1_Dashboard.html', 'utf8');

// 1. Remove lines 1 to 9
html = html.replace(/I have an F1 dashboard HTML file[\s\S]*?<!DOCTYPE html>/, '<!DOCTYPE html>');

// 2. Replace race-left meta section
const raceLeftRegex = /<div class="race-left">[\s\S]*?<\/div>\s*<\/div>\s*<\/div>/;
const raceLeftReplacement = `<div class="race-left">
        <div class="race-meta-row">
          <span class="race-round" id="next-race-round">◆ Round -- · Up Next</span>
          <span class="race-flag-big" id="next-race-flag">🏁</span>
        </div>
        <h2 class="race-name" id="next-race-name">Loading <em>Grand Prix</em></h2>
        <div class="race-circuit" id="next-race-circuit"><strong>Loading Circuit</strong></div>
        <div class="race-circuit" id="next-race-details">Round -- of --</div>

        <div class="race-stats">
          <div class="race-stat">
            <div class="race-stat-label">Date</div>
            <div class="race-stat-val" id="next-race-date">TBD</div>
          </div>
          <div class="race-stat">
            <div class="race-stat-label">Time</div>
            <div class="race-stat-val" id="next-race-time">TBD</div>
          </div>
        </div>
      </div>`;
html = html.replace(raceLeftRegex, raceLeftReplacement);

// 3. Replace calendar strip content
const calStripRegex = /<div class="cal-strip" id="calStrip">[\s\S]*?<\/div>\s*<\/div>\s*<\/section>/;
const calStripReplacement = `<div class="cal-strip" id="calStrip">
      <!-- Dynamically populated by app.js -->
    </div>
  </div>
</section>`;
html = html.replace(calStripRegex, calStripReplacement);

// 4. Replace Drivers list
const driversRegex = /<div class="col-sub">Top 10 · After 3 Rounds<\/div>\s*<\/div>[\s\S]*?<\/div>\s*<div class="col">/;
const driversReplacement = `<div class="col-sub" id="drivers-sub">Top 10</div>
      </div>
      <div id="driver-standings-container"></div>
    </div>
    <div class="col">`;
html = html.replace(driversRegex, driversReplacement);

// 5. Replace Constructors list
const constructorsRegex = /<div class="col-sub">All 11 teams · 2026<\/div>\s*<\/div>[\s\S]*?<\/div>\s*<div class="col">/;
const constructorsReplacement = `<div class="col-sub" id="constructors-sub">All Teams</div>
      </div>
      <div id="constructor-standings-container"></div>
    </div>
    <div class="col">`;
html = html.replace(constructorsRegex, constructorsReplacement);

// 6. Add app.js script tag before </body>
html = html.replace('</body>', '  <script src="app.js"></script>\n</body>');

fs.writeFileSync('F1_Dashboard.html', html);
console.log("HTML patched successfully!");
