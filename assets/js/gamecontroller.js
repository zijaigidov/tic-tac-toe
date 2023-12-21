/*
This file contains the GameController module that contains the logic for
controlling the flow of the game.
*/

function GameController(player1Name = 'Player 1', player2Name = 'Player 2') {
  const board = Gameboard;
  const boardSize = board.getBoard().length;

  // Constants for the game states
  const ONGOING = 0;
  const WIN = 1;
  const TIE = 2;

  const player1 = createPlayer(player1Name, 'X');
  const player2 = createPlayer(player2Name, 'O');
  let currentPlayer = player1;

  function createPlayer(name, mark) {
    return { name, mark };
  }

  function switchPlayerTurn() {
    currentPlayer = currentPlayer === player1 ? player2 : player1;
  }

  function playTurn(row, column) {
    board.markSquare(row, column, currentPlayer.mark);

    const result = getResult();
    if (!result) {
      switchPlayerTurn();
    } else {
      board.resetBoard();
    }
  }

  /*
  Returns the result of the game:
  - 0 if the game is still ongoing
  - 1 if the game has ended in a win
  - 2 if the game has ended in a tie
  */
  function getResult() {
    let result;

    if (hasWonHorizontal() || hasWonVertical() || hasWonDiagonal())
      result = WIN;
    else if (hasDrawn()) result = TIE;
    else result = ONGOING;

    return result;
  }

  function hasWonHorizontal() {
    let hasWon = false;

    for (let row = 0; row < boardSize && !hasWon; row++) {
      const marksByFrequencies = { X: 0, O: 0 };
      const maxFrequency = boardSize;

      for (let col = 0; col < boardSize; col++) {
        const mark = board.getBoard()[row][col];
        if (mark) marksByFrequencies[mark]++;
      }
      // If one of the marks has the maximum frequency, that player has won
      if (Object.values(marksByFrequencies).includes(maxFrequency))
        hasWon = true;
    }

    return hasWon;
  }

  function hasWonVertical() {
    let hasWon = false;

    for (let col = 0; col < boardSize && !hasWon; col++) {
      const marksByFrequencies = { X: 0, O: 0 };
      const maxFrequency = boardSize;

      for (let row = 0; row < boardSize; row++) {
        const mark = board.getBoard()[row][col];
        if (mark) marksByFrequencies[mark]++;
      }
      if (Object.values(marksByFrequencies).includes(maxFrequency))
        hasWon = true;
    }

    return hasWon;
  }

  function hasWonDiagonal() {
    let hasWon = false;
    const marksByFrequencies = { X: 0, O: 0 };
    const maxFrequency = boardSize;

    // Diagonal 1: Top left to bottom right
    for (let dim = 0; dim < boardSize; dim++) {
      const mark = board.getBoard()[dim][dim];
      if (mark) marksByFrequencies[mark]++;
    }
    if (Object.values(marksByFrequencies).includes(maxFrequency)) hasWon = true;

    // Reset the tally
    marksByFrequencies.X = 0;
    marksByFrequencies.O = 0;

    // Diagonal 2: Bottom left to top right
    for (let dim = boardSize - 1; dim >= 0 && !hasWon; dim--) {
      const mark = board.getBoard()[dim][dim];
      if (mark) marksByFrequencies[mark]++;
    }
    if (Object.values(marksByFrequencies).includes(maxFrequency)) hasWon = true;

    return hasWon;
  }

  function hasDrawn() {
    let totalMarks = 0;
    for (let row = 0; row < boardSize; row++) {
      for (let col = 0; col < boardSize; col++) {
        const mark = board.getBoard()[row][col];
        if (mark) totalMarks++;
      }
    }
    // If the board is full and no player has won, the game has ended in a draw
    return totalMarks === boardSize * boardSize;
  }

  return {
    getBoard: board.getBoard(),
    getCurrentPlayer: currentPlayer,
    playTurn,
  };
}
