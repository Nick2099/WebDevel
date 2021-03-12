const express = require("express");
const bodyParser = require("body-parser");
const myfunction = require(__dirname + "/myfunction.js");   // connection to myfunction.js

const app = express();

let headings = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

let possibleDurations = {
  text: ["15 minutes", "30 minutes", "45 minutes", "1 hour", "1 hour and 30 minutes", "2 hours"],
  duration: [.25, .50, .75, 1, 1.5, 2],
  use: [true, true, true, true, false, false]
};

let choosenDurations = [];
let minimumDuration = 0;

let workingHours = {
  working: [false, true, true, true, true, true, false],
  open: ["09:00", "09:00", "09:00", "09:00", "09:00", "09:00", "09:00"],
  close: ["19:00", "19:00", "19:00", "19:00", "19:00", "19:00", "19:00"],
  break: [false, true, true, true, true, true, false],
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

let today = new Date();
let dates = [];
let numberOfDays = 10;

function dayData(date) {
  this.date =  date;         // 10.03.2021
  this.day = 0;        // 3 = Wednesday
  this.working = false;   // true = open
  this.start1 = 0;      // 8.5 = 08:30
  this.start2 = 0;      // 15 = 15:00
  this.app1 = 0;       // number of appointments with minimumDuration
  this.app2 = 0;
  this.rest1 = 0;      // number of still possible appointments with minimumDuration
  this.rest2 = 0;
};

let dailyData = [];

function Appointment() {
  this.no = 0;
  this.start = 0;
  this.duration = 0;
  this.persnoNo = 0;
  this.done = 0;      // 0 = not, 1 = yes
};

let appointments = [];
let appointmentNo = 0;
let currentDay = 0;

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

  if (req.body.generate) {
    generateAppointments = true;
  } else {
    generateAppointments = false;
  };

  if (generateAppointments) {
    // I have to check if is possible to create voll working hours with minimumDuration
    dates = myfunction.getDates(today, numberOfDays);
    // console.log("Today: ", today, "dates: ", dates);
    dailyData = [];
    appointmentNo = 0;
    currentDay = 0;
    dates.forEach(getData);
    // console.log("dailyData:", dailyData);

    // dailyAppointments = randomAppointments(today, )

  };

  res.redirect("appsettings");

  function getHours(item) {
    for (i=0; i<workingHours.working.length; i++) {
      workingHours[item][i] = req.body[item+i];
    };
  };

  function getData(tmpDate) {
    let newData = new dayData(tmpDate);
    newData.day = tmpDate.getDay();
    newData.working = workingHours.working[newData.day];
    newData.start1 = workingHours.start1[newData.day];
    newData.start2 = workingHours.start2[newData.day];
    newData.app1 = workingHours.dur1[newData.day]/minimumDuration;
    newData.app2 = workingHours.dur2[newData.day]/minimumDuration;
    newData.rest1 = newData.app1;
    newData.rest2 = newData.app2;

    let newAppointment = new Appointment();

    if (currentDay<Math.floor(numberOfDays/3)) {
      maxDuration = maximumDuration(newData.rest1, choosenDurations);

    };


    dailyData.push(newData);
    currentDay++;
  };
});

function maximumDuration(rest, durations) {
  let max = 0;
  durations.forEach(check);
  // console.log("rest: ", rest, "duration: ", durations, "max: ", max);
  return max;

  function check(item) {
    if (rest => item) {
      // console.log("rst: ", rest, "item: ", item);
      max = item;
    };
  };
};

function randomDuration(max, durations) {
  let tmp = [];
  durations.forEach(check);
  let rndm = Math.floor(Math.random() * tmp.length) + 1;
  return durations[rndm];

  function check(item) {
    if (item <= max) {
      tmp.push(item);
    };
  };
};

// function Appointment {
//   this.no = 0;
//   this.start = 0;
//   this.duration = 0;
//   this.persnoNo = 0;
//   this.done = 0;      // 0 = not, 1 = yes


app.listen(3000, function() {
  console.log("Server is running on http://localhost:3000/");
});
