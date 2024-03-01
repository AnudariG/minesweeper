import React from "react";
import {Box, Button, Typography} from "@mui/material";
import FlagIcon from "@mui/icons-material/Flag";

import mineImg from '../data/mine.png'

const controlsBoxStyle = {
  mt: "1rem",
  display: "flex",
  gap: "2rem",
  borderColor: 'grey'
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

  return (
    <Box sx={controlsBoxStyle}>
      <Button variant="outlined" onClick={handleFlagClick}>
        <FlagIcon sx={{color: 'black'}} />
      </Button>
      <Button variant="outlined">
        <Typography sx={buttonTextStyle}>
          Show all <img src={mineImg} alt="Mine" style={{width: '25px', height: '25px'}}/>
        </Typography>
      </Button>
      <Button variant="outlined">
        <Typography sx={buttonTextStyle}>
          Show all cells
        </Typography>
      </Button>
    </Box>
  )
}

export default BoardControls;