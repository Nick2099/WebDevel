import React from "react";
import './App.css';

function NavigationBar({email, name, id, logedin}) {

    function Greetings(props) {
        if (!props.logged) {
            return(
                <p>Login</p>
            );
        } else {
            return(
                <p>Hello {name}</p>
            );
        }
    }

    return(
        <div className="NavigationBar">
            <div className="left">
                <h2>Balance my way</h2>
            </div>
            <div className="right">
                <Greetings logged={logedin} />
            </div>
        </div>
    );
}

export default NavigationBar;