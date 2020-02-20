const scrape = require("../script/scrape");
const cheerio = require("cheerio");
const express = require("express");
var router = express.Router();
const axios = require("axios");

const Headline = require("../models/Headline");


router.get("/", function (req, res) {
    res.redirect("/articles");
})
router.get("/articles", function (req, res) {
    // get all info from db
    Headline.find().sort({ _id: -1 })
        .exec(function (err, data) {
            if (err) {
                console.log(err)
            }
            else {
                var artcl = { article: data };
                //console.log(article)
                res.render('index', artcl)
            }
        })
})
router.get("/scrape", function (req, res) {
    console.log("inside scrape route")
    axios.get("https://www.bbc.com/").then((response) => {
        const $ = cheerio.load(response.data);

        var titleArray = [];
        $(".media__content").each(function (i, element) {
            var result = {}
            result.title = $(element).find("a").text().trim();
            // console.log("title: "+result.title)
            result.link = $(element).find("a").attr("href");
            result.summary = $(element).find("p.media__summary").text().trim();
            //console.log("result: "+ JSON.stringify(result));

            if (result.title !== "" && result.summary !== "") {
                if (titleArray.indexOf(result.title) == -1) {
                    titleArray.push(result.title);
                    console.log(result)
                    Headline.count({ title: result.title }, function (err, test) {
                        if (test == 0) {

                            var newHeadline = new Headline(result);

                            newHeadline.save(function (err, data) {
                                if (err) {
                                    console.log(err);
                                }
                                else {
                                    console.log(data);
                                }
                            })
                        }

                    })
                }

                console.log("Article already existed in the DB")
            }


        });
        res.redirect("/");
    })
})
router.post("/save/:id", function (req, res) {
    Headline.findOneAndUpdate(
        { _id: req.params.id },
        { $set: { saved: true } },
        { new: true },
        function (error, doc) {
            if (error) {
                res.status(500);
            }
            else {
                console.log("saved Article")
                res.redirect("/");
            }
        }
    )
})
router.get("/savedArticles", function(req, res){
    Headline.find({}).where('saved').equals(true)
    .exec(function(err, articlesSaved){
        if(err){
            res.status(500);
        }
        else{
            var savedOnces = {
                article: articlesSaved
            }
            
            res.render('saved', savedOnces)
        }
    })
})

module.exports = router;