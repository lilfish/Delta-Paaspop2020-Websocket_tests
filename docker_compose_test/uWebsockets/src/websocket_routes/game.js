var funcs = require('../functions');

var game = {
	game_name: null,
	game_token: null,
	users: [],
}

module.exports = function (app) {
	app.ws('/game', {
		open: (ws, req) => {
			let user = funcs.getHeaderObject(req);
			console.log(user);
			if (true) {
				ws.close();
			} else {
				ws.publish('admin', "user joined game");
				game.users.push(remoteAdress);
			}
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