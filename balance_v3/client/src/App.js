import React, {useContext} from 'react';
import NavigationBar from "./NavigationBar";
import LoginArea from "./LoginArea";
import HomeArea from './HomeArea';
import EntryArea from './EntryArea';
import './App.css';
import {TmpUserProvider} from "./TmpUserContext";
import {PageContentContext} from "./PageContentContext";

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

  return (
      <TmpUserProvider>
        <div className="App">
          <NavigationBar />
          <ShowLoginArea show={page.showLogin.toString()}/>
          <ShowHomeArea show={page.showHome.toString()}/>
          <ShowEntryArea show={page.showEntry.toString()}/>
        </div>
      </TmpUserProvider>      
  );
}

export default App;
