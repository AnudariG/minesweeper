import sizes from "../utils/sizes";

export const create_initial_state = (difficulty) => {
  let board = [];
  if(difficulty){
    board = new Array(sizes[difficulty].num_rows).fill().map(() => {
      return new Array(sizes[difficulty].num_columns).fill({
        // cell states
        backgroundColor: 'grey',
        isMine: false,
        isFlagged: false,
        content: ""
      });
    });
  }

  // global game state
  return {
    board,
    clickedMine: 'false',
    difficulty: difficulty,
    activeFlag: false
  }
}