var funcs = require('../functions');
var middleware = require('../middleware')
var storage = require('../storage');

module.exports = function (app) {
	app.ws('/game', {
		idleTimeout: 302400,
		open: (ws, req) => {
			let client = funcs.getHeaderObject(req);

			middleware.game_running().then((game) => {
				if (game != undefined) {
					if (middleware.ws_is_user(ws, client)) {
						ws.subscribe(game);
						ws.publish('admin', "User joined game channel: ", game);
					} else if (middleware.ws_is_admin(ws, client)) {
						ws.subscribe('game');
						ws.publish('admin', "Admin joined game channel: ", game)
					} else {
						ws.close();
					}
				} else {
					ws.close();
				}
			});
		},
		/* For brevity we skip the other events */
		message: (ws, message, isBinary) => {
			ws.publish('game', message);
		},
		close: (ws, code, message) => {
			console.log("disconnected ");
		}

	});
}