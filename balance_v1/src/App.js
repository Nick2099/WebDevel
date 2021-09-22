import React, {useState} from 'react';
import Hello from './seyHello';
import Tweet, {Tweet2} from "./tweet";
import './App.css';


function App() {

  const [isRed, setIsRed]  = useState(false);
  const [counter, setCounter] = useState(0);

  const [users, setUsers] = useState([
    {name: "Fred", age: 44, like: ["Watching movies", "Pizza"]},
    {name: "Jo", age: 33, like: ["Motorsport", "Girls"]}
  ]);

  function Increment() {
    console.log("1: ", counter);
    setCounter(counter + 1);
    if (counter > 9) {
      setIsRed(true);
    };
    console.log("2: ", counter);
  }

  return (
    <div className="app">
      <h1>This is the app component</h1>
      <Hello />
      <div className="displayFlex">
        <Tweet name="Billy Idol"/>
        <Tweet name="Depeche Mode"/>
        <Tweet name="Faihless"/>
        <Tweet name="Dire Straits"/>
      </div>
      <div>
        <h2 className={isRed ? 'red' : ''}>I'll become red when counter is > 9</h2>
        <button onClick={Increment}>Increment</button>
        <h3>{counter}</h3>
      </div>
      <div className="displayFlex">
        {users.map(user => (
          <Tweet2 name={user.name} age={user.age} likes={user.like}/>
        ))}
      </div>
    </div>
  )
}

export default App;