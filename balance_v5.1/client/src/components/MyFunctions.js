import Axios from "axios";

/*
export function addToLogFile(userID, actionID, additionalTxt) {
  Axios.post("http://localhost:3001/addtologfile", {
    user_id: userID,
    action_id: actionID,
    additional_txt: additionalTxt,
  }).catch((err) => {
    alert("Error in addToLogFile");
  });
}
*/

export function errorToText(error) {
  let error_tmp =
    "code:" +
    error?.code +
    " sql:" +
    error?.sql +
    " sqlMessage:" +
    error?.sqlMessage;
  return error_tmp;
};

export function getUserID(email) {
  return new Promise((resolve, reject) => {
    Axios.get("http://localhost:3001/getuserid", {
      params: { email: email },
    })
      .then((resp) => {
        if (resp.data.length > 0) resolve(resp.data[0].id);
        else resolve(0);
      })
      .catch((err) => {
        reject(err);
      });
  });
};

export function isEmailAddress(str) {
  return new Promise((resolve) => {
    var pattern =
      /(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))/;
    var test1 = pattern.test(str);
    var test2 = !str.includes(" ");
    resolve(test1 && test2);
  });
};

export function isPasswordValid(str) {
  return new Promise((resolve) => {
    var pattern = new RegExp(
      "^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})"
    );
    // (?=.*[!@#$%^&*]) =>  The string must contain at least one special character, but without
    //                      reserved RegEx characters to avoid conflict
    resolve(pattern.test(str));
  });
};

// Checked - works OK
export function registerNewUser(params) {
  return new Promise((resolve, reject) => {
    Axios.post("http://localhost:3001/registernewuser", {
      email: params.email,
      pass: params.pass,
      name: params.name,
      family: params.family,
    })
      .then((value) => {
        resolve("OK");
      })
      .catch((err) => {
        reject(err);
      });
  });
};

// Checked - works OK
export function updateMasterId(id) {
  return new Promise((resolve, reject) => {
    Axios.post("http://localhost:3001/updatemasterid", {
      id: id,
    })
      .then((value) => {
        resolve("OK");
      })
      .catch((err) => {
        reject(err);
      });
  });
};

// To check!
export function login({ email, password }) {
  return new Promise((resolve, reject) => {
    Axios.get("http://localhost:3001/login", {
      params: { email: email, password: password },
    })
      .then((resp) => {
        resolve(resp.data);
      })
      .catch((err) => {
        reject(err);
      });
  });
};

/*
export function updateWrongLogin({ id, wrong_login }) {
  return new Promise((resolve, reject) => {
    Axios.post("http://localhost:3001/updatewronglogin", {
      id: id,
      wrong_login: wrong_login,
    })
      .then((value) => {
        resolve("OK");
      })
      .catch((err) => {
        reject(err);
      });
  });
}
*/

export function getLocalUsers(master_id) {
  return new Promise((resolve, reject) => {
    Axios.get("http://localhost:3001/getlocalusers", {
      params: { master_id: master_id },
    })
      .then((resp) => {
        resolve(resp.data);
      })
      .catch((err) => {
        reject(err);
      });
  });
};

export function updateLocalUser(user) {
  return new Promise((resolve, reject) => {
    Axios.post("http://localhost:3001/updatelocaluser", {
      user: user,
    })
      .then((value) => {
        resolve("OK");
      })
      .catch((err) => {
        reject(err);
      });
  });
};

export function addLocalUser(props) {
  return new Promise((resolve, reject) => {
    Axios.post("http://localhost:3001/addlocaluser", {
      email: props.email,
      master_id: props.master_id,
    })
      .then((value) => {
        resolve("OK");
      })
      .catch((err) => {
        reject(err);
      });
  });
  // have to save user
};

export async function getAccounts(user_id = 1) {
  return new Promise((resolve, reject) => {
    Axios.get("http://localhost:3001/getaccounts", {
      params: { user_id: user_id },
    })
      .then((resp) => {
        if (resp.data.length > 0) resolve(resp.data);
        else resolve([]);
      })
      .catch((err) => {
        reject(err);
      });
  });
};

export async function getGroups(master_id = 1) {
  return new Promise((resolve, reject) => {
    Axios.get("http://localhost:3001/getgroups", {
      params: { master_id: master_id },
    })
      .then((resp) => {
        if (resp.data.length > 0) resolve(resp.data);
        else resolve([]);
      })
      .catch((err) => {
        reject(err);
      });
  });
};

export async function getSubgroups(maingroup_id) {
  return new Promise((resolve, reject) => {
    Axios.get("http://localhost:3001/getsubgroups", {
      params: { maingroup_id: maingroup_id },
    })
      .then((resp) => {
        if (resp.data.length > 0) resolve(resp.data);
        else resolve([]);
      })
      .catch((err) => {
        reject(err);
      });
  });
};

export function onlyDateFromDateTime(date) {
  return date.getFullYear() + "-" + (parseInt(date.getMonth()) + 1) + "-" + date.getDate();
};

export function checkMinimumLength(refValue, elementId, printedText, len, setFocus = false) {
  if (refValue < len) {
    alert("The length of text for " + printedText + " is too short!");
    if (setFocus) document.getElementById(elementId).focus();
    return true;
  } else
    return false;
};

export function checkDatum(refValue, elementId, setFocus = false) {
  if (refValue === "") {
    alert("Date is not valid!");
    if (setFocus) document.getElementById(elementId).focus();
    return true;
  } else
    return false;
};

export function checkAmountIs0(refValue, elementId, printedText, setFocus = false) {
  if (refValue === "0" || refValue === "") {
    alert(printedText + " can't be 0.");
    if (setFocus) document.getElementById(elementId).focus();
    return true;
  } else
    return false;
};

export function checkAmountIsTooBig(refValue, elementId, printedText, setFocus = false, maxValue) {
  if (refValue > maxValue) {
    alert(printedText + " can't be bigger than " + maxValue + "!\nFor the new entered only the value of first item can be reduced.");
    if (setFocus) document.getElementById(elementId).focus();
    return true;
  } else
    return false;
};

export function removeOption(options, items) {
  return new Promise((resolve, reject) => {
    // console.log("removeOption options:", options);
    let newOptions = options.map(option => {
      items.forEach(item => {
        if (option.value===item.subgroupId) option.hide=true;
      });
      return option;
    });    
    let newOptions2 = newOptions.filter(option => option.hide===false);
    // console.log("removeOption newOptions2:", newOptions2);
    resolve(newOptions2);
  })
};

// NEW functions for groups and subgroups!
export async function getAllGroups(master_id = 1) {
  return new Promise((resolve, reject) => {
    Axios.get("http://localhost:3001/getgroups", {
      params: { master_id: master_id },
    })
    .then((resp) => {
        if (resp.data.length > 0) resolve(resp.data);
        else resolve([]);
      })
      .catch((err) => {
        reject(err);
      });
  });
};

export async function getAllSubgroups(master_id = 1) {
  return new Promise((resolve, reject) => {
    Axios.get("http://localhost:3001/getallsubgroups", {
      params: { master_id: master_id },
    })
    .then((resp) => {
        if (resp.data.length > 0) resolve(resp.data);
        else resolve([]);
      })
      .catch((err) => {
        reject(err);
      });
  });
};


