import React, {useState, useContext} from 'react';
import NavigationBar from "./NavigationBar";
import LoginArea from "./LoginArea";
import './App.css';
import {TmpUserProvider, TmpUserContext} from './TmpUserContext';

function App() {
  const [showLoginArea, setShowLoginArea] = useState(true);
  const [showHome, setShowHome] = useState(true);
  const [user, setUser] = useState([{email: "some@email.com", name: "John", id: "1", logedin: true}]);

  function ShowLoginAreaFunc(props) {
    console.log(props);
    if (props.logged==="true") {
        return(
          <LoginArea />
        );
    } else {
      return null;
    };
    };

  return (
    <TmpUserProvider>
      <div className="App">
        <NavigationBar email={user[0].email} name={user[0].name} id={user[0].id} logedin={user[0].logedin} key={user[0].id} />
        <ShowLoginAreaFunc logged={showLoginArea.toString()}/>
        <header className="App-header">
          <h1>Home screen</h1>
        </header>
      </div>
    </TmpUserProvider>
  );
}

export default App;
