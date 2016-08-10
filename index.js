'use strict';

var RandomWords = require('./randomWords').RandomWords;
var TwitterClass = require('./twitterClass').TwitterClass;

var randomWords = new RandomWords();

randomWords.generateSentence(function (err, result) {
    console.log('result', result);

    var twitterClass = new TwitterClass();

    twitterClass.sendTweet(result, function(err, result) {
        console.log('twitter sent', err, result);
    });
});
