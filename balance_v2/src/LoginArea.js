import React, {useState, useContext} from "react";
import './App.css';
import {TmpUserContext} from "./TmpUserContext";
import {PageContentContext} from "./PageContentContext";


function LoginArea() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [tmpUser, setTmpUser] = useContext(TmpUserContext);
    const [page, setPage] = useContext(PageContentContext);
    const [register, setRegister] = useState(false);

    const updateEmail = (e) => {
        setEmail(e.target.value);
    };

    const updatePassword = (e) => {
        setPassword(e.target.value);
    };

    const registerChange = (e) => {
        setRegister(!register);
    }

    const formSubmit = e => {
        e.preventDefault();
        if (tmpUser.logedin===false) {
            setTmpUser({email: email, name: password, logedin: true, id: 2});
        } else {
            setTmpUser({email: "", name: "", logedin: false, id: 0});
        };
        let tmpPage = {};
        tmpPage.showLogin = false;
        tmpPage.showHome = page.showHome;
        setPage(tmpPage);
        console.log("tmpUser: ", tmpUser);
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
        <div className="Login">
            <form onSubmit={formSubmit}>
                <label>E-mail address</label>
                <input type='text' name='email' value={email} onChange={updateEmail}></input>
                <label>Password</label>
                <input type='text' name='password' value={password} onChange={updatePassword}></input>
                <label className={register ? "Show-Block" : "Hidden"}>Repeat password</label>
                <input className={register ? "Show-Block" : "Hidden"} type='text' name='repeat' value={password} onChange={updatePassword}></input>
                <button type="submit">{register ? "Register" : "Login"}</button>
                <div>
                <button>Login as a guest</button>
                <button type="button" onClick={registerChange}>{register ? "Login" : "Register"}</button>
            </div>
            </form>            
        </div>
    );
}

export default LoginArea;