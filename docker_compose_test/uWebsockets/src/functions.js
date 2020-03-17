module.exports = {
	AB2String: function (message) {
		return String.fromCharCode.apply(null, new Uint8Array(message));
	},
	hashedRemoteAdress: function (remoteAdress) {
		return new Uint8Array(remoteAdress).toString().split(",").join("");
	},
	getHeaderObject: function (req) {
		let user = {};
		req.forEach((k, v) => {
			if (v.includes(', ') && k == 'sec-websocket-protocol') {
				user[k] = v.split(', ')
			} else {
				user[k] = v;
			}
		});
		return user;
	}
}