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
let numberOfDays = 3  ;

function dayData(date) {
  this.date =  date;         // 10.03.2021
  this.day = 0;        // 3 = Wednesday
  this.working = false;   // true = open
  this.start1 = 0;      // 8.5 = 08:30
  this.start2 = 0;      // 15 = 15:00
  this.dur1 = 0;       // working hours 1
  this.dur2 = 0;
  this.rest1 = 0;      // free from working hours 1
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
let numberOfPerson = 0;

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

  workingHours= myfunction.setStartsAndDurations(workingHours);

  if (req.body.generate) {
    generateAppointments = true;
  } else {
    generateAppointments = false;
  };

  if (generateAppointments) {
    console.log("Generating appointments:");
    dates = [];
    dailyData = [];
    dates = myfunction.getDates(today, numberOfDays);
    appointmentNo = 0;
    currentDay = 0;
    numberOfPerson = 0;
    dates.forEach(getData);
    dailyData.forEach(logData);
  };

  res.redirect("appsettings");

  function getHours(item) {
    for (i=0; i<workingHours.working.length; i++) {
      workingHours[item][i] = req.body[item+i];
    };
  };

  function logData(item) {
    console.log(item);
  }

  function getData(tmpDate) {
    let newData = new dayData(tmpDate);
    newData.day = tmpDate.getDay();
    newData.working = workingHours.working[newData.day];
    newData.start1 = workingHours.start1[newData.day];
    newData.start2 = workingHours.start2[newData.day];
    newData.dur1 = workingHours.dur1[newData.day];
    newData.dur2 = workingHours.dur2[newData.day];
    newData.rest1 = newData.dur1;
    newData.rest2 = newData.dur2;

    let newAppointment = new Appointment();
    let appointments = [];
    let tmpDuration = 0;

    if (newData.working) {
      if (currentDay<numberOfDays) {
        while (newData.rest1 > 0) {
          newAppointment = [];
          maxDuration = myfunction.maximumDuration(newData.rest1, choosenDurations);
          newDurations = myfunction.newDurations(maxDuration, choosenDurations);
          newAppointment.no = appointmentNo;
          tmpDuration = myfunction.randomDuration(newDurations);
          if (tmpDuration == undefined) {
            newAppointment.duration = newData.rest1;
          } else {
            newAppointment.duration = myfunction.randomDuration(newDurations);
          };
          newAppointment.start = myfunction.timeInHours(newData.start1) + newData.dur1 - newData.rest1;
          newData.rest1 = newData.rest1 - newAppointment.duration;
          newAppointment.persnoNo = myfunction.randomPerson(numberOfPerson);
          if (newAppointment.persnoNo>numberOfPerson) {
            numberOfPerson = newAppointment.persnoNo;
          };
          appointments.push(newAppointment);
          appointmentNo++;
        };
        while (newData.rest2 > 0) {
          newAppointment = [];
          maxDuration = myfunction.maximumDuration(newData.rest2, choosenDurations);
          newDurations = myfunction.newDurations(maxDuration, choosenDurations);
          newAppointment.no = appointmentNo;
          tmpDuration = myfunction.randomDuration(newDurations);
          if (tmpDuration == undefined) {
            newAppointment.duration = newData.rest2;
          } else {
            newAppointment.duration = myfunction.randomDuration(newDurations);
          };
          newAppointment.start = myfunction.timeInHours(newData.start2) + newData.dur2 - newData.rest2;
          newData.rest2 = newData.rest2 - newAppointment.duration;
          newAppointment.persnoNo = myfunction.randomPerson(numberOfPerson);
          if (newAppointment.persnoNo>numberOfPerson) {
            numberOfPerson = newAppointment.persnoNo;
          };
          appointments.push(newAppointment);
          appointmentNo++;
        };
      };
    };

    newData["appointments"] = appointments;
    dailyData.push(newData);
    currentDay++;
  };
});



app.listen(3000, function() {
  console.log("Server is running on http://localhost:3000/");
});
