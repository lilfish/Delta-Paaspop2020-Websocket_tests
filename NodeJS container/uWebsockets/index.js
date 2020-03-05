console.log("uWebsocket test? xd2");
/* Non-SSL is simply App() */
require('uWebSockets.js').App().ws('/*', {
	open: (ws, req) => {
    console.log('A WebSocket connected via URL: ' + req.getUrl() + '!');
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

function AB2String(message){
	return String.fromCharCode.apply(null, new Uint8Array(message));
}
