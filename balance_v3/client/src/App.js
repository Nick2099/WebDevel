import React, {useEffect, useContext} from 'react';
import './App.css';
import {TmpUserProvider} from "./TmpUserContext";
import {PageContentContext} from "./PageContentContext";
import NavigationBar from "./NavigationBar";
import LoginArea from "./LoginArea";
import HomeArea from './HomeArea';
import EntryArea from './EntryArea';
import SettingsArea from './SettingsArea';

function App() {
  const [page, setPage] = useContext(PageContentContext);

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

  function ShowEntryArea(props) {
    if (props.show==="true") {
        return(
          <EntryArea />
        );
    } else {
      return null;
    };
  };

  useEffect(() => {
    console.log("useEffect za page! page: ", page);
    if (page.showEntry) {
      document.getElementById('EntryArea').className = 'Show-Block';
    } else {
      console.log("Hidding Entry");
      document.getElementById('EntryArea').className = 'Hidden';
    };
    if (page.showEntryAdd) {
      console.log("dodavanje EntryArea");
      EntryArea();
    }
    ShowLoginArea(page.showLogin.toString);
    ShowHomeArea(page.showHome.toString);
    ShowSettingsArea(page.showSettings.toString);
  }, [page])

  function ShowSettingsArea(props) {
    if (props.show==="true") {
        return(
          <SettingsArea />
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
        <div id="EntryArea">
          <h2>Enter items</h2>
        </div>
        <ShowSettingsArea show={page.showSettings.toString()}/>
      </div>
    </TmpUserProvider>      
  );
}

export default App;

/*
  return (
      <TmpUserProvider>
        <div className="App">
          <NavigationBar />
          <ShowLoginArea show={page.showLogin.toString()}/>
          <ShowHomeArea show={page.showHome.toString()}/>
          <div id="EntryArea">
            <ShowEntryArea show={page.showEntry.toString()}/>
          </div>
          <ShowSettingsArea show={page.showSettings.toString()}/>
        </div>
      </TmpUserProvider>      
  );
*/