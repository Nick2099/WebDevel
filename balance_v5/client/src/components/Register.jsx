import React, { useEffect, useRef, useState } from "react";
import * as MyFunctions from "../components/MyFunctions";

function Register() {
  const email = useRef(null);
  const pass = useRef(null);
  const pass_repeat = useRef(null);
  const name = useRef(null);
  const family = useRef("");
  const [ok, setOk] = useState({
    email: false,
    pass: false,
    pass_repeat: false,
    name: false,
    family: false,
  });
  const [register, setRegister] = useState(false);

  function registerNewUser() {
    if (register) {
      MyFunctions.doesUserExists(email.current.value)
        .then((value) => {
          console.log("registerNewUser doesUserExists:", value);
        })
        .catch((error) => {
          let error_tmp = MyFunctions.errorToText(error.response.data);
          MyFunctions.addToLogFile(0, 1, error_tmp);
        });
    } else {
      alert("Not all criterias are fullfiled");
    }
  }

  function handleEmail() {
    MyFunctions.isEmailAddress(email.current.value).then((value) => {
      setOk((prevOk) => {
        return { ...prevOk, email: value };
      });
    });
  }

  function handlePassword() {
    MyFunctions.isPasswordValid(pass.current.value).then((value) => {
      setOk((prevOk) => {
        return { ...prevOk, pass: value };
      });
    })
  }

  function handleRepeat() {
    let tmp = false;
    if (pass.current.value===pass_repeat.current.value) {
      tmp = true;
    };
    setOk((prevOk) => {
      return { ...prevOk, pass_repeat: tmp };
    });
  }

  function handleName() {
    if (name.current.value.length > 1)
      setOk((prevOk) => {
        return { ...prevOk, name: true };
      });
  }

  function handleFamily() {
    if (family.current.value.length > 2)
      setOk((prevOk) => {
        return { ...prevOk, family: true };
      });
  }

  useEffect(() => {
    console.log(ok);
    setRegister(
      ok.email && ok.pass && ok.pass_repeat && ok.family && ok.name
    );
    console.log("register: ", register);
  }, [ok, register]);

  return (
    <div>
      <h1>Register</h1>
      <div>
        <label>User name</label>
        <input
          ref={email}
          type="text"
          onChange={handleEmail}
          placeholder="E-mail address"
        />
      </div>
      <div>
        <label>Password</label>
        <input ref={pass} type="password" onChange={handlePassword}/>
      </div>
      <div>
        <label>Repeat password</label>
        <input ref={pass_repeat} type="password" onChange={handleRepeat}/>
      </div>
      <div>
        <label>Name</label>
        <input ref={name} type="text" onChange={handleName} />
      </div>
      <div>
        <label>Family name</label>
        <input ref={family} type="text" onChange={handleFamily} />
      </div>
      <div>
        <button onClick={registerNewUser}>Register</button>
      </div>
    </div>
  );
}

export default Register;
