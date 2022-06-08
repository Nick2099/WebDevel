import React, { useRef } from "react";

function Login() {
  const email = useRef(null);
  const pass = useRef(null);

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
        <button>Login</button>
      </div>
      <div>
        <button>Forgot password?</button>
      </div>
    </div>
  );
}

export default Login;
