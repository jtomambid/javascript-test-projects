/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/

var scores, roundScore, activePlayer, finalScore;
var gamePlaying = true;


init();

var lastDice;

document.querySelector(".btn-roll").addEventListener("click", function() {

	if(gamePlaying){
		//Generate Random Number
		var dice1 = Math.floor(Math.random() * 6) + 1;
		var dice2 = Math.floor(Math.random() * 6) + 1;

		//Display the result
		var dice1DOM = document.querySelector(".dice");
		var dice2DOM = document.querySelector(".dice1");
		dice1DOM.style.display = "block";
		dice2DOM.style.display = "block";
		dice1DOM.src = "dice-" + dice1 + ".png";
		dice2DOM.src = "dice-" + dice2 + ".png";

		//Get the input for the max score. If there's no input the max score will be set to 100
		finalScore = document.querySelector(".final-score").value;
		if(finalScore === "")
			document.querySelector(".final-score").value = 100;
		
		
		if(dice1 === 6 && lastDice === 6  || dice2 === 6 && lastDice === 6){
			//Player looses score
			scores[activePlayer] = 0;
			document.querySelector("#score-" + activePlayer).textContent = 0;
			nextPlayer();
		//Update the round score If the rolled number is not one
		} else if(dice1 !== 1 && dice2 !== 1) {
			// Add score
			roundScore += dice1 + dice2;
			document.querySelector("#current-" + activePlayer).textContent = roundScore;
		} else {
			//Next Player
			nextPlayer();
		}

		lastDice = dice1;

	
	}	
	

});

document.querySelector(".btn-hold").addEventListener("click", () => {
 	if(gamePlaying){
 		scores[activePlayer] += roundScore;
	 	document.querySelector("#score-" + activePlayer).textContent = scores[activePlayer];
 		if(scores[activePlayer] >= finalScore) {
	 		document.querySelector("#name-" + activePlayer).textContent = "Winner!";
	 		document.querySelector(".dice").style.display = "none";
	 		document.querySelector(".dice1").style.display = "none";
	 		document.querySelector(".player-" + activePlayer + "-panel").classList.add("winner");
	 		document.querySelector(".player-" + activePlayer + "-panel").classList.remove("active");
	 		gamePlaying = false;
	 	} else {
	 		nextPlayer();
	 	}
 	}

 	
});


document.querySelector(".btn-new").addEventListener("click", init);


// This function is the starting point of the game. it will initialized all elements into 0
function init() {
	scores = [0,0];
	activePlayer = 0;
	roundScore = 0;


	//document.querySelector("#current-" + activePlayer).textContent = dice;
	document.querySelector(".final-score").value = "Score";
	document.querySelector(".dice").style.display = "none";
	document.querySelector(".dice1").style.display = "none";

	document.getElementById("score-0").textContent = "0";
	document.getElementById("score-1").textContent = "0";
	document.getElementById("current-0").textContent = "0";
	document.getElementById("current-1").textContent = "0";
	document.querySelector("#name-0").textContent = "Player 1";
	document.querySelector("#name-1").textContent = "Player 2";
	document.querySelector(".player-0-panel").classList.remove("winner");		
	document.querySelector(".player-1-panel").classList.remove("winner");		
	document.querySelector(".player-0-panel").classList.remove("active");			
	document.querySelector(".player-1-panel").classList.remove("active");		
	document.querySelector(".player-0-panel").classList.add("active");	
	gamePlaying = true;
}


function nextPlayer() {
	activePlayer === 0 ? activePlayer = 1 : activePlayer = 0;
	roundScore = 0;
	document.querySelector("#current-0").textContent = "0";
	document.querySelector("#current-1").textContent = "0";
	
	document.querySelector(".player-0-panel").classList.toggle("active");
	document.querySelector(".player-1-panel").classList.toggle("active");
	
	//document.querySelector(".player-0-panel").classList.remove("active");
	//document.querySelector(".player-1-panel").classList.add("active");

	document.querySelector(".dice").style.display = "none";
	document.querySelector(".dice1").style.display = "none";
}