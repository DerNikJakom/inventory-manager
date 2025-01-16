import React, { useState, useEffect } from "react";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import BackButton from "./BackButton";

const columns = [
  { id: "name", label: "Name", minWidth: 170 },
  { id: "hersteller", label: "Hersteller", minWidth: 170, align: "right" },
  { id: "modell", label: "Modell", minWidth: 170, align: "right" },
  { id: "seriennummer", label: "Seriennummer", minWidth: 170, align: "right" },
  {
    id: "produktnummer",
    label: "Produktnummer",
    minWidth: 170,
    align: "right",
  },
  { id: "code", label: "Code", minWidth: 170, align: "right" },
];

export default function InventoryTable(props) {
  const [rows, setRows] = useState([]);

  const getUserDevices = async (userID) => {
    try {
      const response = await fetch(
        process.env.API_URL + `/geraete/user/${userID}`
      );
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();
      setRows(data);
    } catch (error) {
      console.error("Error fetching user devices:", error);
    }
  };

  useEffect(() => {
    getUserDevices(props.userID);
  }, [props.userID]);

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
                {rows.map((row) => (
                  <TableRow hover role="checkbox" tabIndex={-1} key={row.code}>
                    {columns.map((column) => {
                      const value = row[column.id];
                      return (
                        <TableCell key={column.id} align={column.align}>
                          {value}
                        </TableCell>
                      );
                    })}
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Paper>
        <CardActions>
          <BackButton goBack={props.goBack} value="Zurück" />
        </CardActions>
      </CardContent>
    </Card>
  );
}
