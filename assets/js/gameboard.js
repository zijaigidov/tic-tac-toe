/*
This file contains the Gameboard module that contains the logic for the game
board. 
*/

const Gameboard = (function () {
  const board = [];
  const BOARD_SIZE = 3;

  // Create the 2D array for the board
  for (let row = 0; row < BOARD_SIZE; row++) {
    board[row] = [];
    for (let col = 0; col < BOARD_SIZE; col++) {
      board[row].push(createSquare());
    }
  }

  function createSquare() {
    let value = '';

    const setValue = (newValue) => {
      value = newValue;
    };
    const getValue = () => value;

    return { setValue, getValue };
  }

  function markSquare(row, column, mark) {
    board[row][column].setValue(mark);
  }

  // Returns a copy of the board with values instead of objects
  function getBoard() {
    return board.map((row) => row.map((square) => square.getValue()));
  }

  function resetBoard() {
    for (let row = 0; row < BOARD_SIZE; row++) {
      for (let col = 0; col < BOARD_SIZE; col++) {
        board[row][col].setValue('');
      }
    }
  }

  return { markSquare, getBoard, resetBoard };
})();
