import React, {Fragment} from 'react';
import {Button, Box, Typography} from '@mui/material'

const buttonStyle = {
  mt: "3rem",
  display: "flex",
  gap: "2rem"
}

const buttonTextStyle = {
  fontFamily: "Kode Mono, monospace",
  textTransform: 'lowercase'
}

const typStyle = {
  fontFamily: "Anta, sans-serif",
  mt: "2rem"
}
const OpeningPage = ({setGameDifficulty}) => {

  return (
    <Fragment>
      <Box sx={{display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column'}}>
      <Typography variant='h5' sx={typStyle}>
        ready to play?
      </Typography>
      <Box sx={buttonStyle}>
        <Button variant='contained' color='primary' onClick={() => setGameDifficulty('beginner')}>
          <Typography sx={buttonTextStyle}>
            Beginner
          </Typography>
        </Button>
        <Button variant='contained' color='primary' onClick={() => setGameDifficulty('intermediate')}>
          <Typography sx={buttonTextStyle}>
            Intermediate
          </Typography>
        </Button>
      </Box>
      </Box>
    </Fragment>
  )
};

export default OpeningPage;