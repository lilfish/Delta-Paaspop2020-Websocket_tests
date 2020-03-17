module.exports = function (app) {
	app.ws('/user', {
		open: (ws, req) => {
			console.log(util.inspect(ws, {
				showHidden: false,
				depth: null
			}))
			let remoteAdress = hashedRemoteAdress(ws.getRemoteAddress());
			ws.test = remoteAdress;
			console.log(remoteAdress);
			console.log(req['host'])
			if (game.users.includes(remoteAdress)) {
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
			console.log(util.inspect(ws, {
				showHidden: false,
				depth: null
			}))
			let remoteAdress = hashedRemoteAdress(ws.getRemoteAddress());
			game.users = game.users.filter(function (value, index, arr) {
				return value == remoteAdress;
			});
		}

	});
}