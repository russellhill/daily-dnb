'use strict';

var express = require('express'),
	router = express.Router();

router.get('/', function(req, res) {
	res.render('index', {
		title: 'DailyDose-DnB'
	});
});

module.exports = router;
