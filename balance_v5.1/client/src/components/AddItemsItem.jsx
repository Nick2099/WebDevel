import React from "react";

export default function Item({ item, deleteItem, index, updateItem, updateNote}) {
    function handleDelete() {
        deleteItem(item.id);
    };

    function handleAdd() {
        let addNumber = document.getElementById("addNumber"+index).value;
        updateItem(item.id, Number(addNumber));
    };

    function handleNote() {
        let newNote = document.getElementById("newNote"+index).value;
        updateNote(item.id, newNote);
    }

    if (index!==0) {
        return (
            <tr>
                <td>{item.group}</td>
                <td>{item.subgroup}</td>
                <td>{parseFloat(item.amount).toFixed(2)}</td>
                <td><input id={"addNumber"+index} type="number"></input><button onClick={handleAdd}>Add</button></td>
                <td><input id={"newNote"+index} type="text" defaultValue={item.note} onBlur={handleNote}></input></td>
                <td><button onClick={handleDelete}>Delete</button></td>
            </tr>
        );
    } else {
        return (
            <tr>
                <td>{item.group}</td>
                <td>{item.subgroup}</td>
                <td>{parseFloat(item.amount).toFixed(2)}</td>
                <td></td>
                <td><input id={"newNote"+index} type="text" defaultValue={item.note} onBlur={handleNote}></input></td>
                <td><button onClick={handleDelete}>Delete</button></td>
            </tr>
        );
    };
}
