import React, {useEffect, useState} from 'react';
import Hello from './seyHello';
import Tweet, {Tweet2} from "./tweet";
import './App.css';


function App() {

  const [isRed, setIsRed]  = useState(false);
  const [counter, setCounter] = useState(0);

  const [users, setUsers] = useState([
    {name: "Fred", age: 44, likes: ["Watching movies", "Pizza"], id: "1"},
    {name: "Jo", age: 33, likes: ["Motorsport", "Girls"], id: "2"}
  ]);

  useEffect(() => { //finaly is working//
    if (counter > 9) {
      setIsRed(true);
    } else {
      setIsRed(false);
    }
  }, [counter]) // the const that will trigger the function!!! //

  function Increment() {
    setCounter(counter + 1);
  }

  function Decrement() {
    setCounter(counter - 1);
  }

  return (
    <div className="app">
      <h1>This is the app component</h1>
      <Hello />
      <div className="displayFlex">
        <Tweet name="Billy Idol" key={1} />
        <Tweet name="Depeche Mode" key={2}/>
        <Tweet name="Faihless" key={3}/>
        <Tweet name="Dire Straits" key={4} />
      </div>
      <div>
        <h2 className={isRed ? 'red' : ''}>Counter={counter}. I'll become red when counter is > 9</h2>
        <button onClick={Increment}>Increment</button>
        <button onClick={Decrement}>Decrement</button>
      </div>
      <div className="displayFlex">
        {users.map(user => (
          <Tweet2 name={user.name} age={user.age} likes={user.likes} key={user.id} id={user.id}/>
        ))}
      </div>
    </div>
  )
}

export default App;