var gameLevel = 1;
var sequence = [];
var gameOver = false;
$(document).on('click keyup', gameLoop)

// Function that is called to restart the game.
function restartGame() {
    setTimeout(function () {
        $('body').css('background-color', 'rgb(7,28,58)');
        $('.button').removeClass('hover');
        $('h1').text("Press A Key or Tap the screen to Start.");
        sequence = []
        gameLevel = 1;
        $(document).on('click keyup', gameLoop)
    }, 1000)
}

//Main game loop
function gameLoop() {
    $(document).unbind();
    $('h1').text("Level " + gameLevel);
    sequence.push(Math.round(Math.random() * 3));
    animateSeq(0);

    // Timeout to wait for async animation to finish.
    setTimeout(function () {
        $('.button').addClass('hover');
        var currentIndex = 0;
        $('.button').on('click', function () {

            var sound = new Audio("sounds/" + $(this).attr("id") + ".mp3");
            var wrong = new Audio("sounds/wrong.mp3");
            
            if (currentIndex < gameLevel) {
                var btnID = $('.button').eq(sequence[currentIndex]).attr('id');
                if ($(this).attr('id') === btnID) { 
                    currentIndex++;
                    sound.play();
                }
                else {
                    $('.button').unbind();
                    $('h1').text("Game Over!");
                    $('body').css("background-color", "red");
                    wrong.play();
                    restartGame();
                }

            }
            if(currentIndex===gameLevel) {
                $('.button').removeClass('hover');
                $('.button').unbind();
                gameLevel++;
                setTimeout(gameLoop, 1000);
            }
        });
    }, 800 * sequence.length)
}

//Function that animates the current sequence.
function animateSeq(i) {
    if (i < gameLevel) {
        var btn = $('.button').eq(sequence[i]);
        var sound = new Audio("sounds/" + btn.attr("id") + ".mp3");
        sound.play();
        btn.animate({ opacity: 0.2 }, 400).animate({ opacity: 1 }, 400, function () { btn.removeAttr("style") })
        setTimeout(function () {
            animateSeq(i + 1);
        }, 800);
    }
}