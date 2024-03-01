const ACTIONS = {
  START_GAME: 'START_GAME',
  REVEAL_CELL: 'REVEAL_CELL',
  SET_FLAG: 'SET_FLAG',
  REVEAL_ALL_CELLS: 'REVEAL_ALL_CELLS',
  REVEAL_ALL_MINES: 'REVEAL_ALL_MINES',
  PLACE_FLAG: 'PLACE_FLAG'
};

const start_game_action = (game_board) => {
  return {
    type: ACTIONS.START_GAME,
    payload: game_board
  };
};

const reveal_cell_action = (cell_coordinates) => {
  return {
    type: ACTIONS.REVEAL_CELL,
    payload: cell_coordinates
  };
};

const flag_cell_action = (cell_coordinates) => {
  return {
    type: ACTIONS.FLAG_CELL,
    payload: cell_coordinates
  };
};

const place_flag_action = ({row_idx, col_idx}) => {
  return {
    type: ACTIONS.FLAG_CELL,
    payload: {row_idx, col_idx}
  };
};

export {
  start_game_action,
  reveal_cell_action,
  flag_cell_action,
  ACTIONS
}