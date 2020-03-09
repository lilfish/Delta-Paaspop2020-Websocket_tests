var ws = require("nodejs-websocket")

var connections = 0;
var messages = 0;
var connected = 0;
var disconnected = 0;

var server = ws.createServer(function (conn) {
	connections-=-1;
	connected-=-1;
	console.log("connections: " , connections , "; connected: " , connected , "; messages: " , messages, "; disconnected: " , disconnected);
	conn.on("text", function (str) {
		messages-=-1;
		console.log("connections: " , connections , "; connected: " , connected , "; messages: " , messages, "; disconnected: " , disconnected, "; received: " , str);
		conn.sendText(str.toUpperCase()+"!!!")
	})
	conn.on("close", function (code, reason) {
		connections-=1;
		disconnected-=-1;
		console.log("connections: " , connections , "; connected: " , connected , "; messages: " , messages, "; disconnected: " , disconnected);
	})
}).listen(9000)