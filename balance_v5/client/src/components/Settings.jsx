import React from "react";
import { useEffect, useState } from "react";
import * as MyFunctions from "../components/MyFunctions";
import ListOfUsers from "./ListOfUsers";

function Settings({ logedin }) {
  const id = sessionStorage.getItem("user_id");
  const name = sessionStorage.getItem("name");
  const family = sessionStorage.getItem("family");
  const master_id = sessionStorage.getItem("master_id");
  const admin = sessionStorage.getItem("admin");
  const wrong_login = sessionStorage.getItem("wrong_login");
  const demo_only = sessionStorage.getItem("demo_only");

  // const [localUser, setLocalUser] = useState([]);
  const [users, setUsers] = useState([]);

  // admin 1: user can add local users
  // admin 2: user can add more local users and new admins
  //          new admins can delete main admin (id = master_id)

  useEffect(() => {
    MyFunctions.getLocalUsers(master_id).then((value) => {
      setUsers(value);
    });
  }, []); // run once

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

  function updateName({id, name}) {
    const newUsers = [...users];
    const user = newUsers.find((user) => user.user_id === id);
    user.name = name;
    setUsers(newUsers); // changes have to be saved in MySQL table
    console.log("users: ", users);
  }

  return (
    <div>
      {" "}
      <h1>Settings!</h1>
      <div>
        <div>
          <label>ID: {id}</label>
        </div>
        <div>
          <label>Name: {name}</label>
        </div>
        <div>
          <label>Family name: {family}</label>
        </div>
        <div>
          <label>Admin: {admin ? "Yes" : "No"}</label>
        </div>
        <div>
          <label>Master ID: {master_id}</label>
        </div>
        <div>
          <label>Wrong login: {wrong_login}</label>
        </div>
        <div>
          <label>Demo: {demo_only ? "No" : "Yes"}</label>
        </div>
        <div>
          <ListOfUsers
            users={users}
            id={id}
            admin={admin}
            toggleAdmin={toggleAdmin}
            resetWrongLogins={resetWrongLogins}
            updateName={updateName}
          />
        </div>
      </div>
      <div></div>
    </div>
  );
}

export default Settings;
