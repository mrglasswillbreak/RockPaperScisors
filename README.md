# Rock Paper Scissors

A polished, responsive Rock Paper Scissors web app built with semantic HTML, modern CSS, and vanilla JavaScript.

## Overview

This project modernizes the classic game with a compact mobile-first layout, keyboard shortcuts, configurable match length, and persistent theme preferences.

## Live Demo
- **GitHub Pages:** https://github.com/mrglasswillbreak/RockPaperScissors/

## Features

- **Responsive, mobile-first gameplay** with a compact viewport-friendly layout
- **Light / Dark mode toggle** with preference saved in `localStorage`
- **Keyboard controls** (`R`, `P`, `S`) in addition to button input
- **Configurable target score** (`3`, `5`, or `7`)
- **Live status updates** for round outcomes and match results
- **Round history** list showing the latest rounds
- **Restart flow** for starting a fresh match instantly

## Screenshots

### Desktop (Light Theme)
![Desktop light theme](docs/screenshots/light-theme-desktop.svg)

### Desktop (Dark Theme)
![Desktop dark theme](docs/screenshots/dark-theme-desktop.svg)

### Mobile Layout
![Mobile layout](docs/screenshots/mobile-layout.svg)

## Tech Stack

- HTML5
- CSS3
- JavaScript (ES6)

## Project Structure

```text
RockPaperScisors/
├── index.html
├── style.css
├── script.js
└── README.md
```

## Run Locally

1. Clone the repository:
   ```bash
   git clone https://github.com/mrGlassWillBreak/RockPaperScisors.git
   cd RockPaperScisors
   ```
2. Open `index.html` directly in your browser.

> Optional: run a local static server for parity with deployed behavior:
>
> ```bash
> python3 -m http.server 4173
> ```

## Controls

- **Mouse / Touch**: Click a move button
- **Keyboard**:
  - `R` = Rock
  - `P` = Paper
  - `S` = Scissors

## License

This project is open source and available under the MIT License.
