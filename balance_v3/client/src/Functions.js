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
    if (value[i].id === 4) {
      options.setAttribute("selected", true);
    }
    document.getElementById("select_group").appendChild(options);
  }
  return Promise.resolve(4);
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
    if (value[i].id === 1) {
      options.setAttribute("selected", true);
    }
    document.getElementById("select_subgroup").appendChild(options);
  }
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