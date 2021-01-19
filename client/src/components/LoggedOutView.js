import React from "react";
import { useSelector } from "react-redux";
import { Switch, Route, Redirect } from "react-router-dom";
import LogInPage from "./Login/NewLogin";
import Signup from "./Signup/Signup";

const LoggedOutView = () => {
  const id = useSelector((state) => state.auth.id);
  return (
    <>
      <Switch>
        <Route exact path="/signup">
          <Signup />
        </Route>
        <Route exact path="*">
          <LogInPage />
        </Route>
      </Switch>
    </>
  );
};

export default LoggedOutView;
