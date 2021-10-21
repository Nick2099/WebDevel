import React, {useContext} from "react";
import './App.css';
import {TmpUserContext} from "./TmpUserContext";
import {Dropdown} from "./Dropdown";

function EntryArea() {
  // const [tmpUser, setTmpUser] = useContext(TmpUserContext);
  console.log("dodavanje EntryArea u funkciji");
  return(
    <div>
      <h2>Enter items</h2>
      <div id="Person">
      </div>
      <Dropdown id="PersonDD" linkto="Person" options={[{value: "1", name:"Jedan"}, {value:"2", name:"Dva"}]} />
    </div>
  )
}

export default EntryArea;