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
    difficulty: difficulty
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
      return {...state, /* Update board state */};
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