import React, { useState, useContext, useEffect, Component } from "react";
import "./App.css";
import Axios from "axios";
import { TmpUserContext } from "./TmpUserContext";
// import {PageContentContext} from "./PageContentContext";

function EntryArea2() {
  /* const [email, setEmail] = useState('');
    const [name, setName] = useState('');
    const [password, setPassword] = useState('');
    const [repeat, setRepeat] = useState('');
    const [repeatTxt, setRepeatTxt] = useState(''); */
  const [tmpUser, setTmpUser] = useContext(TmpUserContext);
  /* const [page, setPage] = useContext(PageContentContext);
    const [register, setRegister] = useState(false);    */
  const [showIncome, setShowIncome] = useState(true);

  let records = [
    {
      id: 0,
      recid: 0,
      userid: 0,
      locuser: 0,
      date: "",
      place: "",
      totinc: 0,
      totexp: 0,
      inc: 0,
      exp: 0,
      group: 0,
      subgroup: 0,
    },
  ];
  var groups = [];

  var tmpDate = new Date();
  var currentDate = tmpDate.toISOString().substring(0, 10);
  var tmpDateValue = "";

  console.log("tmpUser: ", tmpUser);
  console.log("groups: ", groups);

  function incexpChange() {
    var selected = document.querySelector('input[name="incexp"]:checked').id;
    console.log("selected: ", selected);
    if (selected === "inc") {
      setShowIncome(true);
    } else {
      setShowIncome(false);
    }
  }

  function checkDate() {
    // console.log("Check Date");
    var tmpDate1 = String(document.getElementById("select_date").value);
    /* var day = tmpDate1.substring(8,10);
    var month = tmpDate1.substring(5,7);
    var year = tmpDate1.substring(0,4); */
    if (tmpDate1.length === 0) {
      document.getElementById("select_date").value = tmpDateValue;
      // console.log("Date was corrected!");
    } else {
      tmpDateValue = tmpDate1;
    }
  }

  return (
    <div className="Entry" id="EntryArea">
      <h2>Insert your entries (2)</h2>
      <div id="div_person">
        <label className="width_100">Person</label>
        <select className="width_200" id="select_person"></select>
      </div>
      <div id="div_radio">
        <input
          type="radio"
          id="inc"
          name="incexp"
          value="inc"
          onChange={incexpChange}
          defaultChecked
        ></input>
        <label>Income</label>
        <input
          type="radio"
          id="exp"
          name="incexp"
          value="exp"
          onChange={incexpChange}
        ></input>
        <label>Expense</label>
      </div>
      <div id="div_date">
        <label className="width_100">Date</label>
        <input
          id="select_date"
          className="width_200"
          type="date"
          onChange={checkDate}
          defaultValue={currentDate}
        ></input>
      </div>

      <div id="div_entries">
        <h2>{showIncome ? "Income" : "Expense"}</h2>
      </div>

      <div id="div_place">
        <label className="width_100">Place</label>
        <input type="text" id="place" className="width_200"></input>
      </div>

      <div id="div_totamount">
        <label className="width_200">Total amount</label>
        <input
          type="number"
          id="totamount"
          className="width_100 right"
          defaultValue="0.00"
        ></input>
      </div>

      <div id="div_group">
        <label className="width_100">Group</label>
        <select className="width_200" id="select_group"></select>
      </div>

      <Child tmpUser={tmpUser} groups={groups}/>
    </div>
  );
}

class Child extends Component {
  componentDidMount() {
    console.log("Child was Mounted. Props: ", this.props);
    var opt = document.createElement("option");
    opt.innerHTML = this.props.tmpUser.name;
    opt.value = 0;
    opt.setAttribute("selected", true);
    var sel = document.getElementById("select_person");
    sel.appendChild(opt);

    const promise1 = new Promise((resolve, reject) => {
      Axios.get("http://localhost:3001/getstandardgroups", {
        params: {},
      }).then((resp) => {
        resolve(resp.data);
      });
    })
    
    promise1.then((value) => {
      for (var i = 0; i < value.length; i++) {
        var options = document.createElement("option");
        options.innerHTML = value[i].name;
        options.value = value[i].value;
        if (value[i].value === 1) {
          options.setAttribute("selected", true);
        }
        document.getElementById("select_group").appendChild(options);;
      };
    })
  }

  componentDidUpdate() {
    console.log("Child was updated");
  }

  componentWillUnmount() {
    console.log("Child was Unmounted");
  }

  render() {
    return null;
  }
}

export default EntryArea2;