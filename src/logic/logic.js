import sizes from "../utils/sizes";

export const start_timer = (state, dispatch) => {
  let {timer, timerStarted} = state;
  if(!timerStarted){
    return {
      ...state,
      timerStarted: true,
      timerInterval: setInterval(() => {
        // Increment the timer by 1 (or based on your logic)
        dispatch({ type: 'INCREMENT_TIMER' });
      }, 1000) // Interval in milliseconds (e.g., 1000 ms = 1 second)
    };
  }
  return state;
}

const reveal_neighbors = (board, row_idx, col_idx) => {
  const num_rows = board.length;
  const num_cols = board[0].length;

  // Neighbor directions for each cell
  const directions = [
    [-1, -1], [-1, 0], [-1, 1],
    [0, -1],           [0, 1],
    [1, -1], [1, 0], [1, 1],
  ];

  // Iterate through the directions
  for (const [dx, dy] of directions) {
    const newRow = row_idx + dx;
    const newCol = col_idx + dy;
    // Check if the neighboring cell is within bounds
    if (newRow >= 0 && newRow < num_rows && newCol >= 0 && newCol < num_cols) {
      const neighborCell = board[newRow][newCol];
      // If the neighboring cell is empty and not revealed, recursively reveal it
      if (neighborCell.numOfNeighborMines === 0 && !neighborCell.isRevealed) {
        neighborCell.isRevealed = true;
        neighborCell.backgroundColor = 'gainsboro'
        reveal_neighbors(board, newRow, newCol);
      } else if (neighborCell.numOfNeighborMines > 0 && !neighborCell.isRevealed) {
        // If the neighboring cell has non-zero numOfNeighborMines, reveal it
        neighborCell.isRevealed = true;
        neighborCell.backgroundColor = 'gainsboro'
      }
    }
  }
}

// Reveal a single cell when user clicks
export const reveal_cell = (state, {row_idx, col_idx}) => {
  const {board} = state;
  let game_over = false;
  const newBoard = board.map((row, i) => {
    return row.map((cell, j) => {
      // check if it is the target cell
      if(row_idx === i && col_idx === j && !cell.isRevealed){
        if (cell.numOfNeighborMines === 0) {
          // recursively reveal neighboring cells if the cell is empty
          reveal_neighbors(board, i, j);
        }
        return { ...cell, isRevealed: true, backgroundColor: 'gainsboro' }
      } else if (board[row_idx][col_idx].isMine){
        game_over = true;
        return { ...cell, isRevealed: true, backgroundColor: '#FFCCCB' }
      } else {
        return cell;
      }
    });
  });

  return {
    ...state,
    board: newBoard,
    gameOver: game_over
  };
};

// Reveal all cells with numbers and mines
export const reveal_all_cells = (state) => {
  const { board, revealAllCells } = state;

  const newBoard = board.map(row => {
    return row.map(cell => {
      return { ...cell, isVisible: !revealAllCells };
    });
  });

  // Return the updated state with all cells revealed
  return {
    ...state,
    board: newBoard,
    revealAllCells: !revealAllCells,
  };
};

// Reveal all mines
export const reveal_all_mines = (state) => {
  const { board, revealMines } = state;

  const updatedBoard = board.map(row =>
    row.map(cell => {
      // If the cell is a mine and revealMines is true, set isVisible to true
      if (cell.isMine && !revealMines) {
        return { ...cell, isVisible: true };
      } else {
        return {...cell, isVisible: false};
      }
    })
  );

  return {
    ...state,
    board: updatedBoard,
    revealMines: !revealMines, // Toggle the revealMines state
  };
};

// Let a user place flag on cells when the activeFlag if true
export const place_flag = (state, {row_idx, col_idx}) => {
  const { board, activeFlag } = state;

  if(activeFlag){
    const new_board = board.map(row => [...row]);
    new_board[row_idx][col_idx] = {
      ...board[row_idx][col_idx],
      isFlagged: true,
    }

    return {
      ...state,
      activeFlag: false,
      board: new_board,
      numOfMines: state.numOfMines - 1
    }
  }else{ // otherwise do nothing
    return;
  }
}

export const remove_flag = (state, {row_idx, col_idx}) => {
  const updatedBoard = state.board.map((row, i) =>
    i === row_idx
      ? row.map((cell, j) =>
        j === col_idx ? { ...cell, isFlagged: false } : cell
      ) : row
  );
  return { ...state, board: updatedBoard };
}

// Unicode to place mines
const mine = "\u{1F4A3}"

export const place_mines = (board, difficulty) => {
  const {num_columns, num_rows, num_mines} = sizes[difficulty];
  const mine_positions = new Set();
  const total_cells = num_columns * num_rows;

  while(mine_positions.size < num_mines){
    const pos = Math.floor(Math.random() * total_cells);
    mine_positions.add(pos);
  }

  const new_board = board.map((row, row_idx) => {
    return row.map((cell, col_idx) => {
      const idx_copy = row_idx * num_columns + col_idx;
      const cell_copy = {...cell};

      if(mine_positions.has(idx_copy)){
        cell_copy.isMine = true;
        cell_copy.content = mine;
      }
      return cell_copy;
    })
  })

  return new_board;
}