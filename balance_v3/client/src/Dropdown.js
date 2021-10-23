// import React from "react";

export function Dropdown({id, name, options, width, addto}) {
    console.log("props: ",id, name, options, width, addto);
    var lab = document.createElement('label');
    lab.id = "label_"+id;
    lab.innerHTML = name;
    var sel = document.createElement('select');
    sel.id = "select_"+id;
    sel.style.width = width;
    lab.appendChild(sel);
    for(var i = 0; i < options.length; i++) {
        var opt = document.createElement('option');
        opt.innerHTML = options[i].name;
        opt.value = options[i].value;
        sel.appendChild(opt);
    }
    document.getElementById(addto).appendChild(lab);
    console.log(sel.outerHTML);
    return null;
}

export function Option(name) {
  console.log("name: ", "select_"+name);
  var e = document.getElementById("select_"+name);
  var strUser = e.value;
  return strUser;
}
