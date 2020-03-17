require('dotenv').config()
const admin_token = process.env.ADMIN_TOKEN;
module.exports = {
	is_admin: function (ws, client) {
		if(client.token == admin_token)
			return true
		ws.close();
		return false;
	},
	is_user	: function (ws, client) {
		return new Uint8Array(remoteAdress).toString().split(",").join("");
	},
}