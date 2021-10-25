// import React, {useState, useContext, useEffect} from "react";
import './App.css';
// import {TmpUserContext} from "./TmpUserContext";
// import {PageContentContext} from "./PageContentContext";
import {Dropdown, Option} from "./Dropdown";
import* as Functions from "./Functions";

function EntryArea() {
  // const [tmpUser, setTmpUser] = useContext(TmpUserContext); // CAN'T BE USED ==> ERROR
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
    options: [{value: "1", name:"Jedan"}, {value:"2", name:"Dva"}],
    width: "200px", addto:"div_person"
  });

  var div_2 = document.createElement('div');
  div_2.id = 'div_date';
  document.getElementById("EntryArea").appendChild(div_2);
  
  var tmpDate = new Date();
  var tmpDateNoTime = Functions.NoTimeDate(tmpDate);
  var noOfDaysInMonth = Functions.getDaysInMonth(tmpDate);
  var allDays = Functions.allDaysArray(noOfDaysInMonth);
  var allDaysForSelect = Functions.allDaysForSelect(allDays);
  
  var p2_tmp = document.createElement('p');
  p2_tmp.innerHTML = 'Date: ' + tmpDate +" "+tmpDateNoTime+" "+noOfDaysInMonth + " "+allDays;
  div_2.appendChild(p2_tmp);

  var label_2 = document.createElement('label');
  label_2.innerHTML = 'Date';
  div_2.appendChild(label_2);
  Dropdown({id: "DateDD", name: "Date", optins: allDays, width: "30px", addto:"Date"})
  
  var div_4 = document.createElement('div');
  div_4.id = 'div_button';
  document.getElementById("EntryArea").appendChild(div_4);
  
  var button_4 = document.createElement('button');
  button_4.innerHTML = 'Add';
  button_4.onclick = getButton_4value;
  div_4.appendChild(button_4);
  
  function getButton_4value() {
    var selectedPerson = Option('PersonDD');
    console.log("Option: ", selectedPerson);
  }

  return null;
}

export default EntryArea;