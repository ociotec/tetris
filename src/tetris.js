const VERSION = "0.4.0"

let board;
let game;

let canvas;
let context;
let timer = null;
const PERIOD = 10;
let frameCounter = 0;
let cleaningLines = false;

let playing;

var firstInit = true;
var backgroundAudio;
var lineAudio;
var gameOverAudio;

function setTimer() {
    if (timer !== null) {
        clearInterval(timer);
    }
    timer = setInterval(frame, PERIOD);
}

function initGame() {
    board.reset();
    frameCounter = 0;
    playing = true;
}

function resetGame() {
    initGame();
    setTimer();
    gameOverAudio.pause();
    backgroundAudio.currentTime = 0;
    backgroundAudio.play();
}

function frame() {
    if (cleaningLines) {
        frameCounter = (frameCounter + 1) % game.speed;
        if (frameCounter == 0) {
            board.cleanLines();;
            cleaningLines = false;
        }
    }
    else if (board.newPieceIsNeeded()) {
        board.addNewPiece();
    } else {
        frameCounter = (frameCounter + 1) % game.speed;
        if (frameCounter == 0) {
            board.moveCurrentPieceDown();
        }
    }
    board.draw();
}

function gameOver() {
    currentPiece = null;
    playing = false;
    clearInterval(timer);
    backgroundAudio.pause();
    gameOverAudio.play();
}

function line() {
    cleaningLines = true;
    frameCounter = 0;
    lineAudio.play();
}

function keydown(event) {
    let processed = true;
    let key = event.which;
    switch (key) {
        case 37: // Left arrow
            if (playing) {
                board.moveCurrentPieceLeft();
            }
            break;
        case 39: // Right arrow
            if (playing) {
                board.moveCurrentPieceRight();
            }
            break;
        case 38: // Up arrow
            if (playing) {
                board.rotateCurrentPiece();
            }
            break;
        case 40: // Down arrow
            if (playing) {
                board.moveCurrentPieceDown();
            }
            break;
        case 27: // Escape
            resetGame();
            break;
        default:
            processed = false;
            break;
    }
    if (!processed) {
        event.preventDefault();
    }
}

function tetris(id) {
    canvas = document.getElementById(id);
    context = canvas.getContext('2d');
    game = new Game(VERSION);
    board = new Board(canvas, context, game, gameOver,line, window.innerWidth, window.innerHeight);

    backgroundAudio = new Audio('sounds/tetris.mp3');
    lineAudio = new Audio('sounds/line.mp3');
    gameOverAudio = new Audio('sounds/game_over.mp3');
    backgroundAudio.loop = true;

    canvas.onclick = function() {
        if (firstInit) {
            firstInit = false;
            backgroundAudio.play();
            game.status = '';
            setTimer();
        }
    };

    initGame();
    game.status = 'Use arrow keys to move, click to start...';
    board.draw();

    window.addEventListener('resize', function() {
        board.reset();
    });
    window.addEventListener('keydown', keydown);
}
