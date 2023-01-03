import "dotenv/config.js";
import Express from "express";
const app = Express();
import Mysql from "mysql";
import Cors from "cors";
import bcrypt from "bcrypt";
import fs from "fs";

app.use(Cors()); // allows to make request from frontend to the backend
app.use(Express.json());

const db = Mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_DATA,
});
const database = process.env.DB_DATA;

function numberToMinLength2(num) {
  return (num < 10 ? "0" : "") + num;
}

// returns current DateTime, can add also given minutes, in MySQL format
function mySQLDateTime(minutes = 0) {
  var currentdate = new Date(new Date().getTime() + minutes * 60000);
  var datetime =
    currentdate.getFullYear() +
    "-" +
    numberToMinLength2(currentdate.getMonth() + 1) +
    "-" +
    numberToMinLength2(currentdate.getDate()) +
    " " +
    numberToMinLength2(currentdate.getHours()) +
    ":" +
    numberToMinLength2(currentdate.getMinutes()) +
    ":" +
    numberToMinLength2(currentdate.getSeconds());
  return datetime;
}

// return date in JavaScript format from given MySQL format
function mySQLDateTime2JS(datetime) {
  var tmp = datetime; //.replace(" ", "T");
  return new Date(tmp);
}

// return how many minutes a given DateTime is larger than current DateTime, min=0
function lockedForMinutes(tmpDateTime) {
  if (tmpDateTime == null) return 0;
  var now = new Date();
  var until = mySQLDateTime2JS(tmpDateTime);
  var ms = until - now;
  var minutes = Math.ceil(((ms % 86400000) % 3600000) / 60000);
  if (minutes < 0) minutes = 0;
  return minutes;
}

function noteLocked(minutes) {
  var note =
    "You had too many incorrect login attempts, so your account is still locked.\n\n" +
    "You can try again in " +
    minutes +
    (minutes == 1 ? " minute." : " minutes.");
  return note;
}

function writeLogError(file, data) {
  fs.appendFile(
    "log/error.txt",
    mySQLDateTime() + " " + file + " " + JSON.stringify(data) + "\r\n",
    (err) => {
      if (err) throw err;
    }
  );
}

function writeLogLog(file, data) {
  fs.appendFile(
    "log/log.txt",
    mySQLDateTime() + " " + file + " " + JSON.stringify(data) + "\r\n",
    (err) => {
      if (err) throw err;
    }
  );
}

// Test link at http://localhost:3001/test?table=account_type
// If everything OK: The table account_type should be printed out on screen in JSON form
app.get("/test", async (req, res) => {
  const table = req.query.table;
  db.query(
    "SELECT id, title FROM " + database + "." + table,
    (queryError, queryResult) => {
      if (queryError) {
        res.status(400).send(queryError);
        writeLogError("/test ", queryError);
      } else {
        res.send(queryResult);
      }
    }
  );
});

// Checked - works OK
app.post("/registernewuser", async (req, res) => {
  const master_id = 0;
  const master_type_id = 1;
  const admnin_type_id = 1;
  const email = req.body.email;
  const pass = req.body.pass;
  const firstname = req.body.name;
  const familyname = req.body.family;
  const last_access = null;
  const stay_loged = 2880;
  const wrong_logins = 0;
  bcrypt.genSalt(10, function (errBcrypt, salt) {
    bcrypt.hash(pass, salt, function (errHash, hash) {
      db.query(
        "INSERT INTO " +
          database +
          ".users (master_id, master_type_id, admin_type_id, email, pass, firstname, familyname, last_access, stay_loged, wrong_logins) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)",
        [
          master_id,
          master_type_id,
          admnin_type_id,
          email,
          hash,
          firstname,
          familyname,
          last_access,
          stay_loged,
          wrong_logins,
        ],
        (queryError, queryResult) => {
          if (queryError) {
            res.status(400).send(queryError);
            writeLogError("/registernewuser", queryError);
          } else {
            res.send(queryResult);
            writeLogLog("/registernewuser", queryResult);
          }
        }
      );
    });
  });
});

// Checked - works OK
app.post("/updatemasterid", async (req, res) => {
  const id = req.body.id;
  db.query(
    "UPDATE " + database + ".users SET master_id = " + id + " WHERE id = " + id,
    (queryError, queryResult) => {
      if (queryError) {
        res.status(400).send(queryError);
        writeLogError("/updatemasterid ", queryError);
      } else {
        res.send(queryResult);
        writeLogLog("/updatemasterid ", queryResult);
      }
    }
  );
});

// Checked - works OK
app.get("/getuserid", async (req, res) => {
  db.query(
    "SELECT id FROM " +
      database +
      '.users WHERE email="' +
      req.query.email +
      '"',
    (queryError, queryResult) => {
      if (queryError) {
        res.status(400).send(queryError);
        writeLogError("/getuserid ", queryError);
      } else {
        res.send(queryResult);
        writeLogLog("/getuserid ", queryResult);
      }
    }
  );
});

// Checked - have to add control for locked account!
app.get("/login", (req, res) => {
  db.query(
    "SELECT id, master_id, master_type_id, admin_type_id, email, pass, firstname, familyname, stay_loged, wrong_logins, locked_until FROM " +
      database +
      '.users WHERE email="' +
      req.query.email +
      '"',
    (queryError, queryResult) => {
      if (queryError) {
        res.status(400).send(queryError);
        writeLogError("/login ", queryError);
      } else {
        if (queryResult.length > 0) {
          let ok = bcrypt.compareSync(req.query.password, queryResult[0].pass);
          queryResult[0].pass = "";
          var lockedFor = lockedForMinutes(queryResult[0].locked_until);
          if (lockedFor > 0) {
            var note = noteLocked(lockedFor);
            queryResult[0].status = "Locked";
            queryResult[0].note = note;
            res.send(queryResult[0]);
          } else {
            if (ok) {
              queryResult[0].status = "OK";
              res.send(queryResult[0]);
              writeLogLog("/login ", {
                id: queryResult[0].id,
                status: "loged in",
              });
              updateLoginsData(queryResult[0].id, mySQLDateTime(), 0, null);
            } else {
              var lockedTime = 0;
              queryResult[0].wrong_logins++;
              queryResult[0].status = "Wrong password";
              queryResult[0].note = "Wrong password!";
              if (queryResult[0].wrong_logins > 2) {
                lockedTime = 5;
                queryResult[0].note = "Wrong password!\n Your account is locked for 5 minutes!";
              };
              updateLoginsData(
                queryResult[0].id,
                mySQLDateTime(),
                queryResult[0].wrong_logins,
                mySQLDateTime(lockedTime)
              );
              res.send(queryResult[0]);
            }
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

function updateLoginsData(id, last_access, wrong_logins, locked_until) {
  db.query(
    "UPDATE " +
      database +
      ".users SET wrong_logins=" +
      wrong_logins +
      ', locked_until="' +
      locked_until +
      '", last_access="' +
      last_access +
      '" WHERE id=' +
      id,
    (queryError, queryResult) => {
      if (queryError) {
        writeLogError("/updateWrongLogins ", queryError);
      }
    }
  );
}

app.get("/getaccounts", async (req, res) => {
  db.query(
    "SELECT id, title FROM " +
      database +
      '.account WHERE user_id="' +
      req.query.user_id +
      '"',
    (queryError, queryResult) => {
      if (queryError) {
        res.status(400).send(queryError);
        writeLogError("/getaccounts ", queryError);
      } else {
        res.send(JSON.stringify(queryResult));
      }
    }
  );
});

app.get("/getgroups", async (req, res) => {
  db.query(
    "SELECT * FROM " +
      database +
      '.maingroup WHERE master_id="' +
      req.query.master_id +
      '" ORDER BY maingroup.title',
    (queryError, queryResult) => {
      if (queryError) {
        res.status(400).send(queryError);
        writeLogError("/getgroups ", queryError);
      } else {
        res.send(JSON.stringify(queryResult));
      }
    }
  );
});

app.get("/getsubgroups", async (req, res) => {
  db.query(
    "SELECT * FROM " +
      database +
      '.subgroup WHERE maingroup_id="' +
      req.query.maingroup_id +
      '"',
    (queryError, queryResult) => {
      if (queryError) {
        res.status(400).send(queryError);
        writeLogError("/getsubgroups ", queryError);
      } else {
        res.send(JSON.stringify(queryResult));
      }
    }
  );
});

app.get("/getallsubgroups", async (req, res) => {
  // SELECT subgroup.* FROM subgroup INNER JOIN maingroup ON subgroup.maingroup_id = maingroup.id AND maingroup.master_id = 1;
  db.query(
    "SELECT subgroup.* FROM " +
      database +
      '.subgroup INNER JOIN ' + database + '.maingroup ON subgroup.maingroup_id = maingroup.id AND maingroup.master_id = "' +
      req.query.master_id +
      '" ORDER BY subgroup.maingroup_id, subgroup.title',
    (queryError, queryResult) => {
      if (queryError) {
        res.status(400).send(queryError);
        writeLogError("/getallsubgroups ", queryError);
      } else {
        res.send(JSON.stringify(queryResult));
      }
    }
  );
});

app.get("/getlocalusers", async (req, res) => {
  db.query(
    "SELECT * FROM " +
      database +
      '.users WHERE master_id="' +
      req.query.master_id +
      '"',
    (queryError, queryResult) => {
      if (queryError) {
        res.status(400).send(queryError);
        writeLogError("/getlocalusers ", queryError);
      } else {
        res.send(JSON.stringify(queryResult));
      }
    }
  );
});

app.listen(3001, () => {
  console.log("Server is running on port 3001!");
});
