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
          if (value) {
            console.log("User with same email address already exists!");
          } else {
            console.log("To login....");
          }
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
    });
  }

  function handleRepeat() {
    let tmp = false;
    if (pass.current.value === pass_repeat.current.value) tmp = true;
    setOk((prevOk) => {
      return { ...prevOk, pass_repeat: tmp };
    });
  }

  function handleName() {
    let tmp = false;
    if (name.current.value.length > 1) tmp = true;
    setOk((prevOk) => {
      return { ...prevOk, name: tmp };
    });
  }

  function handleFamily() {
    let tmp = false;
    if (family.current.value.length > 1) tmp = true;
    setOk((prevOk) => {
      return { ...prevOk, family: tmp };
    });
  }

  function handleShowPassword() {
    var x = document.getElementById("pass");
    if (x.type === "password") {
      x.type = "text";
      document.getElementById("pass_repeat").type="text";
    } else {
      x.type = "password";
      document.getElementById("pass_repeat").type="password";
    }
  }

  useEffect(() => {
    setRegister(ok.email && ok.pass && ok.pass_repeat && ok.family && ok.name);
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
        <label>{ok.email ? "✔️" : ""}</label>
      </div>
      <div>
        <label>Password</label>
        <input ref={pass} type="password" id="pass" onChange={handlePassword} />
        <label>{ok.pass ? "✔️" : ""}</label>
      </div>
      <div>
        <label>Repeat password</label>
        <input
          ref={pass_repeat}
          type="password"
          id="pass_repeat"
          onChange={handleRepeat}
        />
        <label>{ok.pass_repeat ? "✔️" : ""}</label>
      </div>
      <div>
        <input type="checkbox" onClick={handleShowPassword}></input>
        <label>Show password and repeat password</label>
      </div>
      <div>
        <label>Name</label>
        <input ref={name} type="text" onChange={handleName} />
        <label>{ok.name ? "✔️" : ""}</label>
      </div>
      <div>
        <label>Family name</label>
        <input ref={family} type="text" onChange={handleFamily} />
        <label>{ok.family ? "✔️" : ""}</label>
      </div>
      <div>
        <button onClick={registerNewUser}>Register</button>
      </div>
      <div>
        <label>Notes:</label>
        <br></br>
        <label>
          Password have to contain at least one big letter, one small letter,
          one digit,<br></br>one special character (!@#$%^&*) and have to be at
          least 8 characters long.
        </label>
        <br></br>
        <label>Repeated password have to be the same as password.</label>
        <br></br>
        <label>Name and family have to be at least 2 characters long.</label>
      </div>
    </div>
  );
}

export default Register;
