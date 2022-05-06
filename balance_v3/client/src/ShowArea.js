import React, {
  useState,
  useContext,
  useEffect,
  useRef,
  // createElement,
  // PureComponent,
  // Component,
} from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import "./App.css";
// import Axios from "axios";
import { TmpUserContext } from "./TmpUserContext";
import * as Functions from "./Functions";

function ShowArea() {
  const [tmpUser] = useContext(TmpUserContext);
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "Juni",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  const noOfLocalUsers = useRef(0);
  const groups = useRef([]);

  var dataTemplate = [
    { date: "2022-04-01", Default: 20, pv: 24, amt: 24 },
    { date: "2022-04-02", Default: 30, pv: 13, amt: 22 },
  ];

  const [lines, setLines] = useState([
    { name: "Default", stroke: "red"},
  ]);
  const [graphData, setGraphData] = useState([
    {date: "2022-04-01", Default: 0}
  ]);

  useEffect(() => {
    getAllLocalUsers();
    addMonths();
    addYears();
    Functions.getGroups(tmpUser.userid).then((value) => {
      groups.current = value;
      addGroups();
    });
    console.log("Run Once!");
  }, []);

  useEffect(() => {
    console.log("setGraphData new! ", graphData);
  }, [graphData]);

  useEffect(() => {
    console.log("setLines new! ", lines);
  }, [lines]);

  const linesOptions = lines.map((line, i) => {
    return (
      <Line key={"Line_"+i.toString()} type="monotone" dataKey={line.name} stroke={line.stroke} fill="#yellow" ></Line>
    );
  });

  function getAllLocalUsers() {
    Functions.getAllLocalUsers(tmpUser.userid).then((value) => {
      Functions.addAllLocalUsers(value.data, tmpUser.id, tmpUser.admin).then(
        (value) => {
          noOfLocalUsers.current = value.noOfLocalUsers;
        }
      );
    });
  }

  function addGroups() {
    for (let i = 0; i < groups.current.length; i++) {
      let opt = document.createElement("option");
      opt.innerHTML = groups.current[i].name;
      opt.value = groups.current[i].id;
      document.getElementById("select_group").appendChild(opt);
    }
  }

  function addMonths() {
    for (let i = 0; i < months.length; i++) {
      let opt = document.createElement("option");
      opt.innerHTML = months[i];
      opt.value = i + 1;
      document.getElementById("select_month").appendChild(opt);
    }
    let tmpMonth = new Date().getMonth() + 1;
    document.getElementById("select_month").value = tmpMonth;
  }

  function addYears() {
    Functions.getAllYears(tmpUser.id, tmpUser.userid, tmpUser.admin).then(
      (value) => {
        if (value.status === "OK") {
          for (let i = 0; i < value.data.length; i++) {
            let opt = document.createElement("option");
            opt.innerHTML = value.data[i].year;
            opt.value = value.data[i].year;
            document.getElementById("select_year").appendChild(opt);
          }
        } else {
          alert("Error in getAllYears: ", value.err);
        }
      }
    );
  }

  function selectPeriodChange() {
    let selectedPeriod = document.getElementById("select_period").value;
    if (selectedPeriod > 1) {
      document.getElementById("select_month").disabled = true;
    } else {
      document.getElementById("select_month").disabled = false;
    }
  }

  function showChoosen() {
    let choosenLocalUserIds = [];
    for (let i = 0; i < noOfLocalUsers.current; i++) {
      let tmpLocalUserId = document.getElementById("localUserId" + i).value;
      let tmpLocalUserIdChoosen = document.getElementById(
        "localUserId" + i
      ).checked;
      if (tmpLocalUserIdChoosen) {
        choosenLocalUserIds.push(tmpLocalUserId);
      }
    }
    let choosenPeriod = document.getElementById("select_period").value;
    let choosenMonth = document.getElementById("select_month").value;
    let choosenYear = document.getElementById("select_year").value;
    let choosenTemplate = document.querySelector(
      'input[name="select_template"]:checked'
    ).value;
    let choosenGroup = document.getElementById("select_group").value;
    Functions.getSubGroupsForShow(tmpUser.id, choosenGroup).then((value1) => {
      if (value1.status === "OK") {
        console.log("1 dio, value1:", value1);
        let choosenSubGroups = value1.data;
        Functions.getShowForChoosen(
          choosenLocalUserIds,
          choosenPeriod,
          choosenMonth,
          choosenYear,
          choosenTemplate,
          choosenGroup
        ).then((value2) => {
          if (value2.status === "OK") {
            console.log("2 dio, value2:", value2);
            Functions.prepareDataForGraph(
              choosenLocalUserIds,
              choosenPeriod,
              choosenMonth,
              choosenYear,
              choosenTemplate,
              choosenGroup,
              value2.data,
              choosenSubGroups,
              groups.current
            ).then((value3) => {
              console.log("3 dio, value3:", value3);
              if (value3.status === "OK") {
                setGraphData(value3.data);
                setLines(value3.lines);
              }
            });
          }
        });
      }
    });
    
  }

  const MyLineChart = function (props) {
    console.log("MyLineChart tmp: ", props);
    return (
      <ResponsiveContainer width="100%" aspect={2}>
        <LineChart
          width={600}
          height={600}
          data={props.data}
          margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="date" />
          <YAxis />
          <Tooltip />
          {linesOptions}
          { /* <Line type="monotone" dataKey="Default" stroke="red" fill="#yellow" /> */ }
        </LineChart>
      </ResponsiveContainer>
    );
  };

  function set_templete_1() {
    document.getElementById("select_group").checked = true;
  }

  return (
    <div id="ShowArea">
      <h2>Ballance sheets</h2>
      <div>
        <h3>Show data for:</h3>
        <table>
          <thead>
            <tr>
              <th>Person(s)</th>
            </tr>
          </thead>
          <tbody id="allLocalUsers"></tbody>
        </table>
        <table>
          <tbody>
            <tr>
              <th>Period</th>
              <td>
                <select
                  id="select_period"
                  onChange={selectPeriodChange}
                  defaultValue={"0"}
                >
                  <option value="0">Daily</option>
                  <option value="1">Weekly</option>
                  <option value="2">Monthly</option>
                  <option value="3">Quarterly</option>
                  <option value="4">Half-yearly</option>
                  <option value="5">Yearly</option>
                </select>
              </td>
            </tr>
            <tr>
              <th>Month</th>
              <td>
                <select id="select_month"></select>
              </td>
            </tr>
            <tr>
              <th>Year</th>
              <td>
                <select id="select_year"></select>
              </td>
            </tr>
            <tr>
              <th>Template</th>
              <td>
                <input
                  type="radio"
                  name="select_template"
                  value="0"
                  defaultChecked
                ></input>
                <label>All groups</label>
              </td>
            </tr>
            <tr>
              <td></td>
              <td>
                <input id="select_group" type="radio" name="select_template" value="1"></input>
                <label>Selected group</label>
                <select id="select_group" onFocus={set_templete_1}></select>
              </td>
            </tr>
            <tr>
              <td></td>
              <td>
                <input type="radio" name="select_template" value="2"></input>
                <label>Income/Expense/Transfer/Conto</label>
              </td>
            </tr>
            <tr>
              <td>
                <button type="button" id="button_show" onClick={showChoosen}>
                Show
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <div className="fullWidth">
        <MyLineChart data={graphData} lines={lines} />
      </div>
    </div>
  );
}

export default ShowArea;
