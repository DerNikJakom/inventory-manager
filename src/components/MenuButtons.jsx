import React from "react";
import Button from "@mui/material/Button";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { Stack } from "@mui/material";

const { palette } = createTheme();
const { augmentColor } = palette;
const createColor = (mainColor) => augmentColor({ color: { main: mainColor } });
const theme = createTheme({
  palette: {
    aliceBlue: createColor("#F2F7F8"),
    askumaRed: createColor("#7F0037"),
    white: createColor("#FFFFFF"),
  },
});

export default function MenuButtons(props) {
  const handleClick = (event) => {
    console.log(event.target.id, "pressed");
    const button = event.target.id;
    props.userInput(button);
  };

  return (
    <ThemeProvider theme={theme}>
      <Stack direction="column" gap={1}>
        <Button
          id="deviceInfoBtn"
          color="white"
          onClick={handleClick}
          variant="contained"
        >
          Geräteinformation einsehen
        </Button>
        <Button
          id="inventoryBtn"
          color="white"
          onClick={handleClick}
          variant="contained"
        >
          Inventar verwalten
        </Button>
        <Button
          id="logOutBtn"
          color="askumaRed"
          onClick={handleClick}
          variant="contained"
        >
          Ausloggen
        </Button>
      </Stack>
    </ThemeProvider>
  );
}
