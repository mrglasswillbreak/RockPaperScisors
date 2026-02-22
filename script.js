/*create a function that uses Math.random & Math.floor method to return a random number between 0 and 3
if number is = 0 refurn rock
else if number is = 1 return paper
else return scissors*/
	
	function getComputerChoice() {
		const random = Math.floor(Math.random() * 3);
		
	  if (random === 0) return "Rock";
	  if (random === 1) return "Paper";
	  return "Scissors";
	}
	
	
/*Create a function that takes the round variable from the below playGame function as a parameter
use Prompt method and the round parameter to display the round number and get user input, store it in a variable named input
Use the toLowerCase method to turn the input to lowercase so the input is case-insensitive
if input = rock return Rock
else if input = paper return Paper
else if input = scissors return Scissors*/

	function getHumanChoice(round) {
	  const input = prompt(`Round ${round}: Enter Rock, Paper, or Scissors`);
	
	  if (!input) return null;
	
	  const choice = input.toLowerCase();
	
	  if (choice === "rock") return "Rock";
	  if (choice === "paper") return "Paper";
	  if (choice === "scissors") return "Scissors";
	
	  console.log("You can only enter Rock, Paper, or Scissors");
	  return getHumanChoice(round);//replay current round if wrong input is entered
	}
	
	
	/*declare two variables: humanScore and computerScore and initialize both with a value of zero
	chain if-else statements for 7 possible scenarios: 3 where the human wins, 3 where the computer wins, and 1 where there's a draw.
	Increment the score of either variable based on the winner
	Log a message to the console stating who won and why
	declare two variables: humanSelection & computerSelection and pass them both the values of their respective getChoice function*/
	
	let humanScore = 0;
	let computerScore = 0;
	
	function playRound(humanChoice, computerChoice) {
		console.log("Human:", humanChoice);
		console.log("Computer:", computerChoice);
		
		//Human winning scenarios if-else chain
		if (humanChoice === "Rock" && computerChoice === "Scissors") {
			humanScore++;
			console.log("You win!, Rock beats Scissors");
		} else if (humanChoice === "Paper" && computerChoice === "Rock") {
			humanScore++;
			console.log("You win!, Paper beats Rock");
		} else if (humanChoice === "Scissors" && computerChoice === "Paper") {
			humanScore++;
			console.log("You win!, Scissors beats Paper");	
		}
		
		//Computer winning scenarios else-if chain
		else if (computerChoice === "Rock" && humanChoice === "Scissors") {
			computerScore++;
			console.log("You lose!, Rock beats Scissors");
		} else if (computerChoice === "Paper" && humanChoice === "Rock") {
			computerScore++;
			console.log("You lose!, Paper beats Rock");
		} else if (computerChoice === "Scissors" && humanChoice === "Paper") {
			computerScore++;
			console.log("You lose!, Scissors beats Paper")
		} else {
			console.log("oops! That's a draw, you both chose the same thing");
		}
	}
	
	
	/*play entire game 5 times using a loop that passes both getChoice functions as parameters to the playRound function and calls all three functions 5 times
	log final scores to console using humanScore and computerScore variable values
	If humanScore is greater than the computerScore, log a message to the console stating the user won
	else if computerScore is greater than humanScore, log a message to the console stating the computer won
	else log a message to the console stating it's a draw*/
	
	function playGame() {
	  for (let round = 1; round <= 5; round++) {
	    console.log(`\nRound ${round}:`);
	    const humanSelection = getHumanChoice(round);
	    const computerSelection = getComputerChoice();
	    playRound(humanSelection, computerSelection);
	  }
	
	  console.log("\n=== Final Scores ===");
	  console.log(`You: ${humanScore} | Computer: ${computerScore}`);
	
	  if (humanScore > computerScore) {
	    console.log("You are the overall winner!");
	  } else if (computerScore > humanScore) {
	    console.log("Computer wins the game!");
	  } else {
	    console.log("It's a tie game!");
	  }
	}
	
	// Start the game
	playGame();