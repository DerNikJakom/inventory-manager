import React from "react";
import Button from "@mui/material/Button";
import { createTheme, ThemeProvider } from "@mui/material/styles";

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

export default function BackButton(props) {
  return (
    <ThemeProvider theme={theme}>
      <Button
        color="askumaRed"
        variant="contained"
        onClick={() => props.goBack("")}
      >
        {props.value}
      </Button>
    </ThemeProvider>
  );
}
