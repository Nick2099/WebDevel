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

function ShowArea() {
  
    return (
        <div id="ShowArea">
            <h2>Ballance sheets</h2>
        </div>
    )
}

export default ShowArea;
