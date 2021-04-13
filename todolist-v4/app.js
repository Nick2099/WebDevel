const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const _ = require("lodash");
const date = require(__dirname + "/date.js");
const date2 = require(__dirname + "/date2.js");
const fs = require("fs");

// reading a password from settings.json
let rawData = fs.readFileSync("C:/Programming/settings.json");
let infoLog = JSON.parse(rawData);
let password = infoLog.mongoDBAtlas.password;

const app = express();

// let items = ["Buy Food", "Cook Food", "Eat Food"];
// let workItems = [];
// it's replaced with mongoose files

app.set("view engine", "ejs"); //app.set vs app.use ??

app.use(bodyParser.urlencoded({extended: true}));     // necessary for body-parser
app.use(express.static("public"));                    // necessary to give access to files in that folder

// start mongod.exe and then mongo.exe to be able to use mongoose

// working on local machine (laptop):
// mongoose.connect("mongodb://localhost:27017/todolistDB", {useNewUrlParser: true, useUnifiedTopology: true});

// working on a MongoDB Atlas server:
mongoose.connect("mongodb+srv://nikica-admin:" + password + "@cluster0.znipb.mongodb.net/todolistDB?retryWrites=true&w=majority", {useNewUrlParser: true, useUnifiedTopology: true});

// mongodb+srv://nikica-admin:<password>@cluster0.znipb.mongodb.net/myFirstDatabase?retryWrites=true&w=majority

mongoose.set('useFindAndModify', false);


const itemsSchema = {
  name: String
};

const Item = mongoose.model("Item", itemsSchema);

const item1 = new Item({
  name: "Welcome to your ToDoList!"
});

const item2 = new Item({
  name: "Hit the + button to add new item!"
});

const item3 = new Item({
  name: "<-- hit this to delete an item!"
});

const defaultItems = [item1, item2, item3];

const listSchema = {
  name: String,
  items: [itemsSchema]
};

const List = mongoose.model("List", listSchema);

app.get("/", function(req, res) {
  // let day = date();              // is calling a function within a date.js - there is only one export, as a whole module
  let day = date2.getDate();         // is calling a function within a date2.js - but there are now few functions so it have to be specified
  let items = [];

  Item.find({}, function(err, results) {
    if (err) {
      console.log(err);
    } else {
      if (results.length=== 0) {
        Item.insertMany(defaultItems, function(err) {
          if (err) {
            console.log(err);
          };
        });
        res.redirect("/")
      } else {
        res.render("list", {
          listTitle: "Today",
          newListItems: results
        });
      };
    };
  });
});

app.post("/", function(req, res) {
  let item = req.body.newItem;
  let listName = req.body.list;

  const newItem = new Item ({
    name: item
  });

  if (listName === "Today") {
    newItem.save();
    res.redirect("/");
  } else {
    List.findOne({name: listName}, function(err, foundList) {
      foundList.items.push(newItem);
      foundList.save();
      res.redirect("/" + listName);
    });
  };
});

app.post("/delete", function(req, res) {
  const checkedItemID = req.body.checked;
  const listName = req.body.listName;

  if (listName === "Today") {
    Item.findByIdAndRemove(checkedItemID, function(err) {
      if (err) {
        console.log(err);
      };
    });
    res.redirect("/");
  } else {
    List.findOneAndUpdate({name: listName}, {$pull: {items: {_id: checkedItemID}}}, function(err, findList) {
      if (!err) {
        res.redirect("/" + listName);
      };
    });
  };
});

app.get("/:customListName", function(req, res) {
  const tmpListName = _.capitalize(req.params.customListName);
  if (tmpListName !== "Favicon.ico") {
    List.findOne({name: tmpListName}, function(err, foundList) {
      if (!err) {
        if (!foundList) {
          const list = new List({
            name: tmpListName,
            items: defaultItems
          });
          list.save();
          res.redirect("/" + tmpListName);
        } else {
          res.render("list", {listTitle: foundList.name, newListItems: foundList.items});
        };
      };
    });
  };
});


app.get("/about", function(req, res) {
  res.render("about");
});


app.listen(3000, function() {
  console.log("Server is running on http://localhost:3000/");
});
