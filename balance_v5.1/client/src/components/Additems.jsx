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

    async function addItemToItems(tmpItems, group, groupId, subgroup, subgroupId, amount, note) {
        // let tmpItems = items;
        tmpItems.push(
            {
                id: uuidv4(),
                group: group,
                groupId: groupId,
                subgroup: subgroup,
                subgroupId: subgroupId,
                amount: amount,
                note: note,
            },
        );
        return tmpItems;
    };

    async function updateFirstItemInItems(newItems) {
        document.getElementById("group").focus();
        let sumAmount = 0;
        if (newItems.length === 0) return [];
        newItems.forEach((item, index) => {
            if (index !== 0) sumAmount = sumAmount + item.amount;
        });
        newItems[0].amount = totalAmountRef.current.value - sumAmount;
        return newItems;
    };

    function deleteItem(id) {
        const tmpItems = [...items];
        const newItems = tmpItems.filter(item => item.id !== id);
        updateFirstItemInItems(newItems).then((updatedItems) => {
            setItems(updatedItems);
            if (updatedItems.length === 0) amountRef.current.value = totalAmountRef.current.value;
        });
    };

    function handleTotalAmount(e) {
        let tmp = e.target.value;
        if (tmp === "") tmp = 0; else tmp = Number(tmp);
        totalAmountRef.current.value = tmp;
        if (items.length === 0) amountRef.current.value = tmp;
    };

    function handleAccount(e) {
        accountRef.current = e.target.value;
    };

    function handleGroup(e) {
        setGroupState(e.target.value);
    };

    function handleSubgroup(e) {
        setSubgroupState(e.target.value);
    };

    function handleSave() {
        console.log("Saving....");
    };

    function handleAddItem() {
        if (MyFunctions.checkDatum(dateRef.current.value, "datum", true)) return;
        if (MyFunctions.checkMinimumLength(facilityRef.current.value, "facility", "facility", 2, true)) return;
        if (MyFunctions.checkMinimumLength(placeRef.current.value, "place", "place", 2, true)) return;
        if (MyFunctions.checkAmountIs0(totalAmountRef.current.value, "totalAmount", "Total amount", true)) return;
        if (MyFunctions.checkAmountIs0(amountRef.current.value, "amount", "Amount", true)) return;

        let tmp = groupOptions.filter(item => item.value === groupState);
        const group = tmp[0].label;
        const groupId = tmp[0].value;
        tmp = subgroupOptions.filter(item => item.value === subgroupState);
        const subgroup = tmp[0].label;
        const subgroupId = tmp[0].value;
        const amount = Number(amountRef.current.value);
        const note = noteRef.current.value;
        addItemToItems(items, group, groupId, subgroup, subgroupId, amount, note).then((newItems) => {
            updateFirstItemInItems(newItems).then((updatedItems) => {
                setItems([...updatedItems]);
            });
        }
        );
        // this part have to be changed: group and subgroup should be set to stil available
        setGroupState("1");
        setSubgroupState("1");
        amountRef.current.value = 0;
        noteRef.current.value = "";
    };

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
                            <input id="datum" ref={dateRef} type="date" />
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <label>Facility (shop, firm, institution...)</label>
                        </td>
                        <td>
                            <input id="facility" ref={facilityRef} type="text" />
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <label>Place (city, region, district...)</label>
                        </td>
                        <td>
                            <input id="place" ref={placeRef} type="text" />
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <label>Total amount</label>
                        </td>
                        <td>
                            <input id="totalAmount" ref={totalAmountRef} type="number" onChange={handleTotalAmount} onFocus={handleTotalAmount} />
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
                <select id="group" value={groupState} onChange={handleGroup}>
                    {groupOptions.map((option) => (
                        <option key={option.value} value={option.value}>
                            {option.label}
                        </option>
                    ))}
                </select>
                <select id="subgroup" value={subgroupState} onChange={handleSubgroup}>
                    {subgroupOptions.map((option) => (
                        <option key={option.value} value={option.value}>
                            {option.label}
                        </option>
                    ))}
                </select>
                <input id="amount" ref={amountRef} type="number" />
                <br></br>
                <label>Note</label>
                <input ref={noteRef} type="text" />
                <button onClick={handleAddItem}>Add item</button>
            </div>
            <div>
                <Items items={items} deleteItem={deleteItem} />
            </div>
            <button onClick={handleSave}>Save</button>
        </div>
    );
}

export default Additems;
