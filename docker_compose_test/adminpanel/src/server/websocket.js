require('dotenv').config()
const WebSocketClient = require('websocket').client;

var admin = new WebSocketClient();
var game = new WebSocketClient();
admin.connected = false;
game.connected = false;
admin.name = 'admin';
game.name = 'game';


exports.connect = function (client) {
	let websocket_client = null;
	if (client == "admin") {
		websocket_client = admin;
	} else {
		websocket_client = game;
	}

	websocket_client.on('connectFailed', function (error) {
		websocket_client.connected = false;
	});
	websocket_client.on('connect', function (connection) {
		websocket_client.connected = true;
		console.log('WebSocket Client Connected (connect function)');

		connection.on('error', function (error) {
			websocket_client.connected = false;
			console.log("Connection Error: " + error.toString());
		});

		connection.on('close', function () {
			websocket_client.connected = false;
			console.log('echo-protocol Connection Closed');
		});

		connection.on('message', function (message) {
			if (message.type === 'utf8') {
				console.log("Received: '" + message.utf8Data + "'");
			}
		});
	});

	if (client == "admin") {
		websocket_client.connect('ws://localhost:9000/admin', ["token", process.env.ADMIN_TOKEN]);
	} else {
		websocket_client.connect('ws://localhost:9000/admin', ["token", process.env.ADMIN_TOKEN]);
	}
};

exports.connected = function (client) {
	if (client == "admin") {
		return admin.connected;
	} else {
		return game.connected;
	}
};

exports.send = function (client, message = "XD") {
	console.log(admin);
	if (client == "admin" && admin.connected) {
		admin.sendUTF(message.toString());
		return true;
	} else if (client == "game" && game.connected) {
		game.sendUTF(message.toString());
		return true;
	}
	return false;
}