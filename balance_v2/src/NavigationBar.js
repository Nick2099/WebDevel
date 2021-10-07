import React, {useContext} from "react";
import './App.css';
import {TmpUserContext} from "./TmpUserContext";
import {PageContentContext} from "./PageContentContext";


function NavigationBar({email, name, id, logedin}) {
    const [tmpUser, setTmpUser] = useContext(TmpUserContext);
    const [page, setPage] = useContext(PageContentContext);

    const logButton = (e) => {
        if (e.target.value==="false") {
            if (page.showLogin) {
                let tmpPage = {};
                tmpPage.showLogin = false;
                tmpPage.showHome = page.showHome;
                setPage(tmpPage);    
            } else {
                let tmpPage = {};
                tmpPage.showLogin = true;
                tmpPage.showHome = page.showHome;
                setPage(tmpPage);    
            };
        } else {
            let tmpPage = {};
            tmpPage.showLogin = false;
            tmpPage.showHome = page.showHome;
            setPage(tmpPage);
            setTmpUser({email: "", name: "", logedin: false, id: 0});
        };
    }

    return(
        <div className="NavigationBar">
            <div className="left">
                <h2>Balance my way</h2>
                <p>showLogin {page.showLogin.toString()}, showHome {page.showHome.toString()}, tmpUser.logedin {tmpUser.logedin ? "T" : "F"}</p>
                <p>ID:{tmpUser.id} Email:{tmpUser.email} Pass:{tmpUser.pass} Mode:{tmpUser.mode ? "T" : "F"} Demoonly:{tmpUser.demoonly ? "T" : "F"} Confirmed:{tmpUser.confirmed ? "T" : "F"}</p>
                <p>Name:{tmpUser.name} Logedin:{tmpUser.logedin ? "T" : "F"} Created:{tmpUser.created} Lastlogin:{tmpUser.lastlogin}</p>
            </div>
            <div className="right">
                <button onClick={logButton} value={tmpUser.logedin}>{tmpUser.logedin ? "Logout" : page.showLogin ? "Hide Login" : "Login"}</button>
            </div>
        </div>
    );
}

export default NavigationBar;