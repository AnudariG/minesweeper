import React, {Fragment, useEffect, useReducer, useState} from 'react';
import {Box, Grid, Button, Typography} from '@mui/material'

import Controls from './BoardControls'
import OpeningPage from './OpeningPage'
import {initBoard} from "../logic/logic";

import sizes from '../utils/sizes';
import { create_initial_state, reducers, start_game } from '../logic/reducers';

const minesAndTimerBoxStyle = {
  border: "1px solid lightblue",
  borderRadius: '5px',
  padding: '1rem'
}
const MinesAndTimer = ({difficulty}) => {
  return(
    <Box sx={{display: "flex", justifyContent: "space-evenly", gap: "2rem", padding: '1rem'}}>
      <Box sx={minesAndTimerBoxStyle}>
        <Typography>Mines: {sizes[difficulty].num_mines}</Typography>
      </Box>
      <Box sx={minesAndTimerBoxStyle}>
        <Typography>Timer: 000</Typography>
      </Box>
    </Box>
  )
}

const Cell = ({cell_content, handleCellClick}) => {
  let backgroundColor = cell_content.isMine ? 'red' : 'grey';

  return(
    <Box onClick={handleCellClick} sx={{
      width: sizes.cell_width,
      height: sizes.cell_height,
      border: 1,
      borderColor: 'white',
      backgroundColor: backgroundColor,
    }}>

    </Box>
  )
};

const Row = ({row, difficulty, handleCellClick}) => {
  return(
    <Fragment>
      <Grid container columns={sizes[difficulty].num_columns}>
        {
          row.map((cell_content, col_idx) => {
            return <Grid item key={col_idx} xs={1}> 
              <Cell cell_content={cell_content} handleCellClick={() => handleCellClick(col_idx)}/>
            </Grid>
          })
        }
      </Grid>
    </Fragment>
  )
};

function Board({difficulty}) {
  const [state, dispatch] = useReducer(reducers, difficulty, create_initial_state);
  const {board, activeFlag} = state;

  // USER CELL CONTROL
  const handleCellClick = (row_idx, col_idx) => {
    if(activeFlag) {
      dispatch({
        type: "PLACE_FLAG",
        payload: {row_idx, col_idx}
      })
      return;
    }
    console.log(`row_idx, col_idx: ${row_idx}, ${col_idx}`);
    console.log(`activeFlag: ${activeFlag}`)
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
          mt: 10,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexDirection: "column"
      }}>
        <MinesAndTimer difficulty={difficulty}/>
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