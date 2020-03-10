// Start Ws server (no ssl)
const uws = require('uWebSockets.js');
const port = 9000;

const {
	Worker,
	isMainThread,
	threadId
} = require('worker_threads');
const os = require('os');

if (isMainThread) {
	console.log("mainthread?");
	/* Main thread loops over all CPUs */
	/* In this case we only spawn two (hardcoded) */
	/*os.cpus()*/
	[0, 1].forEach(() => {
		/* Spawn a new thread running this source file */
		new Worker(__filename);
	});

	/* I guess main thread joins by default? */
} else {
	const app = uws.App().ws('/*', {
		open: (ws, req) => {

			ws.send("HI?");
		},
		/* For brevity we skip the other events */
		message: (ws, message, isBinary) => {
			console.log("got message:", AB2String(message));
			/* Ok is false if backpressure was built up, wait for drain */
			let ok = ws.send(message, isBinary);
		},
		drain: (ws) => {
			console.log('WebSocket backpressure: ' + ws.getBufferedAmount());
		},
		close: (ws, code, message) => {
			console.log('WebSocket closed');
		}

	}).any('/*', (res, req) => {

		/* Let's deny all Http */
		res.end('Nothing to see here!');

	}).listen(9000, (listenSocket) => {

		if (listenSocket) {
			console.log('Listening to port 9000');
		}

	});

	function AB2String(message) {
		return String.fromCharCode.apply(null, new Uint8Array(message));
	}
};