var GameSquare = function(col, row, val) {
	this.col = col;
	this.row = row;
	this.val = val;
    this.hasMerged = false;
    this.div = document.getElementById(
        "box{0}{1}".format(this.row, this.col));
    this.par = document.getElementById(
        "boxp{0}{1}".format(this.row, this.col));
};

GameSquare.prototype.isEmpty = function GS_empty() {
    return this.val === undefined || this.val === null;
}

GameSquare.prototype.clear = function GS_clear() {
    this.update(null);
    this.hasMerged = false;
}

GameSquare.prototype.update = function GS_update(value) {
    this.val = value;
    this.par.innerHTML = (this.val === null) ? '' : this.val;
    this.div.style.backgroundColor = getColor(value);
};

GameSquare.prototype.merge = function GS_merge(nextCell) {
    if (nextCell.isEmpty()) {
        nextCell.update(this.val);
        this.clear();
        return nextCell;
    } else if (nextCell.val == this.val) {
        nextCell.update(this.val*2);
        nextCell.hasMerged = true;
        this.clear();
        return nextCell;
    }
    return this;
}

GameSquare.prototype.isEdge = function GS_edge(direction) {
    switch (direction) {
        case 'right':
            return this.col == 3;
        case 'left':
            return this.col == 0;
        case 'up':
            return this.row == 0;
        case 'down':
            return this.row == 3;
    }
}
