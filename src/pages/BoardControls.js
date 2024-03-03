import React from "react";
import {Box, Button, Typography} from "@mui/material";
import FlagIcon from "@mui/icons-material/Flag";

import mineImg from '../data/mine.png'

const controlsBoxStyle = {
  mt: "1rem",
  display: "flex",
  gap: "2rem",
  borderColor: 'grey',
  mb: "5rem"
};

const buttonTextStyle = {
  fontFamily: "Kode Mono, monospace",
  textTransform: 'lowercase',
  color: 'black',
  fontSize: "12px",
}
const BoardControls = ({dispatch}) => {
  const handleFlagClick = () => {
    dispatch({
      type: 'SET_FLAG_TRUE'
    })
  }

  const handleRevealMinesClick = () => {
    dispatch({
      type: 'TOGGLE_MINES_REVEAL'
    })
  }

  const handleRevealAllCellsClick = () => {
    dispatch({
      type: 'TOGGLE_ALL_CELLS_REVEAL'
    })
  }

  return (
    <Box sx={controlsBoxStyle}>
      <Button variant="outlined" onClick={handleFlagClick} >
        <FlagIcon sx={{color: 'black'}} />
      </Button>
      <Button variant="outlined">
        <Typography sx={buttonTextStyle} onClick={handleRevealMinesClick} >
          Show all <img src={mineImg} alt="Mine" style={{width: '25px', height: '25px'}} />
        </Typography>
      </Button>
      <Button variant="outlined">
        <Typography sx={buttonTextStyle} onClick={handleRevealAllCellsClick}>
          Show all cells
        </Typography>
      </Button>
    </Box>
  )
}

export default BoardControls;