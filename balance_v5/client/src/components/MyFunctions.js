import Axios from "axios";

export function addToLogFile(userID, actionID, additionalTxt) {
  Axios.post("http://localhost:3001/addtologfile", {
    user_id: userID,
    action_id: actionID,
    additional_txt: additionalTxt,
  }).catch((err) => {
    alert("Error in addToLogFile");
  });
}

export function errorToText(error) {
  let error_tmp =
    "code:" +
    error?.code +
    " sql:" +
    error?.sql +
    " sqlMessage:" +
    error?.sqlMessage;
  return error_tmp;
}

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
}

export function isEmailAddress(str) {
  return new Promise((resolve) => {
    var pattern =
      /(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))/;
    var test1 = pattern.test(str);
    var test2 = !str.includes(" ");
    resolve(test1 && test2);
  });
}

export function isPasswordValid(str) {
  return new Promise((resolve) => {
    var pattern = new RegExp(
      "^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})"
    ); 
    // (?=.*[!@#$%^&*]) =>  The string must contain at least one special character, but without
    //                      reserved RegEx characters to avoid conflict
    resolve(pattern.test(str));
  });
}

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
}

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
}

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
}

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
}

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
}