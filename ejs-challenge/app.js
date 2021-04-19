//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const _ = require("lodash");
const mongoose = require("mongoose");
const myfunctions = require(__dirname + "/myfunctions.js");

const fs = require("fs");

// reading a password from settings.json
let rawData = fs.readFileSync("C:/Programming/settings.json");
let infoLog = JSON.parse(rawData);
let password = infoLog.mongoDBAtlas.password;

const homeStartingContent = "Lacus vel facilisis volutpat est velit egestas dui id ornare. Semper auctor neque vitae tempus quam. Sit amet cursus sit amet dictum sit amet justo. Viverra tellus in hac habitasse. Imperdiet proin fermentum leo vel orci porta. Donec ultrices tincidunt arcu non sodales neque sodales ut. Mattis molestie a iaculis at erat pellentesque adipiscing. Magnis dis parturient montes nascetur ridiculus mus mauris vitae ultricies. Adipiscing elit ut aliquam purus sit amet luctus venenatis lectus. Ultrices vitae auctor eu augue ut lectus arcu bibendum at. Odio euismod lacinia at quis risus sed vulputate odio ut. Cursus mattis molestie a iaculis at erat pellentesque adipiscing.";
const aboutContent = "Hac habitasse platea dictumst vestibulum rhoncus est pellentesque. Dictumst vestibulum rhoncus est pellentesque elit ullamcorper. Non diam phasellus vestibulum lorem sed. Platea dictumst quisque sagittis purus sit. Egestas sed sed risus pretium quam vulputate dignissim suspendisse. Mauris in aliquam sem fringilla. Semper risus in hendrerit gravida rutrum quisque non tellus orci. Amet massa vitae tortor condimentum lacinia quis vel eros. Enim ut tellus elementum sagittis vitae. Mauris ultrices eros in cursus turpis massa tincidunt dui.";
const contactContent = "Scelerisque eleifend donec pretium vulputate sapien. Rhoncus urna neque viverra justo nec ultrices. Arcu dui vivamus arcu felis bibendum. Consectetur adipiscing elit duis tristique. Risus viverra adipiscing at in tellus integer feugiat. Sapien nec sagittis aliquam malesuada bibendum arcu vitae. Consequat interdum varius sit amet mattis. Iaculis nunc sed augue lacus. Interdum posuere lorem ipsum dolor sit amet consectetur adipiscing elit. Pulvinar elementum integer enim neque. Ultrices gravida dictum fusce ut placerat orci nulla. Mauris in aliquam sem fringilla ut morbi tincidunt. Tortor posuere ac ut consequat semper viverra nam libero.";

const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

// working on local machine (laptop):
// mongoose.connect("mongodb://localhost:27017/blogDB", {useNewUrlParser: true, useUnifiedTopology: true});

// working on a MongoDB Atlas server:
mongoose.connect("mongodb+srv://nikica-admin:" + password + "@cluster0.znipb.mongodb.net/blogDB?retryWrites=true&w=majority", {useNewUrlParser: true, useUnifiedTopology: true});

// mongodb+srv://nikica-admin:<password>@cluster0.znipb.mongodb.net/myFirstDatabase?retryWrites=true&w=majority

mongoose.set('useFindAndModify', false);

const postSchema = {
 title: String,
 content: String
};

const Post = mongoose.model("Post", postSchema);

var posts = [];

app.get("/", function(req, res) {
  // let tmpPosts = [];
  // posts.forEach(function(post) {
  //   tmpPosts.push({title: post.title, content: myfunctions.text_truncate(post.content), link: _.lowerCase(post.title)});
  // });
  // res.render("home", {
  //   textContent: homeStartingContent,
  //   posts: tmpPosts
  // });

  let posts = [];
  Post.find({}, function(err, posts){
    res.render("home", {
    textContent: homeStartingContent,
    posts: posts
    });
  });
});

app.get("/contact", function(req, res) {
  res.render("contact", {textContent: contactContent});
});

app.get("/about", function(req, res) {
  res.render("about", {aboutContent: aboutContent})     // using same name for var that it will be transfered and used in /about as local var name
});

app.get("/compose", function(req, res) {
  res.render("compose");
});

app.post("/compose", function(req, res) {
  // const cplPost = {
  //   title: req.body.newTitle,
  //   content: req.body.newPost
  // };
  // posts.push(cplPost);
  const post = new Post ({
   title: req.body.newTitle,
   content: req.body.newPost
  });
  post.save(function(err){
    if (!err){
      res.redirect("/");
    };
  });
});

app.get("/posts/:postId", function(req, res) {
  // const tmpTitle = req.params.postTitle;
  //
  // const postsLenght = posts.length;
  // let tmpPost = -1;
  //
  // if (postsLenght >= 0) {
  //   for (i=0; i<postsLenght; i++) {
  //     if (_.lowerCase(tmpTitle) === _.lowerCase(posts[i].title)) {
  //       tmpPost = i;
  //       i = postsLenght;
  //     };
  //   };
  // };
  //
  // if (tmpPost > -1) {
  //   res.render("post", {post: posts[tmpPost]});
  // } else {
  //   res.render("post", {post: {title: "No such post!", content: "There is no post with such title."}});
  // };

  const requestedPostId = req.params.postId;

  Post.findOne({_id: requestedPostId}, function(err, post){
    res.render("post", {post: {title: post.title, content: post.content}});
  });
});

app.post("/posts/:postId", function(req, res) {

})

app.listen(3000, function() {
  console.log("Server started on port http://localhost:3000/. Data are uploaded to MongoDB Atlas server!");
});
