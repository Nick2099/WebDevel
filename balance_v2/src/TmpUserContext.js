import React, {useState, createContext} from "react";

export const TmpUserContext = createContext();

export const TmpUserProvider = (props) => {
    const [tmpUser, setTmpUser] = useState({
        email: "",
        name: "",
        id: "0",
        logedin: false   
        }
    );
    return(
        <TmpUserContext.Provider value={[tmpUser, setTmpUser]}>
            {props.children}
        </TmpUserContext.Provider>
    );
};