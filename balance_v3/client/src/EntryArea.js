import React, {
  useState,
  useContext,
  useEffect,
  useRef,
  Component,
} from "react";
import "./App.css";
import Axios from "axios";
import { TmpUserContext } from "./TmpUserContext";
import * as Functions from "./Functions";

function EntryArea() {
  const [tmpUser] = useContext(TmpUserContext);
  const [showIncome, setShowIncome] = useState(true);
  const groups = useRef([]);
  const subgroups = useRef([]);
  const newsubgroups = useRef([]);
  const choosengroup = useRef(0);

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
  // var groups = [];
  var newgroups = [];
  // var subgroups = [];
  // var newsubgroups = [];

  var tmpDate = new Date();
  var currentDate = tmpDate.toISOString().substring(0, 10);
  var tmpDateValue = "";

  useEffect(() => {
    getLocalUsers();
    Functions.getGroups().then((value) => {
      groups.current = value;
      console.log("Groups are loaded: ", groups.current);
      Functions.getSubGroups().then((value) => {
        subgroups.current = value;
        console.log("Subgroups are loaded: ", subgroups.current);
        Functions.removeSubgroups({
          subgroups: subgroups.current,
          records,
        }).then((value) => {
          newsubgroups.current = value;
          console.log("Newsubgroups are created: ", newsubgroups.current);
          Functions.removeAllOptionsFromSelect("select_group").then(
            Functions.fillGroups(groups.current)
          );
          Functions.removeAllOptionsFromSelect("select_subgroup").then(
            (value) => {
              let tmpGroup = document.getElementById("select_group").value;
              Functions.getUsedSubGroups({
                newsubgroups: newsubgroups.current,
                tmpGroup,
              }).then((value) => {
                Functions.fillSubGroups(value);
              });
            }
          );
        });
      });
    });
  }, []); //this runs only once because of empty parameters []

  function getLocalUsers() {
    var opt = document.createElement("option");
    opt.innerHTML = tmpUser.name;
    opt.value = 0;
    opt.setAttribute("selected", true);
    var sel = document.getElementById("select_person");
    sel.appendChild(opt);
  }

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
      choosengroup.current = document.getElementById("select_group").value;
      Functions.getUsedSubGroups({
        newsubgroups: newsubgroups.current,
        tmpGroup: choosengroup.current,
      }).then((value) => {
        Functions.fillSubGroups(value);
      });
    });
  }

  function addRecord() {
    var tmpGroup = Number(document.getElementById("select_group").value);
    var sel1 = document.getElementById("select_group");
    var tmpGroupName = sel1.options[sel1.selectedIndex].text;
    var tmpSubGroup = Number(document.getElementById("select_subgroup").value);
    var sel2 = document.getElementById("select_subgroup");
    var tmpSubGroupName = sel2.options[sel2.selectedIndex].text;
    var lastRecord = records.length;
    let isMain = false;
    let totamount = Number(document.getElementById("totamount").value);
    document.getElementById("totamount").value = totamount.toFixed(2);

    if (totamount <= 0) {
      alert("Total amount can't be smaller or equal to 0 !");
    } else {
      if (lastRecord === 0) {
        record.userid = tmpUser.id;
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
        document.getElementById("amount").readOnly = false;
        document.getElementById("select_date").readOnly = true;
        document.getElementById("place").readOnly = true;
        document.getElementById("totamount").readOnly = true;
        isMain = true;
      }
      let tmpAmount = Number(document.getElementById("amount").value);
      if (records.length > 0) {
        let tmpRest = Number(document.getElementById("lab_amount0").innerHTML);
        if (tmpAmount > tmpRest) {
          tmpAmount = tmpRest;
        }
      }
      records.push({
        groupid: tmpGroup,
        subgroupid: tmpSubGroup,
        amount: tmpAmount,
        groupname: tmpGroupName,
        subgroupname: tmpSubGroupName,
        main: isMain,
      });
      lastRecord = records.length - 1;
      showRecord({ data: records[lastRecord], no: lastRecord });
      setNewGroupsAndSubgroups();
      recalculateFirstRecordValue();
      document.getElementById("select_group").focus();
      document.getElementById("amount").value = (0).toFixed(2);
    }
  }

  function showRecord({ data, no }) {
    Functions.showNewRecord({ data: data, no: no }).then((tmpButton) => {
      if (no !== 0) {
        document.getElementById("addButton" + tmpButton).onclick = function () {
          addAmount(tmpButton);
        };
      }
      document.getElementById("delButton" + tmpButton).onclick = function () {
        delRecord(tmpButton);
      };
    });
  }

  function recalculateFirstRecordValue() {
    let tmpValue = Number(document.getElementById("totamount").value);
    let noOfRecords = records.length;
    for (let i = 1; i < noOfRecords; i++) {
      tmpValue = tmpValue - records[i].amount;
    }
    records[0].amount = tmpValue;
    document.getElementById("lab_amount0").innerHTML = tmpValue.toFixed(2);
  }

  function delRecord(props) {
    let tmpRecords = [];
    for (let i = 0; i < records.length; i++) {
      if (i !== Number(props)) {
        tmpRecords.push(records[i]);
      }
    }
    records = tmpRecords;
    if (records.length > 0) {
      recalculateFirstRecordValue();
    } else {
      document.getElementById("amount").readOnly = true;
      let tmpTotAmount = Number(
        document.getElementById("totamount").value
      ).toFixed(2);
      document.getElementById("amount").value = String(tmpTotAmount);
      document.getElementById("select_date").readOnly = false;
      document.getElementById("place").readOnly = false;
      document.getElementById("totamount").readOnly = false;
    }
    removeRows();
    setNewGroupsAndSubgroups();
    records.forEach((tmpRecord, index) => {
      showRecord({ data: tmpRecord, no: index });
    });
  }

  function removeRows() {
    while (document.getElementById("row_record") != null) {
      document.getElementById("row_record").remove();
    }
  }

  function addAmount(props) {
    let tmpRecord = Number(props);
    let tmpValue = records[tmpRecord].amount;
    let tmpAddValue = Number(
      document.getElementById("inp_amount" + String(tmpRecord)).value
    );
    let tmpRest = Number(document.getElementById("lab_amount0").innerHTML);
    if (tmpAddValue < tmpRest) {
      records[tmpRecord].amount = tmpValue + tmpAddValue;
    } else {
      records[tmpRecord].amount = tmpValue + tmpRest;
    }
    if (records[tmpRecord].amount < 0) {
      alert("Amount can't be less than 0! It'll be changed to 0.");
      records[tmpRecord].amount = 0;
    }
    document.getElementById("lab_amount" + String(tmpRecord)).innerHTML =
      records[tmpRecord].amount.toFixed(2);
    document.getElementById("inp_amount" + String(tmpRecord)).value = 0;
    recalculateFirstRecordValue();
    document.getElementById("inp_amount" + String(tmpRecord)).focus();
  }

  function setNewGroupsAndSubgroups() {
    Functions.removeSubgroups({ subgroups: subgroups.current, records }).then(
      (value) => {
        newsubgroups.current = value;
        Functions.removeGroups({
          groups: groups.current,
          newsubgroups: newsubgroups.current,
        }).then((value) => {
          newgroups = value;
          Functions.removeAllOptionsFromSelect("select_group").then(
            Functions.fillGroups(newgroups).then(
              Functions.setTmpGroup(choosengroup.current)
            )
          );
          Functions.removeAllOptionsFromSelect("select_subgroup").then(
            (value) => {
              let tmpGroup = document.getElementById("select_group").value;
              Functions.getUsedSubGroups({
                newsubgroups: newsubgroups.current,
                tmpGroup,
              }).then((value) => {
                Functions.fillSubGroups(value);
              });
            }
          );
        });
      }
    );
  }

  function totamountChange() {
    var tmp = Number(document.getElementById("totamount").value);
    // document.getElementById("totamount").value = tmp.toFixed(2);
    var tmpElement = document.getElementById("amount");
    if (records.length === 0) {
      tmpElement.readOnly = true;
      tmpElement.value = tmp.toFixed(2);
    } else {
      tmpElement.readOnly = false;
    }
  }

  function saveRecord() {
    if (!showIncome && records.length > 0) {
      Axios.post("http://localhost:3001/saverecordsexp", {
        record: record,
        records: records
      }).then(function (response) {
        console.log("saveRecord response: ", response.data);
        if (response.data.status==="Error") {
          alert(response.data.error);
        };
        // setting value to 0
        record = {
          id: 0,
          recid: 0,
          userid: 0,
          locuser: 0,
          date: "",
          place: "",
          totinc: 0,
          totexp: 0,
        };
        records = [];

        document.getElementById("place").value="";
        document.getElementById("totamount").value=(0).toFixed(2);
        document.getElementById("amount").readOnly = true;
        document.getElementById("select_date").readOnly = false;
        document.getElementById("place").readOnly = false;
        document.getElementById("totamount").readOnly = false;

        removeRows();
        setNewGroupsAndSubgroups();
        records.forEach((tmpRecord, index) => {
          showRecord({ data: tmpRecord, no: index });
        });
    
      });
    } else {
      console.log("Nothing to save!");
    }
  }

  return (
    <div className="Entry" id="EntryArea">
      <h2>Insert your entries</h2>
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
        {/* autocomplete="off" */}
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

      <div id="table_expenses" className={showIncome ? "Hidden" : "Show-Block"}>
        <table className="expenses ">
          <thead>
            <tr>
              <th>Group</th>
              <th>Subgroup</th>
              <th>Amount</th>
              <th>Add record/amount</th>
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
                  Add record
                </button>
              </td>
              <td></td>
            </tr>
          </tbody>
        </table>
      </div>

      <div>
        <button className="main" type="button" onClick={saveRecord}>
          Save
        </button>
      </div>
      <Child tmpUser={tmpUser} />
    </div>
  );
}

class Child extends Component {
  componentDidMount() {
    // here I can put something that have to be done after component did mount
    console.log("Child was Mounted.");
  }

  componentDidUpdate() {
    console.log("Child was updated.");
  }

  componentWillUnmount() {
    console.log("Child was Unmounted.");
  }

  render() {
    return null;
  }
}

export default EntryArea;
