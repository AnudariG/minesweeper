import React, { Fragment, useState } from 'react';
import {Box} from '@mui/material'

import TopBanner from "./pages/TopBanner";
import Board from './pages/Board';
import OpeningPage from "./pages/OpeningPage";


function App() {
  const [difficulty, setDifficulty] = useState('');
  const resetCallback = () => {
    setDifficulty('');
  }

  const setGameDifficulty = (difficulty) => {
    setDifficulty(difficulty);
  }
  console.log("difficulty: ", difficulty);

  return (
    <Fragment>
      <TopBanner resetCallback={resetCallback}/>
      <Box sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center"
      }}>
      {difficulty ?
        (<Board difficulty={difficulty} />) :
        (<OpeningPage setGameDifficulty={setGameDifficulty}/>)
      }
      </Box>
    </Fragment>
  );
}

export default App;
