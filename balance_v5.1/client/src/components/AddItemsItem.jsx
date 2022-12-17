import React from "react";

export default function Item({ item }) {
    function handleTodoClick() {
        // toggleTodo(todo.id);
    }

    return (
        <tr>
            <td>{item.group}</td>
            <td>{item.subgroup}</td>
            <td>{item.amount}</td>
            <td><input></input><button>Add</button></td>
            <td>{item.note}</td>
            <td><button>Delete</button></td>
        </tr>
    );
}
