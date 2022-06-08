import React, { useEffect, useRef, useState } from "react";
import * as MyFunctions from "../components/MyFunctions";

function Register() {
  const email = useRef(null);
  const pass = useRef(null);
  const pass_repeat = useRef(null);
  const name = useRef(null);
  const family = useRef("");
  const [ok, setOk] = useState({email: false, password: false, pass_repeat: false, name: false, family: false});

  function registerNewUser() {
    console.log("registerNewUser", email.current.value);
    MyFunctions.doesUserExists(email.current.value)
    .then((value) => {
      console.log("Value: ", value);
    })
    .catch((error) => {
      console.log("Error: ", error);
    })
  }

  function handleName() {
    if ((name.current.value).length>1) 
    setOk((prevOK) => {
      return {...prevOK, name: true};}
    );
  };  

  function handleFamily() {
    if ((family.current.value).length>2) 
    setOk((prevOK) => {
      return {...prevOK, family: true};}
    );
  };  

  useEffect(() => {
    console.log(ok);
  }, [ok]);



  return (
    <div>
      <h1>Register</h1>
      <div>
        <label>User name</label>
        <input ref={email} type="text" placeholder="E-mail address" />
      </div>
      <div>
        <label>Password</label>
        <input ref={pass} type="password" />
      </div>
      <div>
        <label>Repeat password</label>
        <input ref={pass_repeat} type="password" />
      </div>
      <div>
        <label>Name</label>
        <input ref={name} type="text" onChange={handleName}/>
      </div>
      <div>
        <label>Family name</label>
        <input ref={family} type="text" onChange={handleFamily}/>
      </div>
      <div>
        <button onClick={registerNewUser}>Register</button>
      </div>
    </div>
  );
}

export default Register;
