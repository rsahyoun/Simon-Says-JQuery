var buttonColours = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];

var started = false;

var level = 0;

$.fn.flash = function(times, duration) 
{ 	var T = this;  	
    times = times || 3; 	duration = duration || 200;      
    for ( var i=0; i < times; i++ )     
        {     	(function() 
            {      		setTimeout(function() 
                { 		    	T.fadeOut(duration, function() 
                    { 		    		T.fadeIn(duration); 		    	

                    });     		
                }, i*duration*2+50);      	
            })(i);     
        } 
};


//ON STEP 7 
$(document).keypress(function()
{
    if(!started)
    {
        $("h1").text("Level " + level);
        nextSequence();
        started = true;
    }

});


$(".btn").click(function()
{
    var userChosenColour = $(this).attr("id");

    userClickedPattern.push(userChosenColour);

    //console.log(userClickedPattern);

    playSound(userChosenColour);
    animatePress(userChosenColour);
    
    checkAnswers(userClickedPattern.length - 1);

});


function checkAnswers(currentLevel)
{
    //check to see if user input corresponds with order of the next sequence
    if(gamePattern[currentLevel] == userClickedPattern[currentLevel])
    {
        console.log("success");

        if(userClickedPattern.length == gamePattern.length)
        {
            setTimeout(function()
            {
                nextSequence();
            }, 1000);
        }
    }
    else
    {
        console.log("wrong")
        var audio = new Audio("sounds/wrong.mp3");
        audio.play();
        $("body").addClass("game-over");
        setTimeout(function()
        {
            $("body").removeClass("game-over");
        }, 200)

        $("h1").text("Game Over, Press Any Key to Restart");
        startOver();
    }

}


function startOver()
{
    gamePattern = [];
    level = 0;
    started = false;
}

function nextSequence()
{
    userClickedPattern = [];

    level++;

    $("h1").text("Level " + level);

    var randomNumber = Math.floor(Math.random() * 4);
    var randomChosenColour = buttonColours[randomNumber];
    gamePattern.push(randomChosenColour);

    $("#" + randomChosenColour).flash(1, 100);

    playSound(randomChosenColour);

}


function playSound(name)
{
    var audio = new Audio("sounds/" + name + ".mp3");

    audio.play();
}


function animatePress(currentColor) {

    $("#" + currentColor).addClass("pressed");
  
    setTimeout(function () 
    {
      $("#" + currentColor).removeClass("pressed");
    }, 100);
}












