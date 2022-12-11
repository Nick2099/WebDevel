import React from "react";
import { NavLink } from "react-router-dom";

function Navigation({logedin}) {
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
            {logedin === 0 ? (
              <>
                <li>
                  <NavLink to="/login">Login</NavLink>
                </li>
                <li>
                  <NavLink to="/register">Register</NavLink>
                </li>
              </>
            ) : (
              ""
            )}
            {logedin === 0 ? (
              "" ) : (
              <>
                <li>
                <NavLink to="/additems">Entries</NavLink>
                </li>
                <li>
                <NavLink to="/settings">Settings</NavLink>
                </li>
                <li>
                <NavLink to="/logout">Log out</NavLink>
                </li>
              </>
            )}
          </ul>
        </div>
      </nav>
    </div>
  );
}

export default Navigation;
