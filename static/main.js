var board = board || new GameBoard();
document.getElementById('reset').onclick = function() {board.reset();}
var gameWindow = document.getElementById("game");
gameWindow.onkeydown = function(e) {
    e = e || window.event;
    switch (e.keyCode) {
      case 37:
        board.move('left');
        break;
      case 38:
        board.move('up');
        break;
      case 39:
        board.move('right');
        break;
      case 40:
        board.move('down');
    }
};