import Express from "express";
const app = Express();
import Mysql from "mysql";
import Cors from "cors";
import bcrypt from "bcryptjs";

import "dotenv/config.js";

app.use(Cors()); // allows to make request from frontend to the backend
app.use(Express.json());

const db = Mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_DATA,
});

app.get("/", (req, res) => {
  res.send("Connected");
});

app.post("/register", (req, res) => {
  const name = req.body.name;
  const email = req.body.email;
  const password = req.body.password;
  const mode = req.body.mode;
  const demoonly = req.body.demoonly;
  const confirmed = req.body.confirmed;
  const admin = req.body.admin;
  const userid = 1;

  bcrypt.genSalt(10, function (err, salt) {
    bcrypt.hash(password, salt, function (err, hash) {
      db.query(
        "INSERT INTO users (userid, name, email, password, mode, demoonly, confirmed, admin) VALUES (?, ?, ?, ?, ?, ?, ?, ?)",
        [userid, name, email, hash, mode, demoonly, confirmed, admin],
        (err, result) => {
          if (err) {
            res.send({ status: "error", error: err.code });
          } else {
            db.query(
              'SELECT id FROM users WHERE email="' +
                email +
                '" AND password="' +
                hash +
                '"',
              (err, result) => {
                if (err) {
                  res.send({ status: "error", error: "NOT_FOUND" });
                } else {
                  db.query(
                    'UPDATE users SET userid="' +
                      result[0].id +
                      '" WHERE id="' +
                      result[0].id +
                      '"',
                    (err1, result1) => {
                      if (err1) {
                        res.send({
                          status: "error",
                          error: "CAN'T UPDATE userID",
                        });
                      }
                    }
                  );
                  res.send({ status: "ok", id: result[0].id });
                }
              }
            );
          }
        }
      );
    });
  });
});

app.get("/getbasicgroups", (req, res) => {
  db.query(
    "SELECT id, name FROM mybalance.basicgroups ORDER BY name ASC",
    (err, result) => {
      if (err) {
        res.send([{ error: err }]);
      } else {
        res.send(result);
      }
    }
  );
});

app.get("/getgroups", (req, res) => {
  db.query(
    'SELECT groupid AS id, name FROM mybalance.groups WHERE userid="' + req.query.id +'" ORDER BY name ASC',
    (err, result) => {
      if (err) {
        res.send([{ error: err }]);
      } else {
        res.send(result);
      }
    }
  );
});

app.get("/getbasicsubgroups", (req, res) => {
  db.query(
    "SELECT id, groupid, name FROM mybalance.basicsubgroups ORDER BY name ASC",
    (err, result) => {
      if (err) {
        res.send([{ error: err }]);
      } else {
        res.send(result);
      }
    }
  );
});

app.get("/getsubgroups", (req, res) => {
  db.query(
    "SELECT subgroupid AS id, groupid, name FROM mybalance.subgroups ORDER BY name ASC",
    (err, result) => {
      if (err) {
        res.send([{ error: err }]);
      } else {
        res.send(result);
      }
    }
  );
});

app.get("/gettransfersubgroups", (req, res) => {
  db.query(
    'SELECT id, name FROM mybalance.users WHERE userid = "' +
      req.query.userid +
      '" AND id <> "' +
      req.query.id +
      '" ORDER BY name ASC',
    (err, result) => {
      if (err) {
        res.send([{ error: err }]);
      } else {
        res.send(result);
      }
    }
  );
});

app.get("/getlocalusers", (req, res) => {
  db.query(
    'SELECT id, name, email, adv FROM mybalance.users WHERE userid = "' +
      req.query.userid +
      '" AND id <> "' +
      req.query.id +
      '" ORDER BY name ASC',
    (err, result) => {
      if (err) {
        res.send([{ error: err }]);
      } else {
        res.send(result);
      }
    }
  );
});


app.get("/userid", (req, res) => {
  db.query(
    'SELECT id, userid, email, password, mode, demoonly, confirmed, name, admin, cur, curdec FROM users WHERE email="' +
      req.query.email +
      '"',
    (err, result) => {
      if (err) {
        res.send([{ id: 0, error: err }]);
      } else {
        if (result.length > 0) {
          let ok = bcrypt.compareSync(req.query.password, result[0].password);
          if (ok) {
            result[0].password = "";
            res.send(result);
          } else {
            res.send([{ id: 0, error: "Wrong password!" }]);
          }
        } else {
          res.send([{ id: 0, error: "Such user doesn't exist." }]);
        }
      }
    }
  );
});

app.post("/creategroupsingroups", async (req, res) => {
  const id = req.body.id;
  const groups = req.body.groups;
  db.query(
    'INSERT INTO mybalance.groups (userid, groupid, name) VALUES ?',
    [groups.map((group) => [id, group.id, group.name])],
    (error, results) => {
      if (error!==null) {
        res.send("OK");
      } else {
        res.send(error);
      }
    }
  );
});

app.post("/createsubgroupsinsubgroups", async (req, res) => {
  const id = req.body.id;
  const subgroups = req.body.subgroups;
  db.query(
    'INSERT INTO mybalance.subgroups (userid, subgroupid, groupid, name) VALUES ?',
    [subgroups.map((subgroup) => [id, subgroup.id, subgroup.groupid, subgroup.name])],
    (error, results) => {
      if (error!==null) {
        res.send("OK");
      } else {
        res.send(error);
      }
    }
  );
});


app.post("/saverecords2", async (req, res) => {
  const record = req.body.record;
  const records = req.body.records;
  let tmperr = "";

  function nextRecID() {
    return new Promise((resolve) => {
      db.query("SELECT MAX(recid) AS lastrecid FROM records2", (err, rows) => {
        if (err) {
          resolve({ status: "Error", error: err });
        } else {
          resolve({ status: "OK", no: rows[0].lastrecid + 1 });
        }
      });
    });
  }

  const insertRecords = async ({ record, records, nextrecid }) => {
    const allAsyncResults = [];
    for (const tmpRecord of records) {
      const asyncResult = await insertRecord({
        record: record,
        tmpRecord: tmpRecord,
        nextrecid: nextrecid,
      });
      allAsyncResults.push(asyncResult);
    }
    return allAsyncResults;
  };

  async function insertRecord({ record, tmpRecord, nextrecid }) {
    return new Promise((resolve) => {
      db.query(
        "INSERT INTO mybalance.records2 (recid,userid,locuser,date,place,gr,sgr,type,amount,cur, comment) VALUES (?, ?,?,?,?,?,?,?,?,?,?)",
        [
          nextrecid,
          record.userid,
          record.locuser,
          record.date,
          record.place,
          tmpRecord.groupid,
          tmpRecord.subgroupid,
          record.type,
          tmpRecord.amount,
          record.cur,
          tmpRecord.comment,
        ],
        (error, result) => {
          if (error) {
            resolve({ status: "Error", error: error.sqlMessage });
          } else {
            resolve({ status: "OK" });
          }
        }
      );
    });
  }

  let nextrecid = await nextRecID();
  if (nextrecid.status === "OK") {
    await insertRecords({
      record: record,
      records: records,
      nextrecid: nextrecid.no,
    }).then((status) => {
      let tmpStatus = { status: "OK" };
      for (const item of status) {
        if (item.status === "Error") {
          tmpStatus = {
            status: "Error",
            error: item.error,
          };
        }
      }
      res.send(tmpStatus);
    });
  } else {
    res.send({ status: "Error", error: nextrecid.error });
  }
});

app.get("/getcurrencies", (req, res) => {
  db.query(
    'SELECT cur, curdec FROM mybalance.currencies ORDER BY cur ASC',
    (err, result) => {
      if (err) {
        res.send([{ error: err }]);
      } else {
        res.send(result);
      }
    }
  );
});

app.listen(3001, () => {
  console.log("Server is running on port 3001!");
});
