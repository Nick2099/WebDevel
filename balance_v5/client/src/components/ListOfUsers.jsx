import React from "react";
import ListOfUsersUser from "./ListOfUsersUser";

export default function ListOfUsers({ users, id, admin, toggleAdmin, resetWrongLogins, updateName, updateFamily }) {
  console.log("ListOfUsers");
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
              <ListOfUsersUser
                key={user.user_id}
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
