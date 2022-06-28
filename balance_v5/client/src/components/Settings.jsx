import React, { useEffect, useState } from "react";
import * as MyFunctions from "../components/MyFunctions";
import ListOfUsers from "./ListOfUsers";

function Settings({ logedin }) {
  const id = sessionStorage.getItem("user_id");
  // const name = sessionStorage.getItem("name");
  // const family = sessionStorage.getItem("family");
  const master_id = sessionStorage.getItem("master_id");
  const admin = sessionStorage.getItem("admin");
  // const wrong_login = sessionStorage.getItem("wrong_login");
  // const demo_only = sessionStorage.getItem("demo_only");
  const [users, setUsers] = useState([]);

  // admin 1: user can add local users
  // admin 2: user can add more local users and new admins
  //          new admins can delete main admin (id = master_id)

  useEffect(() => {
    loadLocalUsers();
  }, []); // run once

  /*
  useEffect(() => {
    console.log("users: ", users);
  }, [users])
  */

  function loadLocalUsers() {
    MyFunctions.getLocalUsers(master_id).then((value) => {
      setUsers(value);
      sessionStorage.setItem("usersDefault", JSON.stringify(value));
    });
  }

  function toggleAdmin(id) {
    const newUsers = [...users];
    const user = newUsers.find((user) => user.user_id === id);
    if (user.admin === 0) user.admin = 1;
    else user.admin = 0;
    setUsers(newUsers); // changes have to be saved in MySQL table
  }

  function resetWrongLogins(id) {
    const newUsers = [...users];
    const user = newUsers.find((user) => user.user_id === id);
    user.wrong_login = 0;
    setUsers(newUsers); // changes have to be saved in MySQL table
  }

  function updateName({ id, name }) {
    const newUsers = [...users];
    const user = newUsers.find((user) => user.user_id === id);
    user.name = name;
    setUsers(newUsers); // changes have to be saved in MySQL table
  }

  function updateFamily({ id, family }) {
    const newUsers = [...users];
    const user = newUsers.find((user) => user.user_id === id);
    user.family = family;
    setUsers(newUsers); // changes have to be saved in MySQL table

  }

  function saveChanges() {
    users.forEach(user => {
      MyFunctions.updateLocalUser(user);
    });
  }

  function resetChanges() {
    let tmp = JSON.parse(sessionStorage.getItem('usersDefault'));
    setUsers(tmp);
  };

  return (
    <div>
      {" "}
      <h1>Settings!</h1>
      <div>
        <div>
          <ListOfUsers
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
    </div>
  );
}

export default Settings;
