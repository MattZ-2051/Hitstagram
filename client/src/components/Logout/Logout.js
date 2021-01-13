import React from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { logout } from "../../store/auth";
import "./Logout.css";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";

const Logout = () => {
  const dispatch = useDispatch();
  const history = useHistory();

  const handleLogout = () => {
    dispatch(logout());
    history.push("/login");
  };

  return (
    <div className="logout">
      <ExitToAppIcon className="logout__btn" onClick={handleLogout} />
    </div>
  );
};

export default Logout;
