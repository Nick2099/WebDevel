const express = require("express");
const bodyparser = require("body-parser");

const app = express();

app.set("view engine", "ejs"); //app.set vs app.use ??

app.get("/", function(req, res) {
  var today = new Date();
  var currentDay = today.getDay();
  var days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  var day = days[currentDay];

  res.render("list", {
    kindOfDay: day
  });

  // if (currentDay === 6 || currentDay === 0) { // Sunday=0 - Saturday=6
  //   day = "Weekend!";
  // } else {
  //   day = "Weekday.";
  // };
  // res.render("list", {kindOfDay: day});

  // switch (currentDay) {
  //   case 0:
  //     day = "Sunday";
  //     break;
  //   case 1:
  //     day = "Monday";
  //     break;
  //   case 2:
  //     day = "Tuesday";
  //     break;
  //   case 3:
  //     day = "Wednesday";
  //     break;
  //   case 4:
  //     day = "Thursday";
  //     break;
  //   case 5:
  //     day = "Friday";
  //     break;
  //   case 6:
  //     day = "Saturday";
  //     break;
  //   default:
  //     console.log("Error: current day is equal to: " + currentDay);
  // };
  // res.render("list", {
  //   kindOfDay: day
  // });

});







app.listen(3000, function() {
  console.log("Server is running on http://localhost:3000/");
});
