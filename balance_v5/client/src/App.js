import React, { useState } from "react";
// import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
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
} from "./components";
const user_id=0;
sessionStorage.setItem("user_id", user_id); // when user_id>0 then user is loged in

function App() {
  const [logedin, setLogedin] = useState(user_id);

  function handleLogedin(tmp) {
    setLogedin(tmp)
  }

  return (
    <Router>
      <Navigation logedin={logedin} />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/login" element={<Login logedin={logedin} handleLogedin={handleLogedin} />} />
        <Route path="/register" element={<Register logedin={logedin} handleLogedin={handleLogedin} />} />
        <Route path="/logout" element={<Logout logedin={logedin} handleLogedin={handleLogedin} />} />
        <Route path="/additems" element={<Additems />} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
