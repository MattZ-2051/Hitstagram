import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Switch, Route } from "react-router-dom";
import { Redirect } from "react-router-dom";
import Login from "./components/Login/Login";
import Signup from "./components/Signup/Signup";
import * as AuthAction from "./store/auth";
import Home from "./components/Home/Home";
import MyProfile from "./components/Profile/MyProfile";
import Upload from "./components/Upload/Upload";
import EditProfile from "./components/Profile/EditProfile";
import SoloPost from "./components/SoloPost/SoloPost";
import Profile from "./components/Profile/Profile";
import ProfileImgUpload from "./components/Upload/ProfileImgUpload";
import ExplorePage from "./components/ExplorePage/ExplorePage";
import Welcome from "./components/Welcome/Welcome";
import LogInPage from "./components/Login/NewLogin";
import Loading from "./components/Loading/Loading";
import LoggedOutView from "./components/LoggedOutView";

const PrivateRoute = ({ component: Component, ...rest }) => {
  const needLogin = useSelector((state) => state.auth.id);
  return (
    <>
      <Route
        {...rest}
        render={(props) =>
          needLogin ? <Component {...props} /> : <Redirect to="/login" />
        }
      />
    </>
  );
};

function App() {
  const dispatch = useDispatch();
  const loadCurrentUser = () => dispatch(AuthAction.loadUser());
  const needLogin = useSelector((state) => state.auth.id);

  useEffect(() => {
    loadCurrentUser();
    // eslint-disable-next-line
  }, []);

  return (
    <>
      {!needLogin && <LoggedOutView />}
      {needLogin && (
        <Switch>
          <Route path="/" exact={true} component={Home} />
          <Route path="/upload" exact={true} component={Upload} />
          <Route
            path="/profile/:id/edit"
            exact={true}
            component={EditProfile}
          />
          <Route path="/post/:id" exact={true} component={SoloPost} />
          <Route path="/profile/:id" exact={true} component={Profile} />
          <Route path="/my/profile/:id" exact={true} component={MyProfile} />
          <Route
            path="/profile/img/:id/upload"
            exact={true}
            component={ProfileImgUpload}
          />
          <Route path="/explore" exact={true} component={ExplorePage} />
          <Route path="/welcome" exact={true} component={Welcome} />
        </Switch>
      )}
    </>
  );
}

export default App;
