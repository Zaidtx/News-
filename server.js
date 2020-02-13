var express = require("express");
var logger = require("morgan");
var mongoose = require("mongoose");
var exphbs = require("express-handlebars");


// Axios 

var axios = require("axios");
var cheerio = require("cheerio");

// Require all models 
var db = require("./models");

var PORT = 3000;

// Inistialize Express 

var app = express();

// configure middleware 

// Use morgan logger for logging request

//      app.use(logger("dev"));

app.use(express.urlencoded({ extended: true}));
app.use(express.json());

app.use(express.static("public"));
app.engine("handlebars",exphbs({defaultLayout: "main"}))
app.set("view engineee", "handlebars");

// registers routes
var router = require("./controllers/headlines");
app.use(router);

// Connect to MongoDB

mongoose.connect("mongodb://localhost/unit18Populater", { useNewUrlParser: true });

app.listen(PORT, function(){
    console.log("App runnning on PORT: "+PORT)
})


