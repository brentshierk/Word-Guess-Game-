var wordBank =
    ['java' , 'javascript' , 'node' ,'react' , 'angular', 'html' , 'css' , 'bootstrap' , 'python'  ];
      //wordbank
//only thing that needs to be kept constant throughout game
const maxTries = 10;
//varibles used
var guessedLetters = [];
var currentWordIndex;
var guessingWord = [];
var remainingGuesses = 0;
var gameStarted = false;
var gameEnd = false;
var wins = 0;
//makes sure nothing carries over from round to round ex:blank spaces _ stacking
function resetGame() {
    remainingGuesses = maxTries;
    gameStarted = false;


    currentWordIndex = Math.floor(Math.random() * (wordBank.length));

    guessedLetters = [];
    guessingWord = [];


    for (var i = 0; i < wordBank[currentWordIndex].length; i++) {
        guessingWord.push("_");
    }

    //function carrys W/L over to each round
    keepStats();
};
//function prints varibles to the page
function keepStats() {

    document.getElementById("totalWins").innerText = wins;
    document.getElementById("currentWord").innerText = "";
    for (var i = 0; i < guessingWord.length; i++) {
        document.getElementById("currentWord").innerText += guessingWord[i];
    }
    document.getElementById("remainingGuesses").innerText = remainingGuesses;
    document.getElementById("guessedLetters").innerText = guessedLetters;
};
//records onkey down to a keycode (keycode is = to a letter in the alphabet)
document.onkeydown = function(event) {

    if(gameEnd) {
        resetGame();
        gameEnd = false;
    } else {

        if(event.keyCode >= 65 && event.keyCode <= 90) {
            makeGuess(event.key.toLowerCase());
        }
    }
};

function makeGuess(letter) {
   if (remainingGuesses > 0) {
       if (!gameStarted) {
           gameStarted = true;
       }

       //pushes guessed letter to an array
       if (guessedLetters.indexOf(letter) === -1) {
           guessedLetters.push(letter);
           evaluateGuess(letter);
       }
   }

   keepStats();
   checkWin();
};

//makes sure the the gussed letter exsist in currentWord
function evaluateGuess(letter) {

    var positions = [];


    for (var i = 0; i < wordBank[currentWordIndex].length; i++) {
        if(wordBank[currentWordIndex][i] === letter) {
            positions.push(i);
        }
    }

    //deducts remainingGuesses
    if (positions.length <= 0) {
        remainingGuesses--;

    } else {

        for(var i = 0; i < positions.length; i++) {
            guessingWord[positions[i]] = letter;
        }
    }
};
function checkWin() {
    if(guessingWord.indexOf("_") === -1) {

        wins++;
        gameEnd = true;
    }
};
