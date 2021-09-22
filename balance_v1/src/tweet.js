import React from "react";
import './App.css';

function Tweet(props){
    return (
        <div className="tweet">
            <h2>{props.name}</h2>
            <p>This is a random tweet.</p>
            <h3>Number of likes</h3>
        </div>
    );
}

export default Tweet;

function Tweet2({name, age, likes}){
    return (
        <div className="tweet">
            <h2>Name: {name}</h2>
            <p>Age: {age}</p>
            <h3>Like:</h3>
            {likes.map(like => (
                <p>{like}</p>
            ))}
        </div>
    );
}

export {Tweet2};