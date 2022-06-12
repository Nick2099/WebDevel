import React from 'react';
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

function App() {
  sessionStorage.setItem("user_id", "0") // when user_id>0 then user is loged in
  return (
    <Router>
      <Navigation />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/logout" element={<Logout />} />
        <Route path="/additems" element={<Additems />} />
      </Routes>
      <Footer />
    </Router>
  )
}

export default App;