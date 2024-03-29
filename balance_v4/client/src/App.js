import React, { useEffect, useContext } from "react";
import "./App.css";
import { DataContext } from "./DataContextProvider";
// DataContextProvider is loaded in index.js. Here we just need to have access to data
import Navigation from "./Navigation";


/*
import LoginArea from "./LoginArea";
import HomeArea from './HomeArea';
import EntryArea from './EntryArea';
import SettingsArea from './SettingsArea';
*/

function App() {
  const [data, setData] = useContext(DataContext);
  // console.log("data: ", data);

  /*
  function ShowEntryArea(props) {
    if (props.show==="true") {
        return(
          <EntryArea />
        );
    } else {
      return null;
    };
  };

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

  function ShowSettingsArea(props) {
    if (props.show==="true") {
        return(
          <SettingsArea />
        );
    } else {
      return null;
    };
  };
  */

  useEffect(() => {
    console.log("====> useEffect! <====");
    console.log("data: ", data);

    /*
    ShowLoginArea(page.showLogin.toString);
    ShowHomeArea(page.showHome.toString);
    ShowEntryArea(page.showEntry.toString);
    ShowSettingsArea(page.showSettings.toString);
    */
  }, [data]);

  function buttonClick() {
    setData((prevState) => {
      return {
        ...prevState,
        showLogin: !prevState.showLogin,
        showEntry: true,
        showHome: false,
      };
    });
  }

  return (
    <div className="App">
      <Navigation />
      Proba
      <button type="button" onClick={buttonClick}>
        Change
      </button>
    </div>
  );
}

export default App;

/*
        <NavigationBar />
        <ShowLoginArea show={page.showLogin.toString()}/>
        <ShowHomeArea show={page.showHome.toString()}/>
        <ShowEntryArea show={page.showEntry.toString()}/>
        <ShowSettingsArea show={page.showSettings.toString()}/>
*/
