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
import LoginArea from "./LoginArea";

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
    if (document.getElementById("visibilitycheck").value) {
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
    console.log("createLocalUser props: ", props);
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
      }).then(function (response) {
        if (response.data.status === "ok") {
        } else {
        }
      });
    });
  }

  return (
    <div id="SettingsArea">
      <div>
        <header>
          <h2>Settings</h2>
        </header>
      </div>
      <div>
        <label>User name</label>
        <input
          type="text"
          maxLength={maxNameLength}
          defaultValue={tmpUser.name}
        ></input>
      </div>
      <div>
        <label>Currency</label>
        <select id="select_cur"></select>
      </div>

      <div>
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
      </div>

      <div>
        <div>
          <button onClick={addNewUserVisibility}>Add new user</button>
        </div>
        <div id="addNewUserDiv" className="Hidden">
          <div>
            <label>E-mail</label>
            <input
              id="emailInput"
              type="email"
              maxLength={maxEmailLength}
              value={emailInput}
              onChange={updateEmailInput}
            ></input>
          </div>
          <div>
            <label>Name</label>
            <input
              id="nameInput"
              type="text"
              maxLength={maxNameLength}
              value={nameInput}
              onChange={updateNameInput}
            ></input>
          </div>
          <div>
            <label>Password</label>
            <input
              id="pass1Input"
              type="password"
              maxLength={maxPasswordLength}
              value={passwordInput}
              onChange={updatePasswordInput}
            ></input>
          </div>
          <label className="notePass1Input">
            {" "}
            Password must contain:
            <span className={checkedInput[0] ? "green" : "red"}> A</span>
            <span className={checkedInput[1] ? "green" : "red"}> z</span>
            <span className={checkedInput[2] ? "green" : "red"}> 1</span>
            <span className={checkedInput[3] ? "green" : "red"}> $</span>
            <span className={checkedInput[4] ? "green" : "red"}> {">7"} </span>
            {checkedInput[5] ? "✔️" : ""}
          </label>
          <div>
            <label>Repeat password</label>
            <input
              id="pass2Input"
              type="password"
              maxLength={maxPasswordLength}
              value={repeatInput}
              onChange={updateRepeatInput}
            ></input>
          </div>
          <div>
            <label>Passwords have to be the same!{repeatTxtInput}</label>
          </div>
          <div>
            <input type="checkbox" id="visibilitycheck" value="true"></input>
            <label>All users and their data visible.</label>
          </div>
          <div>
            <button onClick={registerLocalUser}>Register user</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SettingsArea;
