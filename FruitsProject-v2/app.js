const mongoose = require("mongoose");

// connection to fruitsDB database through localhost:27017 (default port for mongodb)
mongoose.connect("mongodb://localhost:27017/fruitsDB", {
  useNewUrlParser: true,
  useUnifiedTopology: true
});
// if database fruitsDB doeasn't exist it will be created

const fruitSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Name is not given!"]
  },
  score: {
    type: Number,
    min: 1,
    max: 10 // if the value of score is not in range from 1 to 10 then item can't be saved
  },
  review: String
});

const Fruit = mongoose.model("Fruit", fruitSchema);
// Fruit will be changed to fruits and used as a collection name

const pineapple = new Fruit({
  name: "Pineapple",
  score: 9, // with value >10 it won't be saved
  review: "Great fruit."
});

// pineapple.save();

// const kiwi = new Fruit ({
//   name: "Kiwi",
//   score: 7,
//   review: "Tasty."
// });
//
// const banana = new Fruit ({
//   name: "Banana",
//   score: 8,
//   review: "Delicious."
// });
//
// Fruit.insertMany([kiwi, banana], function(err) {
//   if (err) {
//     console.log(err);
//   } else {
//     console.log("Succesfully added");
//   };
// });

Fruit.updateOne({name: "Peach"}, {name: "Cherry"}, function(err) { // update only 1 item !!!
  if (err) {
    console.log(err);
  } else {
    console.log("Changed");
  };
});

Fruit.deleteOne({name: "Cherry"}, function(err) {
  if (err) {
    console.log(err);
  } else {
    console.log("Deleted");
  };
});

Fruit.find(function(err, fruits) {
  if (err) {
    console.log(err);
  } else {
    mongoose.connection.close();
    fruits.forEach(function(fruit) {
      console.log(fruit.name);
    });
  };
});

const personSchema = new mongoose.Schema({
  name: String,
  age: Number,
  favouriteFruit: fruitSchema
});

const Person = mongoose.model("Person", personSchema);

Person.deleteMany({name: "Peter"}, function(err) {
  if (err) {
    console.log(err);
  } else {
    console.log("Deleted");
  };
});

const person = new Person({
  name: "Amy",
  age: 12,
  favouriteFruit: pineapple
});

// person.save();

// console.log(person);

Person.find(function(err, people) {
  if (err) {
    console.log(err);
  } else {
    mongoose.connection.close();
    console.log(people);
  };
});
