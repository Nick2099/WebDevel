import React, { useState, useContext, useEffect, Component } from "react";
import "./App.css";
import { TmpUserContext } from "./TmpUserContext";
// import {PageContentContext} from "./PageContentContext";

function EntryArea2() {
  /* const [email, setEmail] = useState('');
    const [name, setName] = useState('');
    const [password, setPassword] = useState('');
    const [repeat, setRepeat] = useState('');
    const [repeatTxt, setRepeatTxt] = useState(''); */
  const [tmpUser, setTmpUser] = useContext(TmpUserContext);
  /* const [page, setPage] = useContext(PageContentContext);
    const [register, setRegister] = useState(false);    */
  const [showIncome, setShowIncome] = useState(true);

    console.log("tmpUser: ", tmpUser);

  var tmpDate = new Date();
  var currentDate = tmpDate.toISOString().substring(0, 10);

  function incexpChange() {
    var selected = document.querySelector('input[name="incexp"]:checked').id;
    console.log("selected: ", selected);
    if (selected === "inc") {
      setShowIncome(true);
    } else {
      setShowIncome(false);
    }
  }

  function checkDate() {
    console.log("Check Date");
    var tmpDate = String(document.getElementById("select_date").value);
    console.log("tmpDate: ", tmpDate);
    var day = tmpDate.substring(8,10);
    var month = tmpDate.substring(5,7);
    var year = tmpDate.substring(0,4);
    console.log(day+"-"+month+"-"+year);
  }

  return (
    <div className="Entry" id="EntryArea">
      <h2>Insert your entries (2)</h2>
      <div id="div_person">
        <label className="width_100">Person</label>
        <select className="width_200" id="select_person"></select>
      </div>
      <div id="div_radio">
        <input
          type="radio"
          id="inc"
          name="incexp"
          value="inc"
          onChange={incexpChange}
          defaultChecked
        ></input>
        <label>Income</label>
        <input
          type="radio"
          id="exp"
          name="incexp"
          value="exp"
          onChange={incexpChange}
        ></input>
        <label>Expense</label>
      </div>
      <div id="div_date">
        <label className="width_100">Date</label>
        <input
          id="select_date"
          className="width_200"
          type="date"
          // onChange={checkDate} 
          defaultValue={currentDate}
        ></input>
      </div>

      <div id="div_entries">
        <h2>{showIncome ? "Income" : "Expense"}</h2>
      </div>

      <Child tmpUser={tmpUser} />
    </div>
  );
}

class Child extends Component {
  componentDidMount() {
    console.log("Child was Mounted. Props: ", this.props);
    var opt = document.createElement("option");
    opt.innerHTML = this.props.tmpUser.name;
    opt.value = 0;
    opt.setAttribute("selected", true);
    var sel = document.getElementById("select_person");
    sel.appendChild(opt);
  }
  componentDidUpdate() {
    console.log("Child was updated");
  }
  componentWillUnmount() {
    console.log("Child was Unmounted");
  }
  render() {
    return null;
  }
}

export default EntryArea2;
