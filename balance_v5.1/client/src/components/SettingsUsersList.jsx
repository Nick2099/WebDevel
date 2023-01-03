import React from "react";
import { login } from "./MyFunctions";
import SettingsUsersListUser from "./SettingsUsersListUser";

export default function SettingsUsersList({ users, id, admin, toggleAdmin, resetWrongLogins, updateName, updateFamily }) {
  /*
  console.log("SettingsUsersList");
  console.log("users:", users);
  console.log("id:", id);
  console.log("admin:", admin);
  */
  // ID column is probably not needed.... Delete?
  return (
    <>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>E-mail address</th>
            <th>Name</th>
            <th>Family name</th>
            <th>Admin</th>
            <th>No. of wrong logins</th>
            <th>Demo only</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => {
            return (
              <SettingsUsersListUser
                key={user.id}
                user={user}
                id={id}
                admin={admin}
                toggleAdmin={toggleAdmin}
                resetWrongLogins={resetWrongLogins}
                updateName={updateName}
                updateFamily={updateFamily}
              />
            );
          })}
        </tbody>
      </table>
    </>
  );
}
