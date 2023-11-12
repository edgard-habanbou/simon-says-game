// Vanilla JavaScript equivalent

let gamePattern = [];
let userClickedPattern = [];
let level = 0;
let gameStarted = false;
const buttonColors = ["red", "blue", "green", "yellow"];

function addClickListener(color) {
  document.getElementById(color).addEventListener("click", function () {
    PressedAnimation(color);
    PressedSound(color);
    if (gameStarted) userClickedPattern.push(color);
    checkIfStarted();
  });
}
buttonColors.forEach(addClickListener);

// This function is used to play sound when the user clicks on a color
function PressedSound(color) {
  var audio = new Audio("./sounds/" + color + ".mp3");
  audio.play();
}

// This function is used to play animation when the user clicks on a color
function PressedAnimation(color) {
  document.getElementById(color).classList.add("pressed");
  setTimeout(function () {
    document.getElementById(color).classList.remove("pressed");
  }, 50);
}

// This function is used to check if the game is started or not
function checkIfStarted() {
  gameStarted === false ? startGame() : checkAnswer();
}

// This function is used to start the game
function startGame() {
  document.getElementById("level-title").textContent = "Level " + 1;
  setTimeout(function () {
    nextLevel();
  }, 500);
  gameStarted = true;
}

// This function is used to advance the user to the next level
function nextLevel() {
  level++;
  document.getElementById("level-title").textContent = "Level " + level;
  generateRandomColor();
}

// This function generates a random color and shows it to the user
function generateRandomColor() {
  let randomNumber = Math.floor(Math.random() * 4);
  let randomColor = buttonColors[randomNumber];
  gamePattern.push(randomColor);
  PressedAnimation(randomColor);
  PressedSound(randomColor);
}

function checkAnswer() {
  // Check if the user's input length matches the game pattern length
  userClickedPattern.length === gamePattern.length
    ? comparePatterns() // If they match, compare the patterns
    : validateUserInput(); // If not, validate the user's input
}

function comparePatterns() {
  // Check if the user's input matches the game pattern
  if (JSON.stringify(gamePattern) === JSON.stringify(userClickedPattern)) {
    setTimeout(function () {
      nextLevel(); // If they match
    }, 1000);
    userClickedPattern = [];
  } else {
    gameOver(); // If they don't match
  }
}

function validateUserInput() {
  for (let i = 0; i < userClickedPattern.length; i++) {
    if (userClickedPattern[i] !== gamePattern[i]) {
      gameOver();
    }
  }
}

function restart() {
  level = 0;
  gameStarted = false;
  gamePattern = [];
  userClickedPattern = [];
}

function gameOver() {
  var audio = new Audio("./sounds/wrong.mp3");
  audio.play();
  document.body.classList.add("game-over");
  setTimeout(function () {
    document.body.classList.remove("game-over");
  }, 50);
  document.getElementById("level-title").textContent =
    "Game Over, Press Any Key to Restart";
  restart();
}
