# 🏎️ Parth's Pit Wall · F1 Command Center

> A custom, premium real-time Formula 1 multi-page suite designed to track the 2026 F1 season with live telemetry, analytics, driver profiles, and race results.

---

## Overview
**Parth's Pit Wall** has evolved from a single dashboard into a comprehensive, multi-page Formula 1 web application. Built with a premium carbon-and-gold racing aesthetic, it fetches live F1 data to display real-time championship standings, session countdowns, detailed race results with lap intervals, driver/constructor profiles, and interactive points trajectory charts.

---

## Key Features

### 🏁 Main Dashboard (`F1_Dashboard.html`)
- **Live Ticker**: A smoothly scrolling real-time headline ticker across the top of the dashboard.
- **Next Race Countdown**: A live, to-the-second countdown timer for the upcoming Grand Prix with exact date, time, circuit name, and round details.
- **Season Calendar**: A horizontal, scrollable track of all Grand Prix weekends. Completed races are marked with a racing green check (`✓`), while the upcoming race is dynamically highlighted.
- **Race Results Table**: Detailed classification table for completed races featuring position gains/losses, interval gaps, and lap data.
- **Championship Grid**: Instant overview of the top Drivers and Constructors standings.

### 📈 Interactive Analytics (`analytics.html`)
- **Points Trajectory Charts**: Powered by **Chart.js**, visualizing season-long points progression for drivers and constructors.
- **Performance Metrics**: Comparative visual analysis of team dominance and driver consistency across rounds.

### 👤 Drivers Championship (`drivers.html`)
- **Comprehensive Profiles**: In-depth statistics, career numbers, and season performance metrics for every driver on the grid.
- **Standings Breakdown**: Full grid standings with points gaps, podium counts, and team affiliations.

### 🛡️ Teams & Constructors (`teams.html`)
- **Constructor Deep-Dive**: Detailed team standings, driver pairings, car specifications, and relative points progress bars.
- **Team Histories**: Visual representation of constructor performance and championship battle gaps.

---

## Technology Stack

- **HTML5 & Vanilla CSS3**: Semantic multi-page structure with responsive grid/flexbox layouts, custom variables, and modern typography (*Playfair Display*, *Inter*, *JetBrains Mono*).
- **Vanilla JavaScript (ES6+)**: Asynchronous data fetching, DOM manipulation, and real-time interval timers without heavy frontend frameworks.
- **Chart.js**: High-performance HTML5 canvas rendering for telemetry and championship analytics charts.
- **Jolpica API**: Reliable, open F1 data endpoint (`api.jolpi.ca/ergast/f1`) for accurate live season statistics and historical race results.

---

## Getting Started

Running **Parth's Pit Wall** requires **no build steps**, bundlers, or package managers:

1. **Clone or Download**: Clone this repository to your local machine:
   ```bash
   git clone https://github.com/parth091006/F1_Dashboard.git
   ```
2. **Launch**: Double-click `F1_Dashboard.html` to open the command center directly in any modern web browser (Chrome, Firefox, Edge, Safari).
3. **Navigate & Explore**: Use the built-in top navigation bar to seamlessly switch between the Dashboard, Analytics, Drivers, and Teams pages.

---

## Project Structure

```text
📁 F1_Dashboard
├── 📄 F1_Dashboard.html   # Main dashboard: countdown, calendar, standings & race results
├── 📄 app.js              # Dashboard logic, Ergast/Jolpica API fetching & DOM updates
├── 📄 analytics.html      # Telemetry & points progression charts
├── 📄 analytics.js        # Chart.js data formatting & visualization logic
├── 📄 drivers.html        # Comprehensive driver profiles & standings grid
├── 📄 drivers.js          # Driver data extraction & rendering logic
├── 📄 teams.html          # Constructor standings, driver lineups & team stats
├── 📄 teams.js            # Constructor data handling & progress calculation
└── 📄 README.md           # Project documentation
```