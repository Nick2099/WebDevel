import React, { useRef, useState, useEffect } from "react";
import * as MyFunctions from "../components/MyFunctions";
import { useNavigate } from "react-router-dom";
import { MyVariable } from "../components/MyVariables";


function Login({ logedin, handleLogedin }) {
  const email = useRef(null);
  const pass = useRef(null);
  const [ok, setOk] = useState({
    email: false,
    pass: false,
  });
  const [login, setLogin] = useState(false);
  const navigate = useNavigate();

  function handleLoginRequest() {
    if (login) {
      MyFunctions.login({
        email: email.current.value,
        password: pass.current.value,
      })
        .then((value) => {
          if (value.status==="User don't exists!") {
            alert("User don't exits!");
            MyFunctions.addToLogFile(0, 4, value.email); //user_id is 0 when does not exists
          } else {
            if (value.wrong_login>3) {
              MyFunctions.updateWrongLogin({
                id: value.id,
                wrong_login: value.wrong_login + 1,
              });
              MyFunctions.addToLogFile(value.id, 5, "");
              alert("Your account is locked!");  
            } else if (value.status === "Wrong password") {
              MyFunctions.updateWrongLogin({
                id: value.id,
                wrong_login: value.wrong_login + 1,
              });
              MyFunctions.addToLogFile(value.id, 5, "");
              alert("Wrong password!");
            } else {
              MyFunctions.addToLogFile(value.id, 3, "");
              sessionStorage.clear();
              sessionStorage.setItem("user_id", value.id);
              sessionStorage.setItem("name", value.name);
              sessionStorage.setItem("family", value.family);
              sessionStorage.setItem("master_id", value.master_id);
              sessionStorage.setItem("admin", value.admin);
              sessionStorage.setItem("wrong_login", value.wrong_login);
              sessionStorage.setItem("demo_only", value.demo_only);
              handleLogedin(value.id);
              MyFunctions.updateWrongLogin({ id: value.id, wrong_login: 0 });
              navigate("/additems");  
            }
          }
        })
        .catch((err) => {
          MyFunctions.addToLogFile(
            0,
            1,
            "sql: '" +
              err.response.data.sql +
              "' sqlMessage: '" +
              err.response.data.sqlMessage +
              "'"
          );
        });
    } else {
      alert("E-mail address is not valid or/and password doesn't fulfil minimum length!");
    }
  }

  function handleShowPassword() {
    var x = document.getElementById("pass");
    if (x.type === "password") {
      x.type = "text";
    } else {
      x.type = "password";
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
    let tmp = false;
    if (pass.current.value.length >= MyVariable.minimumLengthOfPassword) tmp = true;
    setOk((prevOk) => {
      return { ...prevOk, pass: tmp };
    });
  }

  useEffect(() => {
    setLogin(ok.email && ok.pass);
  }, [ok, login]);

  function handleReset() {
    email.current.value = "";
    handleEmail();
    pass.current.value= "";
    handlePassword();
  }

  return (
    <div>
      <h1>Login</h1>
      <div>
        <label>User name</label>
        <input
          id="email"
          ref={email}
          type="text"
          onChange={handleEmail}
          placeholder="E-mail address"
        />
        <label>{ok.email ? "✔️ Valid e-mail address" : ""}</label>
      </div>
      <div>
        <label>Password</label>
        <input id="pass" ref={pass} type="password" onChange={handlePassword} />
        <label>{ok.pass ? "✔️ Minimum length of password" : ""}</label>
      </div>
      <div>
        <input type="checkbox" onClick={handleShowPassword}></input>
        <label>Show password</label>
      </div>
      <div>
        <button onClick={handleLoginRequest}>Login</button>
      </div>
      <div>
        <button onClick={handleReset}>Reset</button>
        <button>Forgot password?</button>
      </div>
    </div>
  );
}

export default Login;
