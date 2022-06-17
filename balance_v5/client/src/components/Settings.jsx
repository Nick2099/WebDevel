import React from "react";

function Settings({logedin}) {
  const id = sessionStorage.getItem("user_id");
  const name = sessionStorage.getItem("name");
  const family = sessionStorage.getItem("family");
  const master_id = sessionStorage.getItem("master_id");
  const admin = sessionStorage.getItem("admin");
  const wrong_login = sessionStorage.getItem("wrong_login");
  const demo_only = sessionStorage.getItem("demo_only");

  return (
    <div>
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
      </div>
    </div>
  );
}

export default Settings;
