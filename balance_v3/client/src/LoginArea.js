import React, { useState, useContext, useEffect } from "react";
import "./App.css";
import { TmpUserContext } from "./TmpUserContext";
import { PageContentContext } from "./PageContentContext";
import Axios from "axios";
import * as Functions from "./Functions";

function LoginArea() {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  // const [passwordTxt, setPasswordTxt] = useState(""); //
  const [repeat, setRepeat] = useState("");
  const [repeatTxt, setRepeatTxt] = useState("");
  const [tmpUser, setTmpUser] = useContext(TmpUserContext);
  const [page, setPage] = useContext(PageContentContext);
  const [register, setRegister] = useState(false);
  const [checked, setChecked] = useState([]);

  const updateEmail = (e) => {
    setEmail(e.target.value);
  };

  const updateName = (e) => {
    setName(e.target.value);
  };

  const updatePassword = (e) => {
    setPassword(e.target.value);
  };

  const updateRepeat = (e) => {
    setRepeat(e.target.value);
  };

  const registerChange = (e) => {
    setRegister(!register);
  };

  function createUser(props) {
    Axios.post("http://localhost:3001/register", {
      name: name,
      email: email,
      password: password,
      mode: true,
      demoonly: false,
      confirmed: true,
    }).then(function (response) {
      if (response.data.status === "ok") {
        setTmpUser({
          email: email,
          name: name,
          logedin: true,
          id: response.data.id,
          userid: response.data.userid,
        });
        setPage((prevState) => {
          return {
            ...prevState,
            showLogin: false,
            showEntry: true,
            showHome: false,
          };
        });
      } else {
        if (response.data.error === "ER_DUP_ENTRY") {
          alert("User with same e-mail address already exists!");
        } else {
          alert("Error: " + response.data.error);
        }
      }
    });
  }

  async function getUserID() {
    Axios.get("http://localhost:3001/userid", {
      params: {
        email: email,
        password: password,
      },
    }).then((resp) => {
      console.log("resp.data[0]: ", resp.data[0]);
      if (resp.data[0].id > 0) {
        setTmpUser({
          email: resp.data[0].email,
          name: resp.data[0].name,
          logedin: true,
          id: resp.data[0].id,
          userid: resp.data[0].userid,
        });
        setPage((prevState) => {
          return {
            ...prevState,
            showLogin: false,
            showEntry: true,
            showEntryAdd: true,
            showHome: false,
          };
        });
      } else {
        alert(resp.data[0].error);
      }
    });
  }

  async function adminLogin() {
    Axios.get("http://localhost:3001/userid", {
      params: {
        email: "nikicadadic@gmail.com",
        password: "pass",
      },
    }).then((resp) => {
      console.log("resp.data[0]: ", resp.data[0]);
      if (resp.data[0].id > 0) {
        setTmpUser({
          email: resp.data[0].email,
          name: resp.data[0].name,
          logedin: true,
          id: resp.data[0].id,
          userid: resp.data[0].userid,
        });
        setPage((prevState) => {
          return {
            ...prevState,
            showLogin: false,
            showEntry: true,
            showEntryAdd: true,
            showHome: false,
          };
        });
      } else {
        alert(resp.data[0].error);
      }
    });
  }

  async function guestLogin() { // I have to change this function to be logged as a guest //
    Axios.get("http://localhost:3001/userid", {
      params: {
        email: "jully061282@gmail.com",
        password: "qwer",
      },
    }).then((resp) => {
      if (resp.data[0].id > 0) {
        setTmpUser({
          email: resp.data[0].email,
          name: resp.data[0].name,
          logedin: true,
          id: resp.data[0].id,
          userid: resp.data[0].userid,
        });
        setPage((prevState) => {
          return {
            ...prevState,
            showLogin: false,
            showEntry: true,
            showEntryAdd: true,
            showHome: false,
          };
        });
      } else {
        alert(resp.data[0].error);
      }
    });
  }

  const formSubmit = (e) => {
    e.preventDefault();
    if (tmpUser.logedin === false) {
      if (register) {
        if (password === repeat) {
          createUser();
        } else {
          alert("Password and repeated password are not the same!");
        }
      } else {
        getUserID();
      }
    } else {
      setTmpUser({ email: "", name: "", logedin: false, id: 0 , userid: 0});
      setPage((prevState) => {
        return { ...prevState, showLogin: false };
      });
    }
  };

  useEffect(() => {
    Functions.checkPass(password).then((value) => {
      setChecked(value);
    });
  }, [password]);

  useEffect(() => {
    if (password === repeat && password.length > 0) {
      setRepeatTxt(" ✔️");
    } else {
      setRepeatTxt("");
    }
    return () => {};
  }, [password, repeat]);

  useEffect(() => {
    if (tmpUser.logedin) {
      setPage((prevState) => {
        return { ...prevState, showLogin: false };
      });
    }
  }, [tmpUser, setPage, page.showHome]);

  return (
    <div className="Login">
      <div className="LoginInputs">
        <label>E-mail address</label>
        <input
          type="text"
          name="email"
          value={email}
          onChange={updateEmail}
        ></input>
        <label className={register ? "Show-Block" : "Hidden"}>Name</label>
        <input
          className={register ? "Show-Block" : "Hidden"}
          type="text"
          name="name"
          value={name}
          onChange={updateName}
        ></input>
        <label>Password</label>
        <input
          type="password"
          name="password"
          value={password}
          onChange={updatePassword}
        ></input>
        {register ? (
          <label class="labelNote">
            {" "}
            Password must contain:
            <span className={checked[0] ? "green" : "red"}> A</span>
            <span className={checked[1] ? "green" : "red"}> z</span>
            <span className={checked[2] ? "green" : "red"}> 1</span>
            <span className={checked[3] ? "green" : "red"}> $</span>
            <span className={checked[4] ? "green" : "red"}> {">7"} </span>
            {checked[5] ? "✔️" : ""}
          </label>
        ) : (
          ""
        )}
        <label className={register ? "Show-Block" : "Hidden"}>
          Repeat password
        </label>
        <input
          className={register ? "Show-Block" : "Hidden"}
          type="password"
          name="repeat"
          value={repeat}
          onChange={updateRepeat}
        ></input>
        <label className={register ? "Show-Block labelNote" : "Hidden"}>
          Passwords have to be the same!{repeatTxt}
        </label>
      </div>
      <button className="mainLoginButton" type="button" onClick={formSubmit}>
        {register ? "Register" : "Login"}
      </button>
      <div>
        <button class="bottomLoginButtons" type="button" onClick={guestLogin}>
          Login as a guest
        </button>
        <button class="bottomLoginButtons" type="button" onClick={adminLogin}>
          Admin
        </button>
        <button
          class="bottomLoginButtons"
          type="button"
          onClick={registerChange}
        >
          {register ? "To login" : "To register"}
        </button>
      </div>
    </div>
  );
}

export default LoginArea;
