import React, {
  useState,
  useContext,
  useEffect,
  useRef,
  createElement,
  PureComponent,
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
import Axios from "axios";
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
    { date: "2022-04-03", Default: 20, pv: 28, amt: 22 },
    { date: "2022-04-04", Default: 27, pv: 29, amt: 20 },
    { date: "2022-04-05", Default: 18, pv: 18, amt: 21 },
    { date: "2022-04-06", Default: 23, pv: 28, amt: 25 },
    { date: "2022-04-07", Default: 34, pv: 23, amt: 21 },
  ];

  const [state1, setState1] = useState([]);

  useEffect(() => {
    getAllLocalUsers();
    addMonths();
    addYears();
    Functions.getGroups(tmpUser.userid).then((value) => {
      groups.current = value;
      addGroups();
    });
    setState1(dataTemplate);
    console.log("Run Once!");
  }, []);

  useEffect(() => {
    console.log("setState1 new! ", state1);
  }, [state1]);

  function getAllLocalUsers() { // ERROR !!!!!!!!!!!
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
      let tmpLocalUserIdChoosen = document.getElementById("localUserId" + i).checked;
      if (tmpLocalUserIdChoosen) {
        choosenLocalUserIds.push(tmpLocalUserId);
      };
    };
    let choosenPeriod = document.getElementById("select_period").value;
    let choosenMonth = document.getElementById("select_month").value;
    let choosenYear = document.getElementById("select_year").value;
    let choosenTemplate = document.querySelector(
      'input[name="select_template"]:checked'
    ).value;
    let choosenGroup = document.getElementById("select_group").value;
    Functions.getSubGroupsForShow(tmpUser.id, choosenGroup).then((value1) => {
      if (value1.status === "OK") {
        // console.log("1 dio, value1:", value1);
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
            // console.log("2 dio, value2:", value2);
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
                setState1(value3.data);
              };
            });
          };
        });
      }
    });
    // LineChart();
  }

  const MyLineChart = function (props) {
    console.log("MyLineChart tmp: ", props);
    return (
      <ResponsiveContainer width="100%" aspect={3}>
        <LineChart
          width={600}
          height={400}
          data={props.data}
          margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="date" />
          <YAxis />
          <Tooltip />
          <Line
            type="monotone"
            dataKey="Default"
            stroke="red"
            fill="#yellow"
          />{" "}
          <Line
            type="monotone"
            dataKey="pv"
            stroke="green"
            fill="#yellow"
          />{" "}
          <Line
            type="monotone"
            dataKey="amt"
            stroke="blue"
            fill="#yellow"
          />{" "}
        </LineChart>
      </ResponsiveContainer>
    );
  };

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
                <input type="radio" name="select_template" value="1"></input>
                <label>Selected group</label>
                <select id="select_group"></select>
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
        <MyLineChart data={state1}/>
      </div>
    </div>
  );
}

export default ShowArea;
