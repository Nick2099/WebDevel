import React, { useState, useContext, useEffect, Component } from "react";
import "./App.css";
// import Axios from "axios";
import { TmpUserContext } from "./TmpUserContext";
import * as Functions from "./Functions";

function EntryArea2() {
  const [tmpUser, setTmpUser] = useContext(TmpUserContext);
  const [showIncome, setShowIncome] = useState(true);

  let record = [
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
  let records = [
    {
      groupid: 7,
      groupname: "Grupa7",
      subgroupid: 1,
      subgroupname: "SubGrupa1",
      amount: 0,
    },
    {
      groupid: 4,
      groupname: "Grupa4",
      subgroupid: 17,
      subgroupname: "SubGrupa17",
      amount: 0,
    }
  ];
  var groups = [];
  var subgroups = [];
  var newsubgroups = [];
  Functions.getGroups().then((value) => {
    groups = value;
    console.log("Groups are loaded: ", groups);
    Functions.getSubGroups().then((value) => {
      subgroups = value;
      console.log("Subgroups are loaded: ", subgroups);
      Functions.removeSubgroups({subgroups, records}).then((value) => {
        newsubgroups=value;
        console.log("Newsubgroups are created: ", newsubgroups);
        Functions.removeAllOptionsFromSelect("select_group").then(
          Functions.fillGroups(groups)
        );
        Functions.removeAllOptionsFromSelect("select_subgroup").then(
          Functions.fillSubGroups(newsubgroups)
        );
      });
    });
  });
  
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
    /*
    Functions.removeAllOptionsFromSelect("select_subgroup")
      .then(Functions.getSubGroups)
      .then((value) => Functions.fillSubGroups(value));
    */
  }

  function addRecord() {
    var tmpGroup = document.getElementById("select_group").value;
    var tmpSubGroup = document.getElementById("select_subgroup").value;
    console.log(tmpGroup, tmpSubGroup);
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

      <div id="table" className={showIncome ? "Hidden" : "Show-Block"}>
        <table className="expenses ">
          <thead>
            <tr>
              <th>Group</th>
              <th>Subgroup</th>
              <th>Amount</th>
              <th>Add record/value</th>
              <th>Delete record</th>
            </tr>
          </thead>
          <tbody id="records">
            <tr>
              <td>
                <select
                  className="width_200"
                  id="select_group"
                  onChange={changeGroup}
                ></select>
              </td>
              <td>
                <select className="width_200" id="select_subgroup"></select>
              </td>
              <td>
                <input
                  type="number"
                  id="amount"
                  className="width_100 right"
                  defaultValue="0.00"
                ></input>
              </td>
              <td>
                <button className="main" type="button" onClick={addRecord}>
                  Add
                </button>
              </td>
              <td></td>
            </tr>
          </tbody>
        </table>
      </div>

      <Child tmpUser={tmpUser} groups={groups} subgroups={subgroups} records={records}/>
      <Records records={records} />
    </div>
  );
}

class Records extends Component {
  componentDidMount() {
    let records = this.props.records;
    console.log("Records: ", records);
    let no = 0;
    records.forEach((element) => {
      var tr = document.createElement("tr");
      var td1 = document.createElement("td");
      var label1 = document.createElement("label");
      label1.innerHTML = element.groupname;
      td1.appendChild(label1);
      tr.appendChild(td1);
      var td2 = document.createElement("td");
      var label2 = document.createElement("label");
      label2.innerHTML = element.subgroupname;
      td2.appendChild(label2);
      tr.appendChild(td2);
      var td3 = document.createElement("td");
      var label3 = document.createElement("label");
      label3.innerHTML = String(element.amount);
      td3.appendChild(label3);
      tr.appendChild(td3);
      var td4 = document.createElement("td");
      var input = document.createElement("input");
      input.defaultValue = 0;
      input.type = "number";
      input.id = "amount" + String(no);
      input.className = "width_100 right";
      td4.appendChild(input);
      var button1 = document.createElement("button");
      button1.className = "main";
      button1.type = "button";
      button1.innerHTML = "Add";
      td4.appendChild(button1);
      tr.appendChild(td4);
      var td5 = document.createElement("td");
      var button2 = document.createElement("button");
      button2.className = "main";
      button2.type = "button";
      button2.innerHTML = "Delete";
      td5.appendChild(button2);
      tr.appendChild(td5);

      var recs = document.getElementById("records");
      recs.appendChild(tr);
      no = no + 1;
    });
  }

  render() {
    return null;
  }
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
    console.log("Child was updated. Props: ", this.props);

    /*
    Functions.removeGroupsAndSubgroups(this.props.groups, this.props.subgroups, this.props.records).then((value) => {
      Functions.fillGroups(this.props.groups);
      Functions.fillSubGroups(this.props.subgroups);
    });
    */
  }

  componentWillUnmount() {
    console.log("Child was Unmounted");
  }

  render() {
    return null;
  }
}

export default EntryArea2;
