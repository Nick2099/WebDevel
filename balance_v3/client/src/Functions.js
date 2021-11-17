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

export function fillGroups(value) {
  for (var i = 0; i < value.length; i++) {
    var options = document.createElement("option");
    options.innerHTML = value[i].name;
    options.value = value[i].id;
    if (value[i].id === 0) {
      options.setAttribute("selected", true);
    }
    document.getElementById("select_group").appendChild(options);
  }
  return Promise.resolve(0);
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
  console.log("==> ", props);
  let subgroups = props.subgroups;
  let records = props.records;
  let newsubgroups = [];
  subgroups.forEach(subgroup => {
    let inside = false;
    records.forEach(record => {
      if (subgroup.id === record.subgroupid) {
        inside = true;
      };
    });
    if (!inside) {
      newsubgroups.push(subgroup);
    }
  })
  return Promise.resolve(newsubgroups);
}

export function removeGroups(props) {
  let subgroups = props.newsubgroups;
  let groups = props.groups;
  let newgroups = [];
  groups.forEach(group => {
    let inside = subgroups.some(item => item.groupid === group.id);
    if (inside) {
      newgroups.push(group);
    }
  })
  return Promise.resolve(newgroups);
}

export function getUsedSubGroups(props) {
  let subgroups = props.newsubgroups;
  let groupNo = Number(props.tmpGroup);
  let newsubgroups = [];

  subgroups.forEach(subgroup => {
    if (subgroup.groupid === groupNo) {
      newsubgroups.push(subgroup)
    }
  })

  return Promise.resolve(newsubgroups);
}

export function showNewRecord(props) {
  var element = props.data;
  var no = props.no;
  var tr = document.createElement("tr");
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
  label3.innerHTML = String(element.amount);
  td3.appendChild(label3);
  tr.appendChild(td3);
  var td4 = document.createElement("td");
  var input = document.createElement("input");
  input.defaultValue = 0;
  input.type = "number";
  input.id = "amount" + String(no);
  input.className = "width_100 right";
  td4.appendChild(input);
  var button1 = document.createElement("button");
  button1.className = "main";
  button1.type = "button";
  button1.innerHTML = "Add";
  td4.appendChild(button1);
  tr.appendChild(td4);
  var td5 = document.createElement("td");
  var button2 = document.createElement("button");
  button2.className = "main";
  button2.type = "button";
  button2.innerHTML = "Delete";
  td5.appendChild(button2);
  tr.appendChild(td5);

  var recs = document.getElementById("records");
  recs.appendChild(tr);
}