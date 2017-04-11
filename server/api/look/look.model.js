/**
 * Created by yanglu on 1/30/17.
 */
'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var LookSchema = new Schema({
    image: String,
    linkURL: String,
    title: String,
    description: String,
    tags:[{
        type: String
    }],
    _creator:{
        type:Schema.ObjectId,
        ref: 'User' //attach id of user
    },
    email: String,
    userName: String,
    createTime: {
        type: Date,
        'default': Date.now
    },
    //incremented when user click pic on main page
    views: {
        type: Number,
        'default': 0
    },
    //for like a look
    upVotes: {
        type: Number,
        'default': 0
    }
})

//use this model in other files
module.exports = mongoose.model('Look', LookSchema);
