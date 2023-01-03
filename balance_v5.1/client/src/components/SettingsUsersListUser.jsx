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
  // console.log("SettingsUsersListUser");
  // console.log("user:",user);
  // console.log("id:",id);
  // console.log("admin:",admin);
  let name = useRef(user.firstname);
  const family = useRef(user.familyname);
  // console.log("name:", name.current, "family:", family.current);
  const [ok, setOk] = useState({
    name: false,
    family: false,
  });
  
  if (typeof id !== "string") id = toString(id);
  if (typeof admin !== "string") admin = toString(admin);
  let show = false;
  if (admin === "2" && user.admin !== 2) show = true;
  
  useEffect(() => {
    console.log("useEffect []");
    handleName();
    handleFamily();
  }, []);

  useEffect(() => {
    console.log("useEffect [user]");
    if (document.getElementById("name"+user.id).value!==user.firstname)
    document.getElementById("name"+user.id).value=user.firstname;
    if (document.getElementById("family"+user.id).value!==user.familyname)
    document.getElementById("family"+user.id).value=user.familyname;
  }, [user]);

  function handleChangeAdmin() {
    toggleAdmin(user.id);
  };

  function handleResetWrongLogins() {
    resetWrongLogins(user.id);
  };

  function setName() {
    updateName({ id: user.id, name: name.current });
  };

  function setFamily() {
    updateFamily({ id: user.id, family: family.current });
  };

  function handleName() {
    console.log("handleName:", name.current.value);
    let tmp = false;
    if (name.current.value.length >= MyConstant.minimumLengthForName) tmp = true;
    setOk((prevOk) => {
      return { ...prevOk, name: tmp };
    });
  };

  function handleNameAfter() {
    handleName();
    if (ok.name) {
      setName(name.current);
    } else {
      document.getElementById("name"+user.id).focus();
    }
  };

  function handleFamily() {
    console.log("handleFamily family.current.value:", family.current.value);
    let tmp = false;
    if (family.current.value.length >= MyConstant.minimumLengthForFamily) tmp = true;
    setOk((prevOk) => {
      return { ...prevOk, family: tmp };
    });
  };

  function handleFamilyAfter() {
    handleFamily();
    if (ok.family) {
      setFamily(family.current);
    } else {
      document.getElementById("family"+user.id).focus();
    }
  };

  return (
    <tr>
      <td>{user.id}</td>
      <td>{user.email}</td>
      <td>
        <input
          id={"name"+user.id}
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
          id={"family"+user.id}
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
