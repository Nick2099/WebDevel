import Axios from "axios";

export function getGroups() {
  return new Promise((resolve, reject) => {
    Axios.get("http://localhost:3001/getstandardgroups", {
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
    let tmpValue = String(document.getElementById("select_group").value);
    Axios.get("http://localhost:3001/getsubgroups", {
      params: {
        group: tmpValue,
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
