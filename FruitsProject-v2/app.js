const mongoose = require("mongoose");

// connection to fruitsDB database through localhost:27017 (default port for mongodb)
mongoose.connect("mongodb://localhost:27017/fruitsDB", {useNewUrlParser: true, useUnifiedTopology: true});
// if database fruitsDB doeasn't exist it will be created

const fruitSchema = new mongoose.Schema ({
  name: String,
  score: Number,
  review: String
});

const Fruit = mongoose.model("Fruit", fruitSchema);
// Fruit will be changed to fruits and used as a collection name

const fruit = new Fruit ({
  name: "Apple",
  score: 7,
  review: "Pretty solid as a fruit."
});

// fruit.save();

const kiwi = new Fruit ({
  name: "Kiwi",
  score: 7,
  review: "Tasty."
});

const banana = new Fruit ({
  name: "Banana",
  score: 8,
  review: "Delicious."
});

Fruit.insertMany([kiwi, banana], function(err) {
  if (err) {
    console.log(err);
  } else {
    console.log("Succesfully added");
  };
});


const personSchema = new mongoose.Schema({
  name: String,
  age: Number
});

const Person = mongoose.model("Person", personSchema);

const person = new Person ({
  name: "Peter",
  age: 32
});

person.save();
