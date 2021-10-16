import React, {useContext} from "react";
import './App.css';
import {TmpUserContext} from "./TmpUserContext";
import {PageContentContext} from "./PageContentContext";


function NavigationBar({email, name, id, logedin}) {
    const [tmpUser, setTmpUser] = useContext(TmpUserContext);
    const [page, setPage] = useContext(PageContentContext);

    console.log("tmpUser: ", tmpUser);
    // console.log("page: ", page);

    const logButton = (e) => {
        if (e.target.value==="false") {
            if (page.showLogin) {
                setPage(prevState => {return{...prevState, showLogin: false}})
            } else {
                setPage(prevState => {return{...prevState, showLogin: true}})
            };
        } else {
            setTmpUser({email: "", name: "", logedin: false, id: 0});
            setPage(prevState => {return{...prevState, showLogin: false}})
        };
    }

    return(
        <div className="NavigationBar">
            <div className="left">
                <h2>Balance my way</h2>
            </div>
            <div className="right">
                <button onClick={logButton} value={tmpUser.logedin}>{tmpUser.logedin ? "Logout" : page.showLogin ? "Hide Login" : "Login"}</button>
            </div>
        </div>
    );
}

export default NavigationBar;