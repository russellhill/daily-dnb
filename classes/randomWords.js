'use strict';

var fs = require('fs');
var readline = require('readline');
var RandomUtils = require('./randomUtils').RandomUtils;

var what = [
        'track',
        'mix',
        'sound',
        'tune'
];

var start = [
        'Why not',
        'Go and',
        'Time to',
        'Tune in and',
        'BOOM -',
        'WOW -'
];

var randomUtils = new RandomUtils();

var readWordFile = function(fileName, callback) {
    var names = [];
    readline.createInterface({
        input: fs.createReadStream(fileName),
        terminal: false
    }).on('line', function(line) {
       names.push(line);
    }).on('close', function () {
        callback(names);
    });
};

var RandomWords = function () {};

RandomWords.prototype.generateLeadUp = function (callback) {
    readWordFile('./data/description.txt', function(wordsArray) {
        var words = randomUtils.getRandomWords(wordsArray, randomUtils.randomInt(1, 4));

        var text = randomUtils.getRandomWord(start);
        text += ' check out this ';
        text += words.join(', ');
        text += ' ' + randomUtils.getRandomWord(what);

        callback(null, text);
    });
};

RandomWords.prototype.generateSentence = function (callback) {
    readWordFile('./data/names.txt', function(namesArray) {
        var names = randomUtils.getRandomWords(namesArray, randomUtils.randomInt(1, 3));
        RandomWords.prototype.generateLeadUp(function (err, text) {
            text += ' from ';
            text += names.join(' and ');

            callback(null, text);
        });
    });
};

exports.RandomWords = RandomWords;
