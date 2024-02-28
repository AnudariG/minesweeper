import AppBar from "@mui/material/AppBar";
import {Typography, Box, Button} from "@mui/material";

const typStyle = {
  display: "flex",
  justifyContent: "center",
  fontFamily: "Anta, sans-serif",
  fontWeight: "400",
  fontStyle: "normal"
}

const appBarStyle = {
  display: "flex",
  backgroundColor: "lightblue",
  height: 66,
  justifyContent: "center"
}

const buttonStyle = {
  width: "20px",
  ml: "auto"
}
const buttonTypStyle = {
  fontFamily: "Anta, sans-serif",
  textTransform: "lowercase"
}

const buttonContainerStyle = {
  display: "flex",
  justifyContent: "flex-end",
  marginTop: 2, // Adjust as needed
  marginRight: 2 // Adjust as needed
}

export default function TopBanner({ resetCallback }) {
  return (
    <Box>
      <AppBar position="static" sx={appBarStyle} >
        <Typography variant="h4" sx={typStyle} >
          minesweeper
        </Typography>
      </AppBar>
      <Box sx={buttonContainerStyle}>
        <Button variant="contained" sx={buttonStyle} onClick={resetCallback}>
          <Typography sx={buttonTypStyle}>
            Reset
          </Typography>
        </Button>
      </Box>
    </Box>
  );
}
