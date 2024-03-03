import {place_flag, remove_flag, reveal_all_mines,
        reveal_all_cells, reveal_cell, start_timer} from "./logic";

// handle state updates based on actions
export const reducers = (state, action) => {
  switch (action.type){
    case 'START_GAME':
      return {
        ...state,
        difficulty: action.payload.difficulty,
        board: action.payload.board,
        gameState: 'playing'
      };

    case 'REVEAL_CELL':
      return reveal_cell(state, action.payload);

    case 'SET_FLAG_TRUE':
      return { ...state, activeFlag: true };

    case 'PLACE_FLAG':
      return place_flag(state, action.payload);

    case 'TOGGLE_MINES_REVEAL':
      return reveal_all_mines(state);

    case 'TOGGLE_ALL_CELLS_REVEAL':
      return reveal_all_cells(state);

    case 'REMOVE_FLAG':
      return remove_flag(state, action.payload);

    case 'START_TIMER':
      return start_timer(state);

    default:
      return state;
  }
}
