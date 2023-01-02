import React, { useEffect, useRef, useState } from "react";
import * as MyFunctions from "../components/MyFunctions";
import Items from "./AddItemsLists";
import { v4 as uuidv4 } from "uuid"; // npm install uuid => function that generates a rendom ID

function Additems() {
    // header variables/constants
    const dateRef = useRef();
    const facilityRef = useRef();
    const placeRef = useRef();
    const totalAmountRef = useRef();
    const accountRef = useRef();
    const [newAccounts, setNewAccounts] = useState([]);
    // item variables/constants
    const amountRef = useRef();
    const noteRef = useRef();
    const [items, setItems] = useState([]);
    let newAllGroupsForUser = useRef([]);
    let newAllSubgroupsForUser = useRef([]);
    const [newTmpOptionsForGroups, setNewTmpOptionsForGroups] = useState([]);
    const [newTmpOptionsForSubgroups, setNewTmpOptionsForSubgroups] = useState([]);
    const [newTmpSubgroupsForGroup, setNewTmpSubgroupsForGroup] = useState([]);
    // master_id
    const master_id = sessionStorage.getItem("master_id");
    // account_user_id - id 1 if master_type_id is 1 (Basic user) - default groups, subgroups and accounts
    let account_user_id = 1;
    if (sessionStorage.getItem("master_type_id") !== 1) account_user_id = sessionStorage.getItem("user_id");

    useEffect(() => {
        // if tmpDate is not existing => setting tmpDate to today
        let tmpDate = sessionStorage.getItem("tmpDate");
        if (tmpDate == null) {
            tmpDate = MyFunctions.onlyDateFromDateTime(new Date());
            sessionStorage.setItem("tmpDate", tmpDate);
        }
        dateRef.current = tmpDate;
        document.getElementById("datum").value = tmpDate;

        // loading accounts for this user
        MyFunctions.getAccounts(account_user_id).then(value => {
            let tmp = [];
            value.forEach(item => {
                tmp.push({ value: String(item.id), label: item.title });
            });
            setNewAccounts(tmp);
        });

        // loading groups, subgroups, creating still available subgroups, groups and subgroups for choosen group
        newGetAllGroupsForUser().then(allgroups => {
            newAllGroupsForUser.current = allgroups;
            newGetAllSubgroupsForUser().then(allsubgroups => {
                newAllSubgroupsForUser.current = allsubgroups;
                newSetStillAvailableSubgroups().then(stillavailablesubgroups => {
                    setNewTmpOptionsForSubgroups(stillavailablesubgroups);
                    newSetStillAvailableGroups(stillavailablesubgroups).then(stillavailablegroups => {
                        setNewTmpOptionsForGroups(stillavailablegroups);
                    });
                });
            });
        });
        // The following line removes the error that is displayed with the hook
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        newSetSubgroupsForTmpGroups().then(subgroups => {
            setNewTmpSubgroupsForGroup(subgroups);
        });
        // The following line removes the error that is displayed with the hook
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [newTmpOptionsForGroups]);

    useEffect(() => {
        newSetStillAvailableSubgroups().then(stillavailablesubgroups => {
            setNewTmpOptionsForSubgroups(stillavailablesubgroups);
            newSetStillAvailableGroups(stillavailablesubgroups).then(stillavailablegroups => {
                setNewTmpOptionsForGroups(stillavailablegroups);
            });
        });
        // The following line removes the error that is displayed with the hook
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [items]);

    // *********************************************************************************************
    // NEW functions for new groups and subgroups! Old functions are added again under new name!
    // *********************************************************************************************

    async function newGetAllGroupsForUser() {
        let tmp = [];
        await MyFunctions.getAllGroups(account_user_id).then(groups => {
            groups.forEach(group => {
                tmp.push({ value: String(group.id), label: group.title, type: group.type });
            });
        });
        return tmp;
    };

    async function newGetAllSubgroupsForUser() {
        let tmp = [];
        await MyFunctions.getAllSubgroups(account_user_id).then(subgroups => {
            subgroups.forEach(subgroup => {
                tmp.push({ value: String(subgroup.id), label: subgroup.title, maingroup: subgroup.maingroup_id });
            });
        });
        return tmp;
    };

    async function newSetStillAvailableSubgroups() {
        let tmp = [];
        newAllSubgroupsForUser.current.forEach(subgroup => {
            let itemexists = false;
            items.forEach(item => {
                if (String(subgroup.value) === String(item.subgroupId)) itemexists = true;
            });
            if (!itemexists) tmp.push(subgroup);
        });
        return tmp;
    };

    async function newSetStillAvailableGroups(subgroups) {
        let tmp = [];
        newAllGroupsForUser.current.forEach(group => {
            let exists = subgroups.some(subgroup => String(subgroup.maingroup) === String(group.value));
            if (exists) tmp.push(group);
        })
        return tmp;
    };

    async function newSetSubgroupsForTmpGroups() {
        let groupId = document.getElementById('group').value;
        let tmp = [];
        tmp = newTmpOptionsForSubgroups.filter(subgroup => String(subgroup.maingroup) === String(groupId));
        return tmp
    }

    function newHandleGroup() {
        newSetSubgroupsForTmpGroups().then(subgroups => {
            setNewTmpSubgroupsForGroup(subgroups);
        });
    };

    // *********************************************************************************************
    // END of NEW functions - the unused old functions are deleted!
    // *********************************************************************************************

    // adding item to items
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
        // field "totalAmount" is not editable when there are already some items in items
        if (tmpItems.length > 0) {
            document.getElementById("totalAmount").readOnly = true;
            // document.getElementById("amount").readOnly = false;
        };
        return tmpItems;
    };

    // recalculate the value for first item in list
    async function updateFirstItemInItems(tmpItems) {
        document.getElementById("group").focus();
        let sumAmount = 0;
        if (tmpItems.length === 0) return [];
        tmpItems.forEach((item, index) => {
            if (index !== 0) sumAmount = sumAmount + Number(item.amount);
        });
        tmpItems[0].amount = Number(totalAmountRef.current.value) - sumAmount;
        return tmpItems;
    };

    // deleting item from list
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

    function updateItem(id, addNumber) {
        const newItems = [...items];
        if (addNumber > Number(items[0].amount)) {
            addNumber = items[0].amount;
        };
        let index = newItems.findIndex(item => item.id === id);
        if ((addNumber < 0) && (Number(newItems[index].amount) < -addNumber)) {
            addNumber = -Number(newItems[index].amount);
        };
        newItems[index].amount = Number(newItems[index].amount) + addNumber;
        updateFirstItemInItems(newItems).then((updatedItems) => {
            setItems(updatedItems);
        });
    };

    function updateNote(id, newNote) {
        const newItems = [...items];
        let index = newItems.findIndex(item => item.id === id);
        newItems[index].note = newNote;
        setItems(newItems);
    };

    function handleTotalAmount(e) {
        let tmp = e.target.value;
        if (tmp === "") tmp = 0; else tmp = Number(tmp);
        if (tmp < 0) tmp = 0;
        totalAmountRef.current.value = tmp;
        if (items.length === 0) amountRef.current.value = tmp;
    };
    
    function blurTotalAmount() {
        totalAmountRef.current.value = parseFloat(totalAmountRef.current.value).toFixed(2);
        amountRef.current.value = parseFloat(amountRef.current.value).toFixed(2);
    };

    function blurAmount() {
        amountRef.current.value = parseFloat(amountRef.current.value).toFixed(2);
    };

    function handleAccount(e) {
        accountRef.current = e.target.value;
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
        let tmpGroup = document.getElementById('group').value;
        if (!MyFunctions.checkGroupIsValid(tmpGroup)) return;
        if (MyFunctions.checkAmountIs0(amountRef.current.value, "amount", "Amount", true)) return;
        if (items.length > 0) {
            if (MyFunctions.checkAmountIsTooBig(amountRef.current.value, "amount", "Amount", true, items[0].amount)) return;
        };
        let tmp = newTmpOptionsForGroups.filter(item => item.value === tmpGroup);
        const group = tmp[0].label;
        const groupId = tmp[0].value;
        let tmpSubroup = document.getElementById('subgroup').value;
        tmp = newTmpSubgroupsForGroup.filter(item => item.value === tmpSubroup);
        const subgroup = tmp[0].label;
        const subgroupId = tmp[0].value;
        // const amount = Number(amountRef.current.value).toFixed(2);
        const amount = Number(amountRef.current.value);
        const note = noteRef.current.value;
        // adding new item
        addItemToItems(items, group, groupId, subgroup, subgroupId, amount, note).then((newItems) => {
            // update value of first item
            updateFirstItemInItems(newItems).then((updatedItems) => {
                setItems([...updatedItems]);
            });
        });

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
                            <input id="totalAmount" ref={totalAmountRef} type="number" onChange={handleTotalAmount} onFocus={handleTotalAmount} onBlur={blurTotalAmount} />
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
                <select id="group" onChange={newHandleGroup}>
                    {newTmpOptionsForGroups.map((option) => (
                        <option key={option.value} value={option.value}>
                            {option.label}
                        </option>
                    ))}
                </select>
                <select id="subgroup">
                    {newTmpSubgroupsForGroup.map((option) => (
                        <option key={option.value} value={option.value} disabled={option.hide}>
                            {option.label}
                        </option>
                    ))}
                </select>
                <input id="amount" ref={amountRef} type="number"  onBlur={blurAmount}/>
                <br></br>
                <label>Note</label>
                <input ref={noteRef} type="text" />
                <button onClick={handleAddItem}>Add item</button>
            </div>
            <div>
                <Items items={items} deleteItem={deleteItem} updateItem={updateItem} updateNote={updateNote}/>
            </div>
            <button onClick={handleSave}>Save</button>
        </div>
    );
}

export default Additems;
