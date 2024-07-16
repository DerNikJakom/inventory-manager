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
    askumaRed: createColor("#5DBA40"),
    steelBlue: createColor("#5C76B7"),
    red: createColor("#FF2000"),
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
          color="aliceBlue"
          onClick={handleClick}
          variant="contained"
        >
          Geräteinformation einsehen
        </Button>
        <Button
          id="inventoryBtn"
          color="aliceBlue"
          onClick={handleClick}
          variant="contained"
        >
          Inventar verwalten
        </Button>
        <Button
          id="logOutBtn"
          color="red"
          onClick={handleClick}
          variant="contained"
        >
          Ausloggen
        </Button>
      </Stack>
    </ThemeProvider>
  );
}
