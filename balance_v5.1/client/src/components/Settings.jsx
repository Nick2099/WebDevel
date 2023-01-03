import React, { useEffect, useState, useRef } from "react";
import * as MyFunctions from "../components/MyFunctions";
import SettingsUsersList from "./SettingsUsersList";
import { MyConstant } from "./MyConstants";

function Settings({ logedin }) {
  const id = sessionStorage.getItem("user_id");
  // const name = sessionStorage.getItem("name");
  // const family = sessionStorage.getItem("family");
  const master_id = sessionStorage.getItem("master_id");
  const admin = sessionStorage.getItem("admin_type_id");
  // const wrong_login = sessionStorage.getItem("wrong_login");
  // const demo_only = sessionStorage.getItem("demo_only");
  const [users, setUsers] = useState([]);
  var maximumNrOfLocalUsers = true;
  if (users.length < MyConstant.maximumNrOfLocalUsersStandard)
    maximumNrOfLocalUsers = false;

  const email = useRef(null);
  const [ok, setOk] = useState({
    email: false,
    email_exist: false,
  });

  useEffect(() => {
    loadLocalUsers();
  }, []); // run once

  
  useEffect(() => {
    console.log("Settings.jsx users: ", users);
  }, [users])
  

  function loadLocalUsers() {
    MyFunctions.getLocalUsers(master_id).then((value) => {
      setUsers(value);
      sessionStorage.setItem("usersDefault", JSON.stringify(value));
    });
  }

  function toggleAdmin(id) {
    const newUsers = [...users];
    const user = newUsers.find((user) => user.id === id);
    if (user.admin_type_id === 0) user.admin_type_id = 1;
    else user.admin_type_id = 0;
    setUsers(newUsers);
  }

  function resetWrongLogins(id) {
    const newUsers = [...users];
    const user = newUsers.find((user) => user.id === id);
    user.wrong_logins = 0;
    setUsers(newUsers);
  }

  function updateName({ id, name }) {
    const newUsers = [...users];
    const user = newUsers.find((user) => user.id === id);
    user.firstname = name;
    setUsers(newUsers);
  }

  function updateFamily({ id, family }) {
    const newUsers = [...users];
    const user = newUsers.find((user) => user.id === id);
    user.familyname = family;
    setUsers(newUsers);
  }

  function saveChanges() {
    users.forEach((user) => {
      MyFunctions.updateLocalUser(user);
    });
  }

  function resetChanges() {
    let tmp = JSON.parse(sessionStorage.getItem("usersDefault"));
    setUsers(tmp);
  }

  // same function as one in Register
  function handleEmail() {
    MyFunctions.isEmailAddress(email.current.value).then((value) => {
      setOk((prevOk) => {
        return { ...prevOk, email: value };
      });
    });
  }

  // same function as one in Register
  function handleEmailAfter() {
    // email.toLowerCase
    var x = document.getElementById("email");
    x.value = x.value.toLowerCase();
    // checking if user with same email already exists
    MyFunctions.getUserID(email.current.value).then((value) => {
      if (value > 0) {
        setOk((prevOk) => {
          return { ...prevOk, email_exist: true };
        });
      } else {
        setOk((prevOk) => {
          return { ...prevOk, email_exist: false };
        });
      }
    });
  }

  function handleAddLocalUser() {
    MyFunctions.addLocalUser({
      email: email.current.value,
      master_id: master_id,
    }).then(() => {
      MyFunctions.getUserID(email.current.value).then((value) => {
        const newUsers = [...users];
        newUsers.push({
          id: value,
          email: email.current.value,
          firstname: "-",
          familyname: "-",
          admin_type_id: 0,
          wrong_login: 0,
        });
        setUsers(newUsers);
      });
    });
  }

  return (
    <div>
      {" "}
      <h1>Settings!</h1>
      <div>
        <div>
          <SettingsUsersList
            users={users}
            id={id}
            admin={admin}
            toggleAdmin={toggleAdmin}
            resetWrongLogins={resetWrongLogins}
            updateName={updateName}
            updateFamily={updateFamily}
          />
        </div>
      </div>
      <div>
        <button onClick={saveChanges}>Save changes</button>
        <button onClick={resetChanges}>Reset</button>
      </div>
      <div>
        {!maximumNrOfLocalUsers ? (
          <>
            <div>
              <input
                id="email"
                ref={email}
                type="text"
                onChange={handleEmail}
                onBlur={handleEmailAfter}
                placeholder="E-mail address"
              />
              <label>{ok.email && !ok.email_exist ? "✔️" : ""}</label>
              <label>{ok.email_exist ? "Already registered!" : ""}</label>
            </div>
            <div>
              <button onClick={handleAddLocalUser}>Add new local user</button>
            </div>
          </>
        ) : (
          <label>Maximum number of local users.</label>
        )}
      </div>
    </div>
  );
}

// Add new local user => Just adding a user (id, e-mail address, master_id=master_id admin=0, wrong_logins=0, Demo_only=0)
// By login (if user exists but there is no password) user will be transfered to register part to set password!

export default Settings;
