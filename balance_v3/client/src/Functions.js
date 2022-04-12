import Axios from "axios";
const maxNameLength = 30;
const maxEmailLength = 45;
// const maxPasswordLength = 20;

export function getBasicGroups() {
  return new Promise((resolve, reject) => {
    Axios.get("http://localhost:3001/getbasicgroups", {
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

export function getGroups(id) {
  return new Promise((resolve, reject) => {
    Axios.get("http://localhost:3001/getgroups", {
      params: { id: id },
    })
      .then((resp) => {
        resolve(resp.data);
      })
      .catch((err) => {
        console.log("Error: ", err);
      });
  });
}

export function createGroupsInGroups(id, groups) {
  return new Promise((resolve, reject) => {
    Axios.post("http://localhost:3001/creategroupsingroups", {
      id: id,
      groups: groups,
    }).then(function (response) {
      if (response.statusText === "OK") {
        resolve({ status: "OK" });
      } else {
        alert("createGroupsInGroups: " + response.data.error);
      }
    });
  });
}

export function createSubgroupsInSubgroups(id, subgroups) {
  return new Promise((resolve, reject) => {
    Axios.post("http://localhost:3001/createsubgroupsinsubgroups", {
      id: id,
      subgroups: subgroups,
    }).then(function (response) {
      if (response.statusText === "OK") {
        resolve({ status: "OK" });
      } else {
        alert("createSubgroupsInSubgroups: " + response.data.error);
      }
    });
  });
}

export function fillGroups(props) {
  let value = props.newgroups;
  let choosenentry = Number(props.choosenentry);
  let thereAreResults = false;
  if (choosenentry === 1 || choosenentry === undefined) {
    // Expense
    for (let i = 0; i < value.length; i++) {
      if (value[i].id > 9) {
        let options = document.createElement("option");
        options.innerHTML = value[i].name;
        options.value = value[i].id;
        options.id = "group_opt_" + value[i].id;
        document.getElementById("select_group").appendChild(options);
        thereAreResults = true;
      }
    }
  } else if (choosenentry === 2) {
    // Income
    for (let i = 0; i < value.length; i++) {
      if (value[i].id === 1) {
        let options = document.createElement("option");
        options.innerHTML = value[i].name;
        options.value = value[i].id;
        options.id = "group_opt_" + value[i].id;
        document.getElementById("select_group").appendChild(options);
        thereAreResults = true;
      }
    }
  } else if (choosenentry === 3) {
    // Transfer
    for (let i = 0; i < value.length; i++) {
      if (value[i].id === 3) {
        let options = document.createElement("option");
        options.innerHTML = value[i].name;
        options.value = value[i].id;
        options.id = "group_opt_" + value[i].id;
        document.getElementById("select_group").appendChild(options);
        thereAreResults = true;
      }
    }
  } else {
    // should be only 9 left
    for (let i = 0; i < value.length; i++) {
      if (value[i].id === 2) {
        let options = document.createElement("option");
        options.innerHTML = value[i].name;
        options.value = value[i].id;
        options.id = "group_opt_" + value[i].id;
        document.getElementById("select_group").appendChild(options);
        thereAreResults = true;
      }
    }
  }
  return Promise.resolve(thereAreResults);
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

export function getBasicSubGroups() {
  return new Promise((resolve, reject) => {
    Axios.get("http://localhost:3001/getbasicsubgroups", { params: {} })
      .then((resp) => {
        resolve(resp.data);
      })
      .catch((err) => {
        resolve({ Error: err });
      });
  });
}

export function getSubGroups(id) {
  return new Promise((resolve, reject) => {
    Axios.get("http://localhost:3001/getsubgroups", { params: { id: id } })
      .then((resp) => {
        resolve(resp.data);
      })
      .catch((err) => {
        resolve({ Error: err });
      });
  });
}

export function joinSubGroups(subgroup1, subgroup2) {
  return new Promise((resolve, reject) => {
    let tmp = subgroup1.concat(subgroup2);
    resolve(tmp);
  });
}

export function createRecordsIfTranfer(record, records) {
  return new Promise((resolve, reject) => {
    let newRecord = {};
    let newRecords = [];
    if (record.type === 3) {
      for (let i = 0; i < records.length; i++) {
        newRecords.push({
          amount: records[i].amount,
          groupid: 4,
          subgroupid: record.locuser,
          comment: "",
        });
      }
      newRecord.userid = record.userid;
      newRecord.locuser = records[0].subgroupid;
      newRecord.date = record.date;
      newRecord.place = record.place;
      newRecord.type = 4;
      newRecord.cur = record.cur;
    }
    resolve({ record: newRecord, records: newRecords });
  });
}

export function getTransferSubGroupsNames(valueid, valueuserid) {
  return new Promise((resolve, reject) => {
    Axios.get("http://localhost:3001/gettransfersubgroups", {
      params: {
        id: valueid,
        userid: valueuserid,
      },
    })
      .then((resp) => {
        let tmpdata = resp.data;
        let tmpSubGroup = [];
        for (let i = 0; i < tmpdata.length; i++) {
          tmpSubGroup.push({
            id: tmpdata[i].id,
            groupid: 3,
            name: tmpdata[i].name,
          });
        }
        resolve(tmpSubGroup);
      })
      .catch((err) => {
        console.log("Error: ", err);
      });
  });
}

export function getLocalUsers(valueid, valueuserid) {
  return new Promise((resolve, reject) => {
    Axios.get("http://localhost:3001/getlocalusers", {
      params: {
        id: valueid,
        userid: valueuserid,
      },
    })
      .then((resp) => {
        let tmpdata = resp.data;
        let tmpSubGroup = [];
        for (let i = 0; i < tmpdata.length; i++) {
          tmpSubGroup.push({
            id: tmpdata[i].id,
            name: tmpdata[i].name,
            email: tmpdata[i].email,
            adv: tmpdata[i].adv,
          });
        }
        resolve(tmpSubGroup);
      })
      .catch((err) => {
        console.log("Error: ", err);
      });
  });
}

export function addLocalUserToTable(tmp) {
  let tbody = document.createElement("tbody");
  tbody.id = "localUsersBody";
  document.getElementById("localUsers").appendChild(tbody);
  return new Promise((resolve, reject) => {
    tmp.forEach((tmpone) => {
      let tr = document.createElement("tr");
      tr.name = "tr" + String(tmpone.id);
      let td1 = document.createElement("td");
      let input1 = document.createElement("input");
      input1.value = tmpone.name;
      input1.id = "nameLocalUser" + String(tmpone.id);
      input1.maxLength = maxNameLength;
      td1.appendChild(input1);
      tr.appendChild(td1);
      let td2 = document.createElement("td");
      let input2 = document.createElement("input");
      input2.value = tmpone.email;
      input2.id = "emailLocalUser" + String(tmpone.id);
      input2.maxLength = maxEmailLength;
      td2.appendChild(input2);
      tr.appendChild(td2);
      let td3 = document.createElement("td");
      let input3 = document.createElement("input");
      input3.type = "checkbox";
      if (tmpone.adv === 1) {
        input3.checked = true;
      } else {
        input3.checked = false;
      }
      input3.id = "advLocalUser" + String(tmpone.id);
      td3.appendChild(input3);
      tr.appendChild(td3);
      document.getElementById("localUsersBody").appendChild(tr);
    });
  });
}

export function deleteAllRowsInLocalUsersTable() {
  var tbl = document.getElementById("localUsers"); // Get the table
  tbl.removeChild(tbl.getElementsByTagName("tbody")[0]);  
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
  var td7 = document.createElement("td");
  var label7 = document.createElement("label");
  label7.innerHTML = element.comment;
  label7.id = "lab_comment" + String(no);
  td7.appendChild(label7);
  tr.appendChild(td7);
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
  // tr.appendChild(td6);

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

export function getCurrencies() {
  return new Promise((resolve, reject) => {
    Axios.get("http://localhost:3001/getcurrencies", {
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

export function setCurrencies({ cur, curs }) {
  return new Promise((resolve, reject) => {
    var sel = document.getElementById("select_cur");
    curs.current.forEach((tmpcur) => {
      var opt = document.createElement("option");
      opt.innerHTML = tmpcur.cur + " (" + String(tmpcur.curdec) + ")";
      opt.value = tmpcur.cur + String(tmpcur.curdec);
      if (cur === tmpcur.cur) {
        opt.setAttribute("selected", true);
      }
      sel.appendChild(opt);
    });
  });
}
