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
    const groupRef = useRef();
    const subgroupRef = useRef();
    const amountRef = useRef();
    const noteRef = useRef();
    const [items, setItems] = useState([]);
    const [newAccounts, setNewAccounts] = useState([]);
    const allGroupOptionsRef = useRef([]);
    const [groupOptions, setGroupOptions] = useState([]);
    const [subgroupOptions, setSubgroupOptions] = useState([]);
    const master_id = sessionStorage.getItem("master_id");
    let account_user_id = 1;
    if (sessionStorage.getItem("master_type_id") !== 1) account_user_id = sessionStorage.getItem("user_id");

    // sessionStorage.removeItem("tmpDate");    // removing tmpDate in sessionStorage for test purposes
    useEffect(() => {
        // if tmpDate is not existing => setting tmpDate to today
        let tmpDate = sessionStorage.getItem("tmpDate");
        if (tmpDate == null) {
            let tmpDate = MyFunctions.onlyDateFromDateTime(new Date());
            sessionStorage.setItem("tmpDate", tmpDate);
        }
        dateRef.current.value = tmpDate;

        // loading accounts for this user
        MyFunctions.getAccounts(account_user_id).then(value => {
            let tmp = [];
            value.forEach(item => {
                tmp.push({ value: String(item.id), label: item.title });
            });
            setNewAccounts(tmp);
        });

        MyFunctions.getGroups(master_id).then(value => {
            let tmp = [];
            value.forEach((item, index) => {
                tmp.push({ value: String(item.id), label: item.title });
                if (index === 0) groupRef.current = String(item.id);
            });
            setGroupOptions(tmp);
            allGroupOptionsRef.current = tmp;
            console.log("allGroupOptionsRef.current:", allGroupOptionsRef.current);
            handleGroup();
        });

    }, []);

    async function addItemToItems(tmpItems, group, groupId, subgroup, subgroupId, amount, note) {
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
        // field "totalAmount" is not editable when there are some items
        if (tmpItems.length > 0) document.getElementById("totalAmount").readOnly = true;

        MyFunctions.removeOption(subgroupOptions, items).then(tmpNewOptions => {
            setSubgroupOptions(tmpNewOptions);
        });

        return tmpItems;
    };

    // recalculate the value for first item in list
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
            if (updatedItems.length === 0) {
                amountRef.current.value = totalAmountRef.current.value;
                document.getElementById("totalAmount").readOnly = false;
            };
        });
    };

    function handleTotalAmount(e) {
        let tmp = e.target.value;
        if (tmp === "") tmp = 0; else tmp = Number(tmp);
        if (tmp < 0) tmp = 0;
        totalAmountRef.current.value = tmp;
        if (items.length === 0) amountRef.current.value = tmp;
    };

    function handleAccount(e) {
        accountRef.current = e.target.value;
    };

    function handleGroup(e) {
        if (e !== undefined) {
            groupRef.current = e.target.value;
        };
        MyFunctions.getSubgroups(groupRef.current).then(value => {
            let newSubgroups1 = [];
            value.forEach((item, index) => {
                newSubgroups1.push({ value: String(item.id), label: item.title, hide: false, maingroup_id: item.maingroup_id });
                if (index === 0) subgroupRef.current = String(item.id);
            });

            MyFunctions.removeOption(newSubgroups1, items).then(newSubgroups2 => {
                setSubgroupOptions(newSubgroups2);
                handleSubgroup();
            });
    
        });
    };

    function handleSubgroup(e) {
        if (e !== undefined) {
            subgroupRef.current = e.target.value;
        };
    };

    function updateSubgroupRef() {
        subgroupRef.current = document.getElementById('subgroup').value;
    }

    function updateGroups() {
        // console.log("items:", items);
        // console.log("groupOptions:", groupOptions);
        // console.log("subgroupOptions:", subgroupOptions);
        let tmpGroups = [];
        allGroupOptionsRef.current.forEach(group => {
            console.log("group:", group);
            let exists = false;
            subgroupOptions.forEach(subgroup => {
                console.log("subgroup:", subgroup);
                if (!subgroup.hide) {
                    if (String(subgroup.maingroup_id)===String(group.value)) exists = true;
                    console.log("exists:", exists);
                };
            });
            if (exists) tmpGroups.push(group);
        });
        console.log("tmpGroups:", tmpGroups);
    };

    function handleSave() {
        console.log("Saving....");
    };

    function handleAddItem() {
        // checking if some of the fields are not OK
        if (MyFunctions.checkDatum(dateRef.current.value, "datum", true)) return;
        if (MyFunctions.checkMinimumLength(facilityRef.current.value, "facility", "facility", 2, true)) return;
        if (MyFunctions.checkMinimumLength(placeRef.current.value, "place", "place", 2, true)) return;
        if (MyFunctions.checkAmountIs0(totalAmountRef.current.value, "totalAmount", "Total amount", true)) return;
        if (MyFunctions.checkAmountIs0(amountRef.current.value, "amount", "Amount", true)) return;
        if (items.length > 0) {
            if (MyFunctions.checkAmountIsTooBig(amountRef.current.value, "amount", "Amount", true, items[0].amount)) return;
        };

        // collecting data to add as new item
        let tmp = groupOptions.filter(item => item.value === groupRef.current);
        const group = tmp[0].label;
        const groupId = tmp[0].value;
        updateSubgroupRef();
        // console.log("subgroupRef.current:", subgroupRef.current);
        if (subgroupRef.current==="") {
            alert("You have to choose valid subgroup!");
            return;
        }
        tmp = subgroupOptions.filter(item => item.value === subgroupRef.current);
        // console.log("tmp:", tmp);
        const subgroup = tmp[0].label;
        const subgroupId = tmp[0].value;
        const amount = Number(amountRef.current.value);
        const note = noteRef.current.value;

        // adding new item
        addItemToItems(items, group, groupId, subgroup, subgroupId, amount, note).then((newItems) => {
            // update value of first item
            updateFirstItemInItems(newItems).then((updatedItems) => {
                setItems([...updatedItems]);
            });
        });

        updateGroups();

        // this part have to be changed: group and subgroup should be set to stil available
        // setGroupState("1");
        // setSubgroupState("1");
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
                                {newAccounts.map((option) => (
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
                <select id="group" onChange={handleGroup}>
                    {groupOptions.map((option) => (
                        <option key={option.value} value={option.value}>
                            {option.label}
                        </option>
                    ))}
                </select>
                <select id="subgroup" onChange={handleSubgroup}>
                    {subgroupOptions.map((option) => (
                        <option key={option.value} value={option.value} disabled={option.hide}>
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
