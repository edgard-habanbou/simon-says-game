let gamePattern = [];
let userClickedPattern = [];
let level = 0;
let gameStarted = false;

$("#green").click(function () {
  PressedAnimation("green");
  PressedSound("green");
  if (gameStarted) userClickedPattern.push("green");
  StartGame();
});

$("#red").click(function () {
  PressedAnimation("red");
  PressedSound("red");
  if (gameStarted) userClickedPattern.push("red");
  StartGame();
});

$("#yellow").click(function () {
  PressedAnimation("yellow");
  PressedSound("yellow");
  if (gameStarted) userClickedPattern.push("yellow");
  StartGame();
});

$("#blue").click(function () {
  PressedAnimation("blue");
  PressedSound("blue");
  if (gameStarted) userClickedPattern.push("blue");

  StartGame();
});

// This function is used to play sound when user clicks on a colof
function PressedSound(color) {
  var audio = new Audio("./sounds/" + color + ".mp3");
  audio.play();
}

// This function is used to play animation when user clicks on a color
function PressedAnimation(color) {
  $("#" + color).addClass("pressed");
  setTimeout(function () {
    $("#" + color).removeClass("pressed");
  }, 50);
}

// This function is used to check if the game is started or not
function StartGame() {
  gameStarted == false ? startGame() : checkAnswer();
}

// This function is used to start the game
function startGame() {
  $("#level-title").text("Level " + 1);
  setTimeout(function () {
    nextLevel();
  }, 500);
  gameStarted = true;
}

// This function is used to advance the user to next level
function nextLevel() {
  level++;
  $("#level-title").text("Level " + level);
  geneteRandomColor();
}

// This function generates a random color and shows it to the user
function geneteRandomColor() {
  let randomNumber = Math.floor(Math.random() * 4);
  const buttonColors = ["red", "blue", "green", "yellow"];
  let randomColor = buttonColors[randomNumber];
  gamePattern.push(randomColor);
  PressedAnimation(randomColor);
  PressedSound(randomColor);
}

function checkAnswer() {
  // Check if the user's input length matches the game pattern length
  userClickedPattern.length == gamePattern.length
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
    if (userClickedPattern[i] != gamePattern[i]) {
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
  $("body").addClass("game-over");
  setTimeout(function () {
    $("body").removeClass("game-over");
  }, 50);
  $("#level-title").text("Game Over, Press Any Key to Restart");
  restart();
}
