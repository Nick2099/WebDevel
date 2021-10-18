import React from "react";

export function Dropdown(props) {
    console.log("props: ",props);
    var sel = document.createElement('select');
    sel.setAttribute("id", props.id);
    for(var i = 0; i < props.options.length; i++) {
        var opt = document.createElement('option');
        opt.innerHTML = props.options[i].name;
        opt.value = props.options[i].value;
        sel.appendChild(opt);
    }
    console.log(sel);
    return sel.outerHTML;
}

/*
export function Option(props) {
  return <StyledOption selected={props.selected}>{props.value}</StyledOption>;
}
*/