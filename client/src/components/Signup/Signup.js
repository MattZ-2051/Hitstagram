import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import { signup } from "../../store/auth";
import { useHistory } from "react-router-dom";
import "../Login/Login.css";

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
const Signup = () => {
  const [fullName, setFullName] = useState("");
  const classes = useStyles();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const history = useHistory();

  const handleSignup = (e) => {
    e.preventDefault();
    dispatch(signup(fullName, username, password));
    history.push("/welcome");
  };

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
            <button type="submit" onClick={handleSignup}>
              Sign Up
            </button>
          </div>
          <Grid className="link">
            <a href="/login" className="link">
              Don't have an account sign up!
            </a>
          </Grid>
        </form>
      </div>
    </Container>
  );
};

export default Signup;
