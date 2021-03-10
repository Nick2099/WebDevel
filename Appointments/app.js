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

let choosenDurations = [];
let minimumDuration = 0;

let workingHours = {
  working: [true, true, true, true, true, false, false],
  open: ["09:00", "09:00", "09:00", "09:00", "09:00", "09:00", "09:00"],
  close: ["19:00", "19:00", "19:00", "19:00", "19:00", "19:00", "19:00"],
  break: [true, true, true, true, true, false, false],
  from: ["12:00", "12:00", "12:00", "12:00", "12:00", "12:00", "12:00"],
  to: ["13:00", "13:00", "13:00", "13:00", "13:00", "13:00", "13:00"],
  start1: ["00:00", "00:00","00:00","00:00","00:00","00:00","00:00"],
  start2: ["00:00", "00:00","00:00","00:00","00:00","00:00","00:00"],
  dur1: [0, 0, 0, 0, 0, 0, 0],
  dur2: [0, 0, 0, 0, 0, 0, 0]
};

let workingHoursTimes = ["open", "close", "from", "to"];

let workingTime = myfunction.workingHours({from: 8, to: 20, min: 0.5});

myfunction.setStartsAndDurations(workingHours);

let generateAppointments = true;

let dayData = {
  date: Date,         // 10.03.2021
  day: Number,        // 3 = Wednesday
  working: Boolean,   // true = open
  open1: Number,      // 8.5 = 08:30
  open2: Number,      // 15 = 15:00
  app1: Number,       // number of appointments with minimumDuration
  app2: Number,
  rest1: Number,      // number of still possible appointments with minimumDuration
  rest2: Number,
};

let dayAppointments = {

};

app.set("view engine", "ejs");  // setting view engine for express

app.use(bodyParser.urlencoded({extended: true}));     // necessary for body-parser
app.use(express.static("public"));                    // necessary to give access to files in that folder

app.get("/appsettings", function(req, res) {
  res.render("appsettings", {
    headings: headings,
    workingTime: workingTime,
    possibleDurations: possibleDurations,
    workingHours: workingHours,
    generateAppointments: generateAppointments
  });
});

app.post("/appsettings", function(req, res) {
  choosenDurations = [];
  minimumDuration = 0;
  for (i=0; i<possibleDurations.text.length; i++) {
    if (req.body["dur"+i]) {                          // dinamical variables
      possibleDurations.use[i] = true;
      choosenDurations.push(possibleDurations.duration[i]);
      if (minimumDuration == 0) {
        minimumDuration = possibleDurations.duration[i];
      };
    } else {
      possibleDurations.use[i] = false;
    };
  };
  // console.log(minimumDuration, ":", choosenDurations);                   // choosenDurations = [0.25, 0.5, 1, 1.5]

  for (i=0; i<workingHours.working.length; i++) {
    if (req.body["working"+i]) {                          // dinamical variables
      workingHours.working[i] = true;
    } else {
      workingHours.working[i] = false;
    };
    if (req.body["break"+i]) {                          // dinamical variables
      workingHours.break[i] = true;
    } else {
      workingHours.break[i] = false;
    };
  };

  workingHoursTimes.forEach(getHours);
  // console.log(workingHours);

  workingHours= myfunction.setStartsAndDurations(workingHours);

  if (req.body.generateAppointments) {
    generateAppointments = true;
  } else {
    generateAppointments = false;
  };



  res.redirect("appsettings");

  function getHours(item) {
    for (i=0; i<workingHours.working.length; i++) {
      workingHours[item][i] = req.body[item+i];
    };
  };
});



app.listen(3000, function() {
  console.log("Server is running on http://localhost:3000/");
});
