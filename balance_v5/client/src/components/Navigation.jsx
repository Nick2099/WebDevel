import React from "react";
import { NavLink } from "react-router-dom";

function Navigation() {
  return (
    <div className="navigation">
      <nav>
        <div>
          <ul>
            <li>
              <NavLink to="/">Home</NavLink>
            </li>
            <li>
              <NavLink to="/about">About</NavLink>
            </li>
            <li>
              <NavLink to="/contact">Contact</NavLink>
            </li>
            <li>
              {sessionStorage.getItem("user_id") === "0" ? (
                <NavLink to="/login">Login</NavLink>
              ) : (
                ""
              )}
            </li>
            <li>
            {sessionStorage.getItem("user_id") === "0" ? (
                <NavLink to="/register">Register</NavLink>
              ) : (
                ""
              )}
            </li>
            <li>
              {sessionStorage.getItem("user_id") === "0" ? (
                ""
              ) : (
                <NavLink to="/additems">Entries</NavLink>
              )}
            </li>
            <li>
              {sessionStorage.getItem("user_id") === "0" ? (
                ""
              ) : (
                <NavLink to="/logout">Log out</NavLink>
              )}
            </li>
          </ul>
        </div>
      </nav>
    </div>
  );
}

export default Navigation;
