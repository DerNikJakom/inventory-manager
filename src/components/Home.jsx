import React, { useState, useEffect } from "react";
import InventoryTable from "./InventoryTable";
import MenuButtons from "./MenuButtons";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import DeviceInformation from "./DeviceInformation";
import Confirm from "./Confirm";

export default function Home(props) {
  const [request, setRequest] = useState("");
  const [name, setName] = useState("");

  const getMitarbeiter = async () => {
    try {
      const response = await fetch(process.env.API_URL + "/mitarbeiter");
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();
      const userJSON = data.find((i) => i.id === props.userID);
      console.log("userJSON:", userJSON);
      if (userJSON) {
        console.log("userJSON.vorname:", userJSON.vorname);
        setName(userJSON.vorname);
      } else {
        console.error("User not found");
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    getMitarbeiter();
  }, [props.userID]);

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
              Hallo {name}!
            </h1>
            <h2>Was möchtest Du tun?</h2>

            <CardActions sx={{ justifyContent: "center" }}>
              <MenuButtons userInput={setRequest} />
            </CardActions>
          </CardContent>
        </Card>
      );
  }
}
