import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

export default function Login(props) {
  console.log(props);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");
  const [logOrReg, setLogOrReg] = useState(props.userIsReg);

  function validateForm() {
    return email.length > 0 && password.length > 0;
  }

  function handleSubmit(event) {
    event.preventDefault();
  }

  function handleChangeLogOrReg(event) {
    event.preventDefault();
    setLogOrReg(!logOrReg);
    document.getElementById("email").focus();
  }

  return (
    <div className="Login">
      <Form onSubmit={handleSubmit}>
        <Form.Group size="lg" controlId="email">
          <Form.Label>Email</Form.Label>
          <Form.Control
            autoFocus
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </Form.Group>
        <Form.Group size="lg" controlId="password">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            value={password}
            autocomplete="false"
            onChange={(e) => setPassword(e.target.value)}
          />
        </Form.Group>
        {!logOrReg ? (
          <Form.Group size="lg" controlId="repeatPassword">
          <Form.Label>Repeat password</Form.Label>
          <Form.Control
            type="password"
            value={repeatPassword}
            autocomplete="false"
            onChange={(e) => setRepeatPassword(e.target.value)}
          />
        </Form.Group>
        ) : "" }
        <Button className="mainbutton" block size="lg" type="submit" disabled={!validateForm()}>
          {logOrReg ? "Login" : "Register"}
        </Button>
        <Button variant="danger" size="sm" onClick={handleChangeLogOrReg}>
          {logOrReg ? "Register" : "Login"}
        </Button>
        <Button variant="info" size="sm" type="submit" disabled={!validateForm()}>
          Guest
        </Button>
      </Form>
    </div>
  );
}