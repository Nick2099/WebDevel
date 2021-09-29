import React, {useState} from 'react';
import NavigationBar from "./NavigationBar";
import LoginArea from "./LoginArea";
import './App.css';

function App() {

  const [user, setUser] = useState([{email: "some@email.com", name: "John", id: "1", logedin: true}]);

  return (
    <div className="App">
      <NavigationBar email={user[0].email} name={user[0].name} id={user[0].id} logedin={user[0].logedin} key={user[0].id} />
      <LoginArea />
      <header className="App-header">
        <h1>Home screen</h1>
      </header>
    </div>
  );
}

export default App;
