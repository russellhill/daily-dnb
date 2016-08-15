'use strict';

var fs = require('fs');
var util = require('util');
var SoundCloud = require('soundcloud-nodejs-api-wrapper');
var request = require('request');
var RandomUtils = require('./randomUtils').RandomUtils;

var SoundcloudClass = function () {};

var fetchRemainingLikes = function (oAuthToken, next_href, likes, callback) {
    var handleResponse = function(error, response, body) {
        next_href = null;
        if (!error && body) {
            var parsedResponse = JSON.parse(body);
            if (parsedResponse.collection) {
                likes = likes.concat(parsedResponse.collection);
            }

            if (parsedResponse.next_href) {
                next_href = parsedResponse.next_href + '&oauth_token=' + oAuthToken;
            }
        }
        if (next_href) {
            fetchRemainingLikes(oAuthToken, next_href, likes, callback);
        } else {
            callback(error, likes);
        }
    };

    request(next_href, handleResponse);
};

SoundcloudClass.prototype.getLikes = function (callback) {
    var soundcloud = new SoundCloud({
        client_id:          process.env.SOUNDCLOUD_CLIENT_ID,
        client_secret:      process.env.SOUNDCLOUD_CLIENT_SECRET,
        username:           process.env.SOUNDCLOUD_USERNAME,
        password:           process.env.SOUNDCLOUD_PASSWORD
    });

    // this client object will be explained more later on
    var client = soundcloud.client();

    client.exchange_token(function(err, result) {
        if (err) {
            return callback(err, null);
        }

        var oAuthToken = result;

        // we need to create a new client object which will use the access token now
        var clientnew = soundcloud.client({access_token : oAuthToken});

        clientnew.get('/me/favorites', {limit: 100, linked_partitioning: 1}, function(error, result) {
            if (error) {
                callback(error, null);
            } else {
                var likes = result.collection;
                if (result.next_href) {
                    var next = result.next_href + '&oauth_token=' + oAuthToken;
                    fetchRemainingLikes(oAuthToken, next, likes, function(err, allLikes) {
                        callback(err, allLikes);
                    });
                } else {
                    callback(null, likes);
                }
            }
        });
    });
};

SoundcloudClass.prototype.getCachedLikes = function (callback) {
    var cacheFile = './data/soundcloudlikes.json';

    var getLikes = function (callback) {
        SoundcloudClass.prototype.getLikes(function(err, likes) {
            if (err) {
                callback(err, null);
            } else {
                fs.writeFile(cacheFile, JSON.stringify(likes), function(err) {
                    if (err) {
                        callback(err, null);
                    } else {
                        callback(null, likes);
                    }
                })
            }
        });
    };

    var getCache = function (callback) {
        fs.readFile(cacheFile, 'utf8', function(err, cachedLikes) {
            if (err) {
                callback(err, null);
            } else {
                callback(null, JSON.parse(cachedLikes));
            }
        })
    };

    fs.stat(cacheFile, function(err, stats){
        if (err && err.code === 'ENOENT') {
            getLikes(callback);
        } else if (err) {
            callback(err, null);
        } else {
            var cachedTime = new Date(util.inspect(stats.mtime)).getTime();
            var currentTime = new Date().getTime();
            var cacheAge = ((currentTime - cachedTime)/1000)/60;

            // check to see if the age of the cache file is > 60 minutes
            if (cacheAge > 60) {
                getLikes(callback);
            } else {
                getCache(callback);
            }
        }
    });
};

SoundcloudClass.prototype.getRandomTrackFromLikes = function (callback) {
    SoundcloudClass.prototype.getCachedLikes(function(err, likes) {
        if (err) {
            callback(err, null);
        } else {
            var randomUtils = new RandomUtils();
            var randomTrack = randomUtils.getRandomWord(likes);
            callback(null, randomTrack);
        }
    });
};

exports.SoundcloudClass = SoundcloudClass;
