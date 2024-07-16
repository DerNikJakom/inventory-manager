import React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import BackButton from "./BackButton";

export default function DeviceInformation(props) {
  return (
    <>
      <Card>
        <CardContent>
          <h1>Geräteinformation</h1>
          <BackButton goBack={props.goBack} />
        </CardContent>
      </Card>
    </>
  );
}
