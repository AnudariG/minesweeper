import React from "react";
import {useEffect} from "react";
import {Box, Typography, Button} from "@mui/material";

import sizes from "../utils/sizes";

const minesAndTimerBoxStyle = {
  border: "1px solid lightblue",
  borderRadius: '5px',
  padding: '0.7rem'
}

const timerTextStyle = {
  fontFamily: "Kode Mono, monospace",
  textTransform: 'lowercase',
  color: 'black',
  fontSize: "12px",
}

const GameStats = ({ state, dispatch }) => {
  const { gameOver, numOfMines, timer, isTimerRunning } = state;
  let timerStr = timer.toString();
  timerStr = timerStr.padStart(3, '0');

  const handleHistoryClick = () => {
    let isWon = false;
    if(state.history[0].numOfMines === 0){
      isWon = true;
    }
    alert(`Time passed: ${state.history[0].timer}
    Board size: ${sizes[state.difficulty].num_rows} x ${sizes[state.difficulty].num_columns}
    Number of mines left:  ${state.history[0].numOfMines} 
    ${isWon ? 'You won!' : 'You lost.'}`);
  }

  useEffect(() => {
    if (isTimerRunning && !gameOver) {
      const intervalId = setInterval(() => {
        dispatch({
          type: 'INCREMENT_TIMER'
        });
      }, 1000);

      return () => clearInterval(intervalId);
    }
    if(gameOver){
      dispatch({
        type: 'GAME_OVER'
      });
    }
  }, [isTimerRunning, gameOver]);

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
      <Button sx={minesAndTimerBoxStyle} onClick={handleHistoryClick}>
        <Typography sx={timerTextStyle} >
          History
        </Typography>
      </Button>
    </Box>
  )
}
export default GameStats;