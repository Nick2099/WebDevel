import React from "react";
import Login from "./LoginOrReg";

var userIsRegistered = true;

function App() {
  return (
    <div className="container">
      <Login userIsReg = {userIsRegistered}/>
    </div>
  );
}

export default App;
