import React, { useEffect, useRef, useState } from "react";
import * as MyFunctions from "../components/MyFunctions";
import Items from "./AddItemsLists";
import { v4 as uuidv4 } from "uuid"; // npm install uuid => function that generates a rendom ID

function Additems() {
    const dateRef = useRef();
    const facilityRef = useRef();
    const placeRef = useRef();
    const totalAmountRef = useRef();
    const accountRef = useRef();
    const [groupState, setGroupState] = useState("1");
    const [subgroupState, setSubgroupState] = useState("1");
    const amountRef = useRef();
    const noteRef = useRef();
    const [items, setItems] = useState([]);

    // this part have to be replaced with loading data from SQL
    const accountOptions = [
        { label: "Cash", value: "1" },
        { label: "Commerzbank", value: "2" },
        { label: "Raifeisenbank", value: "3" },
    ];
    const groupOptions = [
        { label: "group1", value: "1" },
        { label: "group2", value: "2" },
    ];
    const subgroupOptions = [
        { label: "subgroup1", value: "1" },
        { label: "subgroup2", value: "2" },
    ];

    // sessionStorage.removeItem("tmpDate");
    useEffect(() => {
        let tmpDate = sessionStorage.getItem("tmpDate");
        if (tmpDate == null) {
            let tmpDate = MyFunctions.onlyDateFromDateTime(new Date());
            sessionStorage.setItem("tmpDate", tmpDate);
        }
        dateRef.current.value = tmpDate;
    }, []);

    function handleAccount(e) {
        accountRef.current = e.target.value;
    }

    function handleGroup(e) {
        setGroupState(e.target.value);
    }

    function handleSubgroup(e) {
        setSubgroupState(e.target.value);
    }

    function handleSave() {
        console.log("Saving....");
    }

    function handleAddItem() {
        let tmp = groupOptions.filter(item => item.value === groupState);
        const group = tmp[0].label;
        tmp = subgroupOptions.filter(item => item.value === subgroupState);
        const subgroup = tmp[0].label;
        const amount = Number(amountRef.current.value);
        const note = noteRef.current.value;
        setItems((prevItems) => {
            return [
                ...prevItems,
                {
                    key: uuidv4(),
                    group: group,
                    subgroup: subgroup,
                    amount: amount,
                    note: note,
                },
            ];
        });
        // this part have to be changed: group and subgroup should be set to stil available
        setGroupState("1");
        setSubgroupState("1");
        amountRef.current.value = 0;
        noteRef.current.value = "";
    }

    return (
        <div>
            <h1>Add items</h1>
            <table>
                <tbody>
                    <tr>
                        <td>
                            <label>Date</label>
                        </td>
                        <td>
                            <input ref={dateRef} type="date" />
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <label>Facility (shop, firm, institution...)</label>
                        </td>
                        <td>
                            <input ref={facilityRef} type="text" />
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <label>Place (city, region, district...)</label>
                        </td>
                        <td>
                            <input ref={placeRef} type="text" />
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <label>Total amount</label>
                        </td>
                        <td>
                            <input ref={totalAmountRef} type="number" />
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <label>Paid with/to</label>
                        </td>
                        <td>
                            <select defaultValue="1" onChange={handleAccount}>
                                {accountOptions.map((option) => (
                                    <option key={option.value} value={option.value}>
                                        {option.label}
                                    </option>
                                ))}
                            </select>
                        </td>
                    </tr>
                </tbody>
            </table>
            <div>
                <select value={groupState} onChange={handleGroup}>
                    {groupOptions.map((option) => (
                        <option key={option.value} value={option.value}>
                            {option.label}
                        </option>
                    ))}
                </select>
                <select value={subgroupState} onChange={handleSubgroup}>
                    {subgroupOptions.map((option) => (
                        <option key={option.value} value={option.value}>
                            {option.label}
                        </option>
                    ))}
                </select>
                <input ref={amountRef} type="number" />
                <br></br>
                <label>Note</label>
                <input ref={noteRef} type="text" />
                <button onClick={handleAddItem}>Add item</button>
            </div>
            <div>
                <Items items={items} />
            </div>
            <button onClick={handleSave}>Save</button>
        </div>
    );
}

export default Additems;
