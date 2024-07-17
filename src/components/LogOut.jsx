import React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { Box } from "@mui/material";

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

export default function LogOut(props) {
  return (
    <ThemeProvider theme={theme}>
      <Card sx={{ borderRadius: 3, backgroundColor: "#F2F7F8", minWidth: 600 }}>
        <CardContent>
          <h2 style={{ marginTop: 0 }}>Möchten Sie sich wirklich ausloggen?</h2>
          <Box display="flex" justifyContent="center">
            <Button variant="outlined" onClick={props.goBack} color="askumaRed">
              Zurück
            </Button>
            <div style={{ width: 10 }}></div>
            <Button
              variant="contained"
              onClick={props.logOut}
              color="askumaRed"
            >
              Bestätigen
            </Button>
          </Box>
        </CardContent>
      </Card>
    </ThemeProvider>
  );
}
