import React, { useState } from "react";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
// import FormControlLabel from "@mui/material/FormControlLabel";
// import Checkbox from "@mui/material/Checkbox";
// import Grid from "@mui/material/Grid";
import Link from "@mui/material/Link";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import ManageAccountsIcon from "@mui/icons-material/ManageAccounts";

function Copyright(props) {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {"Copyright © "}
      <Link color="inherit" href="https://www.askuma.ag/">
        ASKUMA AG
      </Link>{" "}
      {new Date().getFullYear()}
    </Typography>
  );
}

const defaultTheme = createTheme({
  palette: { primary: { main: "#7F0037" }, secondary: { main: "#F2F7F8" } },
});

export default function SignIn(props) {
  const [input, setInput] = useState({
    email: "",
    passwort: "",
  });

  const validateEmail = (email) => {
    let regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };

  const validatePassword = (pw) => {
    return (
      /[A-Z]/.test(pw) &&
      /[a-z]/.test(pw) &&
      /[0-9]/.test(pw) &&
      /[^A-Za-z0-9]/.test(pw) &&
      pw.length > 4
    );
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setInput((prevValue) => {
      return {
        ...prevValue,
        [name]: value,
      };
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const result = await fetch(process.env.API_URL)
      .then((response) => response.json())
      .then((data) => {
        return data;
      });

    const userIndex = result.findIndex((i) => i.email === input.email);
    const user = result[userIndex];

    // TODO --------------------------------------
    if (userIndex >= 0) {
      if (user.email === input.email) {
        if (user.passwort === input.passwort) {
          console.log("richtige Anmeldedaten");
          // props.login(true);
        } else {
          console.log("falsches Passwort");
        }
      }
    } else if (validateEmail(input.email) && validatePassword(input.passwort)) {
      // prettier-ignore
      await fetch(process.env.API_URL + "/mitarbeiter", {
        method: "POST",
        headers: {
          "Accept": "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          vorname: "",
          nachname: "",
          email: input.email,
          passwort: input.passwort,
        }),
      })
        .then((response) => response.text())
        .then((data) => console.log(data));
      // props.login(true);
      console.log("User added");
    } else {
      console.log("Email or Password Validation went wrong");
    }
  };

  return (
    <ThemeProvider theme={defaultTheme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <ManageAccountsIcon fontSize="large" color="primary" />
          <Typography component="h1" variant="h5">
            Device Manager
          </Typography>
          <Box
            component="form"
            onSubmit={handleSubmit}
            noValidate
            sx={{ mt: 1 }}
          >
            <TextField
              margin="normal"
              value={input.email}
              onChange={handleChange}
              required
              fullWidth
              id="email"
              label="E-Mail"
              name="email"
              autoComplete="email"
              autoFocus
            />

            <TextField
              margin="normal"
              value={input.password}
              onChange={handleChange}
              required
              fullWidth
              name="passwort"
              label="Passwort"
              type="password"
              id="passwort"
              autoComplete="current-password"
            />

            {/* <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
            /> */}
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Anmelden
            </Button>
            {/* <Grid container>
              <Grid item xs>
                <Link href="#" variant="body2">
                  Forgot password?
                </Link>
              </Grid>
              <Grid item>
                <Link href="#" variant="body2">
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
            </Grid> */}
          </Box>
        </Box>
        <Copyright sx={{ mt: 8, mb: 4 }} />
      </Container>
    </ThemeProvider>
  );
}
