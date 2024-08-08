import React, { useState } from "react";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import BackButton from "./BackButton";
import CardActions from "@mui/material/CardActions";
import { red } from "@mui/material/colors";

const columns = [
  { id: "name", label: "Name", minWidth: 170 },
  {
    id: "hersteller",
    label: "Hersteller",
    minWidth: 170,
    align: "right",
  },
  {
    id: "modell",
    label: "Modell",
    minWidth: 170,
    align: "right",
  },
  {
    id: "seriennummer",
    label: "Seriennummer",
    minWidth: 170,
    align: "right",
  },
  {
    id: "produktnummer",
    label: "Produktnummer",
    minWidth: 170,
    align: "right",
  },
  {
    id: "code",
    label: "Hex-Code",
    minWidth: 170,
    align: "right",
  },
];

function createData(email, deviceBrand, deviceModel, deviceSerial) {
  return { email, deviceBrand, deviceModel, deviceSerial };
}

export default function InventoryTable(props) {
  const [rows, setRows] = useState([]);
  const [counter, setCounter] = useState(0);

  const getUserDevices = async (userID) => {
    await fetch(process.env.API_URL + `/geraete/user/${userID}`)
      .then((response) => response.json())
      .then((data) => {
        setRows(data);
        console.log(data);
      });
  };
  // ! unnbedingt anders lösen, funktion woanders aufrufen
  if (counter === 0) {
    getUserDevices(1); // ! userID hier noch nicht dynamisch
    setCounter(1);
  }

  return (
    <Card sx={{ borderRadius: 3, backgroundColor: "#F2F7F8" }}>
      <CardContent>
        <h1>Inventar</h1>
        <Paper sx={{ width: "100%", overflow: "hidden" }}>
          <TableContainer sx={{ maxHeight: 440 }}>
            <Table stickyHeader aria-label="sticky table">
              <TableHead>
                <TableRow>
                  {columns.map((column) => (
                    <TableCell
                      key={column.id}
                      align={column.align}
                      style={{
                        minWidth: column.minWidth,
                        color: "#FFFFFF",
                        backgroundColor: "#7F0037",
                        fontWeight: "bold",
                      }}
                    >
                      {column.label}
                    </TableCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                {rows.map((row) => {
                  return (
                    <TableRow
                      hover
                      role="checkbox"
                      tabIndex={-1}
                      // TODO: key in 'TableRow' ersetzen durch primary ID aus Datenbank
                      key={row.code}
                    >
                      {columns.map((column) => {
                        const value = row[column.id];
                        return (
                          <TableCell key={column.id} align={column.align}>
                            {column.format && typeof value === "number"
                              ? column.format(value)
                              : value}
                          </TableCell>
                        );
                      })}
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </TableContainer>
        </Paper>
      </CardContent>
      <CardActions
        sx={{
          alignSelf: "stretch",
          display: "flex",
          justifyContent: "center",
          alignItems: "flex-start",
        }}
      >
        <BackButton goBack={props.goBack} value="Zurück" />
      </CardActions>
    </Card>
  );
}
