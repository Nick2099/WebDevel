import React, {useState, createContext} from "react";

export const TmpUserContext = createContext();

export const TmpUserProvider = (props) => {
    const [tmpUser, setTmpUser] = useState({
        email: "some@email.com",
        name: "John",
        id: "1",
        logedin: true   
        }
    );
    return(
        <TmpUserContext.Provider value={[tmpUser, setTmpUser]}>
            {props.children}
        </TmpUserContext.Provider>
    );
};