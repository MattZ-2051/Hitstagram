import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import Link from "@material-ui/core/Link";
import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import "./Login.css";
import { login, setCsrfFunc } from "../../store/auth";
import { useHistory } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1),
    backgroundColor: "white",
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
    backgroundColor: "lightblue",
  },
}));

function LogInPage() {
  const classes = useStyles();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const history = useHistory();
  const id = useSelector((state) => state.auth.id);
  const [fetchWithCSRF, setFetchWithCSRF] = useState(() => fetch);

  const handleLogin = (e) => {
    e.preventDefault();
    dispatch(login(username, password));
    history.push("/");
  };

  const handleDemoLogin = (e) => {
    e.preventDefault();
    dispatch(login("Demo", "password"));
    history.push("/");
  };

  //   useEffect(() => {
  //     async function restoreCSRF() {
  //       const response = await fetch("/api/csrf/restore", {
  //         method: "GET",
  //         credentials: "include",
  //       });
  //       if (response.ok) {
  //         const authData = await response.json();
  //         setFetchWithCSRF(() => {
  //           return (resource, init) => {
  //             if (init.headers) {
  //               init.headers["X-CSRFToken"] = authData.csrf_token;
  //             } else {
  //               init.headers = {
  //                 "X-CSRFToken": authData.csrf_token,
  //               };
  //             }
  //             return fetch(resource, init);
  //           };
  //         });
  //       }
  //     }
  //     restoreCSRF();
  //   }, []);

  //   useEffect(() => {
  //     dispatch(setCsrfFunc(fetchWithCSRF));
  //     // eslint-disable-next-line react-hooks/exhaustive-deps
  //   }, []);

  return (
    <Container className="app-login" component="main" maxWidth="xs">
      <CssBaseline />
      <h1 className="app-name">Picstagram</h1>
      <div className="login-component">
        <h3 className="sign-in"> Log in</h3>
        <form noValidate className={classes.form}>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="email"
            label="Username"
            name="username"
            autoComplete="Username"
            autoFocus
            onChange={(e) => setUsername(e.target.value)}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
            onChange={(e) => setPassword(e.target.value)}
          />
          <div className="login-form__btn">
            <button type="submit" onClick={handleLogin}>
              Log in
            </button>
          </div>
          <div className="login-form__btn">
            <button type="submit" onClick={handleDemoLogin}>
              Demo User
            </button>
          </div>
          <Grid className="link">
            <a href="/signup" className="link">
              Don't have an account sign up!
            </a>
          </Grid>
        </form>
      </div>
    </Container>
  );
}

export default LogInPage;
