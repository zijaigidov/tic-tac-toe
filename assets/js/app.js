// This module contains the logic for the game board
const Gameboard = (function () {
  const board = [];
  const BOARD_SIZE = 3;

  // Create the 2D array for the board
  for (let row = 0; row < BOARD_SIZE; row++) {
    board[row] = [];
    for (let col = 0; col < BOARD_SIZE; col++) {
      board[row].push(Square());
    }
  }

  const markSquare = (row, column, mark) => {
    const square = board[row][column];
    if (!square.getValue()) square.setValue(mark);
  };

  const getBoard = () => board;

  /* 
  This method will only be used in the console version and will be removed
  when the web version is implemented.
  */
  const printBoard = () => {
    const boardWithValues = board.map((row) =>
      row.map((square) => square.getValue()),
    );
    console.log(boardWithValues);
  };

  const resetBoard = () => {
    for (let row = 0; row < BOARD_SIZE; row++) {
      for (let col = 0; col < BOARD_SIZE; col++) {
        board[row][col].setValue('');
      }
    }
  };

  function Square() {
    let value = '';

    const setValue = (newValue) => {
      value = newValue;
    };
    const getValue = () => value;
    return { setValue, getValue };
  }

  return { markSquare, getBoard, printBoard, resetBoard };
})();
