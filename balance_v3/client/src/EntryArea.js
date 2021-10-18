import React, {useContext} from "react";
import './App.css';
import {TmpUserContext} from "./TmpUserContext";
import {Dropdown} from "./Dropdown";

function EntryArea() {
  const [tmpUser, setTmpUser] = useContext(TmpUserContext);

  return(
    <div>
      <h2>Enter items</h2>
      <label>Person</label>
      <Dropdown id="Person" options={[{value: "1", name:"Jedan"}, {value:"2", name:"Dva"}]} />
      </div>
  )
}

export default EntryArea;