import React, { useRef } from "react";
import * as MyFunctions from "../components/MyFunctions";
import { useNavigate } from "react-router-dom";

function Login({ logedin, handleLogedin }) {
  const email = useRef(null);
  const pass = useRef(null);
  const emailMin = 5;
  const passMin = 7;
  const navigate = useNavigate();

  function handleLoginRequest() {
    if (email.current.value.length>emailMin && pass.current.value.length>passMin) {
      MyFunctions.login({email: email.current.value, password: pass.current.value})
      .then((value) => {
        if (value.id>0) {
          MyFunctions.addToLogFile(0, 3, email.current.value);
          sessionStorage.setItem("user_id", value.id);
          sessionStorage.setItem("name", value.name);
          sessionStorage.setItem("family", value.family);
          sessionStorage.setItem("master_id", value.master_id);
          sessionStorage.setItem("admin", value.admin);
          sessionStorage.setItem("wrong_login", value.wrong_login);
          sessionStorage.setItem("demo_only", value.demo_only);
          handleLogedin(value.id);
          MyFunctions.updateWrongLogin({id: value.id, wrong_login: 0});
          navigate("/additems");
        }
      })
      .catch((err) => {
        MyFunctions.addToLogFile(err.user_id, err.error_id, err.error_txt);
        if (err.error_id===5) {
          MyFunctions.updateWrongLogin({id: err.user_id, wrong_login: 1});
        }

      })
    } else {
      alert("Minimum length of email or/and password are not fulfiled!")
    }
  }

  return (
    <div>
      <h1>Login</h1>
      <div>
        <label>User name</label>
        <input ref={email} type="text" placeholder="E-mail address" />
      </div>
      <div>
        <label>Password</label>
        <input ref={pass} type="password" />
      </div>
      <div>
        <button onClick={handleLoginRequest}>Login</button>
      </div>
      <div>
        <button>Forgot password?</button>
      </div>
    </div>
  );
}

export default Login;
