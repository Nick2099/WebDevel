import React, {useEffect, useContext} from 'react';
import './App.css';
import {TmpUserProvider} from "./TmpUserContext";
import {PageContentContext} from "./PageContentContext";
import NavigationBar from "./NavigationBar";
import LoginArea from "./LoginArea";
import HomeArea from './HomeArea';
// import EntryArea from './EntryArea';
import EntryArea from './EntryArea';
import SettingsArea from './SettingsArea';

function App() {
  const [page] = useContext(PageContentContext);

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

  useEffect(() => {
    /* if (page.showEntry) {
      document.getElementById('EntryArea').className = 'Show-Block';
    } else {
      document.getElementById('EntryArea').className = 'Hidden';
    };
    if (page.showEntryAdd) {
      console.log("dodavanje EntryArea");
      EntryArea();
    } */
    ShowLoginArea(page.showLogin.toString);
    ShowHomeArea(page.showHome.toString);
    ShowEntryArea(page.showEntry.toString);
    ShowSettingsArea(page.showSettings.toString);
  }, [page])

  return (
    <TmpUserProvider>
      <div className="App">
        <NavigationBar />
        <ShowLoginArea show={page.showLogin.toString()}/>
        <ShowHomeArea show={page.showHome.toString()}/>
        <ShowEntryArea show={page.showEntry.toString()}/>
        <ShowSettingsArea show={page.showSettings.toString()}/>
      </div>
    </TmpUserProvider>      
  );
}

export default App;