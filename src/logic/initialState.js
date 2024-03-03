import sizes from "../utils/sizes";
import {place_mines} from "./logic";

// To populate the board with numbers
const count_neighbor_mines = (board, row, col) => {
  const numRows = board.length;
  const numCols = board[0].length;
  let count = 0;
  for (let i = Math.max(0, row - 1); i <= Math.min(row + 1, numRows - 1); i++) {
    for (let j = Math.max(0, col - 1); j <= Math.min(col + 1, numCols - 1); j++) {
      if (board[i][j].isMine) {
        count++;
      }
    }
  }
  return count;
};

export const create_initial_state = (difficulty) => {
  let board = [];
  if(difficulty){
    board = new Array(sizes[difficulty].num_rows).fill().map(() => {
      return new Array(sizes[difficulty].num_columns).fill({
        // cell states
        backgroundColor: 'silver',
        isMine: false,
        isFlagged: false,
        isVisible: false,
        isRevealed: false,
        numOfNeighborMines: 0,
        isNumber: false,
        content: ""
      });
    });
  }

  // Place mines in random spots
  const new_board = place_mines(board, difficulty);

  // Calculate the number of neighboring mines for each cell
  const num_rows = new_board.length;
  const num_cols = new_board[0].length;
  for (let i = 0; i < num_rows; i++) {
    for (let j = 0; j < num_cols; j++) {
      if (!new_board[i][j].isMine) {
        new_board[i][j].numOfNeighborMines = count_neighbor_mines(new_board, i, j);
        if (new_board[i][j].numOfNeighborMines > 0) {
          new_board[i][j].isNumber = true;
        }
      }
    }
  }

  // global game state
  return {
    board: new_board,
    clickedMine: 'false',
    difficulty: difficulty,
    revealMines: false,
    revealAllCells: false,
    activeFlag: false,
    numOfMines: sizes[difficulty].num_mines,
    timer: 0,
    timerStarted: false,
  }
}