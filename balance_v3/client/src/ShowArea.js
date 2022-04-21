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
  const months = ["January", "February", "March", "April", "May", "Juni", "July", "August", "September", "October", "November", "December"];

  useEffect(() => {
    getAllLocalUsers();
    addMonths();
  }, []);

  function getAllLocalUsers() {
    Functions.getAllLocalUsers(tmpUser.userid).then((value) => {
      Functions.addAllLocalUsers(value.data, tmpUser.id, tmpUser.admin);
    });
  }

  function addMonths() {
    for (let i=0; i<months.length; i++) {
      let opt = document.createElement("option");
      opt.innerHTML = months[i];
      opt.value = i+1;
      document.getElementById("select_month").appendChild(opt);
    }
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
          <tbody id="allLocalUsers">
          </tbody>
        </table>
        <table>
          <tr>
            <th>Period</th>
            <td>
              <select id="select_period">
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
              <select id="select_month">
              </select>
            </td>
          </tr>
        </table>
      </div>
    </div>
  );
}

export default ShowArea;
