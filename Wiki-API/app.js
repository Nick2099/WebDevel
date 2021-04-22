const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const ejs = require("ejs");

const app = express();

app.set("view engine", "ejs"); //app.set vs app.use ??

app.use(bodyParser.urlencoded({extended: true}));     // necessary for body-parser
app.use(express.static("public"));                    // necessary to give access to files in that folder

// working on local machine (laptop):
mongoose.connect("mongodb://localhost:27017/wikiDB", {useNewUrlParser: true, useUnifiedTopology: true});

// working on a MongoDB Atlas server:
// mongoose.connect("mongodb+srv://nikica-admin:" + password + "@cluster0.znipb.mongodb.net/wikiDB?retryWrites=true&w=majority", {useNewUrlParser: true, useUnifiedTopology: true});

mongoose.set('useFindAndModify', false);

const articleSchema = {
  title: String,
  content: String
};

const Article = mongoose.model("Article", articleSchema);

// ------------------ REQUESTS TARGETING ALL ARTICLES ----------------------------
// another way how we can write get, post, delete and other methods
app.route("/articles")  // without ; because it continues in new line

.get(function(req, res) {
  Article.find(function(err, foundArticles) {
    if (err) {
      res.send(err);
    } else {
      res.send(foundArticles);
    };
  });
})  // without ; because it continues in new line

.post(function(req, res) {
  const newArticle = new Article({
    title: req.body.title,
    content: req.body.content
  });
  newArticle.save(function(err) {
    if (!err) {
      res.send("Successfully added a new article.");
    } else {
      res.send(err);
    };
  });
})  // without ; because it continues in new line

.delete(function(req, res) {
  Article.deleteMany(function(err) {
    if (!err) {
      res.send("All articles are deleted!")
    } else {
      res.send(err);
    };
  });
});

// app.get("/articles", function(req, res) {
//   Article.find(function(err, foundArticles) {
//     if (err) {
//       res.send(err);
//     } else {
//       res.send(foundArticles);
//     };
//   });
// });
//
// app.post("/articles", function(req, res) {
//   const newArticle = new Article({
//     title: req.body.title,
//     content: req.body.content
//   });
//   newArticle.save(function(err) {
//     if (!err) {
//       res.send("Successfully added a new article.");
//     } else {
//       res.send(err);
//     };
//   });
// });
//
// app.delete("/articles", function(req, res) {
//   Article.deleteMany(function(err) {
//     if (!err) {
//       res.send("All articles are deleted!")
//     } else {
//       res.send(err);
//     };
//   });
// });

// ------------------ REQUESTS TARGETING SPECIFIC ARTICLE ----------------------------
app.route("/articles/:articleTitle")  // without ; because it continues in new line
.get(function(req,res) {
  Article.findOne({title: req.params.articleTitle}, function(err, foundArticle) {
    if (!err) {
      if (foundArticle) {
        res.send(foundArticle);
      } else {
        res.send("There is no article matching that title name!");
      };
    } else {
      res.send(err);
    };
  });
})    // without ; because code continues in next line
.put(function(req, res) {
  Article.updateOne(
    {title: req.params.articleTitle},
    {$set: {"title": req.body.title, "content": req.body.content}},
    {upsert: false},
    function(err, result) {
      if (!err) {
        res.send("Successfully updated article.");
      } else {
        res.send(err);
      };
    });
})
.patch(function(req, res) {
  Article.updateOne(
    {title: req.params.articleTitle},
    {$set: req.body},
    {upsert: false},
    function(err, result) {
      if (!err) {
        res.send("Successfully updated " + result.nModified + " item(s) in article.");
      } else {
        res.send(err);
      };
    });
})
.delete(function(req, res) {
  Article.deleteOne(
    {title: req.params.articleTitle},
    function(err) {
    if (!err) {
      res.send("Article " + req.params.articleTitle + " is deleted!");
    } else {
      res.send(err);
    };
  });
});



app.listen(3000, function() {
  console.log("Server startet at port 3000!");
});
