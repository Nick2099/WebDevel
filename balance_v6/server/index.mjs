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

function getTime() {

  function pad(num) {
    return (num < 10 ? '0' : '') + num;
  };
  
  var currentdate = new Date();
  var datetime = currentdate.getFullYear() + "-"  
    + pad(currentdate.getMonth()+1) + "-" 
    + pad(currentdate.getDate()) + " "
    + pad(currentdate.getHours()) + ":"  
    + pad(currentdate.getMinutes()) + ":" 
    + pad(currentdate.getSeconds());
  return datetime;
};

function writeError(file, data) {
  fs.appendFile('log/error.txt', getTime()+" "+file+" "+JSON.stringify(data)+"\r\n", (err) => {
    if (err) throw err;
  });
};

// Test link at http://localhost:3001/test?table=account_type
// If everything OK: The table account_type should be printed out on screen in JSON form
app.get("/test", async (req, res) => {
  const table = req.query.table;
  db.query(
    'SELECT id, title FROM balance_v6.'+table,
    (queryError, queryResult) => {
      if (queryError) {
        res.status(400).send(queryError);
        writeError("/test ",queryError);
      } else {
        res.send(queryResult);
      }
    }
  );
});

app.listen(3001, () => {
    console.log("Server is running on port 3001!");
  });
  
