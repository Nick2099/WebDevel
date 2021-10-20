import React from "react";

export function Dropdown(props) {
    console.log("props: ",props);
    var lab = document.createElement('label');
    lab.id = props.id;
    lab.innerHTML = props.linkto;
    var sel = document.createElement('select');
    sel.setAttribute("id", props.id);
    lab.appendChild(sel);
    // <label id="Person">Person</label>
    for(var i = 0; i < props.options.length; i++) {
        var opt = document.createElement('option');
        opt.innerHTML = props.options[i].name;
        opt.value = props.options[i].value;
        sel.appendChild(opt);
    }
    document.getElementById("EntryArea").appendChild(lab);
    console.log(sel.outerHTML);
    return null;
    // [sel.outerHTML];
}

/*
export function Option(props) {
  return <StyledOption selected={props.selected}>{props.value}</StyledOption>;
}
*/