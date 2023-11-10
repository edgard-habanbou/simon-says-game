$("#green").click(function () {
  UserPressedAnimationAndSound("green");
});

$("#red").click(function () {
  UserPressedAnimationAndSound("red");
});

$("#yellow").click(function () {
  UserPressedAnimationAndSound("yellow");
});

$("#blue").click(function () {
  UserPressedAnimationAndSound("blue");
});

function UserPressedAnimationAndSound(color) {
  $("#" + color).addClass("pressed");
  setTimeout(function () {
    $("#" + color).removeClass("pressed");
  }, 50);
  var audio = new Audio("./sounds/" + color + ".mp3");
  audio.play();
}
