import React, {Fragment, useEffect, useReducer} from 'react';
import {Box, Grid, Typography} from '@mui/material'

import Controls from './BoardControls'

import sizes from '../utils/sizes';
import { create_initial_state } from '../logic/initialState';
import { reducers } from '../logic/reducers'


// flag
const flagIcon = "\u{1F6A9}"

const minesAndTimerBoxStyle = {
  border: "1px solid lightblue",
  borderRadius: '5px',
  padding: '0.7rem'
}

const timerTextStyle = {
  fontFamily: "Kode Mono, monospace",
  textTransform: 'lowercase',
  color: 'black',
  fontSize: "15px",
}

const MinesAndTimer = ({ numOfMines, timer }) => {
  let timerStr = timer.toString();
  timerStr = timerStr.padStart(3, '0');
  return(
    <Box sx={{display: "flex", justifyContent: "space-evenly", gap: "2rem", padding: '1rem'}} >
      <Box sx={minesAndTimerBoxStyle} >
        <Typography sx={timerTextStyle} >
          Mines: {numOfMines}
        </Typography>
      </Box>
      <Box sx={minesAndTimerBoxStyle}>
        <Typography sx={timerTextStyle} >
          Timer: {timerStr}
        </Typography>
      </Box>
    </Box>
  )
}

const Cell = ({cell_obj, handleCellClick}) => {
  // let backgroundColor = cell_obj.isMine ? 'red' : 'grey';
  let cell_copy = {...cell_obj};
  // cell_copy.content = cell_obj.isFlagged ? flagIcon : cell_obj.content;

  return(
    <Box onClick={handleCellClick} sx={{
      width: sizes.cell_width,
      height: sizes.cell_height,
      border: 1,
      borderColor: 'white',
      backgroundColor: cell_obj.backgroundColor,
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center'
    }}>
      {
        (cell_copy.isRevealed || cell_copy.isVisible) && cell_copy.numOfNeighborMines > 0
          ? cell_copy.numOfNeighborMines // Display the number of neighbor mines if it's greater than 0
          : (cell_copy.isRevealed || cell_copy.isVisible) && cell_copy.isMine
            ? cell_copy.content // Display the mine content if the cell is a mine
            : (cell_copy.isFlagged ? flagIcon : null) // Display the flag icon if the cell is flagged
      }
    </Box>
  )
};

const Row = ({row, difficulty, handleCellClick}) => {
  return(
    <Fragment>
      <Grid container columns={sizes[difficulty].num_columns}>
        {
          row.map((cell_obj, col_idx) => {
            return <Grid item key={col_idx} xs={1}> 
              <Cell cell_obj={cell_obj} handleCellClick={() => handleCellClick(col_idx)}/>
            </Grid>
          })
        }
      </Grid>
    </Fragment>
  )
};

function Board({difficulty}) {
  const [state, dispatch] = useReducer(reducers, difficulty, create_initial_state);
  const {board, activeFlag, gameOver, numOfMines, timer} = state;

  // USER CELL CONTROL
  const handleCellClick = (row_idx, col_idx) => {
    const clicked_cell = board[row_idx][col_idx];

    console.log(`activeFlag: ${activeFlag}`)
    console.log(`cell isFlagged: ${clicked_cell.isFlagged}`)

    if(activeFlag) {
      dispatch({
        type: "PLACE_FLAG",
        payload: {row_idx, col_idx}
      })
      return; // no futher action
    }

    if(clicked_cell.isFlagged){
      dispatch({
        type: "REMOVE_FLAG",
        payload: {row_idx, col_idx}
      })
      return; // no futher action
    }

    if(!gameOver) {
      dispatch({
        type: "REVEAL_CELL",
        payload: {row_idx, col_idx}
      });
    }
  }

  useEffect(() => {
    dispatch({type: 'INIT_BOARD', payload: difficulty})
  }, []);

  const gap = 10;
  const board_width = () => sizes[difficulty].num_columns * sizes.cell_width + (sizes[difficulty].num_columns - 1) + gap;
  const board_height = () => sizes[difficulty].num_rows * sizes.cell_height + (sizes[difficulty].num_rows - 1) + gap;

  return (
    <Fragment>
      <Box sx={{
          width: board_width() + 100,
          height: board_height() + 100,
          mt: 6,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexDirection: "column"
      }}>
        <MinesAndTimer numOfMines={numOfMines} timer={timer}/>
        <Grid container columns={1}
          sx={{width: board_width(),
              height: board_height()}}>
          {
            board.map((row, row_idx) => {
              return <Grid item key={row_idx} xs={1}>
                <Row row={row} difficulty={difficulty} 
                  handleCellClick={(col_idx) => handleCellClick(row_idx, col_idx)} />
              </Grid>
            })
          }
        </Grid>
        <Controls dispatch={dispatch}/>
      </Box>
    </Fragment>
  )
}

export default Board;