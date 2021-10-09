
import React, {useState, useContext, useEffect} from 'react';
import NavigationBar from "./NavigationBar";
import LoginArea from "./LoginArea";
import HomeArea from './HomeArea';
import './App.css';
import {TmpUserProvider} from "./TmpUserContext";
import {PageContentContext} from "./PageContentContext";

function App() {
  const [page, setPage] = useContext(PageContentContext);
  const {REACT_APP_BASE_URL, REACT_APP_DB_HOST, REACT_APP_DB_USER, REACT_APP_DB_PASS} = process.env;
  console.log(REACT_APP_BASE_URL, REACT_APP_DB_HOST, REACT_APP_DB_USER, REACT_APP_DB_PASS);

  var mysql = require('mysql');
  var con = mysql.createConnection({
    host: process.env.REACT_APP_DB_HOST,
    user: process.env.REACT_APP_DB_USER,
    password: process.env.REACT_APP_DB_PASS,
    database: "mybalance"
  });
  
  /* con.connect(function(err) {
    if (err) {
      console.error('error connecting: ' + err.stack);
      return;
    }
    console.log('connected as id ' + con.threadId);
  });
  */

  function ShowLoginArea(props) {
    if (props.show==="true") {
        return(
          <LoginArea />
        );
    } else {
      return null;
    };
  };

  function ShowHomeArea(props) {
    if (props.show==="true") {
        return(
          <HomeArea />
        );
    } else {
      return null;
    };
  };

  return (
      <TmpUserProvider>
        <div className="App">
          <NavigationBar />
          <ShowLoginArea show={page.showLogin.toString()}/>
          <ShowHomeArea show={page.showHome.toString()}/>
        </div>
      </TmpUserProvider>      
  );
}

export default App;
