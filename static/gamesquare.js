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

GameSquare.prototype.update = function(value) {
    this.val = value;
    this.par.innerHTML = this.val;
    // this.hasMerged = true;
    this.div.style.backgroundColor = getColor(value);
};

GameSquare.prototype.clear = function() {
    this.val = null;
    this.par.innerHTML = '';
    this.hasMerged = false;
    this.div.style.backgroundColor = getColor(this.val);
};

GameSquare.prototype.increase = function() {
    this.update(this.val * 2);
};

GameSquare.prototype.isEmpty = function() {
    return this.val === null || this.val === undefined;
};

GameSquare.prototype.atEdge = function(direction) {
    switch (direction) {
        case 'up':
            return this.row == 0;
        case 'down':
            return this.row == 3;
        case 'left':
            return this.col == 0;
        case 'right':
            return this.col == 3;
        default:
            throw "Invalid direction";
    }
}

GameSquare.prototype.merge = function(other) {
    if (other.isEmpty()) {
        other.update(this.val);
    } else {
        other.increase();
    }
    this.clear();
}