import React from "react";

export default function ListOfUsersUser({ user, id, admin, toggleAdmin }) {
    if (typeof id !== "string") id=toString(id);
    if (typeof admin !== "string") admin=toString(admin);
    let tmp=false;
    if (admin==="2" && user.admin!==2) tmp=true;

    function handleChangeAdmin() {
        toggleAdmin(user.user_id);
    }

    return (
    <tr>
      <td>{user.user_id}</td>
      <td>{user.email}</td>
      <td>{user.name}</td>
      <td>{user.family}</td>
      <td>
      {user.admin===2 ? "Super" : user.admin===1 ? "Yes" : "No"}
      {tmp ? <button onClick={handleChangeAdmin}>Change</button> : ""}
      </td>
      <td>{user.wrong_login}</td>
      <td>{user.demo_only ? "Yes" : "No"}</td>
    </tr>
  );
}
