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
  const action_id = req.body.action_id;
  const additional_txt = req.body.additional_txt;
  db.query(
    "INSERT INTO mybalance5.log (datetime, user_id, action_id, additional_txt) VALUES (?,?,?,?)",
    [datetime, user_id, action_id, additional_txt],
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
          result[0].password = "";
          if (ok) {
            result[0].status = "OK";
            res.send(result[0]);
          } else {
            result[0].status = "Wrong password";
            res.send(result[0]);
          }
        } else {
          res.send({
            status: "User don't exists!",
            id: 0,
            email: req.query.email,
          });
        }
      }
    }
  );
});

app.post("/updatewronglogin", async (req, res) => {
  const id = req.body.id;
  const wrong_login = req.body.wrong_login;
  db.query(
    "UPDATE mybalance5.user SET wrong_login = " +
      wrong_login +
      " WHERE id = " +
      id,
    (err, result) => {
      if (err) {
        res.status(400).send(err);
      } else {
        res.send(result);
      }
    }
  );
});

app.get("/getlocalusers", async (req, res) => {
  db.query(
    'SELECT id AS user_id, email, name, family, admin, wrong_login, demo_only FROM mybalance5.user WHERE master_id="' +
      req.query.master_id +
      '"',
    (err, result) => {
      if (err) {
        res.status(400).send(err);
      } else {
        res.send(result);
      }
    }
  );
});

app.post("/updatelocaluser", async (req, res) => {
  const user = req.body.user;
  db.query(
    'UPDATE mybalance5.user SET name = "' +
      user.name +
      '", family = "' +
      user.family +
      '", admin= ' +
      user.admin +
      ', wrong_login = ' +
      user.wrong_login +
      ' WHERE id = ' +
      user.user_id,
    (err, result) => {
      if (err) {
        res.status(400).send(err);
      } else {
        res.send(result);
      }
    }
  );
});

app.listen(3001, () => {
  console.log("Server is running on port 3001!");
});
