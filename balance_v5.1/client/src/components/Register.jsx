import React, { useEffect, useRef, useState } from "react";
import * as MyFunctions from "../components/MyFunctions";
import { useNavigate } from "react-router-dom";

function Register({ logedin, handleLogedin }) {
  const email = useRef(null);
  const pass = useRef(null);
  const pass_repeat = useRef(null);
  const name = useRef(null);
  const family = useRef(null);
  const [ok, setOk] = useState({
    email: false,
    pass: false,
    pass_repeat: false,
    name: false,
    family: false,
    email_exist: false,
  });
  const [register, setRegister] = useState(false);
  const navigate = useNavigate();

  // Checked - works OK
  function handleRegisterNewUser() {
    if (register) {
      MyFunctions.registerNewUser({
        email: email.current.value,
        pass: pass.current.value,
        name: name.current.value,
        family: family.current.value,
      }).then((value) => {
        MyFunctions.getUserID(email.current.value).then((value1) => {
          MyFunctions.updateMasterId(value1);
          sessionStorage.setItem("user_id", value1);
          sessionStorage.setItem("name", name.current.value);
          sessionStorage.setItem("family", family.current.value);
          sessionStorage.setItem("master_id", value1);
          sessionStorage.setItem("admin", 1);
          sessionStorage.setItem("wrong_logins", 0);
          sessionStorage.setItem("demo_only", 0);
          handleLogedin(value1);
          navigate("/additems");
        });
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

  function handleEmailAfter() {
    // email.toLowerCase
    var x = document.getElementById("email");
    x.value = x.value.toLowerCase();
    // checking if user with same email already exists
    MyFunctions.getUserID(email.current.value).then((value) => {
      if (value > 0) {
        setOk((prevOk) => {
          return { ...prevOk, email_exist: true };
        });
      } else {
        setOk((prevOk) => {
          return { ...prevOk, email_exist: false };
        });
      }
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
    if ((pass.current.value === pass_repeat.current.value) && (pass.current.value.length>0)) tmp = true;
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
      document.getElementById("pass_repeat").type = "text";
    } else {
      x.type = "password";
      document.getElementById("pass_repeat").type = "password";
    }
  }

  useEffect(() => {
    setRegister(
      ok.email &&
        ok.pass &&
        ok.pass_repeat &&
        ok.family &&
        ok.name &&
        !ok.email_exist
    );
  }, [ok, register]);

  function handleReset() {
    email.current.value = "";
    handleEmail();
    pass.current.value = "";
    handlePassword();
    pass_repeat.current.value = "";
    handleRepeat();
    name.current.value = "";
    handleName();
    family.current.value = "";
    handleFamily();
  }

  return (
    <div>
      <h1>Register</h1>
      <div>
        <label>User name</label>
        <input
          id="email"
          ref={email}
          type="text"
          onChange={handleEmail}
          onBlur={handleEmailAfter}
          placeholder="E-mail address"
        />
        <label>{ok.email && !ok.email_exist ? "✔️" : ""}</label>
        <label>{ok.email_exist ? "Already registered!" : ""}</label>
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
        <button onClick={handleRegisterNewUser}>Register</button>
      </div>
      <div>
        <button onClick={handleReset}>Reset</button>
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
