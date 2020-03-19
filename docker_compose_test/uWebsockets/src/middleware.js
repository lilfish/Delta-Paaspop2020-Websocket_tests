require('dotenv').config()
const admin_token = process.env.ADMIN_TOKEN;

module.exports = {
	ws_is_admin: function (ws, client) {
		if(client.token == admin_token)
			return true
		ws.close();
		return false;
	},
	ws_is_user	: function (ws, client) {
		return new Uint8Array(remoteAdress).toString().split(",").join("");
	},
}