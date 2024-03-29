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
        reject("Error: ", err);
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

export function addLocalUsersToTable(tmp) {
  let tbody = document.createElement("tbody");
  tbody.id = "localUsersBody";
  document.getElementById("localUsers").appendChild(tbody);
  return new Promise((resolve, reject) => {
    tmp.forEach((tmpone) => {
      let tr = document.createElement("tr");
      tr.name = "tr" + String(tmpone.id);
      let td1 = document.createElement("td");
      let label1 = document.createElement("label");
      label1.innerHTML = tmpone.name;
      label1.id = "nameLocalUser" + String(tmpone.id);
      label1.maxLength = maxNameLength;
      td1.appendChild(label1);
      tr.appendChild(td1);
      let td2 = document.createElement("td");
      let label2 = document.createElement("label");
      label2.innerHTML = tmpone.email;
      label2.id = "emailLocalUser" + String(tmpone.id);
      label2.maxLength = maxEmailLength;
      td2.appendChild(label2);
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
      let td4 = document.createElement("td");
      let button4 = document.createElement("button");
      button4.type = "button";
      button4.innerHTML = "Delete";
      button4.onclick = "deleteLocalUser";
      button4.id = "delLocalUser" + String(tmpone.id);
      td4.appendChild(button4);
      tr.appendChild(td4);
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

export function getAllLocalUsers(valueuserid) {
  return new Promise((resolve, reject) => {
    Axios.get("http://localhost:3001/getalllocalusers", {
      params: {
        userid: valueuserid,
      },
    })
      .then((resp) => {
        resolve({ status: "OK", data: resp.data });
      })
      .catch((err) => {
        reject({ status: "Error: ", err: err });
      });
  });
}

export function addAllLocalUsers(value, id, admin) {
  return new Promise((resolve, reject) => {
    var tr = document.createElement("tr");
    let tmpcounter = 0;
    value.forEach((tmpvalue) => {
      if (admin === 1 || tmpvalue.id === id) {
        var td = document.createElement("td");
        td.innerHTML = tmpvalue.name;
        var inp = document.createElement("input");
        inp.type = "checkbox";
        inp.value = tmpvalue.id;
        inp.id = "localUserId" + tmpcounter;
        inp.checked = true;
        td.appendChild(inp);
        tr.appendChild(td);
        tmpcounter++;
      }
    });
    document.getElementById("allLocalUsers").appendChild(tr);
    resolve({ status: "OK", noOfLocalUsers: tmpcounter });
  });
}

export function getAllYears(id, userid, admin) {
  return new Promise((resolve, reject) => {
    Axios.get("http://localhost:3001/getallyears", {
      params: {
        locuser: id,
        userid: userid,
        admin: admin,
      },
    })
      .then((resp) => {
        resolve({ status: "OK", data: resp.data });
      })
      .catch((err) => {
        resolve({ status: "Error", err: err });
      });
  });
}

export function dateRangeCheck(tmpDate) {
  return new Promise((resolve, reject) => {
    let year = tmpDate.slice(0, 4);
    let today = new Date();
    let yyyy = today.getFullYear();
    if (year < yyyy - 1) {
      let newDate = (yyyy - 1).toString() + "-01-01";
      resolve({ status: "Change", newDate: newDate });
    }
    if (year > yyyy + 1) {
      let newDate = (yyyy + 1).toString() + "-12-31";
      resolve({ status: "Change", newDate: newDate });
    }
    resolve({ status: "OK" });
  });
}

export function getShowForChoosen(
  choosenLocalUserIds,
  choosenPeriod,
  choosenMonth,
  choosenYear,
  choosenTemplate,
  choosenGroup
) {

  function daily() {
    return new Promise((resolve, reject) => {
      Axios.get("http://localhost:3001/showdaily", {
        params: {
          localUserIds: choosenLocalUserIds,
          month: choosenMonth,
          year: choosenYear,
          template: choosenTemplate,
          group: choosenGroup,
        },
      })
        .then((resp) => {
          resolve({ status: "OK", data: resp.data });
        })
        .catch((err) => {
          resolve({ status: "Error", err: err });
        });
    });
  }

  function weekly() {
    return new Promise((resolve, reject) => {
      Axios.get("http://localhost:3001/showweekly", {
        params: {
          localUserIds: choosenLocalUserIds,
          month: choosenMonth,
          year: choosenYear,
          template: choosenTemplate,
          group: choosenGroup,
        },
      })
        .then((resp) => {
          resolve({ status: "OK", data: resp.data });
        })
        .catch((err) => {
          resolve({ status: "Error", err: err });
        });
    });
  }

  function monthly() {
    return new Promise((resolve, reject) => {
      Axios.get("http://localhost:3001/showmonthly", {
        params: {
          localUserIds: choosenLocalUserIds,
          month: choosenMonth,
          year: choosenYear,
          template: choosenTemplate,
          group: choosenGroup,
        },
      })
        .then((resp) => {
          resolve({ status: "OK", data: resp.data });
        })
        .catch((err) => {
          resolve({ status: "Error", err: err });
        });
    });
  }

  return new Promise((resolve, reject) => {
    if (choosenPeriod === "0") {
      daily().then((value) => {
        resolve({ status: "OK", data: value.data });
      });
    } else if (choosenPeriod === "1") {
      weekly().then((value) => {
        resolve({ status: "OK", data: value.data });
      });
    } else if (choosenPeriod === "2") {
      monthly().then((value) => {
        resolve({ status: "OK", data: value.data });
      });
    };
  });
}

export function prepareDataForGraph(
  choosenLocalUserIds,
  choosenPeriod,
  choosenMonth,
  choosenYear,
  choosenTemplate,
  choosenGroup,
  data,
  subgroups,
  groups
) {
  
  var colors = [
    "red",
    "blue",
    "green",
    "darkred",
    "darkblue",
    "darkgreen",
    "lightblue",
    "orange",
    "lightgreen",
    "darkcyan",
    "darkmagenta",
  ];
  var type = [
    { id: 1, name: "Expense" },
    { id: 2, name: "Income" },
    { id: 3, name: "Transfer" },
    { id: 4, name: "Transfer income" },
    { id: 8, name: "Balance" },
    { id: 9, name: "Conto" },
  ];

  function lastDayOfMonthOfYear(month, year) {
    if (month > 11) {
      month = 0;
      year = year + 1;
    }
    let d = new Date(year, month, 0).getDate();
    return d;
  }

  function createDailyData(lastDayOfMonth, labels) {
    let lines = [];
    return new Promise((resolve, reject) => {
      let tmpData = [];
      for (let day = 1; day <= lastDayOfMonth; day++) {
        let tmpDate =
          day.toLocaleString("en-US", {
            minimumIntegerDigits: 2,
            useGrouping: false,
          }) +
          "-" +
          parseInt(choosenMonth).toLocaleString("en-US", {
            minimumIntegerDigits: 2,
            useGrouping: false,
          }) +
          "-" +
          choosenYear;
        let tmpLine = { date: tmpDate };
        labels.forEach((label) => {
          let tmpValue = 0;
          for (let i = 0; i < data.length; i++) {
            if (data[i].date === tmpDate && data[i].label === label.id) {
              tmpValue = data[i].sum;
            }
            tmpLine[label.name] = tmpValue;
          }
        });
        tmpData.push(tmpLine);
      }
      let modulof = colors.length;
      labels.forEach((label, i) => {
        let tmpLine = {};
        tmpLine.name = label.name;
        let tmpi = i % modulof;
        tmpLine.stroke = colors[tmpi];
        lines.push(tmpLine);
      });
      resolve({ status: "OK", data: tmpData, lines: lines });
    });
  }

  function dailyData() {
    return new Promise((resolve, reject) => {
      let lastDayOfMonth = lastDayOfMonthOfYear(choosenMonth, choosenYear);
      if (choosenTemplate === "0") {
        createDailyData(lastDayOfMonth, groups).then((value) => {
          resolve({ status: "OK", data: value.data, lines: value.lines });
        });
      } else if (choosenTemplate === "1") {
        createDailyData(lastDayOfMonth, subgroups).then((value) => {
          resolve({ status: "OK", data: value.data, lines: value.lines });
        });
      } else {
        createDailyData(lastDayOfMonth, type).then((value) => {
          resolve({ status: "OK", data: value.data, lines: value.lines });
        });
      }
    });
  }

  
  function createWeeklyData(labels) {
    let lines = [];
    return new Promise((resolve, reject) => {
      let tmpData = [];
      for (let week = 1; week <= 53; week++) {
        let tmpDate =
          parseInt(week).toLocaleString("en-US", {
            minimumIntegerDigits: 2,
            useGrouping: false,
          }) +
          "-" +
          choosenYear;
        let tmpLine = { date: tmpDate };
        labels.forEach((label) => {
          let tmpValue = 0;
          for (let i = 0; i < data.length; i++) {
            if (data[i].date === tmpDate && data[i].label === label.id) {
              tmpValue = data[i].sum;
            }
            tmpLine[label.name] = tmpValue;
          }
        });
        tmpData.push(tmpLine);
      }
      let modulof = colors.length;
      labels.forEach((label, i) => {
        let tmpLine = {};
        tmpLine.name = label.name;
        let tmpi = i % modulof;
        tmpLine.stroke = colors[tmpi];
        lines.push(tmpLine);
      });
      resolve({ status: "OK", data: tmpData, lines: lines });
    });
  }

  function weeklyData() {
    return new Promise((resolve, reject) => {
      if (choosenTemplate === "0") {
        createWeeklyData(groups).then((value) => {
          resolve({ status: "OK", data: value.data, lines: value.lines });
        });
      } else if (choosenTemplate === "1") {
        createWeeklyData(subgroups).then((value) => {
          resolve({ status: "OK", data: value.data, lines: value.lines });
        });
      } else {
        createWeeklyData(type).then((value) => {
          resolve({ status: "OK", data: value.data, lines: value.lines });
        });
      }
    });
  }

  function createMonthlyData(labels) {
    let lines = [];
    return new Promise((resolve, reject) => {
      let tmpData = [];
      for (let month = 1; month <= 12; month++) {
        let tmpDate =
          parseInt(month).toLocaleString("en-US", {
            minimumIntegerDigits: 2,
            useGrouping: false,
          }) +
          "-" +
          choosenYear;
        let tmpLine = { date: tmpDate };
        labels.forEach((label) => {
          let tmpValue = 0;
          for (let i = 0; i < data.length; i++) {
            if (data[i].date === tmpDate && data[i].label === label.id) {
              tmpValue = data[i].sum;
            }
            tmpLine[label.name] = tmpValue;
          }
        });
        tmpData.push(tmpLine);
      }
      let modulof = colors.length;
      labels.forEach((label, i) => {
        let tmpLine = {};
        tmpLine.name = label.name;
        let tmpi = i % modulof;
        tmpLine.stroke = colors[tmpi];
        lines.push(tmpLine);
      });
      resolve({ status: "OK", data: tmpData, lines: lines });
    });
  }

  function monthlyData() {
    return new Promise((resolve, reject) => {
      if (choosenTemplate === "0") {
        createMonthlyData(groups).then((value) => {
          resolve({ status: "OK", data: value.data, lines: value.lines });
        });
      } else if (choosenTemplate === "1") {
        createMonthlyData(subgroups).then((value) => {
          resolve({ status: "OK", data: value.data, lines: value.lines });
        });
      } else {
        createMonthlyData(type).then((value) => {
          resolve({ status: "OK", data: value.data, lines: value.lines });
        });
      }
    });
  }

  return new Promise((resolve, reject) => {
    if (choosenPeriod === "0") {
      dailyData().then((value) => {
        resolve({ status: "OK", data: value.data, lines: value.lines });
      });
    } else if (choosenPeriod === "1") {
      weeklyData().then((value) => {
        resolve({ status: "OK", data: value.data, lines: value.lines });
      });
    } else if (choosenPeriod === "2") {
      monthlyData().then((value) => {
        resolve({ status: "OK", data: value.data, lines: value.lines });
      });
    };
  });
}

export function getSubGroupsForShow(id, group) {
  return new Promise((resolve, reject) => {
    Axios.get("http://localhost:3001/getsubgroupsforshow", {
      params: { id: id, group: group },
    })
      .then((resp) => {
        resolve({ status: "OK", data: resp.data });
      })
      .catch((err) => {
        resolve({ status: "Error", error: err });
      });
  });
}
