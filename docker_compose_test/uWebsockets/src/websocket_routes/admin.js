var funcs = require('../functions');
var middleware = require('../middleware')

module.exports = function (app) {
	app.ws('/admin', {
		open: (ws, req) => {
			let client = funcs.getHeaderObject(req);
			if (middleware.is_admin(ws, client)) {
				ws.subscribe('admin');
				ws.send("true");
			}
		},
		/* For brevity we skip the other events */
		message: (ws, message, isBinary) => {
			ws.publish('admin', message, isBinary);
			ws.publish('broadcast', message, isBinary);
		}
	});
}