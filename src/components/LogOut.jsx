import React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
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

export default function LogOut(props) {
  return (
    <ThemeProvider theme={theme}>
      <Card sx={{ borderRadius: 3, backgroundColor: "#F2F7F8", minWidth: 600 }}>
        <CardContent>
          <h2 style={{ marginTop: 0 }}>Möchten Sie sich wirklich ausloggen?</h2>
        </CardContent>
        <CardActions
          sx={{
            alignSelf: "stretch",
            display: "flex",
            justifyContent: "center",
            alignItems: "flex-start",
          }}
        >
          <Button variant="outlined" onClick={props.goBack} color="askumaRed">
            Zurück
          </Button>
          <Button variant="contained" onClick={props.logOut} color="askumaRed">
            Bestätigen
          </Button>
        </CardActions>
      </Card>
    </ThemeProvider>
  );
}
