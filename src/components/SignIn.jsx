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
    password: "",
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setInput((prevValue) => {
      return {
        ...prevValue,
        [name]: value,
      };
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    // const data = new FormData(event.currentTarget);

    // setInput({
    //   email: data.get("email"),
    //   password: data.get("password"),
    // });

    const userIndex = props.users.findIndex((i) => i.email === input.email);
    const user = props.users[userIndex];
    if (userIndex >= 0) {
      if (user.email === input.email && user.password === input.password) {
        console.log("User bereits registriert", props.users);
        props.login(true);
      }
    } else {
      props.addUser(input);
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
              name="password"
              label="Passwort"
              type="password"
              id="password"
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
