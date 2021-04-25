//jshint esversion:6
require("dotenv").config();   // have to be put on top. With this command .env will be active and running
const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const mongoose = require("mongoose");
// const encrypt = require("mongoose-encryption");
// const md5 = require("md5");
const bcrypt = require('bcrypt');
const saltRounds = 10;

const app = express();

// console.log(process.env.API_KEY); // just an example how we can get data from .env file

app.use(express.static("public"));
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({
  extended: true
}));

mongoose.connect("mongodb://localhost:27017/userDB", {useNewUrlParser: true, useUnifiedTopology: true});

const userSchema = new mongoose.Schema ({
  email: String,
  password: String
});

// const secret = "SecretPassword";   // instead of const secret we are directly using process.env.SECRET

// Following plugin have to be added before we create mongoose model User
// We are encrypting only field "password". Other fields are not encrypted.
// userSchema.plugin(encrypt, {secret: process.env.SECRET, encryptedFields: ["password"]});
// Encryption is done automaticaly by save and decryption by find

const User = new mongoose.model("User", userSchema);



app.get("/", function(req,res) {
  res.render("home");
});

app.get("/login", function(req,res) {
  res.render("login");
});

app.get("/register", function(req,res) {
  res.render("register");
});

app.post("/register", function(req,res) {
  bcrypt.hash(req.body.password, saltRounds, function(err, hash) {
    const newUser = new User({
      email: req.body.username,
      password: hash
    });
    newUser.save(function(err) {
      if (err) {
        console.log(err);
      } else {
        res.render("secrets");
      };
    });
  });

  // const newUser = new User({
  //   email: req.body.username,
  //   // password: req.body.password
  //   password: md5(req.body.password)
  // });
  // newUser.save(function(err) {
  //   if (err) {
  //     console.log(err);
  //   } else {
  //     res.render("secrets");
  //   };
  // });
});

app.post("/login", function(req,res) {
  const username = req.body.username;
  const password = req.body.password;
  User.findOne({email: username}, function(err, foundUser) {
    if (err) {
      console.log(err);
    } else {
      if (foundUser) {
        bcrypt.compare(password, foundUser.password, function(err, result) {
            if (result === true) {
              res.render("secrets");
            } else {
              res.send("Password is incorrect!")
            };
          });
        } else {
          res.send("User not found!");
        };
      };
    });

  // const username = req.body.username;
  // // const password = req.body.password;
  // const password = md5(req.body.password);
  // User.findOne({email: username}, function(err, foundUser) {
  //   if (err) {
  //     console.log(err);;
  //   } else {
  //     if (foundUser) {
  //       if (foundUser.password === password) {
  //         res.render("secrets");
  //       } else {
  //         res.send("Password is incorrect!")
  //       };
  //     };
  //   };
  // });
});



app.listen(3000, function() {
  console.log("Server started on port 3000.");
});
