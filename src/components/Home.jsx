import React, { useState } from "react";
import InventoryTable from "./InventoryTable";
import MenuButtons from "./MenuButtons";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import DeviceInformation from "./DeviceInformation";
import Confirm from "./Confirm";

export default function Home(props) {
  const [request, setRequest] = useState("");

  switch (request) {
    case "deviceInfoBtn":
      return <DeviceInformation goBack={setRequest} userID={props.userID} />;

    case "inventoryBtn":
      return <InventoryTable goBack={setRequest} userID={props.userID} />;

    case "logOutBtn":
      return (
        <Confirm goBack={setRequest} logOut={props.logOut} type="logOut" />
      );

    default:
      return (
        <Card
          sx={{ borderRadius: 3, backgroundColor: "#F2F7F8", minWidth: 600 }}
        >
          <CardContent>
            <h1 style={{ marginTop: 10, marginLeft: 60, marginRight: 60 }}>
              ASKUMA Manager
            </h1>
            <h2>Was möchten Sie tun?</h2>

            <CardActions sx={{ justifyContent: "center" }}>
              <MenuButtons userInput={setRequest} />
            </CardActions>
          </CardContent>
        </Card>
      );
  }
}
