const uws = require('uWebSockets.js');
// require('dotenv').config()
const util = require('util')

// /* Non-SSL is simply App() */
const app = uws.App();

// include websocket routes
require('./websocket_routes/user')(app);
require('./websocket_routes/game')(app);
require('./websocket_routes/admin')(app);

// include http routes
// require('./https_routes/admin')(app);

app.get('/*', (res, req) => {
	res.end("Nothing to find here.");
}).listen(9000, (listenSocket) => {
	if (listenSocket) {
		console.log('Listening to port 9000');
	}
});

