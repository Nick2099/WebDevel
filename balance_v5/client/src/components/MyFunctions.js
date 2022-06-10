import Axios from "axios";

export function addToLogFile(userID, errorID, errorTxt) {
  Axios.post("http://localhost:3001/addtologfile", {
    user_id: userID,
    error_id: errorID,
    error_txt: errorTxt,
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

export function doesUserExists(email) {
  return new Promise((resolve, reject) => {
    Axios.get("http://localhost:3001/doesuserexists", {
      params: { email: email },
    })
      .then((resp) => {
        let result = false;
        if (resp.data.length > 0) result = true;
        resolve(result);
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
    var pattern = new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})");
    resolve(pattern.test(str));
  });
}
