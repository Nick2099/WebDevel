import React, {
  useState,
  useContext,
  useEffect,
  useRef,
  // Component //
} from "react";
import "./App.css";
import Axios from "axios";
import { TmpUserContext } from "./TmpUserContext";
import * as Functions from "./Functions";

function EntryArea() {
  const [tmpUser] = useContext(TmpUserContext);
  const [showIncome, setShowIncome] = useState(1);
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
    type: 0,
    cur: "",
  };
  let records = [];
  var newgroups = [];

  var tmpDate = new Date();
  var currentDate = tmpDate.toISOString().substring(0, 10);
  var tmpDateValue = "";

  useEffect(() => {
    getLocalUsers();
    Functions.getGroups(tmpUser.userid).then((value) => {
      groups.current = value;
      Functions.getSubGroups(tmpUser.userid).then((value) => {
        subgroups.current = value;
        Functions.getTransferSubGroupsNames(tmpUser.id, tmpUser.userid).then(
          (value) => {
            Functions.joinSubGroups(subgroups.current, value).then((value) => {
              subgroups.current = value;
              Functions.removeSubgroups({
                subgroups: subgroups.current,
                records,
              }).then((value) => {
                newsubgroups.current = value;
                Functions.removeAllOptionsFromSelect("select_group").then(
                  Functions.fillGroups({
                    newgroups: groups.current,
                    choosenentry: showIncome,
                  }).then((value) => {
                    if (value) {
                      document.getElementById(
                        "button_addRecord"
                      ).disabled = false;
                    } else {
                      document.getElementById(
                        "button_addRecord"
                      ).disabled = true;
                    }
                    Functions.setTmpGroup(choosengroup.current);
                  })
                );
                Functions.removeAllOptionsFromSelect("select_subgroup").then(
                  (value) => {
                    let tmpGroup =
                      document.getElementById("select_group").value;
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
          }
        );
      });
    });
  }, []); //this runs only once because of empty parameters []

  function getLocalUsers() {
    var opt = document.createElement("option");
    opt.innerHTML = tmpUser.name;
    opt.value = tmpUser.id;
    opt.setAttribute("selected", true);
    var sel = document.getElementById("select_person");
    sel.appendChild(opt);
  }

  function incexpChange() {
    setShowIncome(document.querySelector('input[name="incexp"]:checked').value);
  }

  useEffect(() => {
    record.type = Number(showIncome);
    setNewGroupsAndSubgroups();
  }, [showIncome]);

  function checkDate() {
    var tmpDate1 = String(document.getElementById("select_date").value);
    if (tmpDate1.length === 0) {
      document.getElementById("select_date").value = tmpDateValue;
    } else {
      tmpDateValue = tmpDate1;
    };
    Functions.dateRangeCheck(tmpDateValue).then((value) => {
      if (value.status==="Change") {
        document.getElementById("select_date").value=value.newDate;
      };
    });
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
        record.userid = tmpUser.userid;
        record.locuser = Number(document.getElementById("select_person").value);
        record.date = document.getElementById("select_date").value;
        record.place = document.getElementById("place").value;
        record.type = Number(showIncome);
        record.cur = tmpUser.cur;
        document.getElementById("amount").readOnly = false;
        document.getElementById("select_date").readOnly = true;
        document.getElementById("place").readOnly = true;
        document.getElementById("totamount").readOnly = true;
        document.getElementById("inc").disabled = true;
        document.getElementById("exp").disabled = true;
        document.getElementById("cto").disabled = true;
        isMain = true;
      }
      let tmpAmount = Number(document.getElementById("amount").value);
      if (records.length > 0) {
        let tmpRest = Number(document.getElementById("lab_amount0").innerHTML);
        if (tmpAmount > tmpRest) {
          tmpAmount = tmpRest;
        }
      }
      let comment = document.getElementById("comment").value;
      records.push({
        groupid: tmpGroup,
        subgroupid: tmpSubGroup,
        amount: tmpAmount,
        groupname: tmpGroupName,
        subgroupname: tmpSubGroupName,
        main: isMain,
        comment: comment,
      });
      lastRecord = records.length - 1;
      showRecord({ data: records[lastRecord], no: lastRecord });
      document.getElementById("comment").value = "";
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
      document.getElementById("inc").disabled = false;
      document.getElementById("exp").disabled = false;
      document.getElementById("cto").disabled = false;
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
    Functions.removeSubgroups({
      subgroups: subgroups.current,
      records,
    }).then((value) => {
      newsubgroups.current = value;
      Functions.removeGroups({
        groups: groups.current,
        newsubgroups: newsubgroups.current,
      }).then((value) => {
        newgroups = value;
        Functions.removeAllOptionsFromSelect("select_group").then(
          Functions.fillGroups({
            newgroups: newgroups,
            choosenentry: showIncome,
          }).then((value) => {
            if (value) {
              document.getElementById("button_addRecord").disabled = false;
            } else {
              document.getElementById("button_addRecord").disabled = true;
            }
            Functions.setTmpGroup(choosengroup.current);
          })
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
  }

  function totAmountFocusOut() {
    var tmp = Number(document.getElementById("totamount").value);
    document.getElementById("totamount").value = tmp.toFixed(2);
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
    Functions.createRecordsIfTranfer(record, records).then((value) => {
      // saving only for transfer - It's not working if there are more than 1 row
      if (value.records.length > 0) {
        Axios.post("http://localhost:3001/saverecords2", {
          record: value.record,
          records: value.records,
        }).then(function (response) {
          if (response.data.status === "Error") {
            alert(response.data.error);
          }
        });
      } else {
        // if there is nothing to save
        // console.log("Nothing to save for transfer records!");
      }
    });
    if (records.length > 0) {
      Axios.post("http://localhost:3001/saverecords2", {
        record: record,
        records: records,
      }).then(function (response) {
        if (response.data.status === "Error") {
          alert(response.data.error);
        }
        // setting value to 0
        record = {
          id: 0,
          recid: 0,
          userid: 0,
          locuser: 0,
          date: "",
          place: "",
          type: 0,
          cur: "",
          comment: "",
        };
        records = [];
        // setting new data and visiablity
        document.getElementById("place").value = "";
        document.getElementById("totamount").value = (0).toFixed(2);
        document.getElementById("amount").readOnly = true;
        document.getElementById("select_date").readOnly = false;
        document.getElementById("place").readOnly = false;
        document.getElementById("totamount").readOnly = false;
        document.getElementById("inc").disabled = false;
        document.getElementById("exp").disabled = false;
        document.getElementById("cto").disabled = false;

        removeRows();
        setNewGroupsAndSubgroups();
        records.forEach((tmpRecord, index) => {
          showRecord({ data: tmpRecord, no: index });
        });
      });
    } else {
      // if there is nothing to save
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
          value="2"
          onChange={incexpChange}
        ></input>
        <label>Income</label> {/* gr=1   type=2 */}
        <input
          type="radio"
          id="exp"
          name="incexp"
          value="1"
          onChange={incexpChange}
          defaultChecked
        ></input>
        <label>Expense</label> {/* gr=>10   type=1 */}
        <input
          type="radio"
          id="tra"
          name="incexp"
          value="3"
          onChange={incexpChange}
        ></input>
        <label>Transfer</label> {/* gr=3   type=3 */}
        {/*    Transfer income      gr=4   type=4 */}
        <input
          type="radio"
          id="cto"
          name="incexp"
          value="9"
          onChange={incexpChange}
        ></input>
        <label>Conto</label> {/* gr=2   type=9 */}
        {/*    Balance           gr=?   type=8 */}
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

      {/* 
      <div id="div_entries">
        <h2>{showIncome ? "Income" : "Expense"}</h2>
      </div>
      */}

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
          onBlur={totAmountFocusOut}
        ></input>
      </div>

      <div id="table_expenses">
        <table className="expenses">
          <thead>
            <tr>
              <th>Group</th>
              <th>Subgroup</th>
              <th>Comment</th>
              <th>Amount</th>
              <th>Add</th>
              <th>Delete</th>
              {/* <th>Recuring</th> */}
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
                <textarea
                  id="comment"
                  name="comment"
                  rows="3"
                  cols="25"
                  maxLength="100"
                ></textarea>
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
                <button
                  className="main"
                  type="button"
                  id="button_addRecord"
                  onClick={addRecord}
                >
                  Add record
                </button>
              </td>
              <td></td>
              {/* <td></td> */}
            </tr>
          </tbody>
        </table>
      </div>

      <div>
        <button className="main" type="button" onClick={saveRecord}>
          Save
        </button>
      </div>
      {/* <Child tmpUser={tmpUser} /> */}
    </div>
  );
}

/*    // Not needed at the moment
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
*/

export default EntryArea;
