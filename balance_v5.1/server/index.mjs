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
  return (num < 10 ? '0' : '') + num;
};

function mySQLDateTime() {  
  var currentdate = new Date();
  var datetime = currentdate.getFullYear() + "-"  
    + numberToMinLength2(currentdate.getMonth()+1) + "-" 
    + numberToMinLength2(currentdate.getDate()) + " "
    + numberToMinLength2(currentdate.getHours()) + ":"  
    + numberToMinLength2(currentdate.getMinutes()) + ":" 
    + numberToMinLength2(currentdate.getSeconds());
  return datetime;
};

function writeLogError(file, data) {
  fs.appendFile('log/error.txt', mySQLDateTime()+" "+file+" "+JSON.stringify(data)+"\r\n", (err) => {
    if (err) throw err;
  });
};

function writeLogLog(file, data) {
  fs.appendFile('log/log.txt', mySQLDateTime()+" "+file+" "+JSON.stringify(data)+"\r\n", (err) => {
    if (err) throw err;
  });
};

// Test link at http://localhost:3001/test?table=account_type
// If everything OK: The table account_type should be printed out on screen in JSON form
app.get("/test", async (req, res) => {
  const table = req.query.table;
  db.query(
    'SELECT id, title FROM '+database+'.'+table,
    (queryError, queryResult) => {
      if (queryError) {
        res.status(400).send(queryError);
        writeLogError("/test ",queryError);
      } else {
        res.send(queryResult);
      }
    }
  );
});

app.post("/registernewuser", async (req, res) => {
  const master_id = 0;
  const master_type_id = 1;
  const admnin_type_id= 1;
  const email = req.body.email;
  const pass = req.body.pass;
  const firstname = req.body.name;
  const familyname = req.body.family;
  const last_access = "";
  const stay_loged = 2880;
  const wrong_logins = 0;
  bcrypt.genSalt(10, function (errBcrypt, salt) {
    bcrypt.hash(pass, salt, function (errHash, hash) {
      db.query(
        'INSERT INTO '+database+'.users (master_id, master_type_id, admin_type_id, email, pass, firstname, familyname, last_access, stay_loged, wrong_logins) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)',
        [master_id, master_type_id, admnin_type_id, email, hash, firstname, familyname, last_access, stay_loged, wrong_logins],
        (queryError, queryResult) => {
          if (queryError) {
            res.status(400).send(queryError);
            writeLogError("/registernewuser",queryError);
          } else {
            res.send(queryResult);
            writeLogLog("/registernewuser",queryResult);
          }
        }
      );
    });
  });
});

app.post("/updatemasterid", async (req, res) => {
  const id = req.body.id;
  db.query(
    'UPDATE '+database+'.user SET master_id = ' + id + ' WHERE id = ' + id,
    (queryError, queryResult) => {
      if (err) {
        res.status(400).send(queryError);
        writeLogError("/updatemasterid ",queryError);
      } else {
        res.send(queryResult);
      }
    }
  );
});

app.get("/getuserid", async (req, res) => {
  db.query(
    'SELECT id FROM '+database+'.users WHERE email="' + req.query.email + '"',
    (queryError, queryResult) => {
      if (queryError) {
        res.status(400).send(queryError);
        writeLogError("/getuserid ",queryError);
      } else {
        res.send(queryResult);
      }
    }
  );
});

app.listen(3001, () => {
    console.log("Server is running on port 3001!");
  });
  
