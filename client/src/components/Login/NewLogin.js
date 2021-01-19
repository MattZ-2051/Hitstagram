import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import "./Login.css";
import { login } from "../../store/auth";
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
  cssLabel: {
    color: "lightskyblue",
  },
  cssOutlinedInput: {
    "&$cssFocused $notchedOutline": {
      borderColor: "lightskyblue !important",
      color: "lightskyblue",
    },
  },
  cssFocused: {},
  notchedOutline: {
    borderColor: "lightskyblue !important",
    color: "lightskyblue",
  },
}));

function LogInPage() {
  const classes = useStyles();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const history = useHistory();

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

  return (
    <>
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
              InputLabelProps={{
                classes: {
                  root: classes.cssLabel,
                  focused: classes.cssFocused,
                },
              }}
              InputProps={{
                classes: {
                  root: classes.cssOutlinedInput,
                  focused: classes.cssFocused,
                  notchedOutline: classes.notchedOutline,
                },
              }}
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
              InputLabelProps={{
                classes: {
                  root: classes.cssLabel,
                  focused: classes.cssFocused,
                },
              }}
              InputProps={{
                classes: {
                  root: classes.cssOutlinedInput,
                  focused: classes.cssFocused,
                  notchedOutline: classes.notchedOutline,
                },
              }}
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
      {/* <div className="github-icon">
        <a href="https://github.com/MattZ-2051/Hitstagram">
          <img
            src="https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fmaxcdn.icons8.com%2FShare%2Ficon%2Fp1em%2FLogos%2Fgithub1600.png&f=1&nofb=1"
            alt="Not Found"
          />
        </a>
        <p>
          Picstagram is a web application where you can make posts, comment on
          posts and follow your friends (based off the popular application
          instagram). If you want to see more of my code click the github icon
          to go to my github profile!
        </p>
      </div> */}
    </>
  );
}

export default LogInPage;
