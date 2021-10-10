import React, {useState, useContext, useEffect} from "react";
import './App.css';
import {TmpUserContext} from "./TmpUserContext";
import {PageContentContext} from "./PageContentContext";


function LoginArea() {
    const [email, setEmail] = useState('');
    const [name, setName] = useState('');
    const [password, setPassword] = useState('');
    const [repeat, setRepeat] = useState('');
    const [repeatTxt, setRepeatTxt] = useState('');
    const [tmpUser, setTmpUser] = useContext(TmpUserContext);
    const [page, setPage] = useContext(PageContentContext);
    const [register, setRegister] = useState(false);

    const updateEmail = (e) => {
        setEmail(e.target.value);
    };

    const updateName = (e) => {
        setName(e.target.value);
    };

    const updatePassword = (e) => {
        setPassword(e.target.value);
    };

    const updateRepeat = (e) => {
        setRepeat(e.target.value);
    };

    const registerChange = (e) => {
        setRegister(!register);
    }

    function createuser(props) {        
        setTmpUser(old => ({...old, 
            name:name, email: email, pass: password, mode: true,
            demoonly: false, confirmed: true, logedin: true}))
    }

    const formSubmit = e => {
        e.preventDefault();
        if (tmpUser.logedin===false) {
            if (register) {
                createuser();
            } else {
                setTmpUser({email: email, name: name, pass: password, logedin: true, id: 2});
            }
        } else {
            setTmpUser({email: "", name: "", logedin: false, id: 0});
        };
        let tmpPage = {};
        tmpPage.showLogin = false;
        tmpPage.showHome = page.showHome;
        setPage(tmpPage);
        console.log(email, name, password, repeat);
    }

    useEffect(() => {
        if (!(password===repeat)) {
            setRepeatTxt(" is not the same as Password!");
        } else {
            setRepeatTxt(" - OK");
        }
        return () => {
        }
    }, [password, repeat])

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
            <form className="Login" onSubmit={formSubmit}>
                <div>
                    <button>Login as a guest</button>
                    <button type="button" onClick={registerChange}>{register ? "Login" : "Register"}</button>
                </div>
                <label>E-mail address</label>
                <input type='text' name='email' value={email} onChange={updateEmail}></input>
                <label className={register ? "Show-Block" : "Hidden"}>Name</label>
                <input className={register ? "Show-Block" : "Hidden"} type='text' name='name' value={name} onChange={updateName}></input>
                <label>Password</label>
                <input type='text' name='password' value={password} onChange={updatePassword}></input>
                <label className={register ? "Show-Block" : "Hidden"}>Repeat password {repeatTxt}</label>
                <input className={register ? "Show-Block" : "Hidden"} type='text' name='repeat' value={repeat} onChange={updateRepeat}></input>
                <button className='main' type="submit">{register ? "Register" : "Login"}</button>
            </form>           
            <div>
                <p>Loging in as s guest</p>
                <p>Register to...</p>
            </div>
        </div>
    );
}

export default LoginArea;