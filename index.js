'use strict';

var RandomWords = require('./classes/randomWords').RandomWords;
var TwitterClass = require('./classes/twitterClass').TwitterClass;
var SoundcloudClass = require('./classes/soundcloudClass').SoundcloudClass;

var randomWords = new RandomWords();
var soundcloudClass = new SoundcloudClass();
var twitterClass = new TwitterClass();

soundcloudClass.getRandomTrackFromLikes(function (err, track) {
    if (err) {
        console.log(err, track);
    } else {
        randomWords.generateLeadUp(function (err, leadup) {
            var text = leadup + ' by ' + track.title + ' : ' + track.permalink_url;
            twitterClass.sendTweet(text, function(err, result) {
                if (err) {
                    console.log('Failed to send tweet:', err);
                } else {
                    console.log('Tweet sent on ' + new Date());
                }
            });
        });
    }
});
