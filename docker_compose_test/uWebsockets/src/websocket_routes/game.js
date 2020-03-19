var funcs = require('../functions');
var middleware = require('../middleware')
const storage = require('node-persist');

module.exports = function (app) {
	app.ws('/game', {
		open: (ws, req) => {
			let client = funcs.getHeaderObject(req);
			let game = middleware.game_running();
			if(middleware.ws_is_user(ws, client) && game ){
				ws.publish('admin', "User joined game channel: ",game);
				ws.subscribe(game);
			} else if(middleware.ws_is_admin(ws, client) && game){
				ws.public('admin', "Admin joined game channel: ",game)
				ws.subscribe(game);
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