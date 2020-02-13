const scrape = require("../script/scrape");
const cheerio = require("cheerio");
const express = require("express");
const axios = require("axios");

const Headline = require("../models/Headline");

var app =express();

app.get("/", function(req, res){
    res.redirect("/articles");
})
app.get("/articles", function(req,res){
    // get all info from db
})
app.get("/scrape", function(req, res){
    axios.get("https://www.bbc.com/").then((res) => {
        const $ = cheerio.load(res.data);

        var headlines = [];
        $("li.media-list__item").each(function(i, element){
            const title = $(element).find("a").text();
            const link = $(element).find("a").attr("href");
            const summary = $(element).find("p.media_summary").text();

            var headLineToAdd = {
                title: title,
                link: link,
                summary: summary,
                saved: false
            }
            console.log(headLineToAdd)
            Headline.insertMany(headLineToAdd);
        });
    })
})