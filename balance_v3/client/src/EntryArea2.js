import React, { useState, useContext, useEffect, Component } from "react";
import "./App.css";
// import Axios from "axios";
import { TmpUserContext } from "./TmpUserContext";
import * as Functions from "./Functions";

function EntryArea2() {
  const [tmpUser, setTmpUser] = useContext(TmpUserContext);
  const [showIncome, setShowIncome] = useState(true);

  let records = [
    {
      id: 0,
      recid: 0,
      userid: 0,
      locuser: 0,
      date: "",
      place: "",
      totinc: 0,
      totexp: 0,
      inc: 0,
      exp: 0,
      group: 0,
      subgroup: 0,
    },
  ];
  var groups = [];

  var tmpDate = new Date();
  var currentDate = tmpDate.toISOString().substring(0, 10);
  var tmpDateValue = "";

  function incexpChange() {
    var selected = document.querySelector('input[name="incexp"]:checked').id;
    if (selected === "inc") {
      setShowIncome(true);
    } else {
      setShowIncome(false);
    }
  }

  function checkDate() {
    var tmpDate1 = String(document.getElementById("select_date").value);
    if (tmpDate1.length === 0) {
      document.getElementById("select_date").value = tmpDateValue;
    } else {
      tmpDateValue = tmpDate1;
    }
  }

  function changeGroup() {
    Functions.removeAllOptionsFromSelect("select_subgroup")
      .then(Functions.getSubGroups)
      .then((value) => Functions.fillSubGroups(value));
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
          onChange={checkDate}
          defaultValue={currentDate}
        ></input>
      </div>

      <div id="div_entries">
        <h2>{showIncome ? "Income" : "Expense"}</h2>
      </div>

      <div id="div_place">
        <label className="width_100">Place</label>
        <input type="text" id="place" className="width_200"></input>
      </div>

      <div id="div_totamount">
        <label className="width_200">Total amount</label>
        <input
          type="number"
          id="totamount"
          className="width_100 right"
          defaultValue="0.00"
        ></input>
      </div>
      {/* 
      <div id="div_group" className={showIncome ? "Hidden" : "Show-Block"}>
        <label className="width_100">Group</label>
        <select
          className="width_200"
          id="select_group"
          onChange={changeGroup}
        ></select>
      </div>

      <div id="div_subgroup" className={showIncome ? "Hidden" : "Show-Block"}>
        <label className="width_100">Subgroup</label>
        <select className="width_200" id="select_subgroup"></select>
      </div>

 */}
      <div id="table" className={showIncome ? "Hidden" : "Show-Block"}>
        <table className="expenses ">
          <thead>
            <tr>
              <th>Group</th>
              <th>Subgroup</th>
              <th>Amount</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>
                <select className="width_200" id="select_group" onChange={changeGroup}></select>
              </td>
              <td>
                <select className="width_200" id="select_subgroup"></select>
              </td>
              <td>
                <input type="number" id="amount" className="width_100 right" defaultValue="0.00"></input>
              </td>
              <td>
                <button className='main' type="button" onClick={addRecord}>Add</button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <Child tmpUser={tmpUser} groups={groups} />
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

    Functions.getGroups()
      .then((value) => Functions.fillGroups(value))
      .then(Functions.getSubGroups)
      .then((value) => Functions.fillSubGroups(value));
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
