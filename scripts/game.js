let userClickedPattern = [];
const buttonColors = ["red", "blue", "green", "yellow"];
let level = 0;
let started = false;
let counter = 0;

$("#green").click(function () {
  PressedAnimationAndSound("green");
  if (started) userClickedPattern.push("green");
  counter++;
  gameStarted();
});

$("#red").click(function () {
  PressedAnimationAndSound("red");
  if (started) userClickedPattern.push("red");
  counter++;
  gameStarted();
});

$("#yellow").click(function () {
  PressedAnimationAndSound("yellow");
  if (started) userClickedPattern.push("yellow");
  counter++;
  gameStarted();
});

$("#blue").click(function () {
  PressedAnimationAndSound("blue");
  if (started) {
    userClickedPattern.push("blue");
    counter++;
  }
  gameStarted();
});

function PressedAnimationAndSound(color) {
  $("#" + color).addClass("pressed");
  setTimeout(function () {
    $("#" + color).removeClass("pressed");
  }, 50);
  var audio = new Audio("./sounds/" + color + ".mp3");
  audio.play();
}

function gameStarted() {
  if (started == false) {
    $("#level-title").text("Level " + 1);
    setTimeout(function () {
      nextLevel();
    }, 500);
    started = true;
  } else {
    checkAnswer();
  }
}

let gamePattern = [];
function nextLevel() {
  level++;
  $("#level-title").text("Level " + level);
  let randomNumber = Math.floor(Math.random() * 4);
  let randomColor = buttonColors[randomNumber];
  gamePattern.push(randomColor);
  PressedAnimationAndSound(randomColor);
  counter = 0;
}

function checkAnswer() {
  console.log("counter", counter);
  console.log("level", level);
  console.log("userClickedPattern", userClickedPattern);
  console.log("gamePattern", gamePattern);
  console.log(
    userClickedPattern[level - counter],
    gamePattern[level - counter]
  );
  console.log(
    "------------------------------------------------------------------------"
  );

  if (userClickedPattern.length == gamePattern.length) {
    if (JSON.stringify(gamePattern) === JSON.stringify(userClickedPattern)) {
      setTimeout(function () {
        nextLevel();
      }, 1000);
      userClickedPattern = [];
    } else {
      gameOver();
    }
  } else {
    for (let i = 0; i < userClickedPattern.length; i++) {
      if (userClickedPattern[i] != gamePattern[i]) {
        gameOver();
      }
    }
  }
}
function restart() {
  level = 0;
  started = false;
  counter = 0;
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
