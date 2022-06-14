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

app.get("/getuserid", async (req, res) => {
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
        res.status(400).send(err);
      } else {
        res.send(result);
      }
    }
  );
});

app.post("/registernewuser", async (req, res) => {
  const email = req.body.email;
  const password = req.body.pass;
  const name = req.body.name;
  const family = req.body.family;
  const master_id = 0;
  const admnin = 1;
  const wrong_login = 0;
  const demo_only = 0;
  bcrypt.genSalt(10, function (err, salt) {
    bcrypt.hash(password, salt, function (err, hash) {
      db.query(
        "INSERT INTO mybalance5.user (email, password, name, family, master_id, admin, wrong_login, demo_only) VALUES (?, ?, ?, ?, ?, ?, ?, ?)",
        [email, hash, name, family, master_id, admnin, wrong_login, demo_only],
        (err, result) => {
          if (err) {
            res.status(400).send(err);
          } else {
            res.send(result);
          }
        }
      );
    });
  });
});

app.post("/updatemasterid", async (req, res) => {
  const id = req.body.id;
  db.query(
    "UPDATE mybalance5.user SET master_id = " + id + " WHERE id = " + id,
    (err, result) => {
      if (err) {
        res.status(400).send(err);
      } else {
        res.send(result);
      }
    }
  );
});

app.get("/login", (req, res) => {
  db.query(
    'SELECT id, password, name, family, master_id, admin, wrong_login, demo_only FROM mybalance5.user WHERE email="' +
      req.query.email +
      '"',
    (err, result) => {
      if (err) {
        res.status(400).send(err);
      } else {
        if (result.length > 0) {
          let ok = bcrypt.compareSync(req.query.password, result[0].password);
          if (ok) {
            result[0].password = "";
            res.send(result);
          } else {
            res.status(401).send({user_id: result[0].id, error_id: 5, error_txt: "Wrong password"});
          }
        } else {
          res.status(404).send({user_id: 0, error_id: 4, error_txt: "User '"+req.query.email+"' doesn't exist"});
        }
      }
    }
  );
});

app.post("/updatewronglogin", async (req, res) => {
  const id = req.body.id;
  const wrong_login = req.body.wrong_login;
  if (wrong_login===1) {
    db.query(
      "UPDATE mybalance5.user SET wrong_login = " + 3 + " WHERE id = " + id,
      (err, result) => {
        if (err) {
          res.status(400).send(err);
        } else {
          res.send(result);
        }
      }
    );
  } else {
    db.query(
      "UPDATE mybalance5.user SET wrong_login = 0 WHERE id = " + id,
      (err, result) => {
        if (err) {
          res.status(400).send(err);
        } else {
          res.send(result);
        }
      }
    );
  }
});

app.listen(3001, () => {
  console.log("Server is running on port 3001!");
});
