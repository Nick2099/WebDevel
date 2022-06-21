import React, { useRef, useEffect, useState } from "react";

export default function ListOfUsersUser({
  user,
  id,
  admin,
  toggleAdmin,
  resetWrongLogins,
  updateName,
  updateFamily,
}) {
  console.log("user: ", user.name, user.family);
  const name = useRef(user.name);
  const family = useRef(user.family);
  console.log("name, family: ", name.current.value, family.current.value);
  const [ok, setOk] = useState({
    name: false,
    family: false,
  });
  const [change, setChange] = useState(false);

  if (typeof id !== "string") id = toString(id);
  if (typeof admin !== "string") admin = toString(admin);
  let tmp = false;
  if (admin === "2" && user.admin !== 2) tmp = true;

  useEffect(() => {
    handleName();
    handleFamily();
  }, []);

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
    if (name.current.value.length > 1) tmp = true;
    setOk((prevOk) => {
      return { ...prevOk, name: tmp };
    });
  }

  function handleNameAfter() {
    handleName();
    if (ok.name) {
      setName(name.current);
    } else {
      document.getElementById("name").focus();
    }
  }

  function handleFamily() {
    let tmp = false;
    if (family.current.value.length > 1) tmp = true;
    setOk((prevOk) => {
      return { ...prevOk, family: tmp };
    });
  }

  function handleFamilyAfter() {
    handleFamily();
    if (ok.family) {
      setFamily(family.current);
    } else {
      document.getElementById("family").focus();
    }
  }

  useEffect(() => {
    setChange(ok.name && ok.family);
    console.log("change: ", change);
  }, [ok]);

  return (
    <tr>
      <td>{user.user_id}</td>
      <td>{user.email}</td>
      <td>
        <input
          id="name"
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
          id="family"
          ref={family}
          type="text"
          defaultValue={family.current}
          onChange={handleFamily}
          onBlur={handleFamilyAfter}
        ></input>
        <label>{ok.family ? "✔️" : "❌"}</label>
      </td>
      <td>
        {user.admin === 2 ? "Super" : user.admin === 1 ? "Yes" : "No"}
        {tmp ? <button onClick={handleChangeAdmin}>Change</button> : ""}
      </td>
      <td>
        {user.wrong_login}
        {tmp ? <button onClick={handleResetWrongLogins}>Reset</button> : ""}
      </td>
      <td>{user.demo_only ? "Yes" : "No"}</td>
    </tr>
  );
}
