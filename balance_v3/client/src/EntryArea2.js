import React, {useState, useContext, useEffect} from "react";
import './App.css';
import {TmpUserContext} from "./TmpUserContext";
import {PageContentContext} from "./PageContentContext";

function EntryArea2() {
    const [email, setEmail] = useState('');
    const [name, setName] = useState('');
    const [password, setPassword] = useState('');
    const [repeat, setRepeat] = useState('');
    const [repeatTxt, setRepeatTxt] = useState('');
    const [tmpUser, setTmpUser] = useContext(TmpUserContext);
    const [page, setPage] = useContext(PageContentContext);
    const [register, setRegister] = useState(false);
    const [showIncome, setShowIncome] = useState(true);

    var tmpDate = new Date();
    var currentDate = tmpDate.toISOString().substring(0,10);

    function incexpChange() {
        var selected = document.querySelector('input[name="incexp"]:checked').id;
        console.log("selected: ", selected);
        if (selected==="inc") {
            setShowIncome(true);
        } else {
            setShowIncome(false);
        };
    };

    return(
        <div className="Entry" id="EntryArea">
            <h2>Insert your entries (2)</h2>
            <div id="div_person">
                <label className="width_100">Person</label>
                <select className="width_200" id="select_person"></select>
            </div>
            <div id="div_date">
                <label className="width_100">Date</label>
                <input className="width_200" type="date" value={currentDate}></input>
            </div>
            <div id="div_buttons">
                <button type="button" id="inc">Income</button>
                <button type="button" id="exp">Expense</button>
            </div>
            <div id="div_radio">
                <input type="radio" id="inc" name="incexp" value="inc" onChange={incexpChange}></input>
                <label for="inc">Income</label>
                <input type="radio" id="exp" name="incexp" value="exp" onChange={incexpChange}></input>
                <label for="exp">Expense</label>
            </div>

            <div id="div_entries">
                <h2>{showIncome ? "Income" : "Expense"}</h2>
            </div>
        </div>
    );
}

export default EntryArea2;