const scrape = require("../script/scrape");
const cheerio = require("cheerio");
const express = require("express");
var router = express.Router();
const axios = require("axios");

const Headline = require("../models/Headline");


router.get("/", function(req, res){
    res.redirect("/articles");
})
router.get("/articles", function(req,res){
    // get all info from db
    Headline.find().sort({_id: -1})
        .exec(function(err, data){
            if(err){
                console.log(err)
            }
            else{
                var article = {article: data};
                console.log(article)
                res.render('saved', article)
            }
        })
})
router.get("/scrape", function(req, res){
    axios.get("https://www.bbc.com/").then((res) => {
        const $ = cheerio.load(res.data);

        var titleArray = [];
        $("li.media-list__item").each(function(i, element){
            var result ={}
             result.title = $(element).find("a").text();
             result.link = $(element).find("a").attr("href");
             result.summary = $(element).find("p.media_summary").text();

            
            if(result.title !== "" && result.summary !== ""){
                if(titleArray.indexOf(result.title) == -1 ){
                    titleArray.push(result.title);
                    Headline.count({title: result.title}, function(err, test){
                        if(test == 0){
                            var newHeadline = new Headline(result);

                            newHeadline.save(function(err, data){
                                if(err){
                                    console.log(err);
                                }
                                else{
                                    console.log(data);
                                }
                            })
                        }

                    })
                }
                else{
                    console.log("Article already existed in the DB")
                }
            }
            else{
                console.log("Missing data");
            }
        });
        res.redirect("/");
    })
})

module.exports = router;