import React, {
  useState,
  useContext,
  useEffect,
  useRef,
  // Component,
} from "react";
import "./App.css";
import Axios from "axios";
import { TmpUserContext } from "./TmpUserContext";
import * as Functions from "./Functions";
// import LoginArea from "./LoginArea";

function SettingsArea() {
  const [tmpUser, setTmpUser] = useContext(TmpUserContext);
  // const groups = useRef([]);
  // const subgroups = useRef([]);
  const currencies = useRef([]);
  const localUsers = useRef([]);
  const maxNoOfLocalUsers = 5;
  const maxNameLength = 30;
  const maxEmailLength = 30;
  const maxPasswordLength = 20;
  const [emailInput, setEmailInput] = useState("");
  const [nameInput, setNameInput] = useState("");
  const [passwordInput, setPasswordInput] = useState("");
  const [repeatInput, setRepeatInput] = useState("");
  const [repeatTxtInput, setRepeatTxtInput] = useState("");
  const [checkedInput, setCheckedInput] = useState([]);

  const updateEmailInput = (e) => {
    setEmailInput(e.target.value);
  };

  const updateNameInput = (e) => {
    setNameInput(e.target.value);
  };

  const updatePasswordInput = (e) => {
    setPasswordInput(e.target.value);
  };

  const updateRepeatInput = (e) => {
    setRepeatInput(e.target.value);
  };

  useEffect(() => {
    Functions.checkPass(passwordInput).then((value) => {
      setCheckedInput(value);
    });
  }, [passwordInput]);

  useEffect(() => {
    if (passwordInput === repeatInput && passwordInput.length > 0) {
      setRepeatTxtInput(" ✔️");
    } else {
      setRepeatTxtInput("");
    }
    return () => {};
  }, [passwordInput, repeatInput]);

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

  function saveChanges() {}

  function registerLocalUser() {
    console.log("data: ", passwordInput, repeatInput, nameInput, emailInput);
    if (passwordInput === repeatInput) {
      if (checkedInput[5]) {
        if (nameInput.length > 2) {
          if (emailInput.length > 5) {
            registerLocalUser2();
          } else {
            alert("E-mail too short!");
          }
        } else {
          alert("Name too short!");
        }
      } else {
        alert("Password doesn't fallow all the rules!");
      }
    } else {
      alert("Password and repeated password have to be the same!");
    }
  }

  function registerLocalUser2() {
    let tmpadv = 0;
    if (document.getElementById("visibilitycheck").checked) {
      tmpadv = 1;
    }
    createLocalUser({
      name: nameInput,
      email: emailInput,
      password: passwordInput,
      mode: true,
      demoonly: false,
      confirmed: true,
      admin: 0,
      cur: tmpUser.cur,
      curdec: tmpUser.curdec,
      adv: tmpadv,
      userid: tmpUser.id,
    });
  }

  async function createLocalUser(props) {
    return new Promise((resolve, reject) => {
      Axios.post("http://localhost:3001/register", {
        name: props.name,
        email: props.email,
        password: props.password,
        mode: props.mode,
        demoonly: props.demoonly,
        confirmed: props.confirmed,
        admin: props.admin,
        cur: props.cur,
        curdec: props.curdec,
        adv: props.adv,
        userid: props.userid,
      }).then((response) => {
        if (response.data.status === "ok") {
          afterRegisterLocarUser({
            id: response.data.id,
            name: props.name,
            email: props.email,
            adv: props.adv,
          });
          return Promise.resolve({ status: "ok", id: response.data.id });
        } else {
          return Promise.resolve({ status: "error" });
        }
      });
    });
  }

  function afterRegisterLocarUser(props) {
    localUsers.current.push({
      id: props.id,
      name: props.name,
      email: props.email,
      adv: props.adv,
    });
    Functions.deleteAllRowsInLocalUsersTable();
    Functions.addLocalUserToTable(localUsers.current);
  }

  return (
    <div id="SettingsArea">
      <div>
        <header>
          <h2>Settings</h2>
        </header>
      </div>
      <div id="Part">
        <h3>User</h3>
        <table>
          <tbody>
            <tr>
              <td>User name</td>
              <td>
                <input
                  type="text"
                  maxLength={maxNameLength}
                  defaultValue={tmpUser.name}
                ></input>
              </td>
            </tr>
            <tr>
              <td>Currency</td>
              <td>
                <select id="select_cur"></select>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <div id="Part">
        <h3>Local users</h3>
        <table id="localUsers">
          <thead>
            <tr>
              <th>Name</th>
              <th>E-mail</th>
              <th>Visibility</th>
            </tr>
          </thead>
        </table>
        <button onClick={saveChanges}>Save changes</button>
      </div>

      <div id="Part">
        <h3>Add new local user</h3>
        <table id="localUsers">
          <tbody>
            <tr>
              <td className="right">E-mail</td>
              <td>
                <input
                  id="emailInput"
                  type="email"
                  maxLength={maxEmailLength}
                  value={emailInput}
                  onChange={updateEmailInput}
                ></input>
              </td>
            </tr>
            <tr>
              <td className="right">Name</td>
              <td>
                <input
                  id="nameInput"
                  type="text"
                  maxLength={maxNameLength}
                  value={nameInput}
                  onChange={updateNameInput}
                ></input>
              </td>
            </tr>
            <tr>
              <td className="right">Password</td>
              <td>
                <input
                  id="pass1Input"
                  type="password"
                  maxLength={maxPasswordLength}
                  value={passwordInput}
                  onChange={updatePasswordInput}
                ></input>
                <br></br>
                <label className="labelNote">
                  {" "}
                  Password must contain:
                  <span className={checkedInput[0] ? "green" : "red"}> A</span>
                  <span className={checkedInput[1] ? "green" : "red"}> z</span>
                  <span className={checkedInput[2] ? "green" : "red"}> 1</span>
                  <span className={checkedInput[3] ? "green" : "red"}> $</span>
                  <span className={checkedInput[4] ? "green" : "red"}>
                    {" "}
                    {">7"}{" "}
                  </span>
                  {checkedInput[5] ? "✔️" : ""}
                </label>
              </td>
            </tr>
            <tr>
              <td className="right">Repeat password</td>
              <td>
                <input
                  id="pass2Input"
                  type="password"
                  maxLength={maxPasswordLength}
                  value={repeatInput}
                  onChange={updateRepeatInput}
                ></input>
                <br></br>
                <label className="labelNote">
                  Passwords have to be the same!{repeatTxtInput}
                </label>
              </td>
            </tr>
            <tr>
              <td className="right">All users and their data visible</td>
              <td>
                <input type="checkbox" id="visibilitycheck"></input>
              </td>
            </tr>
          </tbody>
        </table>
        <button onClick={registerLocalUser}>Register user</button>
      </div>
    </div>
  );
}

export default SettingsArea;
