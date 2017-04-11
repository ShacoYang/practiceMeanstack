'use strict'

var fs = require('fs');
var request = require('request');
var cheerio = require('cheerio');

exports.list = function (url, cb) {
    request(url, function (error, resp, body) {
        if(error){
            cb({
                error: error
            })
        }
        if (!error) {
            var $ = cheerio.load(body);
            var $url = url;
            var $img = $('.post-image img').attr('src');//get from pinterest
            var $desc = $('.post-image img').attr('alt') //description
            console.log($img + 'image url');

            var image = {
                img: "http:" + $img,
                url: $url,
                desc: $desc
            }
            //respond with final JSON
            console.log("scraped: " , image )
            cb(image);
        }
    });
}