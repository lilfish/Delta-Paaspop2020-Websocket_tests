require('dotenv').config()

var funcs = require('../functions');
var middleware = require('../middleware')

const admin_token = process.env.ADMIN_TOKEN;

module.exports = function (app) {
	app.get('/start_game', (res, req) => {
		console.log(funcs.getHeaderObject(req));
		res.end("hoi.");
	})
}