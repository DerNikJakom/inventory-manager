import React, { useState } from "react";
import { styled } from "@mui/material/styles";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Collapse from "@mui/material/Collapse";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Button from "@mui/material/Button";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import BackButton from "./BackButton";

// export default function DeviceInformation(props) {
//   return (
//     <>
//       <Card sx={{ borderRadius: 3, backgroundColor: "#F2F7F8" }}>
//         <CardContent>
//           <h1>Geräteinformation</h1>
//           <BackButton goBack={props.goBack} value="Zurück" />
//         </CardContent>
//       </Card>
//     </>
//   );
// }

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
  const [codeGiven, setCodeGiven] = useState(true);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  if (codeGiven) {
    return (
      <ThemeProvider theme={theme}>
        <Card sx={{ borderRadius: 3, backgroundColor: "#F2F7F8", width: 600 }}>
          <CardHeader
            title="Lenovo Thinkpad E15"
            subheader="genutzt von: Jan Komnik"
          />
          <CardContent>
            {/* <Typography variant="body2" color="text.secondary">
          This impressive paella is a perfect party dish
        </Typography> */}
          </CardContent>
          <CardActions disableSpacing>
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
            {/* <BackButton value="Zurück" goBack={props.goBack} /> */}
            <IconButton aria-label="add to favorites">
              <FavoriteIcon />
            </IconButton>
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
              <Typography paragraph>Method:</Typography>
              <Typography paragraph>Heat 1/2 cup of the br</Typography>
            </CardContent>
          </Collapse>
        </Card>
      </ThemeProvider>
    );
  }
}
