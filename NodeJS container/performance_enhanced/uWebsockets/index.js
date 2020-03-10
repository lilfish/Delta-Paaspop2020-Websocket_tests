// Start Ws server (no ssl)
const uws = require('uWebSockets.js');
const port = 9050;

const {
	Worker,
	isMainThread,
	threadId
} = require('worker_threads');

var connections = 0;
var	connected = 0;
var	disconnected = 0;
var	messages = 0;
var	drained = 0;
var counter = 0;

const os = require('os');

if (isMainThread) {
	console.log("mainthread?");
	/* Main thread loops over all CPUs */
	/* In this case we only spawn two (hardcoded) */
	/*os.cpus()*/
	[0, 1, 2, 3, 4, 5].forEach((worker) => {
		console.log("Spawning worker ", worker);
		/* Spawn a new thread running this source file */
		new Worker(__filename);
	});

	/* I guess main thread joins by default? */
} else {
	const app = uws.App().ws('/*', {
		open: (ws, req) => {
			connections-=-1;
			connected-=-1;
			print()
			ws.send("HI?");
		},
		/* For brevity we skip the other events */
		message: (ws, message, isBinary) => {
			messages-=-1;
			console.log("got message:", AB2String(message));
			/* Ok is false if backpressure was built up, wait for drain */
			let ok = ws.send(message, isBinary);
			
		},
		drain: (ws) => {
			print();
			drained-=-1;
		},
		close: (ws, code, message) => {
			print();
			disconnected-=-1;
			connections-=1;
		}

	}).any('/*', (res, req) => {

		/* Let's deny all Http */
		res.end('Nothing to see here!');

	}).listen(port, (listenSocket) => {

		if (listenSocket) {
			console.log('Listening to port ', port);
		}

	});

	function AB2String(message) {
		return String.fromCharCode.apply(null, new Uint8Array(message));
	}

	function print(){
		counter-=-1;
		if(counter == 100){
			console.log("connected: ", connected, "; disconnected: " , disconnected , "; connections made: ", connections, "; messages received: " , messages, "; drained: ", drained , ";");
			counter = 0;
		}
	}
};