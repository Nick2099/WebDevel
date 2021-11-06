/*

import {useContext} from "react";
import './App.css';
import {TmpUserContext} from "./TmpUserContext";
// import {PageContentContext} from "./PageContentContext";
import {Dropdown, Option} from "./Dropdown";
// import* as Functions from "./Functions";

function EntryArea() {
  // const [tmpUser, setTmpUser] = useContext(TmpUserContext);  // CAN'T BE USED ==> ERROR
  // const [page] = useContext(PageContentContext);

  var h2 = document.createElement('h2');
  h2.id = 'EntryArea_H2';
  h2.innerHTML = 'Insert your entries';
  document.getElementById("EntryArea").appendChild(h2);
  var div_1 = document.createElement('div');
  div_1.id = 'div_person';
  document.getElementById("EntryArea").appendChild(div_1);

  Dropdown({
    id: "PersonDD", name: "Person",
    options: [{value: 1, name: "Jedan"}, {value: 2, name:"Dva"}],
    labelwidth: "100px", width: "200px", addto:"div_person", selected: 2
  });

  var div_2 = document.createElement('div');
  div_2.id = 'div_date';
  document.getElementById("EntryArea").appendChild(div_2);
  var date_label = document.createElement('label');
  date_label.id = 'date_label';
  date_label.style.width = '100px';
  date_label.innerHTML = "Date";
  document.getElementById("div_date").appendChild(date_label);
  var tmpDate = new Date();
  var currentDate = tmpDate.toISOString().substring(0,10);
  var currentTime = tmpDate.toISOString().substring(11,16);
  var tmpDateIso = tmpDate.toISOString();
  var tmpDateIso10 = String(tmpDateIso.slice(0, 10));
  console.log("tmpDate: ", tmpDate, tmpDateIso, tmpDateIso10);
  var date_input = document.createElement('input');
  date_input.id = "date_input";
  date_input.type = "date";
  date_input.name = "date_input";
  date_input.value = currentDate;
  date_input.style.width = "195px";
  // date_input.addEventListener("change", checkDate);
  document.getElementById("div_date").appendChild(date_input);
  
  var div_4 = document.createElement('div');
  div_4.id = 'div_button';
  document.getElementById("EntryArea").appendChild(div_4);
  
  var button_4 = document.createElement('button');
  button_4.innerHTML = 'Add';
  button_4.onclick = getButton_4value;
  div_4.appendChild(button_4);

  function getButton_4value() {
    var selectedPerson = Option('PersonDD');
    var selectedDate = document.getElementById("date_input").value;
    console.log("Add:", selectedPerson, ":", selectedDate, ":", selectedDate.length);
    if (selectedDate.length===0) {
      alert("Date is not valid!");
    } else {
      return {person: selectedPerson, date: selectedDate};
    }
  } 

  return null;
}


export default EntryArea;


*/