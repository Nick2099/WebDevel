import React, { useRef } from "react";

function Register() {
  const email = useRef(null);
  const pass = useRef(null);
  const pass_repeat = useRef(null);
  const name = useRef(null);
  const family = useRef(null);

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
        <input ref={name} type="text" />
      </div>
      <div>
        <label>Family name</label>
        <input ref={family} type="text" />
      </div>
      <div>
        <button>Register</button>
      </div>
    </div>
  );
}

export default Register;
