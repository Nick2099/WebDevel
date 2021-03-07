const express = require("express");
const bodyParser = require("body-parser");
const myfunction = require(__dirname + "/myfunction.js");   // connection to myfunction.js

const app = express();

app.set("view engine", "ejs");  // setting view engine for express

app.use(bodyParser.urlencoded({extended: true}));     // necessary for body-parser
app.use(express.static("public"));                    // necessary to give access to files in that folder

app.get("/appsettings", function(req, res) {
  res.render("appsettings");
});






app.listen(3000, function() {
  console.log("Server is running on http://localhost:3000/");
});
