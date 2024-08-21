import React, { useState } from "react";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
// import FormControlLabel from "@mui/material/FormControlLabel";
// import Checkbox from "@mui/material/Checkbox";
import Grid from "@mui/material/Grid";
import Link from "@mui/material/Link";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import ManageAccountsIcon from "@mui/icons-material/ManageAccounts";
import SignUp from "./SignUp";

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
  const [isValid, setValid] = useState(true);
  const [rdyToRegister, setRdyToRegister] = useState(false);
  const [helperTextEmail, setHelperTextEmail] = useState("");
  const [helperTextPwd, setHelperTextPwd] = useState("");
  const [btnTxt, setBtnTxt] = useState("Weiter");

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

  const allNew = () => {
    props.setRegistered(false);
    setValid(true);
    setHelperTextEmail("");
    setHelperTextPwd("");
    setBtnTxt("Weiter");
  };

  const handleClick = () => {
    setHelperTextEmail("");
    setValid(true);
    setBtnTxt("Weiter");
    setRdyToRegister(false);
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    if (name === "email" && !validateEmail(value)) {
      allNew();
    } else if (name === "passwort" && value === "") {
      setHelperTextPwd("");
      setValid(true);
    }
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

    if (userIndex >= 0) {
      const user = result[userIndex];
      props.setUserID(user.id);

      if (props.isRegistered) {
        await fetch(process.env.API_URL + `/mitarbeiter/${user.id}`, {
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          method: "POST",
          body: JSON.stringify({ passwort: input.passwort }),
        })
          .then((response) => response.json())
          .then((data) => {
            if (data) {
              setValid(true);
              allNew();
              props.login(true);
            } else {
              setValid(false);
              setHelperTextPwd("Falsche Anmeldedaten");
              event.target["passwort"].select();
            }
          });
      } else {
        props.setRegistered(true);
        setBtnTxt("Anmelden");
      }
    } else if (validateEmail(input.email)) {
      console.log("User existiert nicht");
      console.log(btnTxt);
      if (btnTxt === "Registrieren") {
        console.log("Registrieren");
      } else {
        setRdyToRegister(true);
        setValid(false);
        setHelperTextEmail("Kein Account mit dieser E-Mail");
        setBtnTxt("Registrieren");
      }
      // }
      //   // create new Mitarbeiter
      //   // ? Registrierung einbauen?
      //   // prettier-ignore
      //   await fetch(process.env.API_URL + "/mitarbeiter", { //? path als env variable
      //     method: "POST",
      //     headers: {
      //       "Accept": "application/json",
      //       "Content-Type": "application/json",
      //     },
      //     body: JSON.stringify({
      //       vorname: "",
      //       nachname: "",
      //       email: input.email,
      //       passwort: input.passwort,
      //     }),
      //   })
      //     .then((response) => response.text())
      //     .then((data) => console.log(data));
      //   // props.login(true);
      //   console.log("User added");
    } else {
      setValid(false);
      setHelperTextEmail("ungültige E-Mail");
      event.target["email"].select();
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
              error={!isValid}
              helperText={helperTextEmail}
              type="text"
              margin="normal"
              value={input.email}
              onChange={handleChange}
              required
              fullWidth
              id="email"
              label="E-Mail"
              name="email"
              autoComplete="email username"
              autoFocus
            />
            {/* anders lösen? */}
            {props.isRegistered && (
              <TextField
                error={!isValid}
                helperText={helperTextPwd}
                autoFocus
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
            )}

            {/* <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
            /> */}
            {rdyToRegister && (
              <Button
                variant="outlined"
                fullWidth
                sx={{ mt: 3 }}
                onClick={handleClick}
              >
                Zurück
              </Button>
            )}
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2, minWidth: 180 }}
            >
              {btnTxt}
            </Button>
          </Box>
        </Box>
        <Copyright sx={{ mt: 8, mb: 4 }} />
      </Container>
    </ThemeProvider>
  );
}
