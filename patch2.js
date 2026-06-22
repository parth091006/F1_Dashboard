const fs = require('fs');
let html = fs.readFileSync('F1_Dashboard.html', 'utf8');

// Replace the entire <script>...</script> tag at the end with just the greeting logic
const scriptRegex = /<script>[\s\S]*?<\/script>/;
const newScript = `<script>
(function(){
  const now = new Date();
  const h = now.getHours();
  const g = h < 12 ? 'Good morning' : h < 17 ? 'Good afternoon' : 'Good evening';
  document.getElementById('greeting').textContent = g + ', Parth';
  const D = ['SUN','MON','TUE','WED','THU','FRI','SAT'];
  const M = ['JAN','FEB','MAR','APR','MAY','JUN','JUL','AUG','SEP','OCT','NOV','DEC'];
  document.getElementById('dateline').textContent = D[now.getDay()] + ' · ' + String(now.getDate()).padStart(2,'0') + ' ' + M[now.getMonth()] + ' · ' + now.getFullYear();
})();
</script>`;

html = html.replace(scriptRegex, newScript);
fs.writeFileSync('F1_Dashboard.html', html);
console.log("HTML patched successfully part 2!");
