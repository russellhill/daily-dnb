'use strict';

var RandomWords = require('./randomWords').RandomWords;
var TwitterClass = require('./twitterClass').TwitterClass;
var SoundcloudClass = require('./soundcloudClass').SoundcloudClass;

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
                    console.log('Tweet sent');
                }
            });
        });
    }
});
