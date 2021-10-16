import React, {useContext} from "react";
import './App.css';
import {TmpUserContext} from "./TmpUserContext";

function EntryArea() {
  const [tmpUser, setTmpUser] = useContext(TmpUserContext);

  return(
    <div>
      <h2>Enter items</h2>
      <label>Person</label>
      <select id="locuser">
        <option>{tmpUser.name}</option>
      </select>
      </div>
  );
}

export default EntryArea;