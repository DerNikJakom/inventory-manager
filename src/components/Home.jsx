import React, { useState } from "react";
import InventoryTable from "./InventoryTable";
import MenuButtons from "./MenuButtons";
import BackButton from "./BackButton";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";

export default function Home(props) {
  const [request, setRequest] = useState("");

  switch (request) {
    case "deviceInfoBtn":
      console.log("Case: Device");
      return (
        <>
          <h1>Geräteinformation</h1>
          <BackButton goBack={setRequest} />
        </>
      );

    case "inventoryBtn":
      console.log("Case: Inventory");
      return (
        <>
          <InventoryTable />
          <br />
          <BackButton goBack={setRequest} />
        </>
      );

    case "logOutBtn":
      console.log("Case: Logout");
      return (
        <>
          <h2>Möchten Sie sich wirklich ausloggen?</h2>
          <BackButton goBack={setRequest} />
          <button
            onClick={props.logOut}
            style={{
              backgroundColor: "#F2F7F8",
              color: "black",
              marginLeft: "1em",
            }}
          >
            Bestätigen
          </button>
        </>
      );

    default:
      console.log(`Case: Default`);
      // TODO: Card Design wie in Figma
      return (
        <Card>
          <CardContent>
            <h1>ASKUMA Manager</h1>
            <h2>Was möchtest du tun?</h2>
            <CardActions>
              <MenuButtons userInput={setRequest} />
            </CardActions>
          </CardContent>
        </Card>
      );
  }
}
