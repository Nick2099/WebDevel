import React, {useState, useContext} from "react";
import './App.css';
import {TmpUserContext} from "./TmpUserContext";

function LoginArea() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [tmpUser, setTmpUser] = useContext(TmpUserContext);

    const updateEmail = (e) => {
        setEmail(e.target.value);
    };

    const updatePassword = (e) => {
        setPassword(e.target.value);
    };

    const formSubmit = e => {
        e.preventDefault();
        setTmpUser({email: email, name: password, logedin: true, id: 2});
    }

    /*
    var bcrypt = require('bcryptjs');
    bcrypt.genSalt(10, function(err, salt) {
        bcrypt.hash("somepass", salt, function(err, hash) {
            // Store hash in your password DB.
            console.log(hash);
        });
    });
    */

    return(
        <div>
            <form onSubmit={formSubmit}>
                <label>E-mail address</label>
                <input type='text' name='email' value={email} onChange={updateEmail}></input>
                <label>Password</label>
                <input type='text' name='password' value={password} onChange={updatePassword}></input>
                <button>Login</button>
            </form>            
        </div>
    );
}

export default LoginArea;