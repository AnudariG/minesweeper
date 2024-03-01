import sizes from "../utils/sizes";

export const initState = () => {
  return {
    difficulty: '',
    board: [],
    gameState: 'idle'
  }
}

export const start_game = (state) => {
  const {difficulty} = state;

  return {
    ...state,
    difficulty: difficulty,
    gameState: 'active',
  }
}

export const place_flag = (state, {row_idx, col_idx}) => {
  console.log("row and col: ", row_idx, col_idx);
  const {board, activeFlag} = state;
  if(activeFlag){
    const new_board = board.slice();
    new_board[row_idx][col_idx] = {
      ...board[row_idx][col_idx],
      isFlagged: true,
    }
    console.log("new board (reducers)", new_board);

    return {
      ...state,
      activeFlag: false,
      board: new_board
    }

  }else{
    return;
  }
}

// FUNCTION 1: generate random mines
const generateRandomMines = (board, difficulty) => {
  console.log(`diff: ${difficulty}`);
  const {num_columns, num_rows} = sizes[difficulty];
  const total_cells = num_columns * num_rows;
  const num_mines = sizes[difficulty].num_mines;

  // use set to so that positions don't overlap
  const mine_positions = new Set();

  while(mine_positions.size < num_mines){
    const rand_positions = Math.floor(Math.random() * total_cells);
    mine_positions.add(rand_positions);
  }

  console.log('just board: ', board)

  // convert to an array
  const mine_pos_array = Array.from(mine_positions);
  // const board = Array(num_rows).fill().map(() => {
  //   return Array(num_columns).fill({isMine: false});
  // });

  // place mines at random positions
  console.log(`mine_pos_array: ${mine_pos_array}`)
  mine_pos_array.map((pos) => {
    const row = Math.floor(pos / num_columns);
    const col = pos % num_columns;
    console.log(`row: ${row} col: ${col} board current:`, board[row][col]);
    board[row][col].isMine = true;
  });

  return board;
}

// FUNCTION 2: get ALL Numbered Cells

// ....


// FUNCTION N_i: reveal all Mines ( is to set all isMine = True with isRevealed = True

// FUNCTION N. : reveal all cells
