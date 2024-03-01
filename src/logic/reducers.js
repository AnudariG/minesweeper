import sizes from "../utils/sizes"
import {initBoard} from "./logic";
import {ACTIONS} from "./actions";


const initState = {
  difficulty: '',
  board: [],
  gameState: 'idle'
};

const create_initial_state = (difficulty) => {
  let board = [];
  if(difficulty){
    board = new Array(sizes[difficulty].num_rows).fill().map(() => {
    return new Array(sizes[difficulty].num_columns).fill({
        backgroundColor: 'grey',
        isMine: false // Set all cells to not be mines initially
      });
    }); 
  }

  return {
    board,
    clickedMine: 'false',
    difficulty: difficulty,
    activeFlag: false
  }
}

const start_game = (state) => {
  const {difficulty} = state;

  return {
    ...state,
    difficulty: difficulty,
    gameState: 'active',
  }
}

const flag_cell = (state, {row_idx, col_idx}) => {
  console.log("row and col: ", row_idx, col_idx);
  const {board, activeFlag} = state;
  if(activeFlag){
    const new_board = board.slice();
    new_board[row_idx][col_idx] = {
      ...board[row_idx][col_idx],
      backgroundColor: 'pink',
      isFlagged: true
    }
    console.log("new board (reducers)", new_board);

    return {
      ...state,
      board: new_board
    }

  }else{
    return;
  }
}

// handle state updates based on actions
const reducers = (state, action) => {
  switch (action.type){
    case ACTIONS.START_GAME:
      return {
        ...state,
        difficulty: action.payload.difficulty,
        board: action.payload.board,
        gameState: 'playing'
      };
    case ACTIONS.REVEAL_CELL:
      return {...state, /* Update board state */};
    case ACTIONS.FLAG_CELL:
      return {
        ...state,
      };
    case ACTIONS.SET_FLAG:
      return {
        ...state,
        activeFlag: true,
      };

    case ACTIONS.PLACE_FLAG:
      return flag_cell(state, action.payload)

    case ACTIONS.INIT_BOARD:
      return {
        ...state,
        board: initBoard(action.payload)
      }
    default:
      return state;
  }
}

export {
  create_initial_state,
  start_game,
  reducers
}