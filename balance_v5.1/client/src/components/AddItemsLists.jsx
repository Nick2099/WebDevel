import React from 'react'
import Item from './AddItemsItem';
import { v4 as uuidv4 } from "uuid";

export default function Items({ items, deleteItem, updateItem, updateNote }) {
    return (
        <>
            <table>
                <thead>
                    <tr>
                        <th>Group</th>
                        <th>Subgroup</th>
                        <th>Amount</th>
                        <th>Add/Reduce</th>
                        <th>Note</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {items.map((item, index) => {
                        return (
                            <Item key={uuidv4()} item={item} deleteItem={deleteItem} index={index} updateItem={updateItem} updateNote={updateNote}/>
                        )
                    })}
                </tbody>
            </table>
        </>
    )
}
