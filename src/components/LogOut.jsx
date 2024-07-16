import React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import BackButton from "./BackButton";

export default function LogOut(props) {
  return (
    <Card sx={{ backgroundColor: "#F2F7F8" }}>
      <CardContent>
        <h2>Möchten Sie sich wirklich ausloggen?</h2>
        <BackButton
          style={{ backgroundColor: "#FFFFFF" }}
          goBack={props.goBack}
        />
        <button
          onClick={props.logOut}
          style={{
            backgroundColor: "#7F0037",
            color: "white",
            marginLeft: "1em",
          }}
        >
          Bestätigen
        </button>
      </CardContent>
    </Card>
  );
}
