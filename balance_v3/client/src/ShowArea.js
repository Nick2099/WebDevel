import React, {
  useState,
  useContext,
  useEffect,
  useRef,
  // Component,
} from "react";
import "./App.css";
import Axios from "axios";
import { TmpUserContext } from "./TmpUserContext";
import * as Functions from "./Functions";

function ShowArea() {
  const [tmpUser] = useContext(TmpUserContext);

  useEffect(() => {
    getAllLocalUsers();
  }, []);

  function getAllLocalUsers() {
    Functions.getAllLocalUsers(tmpUser.userid).then((value) => {
      console.log("All local users: ", value);
      Functions.addAllLocalUsers(value.data);
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
          <tbody id="allLocalUsers">
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default ShowArea;
