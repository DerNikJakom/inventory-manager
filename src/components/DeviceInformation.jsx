import React, { useState, useEffect } from "react";
import { styled } from "@mui/material/styles";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Collapse from "@mui/material/Collapse";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Button from "@mui/material/Button";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";

const ExpandMore = styled((props) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? "rotate(0deg)" : "rotate(180deg)",
  marginLeft: "auto",
  transition: theme.transitions.create("transform", {
    duration: theme.transitions.duration.shortest,
  }),
}));

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

export default function DeviceInformation(props) {
  const [expanded, setExpanded] = useState(false);
  const [codeGiven, setCodeGiven] = useState(false);
  const [isAssigned, setAssigned] = useState(false);
  const [input, setInput] = useState("");
  const [device, setDevice] = useState({
    id: 0,
    mitarbeiter_id: 0,
    name: "",
    hersteller: "",
    modell: "",
    produktnummer: "",
    seriennummer: "",
    code: "",
  });

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  const handleClick = (event) => {
    const clickedBtn = event.target.id;
    clickedBtn == "assignBtn" ? setAssigned(true) : setAssigned(false);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (isHexCode(input)) {
      const result = await getResponse(`/geraete/${input.toUpperCase()}`); //TODO: siehe 'getResponse'
      if (result.length == 1) {
        //TODO Change
        setCodeGiven(true);
      }
    } else {
      console.error("Not a valid Hex-Code");
    }
  };

  const getResponse = async (path) => {
    let result; // TODO: Redundant durch setState 'device'
    await fetch(process.env.API_URL + path)
      .then((response) => {
        return response.json();
      })
      .then((json) => {
        result = json; // TODO: siehe oben
        setDevice(json[0]);
      });

    return result; // TODO: siehe oben
  };

  const handleChange = (event) => {
    setInput(event.target.value);
  };

  const isHexCode = (code) => {
    const regex = /^[0-9A-F]{6}$/i;
    return regex.test(code);
  };

  if (codeGiven) {
    return (
      <ThemeProvider theme={theme}>
        <Card sx={{ borderRadius: 3, backgroundColor: "#F2F7F8", width: 600 }}>
          <CardHeader
            title={`${device.hersteller} ${device.modell}`}
            subheader="genutzt von: Jan Komnik" //TODO: Dynamik
          />
          <CardContent>
            {/* <Typography variant="body2" color="text.secondary">
          This impressive paella is a perfect party dish
        </Typography> */}
          </CardContent>
          <CardActions disableSpacing>
            {isAssigned ? (
              <>
                <Button
                  variant="contained"
                  color="askumaRed"
                  onClick={() => {
                    props.goBack("");
                    setCodeGiven(false);
                  }}
                >
                  Zurück
                </Button>
                <div style={{ width: "0.5em" }}></div>
                <Button
                  id="removeBtn"
                  onClick={handleClick}
                  color="askumaRed"
                  variant="outlined"
                >
                  Entfernen
                </Button>
              </>
            ) : (
              <>
                <Button
                  variant="outlined"
                  color="askumaRed"
                  onClick={() => {
                    props.goBack("");
                    setCodeGiven(false);
                  }}
                >
                  Zurück
                </Button>
                <div style={{ width: "0.5em" }}></div>
                <Button
                  id="assignBtn"
                  onClick={handleClick}
                  variant="contained"
                  color="askumaRed"
                >
                  Buchen
                </Button>
              </>
            )}
            <ExpandMore
              expand={expanded}
              onClick={handleExpandClick}
              aria-expanded={expanded}
              aria-label="show more"
            >
              <ExpandMoreIcon />
            </ExpandMore>
          </CardActions>
          <Collapse in={expanded} timeout="auto" unmountOnExit>
            <CardContent>
              <Typography paragraph>
                Gerätebezeichnung: {device.name}
                <br />
                Produktnummer: {device.produktnummer}
                <br />
                Seriennummer: {device.seriennummer}
              </Typography>
            </CardContent>
          </Collapse>
        </Card>
      </ThemeProvider>
    );
  } else {
    return (
      <ThemeProvider theme={theme}>
        <Card sx={{ borderRadius: 3, backgroundColor: "#F2F7F8", width: 600 }}>
          <CardHeader
            title="Gerätecode eingeben"
            subheader="6-stelliger Hex-Code"
          />
          <CardContent onSubmit={handleSubmit}>
            <Box
              component="form"
              sx={{
                "& .MuiTextField-root": { m: 1, width: "25ch" },
              }}
              noValidate
              autoComplete="off"
            >
              <TextField
                error={!isHexCode(input) && input.length > 1 && true}
                helperText={
                  !isHexCode(input) &&
                  input.length > 1 &&
                  "Not a valid Hex-Code"
                }
                required
                autoFocus
                onChange={handleChange}
                value={input}
                color="askumaRed"
                id="hex-input"
                label="Hex-Code"
              />
            </Box>
          </CardContent>
          <CardActions
            sx={{
              alignSelf: "stretch",
              display: "flex",
              justifyContent: "center",
              alignItems: "flex-start",
            }}
          >
            <Button
              variant="outlined"
              color="askumaRed"
              onClick={() => {
                props.goBack("");
                setCodeGiven(false);
              }}
            >
              Zurück
            </Button>
            <Button
              id="submit-code"
              onClick={handleSubmit}
              variant="contained"
              color="askumaRed"
            >
              Bestätigen
            </Button>
          </CardActions>
        </Card>
      </ThemeProvider>
    );
  }
}
