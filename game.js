var buttonColors = ["red", "blue", "green", "yellow"];

var gamePattern = [];
var userClickedPattern = [];

var started = false;
var level = 0;

$(document).keypress(function(){
    if(!started){
        $("#level-title").text("Level " + level);
        nextSequence();
        started = true;
    }
});

$(".btn").click(function () {

    var userChosenColor = $(this).attr("id");
    userClickedPattern.push(userChosenColor);

    playsound(userChosenColor);
    animatepress(userChosenColor);
    
    checkanswer(userClickedPattern.length-1);
});

function checkanswer(currentlevel){

    if(gamePattern[currentlevel] === userClickedPattern[currentlevel]){
        if(gamePattern.length === userClickedPattern.length){
            setTimeout(function() {
                nextSequence();
            }, 1000);
        }
    }else{
        playsound("wrong");
         $("body").addClass("game-over");
        $("#level-title").text("Game Over!!,press any key to restart.");
        setTimeout(function()  {
            $("body").removeClass("game-over");
        }, 200);


        startover();


    }

}


function nextSequence() {
    userClickedPattern = [];
    level++;

    $("#level-title").text("Level "+ level);

    randomNumber = Math.floor(Math.random() * 4);

    var randomChosenColor = buttonColors[randomNumber];

    gamePattern.push(randomChosenColor);

    $("#" + randomChosenColor).fadeIn(100).fadeOut(100).fadeIn(100);

    playsound(randomChosenColor);
}

function playsound(name) {
    var audio = new Audio("sounds/" + name + ".mp3");
    audio.play();

}

function animatepress(currentcolor) {
    $("#" + currentcolor).addClass("pressed");
    setTimeout(function () {
        $("#" + currentcolor).removeClass("pressed");
    }, 100);
}

function startover(){

    started = false;
    gamePattern = [];
   
    level = 0;
}