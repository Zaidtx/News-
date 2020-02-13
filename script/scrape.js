
// const request = require("request");

// var scrape = function(){
//     request("https://www.bbc.com/", (err, res, body) => {
//         const $ = cheerio.load(body);

//         var headlines = [];
//         $("li.media-list__item").each(function(i, element){
//             const title = $(element).find("a").text();
//             const link = $(element).find("a").attr("href");
//             const summary = $(element).find("p.media_summary").text();

//             var headLineToAdd = {
//                 title: title,
//                 link: link,
//                 summary: summary,
//                 saved: false
//             }
//             headlines.push(headLineToAdd);
//         })
//         console.log("headlines: " +JSON.stringify(headlines));
//         return headlines;
//     })
// }

// module.exports = scrape;