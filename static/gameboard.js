var GameBoard = function() {
    this.board = [];
    for (var i = 0; i < 4; i++) {
        var row = [];
        for (var j = 0; j < 4; j++) {
            row[j] = new GameSquare(j, i, null);
        }
        this.board[i] = row;
    }
    this.score = 0;
    this.scoreBox = document.getElementById('score');
    this.start();
};

GameBoard.prototype.start = function GB_start() {
    this.addCell();
    this.addCell();
}

GameBoard.prototype.endTurn = function GB_endTurn() {
    for (var row = 0; row < 4; row++) {
        for (var col = 0; col < 4; col++) {
            this.getCell(row, col).hasMerged = false;
        }
    }
    this.updateScore();
}

GameBoard.prototype.endGame = function GB_end() {
    alert("Sorry, you're out of available moves",
        "Your final score was {0}!".format(this.score));
    this.reset();
}

GameBoard.prototype.reset = function GB_reset() {
    for (var row = 0; row < 4; row++) {
        for (var col = 0; col < 4; col++) {
            this.getCell(row, col).clear();
        }
    }
    this.score = 0;
    this.updateScore();
    this.start();
}

GameBoard.prototype.updateScore = function GB_upScore() {
    this.scoreBox.innerHTML = this.score;
}

GameBoard.prototype.getCell = function GB_get(row, col) {
    return this.board[row][col];
}

GameBoard.prototype.addCell = function GB_add() {
    if (!this.canAdd()) {
        this.endGame();
        return;
    } else {
        var square = this.getRandomCell();
        while (!square.isEmpty()) {
            square = this.getRandomCell();
        }
        square.update(pickStartValue());
    }
}

GameBoard.prototype.canAdd = function GB_check() {
    for (var row = 0; row < 4; row ++) {
        for (var col = 0; col < 4; col ++) {
            if (this.getCell(row, col).isEmpty())
                return true;
        }
    }
    return false;
}

GameBoard.prototype.getRandomCell = function GB_rand() {
    var squareNum, col, row;
    squareNum = pickRandomNumber(16);
    col = squareNum % 4;
    row = Math.floor(squareNum / 4);
    return this.getCell(row, col);
}

GameBoard.prototype.canMove = function GB_checkMove(direction) {
    switch (direction) {
        case 'right':
            for (var row = 0; row < 4; row++) {
                for (var col = 2; col > -1; col--) {
                    var currentCell = this.getCell(row, col);
                    var nextCell = this.getCell(row, col + 1);
                    if (!currentCell.isEmpty() && nextCell.isEmpty()) {
                        return true;
                    } else if (!currentCell.isEmpty() && 
                               currentCell.val == nextCell.val) {
                        return true;
                    }
                }
            }
        case 'left':
            for (var row = 0; row < 4; row++) {
                for (var col = 1; col < 4; col++) {
                    var currentCell = this.getCell(row, col);
                    var nextCell = this.getCell(row, col - 1);
                    if (!currentCell.isEmpty() && nextCell.isEmpty()) {
                        return true;
                    } else if (!currentCell.isEmpty() && 
                               currentCell.val == nextCell.val) {
                        return true;
                    }
                }
            }
        case 'up':
            for (var row = 1; row < 4; row++) {
                for (var col = 0; col < 4; col++) {
                    var currentCell = this.getCell(row, col);
                    var nextCell = this.getCell(row - 1, col);
                    if (!currentCell.isEmpty() && nextCell.isEmpty()) {
                        return true;
                    } else if (!currentCell.isEmpty() && 
                               currentCell.val == nextCell.val) {
                        return true;
                    }
                }
            }
        case 'down':
            for (var row = 2; row > -1; row--) {
                for (var col = 0; col < 4; col++) {
                    var currentCell = this.getCell(row, col);
                    var nextCell = this.getCell(row + 1, col);
                    if (!currentCell.isEmpty() && nextCell.isEmpty()) {
                        return true;
                    } else if (!currentCell.isEmpty() && 
                               currentCell.val == nextCell.val) {
                        return true;
                    }
                }
            }

        default:
            console.log(direction);
    }
    return false;
}

GameBoard.prototype.getAdjacentCell = function GB_getAdj(direction, cell) {
    switch (direction) {
        case 'right':
            return this.getCell(cell.row, cell.col + 1);
        case 'left':
            return this.getCell(cell.row, cell.col - 1);
        case 'up':
            return this.getCell(cell.row - 1, cell.col);
        case 'down':
            return this.getCell(cell.row + 1, cell.col);
        default:
            throw "Invalid direction";
    }
}

GameBoard.prototype.canMerge = function GB_canMerge(direction, cell) {
    if (!cell.hasMerged && !cell.isEdge(direction)) {
        var nextCell = this.getAdjacentCell(direction, cell);
        return nextCell.isEmpty() || nextCell.val == cell.val;
    }
    return false;
}

GameBoard.prototype.moveOver = function GB_moveOne(direction, cell) {
    while (this.canMerge(direction, cell)) {
        var nextCell = this.getAdjacentCell(direction, cell);
        cell = cell.merge(nextCell);
    }
}

GameBoard.prototype._move = function GB__move(direction, row, col) {
    var currentCell = this.getCell(row, col);
    if (!currentCell.isEmpty()) {
        this.moveOver(direction, currentCell);
    }
}

GameBoard.prototype.move = function GB_moveAll(direction) {
    if (this.canMove(direction)) {
        switch (direction) {
            case 'right':
                for (var row = 0; row < 4; row++) {
                    for (var col = 2; col > -1; col--) {
                        this._move(direction, row, col);
                    }
                }
                break;
            case 'left':
                for (var row = 0; row < 4; row++) {
                    for (var col = 1; col < 4; col++) {
                        this._move(direction, row, col);
                    }
                }
                break;
            case 'down':
                for (var col = 0; col < 4; col++) {
                    for (var row = 2; row > -1; row--) {
                        this._move(direction, row, col);
                    }
                }
                break;
            case 'up':
                for (var col = 0; col < 4; col++) {
                    for (var row = 1; row < 4; row++) {
                        this._move(direction, row, col);
                    }
                }
                break;

            default:
                console.log(direction);
        }
        this.addCell();
        this.endTurn();
    }
}
