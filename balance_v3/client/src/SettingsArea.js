import React, {
  useState,
  useContext,
  useEffect,
  useRef,
  // Component,
} from "react";
import "./App.css";
// import Axios from "axios";
import { TmpUserContext } from "./TmpUserContext";
import * as Functions from "./Functions";

function SettingsArea() {
  const [tmpUser, setTmpUser] = useContext(TmpUserContext);
  // const groups = useRef([]);
  // const subgroups = useRef([]);
  const currencies = useRef([]);
  const [addNewUser, setAddNewUser] = useState(false);
  const localUsers = useRef([]);
  const maxNoOfLocalUsers = 5;
  const maxNameLength = 30;
  const maxEmailLength = 30;
  const maxPasswordLength = 20;


  useEffect(() => {
    Functions.getCurrencies().then((value) => {
      currencies.current = value;
      Functions.setCurrencies({ cur: tmpUser.cur, curs: currencies });
    });
    Functions.getLocalUsers(tmpUser.id, tmpUser.userid).then((value) => {
      localUsers.current = value;
      Functions.addLocalUserToTable(localUsers.current);
    });
  }, [tmpUser.cur, tmpUser.id, tmpUser.userid]);
    // it looks that those dependencies doesn't have to be set to zero []

  useEffect(() => {
    if (addNewUser) {
      document.getElementById("addNewUserDiv").className = "Show-block";
    } else {
      document.getElementById("addNewUserDiv").className = "Hidden";
    }
  }, [addNewUser]);

  function addNewUserVisibility() {
    setAddNewUser(!addNewUser);
  }

  function registerUser() {}

  return (
    <div id="SettingsArea">
      <div>
        <header>
          <h2>Settings</h2>
        </header>
      </div>
      <div>
        <label>User name</label>
        <input type="text" maxLength={maxNameLength} defaultValue={tmpUser.name}></input>
      </div>
      <div>
        <label>Currency</label>
        <select id="select_cur"></select>
      </div>

      <div>
        <table id="localUsers">
          <thead>
            <tr>
              <th>Name</th>
              <th>E-mail</th>
              <th>All data visible</th>
            </tr>
          </thead>
        </table>
      </div>

      <div>
        <div>
          <button onClick={addNewUserVisibility}>Add new user</button>
        </div>
        <div id="addNewUserDiv" className="Hidden">
          <div>
            <label>E-mail</label>
            <input type="email" maxLength={maxEmailLength}></input>
          </div>
          <div>
            <label>Name</label>
            <input type="text" maxLength={maxNameLength}></input>
          </div>
          <div>
            <label>Password</label>
            <input type="password" maxLength={maxPasswordLength}></input>
          </div>
          <div>
            <label>Repeat password</label>
            <input type="password" maxLength={maxPasswordLength}></input>
          </div>
          <div>
            <input type="checkbox" id="visibilitycheck" value="true"></input>
            <label>All users and their data visible.</label>
          </div>
          <div>
            <button onClick={registerUser}>Register user</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SettingsArea;
