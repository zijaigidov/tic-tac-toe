/*
This file contains the DisplayController module which handles the interaction
between the game logic and the webpage display.
*/

const DisplayController = (function () {
  const game = GameController();
  let hasEnded = false;

  const boardElement = document.getElementById('gameboard');
  boardElement.addEventListener('click', (e) => handleBoardClick(e));

  function handleBoardClick(e) {
    if (hasEnded) {
      clearBoard();
      hasEnded = false;
      return;
    }

    const square = e.target;
    if (square.textContent) return;

    playTurn(square);
    if (game.getGameState() === game.WIN || game.getGameState() === game.TIE)
      hasEnded = true;
  }

  function playTurn(square) {
    // Update the board visually
    square.textContent = game.getCurrentPlayer().mark;

    // Update it behind the scenes
    const row = square.parentElement.getAttribute('data-row');
    const column = square.getAttribute('data-column');
    game.playTurn(row, column);
  }

  function clearBoard() {
    const rows = boardElement.querySelectorAll('.board-row');
    rows.forEach((row) => {
      const squares = row.querySelectorAll('.board-square');
      squares.forEach((square) => {
        square.textContent = '';
      });
    });
  }
})();
