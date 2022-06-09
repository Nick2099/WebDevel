import Axios from "axios";

export function addToLogFile(userID, errorID, errorTxt) {
  Axios.post("http://localhost:3001/addtologfile", {
    user_id: userID, error_id: errorID, error_txt: errorTxt
  })
  .catch((err) => {
    alert("Can't write to log file!");
  })
}

export function errorToText(error) {
  let error_tmp =
  "code:" +
  error?.code +
  " sql:" +
  error?.sql +
  " sqlMessage:" +
  error?.sqlMessage;
  return error_tmp
}

export function doesUserExists(email) {
  return new Promise((resolve, reject) => {
    Axios.get("http://localhost:3001/doesuserexists", {
      params: {email: email},
    })
      .then((resp) => {
        resolve(resp.data);
      })
      .catch((err) => {
        reject(err);
      });
  });
}

