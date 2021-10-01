import React, {useContext} from "react";
import './App.css';
import {TmpUserContext} from "./TmpUserContext";


function NavigationBar({email, name, id, logedin}) {
    const [tmpUser, setTmpUser] = useContext(TmpUserContext);

    const logButton = (e) => {
        console.log(e);
        if (e.target.value==="true") {
            setTmpUser({logedin: false});
        };
    }

    return(
        <div className="NavigationBar">
            <div className="left">
                <h2>Balance my way, {tmpUser.id}, {tmpUser.logedin}</h2>
            </div>
            <div className="right">
                <button onClick={logButton} value={tmpUser.logedin}>{tmpUser.logedin ? "Logout" : "Login"}</button>
            </div>
        </div>
    );
}

export default NavigationBar;