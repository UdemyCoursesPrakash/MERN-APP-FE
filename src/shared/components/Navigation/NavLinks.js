import React, { useContext } from "react";
import { NavLink } from "react-router-dom";

import AuthContext from "../../context/auth-context";
import Button from "../FormElements/Button";
import "./NavLink.css";

const NavLinks = () => {
  const authContext = useContext(AuthContext);
  return (
    <ul className="nav-links">
      <li>
        <NavLink to="/">ALL USERS</NavLink>
      </li>
      {authContext.isLoggedIn && (
        <li>
          <NavLink to={`/${authContext.user.id}/places`}>MY PLACES</NavLink>
        </li>
      )}
      {authContext.isLoggedIn && (
        <li>
          <NavLink to="/places/new">ADD PLACES</NavLink>
        </li>
      )}
      {!authContext.isLoggedIn && (
        <li>
          <NavLink to="/auth">AUTHENTICATE</NavLink>
        </li>
      )}
      {authContext.isLoggedIn && (
        <li>
          <Button onClick={authContext.logout}>LOGOUT</Button>
        </li>
      )}
    </ul>
  );
};

export default NavLinks;
