var GameBoard = function() {
    this.board = [];
    for (i = 0; i < 4; i++) {
        var row = [];
        for (j = 0; j < 4; j++) {
            row[j] = new GameSquare(j, i, null);
        }
        this.board[i] = row;
    }
    this.score = 0;
    this.scoreBox = document.getElementById('score');
    this.start();
};

GameBoard.prototype.updateScore = function() {
    this.scoreBox.innerHTML = this.score;
}

GameBoard.prototype.updateBoard = function() {
    for (row = 0; row < 4; row++)
        for (col = 0; col < 4; col++)
            this.getCell(row, col).hasMerged = false;
    this.updateScore();
}

GameBoard.prototype.reset = function() {
    for (row = 0; row < 4; row++)
        for (col = 0; col < 4; col++) 
            this.getCell(row, col).clear();
    this.score = 0;
    this.updateScore();
    this.start();
}

GameBoard.prototype.start = function() {
    this.addCell();
    this.addCell();
};

GameBoard.prototype.endGame = function() {
    alert(
        "Sorry, no more available moves.",
        "Your final score was {0}".format(this.score));
};

GameBoard.prototype.getCell = function(row, col) {
    return this.board[row][col];
};

GameBoard.prototype.addCell = function() {
    var cellNum, col, row, square;
    var anyEmpty = false;
    for (i = 0; i < 4; i++)
        for (j = 0; j < 4; j++)
            if (this.getCell(i, j).isEmpty()) {
                anyEmpty = true;
                break;
            }
    if (!anyEmpty) {
        this.endGame();
        return;
    }

    while (true) {
        cellNum = pickRandomNumber(16);
        row = Math.floor(cellNum / 4);
        col = cellNum % 4;
        square = this.board[row][col];
        if (square.isEmpty()) {
            square.update(pickStartValue());
            break;
        }
    }
};

GameBoard.prototype.canCombine = function(first, second) {
    return (!second.hasMerged && 
            (first.val == second.val || second.val === null));
};

GameBoard.prototype.combineCells = function(first, second) {
    if (second.isEmpty()) {
        second.update(first.val);
        first.clear();
    } else {
        second.increase();
        second.hasMerged = true;
        this.score += second.val;
        first.clear();
    }

    return second;
};

GameBoard.prototype.getAdjacentCell = function(direction, i, j) {
    switch (direction) {
        case 'up':
            return this.getCell(i - 1, j);
        case 'down':
            return this.getCell(i + 1, j);
        case 'right':
            return this.getCell(i, j + 1);
        case 'left':
            return this.getCell(i, j - 1);
        default:
            throw "Invalid direction";
    }
}

GameBoard.prototype.canMove = function(cell, direction) {
    var nextCell = this.getAdjacentCell(direction, cell.row, cell.col);
    return !cell.atEdge(direction) && this.canCombine(cell, nextCell);
}

GameBoard.prototype._move = function(cell, direction) {
    var nextCell = this.getAdjacentCell(direction, cell.row, cell.col);
    return this.combineCells(cell, nextCell);
}

GameBoard.prototype.performMove = function(direction, row, col) {
    var currentCell = this.getCell(row, col);
    var flag = false;
    while (this.canMove(currentCell, direction)) {
        currentCell = this._move(currentCell, direction);
        flag = true;
    }
    return flag;
}

GameBoard.prototype.move = function(direction) {
    var flag = false;

    switch (direction) {
        case 'right':
            for (row = 0; row < 4; row++) {
                for (col = 2; col > -1; col--) {
                    flag = this.performMove(direction, row, col);
                }
            }
            break;  
        case 'left':
            for (row = 0; row < 4; row++) {
                for (col = 1; col < 4; col ++) {
                    flag = this.performMove(direction, row, col);
                }
            }
            break;  
        case 'up':
            for (row = 1; row < 4; row++) {
                for (col = 0; col < 4; col++) {
                    flag = this.performMove(direction, row, col);
                }
            }
            break;  
        case 'down':
            for (row = 2; row > -1; row--) {
                for (col = 0; col < 4; col++) {
                    flag = this.performMove(direction, row, col);
                }
            }
            break;  
        default:
            throw "Invalid direction";
    }

    if (flag)
        this.addCell();
    this.updateBoard();
};
