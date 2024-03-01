import {place_flag} from "./logic";

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
      return {...state, /* Update board state */};
    case 'SET_FLAG_TRUE':
      return {
        ...state,
        activeFlag: true,
      };
    case 'PLACE_FLAG':
      return place_flag(state, action.payload);

    case 'REMOVE_FLAG':
      const { row_idx, col_idx } = action.payload;
      const updatedBoard = state.board.map((row, i) =>
        i === row_idx
          ? row.map((cell, j) =>
            j === col_idx ? { ...cell, isFlagged: false } : cell
          )
          : row
      );
      return {
        ...state,
        board: updatedBoard
      };

    default:
      return state;
  }
}
