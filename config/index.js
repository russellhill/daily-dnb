var env = process.env.DAILYDOSE_ENV || 'development',
	cfg = require('./config.'+env);

module.exports = cfg;
