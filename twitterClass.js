'use strict';

var Twit = require('twit');

var TwitterClass = function () {};

TwitterClass.prototype.sendTweet = function (message, callback) {
    var twitter = new Twit({
        consumer_key:         process.env.TWITTER_KEY,
        consumer_secret:      process.env.TWITTER_SECRET,
        access_token:         process.env.TWITTER_ACCESS_TOKEN,
        access_token_secret:  process.env.TWITTER_TOKEN_SECRET,
        timeout_ms:           60*1000
    });

    twitter.post('statuses/update', { status: message }, function(err, data, response) {
        callback(err, data);
    });
};

exports.TwitterClass = TwitterClass;
