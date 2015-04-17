var board = board || new GameBoard();

document.getElementById('reset').onclick = function GAME_reset() {
  board.reset();
}

var gameWindow = document.getElementById("game");

gameWindow.onkeydown = function(e) {
    console.log('keydown');
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
        break;
    }
};
