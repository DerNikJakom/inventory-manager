import React from "react";
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

const columns = [
  { id: "email", label: "E-Mail", minWidth: 170 },
  { id: "deviceBrand", label: "Marke", minWidth: 100 },
  {
    id: "deviceModel",
    label: "Modell",
    minWidth: 170,
    align: "right",
  },
  {
    id: "deviceSerial",
    label: "Seriennummer",
    minWidth: 170,
    align: "right",
  },
];

function createData(email, deviceBrand, deviceModel, deviceSerial) {
  return { email, deviceBrand, deviceModel, deviceSerial };
}

const rows = [
  createData("user1@example.com", "Lenovo", "ThinkPad", 3287263),
  createData("user2@example.com", "Lenovo", "Thinkpad", 1257896),
];

export default function InventoryTable(props) {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

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
                      style={{ minWidth: column.minWidth }}
                    >
                      {column.label}
                    </TableCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                {rows
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((row) => {
                    // TODO: id als unique key einfügen bei TableRow
                    return (
                      <TableRow
                        hover
                        role="checkbox"
                        tabIndex={-1}
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
