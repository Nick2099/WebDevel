import React from "react";

export default function Item({ item, deleteItem, index}) {
    function handleDelete() {
        deleteItem(item.id);
    };

    if (index!==0) {
        return (
            <tr>
                <td>{item.group}</td>
                <td>{item.subgroup}</td>
                <td>{item.amount}</td>
                <td><input type="number"></input><button>Add</button></td>
                <td>{item.note}</td>
                <td><button onClick={handleDelete}>Delete</button></td>
            </tr>
        );
    } else {
        return (
            <tr>
                <td>{item.group}</td>
                <td>{item.subgroup}</td>
                <td>{item.amount}</td>
                <td></td>
                <td>{item.note}</td>
                <td><button onClick={handleDelete}>Delete</button></td>
            </tr>
        );
    };
}
