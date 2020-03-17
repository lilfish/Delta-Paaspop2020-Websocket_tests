module.exports = function (app) {
	app.ws('/admin', {
		compression: 0,
		maxPayloadLength: 16 * 1024 * 1024,
		idleTimeout: 10000000,
		open: (ws, req) => {
			req.forEach((k, v) => {
				console.log(k, v);
			});
			ws.subscribe('admin');
			ws.send("true");
		},
		/* For brevity we skip the other events */
		message: (ws, message, isBinary) => {
			ws.publish('admin', message);
		}
	});
}