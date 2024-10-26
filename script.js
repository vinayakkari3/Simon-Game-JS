//This is an array contains button colors
var buttonColours = ["red", "blue", "green", "yellow"];

//Random generated button colors are pushed into this array
var gamePattern = [];

//User selected button colors are pushed into this array
var userPattern = [];

var level = 1;

//First Keyboard Press Detection to start the game
$(document).keypress(function () {
  if (level === 1) {
    nextSequence();
  }
});

//Added EventLinstner to buttons to detect user clicks event.target
$(".btn").click(function () {
  var userClickedButton = $(this).attr("id"); //returning user selected button id
  userPattern.push(userClickedButton); //Button id pushing into  array
  //console.log(userPattern);

  playSound(userClickedButton); //playSound() call passing respective button value to fetch respective sound
  animatePress(userClickedButton); //animatePress() call passing respective button value to apply respective effects
  checkAnswer(userPattern.length - 1);
});

//validation for generated and clicked button values
function checkAnswer(currentLevel) {
  if (gamePattern[currentLevel] === userPattern[currentLevel]) {
    if (userPattern.length === gamePattern.length) {
      setTimeout(function () {
        nextSequence();
      }, 1000);
    }
  } else {
    playSound("wrong");
    $("body").addClass("game-over");
    $("h1").text("Game Over, Press Any Key to Restart");

    setTimeout(() => {
      $("body").removeClass("game-over");
    }, 200);

    startOver();
  }
}

/*This function is used to :
1. Generate random numbers 
2. Fetch corresponding button color to push into gamePattern []; */
function nextSequence() {
  userPattern = [];
  $("h1").text("Level " + level++);
  var randomNumber = Math.floor(Math.random() * 4);
  var randomChosenColour = buttonColours[randomNumber];
  gamePattern.push(randomChosenColour);
  //   console.log(gamePattern);

  //Animate(flash) random selected button
  $("#" + randomChosenColour)
    .fadeIn(100)
    .fadeOut(100)
    .fadeIn(100);

  //Play sound for random selected button
  playSound(randomChosenColour);
}

//To play sound when user hits a button
function playSound(name) {
  var clickedSound = new Audio("sounds/" + name + ".mp3");
  clickedSound.play();
}

//To animate when user hits a button
function animatePress(currentColour) {
  $("#" + currentColour).addClass("pressed");
  setTimeout(() => {
    $("#" + currentColour).removeClass("pressed");
  }, 100);
}

function startOver() {
  level = 1;
  gamePattern = [];
}
