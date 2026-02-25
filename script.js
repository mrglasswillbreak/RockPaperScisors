const resultsDiv = document.getElementById("results");
const buttonsDiv = document.getElementById("buttons");
const restartBtn = document.getElementById("restart");

const choices = ["rock", "paper", "scissors"];
let humanScore = 0;
let computerScore = 0;
let drawScore = 0;
const winningScore = 5;

// Get computer choice
function getComputerChoice() {
  return choices[Math.floor(Math.random() * choices.length)];
}

// Play a round
function playRound(playerSelection) {
  if (humanScore >= winningScore || computerScore >= winningScore) return;

  const computerSelection = getComputerChoice();
  let roundResult = "";

  if (playerSelection === computerSelection) {
    drawScore++;
    roundResult = `It's a tie! Both chose ${playerSelection}`;
  } else if (
    (playerSelection === "rock" && computerSelection === "scissors") ||
    (playerSelection === "paper" && computerSelection === "rock") ||
    (playerSelection === "scissors" && computerSelection === "paper")
  ) {
    humanScore++;
    roundResult = `You win! ${playerSelection} beats ${computerSelection}`;
  } else {
    computerScore++;
    roundResult = `You lose! ${computerSelection} beats ${playerSelection}`;
  }

  resultsDiv.innerHTML = `
    <p>${roundResult}</p>
    <p>Score → You: ${humanScore} | Computer: ${computerScore} | Draws: ${drawScore}</p>
  `;

  checkGameOver();
}

// Check if game is over
function checkGameOver() {
  if (humanScore >= winningScore || computerScore >= winningScore) {
    const winner =
      humanScore > computerScore ? "You win the game!" : "Computer wins the game!";
    resultsDiv.innerHTML += `<p><strong>${winner}</strong></p>`;
    disableButtons();
    restartBtn.style.display = "inline-block";
  }
}

// Disable choice buttons
function disableButtons() {
  const buttons = buttonsDiv.querySelectorAll("button");
  buttons.forEach((btn) => (btn.disabled = true));
}

// Enable buttons
function enableButtons() {
  const buttons = buttonsDiv.querySelectorAll("button");
  buttons.forEach((btn) => (btn.disabled = false));
}

// Restart game
function restartGame() {
  humanScore = 0;
  computerScore = 0;
  drawScore = 0;
  resultsDiv.innerHTML = "";
  enableButtons();
  restartBtn.style.display = "none";
}

// Event listeners
buttonsDiv.addEventListener("click", (e) => {
  if (e.target.tagName === "BUTTON") {
    playRound(e.target.dataset.choice);
  }
});

restartBtn.addEventListener("click", restartGame);