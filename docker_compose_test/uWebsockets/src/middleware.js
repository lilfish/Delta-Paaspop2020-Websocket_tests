require('dotenv').config()
const admin_token = process.env.ADMIN_TOKEN;
var storage = require('./storage');

module.exports = {
	ws_is_admin: function (ws, client) {
		if (client.token == admin_token)
			return true
		ws.close();
		return false;
	},
	ws_is_user: function (ws, client) {
		storage.get_value('game_token').then((value) => {
			if (client.token == value)
				return true
			ws.close();
			return false;
		});
	},
	game_running: function () {
		storage.get_value('game_name').then((value) => {
			return value;
		}).catch((err) => {
			console.log(err);
			return false;
		});
	},
}