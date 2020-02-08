var gameLevel = 1;
var sequence = [];
var gameOver = false;
var loaded = 0;
var audioFiles = [
    "sounds/blue.mp3",
    "sounds/green.mp3",
    "sounds/red.mp3",
    "sounds/yellow.mp3",
    "sounds/wrong.mp3"
];

const Audios = {
    blue: 0,
    green: 1,
    red: 2,
    yellow: 3,
    wrong: 4
}


load();
// we start preloading all the audio files
function load() {
    for (var i=0; i<audioFiles.length; i++) {
        preloadAudio(audioFiles[i]);
    }
}


function preloadAudio(url) {
    var audio = new Audio();
    // once this file loads, it will call loadedAudio()
    // the file will be kept by the browser as cache
    audio.addEventListener('canplaythrough', loadedAudio, false);
    audio.src = url;
}


function loadedAudio() {
    // this will be called every time an audio file is loaded
    // we keep track of the loaded files vs the requested files
    loaded++;
    if (loaded == audioFiles.length) {
        // all have loaded
        $(document).on('mouseup keyup', gameLoop)
    }
}

// Function that is called to restart the game.
function restartGame() {
    setTimeout(function () {
        $('body').css('background-color', 'rgb(7,28,58)');
        $('.button').removeClass('hover');
        $('h1').text("Press A Key or Tap the screen to Start.");
        sequence = []
        gameLevel = 1;
        $(document).on('mouseup keyup', gameLoop)
    }, 1000)
}

//Main game loop
function gameLoop() {
    $(document).unbind();
    $('h1').text("Level " + gameLevel);
    sequence.push(Math.floor(Math.random() * 4));
    animateSeq(0);

    // Timeout to wait for async animation to finish.
    setTimeout(function () {
        $('.button').addClass('hover');
        var currentIndex = 0;
        $('.button').on('mouseup', function () {

            var sound = new Audio(audioFiles[Audios[$(this).attr("id")]]);
            var wrong = new Audio(audioFiles[4]);

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
            if (currentIndex === gameLevel) {
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
        var sound = new Audio(audioFiles[Audios[btn.attr("id")]]);
        sound.play();
        btn.animate({ opacity: 0.2 }, 400).animate({ opacity: 1 }, 400, function () { btn.removeAttr("style") })
        setTimeout(function () {
            animateSeq(i + 1);
        }, 800);
    }
}