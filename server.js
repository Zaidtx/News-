var express = require("express");
var logger = require("morgan");
var mongoose = require("mongoose");
var exphbs = require("express-handlebars");
var path = require("path");

// Require all models 
var db = require("./models");

var PORT = 3000;

// Inistialize Express 

var app = express();
// Use morgan logger for logging request
app.use(logger("dev"));
// middleware
app.use(express.urlencoded({ extended: true}));
app.use(express.json());

app.use(express.static("public"));

app.engine("handlebars",exphbs({
    defaultLayout: "main",
    layoutsDir: path.join(__dirname,  './views/layouts')

}))
app.set("view engine", "handlebars");
app.set("views", 'views')


// registers routes
var router = require("./controllers/headlines");
app.use(router);

// Connect to MongoDB

mongoose.connect("mongodb://localhost/unit18Populater", { useNewUrlParser: true });



app.listen(PORT, function(){
    console.log("App runnning on PORT: "+PORT)
})


