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

  bcrypt.genSalt(10, function (err, salt) {
    bcrypt.hash(password, salt, function (err, hash) {
      db.query(
        "INSERT INTO users (name, email, password, mode, demoonly, confirmed) VALUES (?, ?, ?, ?, ?, ?)",
        [name, email, hash, mode, demoonly, confirmed],
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
                  // console.log(err);
                  res.send({ status: "error", error: "NOT_FOUND" });
                } else {
                  // console.log("result", result[0]);
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

app.get("/getgroups", (req, res) => {
  db.query("SELECT id, name FROM mybalance.groups", (err, result) => {
    if (err) {
      res.send([{ error: err }]);
    } else {
      res.send(result);
    }
  });
});

app.get("/getsubgroups", (req, res) => {
  db.query(
    // 'SELECT id, name FROM mybalance.subgroups WHERE groupid="' + String(req.query.group) + '" ORDER BY name', //
    "SELECT id, groupid, name FROM mybalance.subgroups",
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
  //treba sifrirati password
  db.query(
    'SELECT id, email, password, name FROM users WHERE email="' +
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

app.post("/saverecordsexp", async (req, res) => {
  const record = req.body.record;
  const records = req.body.records;
  let tmperr = "";

  function nextRecID() {
    return new Promise((resolve) => {
      db.query("SELECT MAX(recid) AS lastrecid FROM records", (err, rows) => {
        if (err) {
          resolve({ status: "Error" });
        } else {
          resolve({ status: "OK", no: rows[0].lastrecid + 1 });
        }
      });
    });
  }

  async function insertRecords({ record, records, nextrecid }) {
    console.log("insertRecords! ==> record , records, nextrecid: ", nextrecid);
    return new Promise((resolve) => {
      records.forEach((tmpRecord, index) => {
        try {
          let inserting = insertRecords({
            record: record,
            tmpRecord: tmpRecord,
            nextrecid: nextrecid
          });
          if (inserting.status == "Error")
            throw "Error by inserting record with index " + String(index);
        } catch (error) {
          resolve({ status: "Error", error: error });
        }
      });
    });
  }

  async function insertRecord({ record, tmpRecord, nextrecid }) {
    console.log(
      "insertRecord! ===> ==> record , tmpRecord, nextrecid: ",
      nextrecid
    );
    return new Promise((resolve) => {
      db.query(
        "INSERT INTO mybalance.recordss (recid,userid,locuser,date,place,totinc,totexp,inc,exp,gr,sgr) VALUES (?,?,?,?,?,?,?,?,?,?,?)",
        [
          nextrecid,
          record.userid,
          record.locuser,
          record.date,
          record.place,
          0,
          record.totexp,
          0,
          tmpRecord.amount,
          tmpRecord.groupid,
          tmpRecord.subgroupid,
        ],
        (error, result) => {
          if (error) {
            resolve({ status: "Error", error: error });
          } else {
            resolve({ status: "OK" });
          }
        }
      );
    });
  }

  /*
  function insertRecords({ record, records, nextrecid }) {
    console.log("record , records, nextrecid: ", nextrecid);
    return new Promise((resolve) => {
      let tmperror = "";
      try {
        records.forEach((tmpRecord, index) => {
          console.log("index:", index, " tmpRecord");
          db.query(
            "INSERT INTO mybalance.recordss (recid,userid,locuser,date,place,totinc,totexp,inc,exp,gr,sgr) VALUES (?,?,?,?,?,?,?,?,?,?,?)",
            [
              nextrecid,
              record.userid,
              record.locuser,
              record.date,
              record.place,
              0,
              record.totexp,
              0,
              tmpRecord.amount,
              tmpRecord.groupid,
              tmpRecord.subgroupid,
            ],
            (err, result) => {
              console.log("index before: ", index, " tmperror: ", tmperror);
              if (err) {
                tmperror = { status: "Error", err: err };
              };
              console.log("index after : ", index, " tmperror: ", tmperror);
            }
          );
        });  
        // resolve({ status: "OK", inserted: records.length });
      } catch (err) {
      } finally {
        console.log("tmperror: ", tmperror);
        if (tmperror!="") {
          resolve({ status: "Error", err: err });
        } else {
          resolve({ status: "OK", inserted: records.length });
        }
      };
    });
  }
  */

  let nextrecid = await nextRecID();
  console.log("nextrecid: ", nextrecid);
  await insertRecords({
    record: record,
    records: records,
    nextrecid: nextrecid.no,
  }).then((insertedrecords) => {
    console.log("insertrecords: ", insertedrecords);
    res.send(insertedrecords);
    /*
    if (insertrecords.status === "OK") {
      res.send({ status: "OK", inserted: insertrecords.inserted });
    } else {
      res.send({ status: "Error", err: insertrecords.err });
    }
    */
  });
});

app.listen(3001, () => {
  console.log("Server is running on port 3001!");
});
