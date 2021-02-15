const express = require("express");
const bodyParser = require("body-parser");

const app = express();

app.set("view engine", "ejs"); //app.set vs app.use ??

app.use(bodyParser.urlencoded({extended: true}));     // necessary for body-parser

app.get("/", function(req, res) {
  var today = new Date();
  var options = {
    weekday: "long",  // narrow, short or long
    day: "2-digit",   // numeric, 2-digit
    month: "long",    // numeric, 2-digit, narrow, short, long
    year: "numeric"   //numeric, 2-digit
  };

  var day = today.toLocaleDateString("en-US", options);

  res.render("list", {
    kindOfDay: day
  });

});

app.post("/", function(req, res) {
  var item = req.body.newItem;
  console.log(item);
});

app.listen(3000, function() {
  console.log("Server is running on http://localhost:3000/");
});


// var currentDay = today.getDay();
// var days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
// var day = days[currentDay];

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
