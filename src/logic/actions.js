const ACTIONS = {
  START_GAME: 'START_GAME',
  REVEAL_CELL: 'REVEAL_CELL',
  FLAG_CELL: 'FLAG_CELL',
  REVEAL_ALL_CELLS: 'REVEAL_ALL_CELLS',
  REVEAL_ALL_MINES: 'REVEAL_ALL_MINES'
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

export {
  start_game_action,
  reveal_cell_action,
  flag_cell_action,
  ACTIONS
}