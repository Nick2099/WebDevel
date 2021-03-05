const MongoClient = require("mongodb").MongoClient;
const assert = require("assert");

const url = "mongodb://localhost:27017";

const dbName = "fruitsDB"

const client = new MongoClient(url, { useUnifiedTopology: true});

client.connect(function(err) {
  assert.equal(null, err);
  console.log("Connected successfully to server");

  const db = client.db(dbName);

  insertDocuments(db, function() {
    findDocuments(db, function() {
      client.close();
    });
  });
});

const insertDocuments = function(db, callback) {
  const collection = db.collection("fruits");   // creates collection fruits in case it's not existing
  collection.insertMany([
    {
      name: "Apple",
      score: 8,
      review: "Grear fruit"
    },
    {
      name: "Orange",
      score: 6,
      review: "Kinda sour"
    },
    {
      name: "Banana",
      score: 9,
      review: "Great stuff!"
    }
  ], function(err, result) {
    assert.equal(err, null);
    assert.equal(3, result.result.n);
    assert.equal(3, result.ops.length);
    console.log("Inserted 3 documents into the collection");
    callback(result);
  });
};

const findDocuments = function(db, callback) {
  const collection = db.collection("fruits");

  collection.find({}).toArray(function(err, docs) {
    assert.equal(err, null);
    console.log("Found the following records:");
    console.log(docs);
    callback(docs);
  });
};
