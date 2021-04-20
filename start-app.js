const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const ejs = require("ejs");

const app = express();

app.set("view engine", "ejs"); //app.set vs app.use ??

app.use(bodyParser.urlencoded({extended: true}));     // necessary for body-parser
app.use(express.static("public"));                    // necessary to give access to files in that folder

// working on local machine (laptop):
mongoose.connect("mongodb://localhost:27017/todolistDB", {useNewUrlParser: true, useUnifiedTopology: true});

// working on a MongoDB Atlas server:
// mongoose.connect("mongodb+srv://nikica-admin:" + password + "@cluster0.znipb.mongodb.net/wikiDB?retryWrites=true&w=majority", {useNewUrlParser: true, useUnifiedTopology: true});

mongoose.set('useFindAndModify', false);


app.listen(3000, function() {
  console.log("Server startet at port 3000!");
});
