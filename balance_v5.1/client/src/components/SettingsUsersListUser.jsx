import React, { useRef, useEffect, useState } from "react";
import { MyConstant } from "./MyConstants";

export default function SettingsUsersListUser({
  user,
  id,
  admin,
  toggleAdmin,
  resetWrongLogins,
  updateName,
  updateFamily,
}) {
  console.log("user.name:",user.name);
  const name = useRef(user.name);
  const family = useRef(user.family);
  const [ok, setOk] = useState({
    name: false,
    family: false,
  });

  if (typeof id !== "string") id = toString(id);
  if (typeof admin !== "string") admin = toString(admin);
  let show = false;
  if (admin === "2" && user.admin !== 2) show = true;

  useEffect(() => {
    handleName();
    handleFamily();
  }, []);

  useEffect(() => {
    if (document.getElementById("name"+user.user_id).value!==user.name)
    document.getElementById("name"+user.user_id).value=user.name;
    if (document.getElementById("family"+user.user_id).value!==user.family)
    document.getElementById("family"+user.user_id).value=user.family;
  }, [user])

  function handleChangeAdmin() {
    toggleAdmin(user.user_id);
  }

  function handleResetWrongLogins() {
    resetWrongLogins(user.user_id);
  }

  function setName() {
    updateName({ id: user.user_id, name: name.current.value });
  }

  function setFamily() {
    updateFamily({ id: user.user_id, family: family.current.value });
  }

  function handleName() {
    let tmp = false;
    if (name.current.value.length >= MyConstant.minimumLengthForName) tmp = true;
    setOk((prevOk) => {
      return { ...prevOk, name: tmp };
    });
  }

  function handleNameAfter() {
    handleName();
    if (ok.name) {
      setName(name.current);
    } else {
      document.getElementById("name"+user.user_id).focus();
    }
  }

  function handleFamily() {
    let tmp = false;
    if (family.current.value.length >= MyConstant.minimumLengthForFamily) tmp = true;
    setOk((prevOk) => {
      return { ...prevOk, family: tmp };
    });
  }

  function handleFamilyAfter() {
    handleFamily();
    if (ok.family) {
      setFamily(family.current);
    } else {
      document.getElementById("family"+user.user_id).focus();
    }
  }

  return (
    <tr>
      <td>{user.user_id}</td>
      <td>{user.email}</td>
      <td>
        <input
          id={"name"+user.user_id}
          ref={name}
          type="text"
          defaultValue={name.current}
          onChange={handleName}
          onBlur={handleNameAfter}
        ></input>
        <label>{ok.name ? "✔️" : "❌"}</label>
      </td>
      <td>
        <input
          id={"family"+user.user_id}
          ref={family}
          type="text"
          defaultValue={family.current}
          onChange={handleFamily}
          onBlur={handleFamilyAfter}
        ></input>
        <label>{ok.family ? "✔️" : "❌"}</label>
      </td>
      <td>
        {user.admin === 2 ? "Main" : user.admin === 1 ? "Yes" : "No"}
        {show ? <button onClick={handleChangeAdmin}>Change</button> : ""}
      </td>
      <td>
        {user.wrong_login}
        {show ? <button onClick={handleResetWrongLogins}>Reset</button> : ""}
      </td>
      <td>{user.demo_only ? "Yes" : "No"}</td>
    </tr>
  );
}
