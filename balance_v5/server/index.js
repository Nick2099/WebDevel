import Express from "express";
const app = Express();
import Mysql from "mysql";
import Cors from "cors";
import bcrypt from "bcrypt";

import "dotenv/config.js";

app.use(Cors()); // allows to make request from frontend to the backend
app.use(Express.json());

const db = Mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_DATA,
});

app.get("/doesuserexists", async (req, res) => {
  db.query(
    'SELECT id FROM mybalance5.user WHERE email="' + req.query.email + '"',
    (err, result) => {
      if (err) {
        res.status(400).send(err);
      } else {
        res.send(result);
      }
    }
  );
});

app.post("/addtologfile", async (req, res) => {
  const datetime = new Date().toISOString().slice(0, 19).replace("T", " ");
  const user_id = req.body.user_id;
  const error_id = req.body.error_id;
  const error_txt = req.body.error_txt;
  db.query(
    "INSERT INTO mybalance5.log (datetime, user_id, error_id, error_txt) VALUES (?,?,?,?)",
    [datetime, user_id, error_id, error_txt],
    (err, result) => {
      if (err) {
        res.send({ status: "Error", error: err });
      } else {
        res.send({ status: "OK" });
      }
    }
  );
});

app.listen(3001, () => {
  console.log("Server is running on port 3001!");
});
