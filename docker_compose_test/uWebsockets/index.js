const uws = require('uWebSockets.js');

/* Non-SSL is simply App() */
const app = uws.App().ws('/*', {
	open: (ws, req) => {
		ws.send("true");
	},
	/* For brevity we skip the other events */
	message: (ws, message, isBinary) => {
		if(AB2String(message) == ""){
			// do something
		}
	},
	close: (ws, code, message) => {
		//connection closed, do something?
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
