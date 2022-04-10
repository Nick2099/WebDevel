import React, {useContext} from "react";
import './App.css';
import {TmpUserContext} from "./TmpUserContext";
import {PageContentContext} from "./PageContentContext";


function NavigationBar({email, name, id, logedin}) {
    const [tmpUser, setTmpUser] = useContext(TmpUserContext);
    const [page, setPage] = useContext(PageContentContext);

    // console.log("tmpUser: ", tmpUser);
    // console.log("page: ", page);

    const logButton = (e) => {
        if (e.target.value==="false") {
            if (page.showLogin) {
                setPage(prevState => {return{...prevState, showLogin: false, showHome: true}})
            } else {
                setPage(prevState => {return{...prevState, showLogin: true, showHome: false}})
            };
        } else {
            setTmpUser({email: "", name: "", logedin: false, id: 0});
            setPage(prevState => {return{...prevState, showLogin: false, showHome: true, showEntry: false}})
        };
    }

    function entryButton() {
        setPage({
            showLogin: false,
            showHome: false,
            showEntry: true,
            showEntryAdd: true,
            showSettings: false,    
        });    
    }

    function settingsButton() {
        setPage({
            showLogin: false,
            showHome: false,
            showEntry: false,
            showEntryAdd: false,
            showSettings: true,    
        });    
    }

    return(
        <div className="NavigationBar">
            <div className="left">
                <h2>Balance my way</h2>
            </div>
            <div className="right">
                <button type="button" onClick={entryButton} className={tmpUser.logedin ? "enabled" : "Hidden"}>Manage entries</button>
                <button type="button" onClick={settingsButton} className={tmpUser.logedin ? "enabled" : "Hidden"}>Settings</button>
                <button type="button" className="loginButton" onClick={logButton} value={tmpUser.logedin}>{tmpUser.logedin ? "Logout" : page.showLogin ? "Home" : "Login"}</button>
            </div>
        </div>
    );
}

export default NavigationBar;