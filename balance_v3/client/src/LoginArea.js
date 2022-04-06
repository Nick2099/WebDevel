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
      admin: 1,
    }).then(function (response) {
      if (response.data.status === "ok") {
        getUserID();
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

  async function getUserID(props) {
    console.log("getUserID email, password: ", email, password);
    console.log("getUserID props: ", props);

    let tmpemail = "";
    let tmppassword = "";
    if (props !== undefined) {
      tmpemail = props.email;
      tmppassword = props.password;
    } else {
      tmpemail = email;
      tmppassword = password;
    }

    Axios.get("http://localhost:3001/userid", {
      params: {
        email: tmpemail,
        password: tmppassword,
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
          mode: resp.data[0].mode,
          demoonly: resp.data[0].demoonly,
          confirmed: resp.data[0].confirmed,
          admin: resp.data[0].admin,
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
    getUserID({email: "nikicadadic@gmail.com", password: "pass"});
  }

  async function guestLogin() {
      getUserID({email: "jully061282@gmail.com", password: "qwer"});
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
      setTmpUser({ email: "", name: "", logedin: false, id: 0, userid: 0 });
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
