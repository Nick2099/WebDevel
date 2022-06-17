import React, { useState } from "react";
// import ReactDOM from 'react-dom/client';
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import {
  Navigation,
  Footer,
  Home,
  About,
  Contact,
  Login,
  Register,
  Additems,
  Logout,
  Settings,
} from "./components";
var user_id = 0;
if (sessionStorage.length === 0) {
  sessionStorage.setItem("user_id", 0);
} else {
  user_id = parseInt(sessionStorage.getItem("user_id"));
}

function App() {
  const [logedin, setLogedin] = useState(user_id);
  var shouldRedirect = true;
  if (logedin > 0) shouldRedirect = false;

  function handleLogedin(tmp) {
    setLogedin(parseInt(tmp));
  }

  return (
    <Router>
      <Navigation logedin={logedin} />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route
          path="/login"
          element={<Login logedin={logedin} handleLogedin={handleLogedin} />}
        />
        <Route
          path="/register"
          element={<Register logedin={logedin} handleLogedin={handleLogedin} />}
        />
        <Route
          path="/logout"
          element={<Logout logedin={logedin} handleLogedin={handleLogedin} />}
        />
        <Route
          path="/additems"
          element={
            shouldRedirect ? (
              <Navigate replace to="/" />
            ) : (
              <Additems logedin={logedin} />
            )
          }
        />
        <Route
          path="/settings"
          element={
            shouldRedirect ? (
              <Navigate replace to="/" />
            ) : (
              <Settings logedin={logedin} />
            )
          }
        />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
