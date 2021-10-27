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
    labelwidth: "100px", width: "205px", addto:"div_person", selected: 2
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
  Dropdown({id: "DayDD", name: "Date", options: allDaysForSelect, labelwidth: "100px", width: "50px", addto:"div_date", selected: tmpDay});
  Dropdown({id: "MonthDD", name: "", options: allMonths, labelwidth: "0px", width: "60px", addto: "div_date", selected: tmpMonth});
  Dropdown({id: "YearDD", name: "", options: allYears, labelwidth: "0px", width: "75px", addto: "div_date", selected: tmpYear});
  document.getElementById('select_MonthDD').onchange = getDaysForDateChange;
  document.getElementById('select_YearDD').onchange = getDaysForDateChange;

  
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
    return {person: selectedPerson, day: selectedDay, month: selectedMonth, year: selectedYear};
  }

  function getDaysForDateChange() {
    var dateValues = getButton_4value();
    var tmpDate = new Date(dateValues.year, dateValues.month, 1);
    var tmpDays = Functions.getDaysInMonth(tmpDate);
    if (tmpDays!==document.getElementById("select_DayDD").length) {
      Functions.changeNoOfDaysInMonth({   // change no of days in select options and set day to less if doesn't exists
        item: 'select_DayDD',
        values: Functions.allDaysForSelect(Functions.allDaysArray(tmpDays)),
        selected: dateValues.day
      });
    };
  };
  return null;
}


export default EntryArea;