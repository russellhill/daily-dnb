var fs = require('fs');
var readline = require('readline');

var what = [
        'track',
        'mix',
        'sound',
        'tune'
];

var readWordFile = function(fileName, callback) {
    var names = [];
    readline.createInterface({
        input: fs.createReadStream(fileName),
        terminal: false
    }).on('line', function(line) {
       names.push(line);
    }).on('close', function () {
        callback(names)
    });
};

var randomInt = function(low, high) {
    return Math.floor(Math.random() * (high - low) + low);
};

var getRandomWord = function(wordsArray) {
    var rand = randomInt(0, wordsArray.length);
    return wordsArray[rand];
};

var getRandomWords = function(wordsArray, numberOfWords) {
    var intArray = [];

    for(var count = 0; count < numberOfWords; count++) {
        var found = 0;
        while (found > -1) {
            var rand = randomInt(0, wordsArray.length);
            found = intArray.indexOf(rand);
            if (found === -1) {
                intArray.push(rand);
            }
        }
    }

    var randomWords = [];

    intArray.map(function (value) {
        randomWords.push(wordsArray[value]);
    })

    return randomWords;
};

readWordFile('names.txt', function(namesArray) {
    var names = getRandomWords(namesArray, randomInt(1, 3));
    readWordFile('description.txt', function(wordsArray) {
        var words = getRandomWords(wordsArray, randomInt(1, 4));

        var text = 'BOOM! Check out this ';
        text += words.join(', ');
        text += ' new ';
        text += getRandomWord(what);
        text += ' from ';
        text += names.join(' and ');

        console.log(text);
    });
});
