/**
 * Created by yanglu on 1/30/17.
 */
//1. request get the body (HTML ) pass it to cheerio
'use strict'

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
            // console.log(body ,'-------test body');
            var $ = cheerio.load(body); //passing body then grabe info
            // console.log($('div').filter('.heightContainer'));
            console.log($('div'));
            var pin = {};
            var $url = url;
            var $img = $('div.heightContainer img')// img.attr('src');//get from pinterest
            // var $desc = $('.heightContainer img').attr('alt') //description
            //console.log("debug======" ,$('.heightContainer').children().length);//+ 'pin url'

            var pin = {
                //img: $img,
                url: $url,
                desc: $desc
            }
            //respond with final JSON
            cb(pin);
        }
    });
}