const statusBox = document.getElementById("status");
const statusLine = statusBox.querySelector(".status__line");
const statusSubline = statusBox.querySelector(".status__subline");
const buttonsDiv = document.getElementById("buttons");
const restartBtn = document.getElementById("restart");
const historyList = document.getElementById("history");
const humanScoreLabel = document.getElementById("humanScore");
const computerScoreLabel = document.getElementById("computerScore");
const drawScoreLabel = document.getElementById("drawScore");
const targetScoreSelect = document.getElementById("targetScore");
const targetScoreLabel = document.getElementById("targetScoreLabel");
const themeToggle = document.getElementById("themeToggle");

const choiceDisplay = {
  rock: "🪨 Rock",
  paper: "📄 Paper",
  scissors: "✂️ Scissors",
};

const choices = ["rock", "paper", "scissors"];
const themeStorageKey = "rps-theme";
let humanScore = 0;
let computerScore = 0;
let drawScore = 0;
let roundNumber = 0;
let winningScore = Number(targetScoreSelect.value);

function getComputerChoice() {
  return choices[Math.floor(Math.random() * choices.length)];
}

function updateThemeToggle(theme) {
  const isLight = theme === "light";
  themeToggle.textContent = isLight ? "🌙 Dark mode" : "☀️ Light mode";
  themeToggle.setAttribute("aria-pressed", String(isLight));
}

function applyTheme(theme) {
  document.body.dataset.theme = theme;
  localStorage.setItem(themeStorageKey, theme);
  updateThemeToggle(theme);
}

function initializeTheme() {
  const storedTheme = localStorage.getItem(themeStorageKey);
  if (storedTheme === "light" || storedTheme === "dark") {
    applyTheme(storedTheme);
    return;
  }

  const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
  applyTheme(prefersDark ? "dark" : "light");
}

function updateScoreboard() {
  humanScoreLabel.textContent = humanScore;
  computerScoreLabel.textContent = computerScore;
  drawScoreLabel.textContent = drawScore;
}

function setStatus(resultClass, line, subline) {
  statusBox.classList.remove("status--win", "status--lose", "status--draw");
  if (resultClass) {
    statusBox.classList.add(resultClass);
  }

  statusLine.textContent = line;
  statusSubline.textContent = subline;
}

function addHistoryEntry(text) {
  const item = document.createElement("li");
  item.textContent = text;
  historyList.prepend(item);

  while (historyList.children.length > 6) {
    historyList.removeChild(historyList.lastChild);
  }
}

function checkGameOver() {
  if (humanScore >= winningScore || computerScore >= winningScore) {
    const isHumanWinner = humanScore > computerScore;
    const line = isHumanWinner ? "🎉 You won the match!" : "🤖 Computer won the match.";
    const subline = "Press Start New Match to play again.";

    setStatus(isHumanWinner ? "status--win" : "status--lose", line, subline);
    disableButtons();
    restartBtn.style.display = "inline-block";
    targetScoreSelect.disabled = false;

    return true;
  }

  return false;
}

function playRound(playerSelection) {
  if (humanScore >= winningScore || computerScore >= winningScore) {
    return;
  }

  targetScoreSelect.disabled = true;

  const computerSelection = getComputerChoice();
  roundNumber += 1;

  if (playerSelection === computerSelection) {
    drawScore += 1;
    setStatus(
      "status--draw",
      "Round drawn!",
      `You both picked ${choiceDisplay[playerSelection]}.`
    );
  } else if (
    (playerSelection === "rock" && computerSelection === "scissors") ||
    (playerSelection === "paper" && computerSelection === "rock") ||
    (playerSelection === "scissors" && computerSelection === "paper")
  ) {
    humanScore += 1;
    setStatus(
      "status--win",
      "You won this round!",
      `${choiceDisplay[playerSelection]} beats ${choiceDisplay[computerSelection]}.`
    );
  } else {
    computerScore += 1;
    setStatus(
      "status--lose",
      "Computer won this round.",
      `${choiceDisplay[computerSelection]} beats ${choiceDisplay[playerSelection]}.`
    );
  }

  addHistoryEntry(
    `Round ${roundNumber}: You chose ${choiceDisplay[playerSelection]}, computer chose ${choiceDisplay[computerSelection]}.`
  );

  updateScoreboard();
  checkGameOver();
}

function disableButtons() {
  buttonsDiv.querySelectorAll("button").forEach((btn) => {
    btn.disabled = true;
  });
}

function enableButtons() {
  buttonsDiv.querySelectorAll("button").forEach((btn) => {
    btn.disabled = false;
  });
}

function restartGame() {
  humanScore = 0;
  computerScore = 0;
  drawScore = 0;
  roundNumber = 0;
  winningScore = Number(targetScoreSelect.value);
  targetScoreLabel.textContent = winningScore;

  historyList.innerHTML = "";
  updateScoreboard();
  enableButtons();
  restartBtn.style.display = "none";
  setStatus(null, "Make your move to begin.", "Good luck!");
}

buttonsDiv.addEventListener("click", (event) => {
  const button = event.target.closest("button[data-choice]");
  if (!button) {
    return;
  }

  playRound(button.dataset.choice);
});

restartBtn.addEventListener("click", restartGame);

targetScoreSelect.addEventListener("change", () => {
  winningScore = Number(targetScoreSelect.value);
  targetScoreLabel.textContent = winningScore;
  restartGame();
});

themeToggle.addEventListener("click", () => {
  const currentTheme = document.body.dataset.theme === "light" ? "light" : "dark";
  const nextTheme = currentTheme === "light" ? "dark" : "light";
  applyTheme(nextTheme);
});

document.addEventListener("keydown", (event) => {
  const key = event.key.toLowerCase();
  const keyMap = { r: "rock", p: "paper", s: "scissors" };

  if (!keyMap[key]) {
    return;
  }

  playRound(keyMap[key]);
});

initializeTheme();
updateScoreboard();
