import Axios from "axios";

export function getGroups() {
  return new Promise((resolve, reject) => {
    Axios.get("http://localhost:3001/getgroups", {
      params: {},
    })
      .then((resp) => {
        resolve(resp.data);
      })
      .catch((err) => {
        console.log("Error: ", err);
      });
  });
}

export function fillGroups(props) {
  let value = props.newgroups;
  let choosenentry = Number(props.choosenentry);
  if (choosenentry === 1 || choosenentry === undefined) {
    for (let i = 0; i < value.length; i++) {
      if (value[i].id>0) {
        let options = document.createElement("option");
        options.innerHTML = value[i].name;
        options.value = value[i].id;
        options.id = "group_opt_" + value[i].id;
        document.getElementById("select_group").appendChild(options);  
      }
    }
  } else if (choosenentry===2) {
    for (let i = 0; i < value.length; i++) {
      if (value[i].id===-1) {
        let options = document.createElement("option");
        options.innerHTML = value[i].name;
        options.value = value[i].id;
        options.id = "group_opt_" + value[i].id;
        document.getElementById("select_group").appendChild(options);  
      }
    }
  } else { // should be only 9 left
    for (let i = 0; i < value.length; i++) {
      if (value[i].id===0) {
        let options = document.createElement("option");
        options.innerHTML = value[i].name;
        options.value = value[i].id;
        options.id = "group_opt_" + value[i].id;
        document.getElementById("select_group").appendChild(options);  
      }
    }
  }
  return Promise.resolve(0);
}

export function setTmpGroup(value) {
  Array.from(document.querySelector("#select_group").options).forEach(function (
    element
  ) {
    if (element.value === value) {
      element.setAttribute("selected", true);
    }
  });
}

export function getSubGroups() {
  return new Promise((resolve, reject) => {
    // let tmpValue = String(document.getElementById("select_group").value);
    Axios.get("http://localhost:3001/getsubgroups", {
      params: {
        // group: tmpValue,
      },
    })
      .then((resp) => {
        resolve(resp.data);
      })
      .catch((err) => {
        console.log("Error: ", err);
      });
  });
}

export function fillSubGroups(value) {
  for (var i = 0; i < value.length; i++) {
    var options = document.createElement("option");
    options.innerHTML = value[i].name;
    options.value = value[i].id;
    if (value[i].id === 0) {
      options.setAttribute("selected", true);
    }
    document.getElementById("select_subgroup").appendChild(options);
  }
  return Promise.resolve(0);
}

export function removeAllOptionsFromSelect(name) {
  let selectBox = document.getElementById(name);
  while (selectBox.options.length > 0) {
    selectBox.remove(0);
  }
  return Promise.resolve("ok");
}

export function removeSubgroups(props) {
  let subgroups = props.subgroups;
  let records = props.records;
  let newsubgroups = [];
  subgroups.forEach((subgroup) => {
    let inside = false;
    records.forEach((record) => {
      if (subgroup.id === record.subgroupid) {
        inside = true;
      }
    });
    if (!inside) {
      newsubgroups.push(subgroup);
    }
  });
  return Promise.resolve(newsubgroups);
}

export function removeGroups(props) {
  let subgroups = props.newsubgroups;
  let groups = props.groups;
  let newgroups = [];
  groups.forEach((group) => {
    let inside = subgroups.some((item) => item.groupid === group.id);
    if (inside) {
      newgroups.push(group);
    }
  });
  return Promise.resolve(newgroups);
}

export function getUsedSubGroups(props) {
  let subgroups = props.newsubgroups;
  let groupNo = Number(props.tmpGroup);
  let newsubgroups = [];

  subgroups.forEach((subgroup) => {
    if (subgroup.groupid === groupNo) {
      newsubgroups.push(subgroup);
    }
  });

  return Promise.resolve(newsubgroups);
}

export function showNewRecord(props) {
  var element = props.data;
  var no = props.no;
  var tr = document.createElement("tr");
  tr.id = "row_record";
  var td1 = document.createElement("td");
  var label1 = document.createElement("label");
  label1.innerHTML = element.groupname;
  td1.appendChild(label1);
  tr.appendChild(td1);
  var td2 = document.createElement("td");
  var label2 = document.createElement("label");
  label2.innerHTML = element.subgroupname;
  td2.appendChild(label2);
  tr.appendChild(td2);
  var td3 = document.createElement("td");
  var label3 = document.createElement("label");
  label3.innerHTML = element.amount.toFixed(2);
  label3.id = "lab_amount" + String(no);
  td3.appendChild(label3);
  tr.appendChild(td3);
  var td4 = document.createElement("td");
  if (no !== 0) {
    var input = document.createElement("input");
    input.defaultValue = 0;
    input.type = "number";
    input.id = "inp_amount" + String(no);
    input.className = "width_100 right";
    td4.appendChild(input);
    var button1 = document.createElement("button");
    button1.className = "main";
    button1.type = "button";
    button1.innerHTML = "Add";
    button1.id = "addButton" + String(no);
    td4.appendChild(button1);
  }
  tr.appendChild(td4);
  var td5 = document.createElement("td");
  var button2 = document.createElement("button");
  button2.className = "main";
  button2.type = "button";
  button2.innerHTML = "Delete";
  button2.id = "delButton" + String(no);
  td5.appendChild(button2);
  tr.appendChild(td5);
  var td6 = document.createElement("td");
  var check = document.createElement("input");
  check.type = "checkbox";
  check.id = "checkbox" + String(no);
  td6.appendChild(check);
  tr.appendChild(td6);
  var td7 = document.createElement("td");
  var button3 = document.createElement("button");
  button3.className = "main";
  button3.type = "button";
  button3.innerHTML = "Add";
  button3.id = "commentButton" + String(no);
  td7.appendChild(button3);
  tr.appendChild(td7);

  var recs = document.getElementById("records");
  recs.appendChild(tr);

  return Promise.resolve(String(no));
}

export function checkPass(props) {
  let password = props;
  let passwordOk = [false, false, false, false, false, false];
  let tmp = 0;
  // checking for uppercase letters
  for (let i = 0; i < password.length; i++) {
    tmp = password.charCodeAt(i);
    if (tmp > 64 && tmp < 91) {
      passwordOk[0] = true;
      i = password.length;
    }
  }
  // checking for lowcase letters
  for (let i = 0; i < password.length; i++) {
    tmp = password.charCodeAt(i);
    if (tmp > 96 && tmp < 123) {
      passwordOk[1] = true;
      i = password.length;
    }
  }
  // checking for numbers
  for (let i = 0; i < password.length; i++) {
    tmp = password.charCodeAt(i);
    if (tmp > 47 && tmp < 58) {
      passwordOk[2] = true;
      i = password.length;
    }
  }
  // checking for special characters
  for (let i = 0; i < password.length; i++) {
    tmp = password.charCodeAt(i);
    if (
      (tmp > 32 && tmp < 48) ||
      (tmp > 57 && tmp < 64) ||
      (tmp > 90 && tmp < 97) ||
      (tmp > 122 && tmp < 127) ||
      tmp === 167 ||
      tmp === 180
    ) {
      passwordOk[3] = true;
      i = password.length;
    }
  }
  // checking lenght
  if (password.length > 7) {
    passwordOk[4] = true;
  }
  // all checks together as a one
  passwordOk[5] =
    passwordOk[0] &&
    passwordOk[1] &&
    passwordOk[2] &&
    passwordOk[3] &&
    passwordOk[4];

  return Promise.resolve(passwordOk);
}
