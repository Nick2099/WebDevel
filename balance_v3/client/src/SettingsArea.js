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

function SettingsArea() {
  const [tmpUser, setTmpUser] = useContext(TmpUserContext);
  const [showIncome, setShowIncome] = useState(1);
  const groups = useRef([]);
  const subgroups = useRef([]);
  const currencies = useRef([]);

  useEffect(() => {
    Functions.getCurrencies().then((value) => {
      currencies.current = value;
      Functions.setCurrencies({cur: tmpUser.cur, curs: currencies});
    });
  }, []);

  return (
    <div>
      <div>
        <header className="App-header">
          <h1>Settings</h1>
        </header>
      </div>
      <div>
        <label>User name</label>
        <input type="text" defaultValue={tmpUser.name}></input>
      </div>
      <div>
        <label>Currency</label>
        <select id="select_cur"></select>
      </div>
    </div>
  );
}

export default SettingsArea;
