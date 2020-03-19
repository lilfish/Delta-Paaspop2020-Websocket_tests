var funcs = require('../functions');
var middleware = require('../middleware')

module.exports = function (app) {
	app.ws('/game', {
		open: (ws, req) => {
			let client = funcs.getHeaderObject(req);
			middleware.ws_is_user(ws, client);
			ws.publish('admin', "user joined game");
		},
		/* For brevity we skip the other events */
		message: (ws, message, isBinary) => {
			ws.publish('game', message);
		},
		close: (ws, code, message) => {
			game.users = game.users.filter(function (value, index, arr) {
				return value == ws.remoteAdress;
			});
			console.log(game.users);
		}

	});
}