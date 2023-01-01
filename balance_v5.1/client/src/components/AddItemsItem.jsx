import React from "react";

export default function Item({ item, deleteItem, index, updateItem}) {
    function handleDelete() {
        deleteItem(item.id);
    };

    function handleAdd() {
        let addNumber = document.getElementById("addNumber"+index).value;
        console.log("addNumber", index, ":", addNumber);
        updateItem(item.id, Number(addNumber));
    };

    if (index!==0) {
        return (
            <tr>
                <td>{item.group}</td>
                <td>{item.subgroup}</td>
                <td>{parseFloat(item.amount).toFixed(2)}</td>
                <td><input id={"addNumber"+index} type="number"></input><button onClick={handleAdd}>Add</button></td>
                <td>{item.note}</td>
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
                <td>{item.note}</td>
                <td><button onClick={handleDelete}>Delete</button></td>
            </tr>
        );
    };
}
