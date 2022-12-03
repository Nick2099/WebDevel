import React, { useState, useRef, useEffect } from "react";
import TodoList from "./TodoList";
import { v4 as uuidv4 } from "uuid"; // npm install uuid => function that generates a rendom ID

const LOCAL_STORAGE_KEY = "todoApp.todos";

function App() {
  const [todos, setTodos] = useState([]);
  const todoNameRef = useRef();

  useEffect(() => {
    const storedTodos = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY));
    console.log("Call once: ", storedTodos);
    if (storedTodos) {
      setTodos(storedTodos);
      console.log("setTodos!");
    }
  }, []);

  useEffect(() => {
    console.log("Change: ", todos);
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(todos));
  }, [todos]);

  function toggleTodo(id) {
    console.log("toggleTodo(id) id:", id);
    const newTodos = [...todos];
    console.log("toggleTodo(id) newTodos:", newTodos);
    const todo = newTodos.find(todo => todo.id === id);
    console.log("toggleTodo(id) todo:", todo);
    todo.complete = !todo.complete;
    console.log("toggleTodo(id) todo:", todo);
    setTodos(newTodos);
  }

  function handleAddTodo(e) {
    const name = todoNameRef.current.value;
    if (name === "") return;
    setTodos((prevTodos) => {
      return [
        ...prevTodos,
        {
          id: uuidv4(),
          name: name,
          complete: false,
        },
      ];
    });
    todoNameRef.current.value = null;
  }

  function handleClearTodos() {
    const newTodos = todos.filter(todo => !todo.complete);
    setTodos(newTodos);
  }

  return (
    <>
      {" "}
      {/* empty element, also known as fragment - it allow us to return more than one jsx element */}
      <TodoList todos={todos} toggleTodo={toggleTodo}/>
      <input ref={todoNameRef} type="text" />
      <button onClick={handleAddTodo}>Add Todo</button>
      <button onClick={handleClearTodos}>Clear Completed</button>
      <div>{todos.filter(todo => !todo.complete).length} left Todo(s)</div>
    </>
  );
}

export default App;
