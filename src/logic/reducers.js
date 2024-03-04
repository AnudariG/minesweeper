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
    case 'REMOVE_FLAG':
      return remove_flag(state, action.payload);

    case 'TOGGLE_MINES_REVEAL':
      return reveal_all_mines(state);
    case 'TOGGLE_ALL_CELLS_REVEAL':
      return reveal_all_cells(state);

    case 'START_TIMER':
      return { ...state, isTimerRunning: true };
    case 'GAME_OVER':
      let history
      if(state.history.length <= 10){
        history = [...state.history, { timer: state.timer, numOfMines: state.numOfMines }]
      } else {
        history = [ state.history.slice(-9), { timer: state.timer, numOfMines: state.numOfMines }]
      }
      console.log(history)
      return { ...state, isTimerRunning: false,
          history: history };
    case 'INCREMENT_TIMER':
      return { ...state, timer: state.timer + 1 };
    case 'RESET_GAME':
      return { ...state, revealMines: false, timer: 0, isTimerRunning: false}

    default:
      return state;
  }
}
