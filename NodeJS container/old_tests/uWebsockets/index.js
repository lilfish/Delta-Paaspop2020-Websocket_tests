var variables = {
	connected: 0,
	disconnected: 0,
	messages: 0,
	total_connected: 0,
	drained: 0
}

/* Non-SSL is simply App() */
require('uWebSockets.js').App().ws('/*', {
	open: (ws, req) => {
		print();
		variables.connected-=-1;
		variables.total_connected-=-1;
  },
  /* For brevity we skip the other events */
  message: (ws, message, isBinary) => {
		variables.messages-=-1;
		console.log("got message:", AB2String(message));
    /* Ok is false if backpressure was built up, wait for drain */
		let ok = ws.send(message, isBinary);
  },
  drain: (ws) => {
		variables.drained-=-1;
		print();
  },
  close: (ws, code, message) => {
		variables.disconnected-=-1;
		variables.total_connected-=1;
    print();
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

function print(){
	counter-=-1;
	if(counter == 50){
		console.log("connected: ", variables.connected, 
		"; disconnected: " , variables.disconnected , 
		"; connections made: ", variables.total_connected, 
		"; messages received: " , variables.messages, 
		"; drained: ", variables.drained , ";");
		counter = 0;
	}
}
