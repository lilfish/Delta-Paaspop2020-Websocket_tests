const uws = require('uWebSockets.js');
var fs = require('fs'); 

var variables = {
	connected: 0,
	disconnected: 0,
	messages: 0,
	total_connected: 0,
	drained: 0
}

var connected = [];

/* Non-SSL is simply App() */
const app = uws.App().ws('/*', {
	open: (ws, req) => {
		// Check if a user is already connected
		let remoteAdress = hashedRemoteAdress(ws.getRemoteAddress());
		if (connected.includes(remoteAdress)) {
			ws.send("already connected");
			ws.close();
		} else {
			connected.push(remoteAdress);
		}
	},
	/* For brevity we skip the other events */
	message: (ws, message, isBinary) => {
		variables.messages -= -1;
		console.log(message, AB2String(message));
		/* Ok is false if backpressure was built up, wait for drain */
		let ok = ws.send(message, isBinary);
	},
	drain: (ws) => {
		variables.drained -= -1;
		print();
	},
	close: (ws, code, message) => {
		variables.disconnected -= -1;
		variables.total_connected -= 1;
		print();
	}

}).get('/*', (res, req) => {
		res.end("Nothing to find here.");
}).listen(9000, (listenSocket) => {

	if (listenSocket) {
		console.log('Listening to port 9000');
	}

});

function AB2String(message) {
	return String.fromCharCode.apply(null, new Uint8Array(message));
}
function hashedRemoteAdress(remoteAdress) {
	return new Uint8Array(remoteAdress).toString().split(",").join("");
}
function print() {
	console.log("connected: ", variables.connected,
		"; disconnected: ", variables.disconnected,
		"; connections made: ", variables.total_connected,
		"; messages received: ", variables.messages,
		"; drained: ", variables.drained, ";");
}