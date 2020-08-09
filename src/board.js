class Board {

    constructor(canvas, context, game, gameOverCallback, lineCallback, screenWidth, screenHeight) {
        this.width = 1 + 10 + 1;
        this.height = 20 + 1;
        this.game = game;
        this.gameOverCallback = gameOverCallback;
        this.lineCallback = lineCallback;
        this.cells = [];

        this.canvas = canvas;
        this.context = context;
        this.resize(screenWidth, screenHeight);

        this.currentPiece = null;
        this.currentPieceRotation;
        this.currentPieceX;
        this.currentPieceY;
        this.nextPiece = Piece.getRandom();
    }

    resize(screenWidth, screenHeight) {
        this.canvas.width  = screenWidth;
        this.canvas.height = screenHeight;
        let horizontalCellSize = Math.floor(this.canvas.width / this.width);
        let verticalCellSize = Math.floor(this.canvas.height / this.height);
        this.cellSize = Math.min(horizontalCellSize, verticalCellSize);
        this.offsetX = Math.floor((this.canvas.width - (this.width * this.cellSize)) / 2);
        this.offsetY = Math.floor((this.canvas.height - (this.height * this.cellSize)) / 2);
    }

    reset() {
        this.cells = [];
        this.cells.length = this.height;
        for (let y = 0; y < this.height; y++) {
            this.cells[y] = [];
            this.cells[y].length = this.width;
            for (let x = 0; x < this.width; x++) {
                if ((y == this.height - 1) || (x == 0) || (x == this.width - 1)) {
                    this.cells[y][x] = CellType.WALL;
                } else {
                    this.cells[y][x] = CellType.EMPTY;
                }
            }
        }
        this.currentPiece = null;
        this.game.reset();
    }
   
    addNewPieceIfNeeded() {
        var added = false;
        if (this.currentPiece == null) {
            var newPiece = Piece.getRandom();
            var newPieceRotation = 0;
            var newPieceX = Math.floor((this.width - newPiece[newPieceRotation].length) / 2);
            var newPieceY = 0;
            if (this.doesItFit(newPiece[newPieceRotation], newPieceX, newPieceY)) {
                this.currentPiece = this.nextPiece;
                this.currentPieceRotation = newPieceRotation;
                this.currentPieceX = newPieceX;
                this.currentPieceY = newPieceY;
                this.nextPiece = newPiece;
                added = true;
            } else {
                this.game.gameOver();
                this.gameOverCallback();
            }
        }
        return added;
    }

    moveCurrentPieceLeft() {
        if (this.currentPiece != null) {
            if (this.doesItFit(this.currentPiece[this.currentPieceRotation],
                               this.currentPieceX - 1, this.currentPieceY)) {
                this.currentPieceX--;
            }
        }
    }
    
    moveCurrentPieceRight() {
        if (this.currentPiece != null) {
            if (this.doesItFit(this.currentPiece[this.currentPieceRotation],
                               this.currentPieceX + 1, this.currentPieceY)) {
                this.currentPieceX++;
            }
        }
    }
    
    moveCurrentPieceDown() {
        if (this.currentPiece !== null) {
            if (this.doesItFit(this.currentPiece[this.currentPieceRotation],
                               this.currentPieceX, this.currentPieceY + 1)) {
                this.currentPieceY++;
            } else {
                this.putPiece(this.currentPiece[this.currentPieceRotation],
                              this.currentPieceX, this.currentPieceY);
                this.currentPiece = null;
                this.checkLines();
            }
        }
    }
    
    rotateCurrentPiece() {
        if (this.currentPiece !== null) {
            var newRotation = (this.currentPieceRotation + 1) % this.currentPiece.length;
            if (this.doesItFit(this.currentPiece[newRotation], this.currentPieceX, this.currentPieceY + 1)) {
                this.currentPieceRotation = newRotation;
            }
        }
    }
    
    moveLinesDown(y) {
        for (var j = y - 1; j > 0; j--) {
            for (var i = 0; i < this.width; i++) {
                if (this.cells[j + 1][i] != CellType.WALL) {
                    this.cells[j + 1][i] = this.cells[j][i];
                }
            }
        }
    }
    
    cleanLines() {
        for (var j = 0; j < this.height; j++) {
            if (this.checkLine(j)) {
                this.moveLinesDown(j);
            }
        }
    }
    
    doesItFit(piece, x, y) {
        var itFits = true;
        if (piece === null) {
            itFits = false;
        }
        else {
            for (var j = 0; itFits && j < piece.length; j++) {
                for (var i = 0; itFits && i < piece[j].length; i++) {
                    const pieceCell = piece[j][i];
                    if (pieceCell !== CellType.EMPTY) {
                        if (x + i < 0 || x + i >= this.width || y + j < 0 || y + j >= this.height) {
                            itFits = false;
                        } else {
                            itFits = (this.cells[y + j][x + i] == CellType.EMPTY);
                        }
                    }
                }
            }
        }
        return itFits;
    }

    putPiece(piece, x, y) {
        if (this.doesItFit(piece, x, y)) {
            for (var j = 0; j < piece.length; j++) {
                for (var i = 0; i < piece[j].length; i++) {
                    const pieceCell = piece[j][i];
                    if (pieceCell !== CellType.EMPTY) {
                        this.cells[y + j][x + i] = pieceCell;
                    }
                }
            }
            this.game.increasePiece();
        }
    }

    checkLine(j) {
        var fullLine = true;
        var allWalls = true;
        for (var i = 0; fullLine && i < this.width; i++) {
            if (this.cells[j][i] == CellType.EMPTY) {
                fullLine = false;
            }
            if (this.cells[j][i] != CellType.WALL) {
                allWalls = false;
            }
        }
        return fullLine && !allWalls;
    }
    
    checkLines() {
        var lines = 0;
        for (var j = 0; j < this.height; j++) {
            if (this.checkLine(j)) {
                for (var i = 0; i < this.width; i++) {
                    if (this.cells[j][i] != CellType.WALL) {
                        this.cells[j][i] = CellType.CLEAR;
                    }
                }
                lines++;
            }
        }
        if (lines > 0) {
            this.lineCallback(lines);
        }
        return lines;
    }

    drawBackground() {
        this.context.fillStyle = CellColor[CellType.EMPTY];
        this.context.fillRect(0, 0, this.canvas.width, this.canvas.height);
    }    

    drawAbsoluteCell(posX, posY, cell) {
        this.context.fillStyle = CellColor[cell];
        this.context.fillRect(posX, posY, this.cellSize - 1, this.cellSize - 1);
    }

    drawRelativeCell(x, y) {
        let posX = this.offsetX + (this.cellSize * x);
        let posY = this.offsetY + (this.cellSize * y);
        var cell = this.cells[y][x];
        this.drawAbsoluteCell(posX, posY, cell);
    }

    drawPieceRelative(piece, rotation, x, y) {
        var posX = this.offsetX + (x * this.cellSize);
        var posY = this.offsetY + (y * this.cellSize);
        this.drawPieceAbsolute(piece, rotation, posX, posY);
    }

    drawPieceAbsolute(piece, rotation, x, y) {
        if (piece != null) {
            for (var j = 0; j < piece[rotation].length; j++) {
                for (var i = 0; i < piece[rotation][j].length; i++) {
                    const pieceCell = piece[rotation][j][i];
                    if (pieceCell !== CellType.EMPTY) {
                        let posX = x + (this.cellSize * i);
                        let posY = y + (this.cellSize * j);
                        this.drawAbsoluteCell(posX, posY, pieceCell);
                    }
                }
            }
        }
    }
        
    drawNextPiece(gamePosX, gamePosY) {
        if (this.nextPiece != null) {
            gamePosY += 10;
            this.drawPieceAbsolute(this.nextPiece, 0, gamePosX, gamePosY);
            gamePosY += this.cellSize * this.nextPiece[0].length;
        }
        return gamePosY;
    }

    draw() {
        this.drawBackground();
        for (let y = 0; y < this.height; y++) {
            for (let x = 0; x < this.width; x++) {
                this.drawRelativeCell(x, y);
            }
        }
        this.drawPieceRelative(this.currentPiece, this.currentPieceRotation,
                               this.currentPieceX, this.currentPieceY);
        var gamePosX = 20 + this.offsetX + this.cellSize * this.width;
        var gamePosY = 10;
        gamePosY = this.game.drawTop(this.context, this.cellSize, gamePosX, gamePosY);
        gamePosY = this.drawNextPiece(gamePosX, gamePosY);
        gamePosY = this.game.drawBottom(this.context, this.cellSize, gamePosX, gamePosY);
    }
    
}
