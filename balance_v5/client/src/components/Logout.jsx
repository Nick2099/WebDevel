import React from "react";
import { Navigate } from "react-router-dom";

function Logout() {
    sessionStorage.setItem("user_id", "0") // when user_id>0 then user is loged in
    console.log(sessionStorage.getItem("user_id"));
    return (
        <Navigate replace to="/" />
    );
}

export default Logout;