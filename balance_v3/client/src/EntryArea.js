// import {useContext} from "react";
import './App.css';
// import {TmpUserContext} from "./TmpUserContext";
//import {PageContentContext} from "./PageContentContext";
import {Dropdown} from "./Dropdown";

function EntryArea() {
  // const [tmpUser, setTmpUser] = useContext(TmpUserContext); CAN'T BE USED ==> ERROR
  // const [page] = useContext(PageContentContext);

  console.log("dodavanje EntryArea u funkciji");

  var h2 = document.createElement('h2');
  h2.id = 'EntryArea_H2';
  h2.innerHTML = 'Insert your entries';
  document.getElementById("EntryArea").appendChild(h2);
  var div = document.createElement('div');
  div.id = 'div_entries';
  document.getElementById("EntryArea").appendChild(div);

  console.log("trebalo bi biti dodano");

  Dropdown("PersonDD","Person", [{value: "1", name:"Jedan"}, {value:"2", name:"Dva"}], "300px");

  return null;
}

export default EntryArea;

// <Dropdown id="PersonDD" linkto="Person" options={[{value: "1", name:"Jedan"}, {value:"2", name:"Dva"}]} />

/*
function EntryArea() {
  // const [tmpUser, setTmpUser] = useContext(TmpUserContext); CAN'T BE USED ==> ERROR
  console.log("dodavanje EntryArea u funkciji");
  return(
    <div>
      <h2>Enter items</h2>
      <div id="Person">
      </div>
    </div>
  )
}
*/