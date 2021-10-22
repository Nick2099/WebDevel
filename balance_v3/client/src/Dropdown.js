// import React from "react";

export function Dropdown(id, linkto, options, width) {
    console.log("props: ",id, linkto, options);
    var lab = document.createElement('label');
    lab.id = "label_"+id;
    lab.innerHTML = linkto;
    var sel = document.createElement('select');
    sel.id = "select_"+id;
    sel.id = width;
    lab.appendChild(sel);
    // <label id="Person">Person</label>
    for(var i = 0; i < options.length; i++) {
        var opt = document.createElement('option');
        opt.innerHTML = options[i].name;
        opt.value = options[i].value;
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