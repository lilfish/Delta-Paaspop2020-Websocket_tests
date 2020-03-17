require('dotenv').config()
const WebSocketClient = require('websocket').client;

var client = new WebSocketClient();
var my_connection = null;

exports.connect = function () {
	client.on('connectFailed', function (error) {
		console.log('Connect Error: ' + error.toString());
	});
	client.on('connect', function (connection) {
		my_connection = connection;
		console.log('WebSocket Client Connected (connect function)');
		connection.on('error', function (error) {
			console.log("Connection Error: " + error.toString());
			my_connection = null;
		});
		connection.on('close', function () {
			console.log('echo-protocol Connection Closed');
			my_connection = null;
		});
		connection.on('message', function (message) {
			if (message.type === 'utf8') {
				console.log("Received: '" + message.utf8Data + "'");
			}
		});
	});
	
	client.connect('ws://localhost:9000/admin', ["token", process.env.ADMIN_TOKEN]);
};

exports.send = function (message = "XD") {
	if (my_connection && my_connection.connected) {
		console.log("trying to send", message);
		my_connection.sendUTF(message.toString());
	} else {
		console.log("not connected?");
	}
}