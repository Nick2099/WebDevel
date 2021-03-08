const express = require("express");
const bodyParser = require("body-parser");
const myfunction = require(__dirname + "/myfunction.js");   // connection to myfunction.js

const app = express();

let headings = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];

let possibleDurations = {
  text: ["15 minutes", "30 minutes", "45 minutes", "1 hour", "1 hour and 30 minutes", "2 hours"],
  duration: [.25, .50, .75, 1, 1.5, 2],
  use: [true, true, true, true, false, false]
};

let workingHours = {
  working: [true, true, true, true, true, false, false],
  open: ["09:00", "09:00", "09:00", "09:00", "09:00", "09:00", "09:00"],
  close: ["19:00", "19:00", "19:00", "19:00", "19:00", "19:00", "19:00"],
  break: [true, true, true, true, true, false, false],
  from: ["12:00", "12:00", "12:00", "12:00", "12:00", "12:00", "12:00"],
  to: ["13:00", "13:00", "13:00", "13:00", "13:00", "13:00", "13:00"]
};

let workingTime = myfunction.workingHours({from: 8, to: 20, min: 0.5});

app.set("view engine", "ejs");  // setting view engine for express

app.use(bodyParser.urlencoded({extended: true}));     // necessary for body-parser
app.use(express.static("public"));                    // necessary to give access to files in that folder


app.get("/appsettings", function(req, res) {
  res.render("appsettings", {
    headings: headings,
    workingTime: workingTime,
    possibleDurations: possibleDurations,
    workingHours: workingHours
  });
});

app.post("/appsettings", function(req, res) {
  // console.log(possibleDurations);
  for (i=0; i<possibleDurations.text.length; i++) {
    if (req.body["dur"+i]) {                          // dinamical variables
      possibleDurations.use[i] = true;
    } else {
      possibleDurations.use[i] = false;
    };
  };
  // console.log(possibleDurations);

  // I have to get working_, open_, close_, break_, from_ & to_ for all days
  
  res.redirect("appsettings");
});




app.listen(3000, function() {
  console.log("Server is running on http://localhost:3000/");
});
