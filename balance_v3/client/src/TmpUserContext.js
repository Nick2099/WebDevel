import React, {useState, createContext} from "react";

export const TmpUserContext = createContext();

export const TmpUserProvider = (props) => {
    const [tmpUser, setTmpUser] = useState({
        id: 0,
        userid: 0,  // when is the same as id then that is an administrator
        email: "",
        pass: "",
        mode: false,    //true - premium user, false - basic-free user
        demoonly: false,    // when demo is true then mode: true
        confirmed: false,   // true - user is confirmed by e-mail
        name: "",
        created: "",
        lastlogin: "",
        lastlogout: "",
        logedin: false,  // not in users table
        admin: 0,    // 1 - Admin
        cur: "",
        curdec: 0,
        }
    );
    return(
        <TmpUserContext.Provider value={[tmpUser, setTmpUser]}>
            {props.children}
        </TmpUserContext.Provider>
    );
};