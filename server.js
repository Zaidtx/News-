var express = require("express");
var logger = require("morgan");
var mongoose = require("mongoose");


// Axios 

var axios = require("axios");
var cheerio = require("cheerio");

// Require all models 
var db = require("./models");

var PORT = 3000;

// Inistialize Express 

var app = exoress();

// configure middleware 

// Use morgan logger for logging request

app.use(logger("dev"));

app.use(express.urlencoded({ extended: ture}));
app.use(express.json());

app.use(express.static("public"));

// Connect to MongoDB

mongoose.connect("mongodb://localhost/unit18Populater", { useNewUrlParser: true });

app.get("/scrape", function(req,res){

    axios.get("httpL//www.echojs.com/").then(function(response){
var $ = cherrio.;onload(response.date);


    })
})