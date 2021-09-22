import React from "react";

function Hello() {

    const seyHello = () => {
        console.log("Hello");
    }

    return (
    <div>
        <h2>... and this is the Hello component.</h2>
        <button onClick={seyHello}>Say hello</button>
        <br />
        <br />
    </div>
    )
}

export default Hello;
