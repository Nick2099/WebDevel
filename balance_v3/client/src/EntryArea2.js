import React, { useState, useContext, Component } from "react";
import "./App.css";
// import Axios from "axios";
import { TmpUserContext } from "./TmpUserContext";
import * as Functions from "./Functions";

function EntryArea2() {
  const [tmpUser] = useContext(TmpUserContext);
  const [showIncome, setShowIncome] = useState(true);

  let record = {
    id: 0,
    recid: 0,
    userid: 0,
    locuser: 0,
    date: "",
    place: "",
    totinc: 0,
    totexp: 0,
  };
  let records = [];
  var groups = [];
  var subgroups = [];
  var newsubgroups = [];

  Functions.getGroups().then((value) => {
    groups = value;
    console.log("Groups are loaded: ", groups);
    Functions.getSubGroups().then((value) => {
      subgroups = value;
      console.log("Subgroups are loaded: ", subgroups);
      Functions.removeSubgroups({ subgroups, records }).then((value) => {
        newsubgroups = value;
        console.log("Newsubgroups are created: ", newsubgroups);
        Functions.removeAllOptionsFromSelect("select_group").then(
          Functions.fillGroups(groups)
        );
        Functions.removeAllOptionsFromSelect("select_subgroup").then(
          (value) => {
            let tmpGroup = document.getElementById("select_group").value;
            Functions.getUsedSubGroups({ newsubgroups, tmpGroup }).then(
              (value) => {
                Functions.fillSubGroups(value);
              }
            );
          }
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
    Functions.removeAllOptionsFromSelect("select_subgroup").then((value) => {
      let tmpGroup = document.getElementById("select_group").value;
      Functions.getUsedSubGroups({ newsubgroups, tmpGroup }).then((value) => {
        Functions.fillSubGroups(value);
      });
    });
  }

  function addRecord() {
    var tmpGroup = Number(document.getElementById("select_group").value);
    var sel1 = document.getElementById("select_group");
    var tmpGroupName= sel1.options[sel1.selectedIndex].text;
    var tmpSubGroup = Number(document.getElementById("select_subgroup").value);
    var sel2 = document.getElementById("select_subgroup");
    var tmpSubGroupName = sel2.options[sel2.selectedIndex].text;
    var lastRecord = records.length;
    let isMain = false;
    console.log("names: ", tmpGroupName, tmpSubGroupName);

    if (lastRecord === 0) {
      record.userid = tmpUser.id;
      let totamount = Number(document.getElementById("totamount").value);
      if (showIncome) {
        record.totinc = totamount;
        record.totexp = 0;
      } else {
        record.totinc = 0;
        record.totexp = totamount;
      }
      record.locuser = Number(document.getElementById("select_person").value);
      record.date = document.getElementById("select_date").value;
      record.place = document.getElementById("place").value;
      document.getElementById("amount").readOnly=false;
      document.getElementById("select_date").readOnly=true;
      document.getElementById("place").readOnly=true;
      document.getElementById("totamount").readOnly=true;
      isMain = true;
    }

    records.push({
      groupid: tmpGroup,
      subgroupid: tmpSubGroup,
      amount: document.getElementById("amount").value,
      groupname: tmpGroupName,
      subgroupname: tmpSubGroupName,
      main: isMain
    });

    lastRecord = records.length - 1;
    Functions.showNewRecord({ data: records[lastRecord], no: lastRecord });
    setNewGroupsAndSubgroups();
  }

  function setNewGroupsAndSubgroups() {
    Functions.removeSubgroups({ subgroups, records }).then((value) => {
      newsubgroups = value;
      console.log("Newsubgroups are created: ", newsubgroups);
      Functions.removeAllOptionsFromSelect("select_group").then(
        Functions.fillGroups(groups)
      );
      Functions.removeAllOptionsFromSelect("select_subgroup").then(
        (value) => {
          let tmpGroup = document.getElementById("select_group").value;
          Functions.getUsedSubGroups({ newsubgroups, tmpGroup }).then(
            (value) => {
              Functions.fillSubGroups(value);
            }
          );
        }
      );
    });
  }

  function totamountChange() {
    var tmp = document.getElementById("totamount").value;
    var tmpElement = document.getElementById("amount");
    if (records.length === 0) {
      tmpElement.readOnly = true;
      tmpElement.value = tmp;
    } else {
      tmpElement.readOnly = false;
    }
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
          onChange={totamountChange}
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

      <Child
        tmpUser={tmpUser}
        groups={groups}
        subgroups={subgroups}
        records={records}
      />
      <Records records={records} />
    </div>
  );
}

class Records extends Component {
  componentDidMount() {
    console.log("Records were mounted!");
  }

  componentDidUpdate() {
    console.log("Records were updated");
  }

  componentWillUnmount() {
    console.log("Records were Unmounted");
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
  }

  componentWillUnmount() {
    console.log("Child was Unmounted");
  }

  render() {
    return null;
  }
}

export default EntryArea2;
