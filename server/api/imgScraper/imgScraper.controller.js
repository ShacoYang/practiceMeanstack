/**
 * Created by yanglu on 1/30/17.
 */
'use strict'

var scrapers = {};

scrapers['pinterest'] = require('./scrapers/pinterest');
scrapers['imgur'] = require('./scrapers/imgur');
//instagram

exports.scrape = function (req, res) {
    var url = req.body.url;
    //console.log("url: "+url);
    var scraperToUse;

    if (url.indexOf('pinterest') > -1) {
        scraperToUse = 'pinterest';
    }else if(url.indexOf('imgur') > -1){
        scraperToUse = "imgur";
    }

    else {
        console.log('cannot locate scraper');
    }

    scrapers[scraperToUse].list(url, function(data){
       //data--> //contains url, desc, img ....
        console.log(scraperToUse);
       　// console.log('data from scraper:', data);
        res.json(data);
    });

}