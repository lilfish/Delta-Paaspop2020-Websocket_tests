require('dotenv').config()
const WebSocketClient = require('websocket').client;

// Admin websocket connection
var admin = new WebSocketClient();
admin.connected = false;
admin.name = 'admin';
admin.on('connectFailed', function (error) {
	admin.connected = false;
	retryAdminConnection()
});
admin.on('connect', function (connection) {
	admin.connected = true;
	console.log('WebSocket Client Connected (connect function)');

	connection.on('error', function (error) {
		admin.connected = false;
		console.log("Connection Error: " + error.toString());
		retryAdminConnection()
	});

	connection.on('close', function () {
		admin.connected = false;
		console.log('echo-protocol Connection Closed');
		retryAdminConnection()
	});

	connection.on('message', function (message) {
		if (message.type === 'utf8') {
			console.log("Received: '" + message.utf8Data + "'");
		}
	});
});

function retryAdminConnection() {
	console.log("Admin webscoekt connection failed, retrying in 5 seconds");
	setTimeout(() => {
		admin.connect('ws://localhost:9000/admin', ["token", process.env.ADMIN_TOKEN])
	}, 5000);
}

var game = new WebSocketClient();
game.connected = false;
game.name = 'game';
game.on('connectFailed', function (error) {
	game.connected = false;
});
game.on('connect', function (connection) {
	game.connected = true;
	console.log('WebSocket Client Connected (connect function)');

	connection.on('error', function (error) {
		game.connected = false;
		console.log("Connection Error: " + error.toString());
	});

	connection.on('close', function () {
		game.connected = false;
		console.log('echo-protocol Connection Closed');
	});

	connection.on('message', function (message) {
		if (message.type === 'utf8') {
			console.log("Received: '" + message.utf8Data + "'");
		}
	});
});

exports.connect = function (client = "game") {
	if (client == "admin") {
		console.log("HOI");
		admin.connect('ws://localhost:9000/admin', ["token", process.env.ADMIN_TOKEN]);
	} else {
		game.connect('ws://localhost:9000/game', ["token", process.env.ADMIN_TOKEN]);
	}
};

exports.connected = function (client = "game") {
	if (client == "admin") {
		return admin.connected;
	} else {
		return game.connected;
	}
};

exports.send = function (client = "game", message = "XD") {
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