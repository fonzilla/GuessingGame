$(document).ready(function() {
	var playersGuess;
	var guessCount = 5;
	var guessesLeft = guessCount;

	$('#submit').on('click', playersGuessSubmission);
	$('#playersHint').on('click',provideHint);
	$('#playAgain').on('click',playAgain);

function generateWinningNumber(){
		return  Math.round(Math.random()*99)+1;
}

var winningNumber = generateWinningNumber();

function playersGuessSubmission(){
	playersGuess = +$('#val').val();
	if(playersGuess > 0 && playersGuess <= 100){
		$('#val').val("");
		if(guessesLeft > 1){
			guessesLeft--;
			checkGuess();
		}else{
			checkGuess();
		}

	} else {
		alert("Please enter a number between 1 and 100!");
		$('#val').val("");
	};
}


function lowerOrHigher(){
	if(Math.abs(winningNumber - playersGuess) >= 40) {
		return "Way Off"
	}else if(Math.abs(winningNumber - playersGuess) >= 25){
		return "Cold Guess"
	}else if(Math.abs(winningNumber - playersGuess) >= 10){
		return "Warm Guess"
	}else if(Math.abs(winningNumber - playersGuess) >= 5){
		return "Hot Guess"
	}else{
		return "Very Close!"
	}
}

// Check if the Player's Guess is the winning number 

function checkGuess(){
if(guessesLeft === 0){
	$('.guessesleft').fadeOut('slow');
	$('p').text('You Lost! The Winning Number was: ' + winningNumber+ '. Play Again?')
}else{
	if(playersGuess === winningNumber){
		$('p').text('You Guessed It -- You WIN!');
		$('h4').text("Click Play Again to Reset!");
	}else{
		$('p').text(lowerOrHigher);
		$('h4').text(guessesLeft + " Chances to Guess");
		}
	}
}


function provideHint(){
	var arr = [];

	if(guessesLeft === 1){
		for(var i = 0; i <= 5; i++){
			arr.push(Math.round(Math.random() * 99) + 1);
		};
		var num = Math.round(Math.random() * 6);
		arr.splice(num, 0, winningNumber);
		$('h4').text("The answer is hidden here: "+ arr);

	}else{
		alert("You only get a hint before your final guess!")
	}
}

// Allow the "Player" to Play Again

function playAgain(){
	winningNumber = generateWinningNumber();
	guessesLeft = 5;
	checkGuess();
	$('p').text("New Game Started...")
}

});
