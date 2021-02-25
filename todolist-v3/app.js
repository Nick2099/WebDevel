const express = require("express");
const bodyParser = require("body-parser");
const date = require(__dirname + "/date.js");
const date2 = require(__dirname + "/date2.js");

const app = express();

let items = ["Buy Food", "Cook Food", "Eat Food"];
let workItems = [];

app.set("view engine", "ejs"); //app.set vs app.use ??

app.use(bodyParser.urlencoded({extended: true}));     // necessary for body-parser
app.use(express.static("public"));                    // necessary to give access to files in that folder

app.get("/", function(req, res) {
  // let day = date();              // is calling a function within a date.js - there is only one export, as a whole module
  let day = date2.getDate();         // is calling a function within a date2.js - but there are now few functions so it have to be specified
  res.render("list", {
    listTitle: day,
    newListItems: items
  });

});

app.post("/", function(req, res) {
  let item = req.body.newItem;
  if (req.body.list === "Work") {
    workItems.push(item);
    res.redirect("/work");
  } else {
    items.push(item);
    res.redirect("/");
  }
});

app.get("/work", function(req, res) {
  res.render("list", {
    listTitle: "Work List for " + date2.getDay(),
    newListItems: workItems
  });
});

app.get("/about", function(req, res) {
  res.render("about");
});

// app.post("/work", function(req, res) {
//   let item = req.body.newItem;
//   workItems.push(item);
//   res.redirect("/work");
// });


app.listen(3000, function() {
  console.log("Server is running on http://localhost:3000/");
});
