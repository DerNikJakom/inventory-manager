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
    mitarbeiterID: 0,
    vorname: "",
    nachname: "",
    name: "",
    hersteller: "",
    modell: "",
    produktnummer: "",
    seriennummer: "",
    code: "",
    geraetetyp: "",
    anschaffungsdatum: "",
    anschaffungskosten: "",
    standort: "",
    bemerkungen: "",
  });

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  const handleClick = async (event) => {
    const clickedBtn = event.target.id;
    await changeAssignedUser(clickedBtn);
    clickedBtn === "assignBtn" ? setAssigned(true) : setAssigned(false);
  };

  const changeAssignedUser = async (button) => {
    if (button === "assignBtn") {
      await fetch(
        process.env.API_URL + `/geraete/${device.code}/${props.userID}`,
        {
          method: "PUT",
        }
      );
      // .then((response) => response.text())
      // .then((data) => console.log(data));
      await getResponse(`/geraete/${device.code}`);
    } else {
      await fetch(process.env.API_URL + `/geraete/${device.code}/0`, {
        method: "PUT",
      });
      // .then((response) => response.text())
      // .then((data) => console.log(data));
      await getResponse(`/geraete/${device.code}`);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (isHexCode(input)) {
      try {
        const device = await getResponse(`/geraete/${input.toUpperCase()}`); // Hole das Gerät mit await
        if (device) {
          setCodeGiven(true); // Erfolgreiche Antwort bedeutet, der Code wurde gefunden
        }
      } catch (error) {
        console.error("Fehler beim Abrufen des Geräts:", error);
      }
    } else {
      console.error("Not a valid Hex-Code");
    }
  };

  const getResponse = async (path) => {
    try {
      const response = await fetch(process.env.API_URL + path);

      // Sicherstellen, dass die Antwort erfolgreich war
      if (!response.ok) {
        throw new Error("Netzwerkantwort war nicht okay");
      }

      const json = await response.json();

      // Prüfen, ob die Antwort ein Gerät enthält
      if (json.length > 0) {
        const device = json[0]; // Wir nehmen an, dass das erste Element das Gerät ist
        setDevice(device);

        // Setze den Status für die Zuweisung des Geräts
        setAssigned(device.vorname != null);

        return device; // Rückgabe des Geräts
      } else {
        throw new Error("Kein Gerät gefunden");
      }
    } catch (error) {
      console.error("Fehler beim Abrufen der Daten:", error);
      return null; // Wenn ein Fehler auftritt, return null
    }
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
        <Card
          sx={{ borderRadius: 3, backgroundColor: "#F2F7F8", minWidth: 400 }}
        >
          <CardHeader
            title={`${device.hersteller} ${device.modell}`}
            subheader={
              isAssigned
                ? `genutzt von: ${device.vorname} ${device.nachname}`
                : "nicht in Nutzung"
            }
          />
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
                {props.userID == device.mitarbeiter_id && (
                  <Button
                    id="removeBtn"
                    onClick={handleClick}
                    color="askumaRed"
                    variant="outlined"
                  >
                    Entfernen
                  </Button>
                )}
              </>
            ) : (
              // ELSE
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
              <Typography sx={{ textAlign: "left" }} variant="body3">
                <ul>
                  <li>
                    <b>Typ:</b> {device.geraetetyp}
                  </li>
                  <li>
                    <b>Standort:</b>{" "}
                    {device.standort == null
                      ? "nicht zugewiesen"
                      : device.standort}
                  </li>
                  <li>
                    <b>Bemerkungen:</b>{" "}
                    {device.bemerkungen == null
                      ? "keine Bemerkungen"
                      : device.bemerkungen}
                  </li>
                  <br />
                  <li>
                    <b>Gerätebezeichnung:</b> {device.name}
                  </li>
                  <li>
                    <b>Produktnummer:</b> {device.produktnummer}
                  </li>
                  <li>
                    <b>Seriennummer:</b> {device.seriennummer}
                  </li>
                  <li>
                    <b>Anschaffungsdatum:</b> {device.anschaffungsdatum}
                  </li>
                  <li>
                    <b>Preis:</b> {device.anschaffungskosten}€
                  </li>
                </ul>
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
            subheader="6-stelliger Inventarcode"
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
                error={!isHexCode(input) && input.length > 0}
                helperText={
                  !isHexCode(input) && input.length > 0 && "kein gültiger Code"
                }
                required
                autoFocus
                onChange={handleChange}
                value={input}
                color="askumaRed"
                id="hex-input"
                label="Inventarcode"
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
