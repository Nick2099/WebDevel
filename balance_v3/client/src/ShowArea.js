import React, {
  useState,
  useContext,
  useEffect,
  useRef,
  createElement,
  // Component,
} from "react";
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

  useEffect(() => {
    getAllLocalUsers();
    addMonths();
    addYears();
  }, []);

  function getAllLocalUsers() {
    Functions.getAllLocalUsers(tmpUser.userid).then((value) => {
      Functions.addAllLocalUsers(value.data, tmpUser.id, tmpUser.admin).then((value) => {
        noOfLocalUsers = value.noOfLocalUsers;
      });
    });
  }

  function addMonths() {
    for (let i = 0; i < months.length; i++) {
      let opt = document.createElement("option");
      opt.innerHTML = months[i];
      opt.value = i + 1;
      document.getElementById("select_month").appendChild(opt);
    }
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
    for (let i=0; i<noOfLocalUsers; i++) {
      let tmpLocalUserId = document.getElementById("id"+i).value;
      let tmpLocalUserIdChoosen = document.getElementById("id"+i).checked;
      if (tmpLocalUserIdChoosen) {
        choosenLocalUserIds.push(tmpLocalUserId);
      }
    }
    let choosenPeriod = document.getElementById("select_period").value;
    let choosenMonth = document.getElementById("select_month").value;
    let choosenYear = document.getElementById("select_year").value;
    Functions.getShowForChoosen(choosenLocalUserIds, choosenPeriod, choosenMonth, choosenYear);
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
                  defaultValue={"1"}
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
              <td>
                <button type="button" id="button_show" onClick={showChoosen}>Show</button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default ShowArea;
