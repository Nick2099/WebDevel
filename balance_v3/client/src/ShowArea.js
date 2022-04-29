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
  var noOfLocalUsers = 0;
  const groups = useRef([]);
  const data = [
    {
      name: "Page A",
      uv: 4000,
      pv: 2400,
      amt: 2400,
    },
    {
      name: "Page B",
      uv: 3000,
      pv: 1398,
      amt: 2210,
    },
    {
      name: "Page C",
      uv: 2000,
      pv: 9800,
      amt: 2290,
    },
    {
      name: "Page D",
      uv: 2780,
      pv: 3908,
      amt: 2000,
    },
    {
      name: "Page E",
      uv: 1890,
      pv: 4800,
      amt: 2181,
    },
    {
      name: "Page F",
      uv: 2390,
      pv: 3800,
      amt: 2500,
    },
    {
      name: "Page G",
      uv: 3490,
      pv: 4300,
      amt: 2100,
    },
  ];

  useEffect(() => {
    getAllLocalUsers();
    addMonths();
    addYears();
    Functions.getGroups(tmpUser.userid).then((value) => {
      groups.current = value;
      addGroups();
    });
  }, []);

  function getAllLocalUsers() {
    Functions.getAllLocalUsers(tmpUser.userid).then((value) => {
      Functions.addAllLocalUsers(value.data, tmpUser.id, tmpUser.admin).then(
        (value) => {
          noOfLocalUsers = value.noOfLocalUsers;
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
    for (let i = 0; i < noOfLocalUsers; i++) {
      let tmpLocalUserId = document.getElementById("id" + i).value;
      let tmpLocalUserIdChoosen = document.getElementById("id" + i).checked;
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
    Functions.getSubGroupsForShow(tmpUser.id, choosenGroup).then((value) => {
      if (value.status==="OK") {
        let choosenSubGroups = value.data;
        console.log("subGroups for group", choosenGroup, ":", value.data);
        Functions.getShowForChoosen(
          choosenLocalUserIds,
          choosenPeriod,
          choosenMonth,
          choosenYear,
          choosenTemplate,
          choosenGroup
        ).then((value) => {
          if (value.status === "OK") {
            Functions.prepareDataForGraph(
              choosenLocalUserIds,
              choosenPeriod,
              choosenMonth,
              choosenYear,
              choosenTemplate,
              choosenGroup,
              value.data,
              choosenSubGroups,
              groups.current
            );
          };
        });
      }
    });
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
        <ResponsiveContainer width="100%" aspect={3}>
          <LineChart
            width={1000}
            height={300}
            data={data}
            margin={{
              top: 5,
              right: 30,
              left: 20,
              bottom: 5,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line
              type="monotone"
              dataKey="pv"
              stroke="yellow"
              activeDot={{ r: 8 }}
            />
            <Line type="monotone" dataKey="uv" stroke="white" />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

export default ShowArea;
