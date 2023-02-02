var buttonColors = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];
var randomChosenColor = "";
var userChosenColor = "";
var picker = 0;
var level = 0;

$(document).on("keypress", function() {
    updateLevelText();
    nextSequence();
})

$(".btn").on("click", function(e) {
    if (level > 0) {
        userChosenColor = e.target.id;
        if (userChosenColor != gamePattern[userClickedPattern.length]) {
            var gameOver = new Audio("sounds/wrong.mp3");
            gameOver.play()
            $("body").css("background-color", "red");
            setTimeout(function() {
                $("body").css("background-color", "#011F3F");
            }, 150);
            level = 0;
            gamePattern = [];
            userClickedPattern = [];
            updateLevelText("loss");
            return;
        }

        userClickedPattern.push(userChosenColor);
        animatePress(userChosenColor);

        if (userClickedPattern.length >= level) {
            userClickedPattern = [];
            setTimeout(updateLevelText,100);
            setTimeout(nextSequence,500);
        }
    }
});

function updateLevelText(word) {
    if (word == "loss") {
        $("#level-title").text("Game Over. Press any button to start again.");
    } else {
        $("#level-title").text("Level " + level++);
    }
    
}

function nextSequence() {
    
    picker = Math.floor(Math.random()*4);
    randomChosenColor = buttonColors[picker];
    gamePattern.push(randomChosenColor);
    animatePress(randomChosenColor);
}

function animatePress(color) {
    $("#"+color).css("background-color", "black");
    var sound = new Audio("sounds/"+color+".mp3");
    sound.play();
    setTimeout(function() {
        $("#"+color).css("background-color", color);
    }, 100);
}



