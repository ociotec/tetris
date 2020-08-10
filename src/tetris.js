const VERSION = "0.4.1"
const PERIOD = 10;

class Tetris {

    constructor(canvasId) {
        var tetris = this;
        this.canvas = document.getElementById(canvasId);
        this.canvas.addEventListener('click', function() { tetris.gainFocus(); });
        this.context = canvas.getContext('2d');
        this.game = new Game(VERSION);
        this.board = new Board(this.canvas, this.context, this.game,
                               function() { tetris.gameOver(); }, function() { tetris.line(); },
                               window.innerWidth, window.innerHeight);

        window.addEventListener('resize', function() { tetris.resize(); });
        window.addEventListener('keydown', function(event) { tetris.keydown(event); });
    
        this.backgroundAudio = new Audio('sounds/tetris.mp3');
        this.backgroundAudio.loop = true;
        this.lineAudio = new Audio('sounds/line.mp3');
        this.gameOverAudio = new Audio('sounds/game_over.mp3');

        this.timer = null;
        this.frameCounter = 0;
        this.cleaningLines = false;
        this.playing;
        this.firstInit = true;

        this.initGame();
        this.game.status = 'Use arrow keys to move\nClick to start...';
        this.board.draw();
    }

    resize() {
        this.resetGame();
        this.board.resize(window.innerWidth, window.innerHeight);
    }

    gainFocus() {
        if (this.firstInit) {
            this.firstInit = false;
            this.backgroundAudio.play();
            this.game.status = '';
            this.setTimer();
        }
    };

    setTimer() {
        var tetris = this;
        if (this.timer != null) {
            clearInterval(this.timer);
        }
        this.timer = setInterval(function() { tetris.frame(); }, PERIOD);
    }
    
    initGame() {
        this.board.reset();
        this.frameCounter = 0;
        this.playing = true;
    }
    
    resetGame() {
        this.initGame();
        this.setTimer();
        this.gameOverAudio.pause();
        this.backgroundAudio.currentTime = 0;
        this.backgroundAudio.play();
    }
    
    increaseFrame() {
        this.frameCounter = (this.frameCounter + 1) % this.game.speed;
        return this.frameCounter == 0;
    }

    frame() {
        if (this.cleaningLines) {
            if (this.increaseFrame()) {
                this.board.cleanLines();;
                this.cleaningLines = false;
            }
        }
        else if (!this.board.addNewPieceIfNeeded()) {
            if (this.increaseFrame()) {
                this.board.moveCurrentPieceDown();
            }
        }
        this.board.draw();
    }
    
    gameOver() {
        this.playing = false;
        clearInterval(this.timer);
        this.backgroundAudio.pause();
        this.gameOverAudio.play();
    }
    
    line() {
        this.cleaningLines = true;
        this.frameCounter = 0;
        this.lineAudio.play();
    }
    
    keydown(event) {
        let processed = true;
        let key = event.which;
        switch (key) {
            case 37: // Left arrow
                if (this.playing) {
                    this.board.moveCurrentPieceLeft();
                }
                break;
            case 39: // Right arrow
                if (this.playing) {
                    this.board.moveCurrentPieceRight();
                }
                break;
            case 38: // Up arrow
                if (this.playing) {
                    this.board.rotateCurrentPiece();
                }
                break;
            case 40: // Down arrow
                if (this.playing) {
                    this.board.moveCurrentPieceDown();
                }
                break;
            case 27: // Escape
            this.resetGame();
                break;
            default:
                processed = false;
                break;
        }
        if (!processed) {
            event.preventDefault();
        }
    }
    
}
