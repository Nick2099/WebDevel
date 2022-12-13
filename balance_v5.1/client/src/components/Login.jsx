import React, { useRef, useState, useEffect } from "react";
import * as MyFunctions from "../components/MyFunctions";
import { useNavigate } from "react-router-dom";
import { MyConstant } from "../components/MyConstants";


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
          console.log("handleLoginRequest value:", value);
          if (value.status==="User don't exists!") {
            alert("User don't exits!");
          } else {
            if (value.wrong_logins>3) {
              alert("Your account is locked!");  
            } else if (value.status === "Wrong password") {
              alert("Wrong password!");
            } else {
              sessionStorage.clear();
              sessionStorage.setItem("user_id", value.id);
              sessionStorage.setItem("name", value.firstname);
              sessionStorage.setItem("family", value.familyname);
              sessionStorage.setItem("master_id", value.master_id);
              sessionStorage.setItem("master_type_id", value.master_type_id);
              sessionStorage.setItem("admin_type_id", value.admin_type_id);
              handleLogedin(value.id);
              navigate("/additems");  
            }
          }
        })
        .catch((err) => {
          alert(err);
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
    if (pass.current.value.length >= MyConstant.minimumLengthOfPassword) tmp = true;
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
