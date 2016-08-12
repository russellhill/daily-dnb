'use strict';

var RandomUtils = function () {};

RandomUtils.prototype.randomInt = function(low, high) {
    return Math.floor(Math.random() * (high - low) + low);
};

RandomUtils.prototype.getRandomWord = function(wordsArray) {
    var rand = RandomUtils.prototype.randomInt(0, wordsArray.length);
    return wordsArray[rand];
};

RandomUtils.prototype.getRandomWords = function(wordsArray, numberOfWords) {
    var intArray = [];

    for(var count = 0; count < numberOfWords; count++) {
        var found = 0;
        while (found > -1) {
            var rand = RandomUtils.prototype.randomInt(0, wordsArray.length);
            found = intArray.indexOf(rand);
            if (found === -1) {
                intArray.push(rand);
            }
        }
    }

    var randomWords = [];

    intArray.map(function (value) {
        randomWords.push(wordsArray[value]);
    });

    return randomWords;
};

exports.RandomUtils = RandomUtils;
