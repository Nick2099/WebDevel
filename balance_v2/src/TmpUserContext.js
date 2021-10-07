import React, {useState, createContext} from "react";

export const TmpUserContext = createContext();

export const TmpUserProvider = (props) => {
    const [tmpUser, setTmpUser] = useState({
        id: 0,
        email: "",
        pass: "",
        mode: false,    //true - premium user, false - basic-free user
        demoonly: false,    // when demo is true then mode: true
        confirmed: false,   // true - user is confirmed by e-mail
        name: "",
        created: "",
        lastlogin: "",
        lastlogout: "",
        logedin: false  // not in users table
        }
    );
    return(
        <TmpUserContext.Provider value={[tmpUser, setTmpUser]}>
            {props.children}
        </TmpUserContext.Provider>
    );
};