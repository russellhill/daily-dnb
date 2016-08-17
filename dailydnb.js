var application_root = __dirname,
    express = require("express"),
    path = require("path"),
    bodyParser = require("body-parser"),
    methodOverride = require("method-override"),
    config = require("./config"),
    exphbs = require('express-handlebars'),
    indexRoute = require('./routes/index'),
    apiRoute = require('./routes/api');

var app = express();

app.set('views', path.join(__dirname, '/views'));
app.engine('.hbs', exphbs({defaultLayout: 'main', extname: '.hbs'}));
app.set('view engine', '.hbs');

// Config
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());
app.use(methodOverride());
app.use(express.static(path.join(application_root, "public")));

app.use('/', indexRoute);
app.use('/api', apiRoute);

process.on('uncaughtException', function(err) {
	console.error(err);
    console.log(JSON.stringify(err, null, ' '))
});

// Launch server...

// Heroku adds a port number to the environment to indicate what the app should
// listen on - so use that or 3000 as default. But this can be overridden by
// params passed on start string
var port = process.env.PORT || 3000;

var args = process.argv.slice(2);
if (args.length > 0) {
	port = args[0];
}

console.log("# Mode:" + config.env + " - listening on port " + port);

// start app and listen on port
app.listen(port);
