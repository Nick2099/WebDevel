import React, {useState, useContext, useEffect} from "react";
import './App.css';
import {TmpUserContext} from "./TmpUserContext";
import {PageContentContext} from "./PageContentContext";
import Axios from 'axios';

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

    function createUser(props) {
        Axios.post('http://localhost:3001/register', {
            name:name, email: email, password: password, mode: true,
            demoonly: false, confirmed: true
          }).then(function (response) {
              console.log(response.data, response.data.status);
              if (response.data.status==="ok") {
                setTmpUser({email: email, name: name, logedin: true, id: response.data.id});
              } else {
                  if (response.data.error==="ER_DUP_ENTRY") {
                      alert("User with same e-mail address already exists!")
                  } else {
                      alert("Error: " + response.data.error)
                  }
              }
          })
    }

    function getUserID() {   // tu sam stao .... ovo treba proraditi
        console.log("Pocetak getUserID");
        Axios.get('http://localhost:3001/userid', {
            params: {
                email: email,
                password: password
            }
        }).then(resp => {
            setTmpUser({email: resp.data[0].email, name: resp.data[0].name, logedin: true, id: resp.data[0].id});
            console.log(resp.data.length);
            console.log(resp.data[0]);
        });
    }

    const formSubmit = e => {
        e.preventDefault();
        if (tmpUser.logedin===false) {
            if (register) {
                if  (password===repeat) {
                    createUser();
                    let tmpPage = {};
                    tmpPage.showLogin = false;
                    tmpPage.showHome = page.showHome;
                    setPage(tmpPage);
                } else {
                    alert("Password and repeated password are not the same!")
                }
            } else {
                getUserID();
                let tmpPage = {};
                tmpPage.showLogin = false;
                tmpPage.showHome = page.showHome;
                setPage(tmpPage);
            }
        } else {
            setTmpUser({email: "", name: "", logedin: false, id: 0});
            let tmpPage = {};
            tmpPage.showLogin = false;
            tmpPage.showHome = page.showHome;
            setPage(tmpPage);
        };
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
                <button className='main' type="button" onClick={formSubmit}>{register ? "Register" : "Login"}</button>
            <div>
                <p>Loging in as s guest</p>
                <p>Register to...</p>
            </div>
        </div>
    );
}

export default LoginArea;