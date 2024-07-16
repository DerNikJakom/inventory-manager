import React, { useState } from "react";
import InventoryTable from "./InventoryTable";
import MenuButtons from "./MenuButtons";
import BackButton from "./BackButton";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import DeviceInformation from "./DeviceInformation";
import LogOut from "./LogOut";

export default function Home(props) {
  const [request, setRequest] = useState("");

  switch (request) {
    case "deviceInfoBtn":
      console.log("Case: Device");
      return <DeviceInformation goBack={setRequest} />;

    case "inventoryBtn":
      console.log("Case: Inventory");
      return <InventoryTable goBack={setRequest} />;

    case "logOutBtn":
      console.log("Case: Logout");
      return (
        <>
          <LogOut goBack={setRequest} logOut={props.logOut} />
        </>
      );

    default:
      console.log(`Case: Default`);
      // TODO: Card Design wie in Figma
      return (
        <Card sx={{ borderRadius: 3, backgroundColor: "#F2F7F8" }}>
          <CardContent>
            <h1 style={{ marginTop: 10, marginLeft: 60, marginRight: 60 }}>
              ASKUMA Manager
            </h1>
            <h2>Was möchtest du tun?</h2>

            <CardActions sx={{ justifyContent: "center" }}>
              <MenuButtons userInput={setRequest} />
            </CardActions>
          </CardContent>
        </Card>
      );
  }
}
