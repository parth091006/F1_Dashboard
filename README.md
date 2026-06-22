# 🏎️ Parth's Pit Wall · F1 Dashboard

> A custom, real-time Formula 1 dashboard designed to track the current F1 season.

---


## Overview
**Parth's Pit Wall** is your personal command center for everything Formula 1. It fetches live data to display driver and constructor standings, the season calendar, and a countdown to the next race, all wrapped in a premium, dark-themed interface.

---

## Features

### Live Updates
- **Live Ticker**: A smoothly scrolling ticker across the top of the dashboard.
- **Auto-Refresh**: Data refreshes automatically every hour in the background while the page is open.

### Race Tracking
- **Next Race Countdown**: A live, to-the-second countdown timer for the upcoming Grand Prix.
- **Session Details**: Displays the exact date, time, circuit name, and round number.
- **Season Calendar**: A horizontal, scrollable track of all races. 
  - Completed races are marked with a racing green tick (`✓`).
  - The next upcoming race is dynamically highlighted.

### Standings & Stats
- **Drivers' Championship**: Full grid standings featuring driver points, teams, and point gaps to the leader.
- **Constructors' Cup**: Team standings with visual progress bars indicating relative points.
- **Live Stats Ribbon**: Quick-glance statistics showing the championship lead gap, last race winner, and completed races.

---

## Technology Stack

**HTML5** - Semantic structure and layout.
**CSS3** - Custom styling, smooth CSS animations, flexbox/grid layouts, and custom variables.
**Vanilla JS** - Asynchronous data fetching and UI updates.
**Jolpica API** - Reliable and free endpoint (`api.jolpi.ca/ergast/f1`) for accurate F1 data.

---

## Getting Started

Running this dashboard is incredibly simple. There are **no build steps** or package managers required.

1. **Download**: Clone or download this repository to your local machine.
2. **Open**: Double-click the `F1_Dashboard.html` file to open it directly in any modern web browser (e.g., Chrome, Firefox, Edge).
3. **Enjoy**: The dashboard will automatically fetch the latest data and update the UI for you.

---

## Project Structure

text
📁 F1_Project
├── 📄 F1_Dashboard.html   # Main structural and styling file (HTML/CSS)
├── 📄 app.js              # Logic, API fetching, and data formatting
└── 📄 README.md           # Project documentation