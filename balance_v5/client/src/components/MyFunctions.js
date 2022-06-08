import Axios from "axios";

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

