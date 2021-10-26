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
    options: [{value: 1, name:"Jedan"}, {value: 2, name:"Dva"}],
    width: "200px", addto:"div_person", selected: 2
  });

  var div_2 = document.createElement('div');
  div_2.id = 'div_date';
  document.getElementById("EntryArea").appendChild(div_2);
  
  var tmpDate = new Date();
  var tmpDay = tmpDate.getDate();
  var tmpMonth = tmpDate.getMonth();
  var tmpYear = tmpDate.getFullYear();
  var tmpDateNoTime = Functions.NoTimeDate(tmpDate);
  var noOfDaysInMonth = Functions.getDaysInMonth(tmpDate);
  var allDays = Functions.allDaysArray(noOfDaysInMonth);
  var allDaysForSelect = Functions.allDaysForSelect(allDays);
  var allMonths = Functions.allMonthsForSelect();
  var allYears = Functions.allYearsForSelect(tmpYear);
  console.log("Date: ", tmpDate, tmpDay, tmpMonth, tmpYear);
  /* var p2_tmp = document.createElement('p');
  p2_tmp.innerHTML = 'Date: ' + tmpDate +" "+tmpDateNoTime+" "+noOfDaysInMonth + " "+allDays;
  div_2.appendChild(p2_tmp); */

  /* var label_2 = document.createElement('label');
  label_2.innerHTML = 'Date';
  div_2.appendChild(label_2); */
  Dropdown({id: "DayDD", name: "Date", options: allDaysForSelect, width: "50px", addto:"div_date", selected: tmpDay});
  Dropdown({id: "MonthDD", name: "", options: allMonths, width: "60px", addto: "div_date", selected: tmpMonth});
  Dropdown({id: "YearDD", name: "", options: allYears, width: "75px", addto: "div_date", selected: tmpYear});
  
  var div_4 = document.createElement('div');
  div_4.id = 'div_button';
  document.getElementById("EntryArea").appendChild(div_4);
  
  var button_4 = document.createElement('button');
  button_4.innerHTML = 'Add';
  button_4.onclick = getButton_4value;
  div_4.appendChild(button_4);
  
  function getButton_4value() {
    var selectedPerson = Option('PersonDD');
    var selectedMonth = Option('MonthDD');
    var selectedYear = Option('YearDD');
    var selectedDay = Option('DayDD');
    if (tmpMonth!==selectedMonth) {
      var selectedDate = new Date(selectedYear, selectedMonth, selectedDay);
      var newNoOfDaysInMonth = Functions.getDaysInMonth(selectedDate);
      console.log(selectedDate, ":", newNoOfDaysInMonth, " VS. ", noOfDaysInMonth);
      if (newNoOfDaysInMonth!==noOfDaysInMonth) {
        console.log("Potrebno ispraviti broj dana u mjesecu", tmpDate, selectedDate);
      }
    }
    console.log("Option: ", selectedPerson, selectedDay+"."+(Number(selectedMonth)+1)+"."+selectedYear);
  }

  return null;
}

export default EntryArea;