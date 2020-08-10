const COLOR_FONT = '#EEEEEE';
const INIT_SPEED = 40;
const PIECES_TO_INCREASE_LEVEL = 20;

class Game {

    constructor(version) {
        this.version = version;
        this.reset();
    }

    reset() {
        this.level = 1;
        this.score = 0;
        this.piecesCount = 0;
        this.clearedLines = 0;
        this.speed = INIT_SPEED
        this.status = '';
    }

    gameOver() {
        this.status = "GAME OVER! :(\nPress ESC to restart";
    }

    increasePiece() {
        this.piecesCount++;
        if (this.piecesCount % PIECES_TO_INCREASE_LEVEL === 0) {
            if (this.speed > INIT_SPEED / 2) {
                this.speed -= 5;
            } else if (this.speed > INIT_SPEED / 4) {
                this.speed -= 4;
            } else if (this.speed > INIT_SPEED / 8) {
                this.speed -= 2;
            } else if (this.speed > 1) {
                this.speed -= 1;
            }
            this.level++;
        }
    }

    calculateScore(lines) {
        return (lines <= 0) ? 0 : (lines + this.calculateScore(lines - 1));
    }
    
    scoreLines(lines) {
        this.clearedLines += lines;
        var points = this.calculateScore(lines);
        this.score += points;
        return points;
    }    

    drawTop(context, cellSize, posX, posY) {
        context.fillStyle = COLOR_FONT;
        context.font = 'bold small-caps ' + (cellSize * 2) + 'px Courier New';
        posY += (cellSize * 2);
        context.fillText('Tetris', posX, posY);
    
        context.font = '' + (cellSize * 0.5) + 'px Courier New';
        posY += cellSize * 0.8;
        context.fillText('v' + this.version, posX, posY);
        posY += cellSize * 0.8;
        context.fillText('By Emilio González Montaña', posX, posY);
        posY += cellSize * 0.8;
        context.fillText('https://github.com/ociotec/tetris', posX, posY);

        context.font = '' + cellSize + 'px Courier New';
        posY += cellSize * 1.5;
        context.fillText("Next piece:", posX, posY);

        return posY;
    }

    drawBottom(context, cellSize, posX, posY) {
        context.fillStyle = COLOR_FONT;
        context.font = '' + cellSize + 'px Courier New';
        posY += cellSize * 1.5;
        context.fillText("Level:  " + this.level, posX, posY);
        posY += cellSize;
        context.fillText("Score:  " + this.score, posX, posY);
        posY += cellSize;
        context.fillText("Pieces: " + this.piecesCount, posX, posY);
        posY += cellSize;
        context.fillText("Lines:  " + this.clearedLines, posX, posY);
        posY += cellSize;
        context.fillText("Speed:  " + this.speed, posX, posY);
    
        context.font = "" + (cellSize * 0.5) + "px Courier New";
        posY += cellSize * 1.5;
        this.status.split('\n').forEach(function(line) {
            context.fillText(line, posX, posY);
            posY += cellSize * 0.5;
        });

        return posY;
    }

}
