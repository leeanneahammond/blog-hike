const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const mongoose = require("mongoose");
const _ = require("lodash");
const homeStartingContent = "";
const aboutContent = "I'm baby godard sustainable semiotics mustache artisan shabby chic fixie farm-to-table tacos. Fixie portland art party cardigan schlitz. Poutine chambray bitters, tilde enamel pin deep v locavore small batch lomo keffiyeh edison bulb migas blog semiotics craft beer. Roof party pitchfork kogi, before they sold out cornhole trust fund echo park. Glossier man braid tofu affogato activated charcoal keytar organic semiotics selfies ugh lumbersexual. Tofu sartorial banh mi yuccie retro asymmetrical ramps semiotics bicycle rights enamel pin cornhole artisan prism brooklyn ennui. Shabby chic craft beer lyft offal echo park, snackwave glossier banjo organic gluten-free disrupt brunch meggings leggings.";
const contactContent = "";
const dcContent = "Click trails to view more information.";
const mdContent = "Click trails to view more information.";
const vaContent = "Click trails to view more information.";

const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

mongoose.connect("mongodb+srv://leeanneah:abcdef1@cluster0-ejfqj.mongodb.net/test?retryWrites=true&w=majority",
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
  });

const postSchema = {
  title: String,
  content: String
};

const Post = mongoose.model("Post", postSchema);

app.get("/", function (req, res) {

  Post.find({}, function (err, posts) {
    res.render("home", {
      startingContent: homeStartingContent,
      posts: posts
    });
  });

});


app.get("/compose", function (req, res) {
  res.render("compose");
});

app.post("/compose", function (req, res) {
  const post = new Post({
    title: req.body.postTitle,
    content: req.body.postBody
  });

  post.save(function (err) {
    if (!err) {
      res.redirect("/");
    }
  });
});

app.get("/posts/:postId", function (req, res) {

  const requestedPostId = req.params.postId;

  Post.findOne({ _id: requestedPostId }, function (err, post) {
    res.render("post", {
      title: post.title,
      content: post.content
    });
  });

});

app.get("/about", function (req, res) {
  res.render("about", { aboutContent: aboutContent });
});

app.get("/contact", function (req, res) {
  res.render("contact", { contactContent });
});

app.get("/dc", function (req, res) {
  res.render("dc", { dcContent: dcContent });
});

app.get("/md", function (req, res) {
  res.render("md", { mdContent: mdContent });
});

app.get("/va", function (req, res) {
  res.render("va", { vaContent: vaContent });
});

app.listen(3000, function () {
  console.log("Server started on port 3000");
});