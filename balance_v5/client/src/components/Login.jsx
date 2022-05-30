import React, { useRef } from "react";

function Login() {
  const name = useRef();
  const pass = useRef();

  return (
    <div>
      <h1>Login</h1>
      <div>
        <label>User name</label>
        <input ref={name} type="text" />
      </div>
      <div>
        <label>Password</label>
        <input ref={pass} type="password" />
      </div>
      <div>
        <button>Login</button>
      </div>
      <div>
        <button>Forgot password?</button>
      </div>
    </div>
  );
}

export default Login;
