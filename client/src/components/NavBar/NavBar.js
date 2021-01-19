import React from "react";
import "./NavBar.css";
import HomeIcon from "@material-ui/icons/Home";
import ExploreIcon from "@material-ui/icons/Explore";
import AddAPhotoIcon from "@material-ui/icons/AddAPhoto";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import Logout from "../Logout/Logout";
import { useHistory } from "react-router-dom";
import { useSelector } from "react-redux";

const NavBar = () => {
  const history = useHistory();
  const userId = useSelector((state) => state.auth.id);

  const routeChangeProfile = () => {
    history.push(`/my/profile/${userId}`);
  };

  const routeChangeHome = () => {
    history.push("/");
  };

  const routeChangeExplore = () => {
    history.push("/explore");
  };

  const routeChangeUpload = () => {
    history.push("/upload");
  };

  return (
    <div className="navbar">
      <div className="navbar__name">
        <p onClick={routeChangeHome}>Picstagram</p>
        <img
          onClick={routeChangeHome}
          src="https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fupload.wikimedia.org%2Fwikipedia%2Fcommons%2Fthumb%2Fd%2Fd3%2FHigh-contrast-camera-photo.svg%2F600px-High-contrast-camera-photo.svg.png&f=1&nofb=1"
          alt=""
        />
      </div>
      <div className="navbar__buttons">
        <div className="navbar__homeBtn">
          <HomeIcon className="homeIcon" onClick={routeChangeHome} />
        </div>
        <div className="navbar__exploreBtn">
          <ExploreIcon className="exploreIcon" onClick={routeChangeExplore} />
        </div>
        <div className="navbar__uploadBtn">
          <AddAPhotoIcon className="photoIcon" onClick={routeChangeUpload} />
        </div>
        <div className="navbar__profileBtn">
          <AccountCircleIcon
            className="accountIcon"
            onClick={routeChangeProfile}
          />
        </div>
        <div className="navbar__logoutBtn">
          <Logout />
        </div>
      </div>
    </div>
  );
};

export default NavBar;
