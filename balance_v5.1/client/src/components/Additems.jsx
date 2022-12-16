import React, { useEffect, useRef } from "react";
import * as MyFunctions from "../components/MyFunctions";

function Additems() {
    const dateRef = useRef();
    const facilityRef = useRef();
    const placeRef = useRef();
    const amountRef = useRef();
    const accountRef = useRef();

    // sessionStorage.removeItem("tmpDate");

    useEffect(() => {
        let tmpDate = sessionStorage.getItem("tmpDate");
        if (tmpDate==null) {
            let tmpDate = MyFunctions.onlyDateFromDateTime(new Date());
            sessionStorage.setItem("tmpDate", tmpDate);
        };
        dateRef.current.value = tmpDate;
    }, [])

    return (
        <div>
            <h1>Add items</h1>
            <label>Date</label>
            <input ref={dateRef} type="date" />
            <br></br>
            <label>Facility</label>
            <input ref={facilityRef} type="text" />
            <br></br>
            <label>Place</label>
            <input ref={placeRef} type="text" />
            <br></br>
            <label>Amount</label>
            <input ref={amountRef} type="number" />
            <br></br>
            <label>Paid with</label>
            <input ref={accountRef} type="text" />
        </div>
    );
}

export default Additems;